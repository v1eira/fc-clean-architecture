import Notification from './notification'

describe('Unit test for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)
    expect(notification.messages('customer')).toBe('customer: error message,')

    const error2 = {
      message: 'error message 2',
      context: 'customer',
    }
    notification.addError(error2)
    expect(notification.messages('customer')).toBe(
      'customer: error message,customer: error message 2,',
    )

    const error3 = {
      message: 'error message 3',
      context: 'order',
    }
    notification.addError(error3)
    expect(notification.messages('customer')).toBe(
      'customer: error message,customer: error message 2,',
    )
    expect(notification.messages()).toBe(
      'customer: error message,customer: error message 2,order: error message 3,',
    )
  })

  it('should check if notification has at least one error', async () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all error props', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)
    expect(notification.getErrors()).toEqual([error])
  })
})
