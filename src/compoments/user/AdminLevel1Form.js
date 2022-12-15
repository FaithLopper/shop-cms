import React from 'react';
import { Form, Col, Row, Card, Button, message } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import CropImageFiled from '../common/entryForm/CropImageFiled';
import Utils from "../../utils";
import { KeyOutlined, CopyOutlined } from '@ant-design/icons';
import { commonStatus } from '../../constants/masterData';
import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE,
  } from "../../constants";
  import { showErrorMessage } from "../../services/notifyService";
import PasswordGeneratorField from '../common/entryForm/PasswordGeneratorField';
import DropdownField from '../common/entryForm/DropdownField';
class AdminLevel1Form extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            logo: "",
			uploading: false,
            curPassword: null,
            isUpdateLogo:false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            this.formRef.current.setFieldsValue(nextProps.dataDetail)
        }
        if(nextProps.dataDetail.avatar !== this.state.logo && this.state.isUpdateLogo === false && nextProps.dataDetail.avatar!==undefined){
            this.setState({logo:`${AppConstants.contentRootUrl}${nextProps.dataDetail.avatar}`})
        }
    }

    onValuesChange = () => {
        const { setIsChangedFormValues } = this.props
        setIsChangedFormValues(true)
    }

    handleSubmit(formValues) {
        const { onSubmit } = this.props
        
        onSubmit({
            ...formValues,
        })
    }

    uploadFileLogo = (file, onSuccess) => {
		const { uploadFile } = this.props;
		this.setState({ uploading: true });
		uploadFile({
		params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
		onCompleted: (result) => {
			// this.otherData.logoPath = result.data.filePath;
			this.setFieldValue("avatar", result.data.filePath);
			this.setState({ uploading: false })
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
		return {
            ...dataDetail,
        };
	};

    handleChangeLogo = (info) => {
		if (info.file.status === "done") {
		Utils.getBase64(info.file.originFileObj, (logo) =>{
			this.setState({ logo:logo,isUpdateLogo:true })
        }
		);
		}
	};

    copyToClipboardAlert = () => {
        const { t } = this.props;
        message.success( t('constants:successMessage.copied'));
    };

    render() {
        const { formId, actions, isEditing,t , groupPermission } = this.props
        const {
            uploading,
			logo,
            curPassword
        } = this.state
        return (
            <Form
                id={formId}
                onFinish={this.handleSubmit}
                ref={this.formRef}
                initialValues={this.getInitialFormValues()}
                layout="vertical"
                onValuesChange={this.onValuesChange}
                style={{width:"600px"}}
            >
                <Card title={t(`baseField:${"basicInfo"}`)} className="card-form" bordered={false}>
                        <Row gutter={[16, 0]} >
                        <Col span={12}>
                            <CropImageFiled
                            fieldName="avatar"  
                            loading={uploading}
                            label={t("form.label.avatar")}
                            imageUrl={logo}
                            onChange={this.handleChangeLogo}
                            uploadFile={this.uploadFileLogo}
                            // disabled={loadingSave}
                            />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]} >
                        <Col span={12}>
                        <DropdownField
                fieldName={["group","id"]}
                label={t("form.label.groupId")}
                required
                options={groupPermission}
                disabled={isEditing}
              />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <TextField
                            fieldName="username"
                            min={6}
                            label={t("form.label.username")}
                            disabled={isEditing}
                            required={!isEditing}
                            validators={[Utils.validateUsernameForm]}
                            />
                        </Col>
                        <Col span={12}>
                            <TextField fieldName="fullName" label={t("form.label.fullName")} required 
                            // disabled={loadingSave}
                            />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                            <Col span={12}>
                            <PasswordGeneratorField
                        type="password"
                        fieldName="password"
                        label={isEditing ? t("form.label.newPassword") : t("form.label.password")}
                        required
                        minLength={6}
                        disabled
                        value={this.getFieldValue('password')}
                        suffix={
                            <>
                                <Button onClick={
                                    () => {
                                        const curPass = Utils.generateRandomPassword(6, true, true, false, false, true)
                                        this.setState({curPassword: curPass})
                                        this.setFieldValue('password', curPass)
                                        this.onValuesChange()
                                    }}
                                >
                                    <KeyOutlined style={{ alignSelf: 'center'}}/>
                                </Button>
                                <Button disabled={!curPassword} 
                                    onClick={()=>{
										Utils.copyToClipboard(this.getFieldValue('password'))
										this.copyToClipboardAlert()
									}}>
                                <CopyOutlined style={{ alignSelf: 'center' }}/></Button>
                            </>
                        }
                    />
                            </Col>
                            <Col span={12}>
                            <TextField
                            type="number"
                            fieldName="phone"
                            label={t("form.label.phone")}
                            required
                            minLength={10}
                            // disabled={loadingSave}
                            />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <TextField fieldName="email" label="E-mail" type="email" 
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
                       </Col>
                        </Row>
                </Card>
                <div className="footer-card-form">
                    <Row gutter={16} justify="end">
                        <Col align="right" span={10}>{actions}</Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default AdminLevel1Form;