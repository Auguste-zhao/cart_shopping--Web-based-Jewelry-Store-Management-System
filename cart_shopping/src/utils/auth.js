import store from '@/store';

export function getToken() {
  return store.state.token;
}

export function setToken(token) {
  return store.commit('SET_TOKEN', token);
}

export function removeToken() {
  return setToken('');
}
