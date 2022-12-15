import React from "react";
import { connect } from "react-redux";
import { Button, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { AppConstants } from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import Utils from "../../utils";
import qs from 'query-string';
const { getUserData } = actions;
class ProductListPage extends ListBasePage {
  initialSearch() {
    return { name: "", value: ""};
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'product';
    // const {
    //   location: { search },
    // } = this.props;
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.state={
        categoryId:[]
      }
    this.columns = [
      {
        title: "Hình ảnh",
        dataIndex: "image",
        align: 'center',
        width: '100px',
        render: (image) => (
            <Avatar
              shape="square"
              size="large"
              icon={<UserOutlined />}
              src={image ? `${AppConstants.contentRootUrl}${image}` : null}
            />
        ),
      },
      // { title:  t("table.name"), dataIndex: "name",width:'250px'},
      { title: t("table.name"),width:'250px',render: (dataRow) => {
        if(dataRow.kind === 2)
          return (
              <span className="routing" onClick={()=>{
                  this.handleRouting(dataRow.id);
              }}>
                  {dataRow.name}
              </span>
          )
        return <span>{dataRow.name}</span>
    } },
      {
        title: t("table.price") + ' (VNĐ)',
        dataIndex: "price",
        align: 'right',
        width:'100px',
        render: (price) => (
          <div className="force-one-line">{(Utils.formatMoney(price || 0))}</div>
          )
        },
        { title:  t("table.productCategoryId"), align:"center",with:"150px",dataIndex: "productCategoryId",render:(productCategoryId)=>{
            const {categoryId} = this.state
            let text=''
            if(categoryId.length !==0)
              categoryId.map(item =>{
                if(item.value === productCategoryId)
                  text= item.label
                
                return 0;
              })
            return <span>{text}</span>
        }},
      //   { title:  t("table.kind"), align:"center",with:"150px",dataIndex: "kind",render:(kind)=>{
      //     let text=''
      //     productKind.map(item =>{
      //       if(item.value === kind)
      //         text = item.label
      //     })
      //     return <span>{text}</span>
      // }},
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
  }

  handleRouting(parentProduct) {
    const { location: { search, pathname }, history } = this.props;
    const queryString = qs.parse(search);
    const result = {};
    Object.keys(queryString).map(q => {
        result[`parentSearch${q}`] = queryString[q];
        return 0;
    })
    history.push(`${pathname}-child?${qs.stringify({...result, parentProduct})}`);
  }

  getSearchFields() {
    const {t} = this.props;
    return [
      {
        key: "name",
        seachPlaceholder: t('searchPlaceHolder.name'),
        initialValue: this.search.name,
      },
      // {
      //   key: "value",
      //   seachPlaceholder: t('searchPlaceHolder.value'),
      //   initialValue: this.search.value,
      // },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.productUpdate.path.replace(':id', dataRow.id);
  }

  componentWillMount() {
    const { changeBreadcrumb ,getProductCategoryCombobox} = this.props;
    if(this.breadcrumbs.length > 0) {
        changeBreadcrumb(this.breadcrumbs);
    }
    this.userData = getUserData();
    if(this.checkPermission())
        this.loadDataTable(this.props);
      
    getProductCategoryCombobox({
          params: {},
          onCompleted: (responseData)=>{
              const {result,data}= responseData
              if(result){
                  this.setState({
                      categoryId:data?.map(item =>{
                          return {value:item.id,label:item.name}
                      })
                  })
              }
          },
          onError: this.onSaveError
      })
  }
  render() {
    const {
      dataList,
      loading,
      t,
    } = this.props;
    const users = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    return (
      
        <PageWrapper>
              {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton((
          <Link to={this.getCreateLink()}>
          <Button
          type="primary"
        >
          <PlusOutlined /> {t("createNewButton", { var: t(`objectName`, "") })}
        </Button></Link>
          ))}
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={users}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
        </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.product.productListLoading,
  dataList: state.product.productListData || {},
  customerAutoComplete:state.product.productAutoComplete || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProductList(payload)),
  getDataById: (payload) => dispatch(actions.getProductById(payload)),
  deleteData: (payload) => dispatch(actions.deleteProduct(payload)),
  getProductCategoryCombobox:(payload)=> dispatch(actions.getProductCategoryCombobox(payload)),
  // uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['productListPage','listBasePage'])(ProductListPage));
