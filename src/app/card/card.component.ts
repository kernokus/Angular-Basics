import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Country} from 'src/app/app.service'
@Component({
    selector:'app-card',
    templateUrl:'./card.component.html',
    styleUrls:['./card.component.scss']
})
export class CardComponent  {
    @Input() country : Country
    @Input() language : string
    constructor(private router:Router){}
    
    openCardDetails():void { //переход к расширенной информации об элементе
        this.router.navigate(['/card',this.country._id])
    }
}