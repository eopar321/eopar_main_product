import type { CollectionConfig } from 'payload'

// Staff accounts for EOPAR Studio. Roles, permission codes and TOTP 2FA arrive in Phase 2.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    // 30-minute session (brief §8)
    tokenExpiration: 30 * 60,
    cookies: {
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  fields: [],
}
