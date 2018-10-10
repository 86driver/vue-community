<template>
  <div class="home">
    <div class="left">
      <topic></topic>
    </div>
    <div class="right">
      <v-aside :author="user" v-if="user"></v-aside>
      <div class="create-Topic" v-if="user">
        <span @click="createTopic">发布话题</span>
      </div>
    </div>
  </div>
</template>

<script>
  import topic from '../topic/topic'
  import aside from '../aside/aside'
  export default {
    name: 'home',
    data () {
      return {
        user: ''
      }
    },
    created () {
      this.getloginInfo()
    },
    methods: {
      getloginInfo () {
        this.$http({
          method: 'get',
          url: 'https://www.vue-js.com/api/v1/user/' + this.$store.state.loginInfo.loginname
        })
          .then((res) => {
            this.user = res.data.data
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
            this.$store.state.userInfo = res.data.data
          })
      },
      createTopic () {
        this.$router.push('/create')
      }
    },
    components: {
      topic,
      'v-aside': aside
    }
  }
</script>

<style lang="less" scoped>
  .home{
    margin-top: 1em;
    .left{
      width: 60%;
      margin-left: 6em;
      float: left;
    }
    .right{
      width: 22%;
      margin-left: 1em;
      float: left;
      .create-Topic{
        margin-top: 1em;
        padding: 0.8em;
        background-color: #fff;
        border-radius: 0.3em;
        span{
          font-size: 0.875em;
          cursor: pointer;
          border-radius: 0.3em;
          padding: 0.4em;
          color: #fff;
          background-color: #369219;
          &:hover{
            background-color: #6ba44e;
          }
        }
      }
    }
  }
</style>
