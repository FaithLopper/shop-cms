import React from 'react';
import { Form, Col, Row, Card, Button, Input, Select } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import CropImageFiled from '../common/entryForm/CropImageFiled';
import Utils from "../../utils";
import { MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import { commonStatus, productKind, variantTemplateConfig } from '../../constants/masterData';
import {
    AppConstants,
    UploadFileTypes,
  } from "../../constants";
  import { showErrorMessage } from "../../services/notifyService";
import DropdownField from '../common/entryForm/DropdownField';
import NumericField from '../common/entryForm/NumericField';
import CheckBoxField from '../common/entryForm/CheckBoxField';
import FieldSet from '../common/elements/FieldSet';
import BasicModal from '../common/modal/BasicModal';
import VariantListForm from '../variant/VariantListForm';
import VariantTemplateSortable from './VariantTemplateSortable';
import {arrayMoveImmutable} from "array-move";
import VariantTemplateListForm from '../variant/VariantTemplateListForm';
import TagField from '../common/entryForm/TagField';
class ProductUpdateForm extends BasicForm {

    constructor(props) {
        super(props)
        this.state = {
            image: "",
			uploading: false,
            isUpdateLogo:false,
            templateConfigData:[],
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
            dataList:[],
            dataListTemplate:[],
            name:"",
            id:null,
            formChanged:false,
            isTemplate:false,
            chooseKind:productKind[0].value,
        }
        this.configIndex=0
        this.selectedVariant=null
        this.onShowModifiedModal= this.onShowModifiedModal.bind(this)
        this.onCancelModal= this.onCancelModal.bind(this)
        this.onVariantSelect= this.onVariantSelect.bind(this)
        this.onVariantTemplateSelect= this.onVariantTemplateSelect.bind(this)
        this.removeVariantItem=this.removeVariantItem.bind(this)
        this.removeVariant=this.removeVariant.bind(this)
        this.addVariantTemplateItem= this.addVariantTemplateItem.bind(this)
        this.addImageVariant= this.addImageVariant.bind(this)
        this.changeVariant= this.changeVariant.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataDetail !== this.props.dataDetail) {
            this.formRef.current.setFieldsValue(nextProps.dataDetail)
            this.setState({
                templateConfigData:nextProps.dataDetail.variantConfigs,
                id:nextProps.dataDetail.id,
            })
            this.parentProductId= nextProps.dataDetail.parentProductId
            if(nextProps.dataDetail.kind === 2){
                // this.setState({
                //     chooseKind:2
                // })
                // console.log(nextProps.dataDetail)
            }
            const {variantConfigs} = nextProps.dataDetail
            variantConfigs.map(item => {
                this.setFieldValue(`name_${item.id}`,item.name)
                this.setFieldValue(`choiceKind_${item.id}`,item.choiceKind)
                this.setFieldValue(`isRequired_${item.id}`,item.isRequired)
                return 0;
            })
        }
        if(nextProps.dataDetail.image !== this.state.image && this.state.isUpdateLogo === false && nextProps.dataDetail.image!==undefined){
            this.setState({image:`${AppConstants.contentRootUrl}${nextProps.dataDetail.image}`})
        }
    }

    uploadFileLogo = (file, onSuccess) => {
		const { uploadFile } = this.props;
		this.setState({ uploading: true });
		uploadFile({
		params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
		onCompleted: (result) => {
			// this.otherData.logoPath = result.data.filePath;
			this.setFieldValue("image", result.data.filePath);
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

    handleChangeLogo = (info) => {
		if (info.file.status === "done") {
		Utils.getBase64(info.file.originFileObj, (logo) =>{
			this.setState({ image:logo,isUpdateLogo:true })
        }
		);
		}
	};

    onValuesChange = () => {
        const { setIsChangedFormValues } = this.props
        setIsChangedFormValues(true)
    }

    handleSubmit(formValues) {
        const { onSubmit } = this.props
        const {templateConfigData,id}= this.state
        let tags =''
        if(formValues.tags){
            if(formValues.tags.length !==0){
                formValues.tags.map((item, index) =>{
                    tags= tags.concat(`${item}`)
                    if(formValues.tags.length > 1 && index !== formValues.tags.length -1)
                        tags= tags.concat(' ')
                    
                    return 0;
                })
            }
        }
        onSubmit({
           ...formValues,
           id:id,
           tags:tags,
           productConfigs:templateConfigData,
        })
    }


	getInitialFormValues = () => {
		const { isEditing, dataDetail } = this.props;
		if (!isEditing) {
		return {
		};
		}
		return {
            ...dataDetail,
        };
	};

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
                params:{},
                onCompleted: ({data}) => {
                    this.setState({
                        dataList:  this.getDataDetailMapping(data)
                    })
                    this.selectedVariant= index
                    this.selectedVariantArray= _index
                    this.setState({
                        isTemplate:false
                    })
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

    addVariantTemplateItem =()=>{
        const { getListTemplate } = this.props;
        getListTemplate(
            {
                params:{},
                onCompleted: ({data}) => {
                    this.setState({
                        dataListTemplate:  this.getDataDetailMapping(data),
                        isTemplate:true
                    })
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
            this.setState({
            templateConfigData:templateConfigData.filter(itemArray => itemArray.index !== index)
    })
    this.onValuesChange();
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
            this.onValuesChange();
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
        this.onValuesChange();
        this.setState({ isShowModifiedModal: false, isShowModifiedLoading: false });
    }

    onVariantTemplateSelect(template) {
        const {templateConfigData} = this.state
        const {getTemplate} = this.props
        getTemplate(
            {
                params:{id:template.id},
                onCompleted: ({data}) => {
                        const temp= [
                            ...templateConfigData,
                            ...data.variantConfigs.map(item =>{
                                return {
                                    ...item,
                                    index:this.autoGenerateUniqueId(),
                                    variantIds:item.variants
                                }
                            })
                        ]
                        this.setState({
                            templateConfigData:temp
                        })
                },
                onError: (err) => {
                    if (err && err.message) {
                        showErrorMessage(err.message);
                        this.setState({ uploading: false });
                        }
                }
            }
        )
        this.onValuesChange();
        this.setState({ isShowModifiedModal: false, isShowModifiedLoading: false });
    }

    componentDidMount(){
      
    }
    componentDidUpdate(){
        const{templateConfigData}= this.state
        if(templateConfigData.length !==0){
            templateConfigData.map(item => {
                this.setFieldValue(`name_${item.index}`,item.name)
                this.setFieldValue(`choiceKind_${item.index}`,item.choiceKind)
                this.setFieldValue(`isRequired_${item.index}`,item.isRequired)
                return 0;
            })
        }
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

    setConfigField(text, index,kind){
        const {templateConfigData} = this.state
        this.onValuesChange();
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

    onSortEnd = ({oldIndex, newIndex,data,id}) => {
            const {templateConfigData}= this.state
            let dataSorted=arrayMoveImmutable(data, oldIndex, newIndex)
            this.setState({
                data: arrayMoveImmutable(data, oldIndex, newIndex),
            templateConfigData:templateConfigData.map((item,index) =>{
                if(item.index=== id){
                    return {
                        ...item,
                        variantIds:dataSorted
                    }
                }
                return item
            }
            )
        });
        this.onValuesChange();
      };

      addImageVariant(path,index,id){
        const {templateConfigData}= this.state
        let temp= templateConfigData.map(item =>{
            if(item.index === id){
                return {
                    ...item,
                    variantIds:item.variantIds.map(item_1 =>{
                        if(item_1.id === index){
                            return {
                                ...item_1,
                                image:path
                            }
                        }
                        return item_1
                    })
                }
            }
            return item
        })
        this.setState({
            templateConfigData:temp
        })
      }

      changeVariant(text,id, index, type){
            const {templateConfigData}= this.state
            let temp= templateConfigData.map(item =>{
                if(item.index === id){
                    return {
                        ...item,
                        variantIds:item.variantIds.map(item_1 =>{
                            if(item_1.id === index){
                                if(type ===1)
                                    return {
                                        ...item_1,
                                        name:text
                                    }
                                else if(type ===2 )
                                    return {
                                        ...item_1,
                                        price:text
                                    }
                            }
                            return item_1
                        })
                    }
                }
                return item
            })
            this.setState({
                templateConfigData:temp
            })
            this.onValuesChange();
      }

    autoGenerateUniqueId(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
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
                                    ]} name={`name_${item.index}`}>
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
                                    ]} name={`choiceKind_${item.index}`}>
                                <Select placeholder='Loại' options={variantTemplateConfig} onSelect={e=> this.setConfigField(e,item.index,2)}/>
                               </Form.Item>
                            </Col>
                        </Row>
                        <div className='row-checkbox'>
                        <Row gutter={[16, 0]}>
                              <Col span={24}>
                                                <CheckBoxField
                                                optionLabel={t("form.label.required")}
                                                onChange={e=> this.setConfigField(e.target.value,item.index,3)}
                                fieldName={`isRequired_${item.index}` }
                                />
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    <Col span={15}>
                    <FieldSet title='Danh sách thuộc tính'>
                        <Row gutter={[12, 0]}>
                                <VariantTemplateSortable onValuesChange={this.onValuesChange} changeVariant={this.changeVariant} addImageVariant={this.addImageVariant}  uploadFile={this.props.uploadFile} onSortEnd={this.onSortEnd} removeVariantItem={this.removeVariantItem}  data={item.variantIds} id={item.index}/>
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

    render() {
        const { formId, actions, isEditing,t,tagOption ,categoryId,parentProduct,onProductCategoryParentChange,categoryChildId} = this.props
        const {
            uploading,
			image,
            isShowModifiedModal,
            isShowModifiedLoading,
            dataList,
            dataListTemplate,
            isTemplate,
            chooseKind
        } = this.state
        const variantData = dataList.data || [];
        const variantTemplateData = dataListTemplate.data || [];
        return (
            <>
            <Form
                id={formId}
                onFinish={this.handleSubmit}
                ref={this.formRef}
                initialValues={this.getInitialFormValues()}
                layout="vertical"
                onValuesChange={this.onValuesChange}
                style={{width:"800px"}}
            >
                <Card title='THÔNG TIN SẢN PHẨM' className="card-form" bordered={false}>
                    <div className='product-wrapper'>

                     <Row gutter={[16, 0]} >
                        <Col span={12}>
                            <CropImageFiled 
                            fieldName="image"  
                            loading={uploading}
                            label={t("form.label.image")}
                            imageUrl={image}
                            onChange={this.handleChangeLogo}
                            uploadFile={this.uploadFileLogo}
                            // disabled={loadingSave}
                            />
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <TextField fieldName="name" label={t("form.label.name")} required 
                            // disabled={loadingSave}
                            />
                        </Col>
                        <Col span={12}>
                        <DropdownField
                        fieldName="kind"
                        label={t("form.label.kind")}
                        required={parentProduct ? false :true}
                        options={productKind}
                        defaultValue={parentProduct? 1 :null}
                        disabled={isEditing ? true : parentProduct? true :false}
                        onChange={(e)=>{this.setState({chooseKind:e})}}
                        />
                        </Col>
                            </Row>
                        <Row gutter={[16, 0]}>
                            <Col span={12}>
                            <Form.Item  label={t("form.label.categoryId")}>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                        <DropdownField
                        fieldName="categoryId"
                        // label={t("form.label.categoryId")}
                        required
                        options={categoryId}
                        placeholder="Danh mục cha"
                        onChange={(e)=>{
                            this.setFieldValue("categoryChildId","")
                            onProductCategoryParentChange(e)}}
                        />
                        </Col>
                        <Col span={12}>
                        <DropdownField
                        fieldName="categoryChildId"
                        // label={t("form.label.categoryId")}
                        options={categoryChildId}
                        placeholder="Danh mục con"
                        />
                        </Col>
               
                        </Row>
                        </Form.Item>
                            </Col>
                            
                        <Col span={12}>
                            {chooseKind===1 ? <NumericField
							fieldName="price"
                            required
							label={t("form.label.price") + " (VNĐ)"}
							min={0}
							max={Infinity}
							width="100%"
							parser={(value) => Utils.formatIntegerNumber(value)}
						/> :<></>}
                       
                        </Col>
                        </Row>
                        <Row gutter={[16,0]}>
                            <Col span={12}>
                                {/* <TextField fieldName="tags" label={t("form.label.tags")} 
                                // disabled={loadingSave}
                                /> */}
                                <TagField 
                                fieldName="tags" 
                                label={t("form.label.tags")} 
                                allowClear={true} 
                                options={tagOption}/>
                            </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={24}>
                        <TextField
                    type="textarea"
                    fieldName="description"
                    label={t("form.label.description")}
                    // required
                    style={{
                        height: 100
                    }}/>
                        </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                        <Col span={12}>
                        <DropdownField
                        fieldName="status"
                        label={t("form.label.status")}
                        required
                        options={commonStatus}
                        />
                        </Col>
                       
                        <Col span={12}
                        style={{paddingTop: '30px'}}
                        >
                        <CheckBoxField
                        fieldName="isSoldOut"
                        optionLabel={t("form.label.isSoldOut")}
                        defaultValue={false}
                        />
                        </Col>
                        </Row>
                        {chooseKind === 1 ?  <FieldSet className="customer-fieldset-variant-template" title='Cấu hình thuộc tính' >
                            <Col span={24}>
                            {this.renderTemplateConfig()}

                            <Row gutter={[16,0]}>
                                <Col span={8}>
                            <Button type="dashed" className='add-variant' onClick={()=>{this.addConfigItem()}} block icon={<PlusOutlined />}  >
                            Tạo bộ thuộc tính
                            </Button>

                                </Col>
                                <Col span={12}>
                            <Button type="dashed" className='add-variant' onClick={()=>{this.addVariantTemplateItem()}} block icon={<PlusOutlined />}  >
                            Thêm bộ thuộc tính có sẵn
                            </Button>
                                </Col>
                            </Row>
                            </Col>
                            <Col span={24}>
                           
                            </Col>
                        </FieldSet> :<></>}
                       
                        </div>
                </Card>
                <div className="footer-card-form">
                    <Row gutter={16} justify="end">
                        <Col align="right" span={10}>{actions}</Col>
                    </Row>
                </div>
            </Form>
             <BasicModal
             visible={isShowModifiedModal}
             loading={isShowModifiedLoading}
           //   onOk={this.onOkModal}
             onCancel={this.onCancelModal}
             >
                {
                    isTemplate ?  <VariantTemplateListForm
                    t={t}
                    dataSource={variantTemplateData}
                    onVariantTemplateSelect={this.onVariantTemplateSelect}
                 //    selectedVariantArray={this.state.templateConfigData[this.selectedVariantArray]?.variantIds || []}
                    /> :
                    <VariantListForm
                    t={t}
                    dataSource={variantData}
                    onVariantSelect={this.onVariantSelect}
                    selectedVariantArray={this.state.templateConfigData[this.selectedVariantArray]?.variantIds || []}
                    /> 
                }
           </BasicModal>
               </>
        )
    }
}

export default ProductUpdateForm;