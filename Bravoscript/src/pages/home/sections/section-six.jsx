import React from 'react'
import '../home.css'

import video from "../../../assets/videos/white.mp4"

const SectionSix = () => {
    return (
        <>
            <div className="container-six">
                <h1>Latest New Posts</h1>
                <div className="container-cards">
                    <div className="cardsrow">

                        <div className="cardsix">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="card-video"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="card-video"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="card-video"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>

                    </div>
                    <div className="cardsrow">

                        <div className="cardsix">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="card-video"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="card-video"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="card-video"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        
                    </div>
                </div>
                <button className='loadmore-btn'><i class="fa-solid fa-rocket"></i>Browse all components</button>
            </div>
        </>
    )
}

export default SectionSix
