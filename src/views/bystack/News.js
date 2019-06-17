import React, { Component } from 'react';
import { Table, Modal, Button, Icon, Card, PageHeader, message } from 'antd';
import NewsEditor from './components/NewsEditor';
import moment from 'moment';

export default class News extends Component {
  
  state = {
    list: [],
    editorVisible: false,
    loading: false,
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (pageNo = 1, pageCount = 25) => {
    this.setState({loading: true});
    let news_zh = [];
    let news_en = [];
    try {
      const data = await _ajax.get(`${_conf.config.bystack_api_host}/news`);
      news_zh = [...data.data];
    } catch (error) {
      news_zh = [];
    }
    try {
      const data = await _ajax.get(`${_conf.config.bystack_api_host}/news/english`);
      const list = data.data.map(item => ({...item, lang: 'en'}));
      news_en = [...list];
    } catch (error) {
      news_en = [];
    }

    this.setState({
      list: [...news_zh, ...news_en],
      loading: false,
    });
  }

  handleDel = (id, lang = 'zh') => {
    const _this = this;
    Modal.confirm({
      title: '确定删除吗？',
      content: '删除后将不可恢复',
      onOk() {
        console.log('delete.', lang);
        const path = lang === 'en' ? '/news/english/del' : '/news/del';
        _ajax.post(`${_conf.config.bystack_api_host}${path}`, { uuid: id }).then(data => {
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

  handleModalClose = () => {
    this.setState({
      editorVisible: false,
    });
    this.fetchData();
  }

  render() {
    const { list, loading, editorVisible } = this.state;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        
      },
      {
        title: '配图',
        width: 150,
        render: (text, item) => <img src={_conf.config.bystack_api_host + item.image} width="50" alt=""/>
      },
      {
        title: '时间',
        width: 150,
        render: (text, item) => moment(item.time, 'x').format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '链接',
        dataIndex: 'url'
      },
      {
        title: '操作',
        key: 'o',
        width: 110,
        render: (text, item) => (
          <>
            <a style={{color: '#1890ff', margin: 5}} onClick={() => this.handleEdit(item.uuid)}>编辑</a>
            <a style={{color: '#1890ff', margin: 5}} onClick={() => this.handleDel(item.uuid, item.lang)}>删除</a>
          </>
        )
      },
    ]

    return (
      <>
        <PageHeader
          title="资讯管理"
          subTitle="新增、编辑、删除即时生效，请谨慎操作"
          style={{padding: '0 0 20px 5px'}}
        >
          <Button onClick={() => this.setState({editorVisible: true})} type="primary">新增</Button>
        </PageHeader>
        <Modal
          visible={editorVisible}
          onCancel={() => this.setState({editorVisible: false})}
          onOk={this.handleSubmit}
          width={900}
          title="共识节点新增/编辑"
          footer={null}
        ><NewsEditor handleModalClose={this.handleModalClose} /></Modal>
        <Table
          dataSource={list} 
          columns={columns} 
          rowKey={(item) => item.uuid}
          bordered
        />
        
      </>
    )
  }
}
