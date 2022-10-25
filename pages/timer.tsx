import { useEffect, useRef, useState } from 'react';

const Timer = () => {
    const [isEnd, setEnd] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        videoRef.current?.play();

        videoRef.current?.addEventListener('ended', () => {
            setEnd(true);
            console.log('video ended');
        });
    }, []);

    return (
        <>
            <div className="w-screen h-screen">
                {isEnd ? (
                    <div className="w-screen h-screen bg-black flex justify-center items-center">
                        <h1 className="text-white text-4xl">Video Ended</h1>
                    </div>
                ) : (
                    <video className="w-screen h-screen" controls muted ref={videoRef} >
                        <source src="/video.mp4" type="video/mp4" />
                        <p>Your browser doesn{"'"}t support HTML5 video.</p>
                    </video>
                )}
            </div>
        </>
    )
}

export default Timer;
