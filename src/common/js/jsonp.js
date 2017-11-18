/**
 * Created by lu on 2017/10/30.
 */
import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?')<0 ? '?' : '&')+param(data)
  return new Promise((resolve,reject)=>{
    originJsonp(url, option, (err,data)=>{               //相当于发送jsonp请求
      if(!err){
        resolve(data)
      }else {
        reject.err
      }
    })
  })
}


export function param(data) {
  let urlData = ''
  for(var k in data){
    let value =data[k] !==undefined ?data[k] :''
    urlData += `&${k}=${encodeURIComponent(value)}`
  }
  return urlData ? urlData.substring(1) :''
}
