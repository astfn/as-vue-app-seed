<template>
  <CommonLayout>
    <template #tabBarContent>
      <van-tabbar-item v-for="item in TabBarOptions.genOptions()" :key="item.key" :to="item.value">
        <span>{{ item.label }}</span>
        <template #icon="{ active }">
          <img :src="active ? item.activeIcon : item.icon" />
        </template>
      </van-tabbar-item>
    </template>
  </CommonLayout>
</template>

<script lang="ts" setup>
import HomeTabIcon from '@/assets/common/homeTab-icon.png';
import HomeTabActiveIcon from '@/assets/common/homeTabActive-icon.png';
import PersonalCenterIcon from '@/assets/common/personalCenter-icon.png';
import PersonalCenterActiveIcon from '@/assets/common/personalCenterActive-icon.png';
import { asEnum } from 'as-enum';
import { GlobalControlJumpPathOptions } from '@/router/routesConfig';

const TabBarOptions = asEnum([
  [GlobalControlJumpPathOptions.homepage.value, , '首页', { icon: HomeTabIcon, activeIcon: HomeTabActiveIcon }],
  [
    GlobalControlJumpPathOptions.personalCenter.value,
    ,
    '个人中心',
    { icon: PersonalCenterIcon, activeIcon: PersonalCenterActiveIcon },
  ],
] as const);

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
