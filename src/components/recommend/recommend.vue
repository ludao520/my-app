<template>
    <div class="recommend">
      <scroll class="recommend-content" :data="discList" ref="scroll">
        <div>
          <div class="slider-wrapper" v-if="recommend.length">
            <slider>
              <div v-for="item in recommend" >
                <a :href="item.linkUrl">
                  <img class="needsclick" @load="imgLoad" :src="item.picUrl" >
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" class="item" v-for="item in discList">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" >
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
         </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading ></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>


<script>
  import slider from '../../base/slider/slider.vue'
  import scroll from '../../base/scroll/scroll.vue'
  import loading from '../../base/loading/loading.vue'
  import {getRecommend,getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import {playListMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'
    export default{
      components:{
        slider,
        scroll,
        loading
      },
        data(){
          return{
            recommend:[],
            discList:[]
          }
        },
        created(){
            setTimeout(()=>{
              this._getRecommend()
            },20)
//          this._getRecommend()
          this._getDiscList()
        },
        methods:{
          selectItem(item){
            this.$router.push({
              path:`/recommend/${item.dissid}`
            })
            this.setDisc(item)
          },
            _getRecommend(){
              getRecommend()
                .then(res =>{
                    if(res.code===ERR_OK){
                     this.recommend = res.data.slider
                    }
                },error=>{
                  console.log(error)
                })
            },
          _getDiscList(){
            getDiscList()
              .then(res=>{
                if(res.code===ERR_OK){
                  this.discList = res.data.list
                }
              })
          },
          imgLoad(){
              if(!this.checkloaded){
                  this.$refs.scroll.refresh()          //当只有一张图生成的时候，就实时刷新，只有一次
                this.checkloaded=true
              }
          },
          ...mapMutations({
            setDisc:'SET_DISC'
          })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
