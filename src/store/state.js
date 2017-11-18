/**
 * Created by lu on 2017/11/3.
 */
import {playMode} from '../common/js/config'
const state = {
  singer:{},
  playing:false,
  fullScreen:false,
  playList:[],           //播放列表
  sequenceList:[],          //sequenceList 原始列表
  mode:playMode.sequence,
  currentIndex:-1,
  disc:{}
}

export default state
