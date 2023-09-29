import React from "react";

const Countdown = ({hours, minutes, seconds}) => {
    return (
        <>
            <div className="grid grid-flow-col gap-5 auto-cols-max justify-center">
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
            </div>
        </>
    );
}
export default Countdown;