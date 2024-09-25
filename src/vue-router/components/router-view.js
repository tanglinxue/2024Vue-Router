export default {
  functional: true,
  render(h, { parent, data }) {
    //默认先渲染app.vue中的router-view
    //在渲染about中的router-view
    data.routerView = true;
    let route = parent.$route;
    let depth = 0;

    while (parent) {
      //_vnode对应的是组件的渲染函数中的虚拟节点，$vnode代表的是Home组件本身,$vnode是_vnode的父亲
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent;//不停向上查找父组件
    }
    let record = route.matched[depth];
    if (!record) {
      return h()
    }
    return h(record.component, data)
  }
}
