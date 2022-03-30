import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Customer Records';
  selectedId = '';

  customers: Customer[] = [{
      id: 'henry-gerard',
      firstName: "Henry",
      lastName: "Gerard",
      age: 21
    },
    {
      id: 'michael-platini',
      firstName: "Michael",
      lastName: "Platini",
      age: 40
    },
    {
      id: 'louis-figo',
      firstName: "Louis",
      lastName: "Figo",
      age: 37
    },
    {
      id: 'cristiana-ronaldinho',
      firstName: "Cristiana",
      lastName: "Ronaldinho",
      age: 15
    },
    {
      id: 'leonardo-messiah',
      firstName: "Leonardo",
      lastName: "Messiah",
      age: 25
    }
  ]

  customerDetailsRecords: CustomerDetail[] = [{
      id: 'henry-gerard',
      city: 'Los Angeles',
      gender: 'Male',
      pin: 3123,
      country: 'USA',
      state: 'CA'
    },
    {
      id: 'michael-platini',
      city: 'Miami',
      gender: 'Male',
      pin: 3176,
      country: 'USA',
      state: 'FL'
    },
    {
      id: 'louis-figo',
      city: 'Seattle',
      gender: 'Male',
      pin: 3176,
      country: 'USA',
      state: 'WA'
    },
    {
      id: 'cristiana-ronaldinho',
      city: 'Denver',
      gender: 'Female',
      pin: 3178,
      country: 'USA',
      state: 'CO'
    },
    {
      id: 'leonardo-messiah',
      city: 'Portland',
      gender: 'Female',
      pin: 3165,
      country: 'USA',
      state: 'OR'
    }
  ];

  setSelectedId(id: string) {
    this.selectedId = id;
  }
}

export interface Customer {
  firstName: string;
  lastName: string;
  age: number;
  id: string;
}

export interface CustomerDetail {
  id: string;
  city: string;
  gender: string;
  pin: number;
  country: string;
  state: string
}
