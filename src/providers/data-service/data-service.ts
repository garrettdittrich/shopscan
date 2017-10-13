import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  walmart: string = 'http://api.walmartlabs.com/v1/items?apiKey=sa5c9d79tnm5d5ytndesnrd9&upc='
  flask: string = 'http://165.227.123.107:5000/post'
  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }

  postRequest(upc: string) {
    let body = 'hello';
    return this.http.post('http://165.227.123.107:5000/post', upc)
    .map(res=>res);
  
  }

  getProducts(url: string){
    return this.http.get(url)
      .map((response:Response)=>console.log(response));
  }

}
