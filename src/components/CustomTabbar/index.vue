<template>
  <van-tabbar class="common-layout-tabbar custom-tabbar" :fixed="false" safe-area-inset-bottom>
    <footer>
      <slot></slot>
    </footer>
  </van-tabbar>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.custom-tabbar {
  overflow: hidden;
  footer {
    padding: 8px 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
