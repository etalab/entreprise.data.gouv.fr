<template>
  <paginate
    ref="paginate"
    :value="parseInt($store.getters.pageNumber)"
    :container-class="'pagination'"
    :page-class="'pagesButtons'"
    :prev-class="'pagesButtons'"
    :next-class="'pagesButtons'"
    :page-count="totalPages"
    :prev-text="'Precédent'"
    :next-text="'Suivant'"
    :click-handler="searchPage"
  >
  </paginate>
</template>

<script>
import Paginate from "vuejs-paginate";
import Vue from "vue";

Vue.component("paginate", Paginate);

export default {
  name: "Results",
  props: { totalPages: { type: Number, default: 1 } },
  methods: {
    searchPage(pageNum) {
      this.$store.commit("setPage", pageNum);
      this.$store.dispatch("requestSearchFullText");
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
