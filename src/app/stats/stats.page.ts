import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  stats: any = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getStats();
    console.log(this.stats)
  }

  getStats(){
    this.api.getStats().subscribe((data: any) => {  //Get random Users from API
      data.data.forEach((stat: any) => { 
        this.stats.push(stat)
      });   
    });
  }

}
