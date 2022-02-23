import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,of, Subject } from 'rxjs';
import { HttpResponse } from '../interface/HttpResponse';

@Injectable({
  providedIn: 'root'
})
export class CityService {
public travel:Array<any>=[]
travelSubject = new Subject<any[]>();

  constructor(private http:HttpClient) { }
  urlAPIAutocomplete="https://api.comparatrip.eu/cities/autocomplete/?q="
  urlAPIPopular="https://api.comparatrip.eu/cities/popular/5"
  urlAPIPopularFrom="https://api.comparatrip.eu/cities/popular/from"





httpOptions={
  headers:new HttpHeaders({'Content-type':'application/json'}),
};

public getPop():Observable<HttpResponse>{
  return this.http.get(`${this.urlAPIPopular}`,{ withCredentials: false, observe: 'response' })
  .pipe(catchError(err=>{
    return of (err);
  }))
}

public getPopArrival(id:string):Observable<HttpResponse>{
  return this.http.get(`${this.urlAPIPopularFrom}/${id}/5`,{ withCredentials: false, observe: 'response' })
  .pipe(catchError(err=>{
    return of (err);
  }))
}
public search(str:string):Observable<HttpResponse>{
  return this.http.get(`${this.urlAPIAutocomplete}${str}`,{ withCredentials: false, observe: 'response' })
  .pipe(catchError(err=>{
    return of (err);
  }))
}

public emitTravelSubject() {
  this.travelSubject.next(this.travel.slice());
  console.table(this.travel)
}

public addTravel(dep: string, arr: string,date:string,hour:string) {
  const travelObject = {
    dep: '',
    arr: '',
    date:'',
    hour:'',
  };
  console.table(travelObject)
  travelObject.dep = dep;
  travelObject.arr = arr;
  travelObject.date = date;
  travelObject.hour = hour;
  this.travel.push(travelObject);
  this.emitTravelSubject();

}
}