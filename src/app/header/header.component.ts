import { Component, OnInit } from '@angular/core';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public cityService:CityService) { }

  ngOnInit(): void {
  }

}
