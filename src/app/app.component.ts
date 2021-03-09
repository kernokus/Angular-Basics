import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject, } from 'rxjs';

import { QueryRef, gql } from 'apollo-angular';
import {apolloQlService} from 'src/app/app.service'
import { map } from 'rxjs/operators';
import { throwServerError } from '@apollo/client/core';
//import {InMemoryCache} from '@apollo/client'


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
  inputText=""
  
  
  
 
  tempArray:any; //текущая страница
  languageArray:any[]; //список языков


  

  
  


  
  
  constructor(public service: apolloQlService) {
   
  }

   ngOnInit() {
        this.service.feedQuery.valueChanges.subscribe(result =>{
        console.log(result.data.Country)
        this.tempArray=result.data.Country
        
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
    if (this.service.i!=4) {
      this.service.i++
      this.service.isDisabledL=false
      
      this.service.fetch()
      
      
      if (this.service.i ==4) {
        this.service.isDisabledR=true
      }
      
    }
    else {
        this.service.isDisabledR=false
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
