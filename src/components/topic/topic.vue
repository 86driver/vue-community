<template>
  <div class="topic">
    <el-menu
      :default-active="'1'"
      mode="horizontal"
      background-color="#f6f6f6"
      text-color="#369219"
      active-text-color="#1C711D"
      @select="handleSelect">
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">精华</el-menu-item>
      <el-menu-item index="3">weex</el-menu-item>
      <el-menu-item index="4">分享</el-menu-item>
      <el-menu-item index="5">问答</el-menu-item>
      <el-menu-item index="6">招聘</el-menu-item>
    </el-menu>
    <transition name="fade">
      <div class="content" v-if="list">
        <ul>
          <li v-for="(item,index) in res" :key="index">
            <span class="avatar"><img :src="item.author.avatar_url"></span>
            <span class="count">{{item.reply_count}}/<i>{{item.visit_count}}</i></span>
            <span v-if="item.top" class="top">置顶</span>
            <span v-else-if="item.good" class="good">精华</span>
            <span v-else v-show="currentTab === 'all'" class="other-tab">{{tabCH[item.tab]}}</span>
            <router-link :to="{path: '/topicdetail', query: {id: item.id }}"><span class="title">{{item.title}}</span></router-link>
            <span class="time">{{item.last_reply_at | getDateDiff}}</span>
          </li>
        </ul>
        <div class="pagination" v-show="showPage && totalPage>0">
          <!-- :current-page.sync值只能是变量才起作用 -->
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page.sync = "currentPage"
            :total="1000"
            class="page">
          </el-pagination>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getDateDiff} from '../../assets/js/date'
  export default {
    name: 'topic',
    data () {
      return {
        res: '',
        // 主题分类,舍去tab[0]
        tab: ['', 'all', 'good', 'weex', 'share', 'ask', 'job'],
        tabCH: {
          good: '精华',
          weex: 'weex',
          share: '分享',
          ask: '问答',
          job: '招聘'
        },
        currentTab: 'all', // 选中全部分类时显示为哪种分类
        list: false, // 这里的list主要用来实现tab切换的transition效果
        totalPage: 0, // totalPage: 1 // 总页数
        showPage: true,
        currentPage: 1
      }
    },
    created () {
      this.getTopic(this.tab[0])
    },
    updated () {
      this.getTotalPage()
    },
    methods: {
      getTotalPage () {
        this.$http({
          method: 'get',
          // 由于接口原因,只给出20条数据， 但是可以操作后面页数的文章
          url: 'https://www.vue-js.com/api/v1/topics/?&tab=' + this.currentTab
        })
          .then((res) => {
            this.totalPage = res.data.data.length
          })
      },
      // 获取后台数据
      getTopic (tab, page = 1, limit = 10) {
        this.showPage = false
        this.list = false
        this.$store.state.loading = true
        this.$http({
          method: 'get',
          url: 'https://www.vue-js.com/api/v1/topics/?page=' + page + '&tab=' + tab + '&limit=' + limit + ''
        })
          .then((res) => {
            this.$store.state.loading = false
            this.list = true
            this.res = res.data.data
            this.showPage = true
        })
      },
      // 选择主题分类
      handleSelect (key) {
        this.getTopic(this.tab[key])
        this.currentTab = this.tab[key]
        this.currentPage = 1 // 重新选择tab页面时一定要把当前页面置为1
      },
      // 页码点击事件
      handleCurrentChange (val) {
        this.getTopic(this.currentTab, val)
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
  .topic{
    .el-menu-item{
      height: 3.125rem;
      line-height: 3.125rem;
    }
    .content{
      &.fade-enter-active,.fade-leave-active{
        opacity: 1;
        transition: all .5s linear;
      }
      &.fade-enter,.fade-leave-to{
        opacity: 0;
      }
      background-color: #fff;
      border-bottom-right-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
      margin-bottom: 0.5em;
      ul{
        li{
          font-size: 0.875em;
          height: 2.14em;
          line-height: 2.14em;
          padding: 0.714em 0 0.714em 0.714em;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          cursor: pointer;
          &:hover{
            background-color: rgb(246, 246, 246);
          }
          .avatar{
            img{
              width: 2.14em;
              height: 2.14em;
              border-radius: 3px;
              vertical-align: middle;
            }
          }
          .count{
            display: inline-block;
            text-align: center;
            margin-left: 1em;
            width: 4em;
            color: #9e78c0;
            i{
              color: #b4b4b4;
            }
          }
          .top,.good{
            margin-left: 1em;
            background-color: #21611cc7;
            color: #fff;
            padding: 0.1em 0.5em;
            border-radius: 3px;
            font-size: 0.857em;
          }
          .other-tab{
            margin-left: 1em;
            background-color: #e5e5e5;
            color: #999;
            padding: 0.1em 0.5em;
            border-radius: 3px;
            font-size: 0.857em;
          }
          .title{
            display: inline-block;
            margin-left: 1em;
            max-width: 60%;
            overflow: hidden;
            word-wrap: normal;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: bottom;
          }
          .time{
            float: right;
            margin-right: 1em;
            font-size: 0.875em;
            color: #777;
          }
        }
      }
      .pagination{
        padding: 1em 0 0.5em 0;
      }
    }
  }
</style>
