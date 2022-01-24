<template>
  <div>
    <h2 class="blue">{{ result.word }}</h2>
    <b class="blue">Part-of-speech tag: </b> {{ info.posTag }}
    <br />
    <b class="blue">Lemma: </b> {{ info.lemma }}
    <br />
    <b class="blue">Features:</b> {{ info.feats }}
  </div>
</template>

<script>
export default {
  props: ["result", "info"],
};
</script>

<style>
.blue {
  color: #2196f3;
}
</style>
