import React from "react";
import { DEFAULT_TABLE_ITEM_SIZE } from "../../constants";
import BasicForm from "../common/entryForm/BasicForm";
import { Button } from "antd";
import BaseTable from "../common/table/BaseTable";
class VariantListForm extends BasicForm {
  constructor(props) {
    super(props);
    // const {t} = this.props;
    this.pagination = { pageSize: DEFAULT_TABLE_ITEM_SIZE };
    this.columns = [
      { title: "Tên thuộc tính", dataIndex: "name" },
      { title: "Giá", dataIndex: "price" },
      this.renderActionColumn(),
    ];
  }

  renderActionColumn() {
    const { selectedVariantArray } = this.props;
    const avaiableArray = selectedVariantArray.map((item) => item.id);
    return {
      title: "Hành động",
      width: "100px",
      align: "center",
      render: (dataRow) => {
        let isExist = false;
        avaiableArray.map((item) => {
          if (item === dataRow.id) isExist = true;
          return 0;
        });
        if (isExist)
          return (
            <Button type="primary" disabled>
              Chọn
            </Button>
          );
        return (
          <Button type="primary" onClick={(e) => this.handleSelect(dataRow)}>
            Chọn
          </Button>
        );
      },
    };
  }

  handleSelect(dataRow) {
    this.props.onVariantSelect(dataRow);
  }

  render() {
    const { dataSource, loading } = this.props;
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

export default VariantListForm;
