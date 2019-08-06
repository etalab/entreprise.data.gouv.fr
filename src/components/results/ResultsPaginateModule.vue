<template>
  <paginate
    ref="paginate"
    :container-class="'pagination'"
    :page-class="'pagesButtons'"
    :prev-class="'pagesButtons'"
    :next-class="'pagesButtons'"
    :page-count="totalPageNumber()"
    :initial-page="initialPage"
    :prev-text="'Precédent'"
    :next-text="'Suivant'"
    :click-handler="selectPage"
  >
  </paginate>
</template>

<script>
import Paginate from "vuejs-paginate";
import Vue from "vue";

Vue.component("paginate", Paginate);

export default {
  name: "Results",
  props: { totalPages: { type: String, default: "0" } },
  data: function() {
    return {
      initialPage: parseInt(this.$store.state.route.query.page, 10) - 1
    };
  },
  methods: {
    selectPage(pageNum) {
      if (this.$store.state.route.query.fullText) {
        this.$store.commit("setPage", pageNum);
        this.$store.dispatch("requestSearchFullText");
      } else {
        this.$store.dispatch("goToClearedHomePage");
      }
    },
    // totalPageNumber needs to be a method cause based on non-reactive dependencies
    totalPageNumber() {
      return this.totalPages;
    }
  }
};
</script>

<style lang="scss">
.pagination {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}

.pagesButtons {
  background: $color-lighter-blue;
  border-radius: 3px;
  padding: 2px 5px;
  margin-left: 8px;

  &.disabled,
  &:first-child,
  &:last-child {
    background: none;
  }

  &.disabled a {
    color: $color-dark-grey;
    cursor: auto;
  }

  &.active {
    background-color: $color-blue;

    a {
      color: $color-white;
    }
  }
}

.pagesButtons a {
  color: $link-color;
  font-weight: 700;
  text-decoration: none;
}
</style>
