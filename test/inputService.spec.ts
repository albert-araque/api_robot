import { EDirection, EOrientation, ICoordinates } from '../src/types'
import { isValidInput, _private as inputServicePrivate, getCoordinates } from '../src/services/inputService'

describe('isValidInput', () => {
  it('Should be an invalid robot input', () => {
    const robotInput = 'LMMMRMMMSLRRMM'
    expect(isValidInput(robotInput)).toEqual(false)
  })
  it('Should be a valid robot input', () => {
    const robotInput = 'LMMMRMMMLRRMM'
    expect(isValidInput(robotInput)).toEqual(true)
  })
})

describe('changeDirection', () => {
  it('Should be facing north', () => {
    const command = EDirection.Left
    const currentOrientation = EOrientation.East
    expect(inputServicePrivate.changeDirection(command, currentOrientation)).toBe(EOrientation.North)
  })
  it('Should be facing north', () => {
    const command = 'L' as EDirection
    const currentOrientation = EOrientation.East
    expect(inputServicePrivate.changeDirection(command, currentOrientation)).toBe(EOrientation.North)
  })
  it('Should be facing east', () => {
    const command = EDirection.Left
    const currentOrientation = EOrientation.South
    expect(inputServicePrivate.changeDirection(command, currentOrientation)).toBe(EOrientation.East)
  })
  it('Should be facing south', () => {
    const command = EDirection.Right
    const currentOrientation = EOrientation.East
    expect(inputServicePrivate.changeDirection(command, currentOrientation)).toBe(EOrientation.South)
  })
  it('Should be facing west', () => {
    const command = EDirection.Left
    const currentOrientation = EOrientation.North
    expect(inputServicePrivate.changeDirection(command, currentOrientation)).toBe(EOrientation.West)
  })
})

describe('moveRobot', () => {
  it('Should be at coordinates X:0, Y:1', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.North
    expect(inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)).toEqual({ x: 0, y: 1 })
  })
  it('Should be at coordinates X:0, Y:9', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.South
    expect(inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)).toEqual({ x: 0, y: 9 })
  })
  it('Should be at coordinates X:1, Y:0', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.East
    expect(inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)).toEqual({ x: 1, y: 0 })
  })
  it('Should be at coordinates X:9, Y:0', () => {
    const initialCoordinates: ICoordinates = { x: 0, y: 0 }
    const currentOrientation: EOrientation = EOrientation.West
    expect(inputServicePrivate.moveRobot(initialCoordinates, currentOrientation)).toEqual({ x: 9, y: 0 })
  })
})

describe('parseCoordinates', () => {
  it('Coordinates should be 2:3:N', () => {
    const coordinates: ICoordinates = { x: 2, y: 3 }
    const orientation: EOrientation = EOrientation.North
    expect(inputServicePrivate.parseCoordinates(coordinates, orientation)).toEqual('2:3:N')
  })
  it('Coordinates should be 1:4:E', () => {
    const coordinates: ICoordinates = { x: 1, y: 4 }
    const orientation: EOrientation = EOrientation.East
    expect(inputServicePrivate.parseCoordinates(coordinates, orientation)).toEqual('1:4:E')
  })
  it('Coordinates should be 7:0:S', () => {
    const coordinates: ICoordinates = { x: 7, y: 0 }
    const orientation: EOrientation = EOrientation.South
    expect(inputServicePrivate.parseCoordinates(coordinates, orientation)).toEqual('7:0:S')
  })
  it('Coordinates should be 1:2:W', () => {
    const coordinates: ICoordinates = { x: 1, y: 2 }
    const orientation: EOrientation = EOrientation.West
    expect(inputServicePrivate.parseCoordinates(coordinates, orientation)).toEqual('1:2:W')
  })
})

describe('calculateRobotMovement', () => {
  it('Coordinates should be {x: 0, y: 2} and orientation North', () => {
    const commands = ['m', 'm']
    expect(inputServicePrivate.calculateRobotMovement(commands)).toEqual([{ x: 0, y: 2 }, 0])
  })
  it('Coordinates should be {x: 0, y: 0} and orientation West', () => {
    const commands = ['r', 'r', 'r']
    expect(inputServicePrivate.calculateRobotMovement(commands)).toEqual([{ x: 0, y: 0 }, 3])
  })
  it('Coordinates should be {x: 9, y: 2} and orientation East', () => {
    const commands = ['l', 'm', 'R', 'm', 'M', 'r']
    expect(inputServicePrivate.calculateRobotMovement(commands)).toEqual([{ x: 9, y: 2 }, 1])
  })
  it('Coordinates should be {x: 5, y: 3} and orientation North', () => {
    const commands = ['R', 'R', 'R', 'R', 'M', 'M', 'M', 'R', 'M', 'M', 'M', 'L', 'L', 'L', 'L', 'M', 'M', 'L']
    expect(inputServicePrivate.calculateRobotMovement(commands)).toEqual([{ x: 5, y: 3 }, 0])
  })
})

describe('getCoordinates', () => {
  it('Should return coordinates and orientation 2:3:N', () => {
    const robotInput = 'MMRMMLM'
    expect(getCoordinates(robotInput)).toEqual('2:3:N')
  })
  it('Should return coordinates and orientation 0:0:E', () => {
    const robotInput = 'RRl'
    expect(getCoordinates(robotInput)).toEqual('0:0:E')
  })
  it('Should return coordinates and orientation 0:0:W', () => {
    const robotInput = 'rrr'
    expect(getCoordinates(robotInput)).toEqual('0:0:W')
  })
  it('Should return coordinates and orientation 9:3:E', () => {
    const robotInput = 'lMmMRmMMlrRMM'
    expect(getCoordinates(robotInput)).toEqual('9:3:E')
  })
  it('Should return coordinates and orientation 4:4:W', () => {
    const robotInput = 'mmRmMlmMrmmRR'
    expect(getCoordinates(robotInput)).toEqual('4:4:W')
  })
})
