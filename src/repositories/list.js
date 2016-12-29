import { Table } from 'antd';
import React from 'react';
import reqwest from 'reqwest';

class List extends React.Component {
  

  constructor(props) {
      super(props);
      this.state={
         data: [],
         pagination: {pageSize:20},
         loading: false,
      };
  this.handleTableChange = this.handleTableChange.bind(this);
  this.fetch = this.fetch.bind(this);
  }

  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.pageSize=20;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      filters:filters
    });
  }

  fetch(params = {}) {
    // console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://github-ranking.anytao.net/api/repositories/list',
      method: 'post',
      data: {
        pageSize: 20,
        pageCurrent:params.page,
        sortField:params.sortField,
        sortOrder:params.sortOrder
      },
      type: 'json',
    }).then((data) => {
      const pagination = this.state.pagination;
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.count;
      this.setState({
        loading: false,
        data: data.data,
        pagination,
      });
    });
  }

  componentDidMount() {

    this.fetch();
    
  }

  render() {
   const columns = [{
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
      }, {
        title: 'Html-Url',
        dataIndex: 'html_url',
        width: '20%',
        render: text => <a href={text} target="_blank">{text}</a>,
      }, {
        title: 'Stars',
        dataIndex: 'stargazers_count',
        sorter: true,
        width:'80'
      },{
        title:'Language',
        dataIndex:'language',
        width:'80'
      },{
        title:'Description',
        dataIndex:'description'
      }];

    return (
      <div>
       <Table columns={columns}
        size='middle'
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
      </div>
    );
  }
}

module.exports = List;