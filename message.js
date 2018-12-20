import Vue from 'vue';
import message from './message.vue';

const MessageConstructor = Vue.extend(message);
let instance;
const Message = function (options) {
  // 实例化
  instance = new MessageConstructor({
    data: options,
  });
  // 挂载在最外层
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  return instance.vm;
};

export default Message;
