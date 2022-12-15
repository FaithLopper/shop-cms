import React from "react";
import ListBasePage from "../ListBasePage";
import { connect } from "react-redux";
import { actions } from "../../actions/province";
import BaseTable from "../../compoments/common/table/BaseTable";
import { withTranslation } from "react-i18next";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BasicModal from "../../compoments/common/modal/BasicModal";
import ProvinceForm from "../../compoments/province/ProvinceForm";
import { sitePathConfig } from "../../constants/sitePathConfig";
import qs from "query-string";
import { ProvinceKinds } from "../../constants";

class DistrictListPage extends ListBasePage {
  initialSearch() {
    return { province: "" };
  }
  constructor(props) {
    super(props);
    const { t } = props;
    const {
      location: { search },
    } = this.props;
    const { provinceId, provinceName } = qs.parse(search);
    this.breadcrumbs = [
      {
        name: t("breadcrumbs.parentPage"),
        path: `${sitePathConfig.province.path}`,
      },
      { name: `${provinceName}`, path: `` },
    ];
    this.parentId = provinceId;
    this.parentName = provinceName;
    this.objectName = t("objectName");
    this.columns = [
      { title: t("table.provinceName"),render: (dataRow) => {
        return (
            <span className="routing" onClick={()=>{
                this.handleRouting(dataRow.id, dataRow.name,);
            }}>
                {dataRow.name}
            </span>
        )
    } },
    this.renderActionColumnModal(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
    this.props.getProvinceAutoComple({});
  }
  handleRouting(districtId, districtName) {
    const { location: { search, pathname }, history } = this.props;
    const queryString = qs.parse(search);
    const result = {};
    Object.keys(queryString).map(q => {
        result[`parentSearch${q}`] = queryString[q];
        return 0;
    })
    history.push(`${pathname}-commune?${qs.stringify({...result, districtId, districtName})}`);
}
  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "name",
        seachPlaceholder: t("searchPlaceHolder.province"),
        initialValue: this.search.province,
      },
    ];
  }
  prepareCreateData(data) {
    return {
      ...data,
      kind:ProvinceKinds.district.level
    };
  }
  prepareUpdateData(data) {
    return {
      id: data.id,
      kind:ProvinceKinds.district.level,
      status:1,
      ...data,
    };
  }
  componentWillMount() {
    const { changeBreadcrumb } = this.props;
    if (this.breadcrumbs.length > 0) {
      changeBreadcrumb(this.breadcrumbs);
    }
    this.loadDataTable(this.props);
  }
  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = {
      page,
      size: this.pagination.pageSize,
      search: this.search,
      kind: ProvinceKinds.district.name,
      parentId: this.parentId,
    };
    getDataList({ params });
  }
  render() {
    const { loading, dataList, t } = this.props;
    const provinces = dataList.data || [];

    this.pagination.total = dataList.totalElements || 0;
    const {
      isShowModifiedModal,
      isShowModifiedLoading,
    } = this.state;
    this.dataDetail.parentName=this.parentName
    this.dataDetail.parentId=this.parentId
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {this.renderCreateNewButton(
            <Button
              type="primary"
              onClick={() => this.onShowModifiedModal(false)}
            >
              <PlusOutlined />{" "}
              {t("createNewButton", { var: t(`constants:${"District"}`, "") })}
            </Button>
          )}
        </div>
        <BaseTable
          columns={this.columns}
          rowkey={(record) => record.id}
          dataSource={provinces}
          pagination={this.pagination}
          onChange={this.handleTableChange}
          loading={loading}
        />
        <BasicModal
          visible={isShowModifiedModal}
          isEditing={this.isEditing}
          objectName={this.objectName}
          loading={isShowModifiedLoading}
          onOk={this.onOkModal}
          onCancel={this.onCancelModal}
          width={500}
        >
          <ProvinceForm
            visible={isShowModifiedModal}
            dataDetail={this.isEditing ? this.dataDetail : {parentName:this.dataDetail.parentName,parentId:this.dataDetail.parentId}}
            isEditing={this.isEditing}
            objectName={this.objectName}
            loading={isShowModifiedLoading}
            onOk={this.onOkModal}
            onCancel={this.onCancelModal}
            t={t}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.province.provinceLoading,
  dataList: state.province.provinceData || {},
});
const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProvinceList(payload)),
  getProvinceAutoComple: (payload) =>
  dispatch(actions.getProvinceAutocomple(payload)),
  getDataById: (payload) => dispatch(actions.getProvinceById(payload)),
  createData: (payload) => dispatch(actions.createProvince(payload)),
  updateData: (payload) => dispatch(actions.updateProvince(payload)),
  deleteData: (payload) => dispatch(actions.deleteProvince(payload)),
});

// export default ProvinceListPage;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["districtListPage", "listBasePage"])(DistrictListPage));
