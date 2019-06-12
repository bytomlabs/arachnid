import React, { Component } from 'react';
import { Table, Collapse, Icon, Card } from 'antd';


const apiPath = `${_conf.config.bystack_api_host}/list/supernode`;


export default class Apply extends Component {
  
  state = {
    list: [],
    loading: false,
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (pageNo = 1, pageCount = 25) => {
    this.setState({loading: true});
    _ajax.get(apiPath).then((data) => {
      this.setState({
        list: data.data.map(item => JSON.parse(item.content)),
        loading: false,
      });
    }).catch(err => console.log(err));
  }

  render() {
    const { list, loading } = this.state;
    const columns = [
      {
        title: 'LOGO',
        dataIndex: 'logo',
        width: 100,
        fixed: 'left',
        render: (text, item) => <img src={item.logo} width="50" alt=""/>
      },
      {
        title: '名称/姓名',
        width: 120,
        fixed: 'left',
        dataIndex: 'name'
      },
      {
        title: '简介',
        dataIndex: 'intro'
      },
      {
        title: '所在地',
        dataIndex: 'address',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '网站',
        dataIndex: 'website',
      },
      {
        title: '微信',
        dataIndex: 'wechat',
      },
      {
        title: 'BTM钱包地址',
        dataIndex: 'btm',
      },
      {
        title: '社交网络',
        dataIndex: 'sn',
      },
      {
        title: '计划',
        dataIndex: 'plan',
      },
      {
        title: '期望',
        dataIndex: 'wish',
      },
      {
        title: '投票收益',
        dataIndex: 'reward',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
    ]

    return (
      <>
        <Table
          dataSource={list} 
          columns={columns} 
          scroll={{ x: 5000 }}
          rowKey={(item, index) => index}
        />
      </>
    )
  }
}
