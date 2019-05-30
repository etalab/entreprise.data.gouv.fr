<template>
  <div>
    <template v-for="(key, name) in elements">
      <div
        :key="key"
        v-if="parent[key]"
        :class="[inlineLabels ? 'company__item-inline' : 'company__item']"
      >
        <div class="company__item-key">{{ name }}</div>
        <div class="company__item-value">
          {{ parent[key] | formatIfDate | prettySirenIfSiren }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "PanelInfo",
  props: ["parent", "elements", "inlineLabels"],
  mixins: [Filters]
};
</script>
