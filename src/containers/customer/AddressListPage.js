import React from "react";
import { connect } from "react-redux";
import { Button,Divider } from "antd";
import { PlusOutlined,EyeOutlined,LockOutlined,CheckOutlined,DeleteOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";
import qs from 'query-string'
import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { STATUS_ACTIVE } from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import StatusTag from "../../compoments/common/elements/StatusTag";
class AddressListPage extends ListBasePage {
  initialSearch() {
    return { receiverFullName: "", addressDetails: "" };
  }

  constructor(props) {
    super(props);
    const {t,location: { search } } = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'address';
    const {customerId} = qs.parse(search);
    this.customerId=customerId
    this.breadcrumbs = [
      {name: t('breadcrumbs.parentPage'),
      path:`${sitePathConfig.customer.path}`},
      {name: t('breadcrumbs.currentPage'),}
  ];
    this.columns = [
      { title:  t("table.receiverFullName"), dataIndex: "receiverFullName"},
      { title:  t("table.address"), dataIndex: "province", render:(text,record)=>
      <span>
        {`${record.addressDetails}, ${record.ward}, ${record.district}, ${text}`}
      </span>},
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: false,
      isChangeStatus: false,
    };

  }

  renderStatusColumn() {
    const { t } = this.props;
    return {
        title: t ? t('table.isDefault') : 'Status',
        dataIndex: 'isDefault',
        width: '100px',
        render: (isDefault) =><StatusTag status={isDefault}/>
    }
  }

  getSearchFields() {
    const {t} = this.props;
    return [
      {
        key: "addressDetails",
        seachPlaceholder: t('searchPlaceHolder.addressDetails'),
        initialValue: this.search.addressDetails,
      },
      // {
      //   key: "receiverFullName",
      //   seachPlaceholder: t('searchPlaceHolder.receiverFullName'),
      //   initialValue: this.search.receiverFullName,
      // },
      
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.addressUpdate.path.replace(':id', dataRow.id);
  }
  
  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = { page, size: this.pagination.pageSize,customerId:this.customerId, search: this.search,};
    getDataList({ params });
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
                actionColumns.push(
                  this.renderEditButton(<Link to={to}>
                    <Button type="link" className="no-padding">
                        <EyeOutlined color="red" />
                    </Button>
                </Link>)    
                )
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
    return {}
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
  loading: state.address.addressLoading,
  dataList: state.address.addressData || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getAddressList(payload)),
  getDataById: (payload) => dispatch(actions.getAddressById(payload)),
  createData: (payload) => dispatch(actions.createAddress(payload)),
  updateData: (payload) => dispatch(actions.updateAddress(payload)),
  deleteData: (payload) => dispatch(actions.deleteAddress(payload)),
  // uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['addressListPage','listBasePage'])(AddressListPage));
