import request from './request'

// 用户认证
export const userApi = {
  // 用户注册
  register: (data) => request.post('/user/register', data),
  
  // 用户登录
  login: (data) => request.post('/user/login', data),
  
  // 获取用户信息
  getProfile: () => request.get('/user/profile'),
  
  // 更新用户信息
  updateProfile: (data) => request.put('/user/profile', data)
}

// 活动相关
export const eventApi = {
  // 获取活动列表
  getEventList: (params) => request.get('/user/event/list', { params }),
  
  // 获取活动详情
  getEventDetail: (id) => request.get(`/user/event/detail/${id}`)
}

// 订单相关
export const orderApi = {
  // 提交订单
  submitOrder: (data) => request.post('/user/order/submit', data),
  
  // 支付订单
  payOrder: (data) => request.put('/user/order/payment', data),
  
  // 获取订单列表
  getOrderList: (params) => request.get('/user/order/list', { params }),
  
  // 取消订单
  cancelOrder: (id) => request.put(`/user/order/cancel/${id}`)
}

// 管理员API
export const adminApi = {
  login: (data) => request.post('/admin/login', data),
  createEvent: (data) => request.post('/admin/event', data),
  updateEvent: (id, data) => request.put(`/admin/event/${id}`, data),
  addTicketType: (data) => request.post('/admin/ticket/type', data),
  getOrderList: (params) => request.get('/admin/order/list', { params }),
  refundOrder: (id, data) => request.put(`/admin/order/refund/${id}`, data),
  getStatistics: () => request.get('/admin/statistics/overview')
}