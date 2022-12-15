import React from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";
import { UserOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";
import qs from "query-string";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ListBasePage from "../ListBasePage";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import DrapDropTable from "../../compoments/common/table/DragDropTable";
import { SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <MenuOutlined
    style={{
      cursor: "grab",
      color: "#999",
    }}
  />
));

class CategoryProductListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: null };
  }

  constructor(props) {
    super(props);
    const { t } = props;

    this.objectName = t("objectName");
    this.objectListName = "category-product";
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.columns = [
      {
        title: "Sort",
        dataIndex: "sort",
        width: 30,
        className: "drag-visible",
        render: () => <DragHandle />,
      },
      {
        title: "#",
        dataIndex: "icon",
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
          return (
            <span
              className="routing"
              onClick={() => {
                this.handleRouting(dataRow.id, dataRow.name);
              }}
            >
              {dataRow.name}
            </span>
          );
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
    this.sortEnd = this.sortEnd.bind(this);
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
      `${pathname}-sub?${qs.stringify({ ...result, parentId, parentName })}`
    );
  }

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;

    const params = {
      page,
      size: this.pagination.pageSize,
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
    return sitePathConfig.categoryProductUpdate.path.replace(":id", dataRow.id);
  }

  mapDataToTable(dataSource) {
    let tempData = dataSource.map((item) => ({
      ...item,
      index: item.orderSort,
      key: item.id,
    }));
    return tempData;
  }

  sortEnd(oldIndex, newIndex, newData) {
    const { sortData } = this.props;
    let tempArray = newData.map((item, index) => {
      return { ...item, orderSort: index };
    });
    sortData({
      params: tempArray,
      onCompleted: this.onModifyCompleted,
      onError: this.onModifyError,
    });
  }

  render() {
    const { dataList, loading, t } = this.props;
    const categoryData =
      Object.keys(dataList).length !== 0 ? this.mapDataToTable(dataList) : [];
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
        <DrapDropTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          data={categoryData}
          pagination={this.pagination}
          sortEnd={this.sortEnd}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.productCategory.tbProductCategoryLoading,
  dataList: state.productCategory.productCategoryData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProductCategoryList(payload)),
  getDataById: (payload) => dispatch(actions.getProductCategoryById(payload)),
  updateData: (payload) => dispatch(actions.updateProductCategory(payload)),
  sortData: (payload) => dispatch(actions.sortProductCategory(payload)),
  deleteData: (payload) => dispatch(actions.deleteProductCategory(payload)),
  createData: (payload) => dispatch(actions.createProductCategory(payload)),
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
  ])(CategoryProductListPage)
);
