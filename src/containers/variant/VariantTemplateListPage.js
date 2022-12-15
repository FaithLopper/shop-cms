import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import ElementWithPermission from "../../compoments/common/elements/ElementWithPermission";
class VariantTempleteListPage extends ListBasePage {
  initialSearch() {
    return { name: ""};
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'variant-template';
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.columns = [
      { title:  t("table.name"), dataIndex: "name"},
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
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.variantTemplateUpdate.path.replace(':id', dataRow.id);
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
  loading: state.variantTemplate.variantTemplateListLoading,
  dataList: state.variantTemplate.variantTemplateListData || {},
  customerAutoComplete:state.variantTemplate.variantTemplateAutoComplete || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getVariantTemplateList(payload)),
  getDataById: (payload) => dispatch(actions.getVariantTemplateById(payload)),
  deleteData: (payload) => dispatch(actions.deleteVariantTemplate(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['variantTemplateListPage','listBasePage'])(VariantTempleteListPage));
