function createRoute(record, location) {
  let matched = []
  if (record) {
    while (record) {
      matched.unshift(record)
      record = record.parent;
    }
  }
  return {
    ...location,
    matched
  }
}
function runQueue(queue, from, to, cb) {
  function next(index) {
    if (index >= queue.length) return cb();
    let hook = queue[index];
    hook(from, to, () => next(index + 1))
  }
  next(0)
}
class Base {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: '/'
    })
    this.cb = null
  }
  //所有的逻辑都要放在这个transitionTo中来实现
  transitionTo(location, listener) {
    let record = this.router.match(location)
    let route = createRoute(record, { path: location })
    // 当前跳转的路径和我们之前存的一样，而且匹配结果也一样则不发生跳转了
    if (location === this.current.path && route.matched.length == this.current.matched.length) {
      return
    }
    let queue = [].concat(this.router.beforeEachHooks)//多个钩子跳转的时候可以解析后，拼接在一起执行
    runQueue(queue, this.current, route, () => {
      this.current = route;//这里更新当前的current对象
      //如果当路由切换的时候，也应该调用transitionTo方法再次拿到新的记录
      //需要根据匹配的记录找到所有的组件，根据组件渲染到不同的routerView中
      listener && listener()
      this.cb && this.cb(route)
    })
  }
  listen(cb) {//自定义了一个钩子
    this.cb = cb
  }

}
export default Base
