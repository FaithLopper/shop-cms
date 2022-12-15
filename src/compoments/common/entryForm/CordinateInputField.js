import React from "react";

import { Form, Input, Row, Col, InputNumber } from "antd";
import { withTranslation } from "react-i18next";
import BaseField from "./BaseField";
class CordinateInputField extends BaseField {
  getMaxLengthMsg() {
    const { maxLength, maxLengthMsg, t } = this.props;
    return maxLengthMsg || t("maxLengthMsg", { var: maxLength });
  }

  getMinLengthMsg() {
    const { minLength, minLengthMsg, t } = this.props;
    return minLengthMsg || t("minLengthMsg", { var: minLength });
  }

  getTextFieldRules() {
    const { maxLength, minLength, type, invalidEmailMsg, t } = this.props;
    const rules = [];
    if (maxLength) {
      rules.push({ max: maxLength, message: this.getMaxLengthMsg() });
    }
    if (minLength) {
      rules.push({ min: minLength, message: this.getMinLengthMsg() });
    }
    if (type === "email") {
      rules.push({
        type,
        message: invalidEmailMsg || t("invalidEmailMsg"),
      });
    }

    return rules;
  }

  render() {
    const {
      type,
      size,
      label,
      suffix,
      latFieldName,
      lngFieldName,
      disabled,
      onBlur,
      validateStatus,
      help,
      style,
      className,
      onChange,
      precision,
    } = this.props;

    return (
      <Form.Item label={label}>
        <Row>
          <Col>
            <Form.Item
              className={className}
              name={latFieldName}
              validateStatus={validateStatus}
              help={help}
              rules={[...this.getRules(), ...this.getTextFieldRules()]}
            >
              <InputNumber
                onChange={onChange}
                style={style}
                size={size}
                precision={precision}
                placeholder={this.getPlaceHolder()?.lat}
                disabled={disabled}
                type={type}
                onBlur={onBlur}
              />
            </Form.Item>
          </Col>
          <Col>
            <Input
              style={{
                width: 30,
                height: 32,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: "none",
              }}
              placeholder="~"
              disabled
            />
          </Col>
          <Col>
            <Form.Item
              className={className}
              name={lngFieldName}
              validateStatus={validateStatus}
              help={help}
              rules={[...this.getRules(), ...this.getTextFieldRules()]}
            >
              <InputNumber
                onChange={onChange}
                style={style}
                size={size}
                precision={precision}
                placeholder={this.getPlaceHolder()?.lng}
                disabled={disabled}
                type={type}
                onBlur={onBlur}
              />
            </Form.Item>
          </Col>
          <Col>{suffix}</Col>
        </Row>
      </Form.Item>
    );
  }
}

export default withTranslation(["textField", "baseField"])(CordinateInputField);
