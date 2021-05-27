// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-dumi/lib/theme/layout')})],
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
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/@umijs/preset-dumi/lib/theme/layout')}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/node_modules/dumi-theme-default/src/layout.tsx')})],
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/index.md')}),
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
        "title": "慕课网前端架构师"
      },
      {
        "path": "/module1",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__module1__index.md' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/index.md')}),
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
        "title": "总览"
      },
      {
        "path": "/module1/chapter02/untitled",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__module1__chapter02__Untitled.md' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/chapter02/Untitled.md')}),
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
        "title": "Untitled"
      },
      {
        "path": "/module1/chapter02",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__module1__chapter02__index.md' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/chapter02/index.md')}),
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
        "title": "总览"
      },
      {
        "path": "/module1/chapter02/lesson2",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__module1__chapter02__lesson2.md' */'/Users/wuxiao/wuxiao-desktop/wuxiao.io/doc/mk-fe-advance.wuxiao.io/docs/module1/chapter02/lesson2.md')}),
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
        "title": "脚手架开发入门"
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

  return routes;
}
