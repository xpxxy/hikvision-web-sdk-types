# @xpxxy/hikvision-web-sdk-types

**海康威视 Web SDK 无插件版本**的 TypeScript 类型声明包。

基于海康威视 WebSDK_noPlugin_V3.4.0_251202_20251204103656 版本编写。

## 安装

```bash
npm install @xpxxy/hikvision-web-sdk-types
```

## 使用

海康 **无插件** Web SDK 通过 `<script>` 标签引入后挂载在 `window.WebVideoCtrl`，安装本包后即可获得类型提示，无需额外声明。

```ts
// 请确保sdk已通过script正确引入
  window.WebVideoCtrl.I_SupportNoPlugin();
  window.WebVideoCtrl.I_InitPlugin('800', '600', { ... });
```

如需使用回调/选项等类型（如 `I_LoginOptions`），可引用全局命名空间：

```ts
const options: HikVisionWebSDKNoPluginVersion.I_LoginOptions = {
  success: (xmlDoc) => { ... },
  error: (code, xmlDoc) => { ... },
};
```

## 开发

```bash
npm install
npm run build
```

## License

MIT
