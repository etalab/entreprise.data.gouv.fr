<template>
  <div class="company__panel panel">
    <h4>Informations d’immatriculation et d’activité</h4>

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
    <template v-for="(value, label) in registrationDetails">
      <template v-if="value && value !== ''">
        <div :key="label" class="company__item">
          <div class="company__item-key">{{ label }}</div>
          <div class="company__item-value">
            {{ value }}
          </div>
        </div>
      </template>
    </template>

    <!-- Hard to do as above because of address format... -->
    <template v-if="DAPDetails">
      <div class="company__item">
        <div class="company__item-key">
          Déclaration d’attribution de Patrimoine :
        </div>
        <div class="company__item-value">Oui</div>
      </div>
      <div class="company__item">
        <div class="company__item-key">
          Déclaration d’attribution de Patrimoine, Adresse :
        </div>
        <div class="company__item-value">
          <div v-if="DAPDetails.dap_adresse_ligne_1">
            {{ DAPDetails.dap_adresse_ligne_1 }}
          </div>
          <div v-if="DAPDetails.dap_adresse_ligne_2">
            {{ DAPDetails.dap_adresse_ligne_2 }}
          </div>
          <div v-if="DAPDetails.dap_adresse_ligne_3">
            {{ DAPDetails.dap_adresse_ligne_3 }}
          </div>
          <div>{{ DAPDetails.dap_address_zone }}</div>
          <div v-if="DAPDetails.dap_adresse_code_commune">
            Code Commune {{ DAPDetails.dap_adresse_code_commune }}
          </div>
        </div>
      </div>
      <div class="company__item">
        <div class="company__item-key">
          Déclaration d’attribution de patrimoine, Dénomination :
        </div>
        <div class="company__item-value">{{ DAPDetails.denomination }}</div>
      </div>
      <div class="company__item">
        <div class="company__item-key">
          Déclaration d’attribution de patrimoine, Objet :
        </div>
        <div class="company__item-value">{{ DAPDetails.objet }}</div>
      </div>
      <div class="company__item">
        <div class="company__item-key">
          Déclaration d’attribution de patrimoine, Date de fermeture :
        </div>
        <div class="company__item-value">{{ DAPDetails.date_cloture }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RegistrationDetails",

  computed: {
    ...mapGetters({
      registrationDetails: "rncs/getRegistrationDetails",
      DAPDetails: "rncs/getDAPDetails"
    })
  }
};
</script>
