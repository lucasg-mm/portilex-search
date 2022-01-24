<template>
  <div>
    <h1>Portilexicon</h1>
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        type="text"
        v-model="searchTerm"
        placeholder="Search for a word"
      />
    </span>
    <Button @click="makeSearch" label="Search" />
    <div v-for="result in searchResults" :key="result._id">
      <div v-for="info in result.lexicalInfo" :key="info._id">
        <h2>{{ result.word }}</h2>
        <b>Part-of-speech tag: </b> {{ info.posTag }}
        <br />
        <b>Lemma: </b> {{ info.lemma }}
        <br />
        <b>Features:</b> {{ info.feats }}
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  components: { InputText, Button },

  data() {
    return {
      // stores the search term
      searchTerm: "",

      // stores the results of a search
      searchResults: [],
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
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

body {
  font-family: "Roboto", sans-serif;
}
</style>
