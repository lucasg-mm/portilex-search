<template>
  <div class="fixed">
    <ProgressBar v-if="isLoading" mode="indeterminate" />

    <div class="with-divisor">
      <Menubar class="navbar">
        <template #start>
          <a :href="siteUrl">
            <h1 id="logo">
              PortiLexicon-UD
              <span class="slogan">
                a lexicon for Brazilian Portuguese according to Universal
                Dependencies</span
              >
            </h1>
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

<style scoped lang="scss">
.slogan {
  font-size: 15px;
  color: #495057;
}

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
  height: 60px;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-color: #e4e5e8;
  background-color: white;
  color: black;
  font-size: 16px;
}

#logo {
  color: black;
}

:deep(.p-menubar-start) {
  margin-left: auto;
  margin-right: auto;
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

@media (max-width: 800px) {
  .slogan {
    display: none;
  }
}
</style>
