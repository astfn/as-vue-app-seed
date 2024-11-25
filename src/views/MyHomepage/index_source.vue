<template>
  <div class="my-home-page-wrapper">
    <p>start</p>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <h1>我的</h1>
    <p>end</p>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutInfoStore } from '@/store/layout-info';
import { storeToRefs } from 'pinia';

const LayoutInfoStore = useLayoutInfoStore();
const { normalPageHeightCssValue } = storeToRefs(LayoutInfoStore);
// const a;
</script>

<style scoped lang="less">
.my-home-page-wrapper {
  height: v-bind(normalPageHeightCssValue);
  overflow: hidden auto;
  background-color: #41b883;
}
</style>
