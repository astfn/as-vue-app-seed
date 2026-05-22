<template>
  <div class="performance-test-page">
    <div class="test-content">
      <!-- 测试控制区 -->
      <div class="test-section control-section">
        <h3>⚡ 性能指标测试</h3>
        <p class="section-desc">测试页面核心性能指标：FCP、LCP、CLS</p>

        <div class="button-group">
          <van-button type="primary" @click="startPerformanceTest" :loading="testing" :disabled="testing">
            {{ testing ? '测试中...' : '开始测试' }}
          </van-button>
          <van-button type="default" @click="resetTest" :disabled="testing"> 重置 </van-button>
        </div>

        <div v-if="testing" class="testing-tip">
          <van-loading size="16" />
          <span>正在收集性能指标，请等待 5 秒...</span>
        </div>
      </div>

      <!-- 性能指标展示区 -->
      <div class="test-section metrics-section" v-if="testResult">
        <h3>📊 性能指标报告</h3>

        <!-- FCP 指标 -->
        <div class="metric-card" :class="getMetricClass('fcp')">
          <div class="metric-header">
            <span class="metric-name">FCP (首次内容绘制)</span>
            <span class="metric-badge" :class="getMetricBadgeClass('fcp')">
              {{ getMetricRating('fcp') }}
            </span>
          </div>
          <div class="metric-value">
            {{ formatMetricValue(testResult.fcp) }}
          </div>
          <div class="metric-desc">First Contentful Paint</div>
        </div>

        <!-- LCP 指标 -->
        <div class="metric-card" :class="getMetricClass('lcp')">
          <div class="metric-header">
            <span class="metric-name">LCP (最大内容绘制)</span>
            <span class="metric-badge" :class="getMetricBadgeClass('lcp')">
              {{ getMetricRating('lcp') }}
            </span>
          </div>
          <div class="metric-value">
            {{ formatMetricValue(testResult.lcp) }}
          </div>
          <div class="metric-desc">Largest Contentful Paint</div>
        </div>

        <!-- CLS 指标 -->
        <div class="metric-card" :class="getMetricClass('cls')">
          <div class="metric-header">
            <span class="metric-name">CLS (累积布局偏移)</span>
            <span class="metric-badge" :class="getMetricBadgeClass('cls')">
              {{ getMetricRating('cls') }}
            </span>
          </div>
          <div class="metric-value">
            {{ formatMetricValue(testResult.cls) }}
          </div>
          <div class="metric-desc">Cumulative Layout Shift</div>
        </div>

        <!-- 测试时间 -->
        <div class="test-time">
          <van-icon name="clock-o" size="14" />
          <span>测试完成时间：{{ testResult.testTime }}</span>
        </div>
      </div>

      <!-- 指标说明 -->
      <div class="test-section info-section">
        <h3>ℹ️ 指标说明</h3>
        <div class="info-list">
          <div class="info-item">
            <span class="label">FCP</span>
            <span class="value">首次内容绘制，衡量页面首次渲染内容的时间</span>
          </div>
          <div class="info-item">
            <span class="label">LCP</span>
            <span class="value">最大内容绘制，衡量页面主要内容渲染完成时间</span>
          </div>
          <div class="info-item">
            <span class="label">CLS</span>
            <span class="value">累积布局偏移，衡量页面视觉稳定性</span>
          </div>
        </div>
      </div>

      <!-- 评级标准 -->
      <div class="test-section rating-section">
        <h3>📈 评级标准</h3>
        <div class="rating-table">
          <div class="rating-row header">
            <span class="rating-cell">指标</span>
            <span class="rating-cell"> 优秀</span>
            <span class="rating-cell">🟡 需改进</span>
            <span class="rating-cell">🔴 差</span>
          </div>
          <div class="rating-row">
            <span class="rating-cell">FCP</span>
            <span class="rating-cell">&lt; 1.8s</span>
            <span class="rating-cell">&lt; 3.0s</span>
            <span class="rating-cell">≥ 3.0s</span>
          </div>
          <div class="rating-row">
            <span class="rating-cell">LCP</span>
            <span class="rating-cell">&lt; 2.5s</span>
            <span class="rating-cell">&lt; 4.0s</span>
            <span class="rating-cell">≥ 4.0s</span>
          </div>
          <div class="rating-row">
            <span class="rating-cell">CLS</span>
            <span class="rating-cell">&lt; 0.1</span>
            <span class="rating-cell">&lt; 0.25</span>
            <span class="rating-cell">≥ 0.25</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from 'vant';

// 性能指标评级阈值常量
const PERFORMANCE_THRESHOLDS = {
  fcp: {
    good: 1.8, // < 1.8s 优秀
    warning: 3.0, // < 3.0s 需改进
  },
  lcp: {
    good: 2.5, // < 2.5s 优秀
    warning: 4.0, // < 4.0s 需改进
  },
  cls: {
    good: 0.1, // < 0.1 优秀
    warning: 0.25, // < 0.25 需改进
  },
} as const;

// 评级标签映射
const RATING_LABELS = {
  good: '🟢 优秀',
  warning: '🟡 需改进',
  bad: '🔴 差',
  unknown: 'N/A',
} as const;

interface PerformanceResult {
  fcp: number | null;
  lcp: number | null;
  cls: number;
  testTime: string;
}

const testing = ref(false);
const testResult = ref<PerformanceResult | null>(null);

const startPerformanceTest = async () => {
  testing.value = true;
  testResult.value = null;

  try {
    // 1. FCP
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    const fcpValue = fcpEntry ? fcpEntry.startTime / 1000 : null;

    // 2. LCP - 使用 PerformanceObserver 监听
    let lcpValue: number | null = null;
    const lcpPromise = new Promise<void>((resolve) => {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          lcpValue = entries[entries.length - 1].startTime / 1000;
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // 5秒后停止监听
      setTimeout(() => {
        lcpObserver.disconnect();
        resolve();
      }, 5000);
    });

    // 3. CLS - 使用 PerformanceObserver 监听
    let clsValue = 0;
    const clsPromise = new Promise<void>((resolve) => {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // 5秒后停止监听
      setTimeout(() => {
        clsObserver.disconnect();
        resolve();
      }, 5000);
    });

    // 等待 5 秒收集数据
    await Promise.all([lcpPromise, clsPromise]);

    // 生成测试结果
    testResult.value = {
      fcp: fcpValue,
      lcp: lcpValue,
      cls: clsValue,
      testTime: new Date().toLocaleString('zh-CN'),
    };

    showToast('测试完成');
  } catch (error: any) {
    showToast(`测试失败：${error.message}`);
  } finally {
    testing.value = false;
  }
};

const resetTest = () => {
  testResult.value = null;
  showToast('已重置');
};

const formatMetricValue = (value: number | null): string => {
  if (value === null) return 'N/A';
  return value.toFixed(2) + 's';
};

const getMetricRating = (metric: 'fcp' | 'lcp' | 'cls'): string => {
  if (!testResult.value) return '';

  const value = testResult.value[metric];
  if (value === null) return RATING_LABELS.unknown;

  const thresholds = PERFORMANCE_THRESHOLDS[metric];

  if (value < thresholds.good) {
    return RATING_LABELS.good;
  } else if (value < thresholds.warning) {
    return RATING_LABELS.warning;
  } else {
    return RATING_LABELS.bad;
  }
};

const getMetricClass = (metric: 'fcp' | 'lcp' | 'cls'): string => {
  if (!testResult.value) return '';

  const value = testResult.value[metric];
  if (value === null) return 'metric-unknown';

  const thresholds = PERFORMANCE_THRESHOLDS[metric];

  if (value < thresholds.good) {
    return 'metric-good';
  } else if (value < thresholds.warning) {
    return 'metric-warning';
  } else {
    return 'metric-bad';
  }
};

const getMetricBadgeClass = (metric: 'fcp' | 'lcp' | 'cls'): string => {
  if (!testResult.value) return '';

  const value = testResult.value[metric];
  if (value === null) return 'badge-unknown';

  const thresholds = PERFORMANCE_THRESHOLDS[metric];

  if (value < thresholds.good) {
    return 'badge-good';
  } else if (value < thresholds.warning) {
    return 'badge-warning';
  } else {
    return 'badge-bad';
  }
};

// 页面加载时自动执行测试
onMounted(() => {
  startPerformanceTest();
});
</script>

<style scoped lang="less">
.performance-test-page {
  padding: var(--page-normal-padding);
  height: 100%;
  overflow: hidden auto;
  .test-content {
    padding: 16px;
  }

  .test-section {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h3 {
      margin: 0 0 12px;
      font-size: 18px;
      font-weight: 600;
      color: #323233;
    }

    .section-desc {
      margin: 0 0 16px;
      font-size: 14px;
      color: #969799;
    }
  }

  .control-section {
    .button-group {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;

      .van-button {
        flex: 1;
      }
    }

    .testing-tip {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      background: #e8f4ff;
      border-radius: 8px;
      color: #1989fa;
      font-size: 14px;
    }
  }

  .metrics-section {
    .metric-card {
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 8px;
      border: 2px solid #eee;
      transition: all 0.3s ease;

      &:last-child {
        margin-bottom: 0;
      }

      .metric-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .metric-name {
          font-size: 16px;
          font-weight: 600;
          color: #323233;
        }

        .metric-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;

          &.badge-good {
            background: #e8f8f0;
            color: #07c160;
          }

          &.badge-warning {
            background: #fff7e6;
            color: #ff976a;
          }

          &.badge-bad {
            background: #fee;
            color: #ee0a24;
          }

          &.badge-unknown {
            background: #f7f8fa;
            color: #969799;
          }
        }
      }

      .metric-value {
        font-size: 32px;
        font-weight: 700;
        color: #323233;
        margin-bottom: 4px;
      }

      .metric-desc {
        font-size: 12px;
        color: #969799;
      }

      &.metric-good {
        border-color: #07c160;
        background: #f6ffed;
      }

      &.metric-warning {
        border-color: #ff976a;
        background: #fff7e6;
      }

      &.metric-bad {
        border-color: #ee0a24;
        background: #fff1f0;
      }

      &.metric-unknown {
        border-color: #eee;
        background: #fafafa;
      }
    }

    .test-time {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #eee;
      font-size: 13px;
      color: #969799;
    }
  }

  .info-section {
    .info-list {
      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
          border-bottom: none;
        }

        .label {
          flex-shrink: 0;
          width: 50px;
          font-size: 14px;
          font-weight: 600;
          color: #1989fa;
        }

        .value {
          flex: 1;
          font-size: 13px;
          color: #646566;
          line-height: 1.6;
        }
      }
    }
  }

  .rating-section {
    .rating-table {
      .rating-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 8px;
        padding: 12px 8px;
        font-size: 13px;

        &.header {
          font-weight: 600;
          color: #323233;
          border-bottom: 2px solid #eee;
          padding-bottom: 12px;
        }

        &:not(.header) {
          color: #646566;
          border-bottom: 1px solid #f5f5f5;
        }

        .rating-cell {
          text-align: center;
        }
      }
    }
  }
}
</style>
