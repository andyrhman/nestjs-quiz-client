import React, { useState, useEffect, useRef } from "react";

const Countdown = () => {

    let refInstance = useRef(null);

    let [counter, setCountdown] = useState("00:00:00");

    let getCounter = (e) => {
        let all = Date.parse(e) - Date.parse(new Date());
        let s = Math.floor((all / 1000) % 60);
        let m = Math.floor((all / 1000 / 60) % 60);
        let h = Math.floor((all / 1000 / 60 / 60) % 24);
        return {
            all,
            s,
            m,
            h,
        };
    };

    let initCounter = (e) => {
        let { all, h, m, s } = getCounter(e);
        if (all >= 0) {
            setCountdown(
                (h > 9 ? h : "0" + h) +
                ":" +
                (m > 9 ? m : "0" + m) +
                ":" +
                (s > 9 ? s : "0" + s),
            );
        }
    };

    let reset = (e) => {
        setCountdown("01:00:00");
        if (refInstance.current) clearInterval(refInstance.current);
        let id = setInterval(() => {
            initCounter(e);
        }, 1000);
        refInstance.current = id;
    };

    let voidTime = () => {
        let voidZone = new Date();
        voidZone.setSeconds(voidZone.getSeconds() + 3600);
        return voidZone;
    };

    useEffect(() => {
        reset(voidTime());
    }, []);

    let onReset = () => {
        reset(voidTime());
    };

    // const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTimeRemaining((prevTime) => prevTime - 1);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    // const hours = Math.floor(timeRemaining / 3600);
    // const minutes = Math.floor((timeRemaining % 3600) / 60);
    // const seconds = timeRemaining % 60;

    return (
        <>
            <div className="grid grid-flow-col auto-cols-max justify-center">
                <div className="alert alert-info">
                    <h1 className="font-mono text-5xl">{counter}</h1>
                </div>

                {/* <button className="btn btn-dark" onClick={onReset}>
                    Reset
                </button> */}

            </div>

            {/* <div className="grid grid-flow-col gap-5 auto-cols-max justify-center">
                <div className="flex flex-col">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": hours }}></span>
                    </span>
                    hours
                </div>
                <div className="flex flex-col">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": minutes }}></span>
                    </span>
                    minutes
                </div>
                <div className="flex flex-col">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": seconds }}></span>
                    </span>
                    seconds
                </div>
            </div> */}

        </>
    );
}
export default Countdown;