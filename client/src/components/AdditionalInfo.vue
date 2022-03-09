<template>
  <div class="nav">
    <div class="with-divisor">
      <table class="centralized-info">
        <tr>
          <td>
            <div>
              <a :href="downloadLexiconLink" target="_blank"
                >Download the lexicon</a
              >
              as a single .tsv file
            </div>
          </td>

          <td>
            <div class="central-el">
              <a href="https://forms.gle/qYC9pgwcgi7C1YQR9" target="_blank"
                >Suggest words</a
              >
              to be included in a future version
            </div>
          </td>

          <td>
            <span class="license-line">
              <img class="cc-logo" src="../assets/by.svg" /> Licensed under
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                >CC BY 4.0</a
              >
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  // initializes the download of the whole uploaded treebank
  computed: {
    downloadLexiconLink() {
      return process.env.VUE_APP_URL + "api/lexicon/download";
    },
  },
};
</script>

<style scoped>
.central-el {
  margin-left: 50px;
  margin-right: 50px;
}

.centralized-info {
  margin-left: auto;
  margin-right: auto;
}

.instructions {
  text-align: center;
  color: #495057;
  font-size: 15px;
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
