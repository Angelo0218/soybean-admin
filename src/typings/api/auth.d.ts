declare namespace Api {
  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    /** Internal token format used by SoybeanAdmin */
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    /** Internal user info format used by SoybeanAdmin */
    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }

    /** Backend login response (inside data wrapper) */
    interface BackendLoginResponse {
      user: BackendUser;
      tokens: BackendTokens;
    }

    /** Backend token structure */
    interface BackendTokens {
      access_token: string;
      refresh_token: string;
      token_type: string;
      expires_in: number;
    }

    /** Backend user structure from /auth/me and login */
    interface BackendUser {
      id: number;
      name: string;
      email: string;
      role_level: 'admin' | 'agent' | 'merchant';
      merchant_code: string | null;
      mfa_enabled: boolean;
      roles: string[];
      permissions: string[];
      last_login_at: string | null;
      last_login_ip: string | null;
      merchant: Record<string, unknown> | null;
    }
  }
}
