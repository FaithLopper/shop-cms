import React, { Component } from "react";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { Form, Col, Row } from "antd";
import { showErrorMessage } from "../../services/notifyService";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import DropdownField from "../common/entryForm/DropdownField";
import { commonStatus } from "../../constants/masterData";
import Utils from "../../utils";
import { AppConstants, UploadFileTypes, STATUS_ACTIVE } from "../../constants";

class CategoryProductSubForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.dataDetail.icon
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.icon}`
        : "",
      uploading: false,
    };
  }
  getInitialValue = () => {
    const { dataDetail, isEditing } = this.props;

    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
        parentName: dataDetail.parentName,
        // parentSearchprovinceName: dataDetail.parentSearchprovinceName,
      };
    }
    return {
      ...dataDetail,
    };
  };
  handleSubmit(formValues) {
    const { onSubmit, dataDetail } = this.props;
    onSubmit({
      ...formValues,
      id: dataDetail.id,
      orderSort: parseInt(formValues.orderSort),
      parentId: parseFloat(dataDetail.parentId),
    });
  }

  handleChangeAvatar = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (avatar) =>
        this.setState({ avatar })
      );
    }
  };

  uploadFileAvatar = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("icon", result.data.filePath);
        this.setState({ uploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploading: false });
        }
      },
    });
  };

  render() {
    const { formId, dataDetail, isEditing, t } = this.props;
    const { uploading, avatar } = this.state;

    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialValue()}
      >
        <div style={{ padding: "20px 6px" }}>
          <CropImageFiled
            fieldName="icon"
            loading={uploading}
            //   label={t("form.label.icon")}
            imageUrl={avatar}
            onChange={this.handleChangeAvatar}
            uploadFile={this.uploadFileAvatar}
            // disabled={loadingSave}
          />
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <TextField
                fieldName="name"
                label={t("form.label.name")}
                required
                // disabled={loadingSave}
              />
              <TextField
                fieldName="orderSort"
                label={t("form.label.orderSort")}
                required
                type="number"
                // disabled={loadingSave}
              />
            </Col>
            <Col span={12}>
              <DropdownField
                fieldName="status"
                label={t("form.label.status")}
                required
                options={commonStatus}
                disabled={!isEditing}
              />

              {dataDetail.parentName ? (
                <Row gutter={16}>
                  <Col span={24}>
                    <TextField
                      fieldName="parentName"
                      label={t("form.label.parentName")}
                      disabled
                    />
                  </Col>
                </Row>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <TextField
            type="textarea"
            fieldName="note"
            label={t("form.label.note")}
            style={{
              height: 180,
            }}
          />
        </div>
      </Form>
    );
  }
}

export default CategoryProductSubForm;
