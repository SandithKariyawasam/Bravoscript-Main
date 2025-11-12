import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import './icon.css'

const Icon = () => {
    const containerRef = useRef();

    useEffect(() => {
        let scene, camera, renderer, controls, blob, helmet, helmetWire;
        const gu = {
            time: { value: 0 },
            dTime: { value: 0 },
            aspect: { value: window.innerWidth / window.innerHeight },
        };

        // ✅ Blob Class (same as original)
        class Blob {
            constructor(renderer) {
                this.renderer = renderer;
                this.fbTexture = { value: new THREE.FramebufferTexture(window.innerWidth, window.innerHeight) };
                this.rtOutput = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
                this.uniforms = {
                    pointer: { value: new THREE.Vector2().setScalar(10) },
                    pointerDown: { value: 1 },
                    pointerRadius: { value: 0.375 },
                    pointerDuration: { value: 2.5 },
                };

                window.addEventListener("pointermove", (event) => {
                    this.uniforms.pointer.value.x = (event.clientX / window.innerWidth) * 2 - 1;
                    this.uniforms.pointer.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
                });

                renderer.domElement.addEventListener("pointerleave", () => {
                    this.uniforms.pointer.value.setScalar(10);
                });

                this.rtScene = new THREE.Mesh(
                    new THREE.PlaneGeometry(2, 2),
                    new THREE.MeshBasicMaterial({
                        color: 0x000000,
                        onBeforeCompile: (shader) => {
                            shader.uniforms.dTime = gu.dTime;
                            shader.uniforms.aspect = gu.aspect;
                            shader.uniforms.pointer = this.uniforms.pointer;
                            shader.uniforms.pointerDown = this.uniforms.pointerDown;
                            shader.uniforms.pointerRadius = this.uniforms.pointerRadius;
                            shader.uniforms.pointerDuration = this.uniforms.pointerDuration;
                            shader.uniforms.fbTexture = this.fbTexture;

                            shader.fragmentShader = `
                uniform float dTime;
                uniform float aspect;
                uniform vec2 pointer;
                uniform float pointerDown;
                uniform float pointerRadius;
                uniform float pointerDuration;
                uniform sampler2D fbTexture;
                ${shader.fragmentShader}
              `.replace(
                                `#include <color_fragment>`,
                                `#include <color_fragment>
                float duration = pointerDuration;
                float rVal = texture2D(fbTexture, vUv).r;
                rVal -= clamp(dTime / duration, 0., 0.1);
                rVal = clamp(rVal, 0., 1.);
                float f = 0.;
                if (pointerDown > 0.5){
                  vec2 uv = (vUv - 0.5) * 2. * vec2(aspect, 1.);
                  vec2 mouse = pointer * vec2(aspect, 1);
                  f = 1. - smoothstep(pointerRadius * 0.1, pointerRadius, distance(uv, mouse));
                }
                rVal += f * 0.1;
                rVal = clamp(rVal, 0., 1.);
                diffuseColor.rgb = vec3(rVal);
                `
                            );
                        },
                    })
                );

                this.rtScene.material.defines = { USE_UV: "" };
                this.rtCamera = new THREE.Camera();
            }

            render() {
                this.renderer.setRenderTarget(this.rtOutput);
                this.renderer.render(this.rtScene, this.rtCamera);
                this.renderer.copyFramebufferToTexture(this.fbTexture.value);
                this.renderer.setRenderTarget(null);
            }

            setSize(w, h) {
                this.rtOutput.setSize(w, h);
            }
        }

        // ✅ Setup Three.js Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x00000000);

        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(-1, 0, 0).setLength(15);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // ✅ Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const camShift = new THREE.Vector3(0, 1, 0);
        controls.object.position.add(camShift);
        controls.target.add(camShift);

        // ✅ Lighting
        const light = new THREE.AmbientLight(0xffffff, Math.PI);
        scene.add(light);

        // ✅ Blob instance
        blob = new Blob(renderer);

        // ✅ Load Models
        const loader = new GLTFLoader();
        (async () => {
            const head = (await loader.loadAsync("https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb")).scene.children[0];
            head.geometry.rotateY(Math.PI * 0.01);
            head.material = new THREE.MeshMatcapMaterial({ color: 0xffffff });
            scene.add(head);

            helmet = (await loader.loadAsync("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf")).scene.children[0];
            const helmetUniforms = { texBlob: { value: blob.rtOutput.texture } };

            helmet.material.onBeforeCompile = (shader) => {
                shader.uniforms.texBlob = helmetUniforms.texBlob;
                shader.vertexShader = `
          varying vec4 vPosProj;
          ${shader.vertexShader}
        `.replace(
                    `#include <project_vertex>`,
                    `#include <project_vertex>
            vPosProj = gl_Position;
          `
                );
                shader.fragmentShader = `
          uniform sampler2D texBlob;
          varying vec4 vPosProj;
          ${shader.fragmentShader}
        `.replace(
                    `#include <clipping_planes_fragment>`,
                    `
          vec2 blobUV = ((vPosProj.xy / vPosProj.w) + 1.) * 0.5;
          vec4 blobData = texture(texBlob, blobUV);
          if (blobData.r < 0.01) discard;
          #include <clipping_planes_fragment>
          `
                );
            };
            helmet.scale.setScalar(3.5);
            helmet.position.set(0, 1.5, 0.75);
            scene.add(helmet);

            helmetWire = new THREE.Mesh(
                helmet.geometry.clone().rotateX(Math.PI * 0.5),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.25,
                    onBeforeCompile: (shader) => {
                        shader.uniforms.time = gu.time;
                        shader.vertexShader = `
              varying float vYVal;
              ${shader.vertexShader}
            `.replace(
                            `#include <begin_vertex>`,
                            `#include <begin_vertex>
                vYVal = position.y;
              `
                        );
                        shader.fragmentShader = `
              uniform float time;
              varying float vYVal;
              ${shader.fragmentShader}
            `.replace(
                            `#include <color_fragment>`,
                            `#include <color_fragment>
                float y = fract(vYVal * 0.25 + time * 0.5);
                float fY = smoothstep(0., 0.01, y) - smoothstep(0.02, 0.1, y);
                diffuseColor.a *= fY * 0.9 + 0.1;
              `
                        );
                    },
                })
            );
            helmetWire.scale.setScalar(3.5);
            helmetWire.position.set(0, 1.5, 0.75);
            scene.add(helmetWire);
        })();

        // ✅ Resize Handling
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            gu.aspect.value = camera.aspect;
        });

        // ✅ Animation Loop
        const clock = new THREE.Clock();
        let t = 0;
        renderer.setAnimationLoop(() => {
            const dt = clock.getDelta();
            t += dt;
            gu.time.value = t;
            gu.dTime.value = dt;
            controls.update();
            blob.render();
            renderer.render(scene, camera);
        });

        // ✅ Cleanup on unmount
        return () => {
            // dispose three.js objects safely
            if (renderer) {
                renderer.dispose();
            }

            // avoid removeChild(null)
            if (containerRef.current && renderer?.domElement?.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }

            // dispose controls (frees event listeners)
            if (controls) controls.dispose();

            // optional: dispose geometries, materials, and textures to free GPU memory
            scene?.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose?.();
                if (obj.material) {
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach((m) => m.dispose?.());
                    } else {
                        obj.material.dispose?.();
                    }
                }
            });
        };

    }, []);

    return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Icon;
