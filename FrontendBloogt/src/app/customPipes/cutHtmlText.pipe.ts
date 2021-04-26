import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ 
  name: 'CutHTMLText', 
  pure: false 
})

export class CutHtmlText implements PipeTransform {

  transform(content : string, length: number) {
    let textMaxSize = length;

    let cleanText = content.replace(/<\/?[^>]+(>|$)/g, "");
    let cutContent = new String(cleanText).trim().slice(0,textMaxSize);
    
    if(cleanText.length > textMaxSize){
      cutContent = cutContent + " ...";
    }

    return cutContent;
  }
}