import { Pipe, PipeTransform } from '@angular/core';


export interface languageArray {
    name: String; 
  }
@Pipe({
    name: 'objInLanguage'
})
export class LanguagePipe implements PipeTransform {
    res:string = ""
    transform(value: Array<languageArray>, args?: any): string {
    value.forEach(it => {
        this.res+=it.name + ","
    });
    this.res=this.res.slice(0, -1)
    return this.res
  }
}