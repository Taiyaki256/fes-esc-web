import React from 'react';
import { useTimer } from 'react-timer-hook';

type Props = {
    expiryTimestamp: Date;
};

function MyTimer({ expiryTimestamp }: Props) {
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
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '100px' }}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}

        </div>
    );
}

export default MyTimer;