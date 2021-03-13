import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {apolloQlService} from 'src/app/app.service'
import {Country} from 'src/app/app.service'
import * as cloneDeep from 'lodash/cloneDeep';
@Component({
  selector: 'side-bar',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit  {

	

	//inputText
	
	//multisetCheckBoxes
	expanded = false;
	
	lenghtNums=0;
	
	//radioButtons
	
	


	constructor(public service: apolloQlService) {}


	ngOnInit(){
		//восстановление состояния sideBar при возврате с другой страницы
		let radioButtons = document.getElementsByName('rBtn');
		for (let i=0;i<radioButtons.length; i++) { //восстановление radioButtons
			if (radioButtons[i].id==this.service.memberId+'') {
				radioButtons[i].setAttribute('checked', 'checked');
			}
		}
		//восстановление multiSelect

		let inpMultiselect = document.getElementsByName('multiSelectInput');
		for (let i=0;i<inpMultiselect.length; i++) { //восстановление radioButtons
			if (this.service.nums.has(inpMultiselect[i].id.slice(0,-8))) {
				console.log("hello")
				inpMultiselect[i].setAttribute('checked', 'checked');
			}
		}
		this.lenghtNums=this.service.nums.size



		const search = document.getElementById('field-text')
		const stream$ = fromEvent(search,'input').pipe(
			debounceTime(300) //что бы не отправлять лишние запросы
		)
		stream$.subscribe(value => {
			this.service.i = 1
			
			this.service.fetch(0)
			this.service.isDisabledL=true
			if (!this.service.isHaveDataFromApollo) {
				this.service.isDisabledR=true
			}
			else {
				this.service.isDisabledR=false
			}
			
		})
	}

  showCheckboxes():void {
    //console.log("show!!")
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
    }
   
  
    clickCheckBox(id) { ////TODO ОТРЕФАКТОРИТЬ, ВЫНЕСТИ ОБЩУЮ ФУНКЦИЮ В СЕРВИС
      if (this.service.nums.has(id)) {
        this.service.nums.delete(id)
      }
      else {
        this.service.nums.add(id)
      }
      
      this.lenghtNums = this.service.nums.size
      
      console.log(this.service.nums)

	  	if (this.lenghtNums==0) {
			this.service.isWithLang=false
			this.service.feedQuery = this.service.getApolloWithoutLang()
			this.service.feedQuery.valueChanges.subscribe(result =>{

			this.service.analyzeResult(result.data.Country)

			})
		}
		else {
			this.service.isWithLang=true
			this.service.languageArray = [...this.service.nums]
			this.service.feedQuery = this.service.getApolloWithLang()
			this.service.feedQuery.valueChanges.subscribe(result => {

			this.service.analyzeResult(result.data.Country)
			})
		}
	  	this.service.i = 1
		this.service.fetch(0)
		this.service.isDisabledL=true
		this.service.isDisabledR=false
    }
  

    clickRadioBtn(id:number) {
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
			case 6: { 
				this.service.population_lte=13774221660;
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
			this.service.isDisabledR=false
	}
    }
}
