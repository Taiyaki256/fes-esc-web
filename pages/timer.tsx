import MyTimer from 'components/timer';
import router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import io from "socket.io-client";

const socket = io("http://localhost:8080/timer");


const TimerPage = () => {
    const [isEnd, setEnd] = useState(false);
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
        socket.on("reset", () => {
            router.reload()
        })
        socket.on("start", () => {
            // set time to 5 minutes
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            setTime(time);
        })
        socket.on("timerStart", () => {
            restart(time);
        })
    });
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
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: time, onExpire: () => console.warn('onExpire called') });


    return (
        <>
            <div className="w-screen h-screen">
                {isEnd ? (
                    <div className="w-screen h-screen bg-black flex justify-center items-center">
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '100px' }}>
                                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                            </div>
                            {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}

                        </div>
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
