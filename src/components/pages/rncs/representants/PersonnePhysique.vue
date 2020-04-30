<template>
  <div>
    <h5>{{ representant.qualite | placeHolderIfEmpty | capitalize }}</h5>

    <div class="company__item-inline">
      <div class="company__item-key">Nom</div>
      <div class="company__item-value">
        {{ representantTitle }}
      </div>
    </div>

    <div v-if="representant.nom_usage" class="company__item-inline">
      <div class="company__item-key">Nom d’usage</div>
      <div class="company__item-value">{{ representant.nom_usage | upperCase }}</div>
    </div>

    <div v-if="representant.pseudonyme" class="company__item-inline">
      <div class="company__item-key">Pseudonyme</div>
      <div class="company__item-value">{{ representant.pseudonyme }}</div>
    </div>

    <div v-if="representant.date_naissance" class="company__item-inline">
      <div class="company__item-key">Date de naissance</div>
      <div class="company__item-value">
        {{ representant.date_naissance | frenchDateFormat  }}
      </div>
    </div>

    <div v-if="representant.ville_naissance" class="company__item-inline">
      <div class="company__item-key">Ville de naissance</div>
      <div class="company__item-value">{{ representant.ville_naissance }}</div>
    </div>

    <div v-if="representant.pays_naissance" class="company__item-inline">
      <div class="company__item-key">Pays de naissance</div>
      <div class="company__item-value">{{ representant.pays_naissance }}</div>
    </div>

    <div v-if="representant.nationalite" class="company__item-inline">
      <div class="company__item-key">Nationalité</div>
      <div class="company__item-value">{{ representant.nationalite }}</div>
    </div>

    <div class="company__item-inline">
      <div class="company__item-key">Adresse</div>
      <div class="company__item-value">
        <div>{{ representant.adresse_ligne_1 | placeHolderIfEmpty }}</div>
        <div v-if="representant.adresse_ligne_2">{{ representant.adresse_ligne_2 }}</div>
        <div v-if="representant.adresse_ligne_3">{{ representant.adresse_ligne_3 }}</div>
        <div>{{ formatAddressZone }}</div>
      </div>
    </div>

    <div v-if="representant.conjoint_collab_nom_usage" class="company__item-inline">
      <div class="company__item-key">Conjoint collaborateur, Nom d'usage</div>
      <div class="company__item-value">{{ representant.conjoint_collab_nom_usage }}</div>
    </div>

    <div v-if="representant.conjoint_collab_date_fin" class="company__item-inline">
      <div class="company__item-key">Conjoint collaborateur, Date de fin</div>
      <div class="company__item-value">{{ representant.conjoint_collab_date_fin }}</div>
    </div>

    <div v-if="representant.conjoint_collab_nom_patronyme" class="company__item-inline">
      <div class="company__item-key">Conjoint collaborateur, Nom</div>
      <div class="company__item-value">{{ representant.conjoint_collab_nom_patronyme }}</div>
    </div>

    <div v-if="representant.conjoint_collab_pseudonyme" class="company__item-inline">
      <div class="company__item-key">Conjoint collaborateur, Pseudonyme</div>
      <div class="company__item-value">{{ representant.conjoint_collab_pseudonyme }}</div>
    </div>

    <div v-if="representant.conjoint_collab_prénoms" class="company__item-inline">
      <div class="company__item-key">Conjoint collaborateur, Prénoms</div>
      <div class="company__item-value">{{ representant.conjoint_collab_prenoms }}</div>
    </div>
  </div>
</template>

<script>
import { concatNames, formatAddressZone } from "@/helpers";

export default {
  name: "RepresentantPersonnePhysique",

  props: {
    representant: { type: Object }
  },

  computed: {
    representantTitle: function() {
      return concatNames(this.representant.prenoms, this.representant.nom_patronyme);
    },

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
