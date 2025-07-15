<template>
  <div class="home-page-wrapper">
    <h2>
      <van-loading v-if="loading" />
      首页
      {{ res }}
    </h2>
    <van-search v-model="keywords" @update:model-value="triggerSearch" />
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

    <h2>首页</h2>
  </div>
</template>

<script lang="ts" setup>
import { getMock } from '@/apis/test';
import { useWrapperRef, useRequest } from '@/hooks';
import { useRouter } from 'vue-router';

const Router = useRouter();

const jump2CustomTabbarPage = () => {
  Router.push('/customTabBarPage');
};

const { runAsync: runApi, data, loading, res } = useRequest(getMock, { manual: true, debounceInterval: 500 });

const [keywords] = useWrapperRef('');

let param2 = 1;
const triggerSearch = async (keywords) => {
  param2++;
  await runApi({ keywords, param2 });
  // eslint-disable-next-line no-console
  console.log('res', data.value);
};
</script>

<style scoped lang="less">
.home-page-wrapper {
  padding: var(--page-normal-padding);
  height: 100%;
  overflow: auto;
}
</style>
