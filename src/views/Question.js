import React, { Component } from 'react';
import { List, Comment, Icon, Card, Collapse } from 'antd';
import Star from './components/Star';

export default class Question extends Component {
  
  state = {
    list: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 30,
      total: 0,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (pageNo = 1, pageCount = 25) => {
    this.setState({loading: true});
    _ajax.get(_conf.get_path('stackexchange'), {params: {pageNo, pageCount}}).then((data) => {
      this.setState({
        list: data.data,
        loading: false,
        pagination: {
          current: data.pageNo,
          pageSize: 25,
          total: data.totalCount,
        }
      });
    }).catch(err => console.log(err));
  }

  handlePageChange = (page) => {
    // this.setState({
    //   pagination: {
    //     current: page,
    //   }
    // });
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
          header={<span>Stack Exchange</span>}
          itemLayout="horizontal"
          dataSource={list}
          pagination={PagePagination}
          loading={loading}
          renderItem={
            item => (
              <li>
                <Collapse bordered={false}>
                  <Collapse.Panel
                    header={<><span>{item.question}</span></>}
                    extra={
                      <>
                        <span style={{color: '#ddd', marginRight: 30}}>{item.update_time}</span>
                        <Star title={item.question} content={item.content} url={item.question_url} id={item.unique} />
                      </>
                    }
                  >
                    {
                      <Card>
                        <p
                          style={{paddingBottom: 12}}
                        ><a style={{color: '#1890ff', fontSize: '18px'}} target="_blank" href={item.question_url}>{item.question}</a></p>
                        <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                      </Card>
                    }
                  </Collapse.Panel>
                </Collapse>
              </li>
            )
          }
        />
      </>
    )
  }
}
