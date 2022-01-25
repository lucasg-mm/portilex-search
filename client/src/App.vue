<template>
  <div>
    <TheNavbar></TheNavbar>
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
      <Button @click="makeSearch" label="Search" />
      <span id="numberOfResults" v-if="madeSearch"
        >{{ numberOfResults }} results were found</span
      >
      <br />
      <div v-if="!madeSearch" class="instructions-panel">
        <div class="instructions">
          Use the field above to search for a word in the lexicon.
        </div>
        <img class="search-art" src="./assets/search.svg" />
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
      const res = await fetch(searchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: reqBody,
      });

      // parses results to javascript object
      const searchResults = await res.json();

      this.searchResults = searchResults;
      this.madeSearch = true;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

body {
  font-family: "Roboto", sans-serif;
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

.search-art {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 350px;
}

.instructions {
  text-align: center;
  color: #495057;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 20px;
}
</style>
