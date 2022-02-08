<template>
  <div>
    <TheNavbar :isLoading="isLoading"></TheNavbar>
    <div class="centered">
      <span class="p-input-icon-left input-wrapper">
        <i class="pi pi-search" />
        <InputText
          class="search-input"
          type="text"
          v-model="searchTerm"
          placeholder="Search for a word"
        />
      </span>
      <Button @click="makeSearch" label="Search Word" />
      <span id="numberOfResults" v-if="madeSearch && numberOfResults !== 0"
        >{{ numberOfResults }} results were found</span
      >
      <br />
      <div v-if="!madeSearch" class="instructions-panel">
        <div class="instructions">
          Use the field above to search for a word in the lexicon.
        </div>
        <img class="art" src="./assets/search.svg" />
      </div>
      <div
        v-if="madeSearch && numberOfResults === 0"
        class="instructions-panel"
      >
        <div class="not-found">
          <b>Your search did not find any result!</b>
        </div>

        <div class="instructions">
          PortiLexicon-UD under construction, so this word might still be added
          to the lexicon in a future version.
        </div>
        <img class="art" src="./assets/void.svg" />
      </div>
      <div v-for="result in searchResults" :key="result._id">
        <div v-for="info in result.lexicalInfo" :key="info._id">
          <ResultCard class="result" :result="result" :info="info"></ResultCard>
        </div>
      </div>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
import TheFooter from "./components/TheFooter.vue";
import ResultCard from "./components/ResultCard.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  components: { InputText, Button, ResultCard, TheNavbar, TheFooter },

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

<style>
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
  margin-top: 25px;
  margin-bottom: 10px;
  color: #495057;
  font-size: 14px;
}

.centered {
  width: max-content;
  margin-top: 90px;
  margin-left: 100px;
  margin-bottom: 100px;
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
  width: 500px;
}

.art {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 350px;
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
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  line-height: 30px;
}

@media (max-width: 300px) {
  .art {
    height: 120px;
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

  .result {
    width: 50px;
  }
}

@media (min-width: 300px) and (max-width: 400px) {
  .art {
    height: 150px;
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
    width: 200px;
  }

  .result {
    width: 150px;
  }
}

@media (min-width: 400px) and (max-width: 500px) {
  .search-input {
    width: 200px;
  }

  .art {
    height: 250px;
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

  .result {
    width: 200px;
  }
}

@media (min-width: 500px) and (max-width: 800px) {
  .search-input {
    width: 250px;
  }

  .art {
    height: 250px;
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
