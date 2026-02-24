# @xpxxy/hikvision-web-sdk-types

TypeScript type declarations for **HiKVision WebSDK_noPlugin_V3.4.0_251202_20251204103656**.

## Note
Type definitions are for reference only. Please refer to the official demo's `demo.js` and your actual usage for implementation.  
The error code definitions provided in this type package are for reference only; some error codes in the official documentation are incomplete or incorrect.
## Install

```bash
npm install @xpxxy/hikvision-web-sdk-types
```

## Usage

After including the **no-plugin** HikVision Web SDK via a `<script>` tag, the SDK attaches to `window.WebVideoCtrl`. Installing this package gives you full type support for it.

```ts
// ensure the no-plugin SDK script is loaded first
  window.WebVideoCtrl.I_SupportNoPlugin();
  window.WebVideoCtrl.I_InitPlugin('800', '600', { ... });
```

To use callback/option types (e.g. `I_LoginOptions`), use the global namespace:

```ts
const options: HikVisionWebSDKNoPluginVersion.I_LoginOptions = {
  success: (xmlDoc) => { ... },
  error: (code, xmlDoc) => { ... },
};
```

## Development

```bash
npm install
npm run build
```

## License

MIT
