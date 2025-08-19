/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_VAULT_NAME: string
  readonly MAIN_VITE_VAULT_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}