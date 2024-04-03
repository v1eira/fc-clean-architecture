import EventInterface from '../../@shared/event/event.interface'

interface CustomerAddress {
  street: string
  number: string
  city: string
  zip: string
}

interface CustomerAddressChangedEventData {
  id: string
  name: string
  address: CustomerAddress
}

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date
  eventData: CustomerAddressChangedEventData

  constructor(eventData: CustomerAddressChangedEventData) {
    this.dataTimeOccurred = new Date()
    this.eventData = eventData
  }
}
