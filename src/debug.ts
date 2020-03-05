const isProduction = process.env.NODE_ENV === "production"

interface Config {
  debugMessages: boolean
}

let config: Config = {
  debugMessages: false,
}

export const setConfig = (o: Config): void => {
  config = {
    ...config,
    ...o,
  }
}

export const debugMessage = (text: string): void => {
  if (isProduction) {
    return
  }
  if (config.debugMessages) {
    console.log(`[react-layouts]: ${text}`)
  }
}
