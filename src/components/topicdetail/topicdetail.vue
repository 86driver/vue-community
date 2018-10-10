<template>
  <div class="topic-detail" v-if="topicDetail">
    <div class="main-content">
      <div class="title">
        <div v-if="storeState.ifLogin">
          <div @click="collect" class="collect" v-if="collection !== true">加入收藏</div>
          <div @click="disCollect" class="disCollect" v-else>取消收藏</div>
        </div>
        <div>
          <span v-if="topicDetail.top" class="top">置顶</span>
          <span v-else-if="topicDetail.good" class="good">精华</span>
          <span class="topic-title">{{topicDetail.title}}</span>
        </div>
        <div class="author-relate">
          <span>发布于{{topicDetail.create_at | getDateDiff}}</span>
          <span>作者{{topicDetail.author.loginname}}</span>
          <span>{{topicDetail.visit_count}}次浏览</span>
          <span>来自 {{tabCH[topicDetail.tab]}}</span>
        </div>
      </div>
      <mavon-editor class="topic-detail-content" v-html="topicDetail.content"/>
      <div class="replies" v-if="topicDetail.reply_count">
        <div class="reply-title">{{topicDetail.reply_count}} 回复</div>
        <ul class="reply-content">
          <li
            v-for="(reply, index) in topicDetail.replies" :key="index"
            @mouseover="mouseIn(index)"
            @mouseout="mouseGo()">
            <div class="avatar">
              <router-link :to="'/user/' + reply.author.loginname"><img :src="reply.author.avatar_url"></router-link>
            </div>
            <div class="author">
              <span class="author-name">{{reply.author.loginname}}</span>
              <span>{{index + 1}}楼</span>
              <span>{{topicDetail.create_at | getDateDiff}}</span>
              <div v-html="reply.content" class="reply-html"></div>
              <transition name="fade">
                <mavon-editor
                  @change="getMarkdown2"
                  :placeholder="'@' + reply.author.loginname"
                  :subfield="false"
                  :boxShadow="false"
                  class="reply-edit"
                  v-show="replyEditor[index]">
                </mavon-editor>
              </transition>
              <el-button
                @click="replyFloor(reply)"
                type="info"
                size="small"
                plain v-show="replyEditor[index]">回复</el-button>
              <div class="font" v-if="storeState.ifLogin">
                <i
                  @click="toggleUp(reply)"
                   class="icon iconfont icon-thumb-up"
                   :class="{active: reply.ups.length}">
                  <span v-if="reply.ups.length > 0">{{reply.ups.length}}</span>
                </i>
                <i
                  v-if="judgeUser(reply.author.loginname)"
                  v-show="toggleMouse[index]"
                  @click="editReplay"
                  class="icon iconfont icon-edit"></i>
                <i
                  v-if="judgeUser(reply.author.loginname)"
                  v-show="toggleMouse[index]"
                  @click="deleteReply()"
                  class="icon iconfont icon-delete"></i>
                <i
                  class="icon iconfont icon-huifu"
                  @click="toggleMavonEditor(index)"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <mavon-editor
        @change="getMarkdown1"
        :boxShadow="false"
        :subfield="false"
        v-if="storeState.ifLogin"
        style="margin: 1em 0"></mavon-editor>
      <el-button
        @click="replyTopic"
        type="info"
        size="small"
        plain v-if="storeState.ifLogin">回复</el-button>
    </div>
    <div class="aside" v-if="topicDetail">
      <v-aside :author="authorInfo"></v-aside>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import aside from '../aside/aside'
  import {getDateDiff} from '../../assets/js/date'
  export default {
    name: 'topicDetail',
    inject: ['reload'],
    data () {
      return {
        topicDetail: '',
        authorInfo: '',
        tabCH: {
          good: '精华',
          weex: 'weex',
          share: '分享',
          ask: '问答',
          job: '招聘'
        },
        collection: '',
        replyEditor: [],
        value1: '', // 回复文章markdown
        value2: '', // 回复楼层markdown
        toggleMouse: [] // 鼠标悬浮去留
      }
    },
    created () {
      this.getTopicDetail()
    },
     updated () {
      this.collectionStatus()
    },
    computed: {
      storeState () {
        return this.$store.state
      }
    },
    methods: {
      collectionStatus () {
        if (this.storeState.userInfo) {
          this.storeState.userInfo.collect_topics.forEach((topic) => {
            if (topic.id === this.topicDetail.id) {
              this.collection = true
            }
          })
          return this.collection
        }
      },
      getTopicDetail () {
        /*  先获取对应topic，然后调用getAuthorInfo()函数获取对应用户信息
         *  缺点：强耦合， 有待解决
         * */
        this.$http({
          method: 'get',
          url: 'https://www.vue-js.com/api/v1/topic/' + this.$route.query.id
        })
          .then((res) => {
            this.topicDetail = res.data.data
            this.getAuthorInfo()
          })
      },
      getAuthorInfo () {
        // 获取对应用户信息
        this.$http({
          method: 'get',
          url: 'https://www.vue-js.com/api/v1/user/' + this.topicDetail.author.loginname
        })
          .then((res) => {
            this.authorInfo = res.data.data
          })
      },
      getloginInfo () {
        this.$http({
          method: 'get',
          url: 'https://www.vue-js.com/api/v1/user/' + this.storeState.userInfo.loginname
        })
          .then((res) => {
            this.storeState.userInfo = res.data.data
            // 因为axios是异步执行，所以collection的取反在这里执行
            this.collection = !this.collection
          })
      },
      collect () {
        // 收藏文章
        this.$http.post('https://www.vue-js.com/api/v1/topic/collect', {
          accesstoken: this.storeState.token,
          topic_id: this.topicDetail.id
        }).then((res) => {
          if (res.data.success === true) {
            // 重新获取收藏文章信息
            this.getloginInfo()
          }
        })
      },
      disCollect () {
        // 取消收藏文章
        this.$http.post('https://www.vue-js.com/api/v1/topic/de_collect ', {
          accesstoken: this.storeState.token,
          topic_id: this.topicDetail.id
        }).then((res) => {
          if (res.data.success === true) {
            // 重新获取收藏文章信息
            this.getloginInfo()
          }
        })
      },
      judgeUser (author) {
        if (author === this.storeState.loginInfo.loginname) {
          return true
        } else {
          return false
        }
      },
      mouseIn (index) {
        // 鼠标悬浮到对应li标签，设置对应位置为true，则显示对应icon
        this.toggleMouse[index] = true
      },
      mouseGo () {
        // 设置对应icon隐藏
        this.toggleMouse = []
      },
      toggleUp (reply) {
        this.$http.post('https://www.vue-js.com/api/v1/reply/' + reply.id + '/ups', {
          accesstoken: this.$store.state.token
        }).then((res) => {
          if (res.data.error_msg) {
            this.$message(res.data.error_msg)
          } else if (res.data.success) {
            if (res.data.action === 'up') {
              // 模拟点赞
              reply.ups.push('')
            } else if (res.data.action === 'down') {
              // 模拟取消点赞
              reply.ups.pop()
            }
          }
        })
      },
      toggleMavonEditor (index) {
        if (this.replyEditor[index] === true) {
          Vue.set(this.replyEditor, index, false)
        } else {
          Vue.set(this.replyEditor, index, true)
        }
        // this.replyEditor[index] = !this.replyEditor[index] 这样写不会触发视图更新
      },
      editReplay () {
        this.$message({
          showClose: true,
          message: '未提供此接口',
          type: 'error'
        })
      },
      deleteReply () {
        this.$message({
          showClose: true,
          message: '未提供此接口',
          type: 'error'
        })
      },
      getMarkdown1 (value, render) {
        // 回复文章
        this.value1 = render
      },
      getMarkdown2 (value, render) {
        // 回复楼层
        this.value2 = render
      },
      replyTopic () {
        if (this.value1 === '') {
          this.$message('还未做任何评论')
          return 0
        }
        this.$http.post('https://www.vue-js.com/api/v1/topic/' + this.topicDetail.id + '/replies', {
          accesstoken: this.$store.state.token,
          content: this.value1
        }).then((res) => {
          this.value1 = ''
          this.reload() // 页面重载
        })
      },
      replyFloor (reply) {
        if (this.value2 === '') {
          alert('还未做任何回复')
          return 0
        } else {
          this.$http.post('https://www.vue-js.com/api/v1/topic/' + this.topicDetail.id + '/replies', {
            accesstoken: this.$store.state.token,
            content: '@' + reply.author.loginname + this.value2,
            reply_id: reply.id
          }).then((res) => {
            this.value2 = ''
            this.reload() // 页面重载
          })
        }
      }
    },
    components: {
      'v-aside': aside
    },
    filters: {
      getDateDiff (time) {
        return getDateDiff(new Date(time).getTime())
      }
    }
  }
</script>

<style lang="less" scoped>
  .topic-detail{
    margin-top: 1em;
    .main-content{
      width: 60%;
      margin: 0 0 2em 6em;
      float: left;
      .title{
        border-top-left-radius: 0.4rem;
        border-top-right-radius: 0.4rem;
        background-color: #fff;
        position: relative;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        padding: 1em;
        .collect-common{
          font-size: 0.875em;
          position: absolute;
          top: 35%;
          right: 5%;
          padding: 0.3em 0.6em;
          cursor: pointer;
          border-radius: 0.2rem;
        }
        .collect{
          color: #fff;
          background-color: #369219;
          .collect-common;
          &:hover{
            background-color: #6ba44e;
          }
        }
        .disCollect{
          color: #333;
          background-color: #e5e5e5;
          .collect-common;
          &:hover{
            background-color: #909090;
            color: #fff;
          }
        }
        .topic-title{
          width: 85%;
          display: inline-block;
          font-weight: 700;
          font-size: 1.375rem;
        }
        .top,.good{
          background-color: #21611cc7;
          color: #fff;
          padding: 0.1em 0.5em;
          border-radius: 3px;
          font-size: 0.857em;
        }
        .author-relate{
          margin-top: 0.5em;
          color: #838383;
          font-size: 0.72em;
        }
      }
      .topic-detail-content{
        padding: 1em;
        min-height: 0;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
      }
      .replies{
        margin: 1em 0;
        border-radius: 0.4rem;
        .reply-title{
          padding: 0.625em;
          color: #1c6132;
          background-color: #f6f6f6;
          border-top-left-radius: 0.4rem;
          border-top-right-radius: 0.4rem;
        }
        .reply-content{
          background-color: #fff;
          border-bottom-left-radius: 0.4rem;
          border-bottom-right-radius: 0.4rem;
          li{
            position: relative;
            padding: 1em;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            &:hover{
              background-color: #f6f6f6;
            }
            .avatar{
              width: 2.5em;
              float: left;
              img{
                width: 1.875em;
                height: 1.875em;
                border-radius: 0.2rem;
              }
            }
            .author{
              overflow: auto;
              .reply-html{
                margin: 0.5em 0 0 1em;
              }
              .author-name{
                color: #666666;
                font-weight: 700;
              }
              span{
                font-size: 0.875em;
                color: #307d18;
              }
              .active{
                color: #df0000;
                span{
                  font-size: 0.875em;
                  color: #666666;
                }
              }
              .font{
                position: absolute;
                top: 0.625em;
                right: 0.625em;
                cursor: pointer;
                i{
                  margin-right: 0.2em;
                }
              }
              .reply-edit{
                margin: 1em 0;
                width: 95%;
              }
              .fade-enter-active, .fade-leave-active{
                transition: all 0.3s linear;
              }
              .fade-enter, .fade-leave-active{
                min-height: 200px;
                transform: translate3d(0, 200px, 0);
              }
            }
          }
        }
      }
    }
    .aside{
      width: 22%;
      margin-left: 1em;
      float: left;
    }
  }
</style>
