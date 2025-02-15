const path = require('path');

const common = require("./webpack/webpack.common");
const EncodingPlugin = require("webpack-encoding-plugin");

// for changes to the webpack build config, please refer to using webpack-merge
const { mergeWithCustomize, customizeObject } = require("webpack-merge");

module.exports = (env, argv) =>
  mergeWithCustomize({
    customizeObject: customizeObject({
      entry: "replace",
      externals: "replace",
      plugins: "append",
      output: "merge",
    }),
  })(common(env, argv), {
    entry: {
      // the entry point for the new composer code
      newComposer: `./src/newComposerMonacoEditor.ts`,
      // the entry point for the runtime widget
      widgetRuntime: `./src/monacoScriptWidget.runtime.ts`,
      // the entry point for the ide widget
      widgetIde: `./src/monacoScriptWidget.ide.ts`,
      "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
      "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
      "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
      "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
      "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
      "tsCustomWorker": './src/editors/typescript/worker/index.ts',
    },
    output: {
      globalObject: 'self'
    },
    resolve: {
      alias: {
        'monaco-editor-core': path.resolve(__dirname, 'node_modules/monaco-editor')
      }
    },
    plugins: [
      new EncodingPlugin({
        encoding: "utf8",
      }),
    ],
    externals: [],
  });
