<template>
  <div class="author" v-if="author">
    <div class="title">{{author.loginname === loginName ? '个人信息' : '作者信息'}}</div>
    <div class="content">
      <div class="avatar">
        <router-link :to="'/user/' + author.loginname">
          <img :src="author.avatar_url">
        </router-link>
        <div>{{author.loginname}}</div>
        <div>积分: {{author.score}}</div>
      </div>
      <el-collapse accordion class="collapse">
        <el-collapse-item title="收藏" name="1">
          <div v-if="author.collect_topics.length === 0">无</div>
          <div v-else>
            <div v-for="(topic,index) in author.collect_topics" :key="index" class="link">
              <router-link :to="{path: '/topicdetail', query: {id: topic.id }}">{{topic.title}}</router-link>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="最近参与的话题" name="2">
          <div v-if="author.recent_replies.length === 0">无</div>
          <div v-else>
            <div v-for="(topic,index) in author.recent_replies" :key="index" class="link">
              <router-link :to="{path: '/topicdetail', query: {id: topic.id }}">{{topic.title}}</router-link>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="最近发布的文章" name="3">
          <div v-if="author.recent_topics.length === 0">无</div>
          <div v-else>
            <div v-for="(topic,index) in author.recent_topics" :key="index" class="link">
              <router-link :to="{path: '/topicdetail', query: {id: topic.id }}">{{topic.title}}</router-link>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['author'],
    computed: {
      loginName () {
        return this.$store.state.loginInfo.loginname
      }
    }
  }
</script>

<style lang="less" scoped>
  .author{
    width: 100%;
    font-size: 0.875rem;
    .title{
      background-color: #f6f6f6;
      height: 3.125rem;
      line-height: 3.125rem;
      border-top-right-radius: 0.2rem;
      border-top-left-radius: 0.2rem;
      color: #1c6132;
      padding-left: 0.5em;
    }
    .content{
      padding-left: 0.5em;
      padding-top: 1em;
      background-color: #fff;
      border-bottom-right-radius: 0.2rem;
      border-bottom-left-radius: 0.2rem;
      .avatar{
        img{
          float: left;
          width: 3rem;
          height: 3rem;
          border-radius: 0.2rem;
          vertical-align: middle;
        }
        div{
          padding-top: 0.2em;
          padding-left: 4.2em;
          color: #778087;
        }
      }
      .collapse{
        margin-top: 1em;
        .link{
          :hover{
            color: #369219;
          }
          display: inline-block;
          width: 90%;
          overflow: hidden;
          word-wrap: normal;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
