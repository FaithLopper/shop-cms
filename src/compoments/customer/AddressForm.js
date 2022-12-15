import React from 'react';
import { Form, Col, Row, Card, message } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import Utils from "../../utils";
import {
    AppConstants,
    STATUS_ACTIVE,
    ProvinceKinds,
  } from "../../constants";
class AddressForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            logo: "",
			uploading: false,
            curPassword: null,
            isUpdateLogo:false
        }
        this.provinceOption=[]
        this.districtOption=[]
        this.communeOption=[]
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            const {dataDetail}= nextProps
            let data={
                ...dataDetail
            }
            this.formRef.current.setFieldsValue(data)
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


	getInitialFormValues = () => {
        const { isEditing, dataDetail,communeOption,provinceOption, districtOption } = this.props;
		if(provinceOption){
            this.provinceOption= provinceOption.map(item=>{
                return {value:item.id,label:item.name}
            })
        }
        if(districtOption){
            this.districtOption= districtOption.map(item=>{
                return {value:item.id,label:item.name}
            })
        }
        if(communeOption){
            this.communeOption= communeOption.map(item=>{
                return {value:item.id,label:item.name}
            })
        }
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
    handleChangeLocation =(id,kind)=>{
        const {getLocation}= this.props
        if(kind === ProvinceKinds.province.level){
            // const page = this.pagination.current ? this.pagination.current - 1 : 0;
            const params = {
              page:0,
              size: 64,
            //   search: this.search,
              kind: ProvinceKinds.district.name,
              parentId: id,
            };
            getLocation({ params });
            // getLocation({page:0, size: 64,kind:ProvinceKinds.district.level,parentId:id})
        }
        if(kind === ProvinceKinds.district.level){
            // const page = this.pagination.current ? this.pagination.current - 1 : 0;
            const params = {
              page:0,
              size: 64,
            //   search: this.search,
              kind: ProvinceKinds.commune.name,
              parentId: id,
            };
            getLocation({ params });
            // getLocation({page:0, size: 64,kind:ProvinceKinds.district.level,parentId:id})
        }
    }

    locationOnSelect=(kind)=>{
        const {getLocation}= this.props
        const params = { page:0, size: 64,search:{kind:kind}};
        if(this.provinceOption.length===0){
            getLocation({params})
        }
    }

    render() {
        const { formId, t } = this.props
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
                <Card title={t(`baseField:${"address"}`)} className="card-form" bordered={false}>
                        
                <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <TextField
                            disabled={true}
                            fieldName="receiverFullName"
                            label={t("form.label.receiverFullName")}
                            required
                        />
                        </Col>
                       <Col span={12}>
                       <TextField
                            type="number"
                            fieldName="phone"
                            label={t("form.label.phone")}
                            required
                            minLength={10}
                            disabled
                            // disabledd={loadingSave}
                            />
                       </Col>
                        </Row>
                      
                        <Row gutter={[16, 0]}>
                        <Col span={8}>
                        <TextField
                        fieldName="province"
                        label={t("form.label.provinceId")}
                        required
                        disabled
                        allowClear
                        // options={this.provinceOption}
                        onClick={e=>this.locationOnSelect(ProvinceKinds.province.level)}
                        onSelect={value=>this.handleChangeLocation(value,ProvinceKinds.province.level)}
                    />
                        </Col>
                        <Col span={8}>
                        <TextField
                        fieldName="district"
                        label={t("form.label.districtId")}
                        required
                        allowClear
                        disabled
                        // options={this.districtOption}
                        onChange={value=>this.handleChangeLocation(value,ProvinceKinds.district.level)}
                    />
                        </Col>
                        <Col span={8}>
                        <TextField
                        fieldName="ward"
                        label={t("form.label.wardId")}
                        required
                        disabled
                        allowClear
                        // options={this.communeOption}
                        onChange={value=>this.handleChangeLocation(value,ProvinceKinds.commune.level)}
                    />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={24}>
                            <TextField
                            fieldName="addressDetails"
                            required
                            disabled={true}
                            label={t('form.label.addressDetails')}
                            />
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                        {/* <RadioField
                            fieldName="isDefault"
                            label={t('form.label.isDefault')}
                            disabled
                            /> */}
                        </Col>
                       <Col span={12}>
                       </Col>
                    
                        </Row>
                        <Row >
                        <Col span={24}>
                        <TextField
                        type="textarea"
                        fieldName="note"
                        label={t("form.label.note")}
                        disabled={true}
                        style={{
                            height: 180,
                        }}
            />
                        </Col>
                       </Row>
                </Card>
                {/* <div className="footer-card-form">
                    <Row gutter={16} justify="end">
                        <Col align="right" span={10}>{actions}</Col>
                    </Row>
                </div> */}
            </Form>
        )
    }
}

export default AddressForm;