<template>
  <div v-if="companyValue" class="company__item">
    <div class="company__item-key">{{ companyKey }}</div>
    <div class="company__item-value">{{ companyValue }}</div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "LineInPanel",
  mixins: [Filters],
  props: {
    companyKey: { type: String, default: "" },
    companyValue: { type: String, default: "" }
  }
};
</script>
