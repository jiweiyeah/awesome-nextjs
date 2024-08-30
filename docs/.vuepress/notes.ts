// 文档组配置
/*
notes.ts: 配置对应navbar下的左侧子菜单,items[]自动解析
*/
import { definePlumeNotesConfig } from 'vuepress-theme-plume'

export const myNotes = definePlumeNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        {
            dir: 'nextjs14/',
            link: '/nextjs14/',
            sidebar: [
                {
                    text: '开始',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['安装', '项目结构', '构建应用程序'],
                },
                {
                    text: '路由',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['路由基础知识', '定义路由', '页面', '布局和模板', '链接和导航', '错误处理', '加载UI和流式传输', '重定向', '路由组', '项目组织', '动态路由', '并行路由', '拦截路由', '路由处理', '中间件', '国际化'],
                },
                {
                    text: '数据获取',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['数据获取和缓存', '服务器操作和变更', '增量静态再生(ISR)'],
                },
                {
                    text: '渲染',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['渲染', '服务器组件', '客户端组件', '构图模式', '部分预渲染', '运行时'],
                },
                {
                    text: '缓存',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['缓存'],
                },
                {
                    text: '样式',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['样式', 'CSS', 'Tailwind CSS', 'Sass', 'CSS-in-JS'],
                },
                {
                    text: '优化',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['优化', '图片', '视频', '字体', '元数据', '脚本', '软件包捆绑', '懒加载', '分析', '埋点', '开放遥测', '静态资产', '第三方库', '内存使用情况'],
                },
                {
                    text: '配置',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['配置', 'TypeScript', 'ESLint', '环境变量', '绝对导入和模块路径别名', 'MDX', 'src目录', '自定义服务器', '草稿模式', '内容安全策略'],
                },
                {
                    text: '测试',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['测试', 'Vitest', 'Jest', 'Playwright', 'Cypress'],
                },
                {
                    text: '验证',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['验证'],
                },
                {
                    text: '部署',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['部署', '生产检查表', '静态导出', '多区域'],
                },
                {
                    text: '升级',
                    collapsed: false,
                    icon: 'tabler:tools',
                    items: ['升级', '代码修改', '版本15', '版本14', 'App Router增量采用指南', '从Create React App迁移', '从Vite迁移'],
                },
            ],
        }
    ],
})