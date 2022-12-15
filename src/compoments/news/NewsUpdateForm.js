import React from "react";
import { Form, Col, Row, Card } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import Utils from "../../utils";
import { commonStatus } from "../../constants/masterData";
import { AppConstants, UploadFileTypes } from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
import DropdownField from "../common/entryForm/DropdownField";
import CheckBoxField from "../common/entryForm/CheckBoxField";
import RichTextField from "../common/entryForm/RichTextField";
import NumericField from "../common/entryForm/NumericField";
import DropdownFieldWithSearch from "../common/entryForm/DropdownFieldWithSearch";

class NewsUpdateForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      uploading: false,
      isUpdateLogo: false,
      banner: "",
      uploadingBanner: false,
      isUpdateBanner: false,
    };

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
    if (
      nextProps.dataDetail.banner !== this.state.banner &&
      this.state.isUpdateBanner === false &&
      nextProps.dataDetail.banner !== undefined
    ) {
      this.setState({
        banner: `${AppConstants.contentRootUrl}${nextProps.dataDetail.banner}`,
      });
    }
  }

  onValuesChange = () => {
    const { setIsChangedFormValues } = this.props;
    setIsChangedFormValues(true);
  };

  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    let newPinTop = 0;
    if (formValues.pinTop === true) {
      newPinTop = 1;
    }
    onSubmit({
      ...formValues,
      kind: 1,
      pinTop: newPinTop,
    });
  }

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("avatar", result.data.filePath);
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
      return {};
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

  handleChangeBanner = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (banner) =>
        this.setState({ banner: banner, isUpdateBanner: true })
      );
    }
  };

  uploadFileBanner = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploadingBanner: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("banner", result.data.filePath);
        this.setState({ uploadingBanner: false });
        this.onValuesChange();
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploadingBanner: false });
        }
      },
    });
  };

  render() {
    const { formId, actions, categoryOptions, t, isEditing } = this.props;
    const { uploading, logo, banner, uploadingBanner } = this.state;
    return (
      <Form
        id={formId}
        onFinish={this.handleSubmit}
        ref={this.formRef}
        initialValues={this.getInitialFormValues()}
        layout="vertical"
        onValuesChange={this.onValuesChange}
        style={{ width: "800px" }}
      >
        <Card title="THÔNG TIN CƠ BẢN" bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <CropImageFiled
                fieldName="avatar"
                loading={uploading}
                label={t("form.label.avatar")}
                imageUrl={logo}
                onChange={this.handleChangeLogo}
                uploadFile={this.uploadFileLogo}
                required
                requiredMsg={t("form.validationMessage.avatarRequire")}
              />
            </Col>
            <Col span={12}>
              <CropImageFiled
                aspect={3 / 2}
                fieldName="banner"
                loading={uploadingBanner}
                label={t("form.label.banner")}
                imageUrl={banner}
                onChange={this.handleChangeBanner}
                uploadFile={this.uploadFileBanner}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <TextField
                fieldName="title"
                label={t("form.label.title")}
                required
              />
            </Col>
            <Col span={12}>
              <DropdownFieldWithSearch
                fieldName="categoryId"
                label={t("form.label.category")}
                required
                options={categoryOptions}
                disabled={isEditing}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <div style={{ marginTop: 4 }}>
                <CheckBoxField
                  fieldName="pinTop"
                  label={t("form.label.pinTop")}
                  //   disabled={loadingSave}
                />
                <DropdownField
                  fieldName="status"
                  label={t("form.label.status")}
                  required
                  options={commonStatus}
                  //   disabled={loadingSave}
                />
              </div>
            </Col>

            <Col span={12}>
              <TextField
                fieldName="description"
                label={t("form.label.description")}
                type="textarea"
                style={{ height: "122px" }}
                // disabled={loadingSave}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} hidden>
              <NumericField
                width="100%"
                fieldName="ordering"
                label={t("form.label.ordering")}
                min={0}
                // disabled={loadingSave}
                value
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <RichTextField
                label={t("form.label.content")}
                fieldName="content"
                // disabled={loadingSave}
                required
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

export default NewsUpdateForm;
