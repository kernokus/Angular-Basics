import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject, } from 'rxjs';

import { QueryRef, gql } from 'apollo-angular';
import {apolloQlService} from 'src/app/app.service'
import { map } from 'rxjs/operators';
import { throwServerError } from '@apollo/client/core';
//import {InMemoryCache} from '@apollo/client'
import {Country} from 'src/app/app.service'
import * as cloneDeep from 'lodash/cloneDeep';
export interface Card {
  home_port: String;
  name: String;
  type: String;
      
}







@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit,OnDestroy {
  

  languageArray:any[]; //список языков
  constructor(public service: apolloQlService) {
   
  }

   ngOnInit() {
        
        this.service.feedQuery.valueChanges.subscribe(result => {



        let dataSize:Country[] = cloneDeep(result.data.Country);
        
        //

        


        console.log(dataSize)
        //;
        //var copy = 
        //console.log(dataSize)
        let temp:number = dataSize.length
        console.log(temp)
        //console.log(this.service.no)
        if (temp===0) {
          this.service.isHaveDataFromApollo=false
          this.service.isDisabledR=true
          //отображаем что данных нет
        }
        else if (temp<5 && temp>0) {
          
          
          this.service.isHaveDataFromApollo=true
          //отображаем данные и дизейблим стрелку
          this.service.tempArray=result.data.Country
          this.service.isDisabledR=true
        }
        else if (temp===6) {
          console.log("БЕЗ ЯЗЫКОВ НЕ ЗАХОДИТ?")
          this.service.isHaveDataFromApollo=true
          dataSize.pop()
          this.service.tempArray=dataSize
          this.service.isDisabledR=false
        }
        else if (temp===5) {
          this.service.isHaveDataFromApollo=true
          this.service.tempArray=dataSize
          this.service.isDisabledR=true
        }

        
        
        
         //console.log(result.data.Country)
        // this.service.tempArray=result.data.Country
        })



   };

   
    // this.feedQuery.fetchMore({
    //   variables:{
    //     offset: this.i*5
    //   }
    // })


   
    ngOnDestroy(){
      //this.service.feedQuery.valueChanges.unsubscribe()
      //надо отписаться 
    }

  
  nextPage():void {
    if (!this.service.isDisabledR) {
      this.service.i++
      this.service.isDisabledL=false
      this.service.fetch()
    }
  }
  
  prevPage():void {
    if (this.service.i!==1) {
      this.service.isDisabledR=false
      this.service.i--
      
      if (this.service.i==1) {
        this.service.isDisabledL=true
        this.service.fetch(0)
      }
      else {
        this.service.isDisabledL=false
        this.service.fetch()
      }
    }
  }


  
  
}
