// store.js

import { reactive } from 'vue';

export const store = reactive({
  user: null,

  setUser(user) {
    this.user = user;
  },
  getUser() {
    return this.state.user;
  },

  clearUser() {
    this.user = null;
  },
});
