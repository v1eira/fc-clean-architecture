import EventDispatcher from '../../@shared/event/event-dispatcher'
import CustomerAddressChangedEvent from './customer-address-changed.event'
import SendConsoleLogWhenAddressChangesHandler from './handler/send-console-log-when-address-changes.handler'

describe('Customer address changed event tests', () => {
  it('Should dispatch event when customer address is changed', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogWhenAddressChangesHandler()

    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0],
    ).toMatchObject(eventHandler)

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: '123456',
      name: 'Customer 1',
      address: {
        city: 'City X',
        street: 'Street Y',
        number: '123',
        zip: 'XYZ-123',
      },
    })

    eventDispatcher.notify(customerAddressChangedEvent)

    expect(spyEventHandler).toHaveBeenCalled()
  })
})
