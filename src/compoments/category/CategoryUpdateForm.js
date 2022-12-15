import React from "react";
import { Form, Col, Row, Card } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import Utils from "../../utils";
import { commonStatus } from "../../constants/masterData";
import { AppConstants, UploadFileTypes, STATUS_ACTIVE } from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
import DropdownField from "../common/entryForm/DropdownField";

class CategoryUpdateForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      uploading: false,
      isUpdateLogo: false,
    };

    this.acceptFileTypes = ".png, .jpg, .jpeg, .webp";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDetail !== this.props.dataDetail) {
      this.formRef.current.setFieldsValue(nextProps.dataDetail);
    }
    if (
      nextProps.dataDetail.categoryImage !== this.state.logo &&
      this.state.isUpdateLogo === false &&
      nextProps.dataDetail.categoryImage !== undefined
    ) {
      this.setState({
        logo: `${AppConstants.contentRootUrl}${nextProps.dataDetail.categoryImage}`,
      });
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
    });
  }

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        // this.otherData.logoPath = result.data.filePath;
        this.setFieldValue("categoryImage", result.data.filePath);
        this.setState({ uploading: false });
        this.onValuesChange();
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

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
      };
    }
    return dataDetail;
  };

  handleChangeLogo = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) =>
        this.setState({ logo: logo, isUpdateLogo: true })
      );
    }
  };

  render() {
    const { formId, actions, isEditing, t } = this.props;
    const { uploading, logo } = this.state;

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
            <CropImageFiled
              fieldName="categoryImage"
              loading={uploading}
              // label={t("form.label.avatar")}
              imageUrl={logo}
              onChange={this.handleChangeLogo}
              uploadFile={this.uploadFileLogo}
              // disabled={loadingSave}
            />
            <Row gutter={8}>
              <Col span={12}>
              <TextField
              // style={{ width: "45%" }}
              fieldName="categoryName"
              label={t("form.label.categoryName")}
              required
              // disabled={loadingSave}
            />
              </Col>
              <Col span={12}>
              {isEditing ? (
                <DropdownField
                  fieldName="status"
                  label={t("form.label.status")}
                  required
                  options={commonStatus}
                  // disabled={loadingSave}
                />
              ) : null}
              </Col>
            </Row>
           
           
            <TextField
              type="textarea"
              fieldName="categoryDescription"
              label={t("form.label.categoryDescription")}
              required
              style={{
                height: 180,
              }}
            />
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

export default CategoryUpdateForm;
