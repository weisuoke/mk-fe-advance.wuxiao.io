// @ts-nocheck
// umi.server.js
import '/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-built-in/node_modules/regenerator-runtime/runtime.js';
import { format } from 'url';
import renderServer from '/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-built-in/lib/plugins/features/ssr/templates/renderServer/renderServer.js';
import { stripBasename, cheerio, handleHTML } from '/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-built-in/lib/plugins/features/ssr/templates/utils.js';
import { IServerRender } from '@umijs/types';

import { ApplyPluginsType, createMemoryHistory, dynamic } from '/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/runtime';
import { plugin } from './plugin';
import './pluginRegister';

// origin require module
// https://github.com/webpack/webpack/issues/4175#issuecomment-342931035
const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

/**
 * server render function
 * @param params
 */
const render: IServerRender = async (params) => {
  let error;
  const {
    origin = '',
    path,
    htmlTemplate = '',
    mountElementId = 'root',
    context = {},
    mode = 'string',
    basename = '/',
    staticMarkup = false,
    forceInitial = false,
    removeWindowInitialProps = false,
    getInitialPropsCtx,
  } = params;
  let manifest = params.manifest;
  const env = 'production';

  let html = htmlTemplate || "\u003C!DOCTYPE html\u003E\n\u003Chtml\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\" \u002F\u003E\n    \u003Cmeta\n      name=\"viewport\"\n      content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\"\n    \u002F\u003E\n    \u003Clink rel=\"stylesheet\" href=\"\u002Fumi.css\" \u002F\u003E\n    \u003Cscript\u003E\n      window.routerBase = \"\u002F\";\n    \u003C\u002Fscript\u003E\n    \u003Cscript\u003E\n      \u002F\u002F! umi version: 3.4.22\n    \u003C\u002Fscript\u003E\n    \u003Cscript\u003E\n      !(function () {\n        var e = localStorage.getItem(\"dumi:prefers-color\"),\n          t = window.matchMedia(\"(prefers-color-scheme: dark)\").matches,\n          r = [\"light\", \"dark\", \"auto\"];\n        document.documentElement.setAttribute(\n          \"data-prefers-color\",\n          e === r[2] ? (t ? r[1] : r[0]) : r.includes(e) ? e : r[0]\n        );\n      })();\n    \u003C\u002Fscript\u003E\n    \u003Ctitle\u003E慕课网前端架构师\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv id=\"root\"\u003E\u003C\u002Fdiv\u003E\n\n    \u003Cscript src=\"\u002Fumi.js\"\u003E\u003C\u002Fscript\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E\n";
  let rootContainer = '';
  try {
    // handle basename
    const location = stripBasename(basename, `${origin}${path}`);
    const { pathname } = location;
    // server history
    const history = createMemoryHistory({
      initialEntries: [format(location)],
    });
    /**
     * beforeRenderServer hook, for polyfill global.*
     */
    await plugin.applyPlugins({
      key: 'ssr.beforeRenderServer',
      type: ApplyPluginsType.event,
      args: {
        env,
        path,
        context,
        history,
        mode,
        location,
      },
      async: true,
    });

    /**
     * routes init and patch only once
     * beforeRenderServer must before routes init avoding require error
     */
    // 主要为后面支持按需服务端渲染，单独用 routes 会全编译
    const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => React.createElement(
        dynamic({
          loader: async () => {
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ '/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/src/builtins/Previewer.tsx');
            const { default: demos } = await import(/* webpackChunkName: 'dumi_demos' */ '@@/dumi/demos');
            const { usePrefersColor } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          }
        }), props)
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/dumi-theme-default/src/layout.tsx').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1622128382976,
          "title": "慕课网前端架构师",
          "order": 10,
          "hero": {
            "title": "慕课网前端架构师",
            "desc": "<div class=\"markdown\"><p>📚 笔记 | 思路 | 扩展</p></div>",
            "actions": [
              {
                "text": "开始阅读",
                "link": "/"
              }
            ]
          },
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2021-present<br />Powered by wuxiao.io</p></div>",
          "slugs": []
        },
        "title": "慕课网前端架构师",
        "_chunkName": "docs__index.md"
      },
      {
        "path": "/module1",
        "component": require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/module1/index.md",
          "updatedTime": 1622128799874,
          "nav": {
            "title": "阶段一",
            "order": 10,
            "path": "/module1"
          },
          "title": "总览",
          "order": 1,
          "slugs": [
            {
              "depth": 2,
              "value": "总览",
              "heading": "总览"
            }
          ]
        },
        "title": "总览",
        "_chunkName": "docs__module1__index.md"
      },
      {
        "path": "/module1/chapter02/untitled",
        "component": require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/chapter02/Untitled.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/module1/chapter02/Untitled.md",
          "updatedTime": 1622130147760,
          "slugs": [],
          "title": "Untitled",
          "nav": {
            "path": "/module1",
            "title": "阶段一"
          },
          "group": {
            "path": "/module1/chapter02",
            "title": "脚手架"
          }
        },
        "title": "Untitled",
        "_chunkName": "docs__module1__chapter02__Untitled.md"
      },
      {
        "path": "/module1/chapter02",
        "component": require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/chapter02/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/module1/chapter02/index.md",
          "updatedTime": 1622129710186,
          "nav": {
            "title": "阶段一",
            "order": 10,
            "path": "/module1"
          },
          "group": {
            "title": "脚手架",
            "order": 20,
            "path": "/module1/chapter02"
          },
          "title": "总览",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "总览",
              "heading": "总览"
            },
            {
              "depth": 2,
              "value": "收获",
              "heading": "收获"
            },
            {
              "depth": 2,
              "value": "主要内容",
              "heading": "主要内容"
            },
            {
              "depth": 2,
              "value": "其他内容",
              "heading": "其他内容"
            },
            {
              "depth": 2,
              "value": "学习方法",
              "heading": "学习方法"
            }
          ]
        },
        "title": "总览",
        "_chunkName": "docs__module1__chapter02__index.md"
      },
      {
        "path": "/module1/chapter02/lesson2",
        "component": require('/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/chapter02/lesson2.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/module1/chapter02/lesson2.md",
          "updatedTime": 1622133706149,
          "nav": {
            "title": "阶段一",
            "order": 10,
            "path": "/module1"
          },
          "group": {
            "title": "脚手架",
            "order": 20,
            "path": "/module1/chapter02"
          },
          "title": "脚手架开发入门",
          "order": 2,
          "slugs": [
            {
              "depth": 2,
              "value": "脚手架开发必要性",
              "heading": "脚手架开发必要性"
            },
            {
              "depth": 3,
              "value": "研发效能",
              "heading": "研发效能"
            },
            {
              "depth": 3,
              "value": "脚手架核心价值",
              "heading": "脚手架核心价值"
            },
            {
              "depth": 3,
              "value": "和自动化构建工具区别",
              "heading": "和自动化构建工具区别"
            }
          ]
        },
        "title": "脚手架开发入门",
        "_chunkName": "docs__module1__chapter02__lesson2.md"
      }
    ],
    "title": "慕课网前端架构师",
    "component": (props) => props.children
  }
];
    // allow user to extend routes
    plugin.applyPlugins({
      key: 'patchRoutes',
      type: ApplyPluginsType.event,
      args: { routes },
    });

    // for renderServer
    const opts = {
      path,
      history,
      pathname,
      getInitialPropsCtx,
      basename,
      context,
      mode,
      plugin,
      staticMarkup,
      routes,
      isServer: process.env.__IS_SERVER,
    }
    const dynamicImport =  true;
    if (dynamicImport && !manifest) {
      try {
        // prerender not work because the manifest generation behind of the prerender
        manifest = requireFunc(`./asset-manifest.json`);
      } catch (_) {}
    }
    // renderServer get rootContainer
    const { pageHTML, pageInitialProps, routesMatched } = await renderServer(opts);
    rootContainer = pageHTML;
    if (html) {
      // plugin for modify html template
      html = await plugin.applyPlugins({
        key: 'ssr.modifyServerHTML',
        type: ApplyPluginsType.modify,
        initialValue: html,
        args: {
          context,
          cheerio,
          routesMatched,
          dynamicImport,
          manifest
        },
        async: true,
      });
      html = await handleHTML({ html, rootContainer, pageInitialProps, mountElementId, mode, forceInitial, removeWindowInitialProps, routesMatched, dynamicImport, manifest });
    }
  } catch (e) {
    // downgrade into csr
    error = e;
  }
  return {
    rootContainer,
    error,
    html,
  }
}

export default render;
