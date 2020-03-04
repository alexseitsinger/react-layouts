/**
 * When we run jest, our global objec tis actually called Window, so checking
 * for that will always fail. Therefore, we need to check for a number of other
 * Node-based variables to assert the environment.
 */

const hasGlobal = typeof global !== "undefined"

const hasProcess = typeof process !== "undefined"
const processName = hasProcess ? {}.toString.call(process) : ""
const hasProcessNamedProcess = processName === "[object process]"
const hasProcessRelease = hasProcess && typeof process.release !== "undefined"
const hasProcessReleaseName
  = hasProcessRelease && typeof process.release.name !== "undefined"
const hasProcessReleaseNamedNode
  = hasProcess
  && hasProcessNamedProcess
  && hasProcessRelease
  && hasProcessReleaseName
  && process.release.name === "node"

const hasWindow = typeof window !== "undefined"
const hasDocument = typeof document !== "undefined"

export const isNode = hasGlobal && hasProcessReleaseNamedNode

export const isBrowser = !isNode && hasWindow && hasDocument

export const isNullish = (o?: any): boolean => typeof o === "undefined" || o === null

export const isDefined = (o?: any): boolean => !isNullish(o)
