/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SITE_ENV: string
  readonly SITE_CODE: string
  readonly SITE_TITLE: string
  readonly SITE_THEME: string
  readonly SITE_KEY: string
  readonly SITE_SECRET_VERSION: string
  readonly SITE_ENCRYPTED: string
  readonly SITE_BASE_API: string
  readonly SITE_MERCHANT_ID: string
  readonly SITE_CURRENCY: string
  readonly SITE_FINGERPRINT_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
