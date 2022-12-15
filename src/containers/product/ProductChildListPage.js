import React from "react";
import { connect } from "react-redux";
import { Button, Avatar, Divider } from "antd";
import { PlusOutlined, UserOutlined,EditOutlined,LockOutlined,DeleteOutlined,CheckOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { AppConstants, STATUS_ACTIVE } from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import Utils from "../../utils";
import qs from "query-string";
const { getUserData } = actions;
class ProductChildListPage extends ListBasePage {
  initialSearch() {
    return { name: "", value: ""};
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'product';
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    const {
      location: { search },
    } = this.props;
    const { parentProduct } = qs.parse(search);
    this.parentProduct= parentProduct
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
        //   <image
        //   // width={200}
        //   src={image ? `${AppConstants.contentRootUrl}${image}` : "error"}
        // />
        ),
      },
      { title:  t("table.name"), dataIndex: "name",width:'250px'},
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
              categoryId.map(item => {
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

  renderActionColumn() {
    const { t } = this.props;
    const isRender= this.checkRenderActionColumn()
    if(isRender)
    return {
        title: t ? t('listBasePage:titleActionCol') : 'Action',
        width: '100px',
        align: 'center',
        render: (dataRow) => {
            const actionColumns = [];
            if (this.actionColumns.isEdit) {
                const detailLink = this.getDetailLink(dataRow);
                
                let to = {
                    state: { prevPath: this.props.location.pathname }
                }
                if (typeof detailLink === 'object') {
                    to = {
                        ...to,
                        ...detailLink,
                    }
                } else {
                    to.pathname = detailLink;
                }
                actionColumns.push(this.renderEditButton((
                    <Link to={to}>
                        <Button type="link" className="no-padding">
                            <EditOutlined color="red" />
                        </Button>
                    </Link>
                )))
            }
            if(this.actionColumns.isChangeStatus) {
                actionColumns.push(
                    <Button type="link" onClick={(e) => {
                        e.stopPropagation()
                        this.showChangeStatusConfirm(dataRow)
                    }} className="no-padding">
                        {
                            dataRow.status === STATUS_ACTIVE
                            ?
                            <LockOutlined/>
                            :
                            <CheckOutlined/>
                        }
                    </Button>
                )
            }
            if(this.actionColumns.isDelete) {
                actionColumns.push(
                    this.renderDeleteButton((
                        <Button type="link" onClick={(e) => {
                            e.stopPropagation()
                            this.showDeleteConfirm(dataRow.id)
                        }} className="no-padding">
                            { this.actionColumns.isDelete.icon || <DeleteOutlined/> }
                        </Button>
                    ))
                )
            }
            const actionColumnsWithDivider = [];
            actionColumns.forEach((action, index) => {
                actionColumnsWithDivider.push(action);
                if(index !== (actionColumns.length -1))
                {
                    actionColumnsWithDivider.push(<Divider type="vertical" />);
                }
            })
            return (
                <span>
                    {
                        actionColumnsWithDivider.map((action, index) => <span key={index}>{action}</span>)
                    }
                </span>
            )
        }
    }
    else
        return {}  
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
    return sitePathConfig.productUpdate.path.replace(':id', `${dataRow.id}?parentProduct=${this.parentProduct}`);
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

getList() {
  const { getDataList } = this.props;
  const page = this.pagination.current ? this.pagination.current - 1 : 0;
  const params = {
    page,
    size: this.pagination.pageSize,
    search: {parentProduct:this.parentProduct,...this.search},
  };
  getDataList({ params });
}

getCreateLink() {
  return `/${this.objectListName}/create?parentProduct=${this.parentProduct}`
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['productListPage','listBasePage'])(ProductChildListPage));
