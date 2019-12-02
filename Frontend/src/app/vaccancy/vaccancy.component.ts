import { Component, OnInit } from '@angular/core';
import { VaccancyService } from '../services/vaccancy.service';

@Component({
  selector: 'app-vaccancy',
  templateUrl: './vaccancy.component.html',
  styleUrls: ['./vaccancy.component.css']
})
export class VaccancyComponent implements OnInit {

  vaccancies: any[];

  constructor(private vaccancyService: VaccancyService) { }

  ngOnInit() {
    this.getVaccancies();
  }

  getVaccancies() {
    this.vaccancyService.getAllVaccancies().subscribe((val:any[]) => {
      console.log(val);
      this.vaccancies = val;
    })
  }
}


