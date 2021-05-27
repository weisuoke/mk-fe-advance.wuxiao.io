---
nav:
  title: 阶段一
  order: 10
group:
  title: 脚手架
  order: 20
title: 脚手架开发入门
order: 2
---

## 脚手架开发必要性

### 研发效能

开发imooc-cli脚手架的核心目标是：提升前端研发效能

大厂研发架构图：

![大厂架构图](https://wsk-mweb.oss-cn-hangzhou.aliyuncs.com/ipic/2021-05-27-154942.jpg)

### 脚手架核心价值

将研发过程：

- 自动化：项目重复代码拷贝/git操作/发布上线操作
- 标准化：项目创建/git flow/发布流程/回滚流程
- 数据化：研发过程系统化、数据化，使得研发过程可量化

### 和自动化构建工具区别

问题：jenkins、travis等自动化构建工具已经比较成熟了，为什么还需要自研脚手架？

- 不满足需求：jenkins、travis通常在git hooks中触发，需要在服务端执行，无法覆盖研发人员本地的功能，如：创建项目自动化、本地git操作自动化等。
- 定制复杂：jenkins、travis定制过程需要开发插件，其过程较为复杂，需要使用Java语言，对前端同学不够友好。

