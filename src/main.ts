import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import timerMixin from './mixins/timerMixin';
// import shell from 'vue-shell'

import './style.css';
import './demos/ipc';

// If you want to use Node.js, the `nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App);

// Use the router and store
app.use(router);
// app.use(shell);
app.use(store);

// Use the timerMixin globally
app.mixin(timerMixin);

// Mount the app
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
