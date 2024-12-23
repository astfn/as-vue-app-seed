<template>
  <div class="custom-tabbar-page-wrapper">
    <p>start</p>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <h1>custom-tabbar-page</h1>
    <p>end</p>
  </div>

  <CustomTabbar ref="TabBarRef">
    <van-button type="primary" block>立即购买</van-button>
  </CustomTabbar>
</template>

<script lang="ts" setup>
import { useLayoutInfoStore } from '@/store/layout-info';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useElementSize } from '@vueuse/core';

const LayoutInfoStore = useLayoutInfoStore();
const { navHeight } = storeToRefs(LayoutInfoStore);

const TabBarRef = ref();
const { height: tabBarHeight } = useElementSize(TabBarRef);
const PageHeightCssValue = computed(() => `calc(100vh - ${navHeight.value + tabBarHeight.value}px)`);
</script>

<style scoped lang="less">
.custom-tabbar-page-wrapper {
  padding: var(--page-normal-padding);
  height: v-bind(PageHeightCssValue);
  overflow: hidden auto;
  background-color: pink;
}
</style>
