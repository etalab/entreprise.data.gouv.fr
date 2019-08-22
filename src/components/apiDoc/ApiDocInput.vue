<template>
  <div class="apidoc__input">
    <input v-model="requestToDisplay" @keyup.enter="activateButton" />
    <a ref="goToButton" class="button" :href="requestToDisplay">GET</a>
  </div>
</template>

<script>
export default {
  name: "ApiDocInput",
  props: {
    request: { type: String, default: "https://entreprise.data.gouv.fr/" }
  },
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
