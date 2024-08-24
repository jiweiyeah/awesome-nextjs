---
title: 加载UI和流式传输
author: 耶和博
createTime: 2024/08/10 20:48:04
permalink: /nextjs14/routing/loading-ui-and-streaming/
---

### **加载UI和流式传输**

特殊文件`loading.js`可以帮助你使用[React Suspense](https://react.dev/reference/react/Suspense)创建有意义的加载UI。通过这个约定,你可以在路由段的内容加载时从服务器显示[即时加载状态](about:blank#instant-loading-states)。一旦渲染完成,新内容会自动替换。

![加载UI](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-ui.png&w=3840&q=75)

-----

### **即时加载状态**

即时加载状态是在导航时立即显示的备用UI。你可以预渲染加载指示器,如骨架屏和旋转器,或未来屏幕的一小部分但有意义的内容,如封面照片、标题等。这有助于用户理解应用正在响应,并提供更好的用户体验。

通过在文件夹内添加`loading.js`文件来创建加载状态。

![loading.js特殊文件](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-special-file.png&w=3840&q=75)

::: code-tabs
@tab app/dashboard/loading.tsx
```typescript
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```
@tab app/dashboard/loading.js
```javascript
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```
:::

在同一文件夹中,`loading.js`将嵌套在`layout.js`内部。它会自动将`page.js`文件和下面的任何子组件包裹在一个`<Suspense>`边界中。

![loading.js概览](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-overview.png&w=3840&q=75)

:::warning
* 导航是即时的,即使使用[服务器中心路由](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works)。
* 导航是可中断的,这意味着在导航到另一个路由时,不需要等待路由内容完全加载。
* 在新的路由段加载时,共享布局保持交互性。
:::
:::tip
对路由段(布局和页面)使用`loading.js`约定,因为Next.js对此功能进行了优化。
:::

-----

### **使用Suspense进行流式传输**

除了`loading.js`外,你还可以为自己的UI组件手动创建Suspense边界。App Router支持[Node.js和Edge运行时](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)的[Suspense](https://react.dev/reference/react/Suspense)流式传输。

:::tip
* [一些浏览器](https://bugs.webkit.org/show_bug.cgi?id=252413)会缓冲流式响应。你可能要等到响应超过1024字节才能看到流式响应。这通常只影响"hello world"应用,而不影响实际应用。
:::

#### **什么是流式传输?**

要了解流式传输在React和Next.js中如何工作,了解**服务器端渲染(SSR)**及其限制很有帮助。

使用SSR时,在用户能够看到并与页面交互之前,需要完成一系列步骤:

1. 首先,在服务器上获取给定页面的所有数据。
2. 然后服务器渲染页面的HTML。
3. 页面的HTML、CSS和JavaScript被发送到客户端。
4. 使用生成的HTML和CSS显示非交互式用户界面。
5. 最后,React[水合](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)用户界面,使其变得可交互。

![显示没有流式传输的服务器渲染的图表](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-without-streaming-chart.png&w=3840&q=75)

这些步骤是顺序的和阻塞的,这意味着服务器只能在获取所有数据后才能渲染页面的HTML。而在客户端,只有在下载了页面中所有组件的代码后,React才能水合UI。

使用React和Next.js的SSR通过尽快向用户显示非交互式页面来帮助改善感知加载性能。

![没有流式传输的服务器渲染](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-without-streaming.png&w=3840&q=75)

然而,它仍然可能很慢,因为在向用户显示页面之前,需要完成服务器上的所有数据获取。

**流式传输**允许你将页面的HTML分解成更小的块,并从服务器逐步将这些块发送到客户端。

![流式传输的服务器渲染如何工作](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-with-streaming.png&w=3840&q=75)

这使得页面的部分内容可以更快地显示,而不需要等待所有数据加载完毕才能渲染任何UI。

流式传输与React的组件模型配合得很好,因为每个组件都可以被视为一个块。优先级较高的组件(例如产品信息)或不依赖数据的组件可以先发送(例如布局),React可以更早地开始水合。优先级较低的组件(例如评论、相关产品)可以在数据获取完成后在同一服务器请求中发送。

![显示流式传输的服务器渲染的图表](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75)

当你想防止长时间的数据请求阻塞页面渲染时,流式传输特别有益,因为它可以减少[首字节时间(TTFB)](https://web.dev/ttfb/)和[首次内容绘制(FCP)](https://web.dev/first-contentful-paint/)。它还有助于改善[可交互时间(TTI)](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/),尤其是在较慢的设备上。

#### **示例**

`<Suspense>`的工作原理是包装执行异步操作(例如获取数据)的组件,在操作进行时显示备用UI(例如骨架屏、旋转器),然后在操作完成后替换为你的组件。

::: code-tabs
@tab app/dashboard/page.tsx
```typescript
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```
@tab app/dashboard/page.js
```javascript
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```
:::

通过使用Suspense,你可以获得以下好处:

1. **流式服务器渲染** - 从服务器到客户端逐步渲染HTML。
2. **选择性水合** - React根据用户交互优先考虑先让哪些组件变得可交互。

有关Suspense的更多示例和用例,请参阅[React文档](https://react.dev/reference/react/Suspense)。

#### **SEO**

* Next.js会等待[`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)内的数据获取完成,然后才将UI流式传输到客户端。这保证了流式响应的第一部分包含`<head>`标签。
* 由于流式传输是服务器渲染的,所以它不会影响SEO。你可以使用Google的[富结果测试](https://search.google.com/test/rich-results)工具来查看你的页面在Google网络爬虫中的显示方式,并查看序列化的HTML([来源](https://web.dev/rendering-on-the-web/#seo-considerations))。

#### **状态码**

在流式传输时,将返回`200`状态码,表示请求成功。

服务器仍然可以在流式内容本身中向客户端传达错误或问题,例如,当使用[`redirect`](https://nextjs.org/docs/app/api-reference/functions/redirect)或[`notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)时。由于响应头已经发送到客户端,因此无法更新响应的状态码。这不会影响SEO。