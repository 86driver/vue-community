<template>
  <div id="app">
    <v-header></v-header>
    <transition :name="transitionName">
      <router-view :key="$route.fullPath" v-if="isRouterAlive" class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import header from './components/header/header'

  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true,
        transitionName: 'slide-left'
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path === '/home') {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="less">
  @import './assets/font/iconfont.css';
  .child-view {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;  -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
