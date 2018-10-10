<template>
  <div class="about">
    <h1 class="title">关于此Vue.js社区项目</h1>
    <div class="content">
      <div class="link">
        <h1>项目相关：</h1>
        <ul>
          <li><a href="https://github.com/86driver/vue-community" target="_blank">项目地址点这里~~</a></li>
          <li><a href="https://86driver.github.io/vue-community/dist" target="_blank">预览点这里~~</a></li>
          <li><a href="https://www.vue-js.com/" target="_blank">真 · Vue.js社区点这里~~</a></li>
        </ul>
      </div>
      <div class="complement">
        <h1>补充：</h1>
        <ul>
          <li>
            <i>1. </i>
            由于此项目用的markdown为
            <a href="https://github.com/hinesboy/mavonEditor" target="_blank">mavonEditor</a>
            跟原社区所使用不一致，可能会造成两种markdown所编辑的文章排版不一致。
          </li>
          <li>
            <i>2. </i>
            由于本项目选用的是 <span style="color: #6b98c6">"mode: hash"</span>
            可能导致文章 @ 跳转失效（原社区使用的 "history"）。
          </li>
          <li>
            <i>3. </i>
            发现其他问题可以联系我一起探讨解决，让我们在知识的海洋里一起为所欲为吧~~~
          </li>
        </ul>
      </div>
      <div class="relate-me">
        <h1>联系我：</h1>
        <ul>
          <li>微信：a610410574</li>
          <li>QQ：610410574</li>
        </ul>
      </div>
      <div class="end"><span>结尾：</span>觉得对你有帮助，请点击 <a href="https://github.com/86driver/vue-community" target="_blank">这里</a> 给个star~</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about'
  }
</script>

<style lang="less" scoped>
  .about{
    width: 80%;
    margin: 1em 0 0 7em;
    i{
      color: #222222;
    }
    a{
      color: #609227;
    }
    h1{
      padding-top: 1em;
      font-weight: 700;
      color: #000;
    }
    li{
      font-size: 1rem;
      padding: 0.5em 0 0 2em;
      width: 30em;
      color: #666666;
    }
    .title{
      font-size: 1.5em;
      font-weight: 700;
      padding: 0.625em;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;
    }
    .content{
      background-color: #fff;
      padding-left: 2em;
      .end{
        color: #000;
        font-size: 1.2em;
        padding: 0.5em 0 1em 0;
        span{
          font-weight: 700;
        }
      }
    }
  }
</style>
