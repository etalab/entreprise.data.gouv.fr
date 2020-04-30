<template>
  <section class="section">
    <div class="container">
      <div class="company">
        <div class="company__main">
          <div class="title__block">
            <h2>
              {{ association.titre }}
              <span class="association__id">({{ association.id_association }})</span>
            </h2>

            <div class="second__subtitle">
              {{ association.titre_court }}
            </div>

            <div class="timestamps">
              <p>
                Dernière mise à jour RNA : {{ association.updated_at | frenchDateFormat }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="company">
        <div class="company-container padding_top">
          <div class="company__panel panel">
            <h4>Immatriculation Association</h4>

            <div class="company__item">
              <div class="company__item-key">Adresse du siège :</div>
              <div class="company__item-value">
                {{ association.adresse_siege | placeHolderIfEmpty }}
              </div>
            </div>

            <div class="company__item">
              <div class="company__item-key">Adresse établissement :</div>
              <div class="company__item-value">
                {{ assoAddress | placeHolderIfEmpty }}
              </div>
            </div>

            <div class="company__item">
              <div class="company__item-key">Commune établissement :</div>
              <div class="company__item-value">
                {{ assoCommune | placeHolderIfEmpty }}
              </div>
            </div>

            <div v-if="association.code_gestion" class="company__item">
              <div class="company__item-key">Code de gestion :</div>
              <div class="company__item-value">{{ association.code_gestion }}</div>
            </div>

            <div v-if="association.date_creation" class="company__item">
              <div class="company__item-key">Date de création :</div>
              <div class="company__item-value">{{ association.date_creation }}</div>
            </div>

            <div v-if="association.date_publication_creation" class="company__item">
              <div class="company__item-key">Date de publication au Journal Officiel :</div>
              <div class="company__item-value">{{ association.date_publication_creation }}</div>
            </div>

            <div v-if="association.date_declaration_dissolution" class="company__item">
              <div class="company__item-key">Date de publication de dissolution :</div>
              <div class="company__item-value">{{ association.date_declaration_dissolution }}</div>
            </div>

            <div v-if="association.numero_reconnaissance_utilite_publique" class="company__item">
              <div class="company__item-key">Numéro de reconnaissance d'utilité publique :</div>
              <div class="company__item-value">{{ association.numero_reconnaissance_utilite_publique }}</div>
            </div>

            <div v-if="association.site_web" class="company__item">
              <div class="company__item-key">Site Web :</div>
              <div class="company__item-value">{{ association.site_web }}</div>
            </div>

            <div v-if="association.date_publication_creation" class="company__item">
              <div class="company__item-key">Email :</div>
              <div class="company__item-value">{{ association.email }}</div>
            </div>
          </div>

          <div class="company__panel panel">
            <div class="name__category">
              <h4>Informations Générales Association</h4>
            </div>
            <div class="company__info-list">
              <div class="company__item">
                <div class="company__item-key">Numéro RNA :</div>
                <div class="company__item-value">{{ association.id_association }}</div>
              </div>

              <div v-if="association.id_ex_association" class="company__item">
                <div class="company__item-key">Ancien numéro RNA :</div>
                <div class="company__item-value">{{ association.id_ex_association }}</div>
              </div>

              <div class="company__item">
                <div class="company__item-key">Objet :</div>
                <div class="company__item-value">
                  {{ association.objet | placeHolderIfEmpty }}
                </div>
              </div>

              <div v-if="association.objet_social1" class="company__item">
                <div class="company__item-key">Code Objet Social :</div>
                <div class="company__item-value">{{ association.objet_social1 }}</div>
              </div>

              <div v-if="association.siret" class="company__item">
                <div class="company__item-key">Siret :</div>
                <div class="company__item-value">{{ association.siret }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RNAEtablissement",

  metaInfo() {
    return {
      title: `${this.association.titre} - Données du RNA`
    }
  },

  props: { assoId: String },

  data() {
    return {
      dataLoaded: false
    }
  },

  watch: {
    assoId: function() { this.fetchRnaData() }
  },

  created() {
    this.fetchRnaData();
  },

  computed: {
    ...mapGetters({
      association: "rna/getAssociation"
    }),

    assoAddress: function() {
      if (
        this.association.adresse_numero_voie &&
        this.association.adresse_type_voie &&
        this.association.adresse_libelle_voie
      ) {
        return `${this.association.adresse_numero_voie} ${this.association.adresse_type_voie.toLowerCase()} ${this.association.adresse_libelle_voie}`;
      }
      else return null;
    },

    assoCommune: function() {
      if (
        this.association.adresse_code_postal &&
        this.association.adresse_libelle_commune
      ) {
        return `${this.association.adresse_code_postal} ${this.association.adresse_libelle_commune}`;
      }
      else return null;
    }
  },

  methods: {
    fetchRnaData: function() {
      this.dataLoaded = false;
      this.$store.dispatch("rna/fetchData", this.assoId)
        .then(() => this.dataLoaded = true)
    }
  },
}
</script>

<style lang="scss" scoped>
.company__main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: $desktop) {
  .company__main {
    flex-direction: column;
  }
}

.company__buttons {
  margin-top: 1.5em;

  .button {
    padding: 0.5em 1em 0.6em;
    vertical-align: middle;
    margin-left: 0;
  }
}

h2 {
  margin: 0;
}

.subtitle {
  font-size: 1.25em;
}

.second__subtitle {
  margin-top: 0.5em;
}

.company__siren,
.second__subtitle {
  color: $color-darker-grey;
}

.map__dummy {
  height: 350px;
  width: 48%;
  background-color: #f2eae2;
}

.link__external {
  margin-top: 10px;
  display: inline-block;
}

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

.panel + .panel {
  margin-left: 2em;
}

@media (max-width: $tablet) {
  .panel + .panel {
    margin-left: 0;
  }
}
</style>
