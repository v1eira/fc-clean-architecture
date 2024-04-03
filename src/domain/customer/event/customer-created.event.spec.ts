import EventDispatcher from '../../@shared/event/event-dispatcher'
import CustomerCreatedEvent from './customer-created.event'
import SendConsoleLog1Handler from './handler/send-console-log-1.handler'
import SendConsoleLog2Handler from './handler/send-console-log-2.handler'

describe('Customer created event tests', () => {
  it('Should dispatch event when customer is created', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new SendConsoleLog1Handler()
    const eventHandler2 = new SendConsoleLog2Handler()

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle')
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length,
    ).toBe(2)
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
    ).toMatchObject(eventHandler1)
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
    ).toMatchObject(eventHandler2)

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: '123456',
      name: 'Customer 1',
      active: false,
    })

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
  })
})
