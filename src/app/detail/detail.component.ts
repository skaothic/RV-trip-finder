import { Component, OnInit } from '@angular/core';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public depart:string=this.cityService.travel[0].dep
  public arrivee:string=this.cityService.travel[0].arr
  public date:string=this.cityService.travel[0].date
  public hour:string=this.cityService.travel[0].hour
  public mapURL:string=""
  constructor(private cityService:CityService) { }

  ngOnInit(): void {
    this.mapURL="http://maps.google.com/maps?saddr="+this.cityService.travel[0].depVal+"&daddr="+this.cityService.travel[0].arrVal+"&ie=UTF8&output=embed"
   
  }

}
