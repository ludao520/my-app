/**
 * Created by lu on 2017/11/8.
 */

function getRandomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1) + 1)
}

export function shuffle(arr) {
    let _arr = arr.slice()
  for(let i=0;i<_arr.length;i++){
    let j = getRandomInt(0,1)
     let t =_arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
  }
  return _arr
}
