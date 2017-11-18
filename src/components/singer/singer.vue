<template>
    <div class="singer" ref="singer">
      <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
      <router-view></router-view>
    </div>
</template>


<script>
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import Singer from '../../common/js/singer'
  import listView from '../../base/listView/listView.vue'
  import {mapMutations} from 'vuex'
  import {playListMixin} from '../../common/js/mixin'
  const HOT_SINGER_LEN =10
  const HOT_NAME = '热门'
    export default{
      mixins: [playListMixin],
      components:{
        listView
      },
        data(){
            return{
                singers:[]
            }
        },
      created(){
            this._getSingerList()
      },
      methods:{
        handlePlayList(playList){
            const bottom = playList.length > 0 ? '55px' : 0
            this.$refs.singer.style.bottom = bottom
//            this.$refs.list.refresh()
        },
        selectSinger(singer){
            this.$router.push({                     //跳转到子路由 singer-detail  编程式路由
              path:`/singer/${singer.id}`
            })
            this.setSinger(singer)                // 静态数据  ，相当于把singer 的数据提交给vuex 管理
        },
        _getSingerList(){
          getSingerList()
            .then(res=>{
                if(res.code === ERR_OK){
               this.singers=this._normalizeSinger(res.data.list)
//               console.log(this.singers=this._normalizeSinger(res.data.list))
                
                }
            })
        },
        _normalizeSinger(list){            //标准化数据
            let map={
                hot:{
                    title:HOT_NAME,
                    items:[]
                }
            }
            list.forEach((item,index)=>{
                if(index<HOT_SINGER_LEN){        //前十首十热门歌曲作者
                    map.hot.items.push(new Singer({
                      name:item.Fsinger_name,
                      id:item.Fsinger_mid
                    }))
                }
                const key = item.Findex
              if(!map[key]){
                    map[key]={
                        title:key,
                        items:[]
                    }
              }
              map[key].items.push(new Singer({
                name:item.Fsinger_name,
                id:item.Fsinger_mid
              }))
            })
          console.log(map)
          //为了得到有序的map
          let hot = []
          let ret = []
          for(let key in map){
                let val = map[key]
            if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
            }else if(val.title ===HOT_NAME){
                hot.push(val)
            }
          }
          ret.sort((a,b)=>{
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
          })
          return hot.concat(ret)
          
          console.log(hot)
        },
        ...mapMutations({
          setSinger:'SET_SINGER'    //映射 调用里面SET_SINGER 的方法 ，用于提交数据singer
        })
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
