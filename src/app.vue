<template>
    <div id="app">
      <my-header></my-header>
      <my-tab></my-tab>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <player></player>
    </div>
</template>


<script>
  import header from './components/header/header.vue'
  import tab from './components/tab/tab.vue'
  import player from './components/player/player.vue'
    export default{
      components:{
        'my-header':header,
        'my-tab':tab,
        player
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
