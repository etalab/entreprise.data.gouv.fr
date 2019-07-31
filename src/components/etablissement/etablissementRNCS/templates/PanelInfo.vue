<template>
  <div>
    <template v-for="(key, name) in elements">
      <div
        v-if="parent[key]"
        :key="key"
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
  mixins: [Filters],
  props: {
    parent: {
      type: Object,
      default() {
        return {};
      }
    },
    elements: {
      type: Object,
      default() {
        return {};
      }
    },
    inlineLabels: { type: String, default: "" }
  }
};
</script>
