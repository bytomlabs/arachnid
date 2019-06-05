import React, { Component } from 'react';
import { List, Comment, Icon, Card, Pagination } from 'antd';
import MD from 'react-markdown';

export default class Issue extends Component {
  
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

  fetchData = (page = 1, size = 25) => {
    this.setState({loading: true});
    _ajax.get(_conf.get_path('issues'), {params: {page, size}}).then((data) => {
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
          header={<span>Issue</span>}
          itemLayout="horizontal"
          dataSource={list}
          pagination={PagePagination}
          loading={loading}
          renderItem={
            item => (
              <li style={{marginTop: 20}}>
                <Comment
                  author={item.owner}
                  content={<a href={item.url} target="_blank" style={{fontSize: 14, color: '#000'}}>{item.title}</a>}
                  datetime={item.timestamp}
                  avatar={<Icon style={{fontSize: 20, paddingTop: 3}} type="github" />}
                />
                {
                  (item.comments || []).map((comment, index) => (
                    <Card
                      style={{margin: '0 30px 10px 30px'}}
                      key={index}
                    >
                      <MD source={comment} />
                    </Card>
                  ))
                }
              </li>
            )
          }
        />
      </>
    )
  }
}
