import { request } from '../request';

/**
 * Login
 *
 * @param email User email
 * @param password Password
 */
export function fetchLogin(email: string, password: string) {
  return request<Api.Auth.BackendLoginResponse>({
    url: '/auth/login',
    method: 'post',
    data: {
      email,
      password,
      device_name: 'web'
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.BackendUser>({ url: '/auth/me' });
}

/**
 * Refresh token
 *
 * Backend expects refresh_token in Authorization header
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.BackendTokens>({
    url: '/auth/refresh',
    method: 'post',
    headers: {
      Authorization: `Bearer ${refreshToken}`
    },
    // Prevent onBackendFail from treating refresh 401 as "token expired" (infinite loop)
    _skipAuthRetry: true
  } as any);
}

/** Logout (best-effort, skip 401 handling to prevent recursion) */
export function fetchLogout(token: string) {
  return request<null>({
    url: '/auth/logout',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`
    },
    _skipAuthRetry: true
  } as any);
}
