import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import jurisdiction from './modules/jurisdiction'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    jurisdiction
  },
  getters
})

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./modules/user', './modules/app', './modules/permission', './modules/tagsView', './modules/jurisdiction'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const user = require('./modules/user').default;
    const app = require('./modules/app').default;
    const permission = require('./modules/permission').default;
    const tagsView = require('./modules/tagsView').default;
    const jurisdiction = require('./modules/jurisdiction').default;
    // 加载新模块
    store.hotUpdate({
      modules: {
        app,
        user,
        jurisdiction,
        permission,
        tagsView
      }
    })
  })
}

export default store
