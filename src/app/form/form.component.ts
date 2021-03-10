import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {apolloQlService} from 'src/app/app.service'
@Component({
  selector: 'side-bar',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit  {

	

	//inputText
	
	//multisetCheckBoxes
	expanded = false;
	nums: Set<string>=new Set();
	lenghtNums=0;
	
	//radioButtons
	
	


	constructor(public service: apolloQlService) {}


	ngOnInit(){
		const search = document.getElementById('field-text')
		const stream$ = fromEvent(search,'input').pipe(
			debounceTime(300) //что бы не отправлять лишние запросы
		)
		stream$.subscribe(value => {
			this.service.i = 1
			this.service.fetch(0)
			this.service.isDisabledL=true
		})
	}

  showCheckboxes():void {
    console.log("show!!")
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
    }
   
  
    clickCheckBox(id) {
      if (this.nums.has(id)) {
        this.nums.delete(id)
      }
      else {
        this.nums.add(id)
      }
      
      this.lenghtNums = this.nums.size
      
      console.log(this.nums)

	  	if (this.lenghtNums==0) {
			this.service.isWithLang=false
			this.service.feedQuery = this.service.getApolloWithoutLang()
			this.service.feedQuery.valueChanges.subscribe(result =>{
				console.log(result.data.Country)
				this.service.tempArray=result.data.Country
			})
		}
		else {
			this.service.isWithLang=true
			this.service.languageArray = [...this.nums]
			this.service.feedQuery = this.service.getApolloWithLang()
			this.service.feedQuery.valueChanges.subscribe(result =>{
				console.log(result.data.Country)
				this.service.tempArray=result.data.Country
			})
			
		}
	  	this.service.i = 1
		this.service.fetch(0)
		this.service.isDisabledL=true
      //смотреть какие checkbox включены,а какие нет
    }
  

    clickRadioBtn(id) {
	if (id!=this.service.memberId) { //что бы не было запроса каждый раз по нажатию на один и тот же radioButton
		
		switch(id) { 
			case 1: { 
				   this.service.population_lte=13774221660;
				   this.service.population_gte=100000000;
				  break; 
			} 
			case 2: { 
				  this.service.population_lte=100000000;
				this.service.population_gte=30000000;
				break; 
			} 
			case 3: { 
				  this.service.population_lte=30000000;
				  this.service.population_gte=10000000;
				  break; 
			} 
			case 4: { 
				  this.service.population_lte=10000000;
				  this.service.population_gte=1000000;
				  break; 
			} 
			case 5: { 
				  this.service.population_lte=1000000;
				  this.service.population_gte=0;
				  break; 
			}
			default: { 
			break; 
			} 
		} 
		   	this.service.memberId=id
			this.service.i = 1
			this.service.fetch(0)
			this.service.isDisabledL=true
	}
    }
}
