import { Table } from 'antd';
import React from 'react';

class ExampleTable extends React.Component {
  constructor(props) {
      super(props);
      this.showCurRowMessage = this.showCurRowMessage.bind(this);
  }
  componentDidMount() {
    
  }

  //展示当前行信息
  showCurRowMessage(record){
    alert("key:"+record.key + " name:"+record.name + " age:" + record.age + " address:" + record.address + " description:" + record.description);
  }

  render() {
    let self = this;

    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '年龄', dataIndex: 'age', key: 'age', render: (text, record, index) => (Math.floor(record.age/10))*10+"多岁"},
      { title: '住址', dataIndex: 'address', key: 'address' },
      { title: '描述', dataIndex: 'description', key: 'description' },
      { title: '操作', dataIndex: '', key: 'operation', render: function(text, record, index) {
          alert(text.operation + " " + record.operation)
          return <a href="#" name="delete" onClick={function() { self.showCurRowMessage(record)} } >信息</a>; } },
      //精简写法
      //{ title: '操作', dataIndex: '', key: 'operation', render: (text, record, index) => <a href="#" name="delete" onClick={() => self.showCurRowMessage(record)}>信息</a> },
    ];

    const data = [
        { key: 1, name: 'hyw', age: 32, address: '西湖区湖底公园1号', description: '我是hyw，今年32岁，住在西湖区湖底公园1号。', children:[
          { key: 1.1, name: 'fas', age: 32, address: '西湖区湖底公园1号', description: '我是fas，今年32岁，住在西湖区湖底公园1号。' },
          { key: 1.2, name: 'wyz', age: 42, address: '西湖区湖底公园2号', description: '我是wyz，今年42岁，住在西湖区湖底公园2号。' },
          { key: 1.3, name: 'ldz', age: 32, address: '西湖区湖底公园3号', description: '我是ldz，今年32岁，住在西湖区湖底公园3号。' },
        ]},
        { key: 2, name: 'lkx', age: 32, address: '西湖区湖底公园1号', description: '我是lkx，今年32岁，住在西湖区湖底公园1号。' },
        { key: 3, name: 'mnk', age: 42, address: '西湖区湖底公园2号', description: '我是mnk，今年42岁，住在西湖区湖底公园2号。' },
        { key: 4, name: 'xyt', age: 32, address: '西湖区湖底公园3号', description: '我是xyt，今年32岁，住在西湖区湖底公园3号。' },
      ];

    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
      onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
      },
    };

    return (
      <div>
        <Table columns={columns} 
          rowSelection={rowSelection}
          dataSource={data}
          className="table"
        />
      </div>
    );

  }
}

module.exports = ExampleTable;