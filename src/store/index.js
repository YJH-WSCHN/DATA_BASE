import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: true
    },
    userInfo: null
  }),
  
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
    },
    
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    }
  }
})