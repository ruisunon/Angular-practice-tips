import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest(){
    // add safe, url encoded_page parameter
    const options={ params: new HttpParams({fromString: "_page=1&_limit=20"}) };
    return this.httpClient.get(this.REST_API_SERVER +'/products', options).pipe(retry(3), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse){
    let errorMessage ='Unknown error!';
    if(error.error instanceof ErrorEvent){
      // client side errors
      errorMessage=`Error: ${error.error.message}`;
    }else {
      // server side errors
      errorMessage=`Error code: ${error.status} \n Message: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
