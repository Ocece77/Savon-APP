import { Component,ElementRef,ViewChild, Input, OnInit, viewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() isOpen! : boolean ;
  @Input() isOver! : boolean ;
  barsId = viewChild<ElementRef<HTMLElement>>('barsId');
  sideNav = viewChild<ElementRef<HTMLElement>>('sideNav');
  xmark = viewChild<ElementRef<HTMLElement>>('xmark');
  ngOnInit(): void {
    this.isOpen = false; /*Etat de la navbar */
  }
  
   openNav= () => {
    this.isOpen = true
    const sideNav = this.sideNav()!;
    if (this.isOpen){
      sideNav.nativeElement.classList.remove("d-none");
      sideNav.nativeElement.classList.add("show-item");
    } 
  };
  
    closeNav = () => {
      this.isOpen = false
      const sideNav = this.sideNav()!;
      if (!this.isOpen){
        sideNav.nativeElement.classList.remove("show-item");
        sideNav.nativeElement.classList.add("d-none");
    }

  };


}
