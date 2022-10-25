import MyTimer from 'components/timer';
import { useEffect, useRef, useState } from 'react';

const TimerPage = () => {
    const [isEnd, setEnd] = useState(false);
    const [time, setTime] = useState(new Date());

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        videoRef.current?.play();

        videoRef.current?.addEventListener('ended', () => {
            setEnd(true);
            console.log('video ended');

            // set time to 5 minutes
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            setTime(time);
        });

    }, []);

    return (
        <>
            <div className="w-screen h-screen">
                {isEnd ? (
                    <div className="w-screen h-screen bg-black flex justify-center items-center">
                        <MyTimer expiryTimestamp={time} />
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

export default TimerPage;
