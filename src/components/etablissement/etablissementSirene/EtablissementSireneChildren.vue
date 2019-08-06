<template>
  <div class="company__panel">
    <p v-if="isSiegeSocial" class="company__item">
      Cet établissement est le siège social.
    </p>
    <p v-else class="company__item">
      Le siège social de cet établissement est&nbsp;:
      <router-link
        class="company__item-link"
        :to="{
          name: 'Etablissement',
          params: { searchId: resultSiegeSocial.siret }
        }"
      >
        {{ resultSiegeSocial.nom_raison_sociale | removeExtraChars }} (<span
          :inner-html.prop="resultSiegeSocial.siret | prettySiretHtml"
        />)
      </router-link>
    </p>
    <div v-if="haveChildrenEtablissements" class="company__item">
      <div class="company__children-summary">
        Cette entreprise possède {{ totalResultsOtherSirens }}
        {{ `établissement` | pluralizeDependingOn(totalResultsOtherSirens)
        }}<template v-if="thereAreMoreThanMaxChildren">
          ({{ maxChildrenEtablissements }}
          {{
            `affiché` | pluralizeDependingOn(maxChildrenEtablissements)
          }})</template
        >
        :
        <template v-if="thereAreMoreThanMaxChildren">
          <div
            v-show="!visibleChildren"
            class="company__item-link"
            @click="showAllChildren"
          >
            Afficher la totalité
          </div>
          <div
            v-show="visibleChildren"
            class="company__item-link"
            @click="hideAllChildren"
          >
            Réduire
          </div>
        </template>
      </div>
      <ul class="company__children">
        <li
          v-for="siret in resultOtherSirens"
          :key="siret"
          class="company__item-link"
        >
          <router-link
            :to="{ name: 'Etablissement', params: { searchId: siret } }"
          >
            {{ siret | prettySiret }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Constants from "@/constants.js";
import Filters from "@/components/mixins/filters";

export default {
  name: "EtablissementSireneChildren",
  mixins: [Filters],
  data() {
    return {
      maxChildrenEtablissementsToShow:
        Constants.ETABLISSEMENT_SHOW_MAX_CHILDREN_SIRETS,
      visibleChildren: false
    };
  },
  computed: {
    resultSirene() {
      return this.$store.getters.singlePageEtablissementSirene;
    },
    resultSiegeSocial() {
      return this.$store.getters.storedSirenSiege || { siret: 0 };
    },
    resultOtherSirens() {
      return this.$store.getters.storedSirenChildren.slice(
        0,
        this.maxChildrenEtablissementsToShow
      );
    },
    haveChildrenEtablissements() {
      return this.totalResultsOtherSirens >= 1;
    },
    totalResultsOtherSirens() {
      // Total result minus Siege Social
      return this.$store.getters.storedSirenTotalResults - 1;
    },
    maxChildrenEtablissements() {
      return Math.min(
        this.totalResultsOtherSirens,
        this.maxChildrenEtablissementsToShow
      );
    },
    isSiegeSocial() {
      if (!this.resultSirene) {
        return;
      }
      if (this.resultSirene.is_siege == "1") {
        return true;
      }
      return false;
    },
    thereAreMoreThanMaxChildren() {
      return (
        this.totalResultsOtherSirens >= this.maxChildrenEtablissementsToShow
      );
    }
  },
  methods: {
    showAllChildren() {
      this.maxChildrenEtablissementsToShow = this.totalResultsOtherSirens;
      this.visibleChildren = true;
    },
    hideAllChildren() {
      this.maxChildrenEtablissementsToShow =
        Constants.ETABLISSEMENT_SHOW_MAX_CHILDREN_SIRETS;
      this.visibleChildren = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.company__panel {
  margin-top: 1.5em;
}

.company__item {
  margin-bottom: 1em;
}

.company__children-summary {
  margin-bottom: 0.5em;
}

.company__children {
  margin: 0;
  padding: 0;
}

.company__children li {
  display: inline-block;
  margin-right: 0.5em;
}
</style>
