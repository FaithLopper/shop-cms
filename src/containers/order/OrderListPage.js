import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ListBasePage from "../ListBasePage";
import BaseTable from "../../compoments/common/table/BaseTable";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import Utils from "../../utils";
import { orderStatus } from "../../constants/masterData";
import StatusTag from "../../compoments/common/elements/StatusTag";
import { ORDER_STATUS } from "../../constants";
import { convertUtcToTimezone } from "../../utils/datetimeHelper";

class OrderListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: null };
  }

  constructor(props) {
    super(props);
    const { t } = props;
    const { formatMoney } = Utils;
    this.objectName = t("objectName");
    this.objectListName = "order";
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.columns = [
      {
        title: t("table.id"),
        render: (dataRow) => {
          return dataRow.id;
        },
      },
      {
        title: t("table.createdBy"),
        render: (dataRow) => {
          return dataRow.createdBy;
        },
      },
      {
        title: t("table.subTotal"),
        render: (dataRow) => {
          return formatMoney(dataRow.subTotal);
        },
      },
      {
        title: t("table.province"),
        render: (dataRow) => {
          return dataRow.province.name;
        },
      },
      {
        title: t("table.createdDate"),
        render: (dataRow) => {
          return convertUtcToTimezone(dataRow.createdDate);
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

  renderStatusColumn() {
    const { t } = this.props;
    return {
      title: t ? t("listBasePage:titleStatusCol") : "Status",
      dataIndex: "status",
      width: "100px",
      render: (status) => <StatusTag status={status} type={ORDER_STATUS} />,
    };
  }
  //   prepareCreateData(data) {
  //     return {
  //       ...data,
  //       categoryKind: CATEGORY_KIND_NEWS,
  //     };
  //   }

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
          key: "id",
          seachPlaceholder: t("searchPlaceHolder.id"),
          initialValue: this.search.id,
        },
      {
        key: "status",
        seachPlaceholder: t("searchPlaceHolder.status"),
        fieldType: FieldTypes.SELECT,
        options: orderStatus,
        initialValue: this.search.status,
      },
    ];
  }

  getDetailLink(dataRow) {
    return sitePathConfig.orderUpdate.path.replace(":id", dataRow.id);
  }

  render() {
    const { dataList, loading, t } = this.props;
    const orderData = dataList.data || [];

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
          dataSource={orderData}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.order.tbOrderLoading,
  dataList: state.order.orderData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getOrderList(payload)),
  //   getDataById: (payload) => dispatch(actions.getCategoryById(payload)),
  //   updateData: (payload) => dispatch(actions.updateCategory(payload)),
  //   createData: (payload) => dispatch(actions.createCategory(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation(["orderListPage", "listBasePage", "constants", "basicModal"])(
    OrderListPage
  )
);
