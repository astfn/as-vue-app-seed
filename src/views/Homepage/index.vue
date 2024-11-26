<template>
  <div class="home-page-wrapper">
    <h2>首页</h2>
    <van-button @click="jump2CustomTabbarPage"> 跳转自定义Tabbar页面 </van-button>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h3>这是首页</h3>
    <h2>首页</h2>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const Router = useRouter();

const jump2CustomTabbarPage = () => {
  Router.push('/customTabBarPage');
};
</script>

<style scoped lang="less">
.home-page-wrapper {
  padding: var(--page-normal-padding);
  height: 100%;
  overflow: auto;
}
</style>
