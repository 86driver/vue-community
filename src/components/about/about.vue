<template>
  <div class="about">
    <h1 class="title">关于此Vue.js社区项目</h1>
    <div class="author">
      <ul>
        <li>作者：86driver</li>
        <li>项目地址： dddd</li>
        <li>真 · Vue.js社区</li>
      </ul>
    </div>
    <div>项目说明</div>
    <div>存在缺陷</div>
    <div>联系作者</div>
    <div>结尾：觉得对你有帮助，请点击这里给个star~</div>
  </div>
</template>

<script>
  export default {
    name: 'aboat'
  }
</script>

<style lang="less" scoped>
  .about{
    padding: 2em 0 0 6em;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    .title{
      font-size: 2em;
      font-weight: 700;
    }
    .author{
      font-size: 1.5em;
    }
    div{
      margin-top: 1em;
      text-indent: 2em;
    }
  }
</style>
