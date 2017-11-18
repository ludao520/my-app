<template>
  <transition name="slide">
    <musiclist :songs="songs" :title="title" :bgImage="bgImage"></musiclist>
  </transition>
</template>


<script>
  import musiclist from '../music-list/music-list.vue'
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {createSongs} from '../../common/js/song'
    export default{
      components:{
        musiclist
      },
      computed: {
          title(){
            return this.singer.name
          },
          bgImage(){
              return this.singer.avatar
          },
        ...mapGetters([
          'singer'
        ])
      },
      data(){
        return{
            songs:[]
        }
      },
      created(){
          this._getDetail()
//          console.log(this.singer)
      },
      methods:{
        _getDetail(){
            if(!this.singer.id){
                this.$router.push('/singer')
              return
            }
          getSingerDetail(this.singer.id)
            .then((res)=>{
              if(res.code===ERR_OK){
                  console.log(res.data.list)
                this.songs = this._normalizeSongs(res.data.list)  //拿到对应歌手的相关歌曲   100条
              }
            })
        },
        _normalizeSongs(list){               //标准化数据  处理
            let ret =[]
          list.forEach((item)=>{
            let {musicData} = item
            if(musicData.songid && musicData.albummid){
              ret.push(createSongs(musicData))
            }
          })
          console.log(ret)
          return ret
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  
    .slide-enter-active,.slide-leave-active
      transition all .3s linear
    .slide-enter,.slide-leave-active
      transform translate3d(100%,0,0)
      opacity 0
</style>
