<template>
  <div>
    <div v-for="(key, name) in elements" :key="key">
      <div v-if="parent[key]">
        <div class="company__item-key">{{ name }} :</div>
        <div class="company__item-value">{{ parent[key] | formatIfDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "PanelInfoInline",
  props: ["parent", "elements"],
  mixins: [Filters]
};
</script>

<style lang="scss" scoped>
.company__item-key {
  display: inline;
  margin: 0;
}
.company__item-value {
  display: inline;
}
</style>
