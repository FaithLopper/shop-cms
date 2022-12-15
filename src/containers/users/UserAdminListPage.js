import React from "react";
import { connect } from "react-redux";
import { Button, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";

import { actions } from "../../actions";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";
import { AppConstants} from "../../constants";
import PageWrapper from "../../compoments/common/PageWrapper";
import { Link } from 'react-router-dom';
import { sitePathConfig } from "../../constants/sitePathConfig";
import { FieldTypes } from "../../constants/formConfig";
import { commonStatus } from "../../constants/masterData";
class UserAdminListPage extends ListBasePage {
  initialSearch() {
    return { username: "", fullName: "" ,status: null};
  }

  constructor(props) {
    super(props);
    const {t} = this.props;
    this.objectName =  t("objectName");
    this.objectListName = 'admins';
    this.breadcrumbs = [{name: t('breadcrumbs.currentPage')}];
    this.columns = [
      {
        title: "#",
        dataIndex: "avatar",
        align: 'center',
        width: '80px',
        render: (avatar) => (
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
          />
        ),
      },
      { title:  t("table.username"), dataIndex: "username" },
      { title:  t("table.fullName"), dataIndex: "fullName" },
      { title:  t("table.phone"), dataIndex: "phone" },
      { title: "E-mail", dataIndex: "email", width: "200px" },
      {
        title: t("table.createdDate"),
        dataIndex: "createdDate",
        render: (createdDate) => convertUtcToTimezone(createdDate),
      },

      this.renderStatusColumn(),
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
        key: "username",
        seachPlaceholder: t('searchPlaceHolder.username'),
        initialValue: this.search.username,
      },
      {
        key: "fullName",
        seachPlaceholder: t('searchPlaceHolder.fullName'),
        initialValue: this.search.fullName,
      },
      {
        key: "status",
        seachPlaceholder: t("searchPlaceHolder.status"),
        fieldType: FieldTypes.SELECT,
        options: commonStatus,
        initialValue: this.search.status,
    },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.adminUpdate.path.replace(':id', dataRow.id);
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
          <PlusOutlined /> {t("createNewButton", { var: t(`constants:${"Administrator"}`, "") })}
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
  loading: state.user.tbUserAdminLoading,
  dataList: state.user.userAdminData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getUserAdminList(payload)),
  getDataById: (payload) => dispatch(actions.getUserById(payload)),
  createData: (payload) => dispatch(actions.createUser(payload)),
  updateData: (payload) => dispatch(actions.updateUser(payload)),
  deleteData: (payload) => dispatch(actions.deleteAdmin(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['userAdminListPage','listBasePage'])(UserAdminListPage));
