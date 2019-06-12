import { Form, Input, Button, Upload, Icon, message, Radio, DatePicker } from 'antd';
import moment from 'moment';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

class NewsEditor extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    const { handleModalClose } = this.props;
    validateFields((err, values) => {
      console.log(err, values);
      if(err) {
        return;
      }
      const path = values.type === 'zh' ? '/news' : '/news/english';
      delete values.type;
      values.time = values.time.format('x');
      values.image = values.image[0].response;
      values.time = +values.time;
      _ajax.post(`${_conf.config.bystack_api_host}${path}`, values).then(data => {
        console.log(data);
        if(data.status === 'success'){
          handleModalClose();
          message.success('提交成功');
        } else {
          message.error(data.error);
        }
      }).catch(err => {
        console.log(err);
        message.error('未知错误，请稍后再试');
      });
    })
  }

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator, } = this.props.form;
    const { handleModalClose } = this.props;
    const nodes = [
      {field: 'title', label: '文章标题', placeholder: '请输入文章标题', message: '请输入标题'},
      {field: 'url', label: '跳转链接', placeholder: '请输入跳转链接', message: '请输入链接'},
    ];
    return (
      <>
        <Form
          // layout={layout}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="文章类型" {...layout}>
            {getFieldDecorator('type', {
              rules: [{required: true, message: '请选择文章类型'}],
              initialValue: 'zh'
            })(
              <Radio.Group onChange={this.handleFormLayoutChange}>
                <Radio.Button value="zh">中文</Radio.Button>
                <Radio.Button value="en">英文</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          {
            nodes.map((item, index) => (
              <Form.Item key={index} label={item.label} {...layout}>
                {getFieldDecorator(item.field, {
                  rules: [{required: true, message: item.message}]
                })(item.type === 'textarea' ? <Input.TextArea placeholder={item.placeholder} rows={3} /> : <Input placeholder={item.placeholder} />)}
              </Form.Item>
            ))
          }
          <Form.Item label="发布时间" {...layout}>
            {getFieldDecorator('time', {
              rules: [{ type: 'object', required: true, message: '请选择发布时间!' }],
              initialValue: moment(),
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
            )}
          </Form.Item>
          <Form.Item label="封面图"  {...layout} extra="支持jpg、jpeg、png类型图片，尺寸500x300，大小不超过500KB">
            {getFieldDecorator('image', {
              rules: [{required: true, message: '请上传logo'}],
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload
                name="file" 
                action={`${_conf.config.bystack_api_host}/upload`} 
                listType="picture"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item>
            <div style={{textAlign: 'right',borderTop: '1px solid #ddd',padding: '20px 10px 0 0'}}>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button onClick={handleModalClose} style={{marginLeft: 20}} htmlType="reset">取消</Button>
            </div>
          </Form.Item>
        </Form>
      </>
    )
  }
}

export default Form.create()(NewsEditor);
