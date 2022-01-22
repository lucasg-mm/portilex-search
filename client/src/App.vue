<template>
  <div>
    <h1>Portilex</h1>
    <input v-model="searchTerm" type="text" />
    <button @click="makeSearch">Pesquisar</button>
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
export default {
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

<style></style>
