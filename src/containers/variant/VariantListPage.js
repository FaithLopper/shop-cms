import React from "react";
import { connect } from "react-redux";
import { Button} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import ElementWithPermission from "../../compoments/common/elements/ElementWithPermission";
import Utils from "../../utils";
class VariantListPage extends ListBasePage {
  initialSearch() {
    return { name: "", value: ""};
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'variant';
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.columns = [
      { title:  t("table.name"), dataIndex: "name"},
      {
        title: t("table.price") + ' (VNĐ)',
        dataIndex: "price",
        align: 'right',
        width:'100px',
        render: (price) => (
          <div className="force-one-line">{(Utils.formatMoney(price || 0))}</div>
          )
        },
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
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
    return sitePathConfig.variantUpdate.path.replace(':id', dataRow.id);
  }

  renderButton(children, permissions){
    return (<ElementWithPermission permissions={permissions}>
        {children}
    </ElementWithPermission>)
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
  loading: state.variant.variantListLoading,
  dataList: state.variant.variantListData || {},
  customerAutoComplete:state.variant.variantAutoComplete || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getVariantList(payload)),
  getDataById: (payload) => dispatch(actions.getVariantById(payload)),
  deleteData: (payload) => dispatch(actions.deleteVariant(payload)),
  // uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['variantListPage','listBasePage'])(VariantListPage));
