import React from "react";
import { Form, Col, Row, Card } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import Utils from "../../utils";
import { STATUS_ACTIVE } from "../../constants";
import NumericField from "../common/entryForm/NumericField";
import RichTextField from "../common/entryForm/RichTextField";
class VariantUpdateForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDetail !== this.props.dataDetail) {
      this.formRef.current.setFieldsValue(nextProps.dataDetail);
    }
  }

  onValuesChange = () => {
    const { setIsChangedFormValues } = this.props;
    setIsChangedFormValues(true);
  };

  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    onSubmit({
      ...formValues,
      price: formValues.price ? formValues.price : 0,
    });
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
      };
    }
    return {
      ...dataDetail,
    };
  };

  render() {
    const { formId, actions, t } = this.props;
    return (
      <Form
        id={formId}
        onFinish={this.handleSubmit}
        ref={this.formRef}
        initialValues={this.getInitialFormValues()}
        layout="vertical"
        onValuesChange={this.onValuesChange}
        style={{ width: "600px" }}
      >
        <Card
          title={t(`baseField:${"basicInfo"}`)}
          className="card-form"
          bordered={false}
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <TextField
                fieldName="name"
                label={t("form.label.name")}
                required
                // disabled={loadingSave}
              />
            </Col>
            <Col span={12}>
              <NumericField
                fieldName="price"
                label={t("form.label.price") + " (VNĐ)"}
                min={0}
                max={Infinity}
                width="100%"
                parser={(value) => Utils.formatIntegerNumber(value)}
              />
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <RichTextField
                label={t("form.label.description")}
                fieldName="description"
                // disabled={loadingSave}
                // required
              />
            </Col>
          </Row>
        </Card>
        <div className="footer-card-form">
          <Row gutter={16} justify="end">
            <Col align="right" span={10}>
              {actions}
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default VariantUpdateForm;
