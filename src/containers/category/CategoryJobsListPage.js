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
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus, categoryKinds } from "../../constants/masterData";

const { CATEGORY_KIND_JOBS } = categoryKinds;

class CategoryJobsListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: null };
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.objectName = t("objectName");
    this.objectListName = "category-jobs";
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.columns = [
      {
        title: "#",
        dataIndex: "categoryImage",
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
          return dataRow.categoryName;
        },
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
      categoryKind: CATEGORY_KIND_JOBS,
    };
  }

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = {
      page,
      size: this.pagination.pageSize,
      search: this.search,
      kind: CATEGORY_KIND_JOBS,
    };
    getDataList({ params })
    
  }

  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "name",
        seachPlaceholder: t("searchPlaceHolder.name"),
        initialValue: this.search.name,
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
    return sitePathConfig.categoryJobsUpdate.path.replace(":id", dataRow.id);
  }

  render() {
    const { dataList, loading, t } = this.props;
    const categoryData = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton(
            <Link to={this.getCreateLink()}>
              <Button type="primary">
                <PlusOutlined />{" "}
                {t("createNewButton", { var: t("objectName") })}
              </Button>
            </Link>
          )}
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={categoryData}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.category.tbCategoryLoading,
  dataList: state.category.categoryData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getCategoryList(payload)),
  getDataById: (payload) => dispatch(actions.getCategoryById(payload)),
  updateData: (payload) => dispatch(actions.updateCategory(payload)),
  deleteData: (payload) => dispatch(actions.deleteCategory(payload)),
  createData: (payload) => dispatch(actions.createCategory(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation([
    "categoryListPage",
    "listBasePage",
    "constants",
    "basicModal",
  ])(CategoryJobsListPage)
);
