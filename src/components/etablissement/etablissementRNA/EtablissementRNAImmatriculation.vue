<template>
  <div class="company__panel panel">
    <h4>Immatriculation Association</h4>
    <div class="company__item">
      <div class="company__item-key">Adresse du siège :</div>
      <div class="company__item-value">
        {{ resultRNA.adresse_siege | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Adresse établissement :</div>
      <div class="company__item-value">
        {{ l1_adress | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Commune établissement :</div>
      <div class="company__item-value">
        {{ l2_adress | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <line-in-panel
      :company-key="code_gestion"
      :company-value="resultRNA.code_gestion"
    />
    <line-in-panel
      :company-key="date_creation"
      :company-value="resultRNA.date_creation"
    />
    <line-in-panel
      :company-key="date_publication_creation"
      :company-value="resultRNA.date_publication_creation"
    />
    <line-in-panel
      :company-key="date_declaration_dissolution"
      :company-value="resultRNA.date_declaration_dissolution"
    />
    <line-in-panel
      :company-key="numero_reconnaissance_utilite_publique"
      :company-value="resultRNA.numero_reconnaissance_utilite_publique"
    />
    <line-in-panel
      :company-key="site_web"
      :company-value="resultRNA.site_web"
    />
    <line-in-panel :company-key="email" :company-value="resultRNA.email" />
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import LineInPanel from "@/components/etablissement/templates/LineInPanel";

export default {
  name: "EtablissementRNAImmatriculation",
  components: { LineInPanel: LineInPanel },
  mixins: [Filters],
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
      return null;
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
      return null;
    }
  }
};
</script>
