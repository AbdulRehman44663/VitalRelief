import { Slider } from "antd";
import React from "react";

function RangeInput({handleRange,min,max,defaultValue}) {
  return (
    <div className="flex flex-col gap-4">
      <Slider
        className="range-input-selector"
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={handleRange}
      />
      <div className="flex justify-between items-center">
        <div className="fs-18-400-lato txt-color-red">{min}</div>
        <div className="fs-18-400-lato txt-color-red">{max}</div>
      </div>
    </div>
  );
}

export default RangeInput;
