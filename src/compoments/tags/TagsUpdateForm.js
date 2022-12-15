import React from "react";
import { Form, Col, Row, Card } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { AppConstants } from "../../constants";
import ColorPicker from "../common/colorPicker/ColorPicker";
import TagInputField from "../common/entryForm/TagInputField";

class TagsUpdateForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {};

    this.acceptFileTypes = ".png, .jpg, .jpeg, .webp";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDetail !== this.props.dataDetail) {
      this.formRef.current.setFieldsValue(nextProps.dataDetail);
    }
    if (
      nextProps.dataDetail.avatar !== this.state.logo &&
      this.state.isUpdateLogo === false &&
      nextProps.dataDetail.avatar !== undefined
    ) {
      this.setState({
        logo: `${AppConstants.contentRootUrl}${nextProps.dataDetail.avatar}`,
      });
    }
  }

  onValuesChange = () => {
    const { setIsChangedFormValues } = this.props;
    setIsChangedFormValues(true);
  };

  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    // onSubmit({
    //   tag: Utils.getHashTag(Utils.removeAllSpecial(formValues.tag)),
    //   color: formValues.color,
    // });
    onSubmit({
      ...formValues,
    });
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {};
    }
    return dataDetail;
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
        <Card title="THÔNG TIN CƠ BẢN" bordered={false}>
          <div style={{ padding: "20px 6px" }}>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <TagInputField
                  fieldName="tag"
                  label={t("form.label.tag")}
                  required
                  // disabled={loadingSave}
                />
              </Col>
              <Col style={{ display: "none" }} span={12}>
                <TextField
                  fieldName="color"
                  label={t("form.label.color")}
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Row style={{marginBottom: "8px"}}>
                  <label style={{color:"rgba(0, 0, 0, 0.85)"}}>{t("form.label.color")}</label>
                </Row>
                <Row>
                  <ColorPicker
                    setter={(name, value) => this.setFieldValue(name, value)}
                    getter={(name) => this.getFieldValue(name)}
                    onValueChange={() => this.onValuesChange()}
                  />
                </Row>
              </Col>
            </Row>
          </div>
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

export default TagsUpdateForm;
