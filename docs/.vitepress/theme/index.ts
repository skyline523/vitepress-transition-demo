import { watch } from 'vue'
import { inBrowser, EnhanceAppContext } from 'vitepress'
import defaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './styles/index.css'

let homePageStyle: HTMLStyleElement | undefined

const theme: Theme = {
  ...defaultTheme,
  enhanceApp({ router }: EnhanceAppContext) {
    if (inBrowser) {
      watch(
        () => router.route.data.relativePath,
        () => {
          updateHomePageStyle(location.pathname === '/')
        },
        { immediate: true }
      )
    }
  }
}

function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

export default theme
