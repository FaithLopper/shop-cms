import { Table } from "antd";
import { arrayMoveImmutable } from "array-move";
import React, { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

// const DragHandle = SortableHandle(() => (
//   <MenuOutlined
//     style={{
//       cursor: 'grab',
//       color: '#999',
//     }}
//   />
// ));
// const columns = [
//   {
//     title: 'Sort',
//     dataIndex: 'sort',
//     width: 30,
//     className: 'drag-visible',
//     render: () => <DragHandle />,
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     className: 'drag-visible',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
// ];
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     index: 0,
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     index: 1,
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     index: 2,
//   },
// ];
const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);
const DragDropTable = (props) => {
  const { loading, columns, data, sortEnd } = props;
  const [dataSource, setDataSource] = useState(data);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        dataSource.slice(),
        oldIndex,
        newIndex
      );
      setDataSource(newData);
      sortEnd(oldIndex, newIndex, newData);
    }
  };
  useEffect(() => {
    if (data !== dataSource) setDataSource(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
};
export default DragDropTable;
