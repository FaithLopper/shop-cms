import React from "react";
import { Form, Col, Row, Card, Button, message } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import Utils from "../../utils";
import { commonStatus } from "../../constants/masterData";
import { AppConstants, UploadFileTypes } from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
import DropdownField from "../common/entryForm/DropdownField";
import PasswordGeneratorField from "../common/entryForm/PasswordGeneratorField";
import { KeyOutlined, CopyOutlined } from "@ant-design/icons";
import DropdownFieldWithSearch from "../common/entryForm/DropdownFieldWithSearch";

class EmployeeUpdateForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      uploading: false,
      curPassword: null,
      isUpdateLogo: false,
    };

    this.acceptFileTypes = ".png, .jpg, .jpeg, .webp";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDetail !== this.props.dataDetail) {
      this.formRef.current.setFieldsValue({
        ...nextProps.dataDetail.account,
        jobId: nextProps.dataDetail.job?.id,
        departmentId: nextProps.dataDetail.department?.id,
      });
    }
    if (
      Object.keys(nextProps.dataDetail).length !== 0 &&
      nextProps.dataDetail.account.avatar !== this.state.logo &&
      this.state.isUpdateLogo === false &&
      nextProps.dataDetail.account.avatar !== undefined
    ) {
      this.setState({
        logo: `${AppConstants.contentRootUrl}${nextProps.dataDetail.account.avatar}`,
      });
    }
  }

  onValuesChange = () => {
    const { setIsChangedFormValues } = this.props;
    setIsChangedFormValues(true);
  };

  handleSubmit(formValues) {
    const { onSubmit } = this.props;
    // console.log(formValues)
    onSubmit({ ...formValues });
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

  copyToClipboardAlert = () => {
    const { t } = this.props;
    message.success(t("constants:successMessage.copied"));
  };

  render() {
    const {
      formId,
      actions,
      categoryOptionsJob,
      categoryOptionsDepartment,
      t,
      isEditing,
      groupPermission,
    } = this.props;
    const { uploading, logo, curPassword } = this.state;

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
          <Row gutter={16}>
            <Col span={12}>
              <CropImageFiled
                fieldName="avatar"
                loading={uploading}
                label={t("form.label.avatar")}
                imageUrl={logo}
                onChange={this.handleChangeLogo}
                uploadFile={this.uploadFileLogo}
                requiredMsg={t("form.validationMessage.avatarRequire")}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <DropdownField
                fieldName={["group", "id"]}
                label={t("form.label.groupId")}
                required
                options={groupPermission}
                disabled={isEditing}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <TextField
                fieldName="username"
                label={t("form.label.username")}
                required
                disabled={isEditing}
                validators={[Utils.validateUsernameForm]}
              />
            </Col>
            <Col span={12}>
              <PasswordGeneratorField
                type="password"
                fieldName="password"
                label={
                  isEditing
                    ? t("form.label.newPassword")
                    : t("form.label.password")
                }
                required
                minLength={6}
                disabled
                value={this.getFieldValue("password")}
                suffix={
                  <>
                    <Button
                      onClick={() => {
                        const curPass = Utils.generateRandomPassword(
                          6,
                          true,
                          true,
                          false,
                          false,
                          true
                        );
                        this.setState({ curPassword: curPass });
                        this.setFieldValue("password", curPass);
                        this.onValuesChange();
                      }}
                    >
                      <KeyOutlined style={{ alignSelf: "center" }} />
                    </Button>
                    <Button
                      disabled={!curPassword}
                      onClick={() => {
                        Utils.copyToClipboard(this.getFieldValue("password"));
                        this.copyToClipboardAlert();
                      }}
                    >
                      <CopyOutlined style={{ alignSelf: "center" }} />
                    </Button>
                  </>
                }
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <TextField
                fieldName="fullName"
                label={t("form.label.fullName")}
                required
              />
            </Col>
            <Col span={12}>
              <DropdownField
                fieldName="status"
                label={t("form.label.status")}
                required
                options={commonStatus}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <TextField
                type="email"
                fieldName="email"
                label={t("form.label.email")}
                required
              />
            </Col>
            <Col span={12}>
              <TextField
                fieldName="phone"
                label={t("form.label.phone")}
                required
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DropdownFieldWithSearch
                fieldName="departmentId"
                label={t("form.label.departmentId")}
                required
                options={categoryOptionsDepartment}
              />
            </Col>
            <Col span={12}>
              <DropdownFieldWithSearch
                fieldName="jobId"
                label={t("form.label.jobId")}
                required
                options={categoryOptionsJob}
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

export default EmployeeUpdateForm;
