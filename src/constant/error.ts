/**
 * enum which contains all existing error code
 */
export enum Code {
  /**
   * unknown `arg`
   */
  UNKNOWN_ARG = "C200",

  /**
   * unknown `cmd`
   */
  UNKNOWN_CMD = "C201",

  /**
   * duplicate `arg`
   */
  DUPLICATED_ARG = "C300",

  /**
   * duplicate `cmd`
   */
  DUPLICATED_CMD = "C301",

  /**
   * arg constraint `violation`
   */
  ARG_CONSTRAINT_VIOLATION = "C400",


  /**
   * missing arg value `violation`
   */
  MISSING_ARG = "C402",

  /**
   * unexpected `arg`
   */
  UNEXPECTED_ARG = "C600",
}
