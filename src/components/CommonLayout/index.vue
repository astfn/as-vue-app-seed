<template>
  <van-sticky v-show="LayoutInfoStore.isShowNav" ref="NavStickyRef">
    <van-nav-bar :title="title" safe-area-inset-top left-arrow>
      <template #left>
        <div class="flexrcc">
          <van-icon name="arrow-left" size="18" @click="Router.back()" />
        </div>
      </template>
    </van-nav-bar>
  </van-sticky>

  <router-view v-slot="{ Component }">
    <!-- <keep-alive> -->
    <component :is="Component" />
    <!-- </keep-alive> -->
  </router-view>

  <van-tabbar class="common-layout-tabbar" v-if="LayoutInfoStore.isShowTabBar" ref="TabBarRef" route fixed>
    <slot name="tabBarContent"></slot>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { useLayoutInfoStore } from '@/store/layout-info';
import { useCollectLayOutInfoNormalLogic } from '@/store/layout-info/utils';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const LayoutInfoStore = useLayoutInfoStore();
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
// .common-layout-tabbar {
//   :deep(.van-tabbar-item) {
//     .van-tabbar-item__text {
//       font-size: 13px;
//     }
//     .van-tabbar-item__icon {
//       img {
//         width: 26px;
//         height: 26px;
//       }
//     }
//   }
// }
</style>
