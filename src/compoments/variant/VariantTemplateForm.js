import React from 'react';
import { Form, Col, Row, Card, Button, Input, Select } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import { PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import { variantTemplateConfig } from '../../constants/masterData';
import { showErrorMessage, showWarningMessage } from "../../services/notifyService";
import CheckBoxField from '../common/entryForm/CheckBoxField';
import BasicModal from '../common/modal/BasicModal';
import VariantListForm from './VariantListForm';
import {SaveOutlined} from '@ant-design/icons';
import FieldSet from '../common/elements/FieldSet'
class VariantTemplateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            templateConfigData:[],
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
            dataList:[],
            name:"",
            id:null,
            formChanged:false,
        }
        this.configIndex=0
        this.selectedVariant=null
        this.onShowModifiedModal= this.onShowModifiedModal.bind(this)
        this.onCancelModal= this.onCancelModal.bind(this)
        this.onVariantSelect= this.onVariantSelect.bind(this)
        this.removeVariantItem=this.removeVariantItem.bind(this)
        this.removeVariant=this.removeVariant.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            this.setState({
                templateConfigData:nextProps.dataDetail.variantConfigs,
                name:nextProps.dataDetail.name,
                id:nextProps.dataDetail.id
            })
            this.setFieldValue("name",nextProps.dataDetail.name)
            const {variantConfigs} = nextProps.dataDetail
            variantConfigs.map(item =>{
                this.setFieldValue(`name_${item.id}`,item.name)
                this.setFieldValue(`choiceKind_${item.id}`,item.choiceKind)
                this.setFieldValue(`isRequired_${item.id}`,item.isRequired)
                return 0;
            })
        }
    }

    onValuesChange = () => {
        const { setIsChangedFormValues } = this.props
        setIsChangedFormValues(true)
    }

    handleSubmit(formValues) {
        const { onSubmit } = this.props;
        const {templateConfigData,name,id}= this.state
        let pass=true
        templateConfigData.map(item => {
            if(item.variantIds.length === 0 || item.variantIds.length === undefined){
                pass =false
            }
            return 0;
        })
        if(pass)
        onSubmit({
            name:name,
            variantConfigs:templateConfigData,
            id:id,
        })
        else{
            showWarningMessage('Cấu hình thuộc tính phải chọn ít nhất một thuộc tính')
        }
    }


	getInitialFormValues = () => {
		const { isEditing, dataDetail } = this.props;
        if(dataDetail.name !== undefined){
            if (!isEditing) {
                return {};
                }
                return {
                    ...dataDetail,
                };
        }
	};

    setConfigField(text, index,kind){
        const {templateConfigData} = this.state
        this.setState({
            templateConfigData:templateConfigData.map((item,key)=>{
                if(item.index === index){
                    if(kind ===1)
                        return {
                        ...item,
                        name:text
                        }
                    else if(kind === 2)
                        return {
                            ...item,
                            choiceKind:text
                    }
                    else if(kind === 3)
                        return {
                            ...item,
                            isRequired:!item.isRequired
                        }
                }
                return item
            })
        })
    }

    renderTemplateConfig =()=>{
        const {templateConfigData}= this.state
        const { t } = this.props
        return templateConfigData.map((item,_index)=>{
            return (<>
                <div className='variant-config-wrapper'>

                <Row gutter={[12, 18]}>
                    <Col span={8}>
                        <Row gutter={[16, 0]}>
                            <Col span={24}>
                               <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Nhập tên cấu hình thuộc tính!',
                                    },
                                    ]} name={item.id ? `name_${item.id}` :`name_${item.index}`}>
                                <Input placeholder='Tên' onChange={e=> this.setConfigField(e.target.value,item.index,1)}/>
                               </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                              <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Chọn loại nhóm thuộc tính!',
                                    },
                                    ]} name={ item.id ?`choiceKind_${item.id}`:`choiceKind_${item.index}`}>
                                <Select placeholder='Loại' options={variantTemplateConfig} onSelect={e=> this.setConfigField(e,item.index,2)}/>
                               </Form.Item>
                            </Col>
                        </Row>
                        <div className='row-checkbox'>
                        <Row gutter={[16, 0]} style={{marginTop: 7}}>
                              <Col width={30}>
                                                <CheckBoxField
                                                optionLabel={t("form.label.required")}
                                                width={30}
                                                onChange={e=> this.setConfigField(e.target.value,item.index,3)}
                                fieldName={item.id ?`isRequired_${item.id}`:`isRequired_${item.index}` }
                                />
                               
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    <Col span={15}>
                    <FieldSet title='Danh sách thuộc tính'>
                        <Row gutter={[12, 0]}>
                                <Col span={24}>
                                {item.variantIds.lenght !==0 ? 
                                    <>
                                    {item.variantIds.map((data,index) => {
                                        return <Row gutter={8}>
                                            <Col span={16}> 
                                            <Form.Item>
                                                    <Input value={data.name} disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}> 
                                                <Form.Item>
                                                    <Input value={data.price} disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}> 
                                            <MinusCircleOutlined onClick={e =>{this.removeVariantItem(data,data.id,item.index)}}/>
                                            </Col>
                                        </Row>
                                    })}
                                    </>
                                 :<></> }
                              
                                </Col>
                                <Col span={22}>
                                <Button type="dashed" onClick={()=>{this.addVariantItem(item.index,_index)}} block icon={<PlusOutlined />}  >
                                    Thêm thuộc tính
                                </Button>
                                </Col>
                        </Row>
                    </FieldSet>
                    </Col>
                    <Col span={1} type="flex" align="middle" className='variant-delete-icon'>
                        <MinusCircleOutlined style={{'fontSize':"19px","color":"red"}} onClick={()=>this.removeVariant(item.index)}/>
                    </Col>
                </Row>
                                    
                </div>
                </>)
        })
    }

    addConfigItem =()=>{
        this.setState({
            templateConfigData:[    
                ...this.state.templateConfigData,
                {
                    index:this.configIndex++,
                    name:"",
                    choiceKind:"",
                    isRequired:false,
                    variantIds:[]
                }
            ]
        })
    }

    getDataDetailMapping(data) {
        return data;
    }

    addVariantItem =(index,_index)=>{
        const { getList } = this.props;
        getList(
            {
                params:{size:1000},
                onCompleted: ({data}) => {
                    this.setState({
                        dataList:  this.getDataDetailMapping(data)
                    })
                    this.selectedVariant= index
                    this.selectedVariantArray= _index
                    this.onShowModifiedModal(true);
                    // hideFullScreenLoading();
                },
                onError: (err) => {
                    if (err && err.message) {
                        showErrorMessage(err.message);
                        this.setState({ uploading: false });
                        }
                }
            }
        )
        
    }

    removeVariant =(index)=>{
        const {templateConfigData} = this.state
        if(templateConfigData.length > 1)
            this.setState({
            templateConfigData:templateConfigData.filter(itemArray => itemArray.index !== index)
        })
        if(templateConfigData.length === 1){
            showWarningMessage('Phải có ít nhất một bộ thuộc tính')
        }
    }

    removeVariantItem =(data,key,parenIndex)=>{
        const {templateConfigData} = this.state
        const temp= templateConfigData.map((item,index)=>{
                    if(item.index === parenIndex){
                        return {
                            ...item,
                            variantIds:item.variantIds.filter(function(itemArray) {
                                return itemArray.id !== key
                            })
                        }
                    }
                    return item
                })
            this.setState({
                templateConfigData:temp
            })
        }


    onVariantSelect(variant) {
        const {templateConfigData} = this.state
        this.setState({
            templateConfigData:templateConfigData.map((item,index)=>{
                if(item.index === this.selectedVariant){
                    return {
                        ...item,
                        variantIds:[
                            ...item.variantIds,
                            variant,
                        ]
                    }
                }
                return item
            })
        })

        this.setState({ isShowModifiedModal: false, isShowModifiedLoading: false });
    }

    onCancelModal() {
        this.setState({ isShowModifiedModal: false, isShowModifiedLoading: false });
    }

    onShowModifiedModal() {
        this.setState({ isShowModifiedModal: true });
    }

    formValidate(){
        const {templateConfigData}= this.state
        if(templateConfigData.length === 0)
            return true
    }

    render() {
        const {t,isSubmitting} = this.props
        const {dataList}= this.state
        const variantData = dataList.data || [];
        const {
            isShowModifiedModal,
            isShowModifiedLoading,
          } = this.state;
        return (
            <>
            <Form
                id='form-variant-template'
                onFinish={this.handleSubmit}
                ref={this.formRef}
                initialValues={this.getInitialFormValues()}
                layout="vertical"
                // onValuesChange={this.onValuesChange}
                style={{width:"600px"}}
            >
                <Card title='THÔNG TIN NHÓM THUỘC TÍNH ' className="card-form" bordered={false}>
                        <Row gutter={[16, 0]}>
                            <Col span={12}>
                        <Form.Item  name='name' rules={[
          {
            required: true,
            message: 'Nhập tên nhóm thuộc tính!',
          },
        ]}>
                                <Input placeholder='Tên nhóm thuộc tính' onChange={e =>this.setState({name:e.target.value})}/>
                            </Form.Item>
                        </Col>
                        </Row>
                        <FieldSet className="customer-fieldset-variant-template" title='Cấu hình thuộc tính' >
                            <Col span={24}>
                            {this.renderTemplateConfig()}
                            <Button type="dashed" className='add-variant' onClick={()=>{this.addConfigItem()}} block icon={<PlusOutlined />}  >
                            Thêm nhóm thuộc tính 
                            </Button>
                            </Col>
                        </FieldSet>
                        <Row gutter={[16, 0]}>
                        <Col span={24}>
                        
                        </Col>
                        </Row>
                                
                </Card>
                <div className="footer-card-form">
                    <Row gutter={16} justify="end">
                        <Col align="right" span={10}>
                            <Row gutter={16} justify="end">
                <Col span={10}>
                <Button
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    form='form-variant-template'
                    icon={<SaveOutlined />}
                    disabled={this.formValidate()}
                    loading={isSubmitting}
                    >
                {t(`basicSavePage:${"saveButton"}`)}
                </Button>
                </Col>
            </Row>
                            </Col>
                    </Row>
                </div>
            </Form>
            <BasicModal
          visible={isShowModifiedModal}
          loading={isShowModifiedLoading}
        //   onOk={this.onOkModal}
          onCancel={this.onCancelModal}
        >
          <VariantListForm
            t={t}
            dataSource={variantData}
            onVariantSelect={this.onVariantSelect}
            selectedVariantArray={this.state.templateConfigData[this.selectedVariantArray]?.variantIds || []}
            // loading={loading}
          />
        </BasicModal>
            </>
        )
    }
}

export default VariantTemplateForm;