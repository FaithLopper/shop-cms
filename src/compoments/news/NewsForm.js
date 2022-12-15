import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { commonStatus } from "../../constants/masterData";
import NumericField from "../common/entryForm/NumericField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import RichTextField from "../../compoments/common/entryForm/RichTextField";
import CheckBoxField from "../../compoments/common/entryForm/CheckBoxField";

import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE,
  } from "../../constants";
  import Utils from "../../utils";
  import { showErrorMessage } from "../../services/notifyService";
import DropdownFieldWithSearch from "../common/entryForm/DropdownFieldWithSearch";


class NewsForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
          avatar: props.dataDetail.avatar
            ? `${AppConstants.contentRootUrl}/${props.dataDetail.avatar}`
            : "",
          uploading: false,
          banner: props.dataDetail.banner
            ? `${AppConstants.contentRootUrl}/${props.dataDetail.banner}`
            : "",
          uploadingBanner: false,
        };
    }

    getInitialFormValues = () => {
        const { isEditing, dataDetail, categoryOptions } = this.props;
        if (!isEditing) {
          return {
            status: STATUS_ACTIVE,
            categoryId: categoryOptions[0] && categoryOptions[0].value,
            ordering: 0,

          };
        }
        return {
          ...dataDetail,
          ordering: 0,
        };
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
        this.setState({ uploading: true });
        uploadFile({
            params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
            onCompleted: (result) => {
            this.setFieldValue("avatar", result.data.filePath);
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

    handleChangeBanner = (info) => {
      if (info.file.status === "done") {
        Utils.getBase64(info.file.originFileObj, (banner) =>
          this.setState({ banner })
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
    const { formId, categoryOptions, loadingSave, t, isEditing } = this.props;
    const { uploading, avatar, uploadingBanner, banner } = this.state;
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialFormValues()}
      >
        <Row gutter={16}>
            <Col span={12}>
                <CropImageFiled
                    fieldName="avatar"
                    loading={uploading}
                    label={t('form.label.avatar')}
                    imageUrl={avatar}
                    onChange={this.handleChangeAvatar}
                    uploadFile={this.uploadFileAvatar}
                    required
                    requiredMsg={t('form.validationMessage.avatarRequire')}
                    disabled={loadingSave}
                />
            </Col>
            <Col span={12}>
                <CropImageFiled
                    aspect={16/9}
                    fieldName="banner"
                    loading={uploadingBanner}
                    label={t('form.label.banner')}
                    imageUrl={banner}
                    onChange={this.handleChangeBanner}
                    uploadFile={this.uploadFileBanner}
                    disabled={loadingSave}
                />
            </Col>
        </Row>
    
        <Row gutter={16}>
          <Col span={12}>
            <TextField
                fieldName="title"
                label={t('form.label.title')}
                required
                disabled={loadingSave}
            />
            </Col>
            <Col span={12}>
                <DropdownFieldWithSearch
                fieldName="categoryId"
                label={t('form.label.category')}
                required
                options={categoryOptions}
                disabled={loadingSave || isEditing}
                />
            </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <div style={{marginTop: 4}}>
                <CheckBoxField
                  fieldName="pinTop"
                  label={t('form.label.pinTop')}
                  disabled={loadingSave}
                />
                <DropdownField
                fieldName="status"
                label={t('form.label.status')}
                required
                options={commonStatus}
                disabled={loadingSave}
                />
            </div>
          </Col>

          <Col span={12}>
                <TextField
                    fieldName="description"
                    label={t('form.label.description')}
                    type="textarea"
                    style={{height: "122px"}}
                    disabled={loadingSave}
                    required
                />
            </Col>
        </Row>
        <Row>
        <Col span={12} hidden>
            <NumericField
                width="100%"
                fieldName="ordering"
                label={t('form.label.ordering')}
                min={0}
                disabled={loadingSave}
                value
            />
          </Col>
        </Row>
        <Row gutter={16}>
            <Col span={24}>
                <RichTextField label={t('form.label.content')} fieldName="content" disabled={loadingSave} required/>
            </Col>
        </Row>
      </Form>
    );
  }
}

export default NewsForm;
