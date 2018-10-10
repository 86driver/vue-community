<template>
  <div>
    <div class="create">
      <div class="title">
        <router-link to="/home">
          <span class="to-home">返回主页 <i>/</i></span>
        </router-link>
        <span>发布话题</span>
      </div>
      <div class="content">
        <div class="select-type">
          <span>选择板块:</span>
          <el-select v-model="value" placeholder="请选择" @change="getTab">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="topic-title">
          <el-input
            v-model="title" placeholder="标题长度在 5 字以上"
            clearable
            maxlength="20"></el-input>
        </div>
        <div>
          <mavon-editor
            :boxShadow="false"
            :subfield="false"
            @change="getContent"></mavon-editor>
        </div>
        <div class="submit">
          <el-button type="primary" @click="submit">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create',
    inject: ['reload'],
    data () {
      return {
        options: [
          {
            value: 'share',
            label: '分享'
          },
          {
            value: 'ask',
            label: '问答'
          },
          {
            value: 'job',
            label: '招聘'
          }
        ],
        value: '',
        title: '',
        content: '',
        tab: ''
      }
    },
    methods: {
      getTab (tab) {
        this.tab = tab
      },
      getContent (value, render) {
        this.content = render
      },
      submit () {
        if (this.value === '') {
          this.$message({
            message: '请选择模块',
            type: 'error'
          })
          return 0
        } else if (this.title.length < 5) {
          this.$message({
            message: '请输入文章标题或检查标题长度是否过短',
            type: 'error'
          })
          return 0
        } else if (this.content === '') {
          this.$message({
            message: '还未作任何编辑',
            type: 'error'
          })
          return 0
        } else {
          this.$http.post('https://www.vue-js.com/api/v1/topics', {
            accesstoken: this.$store.state.token,
            title: this.title,
            tab: this.tab,
            content: this.content
          }).then((res) => {
            this.$router.push({path: '/topicdetail', query: {id: res.data.topic_id}})
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .create{
    font-size: 0.875rem;
    width: 80%;
    margin: 1em 0 0 6em;
    .title{
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
    .content{
      border-radius: 0 0 3px 3px;
      background-color: #fff;
      .select-type{
        padding: 1em 0 1em 0.625em;
        span{
          padding-right: 1em;
        }
      }
      .topic-title{
        width: 98%;
        margin: auto;
        padding-bottom: 1em;
      }
      .submit{
        padding: 1.5em 0 1em 0.625em;
      }
    }
  }
</style>
