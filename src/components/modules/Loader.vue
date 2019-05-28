<template>
  <div class="loader">
    <img :src="require('@/assets/img/loading_block.svg')" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  min-height: $height-empty;
}
</style>
