<template>
  <div class="nav">
    <div class="with-divisor">
      <span class="license-line">
        <img class="cc-logo" src="../assets/by.svg" /> Licensed under CC BY
        4.0</span
      >
      <span
        >v1.0.0 – made with 💙 by
        <a href="https://www.linkedin.com/in/lucasgmm/">Lucas Miranda</a></span
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.license-line {
  display: block;
  margin-bottom: 20px;
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
  padding: 60px 0 60px 0;
  margin: 0px 40px;
  border-top: 1px solid;
  border-color: #e4e5e8;
}
</style>
