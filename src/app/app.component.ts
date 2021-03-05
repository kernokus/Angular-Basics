import {Component, OnInit} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


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





export class AppComponent implements OnInit {
  inputText=""
  i=1
  isDisabledR=false
  isDisabledL=true
  expanded = false;
  nums=new Set();
  lenghtNums=0

  tempArray:any[]=[{type:'type1345345345',name:'name1',home_port:'port1'},{type:'type2',name:'name2',home_port:'port2'},
  {type:'type3',name:'name3',home_port:'port3'}]; //текущая страница
  
  constructor(private apollo:Apollo){}

   ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          ships(limit: 5, offset: 0) {
            home_port
            name
            type
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.tempArray=result.data.ships
        console.log(result.data.ships)
      });
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
  
  
  nextPage():void {
    this.i++
    this.isDisabledL=false
  }
  
  prevPage():void {
    if (this.i!==1) {
      this.i--
      if (this.i==1) {
        this.isDisabledL=true
      }
      else {
        this.isDisabledL=false
      }
    }
  }


  
  
}
