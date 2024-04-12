import { toXML } from 'jstoxml'
import { OutputListCustomerDto } from '../../../usecase/customer/list/list.customer.dto'

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: '  ',
      newLine: '\n',
      allowEmpty: true,
    }

    return toXML(
      {
        customers: data.customers.map((customer) => ({
          customer: {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city,
            },
          },
        })),
      },
      xmlOption,
    )
  }
}
