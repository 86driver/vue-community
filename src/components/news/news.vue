<template>
  <div class="news">
    <div class="link">
      <router-link to="/home">
        <span class="to-home">返回主页 <i>/</i></span>
      </router-link>
      <span>新消息</span>
    </div>
    <div class="un-read" v-if="messages">
      <div v-if="messages.hasnot_read_messages.length !== 0">
        <ul>
          <li v-for="(item, index) in messages.hasnot_read_messages" :key="index">
            <span>
              <router-link class="author-name" :to="{ name: 'user', params: { id: item.author.loginname }}">{{item.author.loginname}}</router-link>
            </span>
            <span>回复了你的话题</span>
            <span>
              <router-link :to="{ path: '/topicdetail', query: { id: item.topic.id }}">
                <span class="relate-topic">{{item.topic.title}}</span>
              </router-link>
            </span>
            <span class="time">
              {{item.topic.last_reply_at | getDateDiff}}
            </span>
          </li>
        </ul>
      </div>
      <div v-else class="no-messages">无消息</div>
    </div>
    <div class="link" style="color: #548122; margin-top: 1em">过往信息</div>
    <div class="already-read" v-if="messages">
      <div v-if="messages.has_read_messages.length !== 0">
        <ul>
          <li v-for="(item, index) in messages.has_read_messages" :key="index">
            <span>
              <router-link class="author-name" :to="{ name: 'user', params: { id: item.author.loginname }}">{{item.author.loginname}}</router-link>
            </span>
            <span>回复了你的话题</span>
            <span>
              <router-link :to="{ path: '/topicdetail', query: { id: item.topic.id }}">
                <span class="relate-topic">{{item.topic.title}}</span>
              </router-link>
            </span>
            <span class="time">
              {{item.topic.last_reply_at | getDateDiff}}
            </span>
          </li>
        </ul>
      </div>
      <div v-else class="no-messages">无消息</div>
    </div>
  </div>
</template>

<script>
  import {getDateDiff} from '../../assets/js/date'
  export default {
    name: 'news',
    data () {
      return {
        messages: ''
      }
    },
    created () {
      this.getMessages()
      this.markMessages()
    },
    methods: {
      getMessages () {
        this.$http({
          method: 'get',
          url: 'https://www.vue-js.com/api/v1/messages?accesstoken=' + this.$store.state.token
        })
          .then((res) => {
            this.messages = res.data.data
          })
      },
      markMessages () {
        this.$http.post('https://www.vue-js.com/api/v1/message/mark_all', {
          accesstoken: this.$store.state.token
        })
          .then((res) => {
            this.$store.state.readCount = 0
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
  .news{
    font-size: 0.875rem;
    width: 80%;
    margin: 1em 0 0 6em;
    .no-messages{
      padding: 1em;
    }
    .link{
      padding: 0.625em;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;
      .to-home{
        color: #369219;
        i{
          color: #ccc;
        }
      }
      span{
        color: #999;
      }
    }
    .un-read,.already-read{
      background-color: #fff;
      border-radius: 0 0 3px 3px;
      li{
        padding: 0.8em 1em;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .author-name,.relate-topic{
          color: #08c;
          overflow: hidden;
          word-wrap: normal;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .time{
          float: right;
          color: #666666;
          font-size: 0.6em;
        }
      }
    }
  }
</style>
