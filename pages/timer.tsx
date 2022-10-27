import MyTimer from 'components/timer';
import router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTimer } from 'use-timer';
import io from "socket.io-client";

const socket = io("http://localhost:8080/timer");

const TimerPage = () => {
    const [isEnd, setEnd] = useState(false);
    // const [time, setTime] = useState<Date>(new Date());

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 900,
        timerType: 'DECREMENTAL',
        autostart: false,
    });

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
            videoRef.current?.play();
        })
        socket.on("timerStart", () => {
            console.log(status);
            start()
        })
        socket.on("timerStop", () => {
            pause();
        })
    });
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {

        videoRef.current?.addEventListener('ended', () => {
            setEnd(true);
            console.log('video ended');

        });
    }, []);


    return (
        <>
            <div className="w-screen h-screen">
                {isEnd ? (
                    <div className="w-screen h-screen flex flex-col bg-black justify-center items-center">
                        <div className='flex flex-row text-white' style={{ fontSize: "23rem" }}>
                            <p>{Math.floor(time / 60)}</p> :
                            <p>{time - Math.floor(time / 60) * 60}</p>
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
