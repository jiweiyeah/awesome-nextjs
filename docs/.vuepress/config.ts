// 核心配置
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {plumeTheme} from 'vuepress-theme-plume'
import {myNavbar} from "./navbar";
import {myNotes} from './notes.js'
// import {iconifyPlugin} from "@vuepress-plume/plugin-iconify";

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'NEXT.JS 14中文文档',
    theme: plumeTheme({
        profile: {
            name: '耶和博',
            description: 'next.js14中文文档',
            // avatar: '/images/avatar.png',
            // circle: true,
        },
        notes: myNotes,
        navbar: myNavbar,
        footer: {copyright: 'Copyright © 2024-present 耶和博'},
    }),
    bundler: viteBundler(),
    // plugins: [
    //     iconifyPlugin({
    //         componentName: 'Iconify'
    //     })
    // ]
})