import routerLink from './components/router-link';
import routerView from './components/router-view';

export let Vue;
export default function install(_Vue) {
  Vue = _Vue;//将传入的Vue的构造函数变为全局的
  console.log('install')
  Vue.mixin({//mergeOptions 所有组件初始化都会采用这个方法
    beforeCreate() {
      //组件渲染是从父到子的
      if (this.$options.router) {
        //根实例上传递了router
        this._routerRoot = this;//根实例
        this._router = this.$options.router;
        this._router.init(this) //this就是我们整个的应用 new Vue
        //给根实例添加一个属性_route，就是当前的current对象
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        //this._router拿到根实例
        //this._route拿到current对象
      } else {
        //在所有组件上都增加一个_rooterRott指向根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  //在实例上取值的时候，会去拿到_router属性
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot && this._routerRoot._router
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {//所有组件里面都有个$route属性，对应的就是我们里面写的current
    get() {
      return this._routerRoot && this._routerRoot._route
    }
  })
  Vue.component('router-link', routerLink)
  Vue.component('router-view', routerView)
}
