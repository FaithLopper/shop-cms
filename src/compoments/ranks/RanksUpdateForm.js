import React from "react";
import { Form, Col, Row, Card } from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import Utils from "../../utils";
import { AppConstants, UploadFileTypes } from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
class RanksUpdateForm extends BasicForm {
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

  render() {
    const { formId, actions, t } = this.props;
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
              fieldName="avatar"
              loading={uploading}
              // label={t("form.label.avatar")}
              imageUrl={logo}
              onChange={this.handleChangeLogo}
              uploadFile={this.uploadFileLogo}
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
                  fieldName="target"
                  label={t("form.label.target")}
                  required
                  type="number"
                  // disabled={loadingSave}
                />
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

export default RanksUpdateForm;
