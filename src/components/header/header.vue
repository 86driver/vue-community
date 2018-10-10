<template>
  <div class="header-wrapper">
    <div v-loading="loading"  element-loading-background="rgb(28,97,50)" style="position: fixed;top: 1.5em;left: 50%;"></div>
    <el-row class="content">
      <el-col :span="20" class="left">
        <div>
          <span class="logo"><img src="./logo.png" alt=""></span>
          <span class="title">Vue.js</span>
        </div>
      </el-col>
      <el-col :span="4" class="right">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            <!-- 导航图标 -->
            <span class="nav"></span>
          </span>
          <el-badge is-dot v-if="count"></el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/home">首页</el-dropdown-item>
            <el-dropdown-item command="/user" v-if="_ifLogin">个人中心</el-dropdown-item>
            <el-dropdown-item command="/news" v-if="_ifLogin">消息
              <el-badge :value="count" class="item" v-if="count"></el-badge>
            </el-dropdown-item>
            <el-dropdown-item command="/about">关于</el-dropdown-item>
            <el-dropdown-item command="exit" v-if="_ifLogin">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="login">
          <span class="login-in" @click="goLogin" v-if="_ifLogin === false">登录</span>
          <span class="avatar" v-else>
            <router-link :to="'/user/' + login.loginname">
              <img :src="login.avatar_url">
            </router-link>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'v-header',
    inject: ['reload'],
    created () {
      this.getUnReadMessages()
    },
    updated () {
      this.getUnReadMessages()
    },
    computed: {
      count () {
        return this.$store.state.readCount
      },
      login () {
        return this.$store.state.loginInfo
      },
      _ifLogin () {
        return this.$store.state.ifLogin
      },
      loading () {
        return this.$store.state.loading
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'exit') {
          this.exit()
          this.reload()
        } else if (command === '/user') {
          this.$router.push(command + '/' + this.login.loginname)
        } else {
          this.$router.push(command)
        }
      },
      goLogin () {
        this.$router.push('/login')
      },
      getUnReadMessages () {
        if (this.$store.state.ifLogin) {
          this.$http({
            method: 'get',
            url: 'https://www.vue-js.com/api/v1/message/count?accesstoken=' + this.$store.state.token
          })
            .then((res) => {
              this.$store.state.readCount = res.data.data
            })
        }
      },
      exit () {
        sessionStorage.removeItem('accesstoken')
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('loginInfo')
        this.$store.state.loginInfo = ''
        this.$store.state.ifLogin = false
        this.$router.push('/home')
      }
    }
  }
</script>

<style lang="less" scoped>
  .header-wrapper{
    padding-left: 6em;
    height: 3.43em;
    line-height: 3.43em;
    background-color: #1c6132;
    .content {
      .left{
        .logo{
          display: inline-block;
          height: 2.81em;
          width: 2.81em;
          img{
            width: 100%;
            height: 100%;
            vertical-align:middle
          }
        }
        .title{
          margin-left: .5em;
          display: inline-block;
          color: #fff;
          font-weight: 700;
          font-size: 1.25em;
        }
      }
      .right{
        position: relative;
        .nav {
          width: 15px;
          height: 2px;
          display: inline-block;
          border-top: 6px double #eeeeee;
          border-bottom: 2px solid #eeeeee;
        }
        .login{
          display: inline-block;
          margin-left: 0.625em;
          color: #fff;
          height: 3.43em;
          line-height: 3.43em;
          .login-in{
            font-size: 0.7rem;
          }
          .avatar{
            display: inline-block;
            width: 2.5em;
            line-height: 1em;
            vertical-align: middle;
            img{
              width: 100%;
              height: 100%;
              border-radius: 0.325em;
            }
          }
        }
      }
    }
  }
</style>
