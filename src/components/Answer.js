import React, { useState } from 'react';

const Answer = () => {
    const [checkedValue, setCheckedValue] = useState(null);

    const handleChange = (e) => {
        setCheckedValue(e.target.value);
    }

    return (
        <>
            <div className="form-control">
                <label className="label cursor-pointer gap-6">
                    <input
                        type="checkbox"
                        value="A"
                        checked={checkedValue === "A"}
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">A</span>
                </label>
                <label className="label cursor-pointer gap-6">
                    <input
                        type="checkbox"
                        value="B"
                        checked={checkedValue === "B"}
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">B</span>
                </label>
                <label className="label cursor-pointer gap-6">
                    <input
                        type="checkbox"
                        value="C"
                        checked={checkedValue === "C"}
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">C</span>
                </label>
                <label className="label cursor-pointer gap-6">
                    <input
                        type="checkbox"
                        value="D"
                        checked={checkedValue === "D"}
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">D</span>
                </label>
            </div>
        </>
    )
}

export default Answer;

