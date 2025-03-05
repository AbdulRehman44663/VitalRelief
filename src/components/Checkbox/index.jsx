import { Checkbox } from "antd";
import React from "react";

function CheckBoxComp({ title, onChange,value=null }) {
  return (
    <div>
      <Checkbox className="flex items-center gap-3" value={value} onChange={onChange}>
        <div className="fs-16-400-lato txt-color-gray700">{title}</div>
      </Checkbox>
    </div>
  );
}

export default CheckBoxComp;
