import React from "react";
import { DEFAULT_TABLE_ITEM_SIZE } from "../../constants";
import BasicForm from "../common/entryForm/BasicForm";
import { Button } from "antd";
import BaseTable from "../common/table/BaseTable";
class VariantTemplateListForm extends BasicForm {
  constructor(props) {
    super(props);
    // const {t} = this.props;
    this.pagination = { pageSize: DEFAULT_TABLE_ITEM_SIZE };
    this.columns = [
      { title: "Tên thuộc tính", dataIndex: "name" },
      this.renderActionColumn(),
    ];
  }

  renderActionColumn() {
    return {
      title: "Hành động",
      width: "100px",
      align: "center",
      render: (dataRow) => {
        return (
          <Button type="primary" onClick={(e) => this.handleSelect(dataRow)}>
            Chọn
          </Button>
        );
      },
    };
  }

  handleSelect(dataRow) {
    this.props.onVariantTemplateSelect(dataRow);
  }

  render() {
    const {  dataSource, loading } = this.props;
    return (
      <BaseTable
        loading={loading}
        columns={this.columns}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        onChange={this.handleTableChange}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
      />
    );
  }
}

export default VariantTemplateListForm;
