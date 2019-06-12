import { Form, Input, Button, Upload, Icon, message } from 'antd';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

class Editor extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    const { handleModalClose } = this.props;
    validateFields((err, values) => {
      console.log(err, values);
      if(err) {
        return;
      }
      values.reserved_1 = values.logo[0].response;
      delete values.logo;
      _ajax.post(`${_conf.config.bystack_api_host}/sn-table`, values).then(data => {
        console.log(data);
        if(data.status === 'success'){
          handleModalClose();
        } else {
          message.error(data.error);
        }
      }).catch(err => console.log(err));
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
      {field: 'name', label: '名称/姓名', placeholder: '', message: '请输入姓名'},
      {field: 'name_en', label: '名称/姓名 En', placeholder: '', message: '请输入姓名'},
      {field: 'location', label: '所在位置', placeholder: '', message: '请输入'},
      {field: 'location_en', label: '所在位置 En', placeholder: '', message: '请输入'},
      {field: 'node_type', label: '所属类型', placeholder: '', message: '请输入'},
      {field: 'node_type_en', label: '所属类型 En', placeholder: '', message: '请输入'},
      {field: 'homepage', label: '网站主页', placeholder: '', message: '请输入'},
      {field: 'reward', label: '奖励分配', placeholder: '', message: '请输入'},
      {field: 'wallet_address', label: '钱包地址', placeholder: '', message: '请输入'},
      {field: 'social_list', label: '社交媒体', type: 'textarea', placeholder: '微博*http://weibo.com [回车] Twitter*http://twitter.com/hh', message: '请输入'},
      {field: 'social_list_en', label: '社交媒体 En', type: 'textarea', placeholder: '', message: '请输入'},
      {field: 'declaration', label: '竞选宣言', type: 'textarea', placeholder: '', message: '请输入'},
      {field: 'declaration_en', label: '竞选宣言 En', type: 'textarea', placeholder: '', message: '请输入'},
      {field: 'introduce', label: '简介', type: 'textarea', placeholder: '', message: '请输入'},
      {field: 'introduce_en', label: '简介 En', type: 'textarea', placeholder: '', message: '请输入'},
    ];
    return (
      <>
        <Form
          layout={layout}
          onSubmit={this.handleSubmit}
        >
          {
            nodes.map((item, index) => (
              <Form.Item label={item.label} {...layout}>
                {getFieldDecorator(item.field, {
                  rules: [{required: true, message: item.message}]
                })(item.type === 'textarea' ? <Input.TextArea placeholder={item.placeholder} rows={3} /> : <Input placeholder={item.placeholder} />)}
              </Form.Item>
            ))
          }
          <Form.Item label="Logo"  {...layout} extra="jpg、jpeg、png，大小不超过200KB">
            {getFieldDecorator('logo', {
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

export default Form.create()(Editor);
