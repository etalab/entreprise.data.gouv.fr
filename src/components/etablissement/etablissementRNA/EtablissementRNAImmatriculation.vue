<template>
  <div class="company__panel panel">
    <h4>Immatriculation Association</h4>
    <div class="company__item">
      <div class="company__item-key">Adresse du siège :</div>
      <div class="company__item-value">
        {{ resultRNA.adresse_siege | ifExist }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Adresse établissement :</div>
      <div class="company__item-value">{{ this.l1_adress | ifExist }}</div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Commune établissement :</div>
      <div class="company__item-value">{{ this.l2_adress | ifExist }}</div>
    </div>
    <line-in-panel
      :companyKey="this.code_gestion"
      :companyValue="resultRNA.code_gestion"
    />
    <line-in-panel
      :companyKey="this.date_creation"
      :companyValue="resultRNA.date_creation"
    />
    <line-in-panel
      :companyKey="this.date_publication_creation"
      :companyValue="resultRNA.date_publication_creation"
    />
    <line-in-panel
      :companyKey="this.date_declaration_dissolution"
      :companyValue="resultRNA.date_declaration_dissolution"
    />
    <line-in-panel
      :companyKey="this.numero_reconnaissance_utilite_publique"
      :companyValue="resultRNA.numero_reconnaissance_utilite_publique"
    />
    <line-in-panel
      :companyKey="this.site_web"
      :companyValue="resultRNA.site_web"
    />
    <line-in-panel :companyKey="this.email" :companyValue="resultRNA.email" />
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import LineInPanel from "@/components/etablissement/templates/LineInPanel";

export default {
  name: "EtablissementRNAImmatriculation",
  components: { LineInPanel: LineInPanel },
  data() {
    return {
      code_gestion: "Code de gestion :",
      date_creation: "Date de création :",
      date_publication_creation: "Date de publication au Journal Officiel :",
      date_declaration_dissolution: "Date de publication de dissolution :",
      numero_reconnaissance_utilite_publique:
        "Numéro de reconnaissance d'utilité publique :",
      site_web: "Site Web :",
      email: "Email :"
    };
  },
  computed: {
    resultRNA() {
      return this.$store.getters.singlePageEtablissementRNA;
    },
    l1_adress() {
      if (
        this.resultRNA.adresse_numero_voie &&
        this.resultRNA.adresse_type_voie &&
        this.resultRNA.adresse_libelle_voie
      ) {
        return `${
          this.resultRNA.adresse_numero_voie
        } ${this.resultRNA.adresse_type_voie.toLowerCase()} ${
          this.resultRNA.adresse_libelle_voie
        }`;
      }
    },
    l2_adress() {
      if (
        this.resultRNA.adresse_code_postal &&
        this.resultRNA.adresse_libelle_commune
      ) {
        return `${this.resultRNA.adresse_code_postal} ${
          this.resultRNA.adresse_libelle_commune
        }`;
      }
    }
  },
  mixins: [Filters]
};
</script>
