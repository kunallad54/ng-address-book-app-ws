import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book.model';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  addressCount:number= 10;
  public personDetails:AddressBook[]=[];
  constructor(private httpService:HttpService,
    private router:Router,
    private dataService:DataService,
    private snackBar:SnackBarComponent,
    ) { }

  /**
   * Purpose : To get data of persons from database with the help HttpService methods
   *           and print the data on the console wiht help of subscribe
   */
  ngOnInit(): void {
    
    this.httpService.getPersonData().subscribe(data => {
      this.personDetails = data.data;
      this.addressCount = this.personDetails.length;
      console.log(this.personDetails);
    });
  }

  /**
   * Purpose: When the remove() is hit, the person data gets deleted from
   *          the database and also the details is removed from the HOME page.
   *          Thus, a refreshed home page is rendered.
   * @param id remove() is invoked for a particular person id.
   */
  remove(id: number): void {
    this.httpService.deletePersonData(id).subscribe(data => {
      console.log(data);
      this.snackBar.openSnackBar(data.message,'Close','green-snackbar');
      this.ngOnInit();
    });
  }

  /**
   * Purpose : When the update() method is called ,it gets navigated to url given below a
   *           to FormComponent with id defined that is particular id is given and then with 
   *           help of dataservice we are able to update the person details in Address Book
   * 
   * @param addressBook with particular id
   */
  update(addressBook: AddressBook) {
    this.dataService.changeAddressBook(addressBook);
    this.router.navigateByUrl('/form/' + addressBook.id);
  }

}
