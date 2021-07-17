import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import { createWebHistory, createRouter } from 'vue-router';
import 'sweetalert2/dist/sweetalert2.min.css';

import IEdelDia from './components/IEdelDia.vue';
import Informe from './components/Informe.vue';

const routes = [
    {path: '/', component: IEdelDia},
    {path: '/informe', component: Informe},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });


createApp(App).use(router).use(VueSweetalert2).mount('#app')
