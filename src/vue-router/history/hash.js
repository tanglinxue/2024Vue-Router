import Base from './base';


function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'; //没有hash 就默认一个
}

function getHash() {

  return window.location.hash.slice(1)
}

class HashHistory extends Base {
  constructor(router) {
    super(router)
    //初始化hash路由的时候 要给顶一个默认的hash路径
    ensureSlash()
  }
  setupListener() {//稍后需要调用此方法，监控hash值的变化
    window.addEventListener('hashchange', () => {
      //hash变化后也需要重新跳转
      this.transitionTo(getHash())
    })
  }
  getCurrentLocation() {
    return getHash()
  }
  push(location) {
    this.transitionTo(location, () => {
      window.location.hash = location
    })
  }
}

export default HashHistory
