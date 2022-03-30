import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CustomerTable} from './customerTable/customerTable.component';
import {CustomerDetails} from './customerDetails/customerDetails.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;
  let customerList;
  let customerDetails;

  const getByTestId = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        CustomerTable,
        CustomerDetails
      ],
      providers: [],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    await fixture.detectChanges();
    await fixture.whenStable();

    customerList = getByTestId('customer-list');
    customerDetails = getByTestId('customer-details');
  });

  it('Initial customer list is rendered as expected', async() => {
    expect(customerList.children.length).toEqual(5);

    expect(customerList.children[0].children[0].textContent.trim()).toEqual('Henry');
    expect(customerList.children[0].children[1].textContent.trim()).toEqual('Gerard');
    expect(customerList.children[0].children[2].textContent.trim()).toEqual('21');

    expect(customerList.children[1].children[0].textContent.trim()).toEqual('Michael');
    expect(customerList.children[1].children[1].textContent.trim()).toEqual('Platini');
    expect(customerList.children[1].children[2].textContent.trim()).toEqual('40');

    expect(customerList.children[2].children[0].textContent.trim()).toEqual('Louis');
    expect(customerList.children[2].children[1].textContent.trim()).toEqual('Figo');
    expect(customerList.children[2].children[2].textContent.trim()).toEqual('37');

    expect(customerList.children[3].children[0].textContent.trim()).toEqual('Cristiana');
    expect(customerList.children[3].children[1].textContent.trim()).toEqual('Ronaldinho');
    expect(customerList.children[3].children[2].textContent.trim()).toEqual('15');

    expect(customerList.children[4].children[0].textContent.trim()).toEqual('Leonardo');
    expect(customerList.children[4].children[1].textContent.trim()).toEqual('Messiah');
    expect(customerList.children[4].children[2].textContent.trim()).toEqual('25');
  });

  it('Customer Details section is not rendered initially', async() => {
    expect(customerDetails).toBeFalsy();
  });

  it('View details button works correctly', async() => {
    const firstCustomerDetailsRow = customerList.children[0];
    const firstCustomerDetailsButton = getByTestId('view-details-button', firstCustomerDetailsRow);

    await firstCustomerDetailsButton.click();

    customerDetails = getByTestId('customer-details');
    expect(customerDetails).toBeTruthy();
    expect(customerDetails.children.length).toEqual(1);
    expect(customerDetails.children[0].children[0].textContent.trim()).toEqual('Henry');
    expect(customerDetails.children[0].children[1].textContent.trim()).toEqual('Gerard');
    expect(customerDetails.children[0].children[2].textContent.trim()).toEqual('21');
    expect(customerDetails.children[0].children[3].textContent.trim()).toEqual('Los Angeles');
    expect(customerDetails.children[0].children[4].textContent.trim()).toEqual('Male');
    expect(customerDetails.children[0].children[5].textContent.trim()).toEqual('3123');
    expect(customerDetails.children[0].children[6].textContent.trim()).toEqual('USA');
    expect(customerDetails.children[0].children[7].textContent.trim()).toEqual('CA');
  });

  it('Perform series of actions', async() => {
    const firstCustomerDetailsRow = customerList.children[0];
    const firstCustomerDetailsButton = getByTestId('view-details-button', firstCustomerDetailsRow);

    await firstCustomerDetailsButton.click();

    customerDetails = getByTestId('customer-details');
    expect(customerDetails).toBeTruthy();
    expect(customerDetails.children.length).toEqual(1);
    expect(customerDetails.children[0].children[0].textContent.trim()).toEqual('Henry');
    expect(customerDetails.children[0].children[1].textContent.trim()).toEqual('Gerard');
    expect(customerDetails.children[0].children[2].textContent.trim()).toEqual('21');
    expect(customerDetails.children[0].children[3].textContent.trim()).toEqual('Los Angeles');
    expect(customerDetails.children[0].children[4].textContent.trim()).toEqual('Male');
    expect(customerDetails.children[0].children[5].textContent.trim()).toEqual('3123');
    expect(customerDetails.children[0].children[6].textContent.trim()).toEqual('USA');
    expect(customerDetails.children[0].children[7].textContent.trim()).toEqual('CA');

    const fifthCustomerDetailsRow = customerList.children[4];
    const fifthCustomerDetailsButton = getByTestId('view-details-button', fifthCustomerDetailsRow);

    await fifthCustomerDetailsButton.click();

    customerDetails = getByTestId('customer-details');
    expect(customerDetails).toBeTruthy();
    expect(customerDetails.children.length).toEqual(1);
    expect(customerDetails.children[0].children[0].textContent.trim()).toEqual('Leonardo');
    expect(customerDetails.children[0].children[1].textContent.trim()).toEqual('Messiah');
    expect(customerDetails.children[0].children[2].textContent.trim()).toEqual('25');
    expect(customerDetails.children[0].children[3].textContent.trim()).toEqual('Portland');
    expect(customerDetails.children[0].children[4].textContent.trim()).toEqual('Female');
    expect(customerDetails.children[0].children[5].textContent.trim()).toEqual('3165');
    expect(customerDetails.children[0].children[6].textContent.trim()).toEqual('USA');
    expect(customerDetails.children[0].children[7].textContent.trim()).toEqual('OR');

    const thirdCustomerDetailsRow = customerList.children[2];
    const thirdCustomerDetailsButton = getByTestId('view-details-button', thirdCustomerDetailsRow);

    await thirdCustomerDetailsButton.click();

    customerDetails = getByTestId('customer-details');
    expect(customerDetails).toBeTruthy();
    expect(customerDetails.children.length).toEqual(1);
    expect(customerDetails.children[0].children[0].textContent.trim()).toEqual('Louis');
    expect(customerDetails.children[0].children[1].textContent.trim()).toEqual('Figo');
    expect(customerDetails.children[0].children[2].textContent.trim()).toEqual('37');
    expect(customerDetails.children[0].children[3].textContent.trim()).toEqual('Seattle');
    expect(customerDetails.children[0].children[4].textContent.trim()).toEqual('Male');
    expect(customerDetails.children[0].children[5].textContent.trim()).toEqual('3176');
    expect(customerDetails.children[0].children[6].textContent.trim()).toEqual('USA');
    expect(customerDetails.children[0].children[7].textContent.trim()).toEqual('WA');
  });
});
