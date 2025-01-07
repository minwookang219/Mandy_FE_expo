// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // config.resolver.assetExts = ...
  // config.transformer = ...
  // 필요한 설정을 config에 추가/수정하세요.

  // 예: SVG 설정
  const { assetExts, sourceExts } = config.resolver;
  config.resolver.assetExts = assetExts.filter((ext) => ext !== "svg");
  config.resolver.sourceExts = [...sourceExts, "svg"];
  config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );

  return config;
})();
