import { EDirection, EOrientation, ICoordinates } from '../types'

export const getCoordinates = (robotInput: string): string => {
  const commands = robotInput.split('')
  const [coordinates, orientation] = calculateRobotMovement(commands)
  const finalCoordinates = parseCoordinates(coordinates, orientation)

  return finalCoordinates
}

export const isValidInput = (robotInput: string): boolean => {
  return /^[LRMlrm]+$/.test(robotInput)
}

const calculateRobotMovement = (commands: string[]): [ICoordinates, EOrientation] => {
  let coordinates: ICoordinates = { x: 0, y: 0 }
  let orientation: EOrientation = EOrientation.North

  commands.forEach((command) => {
    const commandIsADirection = Object.values(EDirection).includes(command.toLocaleUpperCase() as EDirection)
    if (commandIsADirection) {
      orientation = changeDirection(command.toLocaleUpperCase() as EDirection, orientation)
    } else {
      coordinates = moveRobot(coordinates, orientation)
    }
  })

  return [coordinates, orientation]
}

const changeDirection = (command: EDirection, orientation: EOrientation): EOrientation => {
  if (command === EDirection.Right) {
    orientation = (orientation + 1) % 4
  } else {
    orientation = (orientation - 1 + 4) % 4
  }

  return orientation
}

const moveRobot = (coordinates: ICoordinates, orientation: EOrientation): ICoordinates => {
  if (orientation === EOrientation.North) return { ...coordinates, y: (coordinates.y + 1) % 10 }
  if (orientation === EOrientation.South) return { ...coordinates, y: (coordinates.y - 1 + 10) % 10 }
  if (orientation === EOrientation.East) return { ...coordinates, x: (coordinates.x + 1) % 10 }

  return { ...coordinates, x: (coordinates.x - 1 + 10) % 10 }
}

const parseCoordinates = (coordinates: ICoordinates, orientation: EOrientation): string => {
  const orientationFirstCharacter = EOrientation[orientation][0]

  return `${coordinates.x}:${coordinates.y}:${orientationFirstCharacter}`
}

export const _private = {
  changeDirection,
  moveRobot,
  parseCoordinates,
  calculateRobotMovement
}
