import { Injectable } from '@angular/core';
import { Apollo,gql,QueryRef } from 'apollo-angular';

const country = gql` 
query getCountry ($ofset:Int!,$population_gte:Float!,$population_lte:Float!) {
    Country(first:5,offset:$ofset,filter:{AND:[{population_gte:$population_gte},{population_lte:$population_lte}] }) {
      name
      population
      officialLanguages {
        name
      }
  }
}
`;

@Injectable({ providedIn: 'root' })
export class apolloQlService {
    
    
    
    isDisabledR=false
    isDisabledL=true
    i=1
    memberId=0;

    feedQuery: QueryRef<any>;
    private apollo:Apollo;
    population_lte=13774221660;
	  population_gte=0;
    

    constructor(private _apollo:Apollo) {
    this.apollo=_apollo
    this.feedQuery=this.getApollo()
    }

    getApollo() {
    return this.apollo.watchQuery({
        query:country,
          variables:{
            ofset:0,
            population_gte:0,
            population_lte:13774221660
          }
    });
    }

    fetch(ofset = this.i*5) {
      
        this.feedQuery.setVariables({
           ofset: ofset,
           population_gte:this.population_gte,
           population_lte:this.population_lte
         }
        )
}
}