import { createStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { login, getInfo, salesmanLogin, getSalesmanInfo } from '@/api/user';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
const ls = new SecureLS({ isCompression: false });

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      token: '',
      name: '',
      role: '',
      id: '',
    };
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_ROLE: (state, role) => {
      state.role = role;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      const { username, password, id } = userInfo;
      try {
        const { token } = await login({
          username: username.trim(),
          password: password,
          id: id,
        });
        if (!token) {
          ElMessage({
            message: '登录失败',
            type: 'error',
          });
          return;
        }
        commit('SET_TOKEN', token);
        const user = await getInfo();
        commit('SET_ROLE', user.role);
        commit('SET_NAME', user.username);
        commit('SET_ID', user.id);
        ElMessage({
          message: '登陸成功',
          type: 'success',
        });
      } catch (error) {
        ElMessage({
          message: '登录失败',
          type: 'error',
        });
        throw error;
      }
    },
    async salesmanLogin({ commit }, userInfo) {
      const { username, password, id } = userInfo;
      try {
        const { token } = await salesmanLogin({
          username: username.trim(),
          password: password,
          id: id,
        });
        if (!token) {
          ElMessage({
            message: '登录失败',
            type: 'error',
          });
          return;
        }
        commit('SET_TOKEN', token);
        const user = await getSalesmanInfo();
        commit('SET_ROLE', user.role);
        commit('SET_NAME', user.username);
        commit('SET_ID', user.id);
        ElMessage({
          message: '登陸成功',
          type: 'success',
        });
      } catch (error) {
        ElMessage({
          message: '登录失败',
          type: 'error',
        });
        throw error;
      }
    },
    // get user info
    async getInfo({ commit }) {
      const { role, name, id } = await getInfo();
      commit('SET_ROLE', role);
      commit('SET_NAME', name);
      commit('SET_ID', id);
    },
    // get getSalesmanInfo info
    async getSalesmanInfo({ commit }) {
      const { role, name, id } = await getSalesmanInfo();
      commit('SET_ROLE', role);
      commit('SET_NAME', name);
      commit('SET_ID', id);
    },
    logout({ commit }) {
      commit('SET_TOKEN', '');
      commit('SET_ROLE', '');
      commit('SET_NAME', '');
      commit('SET_ID', '');
      ElMessage({
        message: '退出成功',
        type: 'success',
      });
    },
    resetToken({ commit }) {
      commit('SET_TOKEN', '');
      commit('SET_ROLE', '');
      commit('SET_ID', '');
    },
  },
  plugins: [
    createPersistedState({
      key: 'shop_vuex',
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});

export default store;
