import type * as Auth from './type'
import http from '@/utils/http'

const BASE_URL = '/auth'

/** @desc 账号登录 */
export function accountLogin(req: Auth.AccountLoginReq) {
  return http.post<Auth.LoginResp>(`${BASE_URL}/login`, req)
}

/** @desc 退出登录 */
export function logout() {
  return http.post(`${BASE_URL}/logout`)
}

/** @desc 获取用户信息 */
export const getUserInfo = () => {
  return http.get<Auth.UserInfo>(`${BASE_URL}/user/info`)
}

/** @desc 获取路由信息 */
export const getUserRoute = () => {
  return http.get<Auth.RouteItem[]>(`${BASE_URL}/route`)
}
