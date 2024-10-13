const THEME_MAP = {
  '001': {
    '--color-1': 'x1',
    '--color-2': 'x2',
  },
  '002': {
    '--color-1': 'x1',
    '--color-2': 'x2',
  }
}

export type ThemeMapType = typeof THEME_MAP

export type ThemeType = keyof ThemeMapType

export type KeysOfAnyType = keyof any

export function setTheme(theme: ThemeType): void {
  const rootElement = document.documentElement
  const themeData = THEME_MAP[theme]
  setCSSVariables(rootElement, themeData)
}

export function setCSSVariables(element: HTMLElement, variables: typeof THEME_MAP['001']) {
  for (const variable in variables) {
    if (Object.prototype.hasOwnProperty.call(variables, variable)) {
      element.style.setProperty(variable, variables[variable as keyof (typeof THEME_MAP['001'])])
    }
  }
}
