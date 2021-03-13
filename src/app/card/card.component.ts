import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Card} from '../app.component'
@Component({
    selector:'app-card',
    templateUrl:'./card.component.html',
    styleUrls:['./card.component.scss']
})
export class CardComponent implements OnInit {
    
    

    @Input() country : any
    @Input() language : string
    

    constructor(private router:Router){}
    
    

    ngOnInit(){
    }


    openCardDetails() {
        this.router.navigate(['card'])
    }
}