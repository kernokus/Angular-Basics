import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  currPopulation:number=0;
  currName:string='';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currName=this.route.snapshot.params['name']
    this.currPopulation=this.route.snapshot.params['population']


  }

}
