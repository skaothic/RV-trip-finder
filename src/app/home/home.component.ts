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
  
//mise en place de tableau contenant les futurs villes correspondantes aux saisies ou les plus populaires en l'absence de saisie
public results:Array<any>=[]
public Arrival:Array<any>=[]

 //récupération date du jour pour limiter la saisie d'une date antérieur à aujourd'hui
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
  }

 

//recupération des villes les plus polaires au départ 
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

//récupération des villes correspondantes à la saisie du champ "départ" 
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
  }
  
  //une fois le champ "départ" valide récupération des destinations populaires
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
  
//si les destin&ations populaires ne sont pas la cible récupération des destinations correspondantes à la saisie dans le champs ""arrivée"
public searchArrival(x:any){
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

//validation du voyage après que tous les champs soit remplis enregistrement d'un tableau récapitulatif pour utilisation ultérieure dans l'onglet "détail"
public submit(){
  console.log(this.results[0].local_name)
  this.travelForm.setValue
 const dep:string=this.results[0].local_name
  const arr:string=this.Arrival[0].local_name
  const depVal:string=this.travelForm.get('departure').value
  const arrVal:string=this.travelForm.get('arrival').value
  const date:string=this.travelForm.get('date').value
 const hour:string=this.travelForm.get('hour').value
  this.cityservice.addTravel(dep,arr,date,hour,depVal,arrVal)
  }
}