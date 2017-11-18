<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>


<script>
  import musicList from '../music-list/music-list.vue'
  import {getSongList} from '../../api/recommend'
  import {mapGetters} from 'vuex'
  import {ERR_OK} from '../../api/config'
  import {createSongs} from '../../common/js/song'
    export default{
      components:{
        musicList
      },
      data(){
          return{
              songs:[]
          }
      },
      computed:{
        title(){
            return this.disc.dissname
        },
        bgImage(){
          return this.disc.imgurl
        },
        ...mapGetters([
          'disc'
        ])
      },
      created(){
          this._getSongList()
      },
      methods:{
          _getSongList(){
              if(!this.disc.dissid){
                  this.$router.push('/recommend')
              }
              getSongList(this.disc.dissid)
                .then((res)=>{
                  if(res.code === ERR_OK){
                      this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                  }
                })
          },
        _normalizeSongs(list){
            let ret = []
          list.forEach((musicData) =>{
                if(musicData.songid && musicData.albummid){
                ret.push(createSongs(musicData))
              }
            })
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
