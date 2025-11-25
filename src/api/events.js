import request from '@/utils/request'

export const getEventList = (params) => {
  return request({
    url: '/admin/event/list',
    method: 'get',
    params
  })
}

export const getEventDetail = (id) => {
  return request({
    url: `/admin/event/${id}`,
    method: 'get'
  })
}

export const createEvent = (data) => {
  return request({
    url: '/admin/event',
    method: 'post',
    data
  })
}

export const updateEvent = (id, data) => {
  return request({
    url: `/admin/event/${id}`,
    method: 'put',
    data
  })
}

export const deleteEvent = (id) => {
  return request({
    url: `/admin/event/${id}`,
    method: 'delete'
  })
}