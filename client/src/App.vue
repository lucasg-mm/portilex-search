<template>
  <div>
    <TheNavbar :isLoading="isLoading"></TheNavbar>
    <div class="centered">
      <div class="search-set">
        <span class="p-input-icon-left input-wrapper">
          <i class="pi pi-search" />
          <InputText
            class="search-input p-inputtext-lg"
            type="text"
            v-model="searchTerm"
            placeholder="Search for a word"
          />
        </span>
        <Button @click="makeSearch" label="Search Word" class="p-button-lg" />
      </div>
      <div v-if="!madeSearch" class="instructions-panel">
        <table>
          <tr>
            <td class="responsive-td">
              <img class="art-initial" src="./assets/logo-ud.png" />
            </td>
            <td class="responsive-td">
              <div class="instructions-initial">
                PortiLexicon-UD contains over 1.2 million word forms in
                Portuguese with their respective morphological and
                morphosyntactic information, following the
                <a href="https://universaldependencies.org/" target="_blank"
                  >Universal Dependencies</a
                >
                international model. The lexicon is based on
                <a
                  href="http://www.nilc.icmc.usp.br/nilc/projects/unitex-pb/web/index.html"
                  target="_blank"
                  >Unitex-PB</a
                >
                and is part of the
                <a
                  href="https://sites.google.com/icmc.usp.br/poetisa"
                  target="_blank"
                  >POeTiSA</a
                >
                project. The interested user may find more information in the
                <a
                  href="http://www.lrec-conf.org/proceedings/lrec2022/pdf/2022.lrec-1.715.pdf"
                  target="_blank"
                  >paper of Lopes et al. (2022)</a
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <span id="numberOfResults" v-if="madeSearch && numberOfResults !== 0"
        >{{ numberOfResults }} results were found</span
      >
      <br />
      <div v-if="madeSearch && numberOfResults === 0">
        <div class="not-found">
          <b>Your search did not find any result!</b>
        </div>

        <div class="instructions">
          PortiLexicon-UD is still under construction, so this word might be
          added to the lexicon in a future version. Please, suggest it in our
          <a href="https://forms.gle/qYC9pgwcgi7C1YQR9" target="_blank"
            >word suggestion box</a
          >.
        </div>
        <img class="art" src="./assets/void.svg" />
      </div>
      <div v-for="result in searchResults" :key="result._id">
        <div v-for="info in result.lexicalInfo" :key="info._id">
          <ResultCard class="result" :result="result" :info="info"></ResultCard>
        </div>
      </div>
    </div>
    <AdditionalInfo></AdditionalInfo>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
import AdditionalInfo from "./components/AdditionalInfo.vue";
import TheFooter from "./components/TheFooter.vue";
import ResultCard from "./components/ResultCard.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  components: {
    InputText,
    Button,
    ResultCard,
    TheNavbar,
    TheFooter,
    AdditionalInfo,
  },

  computed: {
    numberOfResults() {
      let numRes = 0;
      for (let result of this.searchResults) {
        numRes += result.lexicalInfo.length;
      }

      return numRes;
    },
  },

  data() {
    return {
      // stores the search term
      searchTerm: "",

      // stores the results of a search
      searchResults: [],

      // tells whether the user did the search or not
      madeSearch: false,

      // tells whether the app is loading or not
      isLoading: false,
    };
  },

  methods: {
    // makes a search in the lexicon
    async makeSearch() {
      // get url and request's body
      const searchUrl = process.env.VUE_APP_URL + "api/search";
      const reqBody = JSON.stringify({
        searchTerm: this.searchTerm,
      });

      // makes the request
      this.isLoading = true;
      const res = await fetch(searchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: reqBody,
      });

      const searchResults = await res.json();
      if (res.status === 200) {
        // request was successful
        // parses results to javascript object
        this.searchResults = searchResults;
        this.madeSearch = true;
      } else {
        // request failed
        // shows message
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: searchResults.message,
          life: 4000,
        });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

html,
body {
  font-family: "Roboto", sans-serif;
  min-height: 100%;
  min-width: 100%;
  margin: 0;
  background-color: #fff;
}

#numberOfResults {
  display: block;
  margin-top: 50px;
  margin-bottom: 10px;
  color: #495057;
  font-size: 14px;
}

.centered {
  font-family: "Roboto", sans-serif;
  width: max-content;
  margin: 110px auto 100px auto;
}

.result {
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: #e4e5e8;
  padding-top: 20px;
  padding-bottom: 20px;
}

.input-wrapper {
  margin-right: 10px;
}

.search-input {
  width: 610px;
}

.art {
  display: block;
  height: 200px;
  margin: 60px auto 60px auto;
}

.art-initial {
  height: 140px;
}

.not-found {
  text-align: center;
  color: #495057;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 20px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.instructions {
  text-align: center;
  color: #495057;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 18px;
  width: 650px;
  margin-left: auto;
  margin-right: auto;
  line-height: 35px;
}

.instructions-initial {
  text-align: justify;
  color: #495057;
  font-size: 18px;
  width: 650px;
  line-height: 35px;
  margin-left: 40px;
}

.search-set {
  width: fit-content;
  margin: 200px auto 0 auto;
}

.instructions-panel {
  margin-top: 140px;
}

@media (max-width: 300px) {
  .responsive-td {
    display: block;
    text-align: center;
  }

  .art {
    height: 120px;
  }

  .art-initial {
    margin-bottom: 50px;
  }

  .search-input {
    width: 120px;
  }

  .centered {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
    margin-top: 90px;
  }

  .instructions {
    margin-left: auto;
    margin-right: auto;
    width: 80px;
  }

  .instructions-initial {
    width: 200px;
  }

  .result {
    width: 50px;
  }
}

@media (min-width: 300px) and (max-width: 400px) {
  .responsive-td {
    display: block;
    text-align: center;
  }

  .art {
    height: 150px;
  }

  .art-initial {
    margin-bottom: 50px;
  }

  .search-input {
    width: 180px;
  }

  .centered {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
    margin-top: 90px;
  }

  .instructions {
    margin-left: auto;
    margin-right: auto;
    width: 300px;
  }

  .instructions-initial {
    width: 250px;
  }

  .result {
    width: 150px;
  }
}

@media (min-width: 400px) and (max-width: 500px) {
  .responsive-td {
    display: block;
    text-align: center;
  }

  .search-input {
    width: 200px;
  }

  .art {
    height: 150px;
  }

  .art-initial {
    margin-bottom: 50px;
  }

  .centered {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
    margin-top: 90px;
  }

  .instructions {
    margin-left: auto;
    margin-right: auto;
    width: 200px;
  }

  .instructions-initial {
    width: 300px;
  }

  .result {
    width: 200px;
  }
}

@media (min-width: 500px) and (max-width: 800px) {
  .responsive-td {
    display: block;
    text-align: center;
  }

  .search-input {
    width: 250px;
  }

  .art {
    height: 150px;
  }

  .art-initial {
    margin-bottom: 50px;
  }

  .centered {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
    margin-top: 90px;
  }

  .instructions {
    margin-left: auto;
    margin-right: auto;
    width: 300px;
  }

  .result {
    width: 250px;
  }
}
</style>
