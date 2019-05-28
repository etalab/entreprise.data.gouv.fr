<template>
  <div v-if="this.companyValue" class="company__item">
    <div class="company__item-key">{{ this.companyKey }}</div>
    <div class="company__item-value">{{ this.companyValue }}</div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "LineInPanel",
  props: ["companyKey", "companyValue"],
  mixins: [Filters]
};
</script>
