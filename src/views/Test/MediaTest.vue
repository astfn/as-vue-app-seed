<!--
  媒体功能测试页面 (MediaTest.vue)

  ⚠️ WebRTC 安全上下文规则说明：
  Chrome 对 navigator.mediaDevices 的暴露有严格的安全要求

  安全上下文（可以使用 WebRTC）：
  ✅ https:// 协议
  ✅ http://localhost
  ✅ http://127.0.0.1
  ✅ http://[::1] (IPv6 localhost)

  非安全上下文（不能使用 WebRTC）：
  ❌ http://192.168.x.x (局域网 IP)
  ❌ http://10.x.x.x (局域网 IP)
  ❌ 其他非 localhost 的 HTTP 地址

  解决方案：
  1. 本地开发使用 http://localhost:5716
  2. 配置 Chrome 白名单：chrome://flags/#unsafely-treat-insecure-origin-as-secure
  3. 启用 HTTPS 协议
-->
<template>
  <div class="media-test-page">
    <div class="test-content">
      <!-- 环境信息 -->
      <div class="test-section info-section">
        <h3>ℹ️ 环境信息</h3>
        <div class="info-list">
          <div class="info-item">
            <span class="label">User Agent:</span>
            <span class="value">{{ userAgent }}</span>
          </div>
          <div class="info-item">
            <span class="label">是否微信环境:</span>
            <span class="value">{{ isWechat ? '✅ 是' : '❌ 否' }}</span>
          </div>
          <div class="info-item">
            <span class="label">是否 Android:</span>
            <span class="value">{{ isAndroid ? '✅ 是' : '❌ 否' }}</span>
          </div>
          <div class="info-item">
            <span class="label">是否 iOS:</span>
            <span class="value">{{ isIOS ? '✅ 是' : '❌ 否' }}</span>
          </div>
          <div class="info-item">
            <span class="label">支持 getUserMedia:</span>
            <span class="value">{{ isWebRTCSupported ? '✅ 支持' : '❌ 不支持' }}</span>
          </div>
        </div>
      </div>

      <!-- 附件上传测试 -->
      <div class="test-section">
        <h3>📎 附件上传测试</h3>

        <!-- 图片上传 -->
        <div class="upload-group">
          <div class="upload-label">图片上传</div>
          <div class="upload-preview" v-if="uploadedImage">
            <img :src="uploadedImage" class="preview-img" />
          </div>
          <van-button type="primary" size="small" @click="triggerImageUpload"> 选择图片 </van-button>
          <input ref="imageInputRef" type="file" accept="image/*" style="display: none" @change="onImageUpload" />
          <div v-if="imageStatus" class="status small" :class="imageStatus.type">
            {{ imageStatus.message }}
          </div>
        </div>

        <!-- 文件上传 -->
        <div class="upload-group">
          <div class="upload-label">文件上传 (PDF/Word/Excel)</div>
          <div class="file-list" v-if="uploadedFiles.length > 0">
            <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
              <van-icon name="description" size="20" />
              <span class="file-name">{{ file.name }}</span>
              <span class="file-size">{{ (file.size / 1024).toFixed(2) }} KB</span>
            </div>
          </div>
          <van-button type="success" size="small" @click="triggerFileUpload"> 选择文件 </van-button>
          <input
            ref="fileInputRef"
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            multiple
            style="display: none"
            @change="onFileUpload"
          />
          <div v-if="fileStatus" class="status small" :class="fileStatus.type">
            {{ fileStatus.message }}
          </div>
        </div>
      </div>

      <!-- 摄像头测试 -->
      <div class="test-section">
        <h3>📹 摄像头测试</h3>

        <!-- 实时视频预览 -->
        <div class="video-container">
          <video
            ref="videoRef"
            autoplay
            playsinline
            muted
            class="video-preview"
            :style="{ display: mediaStream ? 'block' : 'none' }"
          ></video>
        </div>

        <div class="button-group">
          <van-button type="primary" @click="toggleCamera" :loading="cameraLoading">
            {{ cameraActive ? '关闭摄像头' : '打开摄像头' }}
          </van-button>
        </div>

        <div class="method-tips" v-if="!isWebRTCSupported">
          <van-icon name="info-o" size="16" />
          <span>当前环境不支持实时预览（需要 WebRTC 支持），请使用标准浏览器访问</span>
        </div>

        <div v-if="cameraStatus" class="status" :class="cameraStatus.type">
          {{ cameraStatus.message }}
        </div>
      </div>

      <!-- 麦克风测试 -->
      <div class="test-section">
        <h3>🎤 麦克风测试</h3>

        <!-- 实时音频可视化 -->
        <div class="audio-container" v-if="mediaStream">
          <div class="audio-visualizer">
            <div v-for="n in 20" :key="n" class="audio-bar" :style="{ height: audioLevels[n - 1] + '%' }"></div>
          </div>
        </div>

        <div class="button-group">
          <van-button type="success" @click="toggleMicrophone" :loading="micLoading">
            {{ micActive ? '关闭麦克风' : '打开麦克风' }}
          </van-button>
        </div>

        <div class="method-tips" v-if="!isWebRTCSupported">
          <van-icon name="info-o" size="16" />
          <span>当前环境不支持实时监听（需要 WebRTC 支持），请使用标准浏览器访问</span>
        </div>

        <div v-if="micStatus" class="status" :class="micStatus.type">
          {{ micStatus.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

// 环境检测
const userAgent = navigator.userAgent;
const isWechat = /MicroMessenger/i.test(userAgent);
const isAndroid = /Android/i.test(userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

// 检测 WebRTC 支持性
const checkWebRTCSupport = () => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

const isWebRTCSupported = checkWebRTCSupport();

// ==================== 附件上传 ====================
const imageInputRef = ref<HTMLInputElement>();
const fileInputRef = ref<HTMLInputElement>();
const uploadedImage = ref<string>('');
const uploadedFiles = ref<File[]>([]);
const imageStatus = ref<{ type: string; message: string } | null>(null);
const fileStatus = ref<{ type: string; message: string } | null>(null);

const triggerImageUpload = () => {
  imageStatus.value = null;
  uploadedImage.value = '';
  imageInputRef.value?.click();
};

const onImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    imageStatus.value = {
      type: 'success',
      message: `✅ 图片上传成功！\n文件名：${file.name}\n文件大小：${(file.size / 1024).toFixed(2)} KB\n文件类型：${file.type}`,
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    imageStatus.value = {
      type: 'error',
      message: '❌ 未获取到图片',
    };
  }

  input.value = '';
};

const triggerFileUpload = () => {
  fileStatus.value = null;
  uploadedFiles.value = [];
  fileInputRef.value?.click();
};

const onFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files;

  if (files && files.length > 0) {
    uploadedFiles.value = Array.from(files);
    const fileNames = uploadedFiles.value.map((f) => f.name).join(', ');
    fileStatus.value = {
      type: 'success',
      message: `✅ 文件上传成功！\n文件数量：${files.length}\n文件：${fileNames}`,
    };
  } else {
    fileStatus.value = {
      type: 'error',
      message: '❌ 未获取到文件',
    };
  }

  input.value = '';
};

// ==================== 摄像头测试 ====================
const cameraLoading = ref(false);
const cameraActive = ref(false);
const cameraStatus = ref<{ type: string; message: string } | null>(null);
const videoRef = ref<HTMLVideoElement>();
const mediaStream = ref<MediaStream | null>(null);

// WebRTC 方式
const toggleCamera = async () => {
  if (cameraActive.value) {
    stopCamera();
  } else {
    await startCamera();
  }
};

const startCamera = async () => {
  cameraLoading.value = true;
  cameraStatus.value = null;

  try {
    // 检查是否支持 WebRTC
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('当前浏览器不支持 WebRTC，请使用标准浏览器访问');
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });

    mediaStream.value = stream;

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      await videoRef.value.play();
    }

    cameraActive.value = true;
    cameraStatus.value = {
      type: 'success',
      message: '✅ 摄像头已打开！实时预览中...',
    };
  } catch (error: any) {
    cameraStatus.value = {
      type: 'error',
      message: `❌ 摄像头打开失败：${error.message || error.name}`,
    };
  } finally {
    cameraLoading.value = false;
  }
};

const stopCamera = () => {
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((track) => track.stop());
    mediaStream.value = null;
  }

  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }

  cameraActive.value = false;
  cameraStatus.value = {
    type: 'success',
    message: '摄像头已关闭',
  };
};

// ==================== 麦克风测试 ====================
const micLoading = ref(false);
const micActive = ref(false);
const micStatus = ref<{ type: string; message: string } | null>(null);
const audioLevels = ref<number[]>(new Array(20).fill(0));

let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let microphone: MediaStreamAudioSourceNode | null = null;
let animationId: number | null = null;

// WebRTC 方式
const toggleMicrophone = async () => {
  if (micActive.value) {
    stopMicrophone();
  } else {
    await startMicrophone();
  }
};

const startMicrophone = async () => {
  micLoading.value = true;
  micStatus.value = null;

  try {
    // 检查是否支持 WebRTC
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('当前浏览器不支持 WebRTC，请使用标准浏览器访问');
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream.value = stream;

    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);

    microphone.connect(analyser);
    analyser.fftSize = 64;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualization = () => {
      if (!analyser) return;

      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < 20; i++) {
        const value = dataArray[i] || 0;
        audioLevels.value[i] = (value / 255) * 100;
      }

      animationId = requestAnimationFrame(updateVisualization);
    };

    updateVisualization();

    micActive.value = true;
    micStatus.value = {
      type: 'success',
      message: '✅ 麦克风已打开！请说话测试...',
    };
  } catch (error: any) {
    micStatus.value = {
      type: 'error',
      message: `❌ 麦克风打开失败：${error.message || error.name}`,
    };
  } finally {
    micLoading.value = false;
  }
};

const stopMicrophone = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  if (microphone) {
    microphone.disconnect();
    microphone = null;
  }

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  analyser = null;

  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((track) => track.stop());
    mediaStream.value = null;
  }

  micActive.value = false;
  audioLevels.value = new Array(20).fill(0);
  micStatus.value = {
    type: 'success',
    message: '麦克风已关闭',
  };
};

// 清理资源
onUnmounted(() => {
  stopCamera();
  stopMicrophone();
});
</script>

<style scoped lang="less">
.media-test-page {
  padding: var(--page-normal-padding);
  height: 100%;
  overflow: hidden auto;
}

.test-content {
  padding: 16px;
}

.test-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0 0 12px 0;
    font-size: 18px;
    color: #323233;
  }
}

.info-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;

  h3 {
    color: #fff;
  }

  .info-item {
    border-bottom-color: rgba(255, 255, 255, 0.2);

    .label {
      color: rgba(255, 255, 255, 0.8);
    }

    .value {
      color: #fff;
    }
  }
}

.method-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 16px;
}

.method-tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #fff7e6;
  border: 1px solid #ffd591;
  border-radius: 4px;
  margin-top: 12px;
  font-size: 13px;
  color: #fa8c16;
}

.method-badge {
  &.primary {
    background: #e8f5e9;
    color: #2e7d32;
  }

  &.warning {
    background: #fff3e0;
    color: #f57c00;
  }
}

.upload-group {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .upload-label {
    font-size: 14px;
    color: #646566;
    margin-bottom: 8px;
  }
}

.upload-preview {
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #f7f8fa;

  .preview-img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.file-list {
  margin: 12px 0;

  .file-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background: #f7f8fa;
    border-radius: 8px;
    margin-bottom: 8px;

    .van-icon {
      margin-right: 8px;
      color: #1989fa;
    }

    .file-name {
      flex: 1;
      font-size: 14px;
      color: #323233;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-size {
      font-size: 12px;
      color: #969799;
      margin-left: 8px;
    }
  }
}

.video-container {
  width: 100%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  margin: 12px 0;
  aspect-ratio: 4/3;

  .video-preview,
  .captured-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.audio-container {
  margin: 12px 0;

  .audio-visualizer {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100px;
    gap: 4px;
    padding: 10px;
    background: #f7f8fa;
    border-radius: 8px;

    .audio-bar {
      width: 8px;
      background: linear-gradient(to top, #07c160, #10aeff);
      border-radius: 4px;
      transition: height 0.1s ease;
      min-height: 4px;
    }
  }

  .audio-player {
    width: 100%;
  }
}

.button-group {
  margin-top: 12px;
}

.status {
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  white-space: pre-line;

  &.small {
    margin-top: 8px;
    padding: 8px;
    font-size: 12px;
  }

  &.success {
    background: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #a5d6a7;
  }

  &.error {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ef9a9a;
  }
}

.info-list {
  .info-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #969799;
      font-size: 14px;
      min-width: 140px;
    }

    .value {
      color: #323233;
      font-size: 14px;
      flex: 1;
      word-break: break-all;
    }
  }
}
</style>
