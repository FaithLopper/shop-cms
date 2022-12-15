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
class TagsListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: null };
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.objectName = t("objectName");
    this.objectListName = "tags";
    this.breadcrumbs = [{ name: t("breadcrumbs.currentPage") }];
    this.columns = [
      {
        title: t("table.name"),
        render: (dataRow) => {
          return dataRow.tag;
        },
      },
      {
        title: t("table.color"),
        render: (dataRow) => {
          return (
            <h1
              style={{
                backgroundColor: `#${dataRow.color}`,
                color: "white",
                width: 100,
                textAlign: "center",
              }}
            >
              {`#${dataRow.color}`}
            </h1>
          );
        },
      },
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
    };
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
      sort: "target,desc",
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
    return sitePathConfig.tags.childrenKeys[1].replace(":id", dataRow.id);
  }

  render() {
    const { dataList, loading, t } = this.props;
    const tagsData = dataList.data || [];
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
          dataSource={tagsData}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.tags.tbTagsLoading,
  dataList: state.tags.tagsData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getTagsList(payload)),
  getDataById: (payload) => dispatch(actions.getTagsById(payload)),
  updateData: (payload) => dispatch(actions.updateTags(payload)),
  deleteData: (payload) => dispatch(actions.deleteTags(payload)),
  createData: (payload) => dispatch(actions.createTags(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTranslation(["tagsListPage", "listBasePage", "constants", "basicModal"])(
    TagsListPage
  )
);
