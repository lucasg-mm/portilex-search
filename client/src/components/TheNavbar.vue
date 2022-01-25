<template>
  <div class="fixed">
    <ProgressBar v-if="isLoading" mode="indeterminate" />

    <div class="with-divisor">
      <Menubar class="navbar">
        <template #start>
          <a :href="siteUrl">
            <h1 id="logo">Portilexicon</h1>
          </a>
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script>
import Menubar from "primevue/menubar";
import ProgressBar from "primevue/progressbar";

export default {
  components: {
    Menubar,
    ProgressBar,
  },

  props: ["isLoading"],

  computed: {
    siteUrl() {
      return process.env.VUE_APP_URL;
    },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  background-color: white;
  z-index: 3;
}

.with-divisor {
  padding: 0 20px;
}

.p-progressbar {
  height: 3px;
}

.navbar {
  height: 50px;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-color: #e4e5e8;
  background-color: white;
  color: black;
  font-size: 14px;
}

#logo {
  color: black;
}

a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}
</style>
