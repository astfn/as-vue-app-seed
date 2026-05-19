<template>
  <van-nav-bar
    v-if="LayoutInfoStore.isShowNav"
    ref="NavStickyRef"
    :title="navTitle"
    fixed
    placeholder
    safe-area-inset-top
    left-arrow
  >
    <template #left>
      <div class="flexrcc">
        <van-icon v-if="LayoutInfoStore.isShowNavArrow" name="arrow-left" size="18" @click="Router.back()" />
      </div>
    </template>
  </van-nav-bar>

  <div class="layout-content">
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="/^NoCache_/">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>

  <CommonTabBar v-if="LayoutInfoStore.isShowTabBar" ref="TabBarRef">
    <template #default>
      <slot name="tabBarContent"></slot>
    </template>
  </CommonTabBar>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useLayoutInfoStore } from '@/store/layout-info';
import { useCollectLayOutInfoNormalLogic } from '@/store/layout-info/utils';
import { useCommonDataStore } from '@/store/common-data';
import { useRouter } from 'vue-router';

const [Router] = [useRouter()];

const { navTitle } = storeToRefs(useCommonDataStore());

/**
 * 布局信息的收集
 */
// @ts-expect-error TS6198: 这些 ref 在 template 中使用
const { NavStickyRef, TabBarRef } = useCollectLayOutInfoNormalLogic();
const LayoutInfoStore = useLayoutInfoStore();
const { normalPageHeightCssValue } = storeToRefs(LayoutInfoStore);
</script>

<style scoped lang="less">
.layout-content {
  height: v-bind(normalPageHeightCssValue);
  overflow: hidden;
}
</style>
