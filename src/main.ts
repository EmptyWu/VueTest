import './assets/main.css'

import { createApp } from 'vue'
import i18n from './i18n';
import { createPinia } from 'pinia';

import App from './App.vue';
import router,{setupRouter} from './router';
import { setupNaive } from './plugins/naive';
import { setupStore } from './stores/index';

async function bootstrap() {
    const app = createApp(App)

    setupStore(app);
    setupNaive(app);

    app.use(i18n);
    

    setupRouter(app); 

    router.isReady().then(() => {
        app.mount('#app',true);
    });


    //app.mount('#app',true)
    await router.isReady();
}

void bootstrap();