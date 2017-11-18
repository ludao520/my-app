/**
 * Created by lu on 2017/11/1.
 */
import jsonp from '../common/js/jsonp'
import {commonParams,options} from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({},commonParams,{
    channel:'singer',
    page:'list',
    key:'all_all_all',
    pagesize:100,
    pagenum:1,
    hostUin:0,
    needNewCode:0,
    Platform:'yqq',
    g_tk:1664029774
  })
  return jsonp(url, data, options)
}


export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({},commonParams,{
    hostUin:0,
    needNewCode:0,
    Platform:'yqq',
    order:'listen',
    begin:0,
    num:100,
    songstatus:1,
    singermid:singerId,               //歌手的id 很关键  获取到相应歌手的歌曲
    g_tk:1664029774
  })
  return jsonp(url, data, options)
}
