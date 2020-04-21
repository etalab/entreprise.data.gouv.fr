<template>
  <div>
    <h5>{{ representant.qualite | placeHolderIfEmpty | capitalize }}</h5>

    <div class="company__item-inline">
      <div class="company__item-key">Dénomination</div>
      <div class="company__item-value">{{ representant.denomination }}</div>
    </div>

    <div class="company__item-inline">
      <div class="company__item-key">Forme juridique</div>
      <div class="company__item-value">{{ representant.forme_juridique }}</div>
    </div>

    <div v-if="representant.siren_pm" class="company__item-inline">
      <div class="company__item-key">SIREN</div>
      <div class="company__item-value">
        <router-link
          :to="{
            name: 'sirene-etablissement',
            params: { sirenOrSiret: representant.siren_pm }
          }"
        >
          {{ representant.siren_pm | prettySiren }}
        </router-link>
      </div>
    </div>

    <div class="company__item-inline">
      <div class="company__item-key">Adresse</div>
      <div class="company__item-value">
        <div v-if="representant.adresse_ligne_1">
          {{ representant.adresse_ligne_1 | placeHolderIfEmpty }}
        </div>
        <div v-if="representant.adresse_ligne_2">{{ representant.adresse_ligne_2 }}</div>
        <div v-if="representant.adresse_ligne_3">{{ representant.adresse_ligne_3 }}</div>
        <div>{{ formatAddressZone }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatAddressZone } from "@/helpers";

export default {
  name: "RepresentantPersonneMorale",

  props: {
    representant: { type: Object }
  },

  computed: {
    formatAddressZone: function() {
      return formatAddressZone(
        this.representant.adresse_code_postal,
        this.representant.adresse_ville,
        this.representant.adresse_pays,
        { shortened: true }
      );
    }
  }
};
</script>
