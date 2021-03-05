import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';


import { AppComponent } from './app.component';
import {CardComponent} from './card/card.component';
import { FormComponent } from './form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GraphQLModule } from './graphql.module';
//for apollo
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormComponent //компоненты
  ],
  imports: [
    BrowserModule, //модули
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    CommonModule
    
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api.spacex.land/graphql/',
          }),
        };
      },
        deps:[HttpLink],


  },
],

  bootstrap: [AppComponent]
})
export class AppModule { }
