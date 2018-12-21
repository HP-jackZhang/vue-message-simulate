vue-message-simulate
=====
a light plugin of vue， it simulates alert, confrim,model</br>
    依赖于sass 切，不支持ie9 一下的版本,使用如下:
下载之后，在main.js中

1，import vue$message from 'vue-message-simulate';

2，Vue.use(vue$message);

在页面中直接使用：<br> 
this.$message({
  messageBox: {
    flag: true,
    desc: '请耐心等待',
    type: 'confirm',
    contentStyleObject: {
        color: 'red',
        fontSize: '16px',
        width: '200px',
        height: '200px',
      },
    },
    prohibitBgClick: true,
  });



  参数如下：
   /*
        * flag 是否执行动画
        * duration 动画执行时间
        * closed 关闭动画的标识
        * onClose 动画结束时的回调函数
        * type 弹出框类型;默认alert, confirm, model
        * prohibitBgClick 弹出框类型为, confirm, model时，点击背景色是否关闭弹框
        * */
          {
            messageBox: {
              flag: false,
              desc: '',
              type: 'alert',
              header: 'title',
              showFooterbtns: true,
              showFooterConfirm: true,
              showFooterCancel: true,
              boxStyleObject: null,
              footerStyleObject: null,
              contentStyleObject: null,
            },
            duration: 2000,
            onClose: null,
            onConfirm: null,
            onCancel: null,
            prohibitBgClick: false,
          }
