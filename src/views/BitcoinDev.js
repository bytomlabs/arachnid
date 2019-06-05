import React, { Component } from 'react';
import { List, Comment, Icon, Card } from 'antd';
import MD from 'react-markdown';

export default class BitcoinDev extends Component {
  
  state = {
    list: [],
    loading: false,
    pagination: {
      current: 1,
      total: 0,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (pageNo = 1, pageCount = 25) => {
    this.setState({loading: true});
    _ajax.get(_conf.get_path('bitcoindev'), {params: {pageNo, pageCount}}).then((data) => {
      this.setState({
        list: data.data,
        loading: false,
        pagination: {
          current: data.pageNo,
          total: data.totalCount,
        }
      });
    }).catch(err => console.log(err));
  }

  handlePageChange = (page) => {
    this.setState({
      pagination: {
        current: page,
      }
    });
    this.fetchData(page);
  }

  render() {
    const { list, pagination, loading } = this.state;
    const PagePagination = {
      ...pagination,
      onChange: this.handlePageChange
    };
    return (
      <>
        <List
          header={<span>Bitcoin dev</span>}
          itemLayout="horizontal"
          dataSource={list}
          pagination={PagePagination}
          loading={loading}
          renderItem={
            item => (
              <li style={{marginTop: 20}}>
                {
                  <Card
                    title={<span>{item.subject}</span>}
                    extra={<span style={{color: '#ddd'}}>{item.time}</span>}
                    style={{margin: '0 30px 10px 30px'}}
                  >
                    <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                  </Card>
                }
              </li>
            )
          }
        />
      </>
    )
  }
}
