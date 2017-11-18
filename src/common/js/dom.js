/**
 * Created by lu on 2017/10/31.
 */
export function hasClass(el,className) {
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if(hasClass(el,className)){
    return
  }
  let newClass = el.className.split(' ')  //  以空白符分割
   newClass.push(className)
   el.className = newClass.join(' ')
}


export function getData(el, name, val) {
  const prefix = 'data-'
      name =prefix+name
  if(val){
    return el.setAttribute(name,val)
  }else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style       //处理动画兼容  transform

let vendor =(()=>{
  let transformName ={
    webkit:'webkitTransform',
    Moz:'MozTransform',
    O:'OTransform',
    ms:'msTransform',
    standard:'transform'
  }
  for(let key in transformName){
    if(elementStyle[transformName[key]] !== undefined){
      return key
    }
  }
  return false
})()


export function prefixStyle(style) {
  if(vendor ===false){
    return false
  }
  if(vendor ==='standard'){
    return style
  }
  return vendor + style.charAt(0).toUpperCase() +style.substr(1)
}