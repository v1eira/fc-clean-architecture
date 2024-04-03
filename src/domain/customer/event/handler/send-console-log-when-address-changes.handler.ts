import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import CustomerAddressChangedEvent from '../customer-address-changed.event'

export default class SendConsoleLogWhenAddressChangesHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Address of the customer: ${event.eventData.id}, ${event.eventData.name} changed to: ${event.eventData.address.city}, ${event.eventData.address.street} ${event.eventData.address.number}, ${event.eventData.address.zip}`,
    )
  }
}
