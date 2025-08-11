<template>
  <CommonLayout>
    <template #tabBarContent>
      <van-tabbar-item :to="RoutesEnumOptions.Homepage.value.path">
        首页
        <template #icon="{ active }">
          <img :src="active ? MyActiveImg : MyImg" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="RoutesEnumOptions.MyHomepage.value.path">
        我的
        <template #icon="{ active }">
          <img :src="active ? MyActiveImg : MyImg" />
        </template>
      </van-tabbar-item>
    </template>
  </CommonLayout>
</template>

<script lang="ts" setup>
import MyImg from '@/assets/my.png';
import MyActiveImg from '@/assets/my-active.png';
import { RoutesEnumOptions } from './router/routesConfig';

/**
 * 计算真实的视口单位高度
 * 在不同的浏览器中，如果使用直接使用 vh 单位，会包含浏览器自带的工具栏、地址栏等元素的高度。
 */
function genCssVariablesRelatedToVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--fullHeight', `${vh * 100}px`);
}

// 初始化 + 监听 resize（地址栏显隐会触发）
genCssVariablesRelatedToVh();
window.addEventListener('resize', genCssVariablesRelatedToVh);
</script>

<style scoped lang="less"></style>
