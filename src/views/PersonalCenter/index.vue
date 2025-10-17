<template>
  <div class="personal-center-page">
    <LoadMoreListDemo />
  </div>
</template>

<script lang="ts" setup>
import LoadMoreListDemo from './LodMorelistDemo/index.vue';
</script>

<style scoped lang="less">
.personal-center-page {
  padding: var(--page-normal-padding);
  height: 100%;
  overflow: auto;
}
</style>
