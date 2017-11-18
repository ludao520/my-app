/**
 * Created by lu on 2017/11/3.
 */
import * as types from './mutation-tapes'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'

function findIndex(list,song) {
  return list.findIndex((item)=>{
    return item.id === song.id
  })
}


export const selectPlay = function ({commit,state},{list,index}) {

  commit(types.SET_SEQUENCE_LIST,list)       //原始的列表的inde要对应随机列表的index
  if(state.mode === playMode.random){
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST,randomList)
    index = findIndex(randomList,list[index])         //避免currentSong 会发生改变  他是由state.playList[state.currentIndex]
  }else {
    commit(types.SET_PLAY_LIST,list)
  }


  commit(types.SET_CURRENT_INDEX,index)

  commit(types.SET_FULL_SCREEN,true)

  commit(types.SET_PLAYING_STATE,true)

}

export const randomPlay = function ({commit},{list,index}) {
  commit(types.SET_PLAY_MODE,playMode.random)

  commit(types.SET_SEQUENCE_LIST,list)

  let randomList = shuffle(list)

  commit(types.SET_PLAY_LIST,randomList)

  commit(types.SET_CURRENT_INDEX,0)

  commit(types.SET_FULL_SCREEN,true)

  commit(types.SET_PLAYING_STATE,true)
}
