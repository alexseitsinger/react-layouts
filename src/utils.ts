/**
 * https://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js
 */

/**
 * When we run jest, our global objec tis actually called Window, so checking
 * for that will always fail. Therefore, we need to check for a number of other
 * Node-based variables to assert the environment.
 */

const hasGlobal = typeof global !== "undefined"
const globalName = hasGlobal ? {}.toString.call(global) : ""
const hasGlobalNamedWindow = globalName === "[object Window]"
const hasGlobalNamedGlobal = globalName === "[object global]"

const hasProcess = typeof process !== "undefined"
const processName = hasProcess ? {}.toString.call(process) : ""
const hasProcessNamedProcess = processName === "[object process]"
const hasProcessRelease = hasProcess && typeof process.release !== "undefined"
const hasProcessReleaseName =
  hasProcessRelease && typeof process.release.name !== "undefined"
const hasProcessReleaseNamedNode =
  hasProcess &&
  hasProcessNamedProcess &&
  hasProcessRelease &&
  hasProcessReleaseName &&
  process.release.name === "node"

const hasModule = typeof module !== "undefined"
const hasModuleExports = hasModule && typeof module.exports !== "undefined"

const hasWindow = typeof window !== "undefined"
const hasDocument = typeof document !== "undefined"

const thisName = {}.toString.call(this)
const thisNamedWindow = thisName === "[object Window]"

export const isNode =
  hasGlobal &&
  (hasGlobalNamedGlobal || hasGlobalNamedWindow) &&
  hasProcessReleaseNamedNode &&
  hasModule &&
  hasModuleExports

export const isBrowser = !isNode && hasWindow && hasDocument && thisNamedWindow

export const isNullish = (o?: any): boolean => {
  return typeof o === "undefined" || o === null
}

export const isDefined = (o?: any): boolean => !isNullish(o)
