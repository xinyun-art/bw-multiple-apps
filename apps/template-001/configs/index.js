const { site_code, site_env } = process.env

const module = await import(`./sites/${site_code}/${site_env}.js`)

export const siteEnvConfigs = module.default

export const normalizeConfigs = (configs, prefix = '') => {
  const normalizeConfigs = {}
  Object.keys(configs).forEach((key) => {
    normalizeConfigs[prefix + key] = JSON.stringify(configs[key])
  })
  return normalizeConfigs
}
