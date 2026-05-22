<template>
  <div class="developer-testing-page">
    <van-nav-bar title="开发者测试" left-arrow @click-left="$router.back()" />

    <div class="testing-content">
      <!-- 页面标题 -->
      <div class="page-header">
        <van-icon name="setting-o" size="32" color="#1989fa" />
        <h2>开发者测试中心</h2>
        <p class="subtitle">功能测试与调试工具集合</p>
      </div>

      <!-- 测试模块列表 -->
      <div class="test-modules">
        <!-- 媒体功能测试 -->
        <div class="module-card" @click="navigateTo('/media_test')">
          <div class="module-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <van-icon name="video-o" size="32" color="#fff" />
          </div>
          <div class="module-info">
            <h3>媒体功能测试</h3>
            <p>摄像头实时预览、麦克风音频可视化测试</p>
            <div class="module-tags">
              <van-tag type="primary">WebRTC</van-tag>
              <van-tag type="success">getUserMedia</van-tag>
            </div>
          </div>
          <van-icon name="arrow" size="20" color="#999" />
        </div>

        <!-- 性能测试 -->
        <div class="module-card" @click="navigateTo('/performance_test')">
          <div class="module-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            <van-icon name="chart-trending-o" size="32" color="#fff" />
          </div>
          <div class="module-info">
            <h3>性能测试</h3>
            <p>FCP、LCP、CLS 核心性能指标测试</p>
            <div class="module-tags">
              <van-tag type="primary">Core Web Vitals</van-tag>
            </div>
          </div>
          <van-icon name="arrow" size="20" color="#999" />
        </div>

        <!-- 预留：存储测试 -->
        <div class="module-card module-card-disabled" @click="showToast('功能开发中...')">
          <div class="module-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
            <van-icon name="down" size="32" color="#fff" />
          </div>
          <div class="module-info">
            <h3>💾 存储测试</h3>
            <p>LocalStorage、SessionStorage、IndexedDB 测试</p>
            <div class="module-tags">
              <van-tag type="warning">开发中</van-tag>
            </div>
          </div>
          <van-icon name="arrow" size="20" color="#999" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

const router = useRouter();

const navigateTo = (path: string) => {
  // 使用相对路径跳转子路由
  router.push(path);
};
</script>

<style scoped lang="less">
.developer-testing-page {
  min-height: 100vh;
  background: #f7f8fa;

  .testing-content {
    padding: 16px;

    // 子路由页面全屏显示
    > router-view {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      background: #f7f8fa;
    }
  }

  .page-header {
    text-align: center;
    padding: 32px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    margin-bottom: 24px;
    color: #fff;

    h2 {
      margin: 16px 0 8px;
      font-size: 24px;
      font-weight: 600;
    }

    .subtitle {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }
  }

  .test-modules {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .module-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    }

    .module-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .module-info {
      flex: 1;
      min-width: 0;

      h3 {
        margin: 0 0 4px;
        font-size: 16px;
        font-weight: 600;
        color: #323233;
      }

      p {
        margin: 0 0 8px;
        font-size: 13px;
        color: #969799;
        line-height: 1.5;
      }

      .module-tags {
        display: flex;
        gap: 8px;
      }
    }
  }

  .module-card-disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:active {
      transform: none;
    }
  }

  .footer-tips {
    margin-top: 24px;
  }
}
</style>
