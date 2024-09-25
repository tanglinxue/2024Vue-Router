import install, { Vue } from './install';
import createMatcher from './create-matcher'
import HashHistory from './history/hash';
import BrowserHistory from './history/history';
class VueRouter {
  constructor(options) {
    //用户传递的路由配置，我们可以对这个配置进行一个路由映射
    let routes = options.routes || [];
    this.beforeEachHooks = []
    //变成映射表 方便后续的匹配操作 可以匹配也可以添加新的路由
    this.matcher = createMatcher(routes)

    let mode = options.mode || 'hash';
    if (mode === 'hash') {
      this.history = new HashHistory(this)
    } else if (mode === 'history') {

      this.history = new BrowserHistory(this)
    }

    //根据不同的模式创建对应的路由系统
  }

  match(location) {
    return this.matcher.match(location)
  }
  push(location) {
    //这里只是调用了跳转逻辑，跳转逻辑不会修改我们的路径
    //针对hash值你可以直接wnidow.location.hash
    //不是hash值的情况 history.pushState
    return this.history.push(location)

  }
  beforeEach(cb) {
    this.beforeEachHooks.push(cb)
  }
  init(app) {
    let history = this.history
    //根据路径的变化匹配对应的组件来进行渲染 路径变化了 需要更新视图(响应式的)
    //根据路径匹配到对应的组件来渲染，之后监听路由变化
    history.transitionTo(history.getCurrentLocation(), () => {
      history.setupListener()
    })

    //每次路由切换的时候都需要listen方法中的回调实现更新
    history.listen((newRoute) => {//这个目的就是更新_route的值使它能够发生变化，数据变化会自动重新渲染视图
      app._route = newRoute
    })

  }
}

//1.我们需要将用户的配置进行映射
//2.要将根实例注入的router属性共享给每个组件

//为什么要多发明一个install方法，原因就是如果用户导出了一个类？在类上写一个install方法，会优先调用install方法
VueRouter.install = install
export default VueRouter
