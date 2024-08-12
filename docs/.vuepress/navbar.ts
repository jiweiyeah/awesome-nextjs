// 导航栏配置
import type {NavItem} from 'vuepress-theme-plume'

export const myNavbar = [
    {text: '首页', link: '/', icon: 'material-symbols:home-outline'},
    {
        text: 'Next.js 14',
        icon: 'icon-park-outline:guide-board',
        link: '/nextjs14/',
        activeMatch: '^/nextjs14/',
      },
    // {
    //     text: '博客',
    //     link: '/blog/',
    //     icon: 'material-symbols:article-outline',
    //     activeMatch: '^/(blog|article)/',
    // },
    // {
    //     text: '笔记',
    //     icon: 'material-symbols:book-2',
    //     items: [
    //         {text: 'test1', link: '/test1/', icon: 'logos:vue'},
    //         {text: 'test2', link: '/test2/', icon: 'logos:react',},
    //     ],
    // },
] as NavItem[]
