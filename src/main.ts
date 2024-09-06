import './assets/main.css'

import { createApp } from 'vue'
import i18n from './i18n';
import { createPinia } from 'pinia';

import App from './App.vue';
import router,{setupRouter} from './router';
import { setupNaive } from './plugins/naive.js';

async function bootstrap() {
    const app = createApp(App)
    setupNaive(app);

    app.use(i18n);
    app.use(createPinia())

    setupRouter(app); 

    app.mount('#app',true)
    await router.isReady();
}

void bootstrap();