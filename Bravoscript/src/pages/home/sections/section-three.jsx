import React from 'react'
import video from "../../../assets/videos/white.mp4"

const SectionThree = () => {

    const row = Array.from({ length: 8 }, (_, i) => `Card ${i + 1}`);

    return (
        <>
            <div className="sectionthree">
                <p className='three-elementsone'><i class="fa-solid fa-rocket"></i>37 new elements this week!</p>
                <h2>The Largest Library of Open-Source Components</h2>
                <p className='three-elementstwo'>Community-built library of UI components. Copy as HTML/CSS, Tailwind, React and Figma.</p>
                <label class="label">
                    <div class="shortcut"><i class="fa-solid fa-magnifying-glass"></i></div>
                    <input type="text" class="search_bar" placeholder="Search Components..." />
                </label>

                {/* <div class="sectionthree-card">
                    <div class="card__content">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="card-video"
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>
                </div> */}

                <div className="rows-container">
                    <div className="row" style={{ marginLeft: "10em" }}>
                        {row.map((item, i) => (
                            <div class="sectionthree-card">
                                <div class="card__content">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="card-video"
                                    >
                                        <source src={video} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row" style={{ marginRight: "10em" }}>
                        {row.map((item, i) => (
                            <div class="sectionthree-card">
                                <div class="card__content">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="card-video"
                                    >
                                        <source src={video} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row rowthree" style={{ marginLeft: "10em" }}>
                        {row.map((item, i) => (
                            <div class="sectionthree-card">
                                <div class="card__content">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="card-video"
                                    >
                                        <source src={video} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        ))}
                        <div className="blur-overlay"></div>
                    </div>
                </div>
                <button className='loadmore-btn'><i class="fa-solid fa-rocket"></i>Browse all components</button>
            </div>

        </>
    )
}

export default SectionThree

