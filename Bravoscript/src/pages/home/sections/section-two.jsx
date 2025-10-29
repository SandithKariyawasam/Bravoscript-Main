import React, { useEffect, useRef, useState } from "react";
import '../home.css'

import logo1 from "../../../assets/images/tech/angularjs.png";
import logo2 from "../../../assets/images/tech/html5.png";
import logo3 from "../../../assets/images/tech/css.png";
import logo4 from "../../../assets/images/tech/js.png";
import logo5 from "../../../assets/images/tech/typescript.png";
import logo6 from "../../../assets/images/tech/react.png";
import logo7 from "../../../assets/images/tech/nuxtjs.png";
import logo8 from "../../../assets/images/tech/nodejs.png";
import logo9 from "../../../assets/images/tech/expressjs.png";
import logo10 from "../../../assets/images/tech/vuejs.png";

const SectionTwo = () => {

    const logos = [
        logo1, logo2, logo3, logo4, logo5,
        logo6, logo7, logo8, logo9, logo10,
        logo1, logo2, logo3, logo4, logo5,
        logo6, logo7, logo8, logo9, logo10
    ];

    return (
        <>
            <div className="carousel">
                <div className="carousel-track">
                    {/* First set of logos */}
                    {logos.map((logo, i) => (
                        <div className="card" >
                            <img src={logo} alt={`Customer ${i + 1}`} />
                        </div>
                    ))}

                    {/* Second logos for seamless infinite scroll */}
                    {logos.map((logo, i) => (
                        <div className="card">
                            <img src={logo} alt={`Customer ${i + 1}`} />
                        </div>
                    ))}

                    {/* Third logos for seamless infinite scroll */}
                    {logos.map((logo, i) => (
                        <div className="card">
                            <img src={logo} alt={`Customer ${i + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SectionTwo
