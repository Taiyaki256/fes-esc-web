import router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTimer } from 'use-timer';
import io from "socket.io-client";
import QRCode from "react-qr-code";
import { wsURL, URL } from 'lib/socket';

const socket = io(wsURL + "timer");

const TimerPage = () => {
    const [isEnd, setEnd] = useState(false);
    const [value, setValue] = useState("");
    const [allEnd, setAllEnd] = useState(false);
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
        socket.on("start", (path: number) => {
            videoRef.current?.play();
            console.log(path);
            setValue(URL + "escape" + "?id=" + path.toString());
        })
        socket.on("timerStart", () => {
            if (status == "RUNNING") { return }
            if (allEnd) { return }
            console.log(status);
            start()
        })
        socket.on("timerStop", () => {
            console.log("stop");
            setAllEnd(true);
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
                        <div style={{ position: "absolute", bottom: "0", right: "0" }} className='p-8 bg-white'>
                            <QRCode

                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "8rem" }}
                                value={value}
                                viewBox={`0 0 256 256`}
                            />
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
