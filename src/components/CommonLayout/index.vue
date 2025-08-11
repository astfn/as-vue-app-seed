<template>
  <van-nav-bar
    v-show="LayoutInfoStore.isShowNav"
    ref="NavStickyRef"
    :title="title"
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
      <keep-alive>
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
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const LayoutInfoStore = useLayoutInfoStore();
const { normalPageHeightCssValue } = storeToRefs(LayoutInfoStore);

const [Route, Router] = [useRoute(), useRouter()];

const title = computed(() => (Route?.meta?.title as string) ?? '');

/**
 * 布局信息的收集
 */
const { NavStickyRef, TabBarRef } = useCollectLayOutInfoNormalLogic();

watch(title, (newTitle: string) => {
  document.title = newTitle;
});
</script>

<style scoped lang="less">
.layout-content {
  height: v-bind(normalPageHeightCssValue);
  overflow: hidden;
}
</style>
