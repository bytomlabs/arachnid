const api_base_url = '//arachnid.8btc-ops.com:8888';
// const api_base_url = window.env.apiHost;
const config = {
  path: {
    api_base_url,
    api_url: {
      issues: '/issues',
      stackexchange: '/stackexchange',
      meeting: '/meeting',
      bitcoindev: '/bitcoindev',
      paper: '/paper',
    },
    links: {},
  },
  bystack_api_host: 'https://kit.blockmeta.com/supernode/v1',
  default_lang: 'zh-cn',
};

const get_path = (key) => {
  if (!key) throw new Error('key is required.');
  if (!config.path.api_url[key]) throw new Error('not found.');
  return config.path.api_base_url + config.path.api_url[key]
};

export default config;
export { config, get_path };