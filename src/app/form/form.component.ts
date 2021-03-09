import { Component } from '@angular/core';
import {apolloQlService} from 'src/app/app.service'
@Component({
  selector: 'side-bar',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  {

	

	//inputText
	inputText=""
	//multisetCheckBoxes
	expanded = false;
	nums=new Set();
	lenghtNums=0;
	//radioButtons
	
	


	constructor(private service: apolloQlService) {
   
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
