<template>
  <div class="info-list-item-card">
    <main>
      <section class="left">
        <span class="title">Ashuntefannao</span>
        <div class="sub-info">
          <!-- <view class="sub-info-item">恒泰保险</view> -->
          <span class="sub-info-item">2020-04-11 16：00：00</span>
        </div>
      </section>
      <section class="right">
        <img src="https://picsum.photos/300/150" />
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ info: any }>();
</script>

<style scoped lang="less">
.info-list-item-card {
  //   padding: 4px 0px;
  main {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 14px;
      }
      .sub-info {
        font-size: 12px;
        display: flex;
        gap: 24px;
        color: var(--custom-color-sub);
      }
    }
    .right {
      flex-shrink: 0;
      width: 131px;
      height: 80px;
      overflow: hidden;
      border-radius: 4px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
