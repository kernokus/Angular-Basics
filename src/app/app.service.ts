import { Injectable } from '@angular/core';
import { Apollo,gql,QueryRef } from 'apollo-angular';
import * as cloneDeep from 'lodash/cloneDeep';


const countryWithoutLang = gql` 
query getCountry ($ofset:Int!,$population_gte:Float!,$population_lte:Float!,$inputText:String!) {
    Country(first:6,offset:$ofset,filter:{AND:[{AND:[{population_gte:$population_gte},{population_lte:$population_lte}]},{name_starts_with:$inputText}]}){
      _id
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
    Country(first:6,offset:$ofset,filter:{AND:[{AND:[{population_gte:$population_gte},{population_lte:$population_lte}]},{AND:[{name_starts_with:$inputText},{officialLanguages:{name_in:$languageArray}}] }]}){
      _id
      name
      population
      officialLanguages {
        name
      }
  }
}
`;
const getCardDetails = gql` 
query getCountriesById($id:String!) {
  Country(_id:$id) {
    _id
    name
    alpha2Code
    population
    capital
    officialLanguages {
      name
    }
    alternativeSpellings {
      name
    }
  }
}
`;

export interface Country { 
  _id:string;
  name: string;
  population: number;
  type: String;
  officialLanguages:string[];   
}

export class CountryDetails implements Country { 
  _id:string;
  name: string;
  population: number;
  type: String;
  officialLanguages:string[];
  capital:string;
  alpha2Code:string;
  alternativeSpellings:string[];
}

@Injectable({ providedIn: 'root' })
export class apolloQlService {

    isHaveDataFromApollo=true;
  
    tempArray:Country[]; //текущая страница
    
    inputText="" //текст с input
    lenghtNums=0;
    nums: Set<string>=new Set();
    isWithLang=false
    isDisabledR=false
    isDisabledL=true
    i=1
    memberId:number=0;
    languageArray:string[]=[];

    feedQuery: QueryRef<any>;
    private apollo:Apollo;
    population_lte=13774221660;
	  population_gte=0;
    

    constructor(private _apollo:Apollo) {
    this.apollo=_apollo
    this.feedQuery=this.getApolloWithoutLang()
    }


    /* getApollo... функции возвращают один из 3 клиентов Apollo в зависимости от параметров 
    системы фильтрации и структуры запроса
    */
    getApolloWithoutLang() {
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
      getApolloForCardDetails(_id:String) {
        return this.apollo.watchQuery({
          query:getCardDetails,
            variables:{
              id:_id
            }
         });
      }

    fetch(_ofset = this.i*5) {
        let ofset = _ofset-5 //тк i=1 соответствует ofset = 0, 2 - ofset=5 и тд.
        /* установка переменных запроса и получение новых данных(в subscribe)
        */
        if (this.isWithLang===true) { //запрос с фильтрами языков
            this.feedQuery.setVariables({
            ofset: ofset,
            population_gte:this.population_gte,
            population_lte:this.population_lte,
            inputText:this.inputText,
            languageArray:this.languageArray

          })
        }
        else {
            this.feedQuery.setVariables({
            ofset: ofset,
            population_gte:this.population_gte,
            population_lte:this.population_lte,
            inputText:this.inputText
          })
        }
    }


    analyzeResult(_countriesArray:any) {
      /* Необходим механизм отслеживания конца данных(API проекта не предоставляет общее количество сущностей)
      Берём 6 элементов по запросу и помещаем в массив.
      Если в массиве данных больше 6 элементов, то 5 поступают на экран и переход на след.экран не блокируется
      , если 5 - поступают на экран, но переход на следующую страницу блокируется(так как 6 элемента нет). 
      Меньше 4 элементов - показываем данные и не блокируем.
      */
      let countriesArray:Country[] = cloneDeep(_countriesArray);//глубокая копия
      let lengthDataArr:number = countriesArray.length
      if (lengthDataArr!==0){
        if (lengthDataArr<5 && lengthDataArr>0) {
          this.isHaveDataFromApollo=true
          //отображаем данные и запрещаем переход к след.странице
          this.tempArray=countriesArray
          this.isDisabledR=true
        }
        else if (lengthDataArr===6) {
          this.isHaveDataFromApollo=true
          countriesArray.pop()
          this.tempArray=countriesArray
          this.isDisabledR=false
        }
        
        else if (lengthDataArr===5) {
          this.isHaveDataFromApollo=true
          this.tempArray=countriesArray
          this.isDisabledR=true
        }
      }
      else {
          this.isHaveDataFromApollo=false
          this.isDisabledR=true
      }
    }
}