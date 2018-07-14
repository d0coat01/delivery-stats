import moment from 'moment'

export class DeliveryInfo {
  constructor(deliveries) {
    this.deliveries = deliveries || [];
    this.days_past = null;
    this.filtered_deliveries = [];
  }
  getTopCustomers(days_past, customer_limit) {
    console.log(this.deliveries[0], days_past, customer_limit);
    //filter out deliveries older than days_past of days_past has changed from this.days_past
    if(this.days_past !== days_past) {
      this.days_past = days_past;
      this.filtered_deliveries = this.filterDeliveries(this.deliveries, days_past);
    }
    //count customers
    const customers = {};
    for(let delivery of this.filtered_deliveries) {
      if(typeof customers[delivery.customer.id] === "undefined") {
        customers[delivery.customer.id] = {
          name: delivery.customer.name,
          count: 1
        };
      }
      else customers[delivery.customer.id].count++;
    }
    console.log(customers);
  }
  filterDeliveries(deliveries, days_past) {
    const cutoff_date = moment().subtract(30, 'days');
    const filtered = [];
    for(let delivery of deliveries) {
      if(cutoff_date.isBefore(delivery.date)) {
        filtered.push(delivery);
      }
    }
    return filtered;
  }
}
