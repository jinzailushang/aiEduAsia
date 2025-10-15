export const siteConfig = {
  name: 'AI 编程教育',
  description: 'AI 驱动的付费编程教育平台',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-edu.asia',
  ogImage: 'https://ai-edu.asia/og.jpg',
  links: {
    twitter: 'https://twitter.com/aieduasia',
    github: 'https://github.com/aieduasia',
  },
}

export const navConfig = {
  mainNav: [
    {
      title: '首页',
      href: '/',
    },
    {
      title: '课程',
      href: '/courses',
    },
    {
      title: '关于',
      href: '/about',
    },
  ],
}
