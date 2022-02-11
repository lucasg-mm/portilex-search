<template>
  <div class="nav">
    <div class="with-divisor">
      <div class="instructions">
        <b>You can also download the lexicon as a single .tsv file</b>
      </div>
      <Button
        @click="downloadLexicon"
        label="Download Lexicon"
        class="p-button-sm"
        icon="pi pi-download"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: { Button },

  // initializes the download of the whole uploaded treebank
  methods: {
    async downloadLexicon() {
      // mounts the download URL
      const downloadUrl = process.env.VUE_APP_URL + "api/lexicon/download";

      window.open(downloadUrl, "_blank");
    },
  },
};
</script>

<style scoped>
.instructions {
  text-align: center;
  color: #495057;
  font-size: 16px;
  margin: 0 auto 20px auto;
  line-height: 35px;
}

.license-line {
  display: block;
}

.cc-logo {
  vertical-align: bottom;
  width: 1.1rem;
}

.nav {
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #495057;
  font-size: 14px;
}

.with-divisor {
  padding: 50px 0 50px 0;
  margin: 0px 40px;
  border-top: 1px solid;
  border-color: #e4e5e8;
}
</style>
