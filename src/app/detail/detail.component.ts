import { Component, OnInit } from '@angular/core';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  //récuperation du tableau cré sur l'onglet home pour la mise en place des infos dans la page détails

  public depart:string=this.cityService.travel[0].dep
  public arrivee:string=this.cityService.travel[0].arr
  public date:string=this.cityService.travel[0].date
  public hour:string=this.cityService.travel[0].hour
  public mapURL:string=""

  constructor(private cityService:CityService) { }

  ngOnInit(): void {
    //création du lien de la carte Google intégré avec utilisation des "unique_name" pour les pins départ et arrivée avec différent type de voyage(avion,voiture et train)
    this.mapURL="https://maps.google.com/maps?saddr="+this.cityService.travel[0].depVal+"&daddr="+this.cityService.travel[0].arrVal+"&ie=UTF8&output=embed"
   
  }

}
