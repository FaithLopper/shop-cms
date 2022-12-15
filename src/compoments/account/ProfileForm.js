import React from "react";
import { Form, Button, Card, Col, Row } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { SaveOutlined} from "@ant-design/icons"
import CropImageFiled from "../common/entryForm/CropImageFiled";
import { showErrorMessage } from "../../services/notifyService";
import Utils from "../../utils";
import { AppConstants, UploadFileTypes, UserTypes } from "../../constants";
import { actions } from "../../actions";

class ProfileForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.userData.avatar
        ? `${AppConstants.contentRootUrl}${props.userData.avatar}`
        : "",
      logo: props.userData.logoPath
        ? `${AppConstants.contentRootUrl}${props.userData.logoPath}`
        : "",
      avatarUploading: false,
    };

    this.isEmployee = actions.getUserData()?.kind === UserTypes.EMPLOYEE;
  }

  componentDidMount() {
    const { userData } = this.props;
    this.setFieldValue("avatar", userData.avatar);
    this.setFieldValue("logo", userData.logoPath);
  }

  handleConfirmPasswordBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToConfirmPassword = (rule, value) => {
    const {
      current: { validateFields, isFieldTouched },
    } = this.formRef;
    if (isFieldTouched("confirmPassword")) {
      validateFields(["confirmPassword"], { force: true });
    }
    return Promise.resolve();
  };

  compareToPassword = (rule, password) => {
    const newPassword = this.getFieldValue("password");
    if ((password || newPassword) && password !== newPassword) {
      return Promise.reject(
        this.props.t("form.validationMessage.passwordNotMatch")
      );
    } else {
      return Promise.resolve();
    }
  };

  handleChangeAvatar = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (avatar) =>
        this.setState({ avatar })
      );
    }
  };

  uploadFileAvatar = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ avatarUploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("avatar", result.data.filePath);
        this.setState({ avatarUploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ avatarUploading: false });
        }
      },
    });
  };

  handleChangeLogo = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) =>
        this.setState({ logo })
      );
    }
  };

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ logoUploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.LOGO },
      onCompleted: (result) => {
        this.setFieldValue("logo", result.data.filePath);
        // this.otherData.logo = result.data.filePath;
        this.setState({ logoUploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ logoUploading: false });
        }
      },
    });
  };

  render() {
    const { loading, userData, t } = this.props;
    const { avatar, avatarUploading } = this.state;

    return (
      <Form
        onFinish={this.handleSubmit}
        ref={this.formRef}
        initialValues={userData}
        layout="vertical"
        onValuesChange={this.onValuesChange}
        style={{ width: "600px" }}
      >
        <Card title={t(`baseField:${"accountInfo"}`)} className="card-form" bordered={false}>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <CropImageFiled
                fieldName="avatar"
                loading={avatarUploading}
                label={t("form.label.avatar")}
                imageUrl={avatar}
                onChange={this.handleChangeAvatar}
                uploadFile={this.uploadFileAvatar}
              />
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <TextField
                fieldName="username"
                min={6}
                validators={[Utils.validateUsernameForm]}
                label={t("form.label.username")}
                disabled
                required
              />
            </Col>
            <Col span={12}>
              <TextField
                fieldName="fullName"
                label={t("form.label.fullName")}
                required
                requiredMsg={t("form.validationMessage.fullNameRequire")}
                disabled={userData.kind !== UserTypes.ADMIN}
              />
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <TextField
                type="password"
                fieldName="oldPassword"
                label={t("form.label.oldPassword")}
                required
                requiredMsg={t("form.validationMessage.passwordRequire")}
              />
            </Col>
            <Col span={12}>
              <TextField
                type="password"
                fieldName="password"
                label={t("form.label.newPassword")}
                validators={[this.validateToConfirmPassword]}
              />
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <TextField
                type="password"
                fieldName="confirmPassword"
                label={t("form.label.confirmNewPassword")}
                validators={[this.compareToPassword]}
              />
            </Col>
          </Row>
        </Card>
        <div className="footer-card-form">
          <Row gutter={16} justify="end">
            <Col span={10}>
            <Row gutter={16} justify="end">
            <Col span={10}>
            <Button
            loading={loading}
            // className="profile-form-button"
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
          >
              {t(`basicSavePage:${"saveButton"}`)}
          </Button>
                </Col>
        </Row>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default ProfileForm;
