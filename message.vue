<template>
  <div class="message-box-container">
    <div class="message-box-bg" :class="{'is-model': isModel}" @click="handleFooter(false, 'bg')"></div>
    <div class="message-box" :class="messageBoxClass" :style="messageBox.boxStyleObject">
      <p class="message-header" v-if="!isAlert">{{messageBox.header}}</p>
      <p class="message-content" :style="messageBox.contentStyleObject">{{messageBox.desc}}</p>
      <div class="message-footer" v-if="!isAlert && messageBox.showFooterbtns">
        <p class="btn-item" v-if="messageBox.showFooterConfirm" :style="messageBox.footerStyleObject" @click="handleFooter(true)">确定</p>
        <p class="btn-item" v-if="messageBox.showFooterCancel" :style="messageBox.footerStyleObject" @click="handleFooter(false)">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'message',
      data() {
        /*
        * flag 是否执行动画
        * duration 动画执行时间
        * closed 关闭动画的标识
        * onClose 动画结束时的回调函数
        * type 弹出框类型;默认alert, confirm, model
        * prohibitBgClick 弹出框类型为, confirm, model时，点击背景色是否关闭弹框
        * pauseAnimation 获取光标是否暂停动画（只在alert模式下处理）
        * */
          return {
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
            closed: false,
            visible: false,
            duration: 2000,
            onClose: null,
            onConfirm: null,
            onCancel: null,
            prohibitBgClick: false,
          };
      },
      computed: {
        messageBoxClass() {
          return this.isAlert ? 'is-alert' : (this.isModel ? 'is-model' : 'is-model-close');
        },
        isAlert() {
          return !this.messageBox.type || (this.messageBox.type === 'alert');
        },
        isModel() {
          return !this.isAlert && this.messageBox.flag;
        },
      },
      watch: {
        closed(newVal) {
          if (newVal) {
            this.isAlert && this.$el.addEventListener('animationend', this.destroyElement);
          }
        },
      },
      mounted() {
        /*
     * 禁止滚动
     * */
        (document.body.style.overflow == 'hidden') || (document.body.style.overflow = 'hidden');
        const env = (process.env.NODE_ENV !== 'production');
        if (this.messageBox.type && this.messageBox.type !== 'alert' && this.messageBox.type !== 'confirm' && this.messageBox.type !== 'model') {
          if (env) {
            /*
            * 中止动画
            * */
            this.messageBox.flag = false;
            throw new Error('type property invalid');
          }
        } else {
          /*
        * 默认只有alert情况下进行动画，confirm 和 model 依赖于点击事件
        * */
          ((this.messageBox.type === 'alert') || !this.messageBox.type) && this.startTimer();
        }
      },
      methods: {
        destroyElement() {
          (document.body.style.overflow == 'hidden') && (document.body.style.overflow = '')
          this.$el.removeEventListener('animationend', this.destroyElement);
          this.$destroy(true);
          this.$el.parentNode.removeChild(this.$el);
        },
        /*
        * 开始计时,动画的时间要大于等于duration
        * */
        startTimer() {
          if (this.duration > 0) {
            this.timer = setTimeout(() => {
              if (!this.closed) {
                this.close();
              }
            }, this.duration);
          }
        },
        close() {
          this.closed = true;
          if (typeof this.onClose === 'function') {
            this.onClose(this);
          }
        },
        /*
        * footer 按钮处理
        * */
        handleFooter(flag, position) {
          /*
          * 非alert 模式下，判断点击背景色是否关闭弹框
          * */
          if (position && (position === 'bg') && !flag && this.prohibitBgClick) {
            return;
          }
          this.messageBox.flag = false;
          this.$el.addEventListener('animationend', this.destroyElement);
          if (flag && (typeof this.onConfirm === 'function')) {
            this.onConfirm(this);
          }
          if (!flag && (typeof this.onCancel === 'function')) {
            this.onCancel(this);
          }
        },
      },
    };
</script>

<style scoped lang="scss">
  * {
    padding: 0;
    margin: 0;
  }
  @keyframes messageBoxModelReverse {
    0% {
      transform: translate(-50%, -50%);
    }
    100% {
      transform: translate(-50%, -500px);
    }
  }
  @keyframes messageBoxModel {
    0% {
      transform: translate(-50%, -500px);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
  @keyframes messageBox {
    0% {
      transform: translate(-50%, -500px);
    }
    50% {
      transform: translate(-50%, -50%);
    }
    75% {
      transform: translate(-50%, -50%);
    }
    100% {
      transform: translate(-50%, -500px);
    }
  }
  .message-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999;
    padding: 10px 20px;
    border-radius: 10px;
    transition: all 2s ease-in-out;
    &.is-alert {
      background-color: #289BDC;
      color: white;
      transform: translate(-50%, -500px);
      animation: messageBox 2s ease-in-out;
      &:hover {
        animation-play-state:paused;
        -webkit-animation-play-state:paused;
      }
    }
    &.is-model {
      background-color: #289BDC;
      color: white;
      animation: messageBoxModel 2s ease-in-out;
    }
    &.is-model-close {
      animation: messageBoxModelReverse 2s ease-in-out;
    }
    /*Internet Explorer 9 以及更早的版本不支持 animation-play-state 属性。*/
    .message-header {
      margin-bottom: 20px;
      text-align: center;
    }
    .message-content {

    }
    .message-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      :first-child {
        margin-right: 20px;
      }
      .btn-item {
        background-color: #fff;
        color: #289BDC;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  .message-box-bg {
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    filter: opacity(alpha(0));
    transition: all .5s ease-in-out;
    &.is-model {
      visibility: visible;
      opacity: .5;
      filter: opacity(alpha(50));
    }
  }
</style>
