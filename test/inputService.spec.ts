import { EDirection, EOrientation, ICoordinates } from '../src/types'
import { isValidInput, _private as inputServicePrivate, getCoordinates } from '../src/services/inputService'

describe('isValidInput', () => {
  it('should be an invalid robot input', () => {
    const robotInput = 'LMMMRMMMSLRRMM'

    const result = isValidInput(robotInput)
    const expectedResult = false

    expect(result).toEqual(expectedResult)
  })

  it('should be a valid robot input', () => {
    const robotInput = 'LMMMRMMMLRRMM'

    const result = isValidInput(robotInput)
    const expectedResult = true

    expect(result).toEqual(expectedResult)
  })
})

describe('changeDirection', () => {
  it('should be facing north', () => {
    const command = EDirection.Left
    const currentOrientation = EOrientation.East

    const result = inputServicePrivate.changeDirection(command, currentOrientation)
    const expectedResult = EOrientation.North

    expect(result).toBe(expectedResult)
  })

  it('should be facing north', () => {
    const command = 'L' as EDirection
    const currentOrientation = EOrientation.East

    const result = inputServicePrivate.changeDirection(command, currentOrientation)
    const expectedResult = EOrientation.North

    expect(result).toBe(expectedResult)
  })

  it('should be facing east', () => {
    const command = EDirection.Left
    const currentOrientation = EOrientation.South

    const result = inputServicePrivate.changeDirection(command, currentOrientation)
    const expectedResult = EOrientation.East

    expect(result).toBe(expectedResult)
  })

  it('should be facing south', () => {
    const command = EDirection.Right
    const currentOrientation = EOrientation.East

    const result = inputServicePrivate.changeDirection(command, currentOrientation)
    const expectedResult = EOrientation.South

    expect(result).toBe(expectedResult)
  })

  it('should be facing west', () => {
    const command = EDirection.Left
    const currentOrientation = EOrientation.North

    const result = inputServicePrivate.changeDirection(command, currentOrientation)
    const expectedResult = EOrientation.West

    expect(result).toBe(expectedResult)
  })
})

describe('moveRobot', () => {
  it('should be at coordinates X:0, Y:1', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.North

    const result = inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)
    const expectedResult = { x: 0, y: 1 }

    expect(result).toEqual(expectedResult)
  })

  it('should be at coordinates X:0, Y:9', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.South

    const result = inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)
    const expectedResult = { x: 0, y: 9 }

    expect(result).toEqual(expectedResult)
  })

  it('should be at coordinates X:1, Y:0', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.East

    const result = inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)
    const expectedResult = { x: 1, y: 0 }

    expect(result).toEqual(expectedResult)
  })

  it('should be at coordinates X:9, Y:0', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.West

    const result = inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)
    const expectedResult = { x: 9, y: 0 }

    expect(result).toEqual(expectedResult)
  })
})

describe('parseCoordinates', () => {
  it('should be 2:3:N', () => {
    const coordinates: ICoordinates = { x: 2, y: 3 }
    const orientation: EOrientation = EOrientation.North

    const result = inputServicePrivate.parseCoordinates(coordinates, orientation)
    const expectedResult = '2:3:N'

    expect(result).toEqual(expectedResult)
  })

  it('should be 1:4:E', () => {
    const coordinates: ICoordinates = { x: 1, y: 4 }
    const orientation: EOrientation = EOrientation.East

    const result = inputServicePrivate.parseCoordinates(coordinates, orientation)
    const expectedResult = '1:4:E'

    expect(result).toEqual(expectedResult)
  })

  it('should be 7:0:S', () => {
    const coordinates: ICoordinates = { x: 7, y: 0 }
    const orientation: EOrientation = EOrientation.South

    const result = inputServicePrivate.parseCoordinates(coordinates, orientation)
    const expectedResult = '7:0:S'

    expect(result).toEqual(expectedResult)
  })

  it('should be 1:2:W', () => {
    const coordinates: ICoordinates = { x: 1, y: 2 }
    const orientation: EOrientation = EOrientation.West

    const result = inputServicePrivate.parseCoordinates(coordinates, orientation)
    const expectedResult = '1:2:W'

    expect(result).toEqual(expectedResult)
  })

  describe('calculateRobotMovement', () => {
    it('should be {x: 0, y: 2} and orientation North', () => {
      const commands = ['m', 'm']

      const result = inputServicePrivate.calculateRobotMovement(commands)
      const expectedResult = [{ x: 0, y: 2 }, 0]

      expect(result).toEqual(expectedResult)
    })

    it('should be {x: 0, y: 0} and orientation West', () => {
      const commands = ['r', 'r', 'r']

      const result = inputServicePrivate.calculateRobotMovement(commands)
      const expectedResult = [{ x: 0, y: 0 }, 3]

      expect(result).toEqual(expectedResult)
    })

    it('should be {x: 9, y: 2} and orientation East', () => {
      const commands = ['l', 'm', 'R', 'm', 'M', 'r']

      const result = inputServicePrivate.calculateRobotMovement(commands)
      const expectedResult = [{ x: 9, y: 2 }, 1]

      expect(result).toEqual(expectedResult)
    })

    it('should be {x: 5, y: 3} and orientation North', () => {
      const commands = ['R', 'R', 'R', 'R', 'M', 'M', 'M', 'R', 'M', 'M', 'M', 'L', 'L', 'L', 'L', 'M', 'M', 'L']

      const result = inputServicePrivate.calculateRobotMovement(commands)
      const expectedResult = [{ x: 5, y: 3 }, 0]

      expect(result).toEqual(expectedResult)
    })
  })

  describe('getCoordinates', () => {
    it('should return coordinates and orientation 2:3:N', () => {
      const robotInput = 'MMRMMLM'

      const result = getCoordinates(robotInput)
      const expectedResult = '2:3:N'

      expect(result).toEqual(expectedResult)
    })

    it('should return coordinates and orientation 0:0:E', () => {
      const robotInput = 'RRl'

      const result = getCoordinates(robotInput)
      const expectedResult = '0:0:E'

      expect(result).toEqual(expectedResult)
    })

    it('should return coordinates and orientation 0:0:W', () => {
      const robotInput = 'rrr'

      const result = getCoordinates(robotInput)
      const expectedResult = '0:0:W'

      expect(result).toEqual(expectedResult)
    })

    it('should return coordinates and orientation 9:3:E', () => {
      const robotInput = 'lMmMRmMMlrRMM'

      const result = getCoordinates(robotInput)
      const expectedResult = '9:3:E'

      expect(result).toEqual(expectedResult)
    })

    it('should return coordinates and orientation 4:4:W', () => {
      const robotInput = 'mmRmMlmMrmmRR'

      const result = getCoordinates(robotInput)
      const expectedResult = '4:4:W'

      expect(result).toEqual(expectedResult)
    })
  })
})
