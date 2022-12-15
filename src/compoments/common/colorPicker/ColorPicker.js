import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";
import Utils from "../../../utils";

const ColorPicker = (props) => {
  const { setter, onValueChange, getter } = props;
  const { getHashTag } = Utils;

  const [hexColor, setHexColor] = useState();
  const [show, setShow] = useState(false);

  const setNewColor = (color) => {
    onValueChange();
    setHexColor(color.hex); // set state color
    setter("color", color.hex.substring(1)); // set form ref
  };

  useEffect(() => {
    const hexValue = getter("color");
    let color = "#ffffff";
    if (hexValue) color = getHashTag(hexValue);
    setHexColor(color);
    setter("color", color.substring(1)); // set form ref
  }, [getter, setter, getHashTag]);

  return (
    <>
      <Button
        style={{ backgroundColor: hexColor, marginBottom: 10 }}
        onClick={() => setShow(!show)}
      >
        <BgColorsOutlined /> {hexColor}
      </Button>

      {show && (
        <SketchPicker
          color={hexColor}
          disableAlpha
          onChange={(color) => setNewColor(color)}
        />
      )}
    </>
  );
};

export default ColorPicker;
