/// <reference types="vite/client" />

interface ImportMetaEnv {
  SITE_ENV: string,
  SITE_CODE: string,
  SITE_TITLE: string,
  SITE_THEME: string,
  SITE_KEY: string,
  SITE_SECRET_VERSION: string,
  SITE_ENCRYPTED: string,
  SITE_BASE_API: string,
  SITE_MERCHANT_ID: string,
  SITE_CURRENCY: string,
  SITE_FINGERPRINT_ENDPOINT: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}