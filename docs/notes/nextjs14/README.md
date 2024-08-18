---
title: 开始学习前说明
author: 耶和博
createTime: 2024/08/10 17:30:23
permalink: /nextjs14/
---

### **介绍**

欢迎阅读 Next.js 文档！

--------------------------------------------

### **什么是 Next.js？**

Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。你可以使用 React 组件来构建用户界面，并使用 Next.js 提供的附加功能和优化来增强应用程序。

在底层，Next.js 还抽象并自动配置了 React 所需的工具，例如打包、编译等。这样，你可以专注于构建应用程序，而不必花费时间进行配置。

无论你是个人开发者还是团队的一员，Next.js 都可以帮助你构建交互式、动态和快速的 React 应用程序。

------------------------------------

### **主要功能**

Next.js 的一些主要功能包括：

| 功能 | 描述 |
| --- | --- |
| [路由](https://nextjs.org/docs/app/building-your-application/routing) | 基于文件系统的路由器，构建在 Server Components 之上，支持布局、嵌套路由、加载状态、错误处理等功能。 |
| [渲染](https://nextjs.org/docs/app/building-your-application/rendering) | 支持客户端和服务器端渲染，结合客户端和服务器组件。通过静态和动态渲染进一步优化，在服务器端使用 Next.js 实现。支持在 Edge 和 Node.js 运行时上的流式渲染。 |
| [数据获取](https://nextjs.org/docs/app/building-your-application/data-fetching) | 使用 Server Components 中的 async/await 简化数据获取，并扩展 `fetch` API 以进行请求缓存、数据缓存和重新验证。 |
| [样式](https://nextjs.org/docs/app/building-your-application/styling) | 支持各种样式方法，包括 CSS Modules、Tailwind CSS 和 CSS-in-JS。 |
| [优化](https://nextjs.org/docs/app/building-your-application/optimizing) | 提供图像、字体和脚本优化，以改善应用程序的核心 Web 体验和用户体验。 |
| [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) | 提供对 TypeScript 的改进支持，包括更好的类型检查和更高效的编译，以及自定义 TypeScript 插件和类型检查器。 |

--------------------------------------------------

### **如何使用这些文档**

在屏幕左侧，你会看到文档导航栏。文档页面按顺序组织，从基础到高级，因此你可以在构建应用程序时按步骤阅读。然而，你也可以按任意顺序阅读，或跳过与您使用场景相关的页面。

在屏幕右侧，你会看到一个目录，使你更容易在页面各部分之间导航。如果你需要快速找到某个页面，可以使用顶部的搜索栏，或使用搜索快捷键（`Ctrl+K` 或 `Cmd+K`）。

要开始使用，请查看[安装指南](https://nextjs.org/docs/getting-started/installation)。

-------------------------------------------------------------

### **应用路由与页面路由**

Next.js 有两种不同的路由器：应用路由器和页面路由器。应用路由器是一个较新的路由器，允许你使用 React 的最新功能，例如 Server Components 和流式处理。页面路由器是原始的 Next.js 路由器，允许你构建服务器渲染的 React 应用程序，并继续支持较旧的 Next.js 应用程序。

在侧边栏顶部，你会看到一个下拉菜单，可以在 **应用路由器** 和 **页面路由器** 功能之间切换。由于每个目录都有其独特的功能，因此保持关注所选的标签非常重要。

页面顶部的面包屑导航也会指示你正在查看应用路由文档还是页面路由文档。

----------------------------------------------

### **预备知识**

尽管我们的文档旨在对初学者友好，但我们需要建立一个基础，以便文档能够专注于 Next.js 功能。每当引入新概念时，我们会确保提供相关文档的链接。

为了最大程度地利用我们的文档，建议你具备 HTML、CSS 和 React 的基本理解。如果你需要复习 React 技能，可以查看我们的 [React 基础课程](https://nextjs.org/learn/react-foundations)，该课程将向你介绍基础知识。然后，通过[构建仪表板应用程序](https://nextjs.org/learn/dashboard-app)进一步了解 Next.js。

-----------------------------------

### **可访问性**

为了在使用屏幕阅读器阅读文档时获得最佳的可访问性，我们建议使用 Firefox 和 NVDA，或 Safari 和 VoiceOver。

---------------------------------------------

### **加入我们的社区**

如果你对 Next.js 的任何内容有疑问，欢迎随时在 [GitHub 讨论区](https://github.com/vercel/next.js/discussions)、[Discord](https://discord.com/invite/bUG2bvbtHy)、[Twitter](https://x.com/nextjs) 和 [Reddit](https://www.reddit.com/r/nextjs) 上向我们的社区提问。