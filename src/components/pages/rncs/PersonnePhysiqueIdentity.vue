<template>
  <div>
    <h4>Identification de la Personne Physique</h4>

    <!-- TODO XXX This is to save some templating repetition here,
      it's not perfect but kind of a code smell to me. We cannot use
      filter this way and therefore the presentation logic is in the
      store. I think the best way to win on both sides here (presentation
      logic into the view by getting rid of repetition) is something like this :

      <card-element :label="Nom">{{ [prenoms, nom] | concatNames }}</card-element>
      <card-element :label="Nom d'usage">{{ nom | Uppercase }}</card-element>
      ...
      <card-element :label="Date de fermeture">{{ date | formatDate }}</card-element>
    -->
    <template v-for="(value, label) in personnePhysiqueIdentity">
      <template v-if="value && value !== ''">
        <div :key="label" class="company__item">
          <div class="company__item-key">{{ label }}</div>
          <div class="company__item-value">
            {{ value }}
          </div>
        </div>
      </template>
    </template>

    <div class="company__item">
      <div class="company__item-key">Adresse :</div>
      <div class="company__item-value">
        <div v-if="adresse.ligne_1">{{ adresse.ligne_1 }}</div>
        <div v-if="adresse.ligne_2">{{ adresse.ligne_2 }}</div>
        <div v-if="adresse.ligne_3">{{ adresse.ligne_3 }}</div>
        <div>{{ adresse.zone }}</div>
      </div>
    </div>

    <template v-for="(value, label) in conjointCollaborateur">
      <template v-if="value && value !== ''">
        <div :key="label" class="company__item">
          <div class="company__item-key">{{ label }}</div>
          <div class="company__item-value">
            {{ value }}
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PersonnePhysiqueIdentity",

  computed: {
    ...mapGetters({
      personnePhysiqueIdentity: "rncs/getPersonnePhysiqueIdentity",
      adresse: "rncs/getPersonnePhysiqueAddress",
      conjointCollaborateur: "rncs/getConjointCollaborateur"
    })
  }
}
</script>
