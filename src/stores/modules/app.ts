import { defineStore } from 'pinia'
import { computed, reactive, toRefs } from 'vue'
import { generate, getRgbStr } from '@arco-design/color'
import type { BasicConfig } from '@/apis'
import defaultSettings from '@/config/setting.json'

const storeSetup = () => {
  // App配置
  const settingConfig = reactive({ ...defaultSettings }) as App.SettingConfig
  // 页面切换动画类名
  const transitionName = computed(() => (settingConfig.animate ? settingConfig.animateMode : ''))

  // 深色菜单主题色变量
  const themeCSSVar = computed<Record<string, string>>(() => {
    const obj: Record<string, string> = {}
    const list = generate(settingConfig.themeColor, { list: true, dark: true })
    list.forEach((color: string, index: number) => {
      obj[`--primary-${index + 1}`] = getRgbStr(color)
    })
    return obj
  })

  // 设置主题色
  const setThemeColor = (color: string) => {
    if (!color) return
    settingConfig.themeColor = color
    const list = generate(settingConfig.themeColor, { list: true, dark: settingConfig.theme === 'dark' })
    list.forEach((color: string, index: number) => {
      const rgbStr = getRgbStr(color)
      document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
    })
  }

  // 切换主题 暗黑模式|简白模式
  const toggleTheme = (dark: boolean) => {
    if (dark) {
      settingConfig.theme = 'dark'
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      settingConfig.theme = 'light'
      document.body.removeAttribute('arco-theme')
    }
    setThemeColor(settingConfig.themeColor)
  }

  // 初始化主题
  const initTheme = () => {
    if (!settingConfig.themeColor) return
    setThemeColor(settingConfig.themeColor)
  }

  // 设置左侧菜单折叠状态
  const setMenuCollapse = (collapsed: boolean) => {
    settingConfig.menuCollapse = collapsed
  }

  // 系统配置配置
  const siteConfig = reactive({}) as BasicConfig

  // 设置系统配置
  const setSiteConfig = (config: BasicConfig) => {
    Object.assign(siteConfig, config)
    document.title = config.SITE_TITLE || ''
    document.querySelector('link[rel="shortcut icon"]')?.setAttribute('href', config.SITE_FAVICON || '/favicon.ico')
  }

  const getFavicon = () => {
    return siteConfig.SITE_FAVICON
  }

  const getLogo = () => {
    return siteConfig.SITE_LOGO
  }

  const getTitle = () => {
    return siteConfig.SITE_TITLE
  }

  const getCopyright = () => {
    return siteConfig.SITE_COPYRIGHT
  }

  return {
    ...toRefs(settingConfig),
    ...toRefs(siteConfig),
    transitionName,
    themeCSSVar,
    toggleTheme,
    setThemeColor,
    initTheme,
    setMenuCollapse,
    setSiteConfig,
    getFavicon,
    getLogo,
    getTitle,
    getCopyright
  }
}

export const useAppStore = defineStore('app', storeSetup, { persist: true })
