import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from  '@angular/router';
import {apolloQlService} from 'src/app/app.service'
import {CountryDetails} from  'src/app/app.service'
import { Apollo,gql,QueryRef } from 'apollo-angular';
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit,OnDestroy {
  currCountryDetails:CountryDetails;
  feedQuery: QueryRef<any>;

  constructor(private route: ActivatedRoute,private router:Router,private service: apolloQlService) {
    
  }

  ngOnInit(): void {
  
    const id:string=this.route.snapshot.params['id'];
    
    console.log(id)
    this.feedQuery=this.service.getApolloForCardDetails(id)
    
    this.feedQuery.valueChanges.subscribe(result=> {
    this.currCountryDetails=result.data.Country[0] //так как только 1 элемент
    })
    
    






  }
  ngOnDestroy(): void {

    
  }

  returnBtn(){
    this.router.navigate([''])
  }

}
