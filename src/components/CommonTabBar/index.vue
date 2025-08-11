<template>
  <van-tabbar class="common-layout-tabbar" route fixed placeholder safe-area-inset-bottom v-bind="$attrs">
    <slot></slot>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { TabbarProps } from 'vant';

defineProps<Partial<TabbarProps>>();
</script>

<style scoped lang="less">
.common-layout-tabbar {
  overflow: hidden;
  // fixed模式与其它模式的 tabbar 高度统一
  &,
  :deep(.van-tabbar.van-tabbar--fixed) {
    height: 58px;
  }
  :deep(.van-tabbar-item) {
    .van-tabbar-item__text {
      font-size: 10px;
    }
    .van-tabbar-item__icon {
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
