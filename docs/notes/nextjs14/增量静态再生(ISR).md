---
title: 增量静态再生(ISR)
author: 耶和博
createTime: 2024/08/10 20:48:04
permalink: /nextjs14/data-fetching/incremental-static-regeneration/
---

### **增量静态再生 (ISR)**

**示例**

*   [Next.js Commerce](https://vercel.com/templates/next.js/nextjs-commerce)
*   [按需 ISR](https://on-demand-isr.vercel.app/)
*   [Next.js Forms](https://github.com/vercel/next.js/tree/canary/examples/next-forms)

增量静态再生 (ISR) 使您能够:

*   更新静态内容而无需重建整个站点
*   通过为大多数请求提供预渲染的静态页面来减少服务器负载
*   确保自动为页面添加适当的 `cache-control` 头
*   处理大量内容页面而不会导致 `next build` 时间过长

以下是一个最小示例:

::: code-tabs
@tab app/blog/[id]/page.tsx
``` typescript
interface Post {
  id: string
  title: string
  content: string
}
 
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
export async function generateStaticParams() {
  let posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
  return posts.map((post) => ({
    id: post.id,
  }))
}
 
export default async function Page({ params }: { params: { id: string } }) {
  let post = await fetch(`https://api.vercel.app/blog/${params.id}`).then(
    (res) => res.json()
  )
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
```
@tab app/blog/[id]/page.jsx
``` javascript
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths
 
export async function generateStaticParams() {
  let posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) => res.json());
  return posts.map((post) => ({
    id: post.id,
  }));
}
 
export default async function Page({ params }: { params: { id: string } }) {
  let post = await fetch(`https://api.vercel.app/blog/${params.id}`).then((res) => res.json());
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
```
:::

这个示例的工作原理如下:

1.  在 `next build` 期间,生成所有已知的博客文章(本例中有25篇)
2.  对这些页面的所有请求(例如 `/blog/1`)都会被缓存并立即响应
3.  60秒过后,下一个请求仍会显示缓存的(过期)页面
4.  缓存失效,新版本的页面开始在后台生成
5.  一旦成功生成,Next.js 将显示并缓存更新后的页面
6.  如果请求 `/blog/26`,Next.js 将按需生成并缓存此页面

-----

### **参考**

#### **路由段配置**

*   [`revalidate`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate)
*   [`dynamicParams`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams)

#### **函数**

*   [`revalidatePath`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
*   [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

-----

### **示例**

#### **基于时间的重新验证**

这会在 `/blog` 上获取并显示博客文章列表。一小时后,该页面的缓存会在下次访问时失效。然后,在后台生成带有最新博客文章的新版本页面。

``` typescript
export const revalidate = 3600 // 每小时使缓存失效
 
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}
```

我们建议设置较长的重新验证时间。例如,1小时而不是1秒。如果您需要更精确的控制,请考虑使用按需重新验证。如果您需要实时数据,请考虑切换到[动态渲染](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)。

#### **使用 `revalidatePath` 进行按需重新验证**

为了获得更精确的重新验证方法,可以使用 `revalidatePath` 函数按需使页面失效。

例如,这个服务器操作会在添加新文章后被调用。无论您如何在服务器组件中检索数据(使用 `fetch` 或连接到数据库),这都将清除整个路由的缓存,并允许服务器组件获取新数据。

``` typescript
'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function createPost() {
  // 使缓存中的 /posts 路由失效
  revalidatePath('/posts')
}
```

[查看演示](https://on-demand-isr.vercel.app/)并[探索源代码](https://github.com/vercel/on-demand-isr)。

#### **使用 `revalidateTag` 进行按需重新验证**

对于大多数用例,最好重新验证整个路径。如果您需要更细粒度的控制,可以使用 `revalidateTag` 函数。例如,您可以标记单个 `fetch` 调用:

``` typescript
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog', {
    next: { tags: ['posts'] },
  })
  let posts = await data.json()
  // ...
}
```

如果您使用 ORM 或连接到数据库,可以使用 `unstable_cache`:

``` typescript
import { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'
 
const getCachedPosts = unstable_cache(
  async () => {
    return await db.select().from(posts)
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] }
)
 
export default async function Page() {
  let posts = getCachedPosts()
  // ...
}
```

然后,您可以在[服务器操作](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)或[路由处理程序](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)中使用 `revalidateTag`:

``` typescript
'use server'
 
import { revalidateTag } from 'next/cache'
 
export async function createPost() {
  // Invalidate all data tagged with 'posts' in the cache
  revalidateTag('posts')
}
```

#### **处理未捕获的异常**

如果在尝试重新验证数据时抛出错误,最后一次成功生成的数据将继续从缓存中提供。在下一次后续请求中,Next.js 将重试重新验证数据。[了解更多关于错误处理的信息](https://nextjs.org/docs/app/building-your-application/routing/error-handling)。

#### **自定义缓存位置**

缓存和重新验证页面(使用增量静态再生)使用相同的共享缓存。当[部署到 Vercel](https://vercel.com/docs/incremental-static-regeneration?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) 时,ISR 缓存会自动持久化到持久存储。

在自托管时,ISR 缓存存储在 Next.js 服务器的文件系统(磁盘)上。使用 Pages 和 App Router 进行自托管时,这都会自动工作。

如果您想将缓存的页面和数据持久化到持久存储,或在多个容器或 Next.js 应用程序实例之间共享缓存,可以配置 Next.js 缓存位置。[了解更多](https://nextjs.org/docs/app/building-your-application/deploying#caching-and-isr)。

-----

### **故障排除**

#### **在本地开发中调试缓存数据**

如果您使用 `fetch` API,可以添加额外的日志记录来了解哪些请求被缓存或未缓存。[了解更多关于 `logging` 选项的信息](https://nextjs.org/docs/app/api-reference/next-config-js/logging)。

::: code-tabs
@tab next.config.js
``` javascript
module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}
```
:::

#### **验证正确的生产行为**

要验证您的页面在生产环境中是否正确缓存和重新验证,您可以通过运行 `next build` 然后 `next start` 在本地测试,以运行生产 Next.js 服务器。

这将允许您测试 ISR 行为,就像在生产环境中一样。要进行进一步调试,请在 `.env` 文件中添加以下环境变量:

::: code-tabs
@tab .env
```shell
NEXT_PRIVATE_DEBUG_CACHE=1
```
:::

这将使 Next.js 服务器控制台记录 ISR 缓存命中和未命中。您可以检查输出,查看在 `next build` 期间生成了哪些页面,以及在按需访问路径时页面如何更新。

-----

### **注意事项**

* ISR 仅在使用 Node.js 运行时(默认)时受支持。
* 在创建[静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)时不支持 ISR。
* 如果在静态渲染的路由中有多个 `fetch` 请求,且每个请求的 `revalidate` 频率不同,则所有请求将使用最低的时间。
* 中间件不会为按需 ISR 请求执行,这意味着中间件中的任何路径重写或逻辑都不会应用。确保您重新验证的是确切路径。例如,使用 `/post/1` 而不是重写后的 `/post-1`。

-----

### **版本历史**

| 版本 | 变更 |
| --- | --- |
| `v14.1.0` | 自定义 `cacheHandler` 稳定。 |
| `v13.0.0` | 引入 App Router。 |
| `v12.2.0` | Pages Router: 按需 ISR 稳定 |
| `v12.0.0` | Pages Router: 添加[机器人感知 ISR 回退](https://nextjs.org/blog/next-12#bot-aware-isr-fallback)。 |
| `v9.5.0` | Pages Router: [引入稳定的 ISR](https://nextjs.org/blog/next-9-5)。 |