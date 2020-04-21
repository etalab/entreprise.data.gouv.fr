<template>
  <div>
    <h4>Identification de la Personne Morale</h4>

    <div class="company__item">
      <div class="company__item-key">Dénomination</div>
      <div class="company__item-value">
        {{ personneMorale.denomination }}
      </div>
    </div>

    <div class="company__item">
      <div class="company__item-key">SIREN</div>
      <div class="company__item-value">
        {{ personneMorale.siren | prettySiren }}
      </div>
    </div>

    <div class="company__item">
      <div class="company__item-key">Forme Juridique</div>
      <div class="company__item-value">
        {{ personneMorale.forme_juridique }}
      </div>
    </div>

    <div v-if="personneMorale.associe_unique" class="company__item">
      <div class="company__item-key">Associé unique</div>
      <div class="company__item-value">
        {{ personneMorale.associe_unique }}
      </div>
    </div>

    <div v-if="personneMorale.activite_principale" class="company__item">
      <div class="company__item-key">Activité principale</div>
      <div class="company__item-value">
        {{ personneMorale.activite_principale }}
      </div>
    </div>

    <div class="company__item">
      <div class="company__item-key">Adresse du siège</div>
      <div v-if="siege.adresse_ligne_1" class="company__item-value">
        {{ siege.adresse_ligne_1 | placeHolderIfEmpty }}
      </div>
      <div v-if="siege.adresse_ligne_2" class="company__item-value">
        {{ siege.adresse_ligne_2 | placeHolderIfEmpty }}
      </div>
      <div v-if="siege.adresse_ligne_3" class="company__item-value">
        {{ siege.adresse_ligne_3 | placeHolderIfEmpty }}
      </div>
      <div>
        {{ formatSiegeAddressZone | placeHolderIfEmpty }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatAddressZone } from "@/helpers";

export default {
  name: "PersonneMoraleIdentity",

  computed: {
    ...mapGetters({
      personneMorale: "rncs/getPersonneMorale",
      siege: "rncs/getSiege"
    }),

    formatSiegeAddressZone: function() {
      return formatAddressZone(
        this.siege.adresse_code_postal,
        this.siege.adresse_ville,
        this.siege.adresse_pays
      );
    }
  }
}
</script>
