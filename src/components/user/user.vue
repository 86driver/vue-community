<template>
  <div class="user">
    <div v-if="authorInfo">
      <div>
        <router-link to="/home" class="go-home">点击这里返回主页</router-link>
      </div>
      <div class="info">
        <div>用户: {{$route.params.id}}</div>
        <div>注册时间: {{this.authorInfo.create_at | getDateDiff}}</div>
      </div>
      <div class="warn">其他功能已在其他页面实现~</div>
    </div>
    <div v-else>
      此用户不存在
    </div>
  </div>
</template>

<script>
  import {getDateDiff} from '../../assets/js/date'
  export default {
    name: 'user',
    data () {
      return {
        authorInfo: ''
      }
    },
    created () {
      this.getLoginInfo()
      this.getAuthorInfo()
    },
    methods: {
      getLoginInfo () {
        /*
        * 由于markdown中@跳转使用的是a标签而不是router-link跳转，
        * 当跳转到user路由会导致页面刷新，
        * 从而导致vuex保存的数据会流失，所以在这里重新保存vuex中的数据
        * */
        this.$store.state.ifLogin = true
        this.$store.state.token = sessionStorage.accesstoken
        this.$store.state.loginInfo = JSON.parse(sessionStorage.loginInfo)
        this.$store.state.userInfo = JSON.parse(sessionStorage.userInfo)
      },
      getAuthorInfo () {
        this.$http({
          method: 'get',
          url: 'https://www.vue-js.com/api/v1/user/' + this.$route.params.id
        })
          .then((res) => {
            if (res.statusText === 'OK') {
              this.authorInfo = res.data.data
            }
          })
      }
    },
    filters: {
      getDateDiff (time) {
        return getDateDiff(new Date(time).getTime())
      }
    }
  }
</script>

<style lang="less" scoped>
  .user{
    width: 960px;
    height: 400px;
    left: 20%;
    top: 30%;
    .go-home{
      color: #369219;
      font-size: 2em;
    }
    .info{
      margin: 1em 0 0 1em;
      color: #666666;
    }
    .warn{
      font-size: 1.5em;
      margin: 1em 0 0 1em;
      color: #666666;
    }
  }
</style>
