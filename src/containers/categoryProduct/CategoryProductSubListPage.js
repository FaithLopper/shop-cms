import React from "react";
import { connect } from "react-redux";
import { Avatar, Divider, Button } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  LockOutlined,
  CheckOutlined,
  DeleteOutlined,
  MenuOutlined
} from "@ant-design/icons";
import qs from "query-string";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ListBasePage from "../ListBasePage";
import { sitePathConfig } from "../../constants/sitePathConfig";
import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants, STATUS_ACTIVE } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import { SortableHandle } from "react-sortable-hoc";
import DrapDropTable from "../../compoments/common/table/DragDropTable";

const DragHandle = SortableHandle(() => (
  <MenuOutlined
    style={{
      cursor: "grab",
      color: "#999",
    }}
  />
));


class CategoryProductSubListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: null };
  }

  constructor(props) {
    super(props);
    const { t } = props;

    const {
      location: { search },
    } = this.props;

    const { parentId, parentName } = qs.parse(search);
    this.sortEnd= this.sortEnd.bind(this)
    this.parentId = parentId;
    this.parentName = parentName;

    this.objectName = t("objectName");
    this.objectListName = "category-product-sub";
    this.breadcrumbs = [
      {
        name: t("breadcrumbs.parentPage"),
        path: `${sitePathConfig.categoryProduct.path}`,
      },
      { name: `${parentName}`, path: `` },
    ];
    this.columns = [
      {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
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
          return dataRow.name;
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

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;

    const params = {
      page,
      size: this.pagination.pageSize,
      search: this.search,
      parentId: this.parentId,
      isChild: true,
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
    return sitePathConfig.categoryProductSubUpdate.path.replace(
      ":id",
      `${dataRow.id}?${qs.stringify({
        parentId: this.parentId,
        parentName: this.parentName,
      })}`
    );
  }

  mapDataToTable(dataSource){
    let tempData=dataSource?  dataSource.map(item => ({...item, index :item.orderSort,key:item.id})):[]
    return tempData
  }

  sortEnd(oldIndex,newIndex,newData){
    const{sortData}= this.props
        let tempArray = newData.map((item, index)=>{
          return {...item,orderSort:index}
        })
        sortData({
          params: tempArray,
          onCompleted: this.onModifyCompleted,
          onError: this.onModifyError
      });
    }

  getCreateLink() {
    return `/${this.objectListName}/create?${qs.stringify({
      parentId: this.parentId,
      parentName: this.parentName,
    })}`;
  }

  renderActionColumn() {
    const { t } = this.props;
    const isRender = this.checkRenderActionColumn();
    if (isRender)
      return {
        title: t ? t("listBasePage:titleActionCol") : "Action",
        width: "100px",
        align: "center",
        render: (dataRow) => {
          const actionColumns = [];
          if (this.actionColumns.isEdit) {
            const detailLink = this.getDetailLink(dataRow);
            actionColumns.push(
              this.renderEditButton(
                <Link to={detailLink}>
                  <Button type="link" className="no-padding">
                    <EditOutlined color="red" />
                  </Button>
                </Link>
              )
            );
          }
          if (this.actionColumns.isChangeStatus) {
            actionColumns.push(
              <Button
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.showChangeStatusConfirm(dataRow);
                }}
                className="no-padding"
              >
                {dataRow.status === STATUS_ACTIVE ? (
                  <LockOutlined />
                ) : (
                  <CheckOutlined />
                )}
              </Button>
            );
          }
          if (this.actionColumns.isDelete) {
            actionColumns.push(
              this.renderDeleteButton(
                <Button
                  type="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.showDeleteConfirm(dataRow.id);
                  }}
                  className="no-padding"
                >
                  {this.actionColumns.isDelete.icon || <DeleteOutlined />}
                </Button>
              )
            );
          }
          const actionColumnsWithDivider = [];
          actionColumns.forEach((action, index) => {
            actionColumnsWithDivider.push(action);
            if (index !== actionColumns.length - 1) {
              actionColumnsWithDivider.push(<Divider type="vertical" />);
            }
          });
          return (
            <span>
              {actionColumnsWithDivider.map((action, index) => (
                <span key={index}>{action}</span>
              ))}
            </span>
          );
        },
      };
    else return {};
  }

  render() {
    const { dataList, loading, t } = this.props;
    const categoryData = Object.keys(dataList).length !==0 ? this.mapDataToTable(dataList) :[];
    this.pagination.total = dataList.totalElements || 0;
    this.dataDetail.parentName = this.parentName;
    this.dataDetail.parentId = this.parentId;
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton(
            <Link to={this.getCreateLink()}>
              <Button type="primary">
                <PlusOutlined />{" "}
                {t("createNewButton", { var: t("objectNameSub") })}
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
  deleteData: (payload) => dispatch(actions.deleteProductCategory(payload)),
  createData: (payload) => dispatch(actions.createProductCategory(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  sortData: (payload) => dispatch(actions.sortProductCategory(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation([
    "categoryProductListPage",
    "listBasePage",
    "constants",
    "basicModal",
  ])(CategoryProductSubListPage)
);
