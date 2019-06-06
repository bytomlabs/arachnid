import React, { Component } from 'react';
import { List, Collapse, Icon, Card } from 'antd';
import Star from './components/Star';

export default class Paper extends Component {
  
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
    _ajax.get(_conf.get_path('paper'), {params: {pageNo, pageCount}}).then((data) => {
      this.setState({
        list: data.data,
        loading: false,
        pagination: {
          current: data.pageNo,
          total: data.totalCount,
          pageSize: 25,
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
          header={<span>Paper</span>}
          itemLayout="horizontal"
          dataSource={list}
          pagination={PagePagination}
          loading={loading}
          renderItem={
            item => (
              <li>
                <Collapse bordered={false}>
                  <Collapse.Panel
                    header={<><span>{item.title}</span></>}
                    extra={
                      <>
                        <span style={{color: '#ddd', marginRight: 30}}>{item.date}</span>
                        <Star title={item.title} content={item.abstract} url={item.url} id={item.unique} />
                      </>
                    }
                  >
                    {
                      <Card>
                        <p
                          style={{paddingBottom: 12}}
                        ><a style={{color: '#1890ff', fontSize: '18px'}} target="_blank" href={item.url}>{item.title}</a></p>
                        <div dangerouslySetInnerHTML={{__html: item.abstract}}></div>
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
