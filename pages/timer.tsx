import { useEffect, useRef } from 'react';
import video from '../public/video.mp4'

const Timer = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        videoRef.current?.play();
    }, []);

    return (
        <video controls muted ref={videoRef} >
            <source src={video} type="video/mp4" />
            <p>Your browser doesn{"'"}t support HTML5 video.</p>
        </video>)
}

export default Timer;
