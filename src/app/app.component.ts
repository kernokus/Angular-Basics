import {Component, OnDestroy, OnInit} from '@angular/core';
import {apolloQlService} from 'src/app/app.service'

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  
  constructor(public service: apolloQlService) {}

   ngOnInit(): void {
        this.service.feedQuery.valueChanges.subscribe(result => {
        this.service.analyzeResult(result.data.Country)
        })
   };

    ngOnDestroy(): void {
      //по хорошему надо отписаться,но с этим возникла проблема с apollo 3.0
    }

  
  nextPage(): void {
    if (!this.service.isDisabledR) {
      this.service.i++
      this.service.isDisabledL=false
      this.service.fetch()
    }
  }
  
  prevPage(): void {
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
