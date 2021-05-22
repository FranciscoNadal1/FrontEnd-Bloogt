import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ 
  name: 'HashtagLinks', 
  pure: false 
})

export class HashtagLinkification implements PipeTransform {

  transform(content: string) {

  var words = content.split(" ");
  words.forEach( function(valor: string, indice, array) {
    if(valor.startsWith('#')){
      let hashtag = valor.substr(1)
      content = content.replace(valor,'<a href=\"/#/hashtag/'+hashtag+'\">'+valor+'</a>')
     // content = content.replace(valor,'<a [routerLink]="[/hashtag, '+hashtag+']">'+valor+'</a>')
                  

    }
});

    return content;
  }
}