import React from "react";
import { STATUS_ACTIVE } from "../../constants";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { Form, Col, Row } from "antd";
class ProvinceForm extends BasicForm {
  constructor(props) {
    super();
  }
  getInitialValue = () => {
    const { dataDetail, isEditing } = this.props;

    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
        parentName:dataDetail.parentName,
        parentSearchprovinceName:dataDetail.parentSearchprovinceName
      };
    }
    return {
      ...dataDetail,
    };
  };
  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    onSubmit({
      ...formValues,
      id:this.props.dataDetail.id,
      parentId:this.props.dataDetail.parentId
    })
  }

  render() {
    const { formId, dataDetail, loadingSave, t} = this.props;
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialValue()}
      >
        {dataDetail.parentSearchprovinceName ?(  <Row gutter={16}>
          <Col span={24}>
            <TextField
              fieldName="parentSearchprovinceName"
              label={t("form.label.provinceName")}
              disabled
            />
          </Col>
        </Row>) :(<></>)}
        {dataDetail.parentName ?(  <Row gutter={16}>
          <Col span={24}>
            <TextField
              fieldName="parentName"
              label={t("form.label.parentName")}
              disabled
            />
          </Col>
        </Row>) :(<></>)}
      
        <Row gutter={16}>
          <Col span={24}>
            <TextField
              fieldName="name"
              label={t("form.label.currentName")}
              required
              disabled={loadingSave}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ProvinceForm;
