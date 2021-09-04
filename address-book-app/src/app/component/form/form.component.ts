import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book.model';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

interface City {
  value: string;
  viewValue: string;
}
interface State {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  cities: City[] = [
    { value: 'Mumbai', viewValue: 'Mumbai' },
    { value: 'Pune', viewValue: 'Pune' },
    { value: 'Kolkata', viewValue: 'Kolkata' },
    { value: 'Bangalore', viewValue: 'Bangalore' },
    { value: 'Surat', viewValue: 'Surat' },
    { value: 'Chennai', viewValue: 'Chennai' },
    { value: 'Ahmedabad', viewValue: 'Ahmedabad' },
  ];
  states: State[] = [
    { value: 'Maharashtra', viewValue: 'Maharashtra' },
    { value: 'Gujarat', viewValue: 'Gujarat' },
    { value: 'West Bengal', viewValue: 'West Bengal' },
    { value: 'Karnataka', viewValue: 'Karnataka' },
    { value: 'Tamil Nadu', viewValue: 'Tamil Nadu' },
  ];

  public addressbook = new AddressBook();
  public addressFormGroup: FormGroup;

  constructor
    (private fb: FormBuilder,
      private httpService: HttpService,
      private router: Router,
      private route: ActivatedRoute,
      private dataService: DataService,
      private snackBar: SnackBarComponent,
  ) {
    /**
     * Added Validators
     */
    this.addressFormGroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      mobileNumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{10}$")]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
    })
  }


  ngOnInit(): void {
    if (this.route.snapshot.params['id'] != undefined) {

      this.dataService.currentAddressBook.subscribe(person => {

        if (Object.keys(person).length !== 0) {

          this.addressFormGroup.patchValue({
            name: person.name,
            mobileNumber: person.mobileNumber,
            address: person.address,
            city: person.city,
            state: person.state,
            zip: person.zip,
          });
        }
      }
      );
    }
  }


  submit() {

    this.addressbook = this.addressFormGroup.value;

    if (this.route.snapshot.params['id'] != undefined) {

      this.httpService.updateEmployeeData(this.route.snapshot.params['id'], this.addressbook).subscribe(res =>{
        console.log(res);
        this.snackBar.openSnackBar(res.message,'Close','green-snackbar');
        this.router.navigateByUrl("/home");
      })

    } else {

      this.httpService.addPersonData(this.addressbook).subscribe(res => {
        console.log(res);
        this.snackBar.openSnackBar(res.message,'Close','green-snackbar');
        this.router.navigateByUrl("/home");
      })
    }

  }
  public checkError = (controlName: string, errorName: string) => {
    return this.addressFormGroup.controls[controlName].hasError(errorName);
  }
}
