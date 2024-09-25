import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazyimage.component.html',
  styleUrl: './lazyimage.component.css'
})
export class LazyimageComponent implements OnInit{
  ngOnInit(): void {
    if(!this.url) throw new Error('Url property is required');
  }
  @Input()
  public url!: string;
  @Input()
  public alt: string = ''

  hasLoaded: boolean = false;

  onLoad(){
    setTimeout(()=>{
      this.hasLoaded = true;
    },400)
  }
}
