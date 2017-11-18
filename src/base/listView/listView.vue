<template>
  <scroll :data="data"
          class="listview"
          ref="listview"
          :listenScroll="listenScroll"
          @scroll="scroll"
          :probeType="probeType">
    <ul>
      <!--热门 和 大写字母的分支-->
      <li class="list-group" v-for="group in data" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <!--热门或大写字母 对应每个歌手的分支-->
          <li @click="selectItem(item)" class="list-group-item" v-for=" item in group.items">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div ref="listShortcut" class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchstart" @touchmove.stop.prevent="onShortcutTouchmove">
      <ul>
        <li class="item" v-for="(item,index) in listShortcut" :data-index="index" :class="{current:currentIndex===index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed"  v-show="fixedTitle" ref="listFixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>


<script>
  import scroll from '../scroll/scroll.vue'
  import {getData} from '../../common/js/dom'
  import loading from '../loading/loading.vue'
  import {mapGetters} from 'vuex'
  const EL_HEIGHT = 18
  const FIXED_TITLE = 30
    export default{
      components:{
          scroll,
        loading
      },
      data(){
        return{
            scrollY:-1,
            currentIndex:0,
            diff:-1
        }
      },
      props:{
        data:{
            type:Array,
           default:[]
        }
      },
      created(){
        this.touch={},
          this.listenScroll = true,
          this.listHeight = [],
          this.probeType = 3
      },
      computed:{
        listShortcut(){
           return this.data.map((group)=>{
                return group.title.substr(0,1)
            })
        },
        fixedTitle(){
            if(this.scrollY>0){
                return ''
            }
          return this.data[this.currentIndex]? this.data[this.currentIndex].title :''
        },
        ...mapGetters([
            'fullScreen'
        ])
      },
      methods:{
        
        onShortcutTouchstart(e){
            let anchorIndex =getData(e.target,'index')
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
             this._scrollTo(parseInt(anchorIndex))
    },
        onShortcutTouchmove(e){
          let firstTouch = e.touches[0]
          this.touch.y2 = firstTouch.pageY
          let delta = (this.touch.y2-this.touch.y1)/EL_HEIGHT |0
          let anchorIndex = parseInt(this.touch.anchorIndex) + delta
          this._scrollTo(anchorIndex)
        },
        scroll(pos){
            this.scrollY = pos.y
//         this.scrollY = Math.abs(pos.y)
//          console.log( this.scrollY)
        },
        selectItem(item){
          this.$emit('select',item)
          console.log(item)               //item 一个item代表一个歌手
        },
        _initTop(){
          this.listHeight = []
          
          const list = this.$refs.listGroup
          let height = 0
          this.listHeight.push(height)
          Array.prototype.slice.call(list).forEach((li)=>{
              height += li.clientHeight
            this.listHeight.push(height)
          })
        },
        _scrollTo(anchorIndex){             //anchorIndex 形参
            
            if(!anchorIndex && anchorIndex !==0){
                return
            }
          
            if(anchorIndex<0){
              anchorIndex =0
            }else if(anchorIndex>this.listHeight.length-2){
                anchorIndex=this.listHeight.length-2
            }
          this.scrollY = -this.listHeight[anchorIndex]
          this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
        }
      },
      watch:{
          data(){
//              setTimeout(()=>{
//                this._initTop()
//              },20)
             this.$nextTick(()=>{
               this._initTop()
             })
          },
      
        scrollY(newY){
          
          let listHeight = this.listHeight
            if(newY>0){
              this.currentIndex =0
              return
            }
              for(let i =0;i<listHeight.length-1;i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
                if(-newY>=height1 && -newY<height2){
                 this.currentIndex = i
//                 console.log(this.currentIndex)
                   this.diff =height2 + newY          //newY是负值
                       return
                }
              }
//           return listHeight.findIndex((height,index)=>{
//               const nextHeight =listHeight[index+1]
//             if(-newY>=height && -newY<nextHeight){
//                   this.currentIndex = index
//               console.log(index)
//               return
//             }
//           })
          
          //底部
          
          this.currentIndex =listHeight.length-2
         
        },
        diff(newVal){              //使得热门评论的fixed 往上平移 有种推得效果
            let fixedTop =(newVal>0 && newVal<FIXED_TITLE) ? newVal-FIXED_TITLE :0
          if(this.fixedTop===fixedTop){
                return
          }
          this.fixedTop = fixedTop
          this.$refs.listFixed.style.transform=`translate3d(0,${fixedTop}px ,0)`
        },
//        fullScreen(){
//            this.$refs.listShortcut.style.transform='translateY(-56%)'
//        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
