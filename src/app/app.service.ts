import { Injectable } from '@angular/core';
import { Apollo,gql,QueryRef } from 'apollo-angular';

const countryWithoutLang = gql` 
query getCountry ($ofset:Int!,$population_gte:Float!,$population_lte:Float!,$inputText:String!) {
    Country(first:5,offset:$ofset,filter:{AND:[{AND:[{population_gte:$population_gte},{population_lte:$population_lte}]},{name_starts_with:$inputText}]}){
      name
      population
      officialLanguages {
        name
      }
  }
}
`;

const countryWithLang = gql` 
query getCountry ($ofset:Int!,$population_gte:Float!,$population_lte:Float!,$inputText:String!,$languageArray:[String!]) {
    Country(first:5,offset:$ofset,filter:{AND:[{AND:[{population_gte:$population_gte},{population_lte:$population_lte}]},{AND:[{name_starts_with:$inputText},{officialLanguages:{name_in:$languageArray}}] }]}){
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
    tempArray:any; //текущая страница
    
    inputText="" //текст с input


    isWithLang=false
    isDisabledR=false
    isDisabledL=true
    i=1
    memberId=0;
    languageArray:string[]=[];

    feedQuery: QueryRef<any>;
    private apollo:Apollo;
    population_lte=13774221660;
	  population_gte=0;
    

    constructor(private _apollo:Apollo) {
    this.apollo=_apollo
    this.feedQuery=this.getApolloWithoutLang()
    }

    getApolloWithoutLang() {
    console.log(this.languageArray+"without")
    return this.apollo.watchQuery({
        query:countryWithoutLang,
          variables:{
            ofset:0,
            population_gte:0,
            population_lte:13774221660,
            inputText:this.inputText
            
          }
    });
    }
    getApolloWithLang() {
      console.log(this.languageArray+"withLang")
      return this.apollo.watchQuery({
          query:countryWithLang,
            variables:{
              ofset:0,
              population_gte:0,
              population_lte:13774221660,
              inputText:this.inputText,
              languageArray:this.languageArray
            }
      });
      
      }

    






    fetch(ofset = this.i*5) {
        if (this.isWithLang===true) {
          console.log("fetchWITHLang")
          this.feedQuery.setVariables({
            ofset: ofset,
            population_gte:this.population_gte,
            population_lte:this.population_lte,
            inputText:this.inputText,
            languageArray:this.languageArray

          }
         )
        }
        else {
          console.log("fetchWithoutLang") //без языков
          this.feedQuery.setVariables({
            ofset: ofset,
            population_gte:this.population_gte,
            population_lte:this.population_lte,
            inputText:this.inputText
          }
         )
        }
        
}
}