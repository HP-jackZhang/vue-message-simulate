import Message from './message.js';

const MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  Vue.prototype.$message = Message;
};

export default MyPlugin;
