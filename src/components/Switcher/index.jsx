import { Switch } from "antd";
import React from "react";

function SwitcherComp({ checked, onChange }) {
  return (
    <div>
      <Switch
        className="custom-switch"
        defaultChecked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default SwitcherComp;
