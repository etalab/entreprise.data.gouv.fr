<template>
  <div class="apidoc__input">
    <input v-model="apiUrl" @keyup.enter="activateButton" />
    <a ref="goToButton" class="button" :href="apiUrl" target="_blank">GET</a>
  </div>
</template>

<script>
export default {
  name: "ApiUrlInput",

  props: {
    defaultUrl: { type: String, default: "https://entreprise.data.gouv.fr/" }
  },

  data() {
    return {
      apiUrl: this.defaultUrl
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
