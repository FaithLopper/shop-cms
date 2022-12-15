import React from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import qs from "query-string";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import { AppConstants } from "../../constants";

class RanksListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: null };
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.objectName = t("objectName");
    this.objectListName = "ranks";
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.columns = [
      {
        title: "#",
        dataIndex: "avatar",
        align: "center",
        width: 100,
        render: (avatarPath) => (
          <Avatar
            className="table-avatar"
            size="large"
            icon={<UserOutlined />}
            src={
              avatarPath ? `${AppConstants.contentRootUrl}${avatarPath}` : null
            }
          />
        ),
      },
      {
        title: t("table.name"),
        render: (dataRow) => {
          return dataRow.name;
        },
      },
      {
        title: t("table.target"),
        dataIndex:"target"
      },
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
    };
  }

  handleRouting(parentId, parentName) {
    const {
      location: { search, pathname },
      history,
    } = this.props;
    const queryString = qs.parse(search);
    const result = {};
    Object.keys(queryString).map((q) => {
      result[`parentSearch${q}`] = queryString[q];
      return 0;
    });
    history.push(
      `${pathname}-child?${qs.stringify({ ...result, parentId, parentName })}`
    );
  }

  prepareCreateData(data) {
    return {
      ...data,
    };
  }

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = {
      page,
      size: this.pagination.pageSize,
      sort:"target,desc",
      search: this.search,
    };
    getDataList({ params });
  }

  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "name",
        seachPlaceholder: t("searchPlaceHolder.name"),
        initialValue: this.search.name,
      },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.ranks.childrenKeys[1].replace(":id", dataRow.id);
  }

  render() {
    const { dataList, loading, t } = this.props;
    const ranksData = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton(
            <Link to={this.getCreateLink()}>
              <Button type="primary">
                <PlusOutlined />
                {t("createNewButton", { var: t("objectName") })}
              </Button>
            </Link>
          )}
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={ranksData}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.ranks.tbRanksLoading,
  dataList: state.ranks.ranksData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getRanksList(payload)),
  getDataById: (payload) => dispatch(actions.getRanksById(payload)),
  updateData: (payload) => dispatch(actions.updateRanks(payload)),
  deleteData: (payload) => dispatch(actions.deleteRanks(payload)),
  createData: (payload) => dispatch(actions.createRanks(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation([
    "ranksListPage",
    "listBasePage",
    "constants",
    "basicModal",
  ])(RanksListPage)
);
