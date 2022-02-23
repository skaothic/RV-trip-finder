import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '../interface/HttpResponse';
import { CityService } from '../service/city.service';
import { map,startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
public results:Array<any>=[]
public Arrival:Array<any>=[]
public today:number=Date.now()
constructor(private cityservice:CityService) { }
  public travelForm: FormGroup = new FormGroup({
    ["departure"]: new FormControl("",[Validators.required]),
    ["arrival"]: new FormControl("",[Validators.required]),
    ["date"]: new FormControl("",[Validators.required]),
    ["hour"]: new FormControl("",[Validators.required])

  });
    
    
  ngOnInit(): void {
    this.getPop()
    console.log(this.travelForm.get('date').value)
  }

 

private getPop():void{
  this.cityservice.getPop()
  .subscribe((response:HttpResponse)=>{
    if (response.status===200){
      this.results= response.body
    }
    else {
      console.log(response.message)
    }
  })
}
public search(x:any){
  this.cityservice.search(x.target.value)
  .subscribe((response:HttpResponse)=>{
    if (response.status===200){
      this.results= response.body
    }
    else {
      console.log(response.message)
    }
  })
  }public searchArrival(x:any){
    this.cityservice.search(x.target.value)
    .subscribe((response:HttpResponse)=>{
      if (response.status===200){
        this.Arrival= response.body
      }
      else {
        console.log(response.message)
      }
    })
    }

public getPopArrival(event:any):void{
  if (event.target.value) {
    let city = event.target.value;
    this.cityservice.getPopArrival(city)
    .subscribe((response:HttpResponse)=>{
      if (response.status===200){
        this.Arrival= response.body
      }
      else {
        console.log(response.message)
      }
    })
  }
}

public submit(){
 const dep:string=this.travelForm.get('departure').value
  const arr:string=this.travelForm.get('arrival').value
  const date:string=this.travelForm.get('date').value
 const hour:string=this.travelForm.get('hour').value
  this.cityservice.addTravel(dep,arr,date,hour)
  }
}