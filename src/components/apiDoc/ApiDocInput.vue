<template>
  <div class="apidoc__input">
    <input v-model="requestToDisplay" v-on:keyup.enter="activateButton" />
    <a ref="goToButton" class="button" v-bind:href="requestToDisplay">GET</a>
  </div>
</template>

<script>
export default {
  name: "ApiDocInput",
  props: ["request"],
  data() {
    return {
      requestToDisplay: this.request
    };
  },
  methods: {
    // Pressing enter will activate the click
    activateButton() {
      this.$refs.goToButton.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.apidoc__input {
  display: flex;
  flex-direction: row;
}
</style>
