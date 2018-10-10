<template>
  <div class="wrapper">
    <div class="login">
      <el-popover
        placement="top-start"
        title="accesstoken 的获取方法"
        width="200"
        trigger="hover"
        content="登录 vue.js 社区 选择 '设置' 并滑到底部可以看到 accesstoken">
        <el-input slot="reference" v-model="token" class="login-input" placeholder="请使用 accesstoken 登录"></el-input>
      </el-popover>
      <el-button type="success" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        token: ''
      }
    },
    methods: {
      login () {
        if (this.token === '') {
          this.$message({
            message: '请输入accesstoken登录',
            type: 'error'
          })
          return 0
        } else {
          this.$http.post('https://www.vue-js.com/api/v1/accesstoken', {
            accesstoken: this.token
          }).then((res) => {
            sessionStorage.setItem('accesstoken', this.token)
            sessionStorage.setItem('loginInfo', JSON.stringify(res.data))
            this.$store.state.token = this.token
            this.$store.state.ifLogin = true
            this.$store.state.loginInfo = res.data
            this.$router.push('/home')
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper{
    position: relative;
    .login{
      position: absolute;
      top: 1em;
      right: 10em;
      .login-input{
        width: 20em;
      }
    }
  }
</style>
