<template>
  <div class="company__panel">
    <div class="panel">
      <h4 class="loading"></h4>
      <div class="text__medium loading"></div>
      <div class="text__long loading"></div>
      <div class="text__long loading"></div>
    </div>
    <div class="panel">
      <h4 class="loading"></h4>
      <div class="text__medium loading"></div>
      <div class="text__long loading"></div>
      <div class="text__long loading"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSkeleton"
};
</script>

<style lang="scss" scoped>
.company__panel {
  display: flex;
  justify-content: space-between;
}

.panel + .panel {
  margin-left: 2em;
  margin-top: 0;
}

.text__medium {
  margin-top: 2em;
  width: 60%;
}

.text__long {
  width: 80%;
  margin-top: 0.5em;
}
</style>
