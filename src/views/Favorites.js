import React, { Component } from 'react';
import { List, Collapse, Icon, Card } from 'antd';
import Star from './components/Star';

export default class Favorites extends Component {
  
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

  fetchData = () => {
    const stars = [];
    for(let i = 0, len = localStorage.length; i < len; i++) {
      if(/^star_/.test(localStorage.key(i))){
        stars.push(localStorage.getItem(localStorage.key(i)));
      }
    }
    this.setState({
      list: stars.map(item => JSON.parse(item)),
    })
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
          header={<span>Favorites （{list.length}）</span>}
          itemLayout="horizontal"
          dataSource={list}
          // pagination={PagePagination}
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
                        <Star title={item.title} url={item.url} id={item.unique} />
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
