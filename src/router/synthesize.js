export function synthesize(e, RouterMap) {
  const syn = { constant: [], async: [] };
  // const constantRouter = RouterOne.constantRouterMap.concat(RouterTow.constantRouterMap);
  for (let i = 0; i < e.length; i++) {
    syn.constant = syn.constant.concat(e[i].constantRouterMap);
    syn.async = syn.async.concat(e[i].asyncRouterMap);
  }
  return syn;
}
