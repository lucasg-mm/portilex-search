import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";

// imports PrimeVue Styles
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// creates
const app = createApp(App);

// uses
app.use(PrimeVue);

// mounts app
app.mount("#app");
