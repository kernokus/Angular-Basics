import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../app.component'
@Component({
    selector:'app-card',
    templateUrl:'./card.component.html',
    styleUrls:['./card.component.scss']
})
export class CardComponent implements OnInit {
    
    

    @Input() country : any
    @Input() language : string
    

    
    
    

    ngOnInit(){
        console.log("onInitCard")
    }
}