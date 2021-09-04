import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

/**
 * Purpose : The $http service is a core AngularJS service that facilitates communication 
 *           with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.
 */
export class HttpService {

  baseUrl:string="http://localhost:8090/address-book/";
  constructor(private httpClient:HttpClient) { }

  /**
   * Purpose : GET request method to hit the HTTP server.
   *  
   * @returns the get request response.
   */
  getPersonData():Observable<any>{
    return this.httpClient.get(this.baseUrl + "getAddressBook");
  }

  /**
   * Purpose : Adding person data  to request for post method to hit the HTTP server.
   * 
   * @param data person details to be stored in the address book database.
   * @returns the post request response.
   */
  addPersonData(data: any):Observable<any>{
    return this.httpClient.post(this.baseUrl + "addPersonDetails",data);
  }

  /**
   * Purpose : DELETE request method to hit the HTTP server.
   * 
   * @param id person id for which the delete action needs to be taken.
   * @returns the delete request response.
   */

  deletePersonData(id: number): Observable<any> {

    return this.httpClient.delete(this.baseUrl + "deletePersonDetails", {
      headers: new HttpHeaders(),
      params: new HttpParams().append("id", id),
    });
  }

  /**
   * Purpose : UPDATE Operation Performed i.e PUT request method to hit the HTTP SERVER
   * 
   * @param id person id for which update action needs to be taken
   * @param data person details of that particular id
   * @returns the put request response
   */
  updateEmployeeData(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "updatePersonDetails?id="+id, data);
  }
}
