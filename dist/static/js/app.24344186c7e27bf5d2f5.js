webpackJsonp([1],{"2L4A":function(t,e){},"2sE/":function(t,e){},"3YGq":function(t,e){},"53r+":function(t,e){},"991W":function(t,e){},ARuc:function(t,e){},KDcE:function(t,e){},M76s:function(t,e){},M89r:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i={name:"v-header",inject:["reload"],created:function(){this.getUnReadMessages()},updated:function(){this.getUnReadMessages()},computed:{count:function(){return this.$store.state.readCount},login:function(){return this.$store.state.loginInfo},_ifLogin:function(){return this.$store.state.ifLogin},loading:function(){return this.$store.state.loading}},methods:{handleCommand:function(t){"exit"===t?(this.exit(),this.reload()):"/user"===t?this.$router.push(t+"/"+this.login.loginname):this.$router.push(t)},goLogin:function(){this.$router.push("/login")},getUnReadMessages:function(){var t=this;this.$store.state.ifLogin&&this.$http({method:"get",url:"https://www.vue-js.com/api/v1/message/count?accesstoken="+this.$store.state.token}).then(function(e){t.$store.state.readCount=e.data.data})},exit:function(){sessionStorage.removeItem("accesstoken"),sessionStorage.removeItem("userInfo"),sessionStorage.removeItem("loginInfo"),this.$store.state.loginInfo="",this.$store.state.ifLogin=!1,this.$router.push("/home")}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header-wrapper"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{position:"fixed",top:"1.5em",left:"50%"},attrs:{"element-loading-background":"rgb(28,97,50)"}}),t._v(" "),a("el-row",{staticClass:"content"},[a("el-col",{staticClass:"left",attrs:{span:20}},[a("div",[a("span",{staticClass:"logo"},[a("img",{attrs:{src:s("vDal"),alt:""}})]),t._v(" "),a("span",{staticClass:"title"},[t._v("Vue.js")])])]),t._v(" "),a("el-col",{staticClass:"right",attrs:{span:4}},[a("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[a("span",{staticClass:"nav"})]),t._v(" "),t.count?a("el-badge",{attrs:{"is-dot":""}}):t._e(),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"/home"}},[t._v("首页")]),t._v(" "),t._ifLogin?a("el-dropdown-item",{attrs:{command:"/user"}},[t._v("个人中心")]):t._e(),t._v(" "),t._ifLogin?a("el-dropdown-item",{attrs:{command:"/news"}},[t._v("消息\n            "),t.count?a("el-badge",{staticClass:"item",attrs:{value:t.count}}):t._e()],1):t._e(),t._v(" "),a("el-dropdown-item",{attrs:{command:"/about"}},[t._v("关于")]),t._v(" "),t._ifLogin?a("el-dropdown-item",{attrs:{command:"exit"}},[t._v("退出")]):t._e()],1)],1),t._v(" "),a("div",{staticClass:"login"},[!1===t._ifLogin?a("span",{staticClass:"login-in",on:{click:t.goLogin}},[t._v("登录")]):a("span",{staticClass:"avatar"},[a("router-link",{attrs:{to:"/user/"+t.login.loginname}},[a("img",{attrs:{src:t.login.avatar_url}})])],1)])],1)],1)],1)},staticRenderFns:[]};var o={name:"App",provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0,transitionName:"slide-left"}},watch:{$route:function(t,e){"/home"===t.path?this.transitionName="slide-right":this.transitionName="slide-left"}},methods:{reload:function(){this.isRouterAlive=!1,this.$nextTick(function(){this.isRouterAlive=!0})}},components:{"v-header":s("VU/8")(i,n,!1,function(t){s("2sE/")},"data-v-7ac78dae",null).exports}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("v-header"),this._v(" "),e("transition",{attrs:{name:this.transitionName}},[this.isRouterAlive?e("router-view",{key:this.$route.fullPath,staticClass:"child-view"}):this._e()],1)],1)},staticRenderFns:[]};var l=s("VU/8")(o,r,!1,function(t){s("r96d")},null,null).exports,c=s("/ocq"),u=s("mvHQ"),v=s.n(u);function d(t){var e=(new Date).getTime()-t;if(!(e<0)){var s=e/2592e6,a=e/6048e5,i=e/864e5,n=e/36e5,o=e/6e4;return s>=1?parseInt(s)+"月前":a>=1?parseInt(a)+"周前":i>=1?parseInt(i)+"天前":n>=1?parseInt(n)+"小时前":o>=1?parseInt(o)+"分钟前":"刚刚"}}var h={name:"topic",data:function(){return{res:"",tab:["","all","good","weex","share","ask","job"],tabCH:{good:"精华",weex:"weex",share:"分享",ask:"问答",job:"招聘"},currentTab:"all",list:!1,totalPage:0,showPage:!0,currentPage:1}},created:function(){this.getTopic(this.tab[0])},updated:function(){this.getTotalPage()},methods:{getTotalPage:function(){var t=this;this.$http({method:"get",url:"https://www.vue-js.com/api/v1/topics/?&tab="+this.currentTab}).then(function(e){t.totalPage=e.data.data.length})},getTopic:function(t){var e=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;this.showPage=!1,this.list=!1,this.$store.state.loading=!0,this.$http({method:"get",url:"https://www.vue-js.com/api/v1/topics/?page="+s+"&tab="+t+"&limit="+a}).then(function(t){e.$store.state.loading=!1,e.list=!0,e.res=t.data.data,e.showPage=!0})},handleSelect:function(t){this.getTopic(this.tab[t]),this.currentTab=this.tab[t],this.currentPage=1},handleCurrentChange:function(t){this.getTopic(this.currentTab,t)}},filters:{getDateDiff:function(t){return d(new Date(t).getTime())}}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"topic"},[s("el-menu",{attrs:{"default-active":"1",mode:"horizontal","background-color":"#f6f6f6","text-color":"#369219","active-text-color":"#1C711D"},on:{select:t.handleSelect}},[s("el-menu-item",{attrs:{index:"1"}},[t._v("全部")]),t._v(" "),s("el-menu-item",{attrs:{index:"2"}},[t._v("精华")]),t._v(" "),s("el-menu-item",{attrs:{index:"3"}},[t._v("weex")]),t._v(" "),s("el-menu-item",{attrs:{index:"4"}},[t._v("分享")]),t._v(" "),s("el-menu-item",{attrs:{index:"5"}},[t._v("问答")]),t._v(" "),s("el-menu-item",{attrs:{index:"6"}},[t._v("招聘")])],1),t._v(" "),s("transition",{attrs:{name:"fade"}},[t.list?s("div",{staticClass:"content"},[s("ul",t._l(t.res,function(e,a){return s("li",{key:a},[s("span",{staticClass:"avatar"},[s("img",{attrs:{src:e.author.avatar_url}})]),t._v(" "),s("span",{staticClass:"count"},[t._v(t._s(e.reply_count)+"/"),s("i",[t._v(t._s(e.visit_count))])]),t._v(" "),e.top?s("span",{staticClass:"top"},[t._v("置顶")]):e.good?s("span",{staticClass:"good"},[t._v("精华")]):s("span",{directives:[{name:"show",rawName:"v-show",value:"all"===t.currentTab,expression:"currentTab === 'all'"}],staticClass:"other-tab"},[t._v(t._s(t.tabCH[e.tab]))]),t._v(" "),s("router-link",{attrs:{to:{path:"/topicdetail",query:{id:e.id}}}},[s("span",{staticClass:"title"},[t._v(t._s(e.title))])]),t._v(" "),s("span",{staticClass:"time"},[t._v(t._s(t._f("getDateDiff")(e.last_reply_at)))])],1)})),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showPage&&t.totalPage>0,expression:"showPage && totalPage>0"}],staticClass:"pagination"},[s("el-pagination",{staticClass:"page",attrs:{layout:"prev, pager, next","current-page":t.currentPage,total:1e3},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)]):t._e()])],1)},staticRenderFns:[]};var _=s("VU/8")(h,p,!1,function(t){s("53r+")},"data-v-ba7dd1c0",null).exports,m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.author?s("div",{staticClass:"author"},[s("div",{staticClass:"title"},[t._v(t._s(t.author.loginname===t.loginName?"个人信息":"作者信息"))]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"avatar"},[s("router-link",{attrs:{to:"/user/"+t.author.loginname}},[s("img",{attrs:{src:t.author.avatar_url}})]),t._v(" "),s("div",[t._v(t._s(t.author.loginname))]),t._v(" "),s("div",[t._v("积分: "+t._s(t.author.score))])],1),t._v(" "),s("el-collapse",{staticClass:"collapse",attrs:{accordion:""}},[s("el-collapse-item",{attrs:{title:"收藏",name:"1"}},[0===t.author.collect_topics.length?s("div",[t._v("无")]):s("div",t._l(t.author.collect_topics,function(e,a){return s("div",{key:a,staticClass:"link"},[s("router-link",{attrs:{to:{path:"/topicdetail",query:{id:e.id}}}},[t._v(t._s(e.title))])],1)}))]),t._v(" "),s("el-collapse-item",{attrs:{title:"最近参与的话题",name:"2"}},[0===t.author.recent_replies.length?s("div",[t._v("无")]):s("div",t._l(t.author.recent_replies,function(e,a){return s("div",{key:a,staticClass:"link"},[s("router-link",{attrs:{to:{path:"/topicdetail",query:{id:e.id}}}},[t._v(t._s(e.title))])],1)}))]),t._v(" "),s("el-collapse-item",{attrs:{title:"最近发布的文章",name:"3"}},[0===t.author.recent_topics.length?s("div",[t._v("无")]):s("div",t._l(t.author.recent_topics,function(e,a){return s("div",{key:a,staticClass:"link"},[s("router-link",{attrs:{to:{path:"/topicdetail",query:{id:e.id}}}},[t._v(t._s(e.title))])],1)}))])],1)],1)]):t._e()},staticRenderFns:[]};var g=s("VU/8")({props:["author"],computed:{loginName:function(){return this.$store.state.loginInfo.loginname}}},m,!1,function(t){s("3YGq")},"data-v-89e19f9e",null).exports,f={name:"home",data:function(){return{user:""}},created:function(){this.getloginInfo()},methods:{getloginInfo:function(){var t=this;this.$http({method:"get",url:"https://www.vue-js.com/api/v1/user/"+this.$store.state.loginInfo.loginname}).then(function(e){t.user=e.data.data,sessionStorage.setItem("userInfo",v()(e.data.data)),t.$store.state.userInfo=e.data.data})},createTopic:function(){this.$router.push("/create")}},components:{topic:_,"v-aside":g}},w={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("div",{staticClass:"left"},[s("topic")],1),t._v(" "),s("div",{staticClass:"right"},[t.user?s("v-aside",{attrs:{author:t.user}}):t._e(),t._v(" "),t.user?s("div",{staticClass:"create-Topic"},[s("span",{on:{click:t.createTopic}},[t._v("发布话题")])]):t._e()],1)])},staticRenderFns:[]};var C=s("VU/8")(f,w,!1,function(t){s("TMNc")},"data-v-649018b7",null).exports,k={name:"user",data:function(){return{authorInfo:""}},created:function(){this.getLoginInfo(),this.getAuthorInfo()},methods:{getLoginInfo:function(){this.$store.state.ifLogin=!0,this.$store.state.token=sessionStorage.accesstoken,this.$store.state.loginInfo=JSON.parse(sessionStorage.loginInfo),this.$store.state.userInfo=JSON.parse(sessionStorage.userInfo)},getAuthorInfo:function(){var t=this;this.$http({method:"get",url:"https://www.vue-js.com/api/v1/user/"+this.$route.params.id}).then(function(e){"OK"===e.statusText&&(t.authorInfo=e.data.data)})}},filters:{getDateDiff:function(t){return d(new Date(t).getTime())}}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"user"},[t.authorInfo?s("div",[s("div",[s("router-link",{staticClass:"go-home",attrs:{to:"/home"}},[t._v("点击这里返回主页")])],1),t._v(" "),s("div",{staticClass:"info"},[s("div",[t._v("用户: "+t._s(t.$route.params.id))]),t._v(" "),s("div",[t._v("注册时间: "+t._s(t._f("getDateDiff")(this.authorInfo.create_at)))])]),t._v(" "),s("div",{staticClass:"warn"},[t._v("其他功能已在其他页面实现~")])]):s("div",[t._v("\n    此用户不存在\n  ")])])},staticRenderFns:[]};var $=s("VU/8")(k,b,!1,function(t){s("P3ES")},"data-v-75ce83f0",null).exports,y={name:"login",data:function(){return{token:""}},methods:{login:function(){var t=this;if(""===this.token)return this.$message({message:"请输入accesstoken登录",type:"error"}),0;this.$http.post("https://www.vue-js.com/api/v1/accesstoken",{accesstoken:this.token}).then(function(e){sessionStorage.setItem("accesstoken",t.token),sessionStorage.setItem("loginInfo",v()(e.data)),t.$store.state.token=t.token,t.$store.state.ifLogin=!0,t.$store.state.loginInfo=e.data,t.$router.push("/home")})}}},D={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"login"},[s("el-popover",{attrs:{placement:"top-start",title:"accesstoken 的获取方法",width:"200",trigger:"hover",content:"登录 vue.js 社区 选择 '设置' 并滑到底部可以看到 accesstoken"}},[s("el-input",{staticClass:"login-input",attrs:{slot:"reference",placeholder:"请使用 accesstoken 登录"},slot:"reference",model:{value:t.token,callback:function(e){t.token=e},expression:"token"}})],1),t._v(" "),s("el-button",{attrs:{type:"success"},on:{click:t.login}},[t._v("登录")])],1)])},staticRenderFns:[]};var I=s("VU/8")(y,D,!1,function(t){s("2L4A")},"data-v-eaa737b2",null).exports,x={name:"topicDetail",inject:["reload"],data:function(){return{topicDetail:"",authorInfo:"",tabCH:{good:"精华",weex:"weex",share:"分享",ask:"问答",job:"招聘"},collection:"",replyEditor:[],value1:"",value2:"",toggleMouse:[]}},created:function(){this.getTopicDetail()},updated:function(){this.collectionStatus()},computed:{storeState:function(){return this.$store.state}},methods:{collectionStatus:function(){var t=this;if(this.storeState.userInfo)return this.storeState.userInfo.collect_topics.forEach(function(e){e.id===t.topicDetail.id&&(t.collection=!0)}),this.collection},getTopicDetail:function(){var t=this;this.$http({method:"get",url:"https://www.vue-js.com/api/v1/topic/"+this.$route.query.id}).then(function(e){t.topicDetail=e.data.data,t.getAuthorInfo()})},getAuthorInfo:function(){var t=this;this.$http({method:"get",url:"https://www.vue-js.com/api/v1/user/"+this.topicDetail.author.loginname}).then(function(e){t.authorInfo=e.data.data})},getloginInfo:function(){var t=this;this.$http({method:"get",url:"https://www.vue-js.com/api/v1/user/"+this.storeState.userInfo.loginname}).then(function(e){t.storeState.userInfo=e.data.data,t.collection=!t.collection})},collect:function(){var t=this;this.$http.post("https://www.vue-js.com/api/v1/topic/collect",{accesstoken:this.storeState.token,topic_id:this.topicDetail.id}).then(function(e){!0===e.data.success&&t.getloginInfo()})},disCollect:function(){var t=this;this.$http.post("https://www.vue-js.com/api/v1/topic/de_collect ",{accesstoken:this.storeState.token,topic_id:this.topicDetail.id}).then(function(e){!0===e.data.success&&t.getloginInfo()})},judgeUser:function(t){return t===this.storeState.loginInfo.loginname},mouseIn:function(t){this.toggleMouse[t]=!0},mouseGo:function(){this.toggleMouse=[]},toggleUp:function(t){var e=this;this.$http.post("https://www.vue-js.com/api/v1/reply/"+t.id+"/ups",{accesstoken:this.$store.state.token}).then(function(s){s.data.error_msg?e.$message(s.data.error_msg):s.data.success&&("up"===s.data.action?t.ups.push(""):"down"===s.data.action&&t.ups.pop())})},toggleMavonEditor:function(t){!0===this.replyEditor[t]?a.default.set(this.replyEditor,t,!1):a.default.set(this.replyEditor,t,!0)},editReplay:function(){this.$message({showClose:!0,message:"未提供此接口",type:"error"})},deleteReply:function(){this.$message({showClose:!0,message:"未提供此接口",type:"error"})},getMarkdown1:function(t,e){this.value1=e},getMarkdown2:function(t,e){this.value2=e},replyTopic:function(){var t=this;if(""===this.value1)return this.$message("还未做任何评论"),0;this.$http.post("https://www.vue-js.com/api/v1/topic/"+this.topicDetail.id+"/replies",{accesstoken:this.$store.state.token,content:this.value1}).then(function(e){t.value1="",t.reload()})},replyFloor:function(t){var e=this;if(""===this.value2)return alert("还未做任何回复"),0;this.$http.post("https://www.vue-js.com/api/v1/topic/"+this.topicDetail.id+"/replies",{accesstoken:this.$store.state.token,content:"@"+t.author.loginname+this.value2,reply_id:t.id}).then(function(t){e.value2="",e.reload()})}},components:{"v-aside":g},filters:{getDateDiff:function(t){return d(new Date(t).getTime())}}},S={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.topicDetail?s("div",{staticClass:"topic-detail"},[s("div",{staticClass:"main-content"},[s("div",{staticClass:"title"},[t.storeState.ifLogin?s("div",[!0!==t.collection?s("div",{staticClass:"collect",on:{click:t.collect}},[t._v("加入收藏")]):s("div",{staticClass:"disCollect",on:{click:t.disCollect}},[t._v("取消收藏")])]):t._e(),t._v(" "),s("div",[t.topicDetail.top?s("span",{staticClass:"top"},[t._v("置顶")]):t.topicDetail.good?s("span",{staticClass:"good"},[t._v("精华")]):t._e(),t._v(" "),s("span",{staticClass:"topic-title"},[t._v(t._s(t.topicDetail.title))])]),t._v(" "),s("div",{staticClass:"author-relate"},[s("span",[t._v("发布于"+t._s(t._f("getDateDiff")(t.topicDetail.create_at)))]),t._v(" "),s("span",[t._v("作者"+t._s(t.topicDetail.author.loginname))]),t._v(" "),s("span",[t._v(t._s(t.topicDetail.visit_count)+"次浏览")]),t._v(" "),s("span",[t._v("来自 "+t._s(t.tabCH[t.topicDetail.tab]))])])]),t._v(" "),s("mavon-editor",{staticClass:"topic-detail-content",domProps:{innerHTML:t._s(t.topicDetail.content)}}),t._v(" "),t.topicDetail.reply_count?s("div",{staticClass:"replies"},[s("div",{staticClass:"reply-title"},[t._v(t._s(t.topicDetail.reply_count)+" 回复")]),t._v(" "),s("ul",{staticClass:"reply-content"},t._l(t.topicDetail.replies,function(e,a){return s("li",{key:a,on:{mouseover:function(e){t.mouseIn(a)},mouseout:function(e){t.mouseGo()}}},[s("div",{staticClass:"avatar"},[s("router-link",{attrs:{to:"/user/"+e.author.loginname}},[s("img",{attrs:{src:e.author.avatar_url}})])],1),t._v(" "),s("div",{staticClass:"author"},[s("span",{staticClass:"author-name"},[t._v(t._s(e.author.loginname))]),t._v(" "),s("span",[t._v(t._s(a+1)+"楼")]),t._v(" "),s("span",[t._v(t._s(t._f("getDateDiff")(t.topicDetail.create_at)))]),t._v(" "),s("div",{staticClass:"reply-html",domProps:{innerHTML:t._s(e.content)}}),t._v(" "),s("transition",{attrs:{name:"fade"}},[s("mavon-editor",{directives:[{name:"show",rawName:"v-show",value:t.replyEditor[a],expression:"replyEditor[index]"}],staticClass:"reply-edit",attrs:{placeholder:"@"+e.author.loginname,subfield:!1,boxShadow:!1},on:{change:t.getMarkdown2}})],1),t._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:t.replyEditor[a],expression:"replyEditor[index]"}],attrs:{type:"info",size:"small",plain:""},on:{click:function(s){t.replyFloor(e)}}},[t._v("回复")]),t._v(" "),t.storeState.ifLogin?s("div",{staticClass:"font"},[s("i",{staticClass:"icon iconfont icon-thumb-up",class:{active:e.ups.length},on:{click:function(s){t.toggleUp(e)}}},[e.ups.length>0?s("span",[t._v(t._s(e.ups.length))]):t._e()]),t._v(" "),t.judgeUser(e.author.loginname)?s("i",{directives:[{name:"show",rawName:"v-show",value:t.toggleMouse[a],expression:"toggleMouse[index]"}],staticClass:"icon iconfont icon-edit",on:{click:t.editReplay}}):t._e(),t._v(" "),t.judgeUser(e.author.loginname)?s("i",{directives:[{name:"show",rawName:"v-show",value:t.toggleMouse[a],expression:"toggleMouse[index]"}],staticClass:"icon iconfont icon-delete",on:{click:function(e){t.deleteReply()}}}):t._e(),t._v(" "),s("i",{staticClass:"icon iconfont icon-huifu",on:{click:function(e){t.toggleMavonEditor(a)}}})]):t._e()],1)])}))]):t._e(),t._v(" "),t.storeState.ifLogin?s("mavon-editor",{staticStyle:{margin:"1em 0"},attrs:{boxShadow:!1,subfield:!1},on:{change:t.getMarkdown1}}):t._e(),t._v(" "),t.storeState.ifLogin?s("el-button",{attrs:{type:"info",size:"small",plain:""},on:{click:t.replyTopic}},[t._v("回复")]):t._e()],1),t._v(" "),t.topicDetail?s("div",{staticClass:"aside"},[s("v-aside",{attrs:{author:t.authorInfo}})],1):t._e()]):t._e()},staticRenderFns:[]};var E=s("VU/8")(x,S,!1,function(t){s("M76s")},"data-v-654b5c06",null).exports,j={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"create"},[s("div",{staticClass:"title"},[s("router-link",{attrs:{to:"/home"}},[s("span",{staticClass:"to-home"},[t._v("返回主页 "),s("i",[t._v("/")])])]),t._v(" "),s("span",[t._v("发布话题")])],1),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"select-type"},[s("span",[t._v("选择板块:")]),t._v(" "),s("el-select",{attrs:{placeholder:"请选择"},on:{change:t.getTab},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),s("div",{staticClass:"topic-title"},[s("el-input",{attrs:{placeholder:"标题长度在 5 字以上",clearable:"",maxlength:"20"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),s("div",[s("mavon-editor",{attrs:{boxShadow:!1,subfield:!1},on:{change:t.getContent}})],1),t._v(" "),s("div",{staticClass:"submit"},[s("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("发布")])],1)])])])},staticRenderFns:[]};var T=s("VU/8")({name:"create",inject:["reload"],data:function(){return{options:[{value:"share",label:"分享"},{value:"ask",label:"问答"},{value:"job",label:"招聘"}],value:"",title:"",content:"",tab:""}},methods:{getTab:function(t){this.tab=t},getContent:function(t,e){this.content=e},submit:function(){var t=this;return""===this.value?(this.$message({message:"请选择模块",type:"error"}),0):this.title.length<5?(this.$message({message:"请输入文章标题或检查标题长度是否过短",type:"error"}),0):""===this.content?(this.$message({message:"还未作任何编辑",type:"error"}),0):void this.$http.post("https://www.vue-js.com/api/v1/topics",{accesstoken:this.$store.state.token,title:this.title,tab:this.tab,content:this.content}).then(function(e){t.$router.push({path:"/topicdetail",query:{id:e.data.topic_id}})})}}},j,!1,function(t){s("ARuc")},"data-v-1caf31ca",null).exports,M={name:"news",data:function(){return{messages:""}},created:function(){this.getMessages(),this.markMessages()},methods:{getMessages:function(){var t=this;this.$http({method:"get",url:"https://www.vue-js.com/api/v1/messages?accesstoken="+this.$store.state.token}).then(function(e){t.messages=e.data.data})},markMessages:function(){var t=this;this.$http.post("https://www.vue-js.com/api/v1/message/mark_all",{accesstoken:this.$store.state.token}).then(function(e){t.$store.state.readCount=0})}},filters:{getDateDiff:function(t){return d(new Date(t).getTime())}}},R={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"news"},[s("div",{staticClass:"link"},[s("router-link",{attrs:{to:"/home"}},[s("span",{staticClass:"to-home"},[t._v("返回主页 "),s("i",[t._v("/")])])]),t._v(" "),s("span",[t._v("新消息")])],1),t._v(" "),t.messages?s("div",{staticClass:"un-read"},[0!==t.messages.hasnot_read_messages.length?s("div",[s("ul",t._l(t.messages.hasnot_read_messages,function(e,a){return s("li",{key:a},[s("span",[s("router-link",{staticClass:"author-name",attrs:{to:{name:"user",params:{id:e.author.loginname}}}},[t._v(t._s(e.author.loginname))])],1),t._v(" "),s("span",[t._v("回复了你的话题")]),t._v(" "),s("span",[s("router-link",{attrs:{to:{path:"/topicdetail",query:{id:e.topic.id}}}},[s("span",{staticClass:"relate-topic"},[t._v(t._s(e.topic.title))])])],1),t._v(" "),s("span",{staticClass:"time"},[t._v("\n            "+t._s(t._f("getDateDiff")(e.topic.last_reply_at))+"\n          ")])])}))]):s("div",{staticClass:"no-messages"},[t._v("无消息")])]):t._e(),t._v(" "),s("div",{staticClass:"link",staticStyle:{color:"#548122","margin-top":"1em"}},[t._v("过往信息")]),t._v(" "),t.messages?s("div",{staticClass:"already-read"},[0!==t.messages.has_read_messages.length?s("div",[s("ul",t._l(t.messages.has_read_messages,function(e,a){return s("li",{key:a},[s("span",[s("router-link",{staticClass:"author-name",attrs:{to:{name:"user",params:{id:e.author.loginname}}}},[t._v(t._s(e.author.loginname))])],1),t._v(" "),s("span",[t._v("回复了你的话题")]),t._v(" "),s("span",[s("router-link",{attrs:{to:{path:"/topicdetail",query:{id:e.topic.id}}}},[s("span",{staticClass:"relate-topic"},[t._v(t._s(e.topic.title))])])],1),t._v(" "),s("span",{staticClass:"time"},[t._v("\n            "+t._s(t._f("getDateDiff")(e.topic.last_reply_at))+"\n          ")])])}))]):s("div",{staticClass:"no-messages"},[t._v("无消息")])]):t._e()])},staticRenderFns:[]};var L=s("VU/8")(M,R,!1,function(t){s("KDcE")},"data-v-6ea558f0",null).exports,P={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"about"},[s("h1",{staticClass:"title"},[t._v("关于此Vue.js社区项目")]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"link"},[s("h1",[t._v("项目相关：")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/86driver/vue-community",target:"_blank"}},[t._v("项目地址点这里~~")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://86driver.github.io/vue-community/dist",target:"_blank"}},[t._v("预览点这里~~")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.vue-js.com/",target:"_blank"}},[t._v("真 · Vue.js社区点这里~~")])])])]),t._v(" "),s("div",{staticClass:"complement"},[s("h1",[t._v("补充：")]),t._v(" "),s("ul",[s("li",[s("i",[t._v("1. ")]),t._v("\n          由于此项目用的markdown为\n          "),s("a",{attrs:{href:"https://github.com/hinesboy/mavonEditor",target:"_blank"}},[t._v("mavonEditor")]),t._v("\n          跟原社区所使用不一致，可能会造成两种markdown所编辑的文章排版不一致。\n        ")]),t._v(" "),s("li",[s("i",[t._v("2. ")]),t._v("\n          由于本项目选用的是 "),s("span",{staticStyle:{color:"#6b98c6"}},[t._v('"mode: hash"')]),t._v('\n          可能导致文章 @ 跳转失效（原社区使用的 "history"）。\n        ')]),t._v(" "),s("li",[s("i",[t._v("3. ")]),t._v("\n          发现其他问题可以联系我一起探讨解决，让我们在知识的海洋里一起为所欲为吧~~~\n        ")])])]),t._v(" "),s("div",{staticClass:"relate-me"},[s("h1",[t._v("联系我：")]),t._v(" "),s("ul",[s("li",[t._v("微信：a610410574")]),t._v(" "),s("li",[t._v("QQ：610410574")])])]),t._v(" "),s("div",{staticClass:"end"},[s("span",[t._v("结尾：")]),t._v("觉得对你有帮助，请点击 "),s("a",{attrs:{href:"https://github.com/86driver/vue-community",target:"_blank"}},[t._v("这里")]),t._v(" 给个star~")])])])}]};var N=s("VU/8")({name:"about"},P,!1,function(t){s("REos")},"data-v-25bb18e5",null).exports;a.default.use(c.a);var U=new c.a({routes:[{path:"/",redirect:"/home"},{path:"/home",name:"home",component:C},{path:"/user/:id",name:"user",meta:{requireAuth:!0},component:$},{path:"/login",name:"login",component:I},{path:"/topicdetail",name:"topicdetail",component:E},{path:"/create",name:"create",component:T},{path:"/news",name:"news",component:L},{path:"/about",name:"about",component:N}]}),A=s("9rMa");a.default.use(A.a);var q=new A.a.Store({state:{token:"",loginInfo:{},userInfo:"",ifLogin:!1,loading:!1,readCount:0}}),V=s("zL8q"),F=s.n(V),H=(s("tvR6"),s("aozt")),z=s.n(H),G=(s("991W"),s("Rw8D")),O=s.n(G);s("M89r");a.default.prototype.$http=z.a,a.default.config.productionTip=!1,a.default.use(F.a),a.default.use(O.a),U.beforeEach(function(t,e,s){t.matched.some(function(t){return t.meta.requireAuth})?!0===q.state.loginInfo.success||void 0!==sessionStorage.accesstoken?(q.state.ifLogin=!0,s()):(alert("请先登录"),s({path:"/login",query:{redirect:t.fullPath}})):s()}),new a.default({el:"#app",router:U,store:q,components:{App:l},template:"<App/>",data:function(){return{value:""}}})},P3ES:function(t,e){},REos:function(t,e){},TMNc:function(t,e){},r96d:function(t,e){},tvR6:function(t,e){},vDal:function(t,e,s){t.exports=s.p+"static/img/logo.e1ea82c.png"}},["NHnr"]);
//# sourceMappingURL=app.24344186c7e27bf5d2f5.js.map