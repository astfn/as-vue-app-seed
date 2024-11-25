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

RoutesEnumOptions;
</script>

<style scoped lang="less"></style>
