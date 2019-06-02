<template>
  <div class="timestamps">
    <p v-if="resultSirene">
      <!-- eslint-disable-next-line prettier/prettier -->
      Dernière mise à jour SIRENE : {{ resultSirene.updated_at | frenchDateFormat }}
    </p>
    <p v-if="resultRNA">
      Dernière mise à jour RNA : {{ resultRNA.updated_at | frenchDateFormat }}
    </p>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "EtablissementHeaderTimestamp",
  props: ["resultSirene", "resultRNA"],
  mixins: [Filters]
};
</script>

<style lang="scss" scoped>
.timestamps {
  color: grey;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.timestamps > p {
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>
