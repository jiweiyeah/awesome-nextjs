// 核心配置
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'
import { myNavbar } from "./navbar";
import { myNotes } from './notes.js'
// import {iconifyPlugin} from "@vuepress-plume/plugin-iconify";

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Next.js 中文文档',
    description: 'next.js14中文文档，next.js14中文教程',
    head: [
        ['link', { rel: 'icon', type: 'image/jpg', sizes: '32x32', href: '/images/favicon.jpg' }],
        ['link', { rel: 'icon', type: 'image/jpg', sizes: '16x16', href: '/images/favicon.jpg' }],
        ['meta', { name: 'google-site-verification', content: 'X5YSaTDn-pKqQBUKD_05_dQcxVItzEq7Rlbg2ZEU7AM' }],
      ],
    theme: plumeTheme({
        hostname: 'https://nextjs.freeourdays.com',
        profile: {
            name: '耶和博',
            description: 'next.js14中文文档',
        },
        notes: myNotes,
        navbar: myNavbar,
        footer: { copyright: 'Copyright © 2024 耶和博' },
        plugins: {
            shiki: {
                languages: ['javascript', 'typescript', 'vue', 'bash', 'sh'],
            },
            comment: {
                provider: 'Giscus',
                comment: true,
                repo: 'jiweiyeah/awesome-nextjs',
                repoId: 'R_kgDOMhtV5w',
                category: 'Announcements',
                categoryId: 'DIC_kwDOMhtV584ChkB4',
                mapping: 'pathname',
                reactionsEnabled: true,
                inputPosition: 'top',
                darkTheme: 'dark_protanopia',
                lightTheme: 'light_protanopia', 
            },
        }
    }),
    bundler: viteBundler()
})