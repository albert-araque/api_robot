const isValidInput = (robotInput: string): boolean => {
  return /^[LRMlrm]+$/.test(robotInput)
}

export default isValidInput
