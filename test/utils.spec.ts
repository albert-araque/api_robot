import { describe, expect, test } from '@jest/globals'
import { isValidInput } from '../src/utils'

describe('isValidInput', () => {
  test('Should be an invalid robot input', (done) => {
    const robotInput = 'LMMMRMMMSLRRMM'
    expect(isValidInput(robotInput)).toEqual(false)
    done()
  })
  test('Should be a valid robot input', (done) => {
    const robotInput = 'LMMMRMMMLRRMM'
    expect(isValidInput(robotInput)).toEqual(true)
    done()
  })
})
