import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref(localStorage.getItem('userToken') || '')
  const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')

  // 用户登录
  const login = async (loginData) => {
    const response = await userApi.login(loginData)
    token.value = response.data.token
    userInfo.value = response.data
    localStorage.setItem('userToken', token.value)
    localStorage.setItem('isAdmin', response.data.isAdmin || false)
    return response
  }

  // 用户注册
  const register = async (registerData) => {
    const response = await userApi.register(registerData)
    token.value = response.data.token
    userInfo.value = response.data
    localStorage.setItem('userToken', token.value)
    return response
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const response = await userApi.getProfile()
    userInfo.value = response.data
    return response
  }

  // 退出登录
  const logout = () => {
    userInfo.value = null
    token.value = ''
    isAdmin.value = false
    localStorage.removeItem('userToken')
    localStorage.removeItem('isAdmin')
  }

  return {
    userInfo,
    token,
    isAdmin,
    login,
    register,
    getUserInfo,
    logout
  }
})