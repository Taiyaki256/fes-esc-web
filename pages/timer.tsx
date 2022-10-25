import { useEffect, useRef } from 'react';

const Timer = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        videoRef.current?.play();
    }, []);

    return (
        <>
            <div className="w-screen h-screen">

                <video className="w-screen h-screen" muted ref={videoRef} >
                    <source src="/video.mp4" type="video/mp4" />
                    <p>Your browser doesn{"'"}t support HTML5 video.</p>
                </video>
            </div>
        </>
    )
}

export default Timer;
