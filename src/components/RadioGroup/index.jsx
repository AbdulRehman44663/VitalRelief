import React from "react";
import { Radio } from "antd";

function RadioGroupComp({ onChange, value, list }) {
  console.log(list,list?.length)
  
  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        {list?.length>0 && Array.isArray(list)?
         list?.map((item, index) => (
          <Radio
            key={index}
            className="flex items-center gap-3 py-2"
            value={item.value}
            buttonCheckedBg={"#B07B59"}
          >
            <div className="fs-16-400-lato txt-color-gray700">
              {item?.title}
            </div>
          </Radio>
        ))
      :<></>}
      </Radio.Group>
    </div>
  );
}

export default RadioGroupComp;
