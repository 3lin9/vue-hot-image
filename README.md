# vue-hot-image
基于vue3开发的热区组件，可创建区域，调整大小，可拖拽

## 特性

- 简单易用的 API
- 支持动态添加和删除热区
- 响应式设计，适配各种屏幕尺寸
- 支持自定义样式
## 安装
  ```bash
  npm i vue-hot-image
  ```
## 使用
import VueHotImage from 'vue-hot-image';

    <vue-hot-image
      v-model="data" // 绑定数据
      :url="url"  // 图片地址
      @add=""
    />
    
