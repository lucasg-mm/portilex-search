import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// imports PrimeVue Styles
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// creates
const app = createApp(App);

// uses
app.use(PrimeVue);
app.use(ToastService);

// mounts app
app.mount("#app");
