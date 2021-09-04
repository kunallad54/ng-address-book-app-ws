import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressBook } from '../model/address-book.model';

@Injectable({
  providedIn: 'root'
})

/**
 *Purpose : A Data service can be used by any component and thus 
 *          it acts as a common data point from which data can
 *          be distributed to any component in the application
 */
export class DataService {

  /**
   * BehaviorSubject ensures that the component consuming 
   * the service receives the last updated data even if there
   * are no new updates since the component's subscription to this data.
   */
  private addressBookSource = new BehaviorSubject(new AddressBook);
  currentAddressBook = this.addressBookSource.asObservable();

  constructor() { }

  changeAddressBook(addressBook: AddressBook) {
    this.addressBookSource.next(addressBook);
  }
}
