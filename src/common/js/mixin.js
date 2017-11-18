/**
 * Created by lu on 2017/11/10.
 */
import {mapGetters} from 'vuex'

export const playListMixin = {
  computed:{
    ...mapGetters([
      'playList'
    ])
  },
  mounted(){
  this.handlePlayList(this.playList)
  },
  activated(){
    this.handlePlayList(this.playList)            //在keep-alive 启动时被调用
  },
  watch:{
  playList(newVal){
    this.handlePlayList(newVal)
  }
  },
  methods:{                            //这里说明外面没有这个方法，就得调用 例 handlePlayList
    handlePlayList(){
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
