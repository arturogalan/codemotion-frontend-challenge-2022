import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Customer, CustomerDetail } from '../app.component';

@Component({
  selector: "customer-details",
  templateUrl: "./customerDetails.component.html",
  styleUrls: ["./customerDetails.component.scss"]
})
export class CustomerDetails implements OnInit {
  @Input() customerDetailsRecords;
  @Input() customers;
  @Input() selectedId;
  selectedCustomerDetailRecord;

  constructor() {
    this.selectedCustomerDetailRecord = {}
  }

  ngOnInit() {
  }
  ngOnChanges() {
    const customerDetailFound = this.customerDetailsRecords.find((detailRecord)=> {
      return detailRecord.id ===  this.selectedId;
    });
    const customerFound = this.customers.find((detailRecord)=> {
      return detailRecord.id ===  this.selectedId;
    });
    this.selectedCustomerDetailRecord = {
      ...customerFound,
      ...customerDetailFound,
    }
  }
}
