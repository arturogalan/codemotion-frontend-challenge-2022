# Customer Records

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: v14 (LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/8u5F9DDFBfnmRh8Q1lrRmA/angular-customer-records.gif)

## Functionality Requirements

The application has 2 components:
- The `CustomerTable` component, which displays the list of customers in a tabular form.
- The `CustomerDetails` component, which presents the full details of selected customer.

The application has the following functionalities:

- Initially, the `CustomerTable` displays entire list of customers is a tabular format. The list of customers is passed to it as props which is an array of `Customer` type objects. The `Customer` type has below interface:

```
  interface Customer {
    firstName: string;
    lastName: string;
    age: number;
    id: string; // Unique identifier of each customer
  }
```

- Each customer row in this table has columns for `firstName`, `lastName`, `age` and `View details` button. Clicking on `View details` button selects this customer, and displays the details of the selected customer in `CustomerDetails` component.

- The details of the customers are passed to it as props which is an array of `CustomerDetail` type objects. The `CustomerDetail` type has below interface:

```
  interface CustomerDetail {
    id: string;
    city: string;
    gender: string;
    pin: number;
    country: string;
    state: string
  }
```

- The `CustomerDetails` component renders following columns - `firstName`, `lastName`, `age`, `city`, `gender`, `pin`, `country`, and `state`. It should render only single customer at a time which is most recently selected.

- You need to merge data from both arrays to render in `CustomerDetails` component.
- Since no customer is selected initially, `CustomerDetails` component should not be rendered.

## Testing Requirements

The following data-test-id attributes are required in the component for the tests to pass:

- The CustomerTable `<tbody>` should have the data-test-id attribute `customer-list`.
- Each `View details` button should have the data-test-id attribute `view-details-button`.
- The CustomerDetails `<tbody>` should have the data-test-id attribute `customer-details`.

## Project Specifications

**Read-only Files**
- src/app/app.component.spec.ts

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
