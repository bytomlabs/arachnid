import React, { Component } from 'react';
import { Table, Modal, Button, Icon, Card, PageHeader, message } from 'antd';
import Editor from './components/Editor';

export default class SuperNode extends Component {
  
  state = {
    list: [],
    data: '',   // 编辑数据
    editorVisible: false,
    loading: false,
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (pageNo = 1, pageCount = 25) => {
    this.setState({loading: true});
    _ajax.get(`${_conf.config.bystack_api_host}/sn-table`).then((data) => {
      this.setState({
        list: data.data,
        loading: false,
      });
    }).catch(err => console.log(err));
  }

  handleDel = (id) => {
    const _this = this;
    Modal.confirm({
      title: '确定删除吗？',
      content: '删除后将不可恢复',
      onOk() {
        console.log('delete.');
        _ajax.post(`${_conf.config.bystack_api_host}/sn-table/del`, { uuid: id }).then(data => {
          if(data.status === 'success'){
            message.success('删除成功');
            _this.fetchData();
          }
        }).catch(err => {
          message.error(err);
        });
      }
    })
  }

  handleEdit = (data) => {
    this.setState({
      editorVisible: true,
      data,
    });
  }

  handleModalClose = () => {
    this.setState({
      editorVisible: false,
      data: '',
    });
    this.fetchData();
  }

  render() {
    const { list, data, loading, editorVisible } = this.state;
    const columns = [
      {
        title: 'LOGO',
        dataIndex: 'reserved_1',
        width: 100,
        fixed: 'left',
        render: (text, item) => <img src={_conf.config.bystack_api_host + item.reserved_1} width="50" alt=""/>
      },
      {
        title: '名称/姓名',
        width: 150,
        fixed: 'left',
        dataIndex: 'name'
      },
      {
        title: '操作',
        key: 'o',
        width: 110,
        fixed: 'left',
        render: (text, item) => (
          <>
            <a style={{color: '#1890ff', margin: 5}} onClick={() => this.handleEdit(item)}>编辑</a>
            <a style={{color: '#1890ff', margin: 5}} onClick={() => this.handleDel(item.uuid)}>删除</a>
          </>
        )
      },
      {
        title: '简介',
        dataIndex: 'introduce'
      },
      {
        title: '所在地',
        width: 100,
        dataIndex: 'location',
      },
      {
        title: '网站',
        dataIndex: 'homepage',
      },
      {
        title: 'BTM钱包地址',
        dataIndex: 'wallet_address',
      },
      {
        title: '社交网络',
        dataIndex: 'social_list',
      },
      {
        title: '投票收益',
        dataIndex: 'reward',
      },
      {
        title: '类型',
        dataIndex: 'node_type',
      },
      {
        title: '竞选宣言',
        dataIndex: 'declaration',
      },
    ]

    return (
      <>
        <PageHeader
          title="共识节点管理"
          subTitle="新增、编辑、删除即时生效，请谨慎操作"
          style={{padding: '0 0 20px 5px'}}
        >
          <Button onClick={() => this.setState({editorVisible: true})} type="primary">新增</Button>
        </PageHeader>
        <Modal
          destroyOnClose
          visible={editorVisible}
          onCancel={() => this.setState({editorVisible: false, data: ''})}
          onOk={this.handleSubmit}
          width={900}
          title="共识节点新增/编辑"
          footer={null}
        ><Editor data={data} handleModalClose={this.handleModalClose} /></Modal>
        <Table
          dataSource={list} 
          columns={columns} 
          rowKey={(item) => item.uuid}
          scroll={{ x: '450%' }}
          bordered
        />
        
      </>
    )
  }
}
