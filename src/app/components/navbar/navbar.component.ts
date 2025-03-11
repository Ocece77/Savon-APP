import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() isOpen! : boolean ;
  ngOnInit(): void {
    this.isOpen = false; /*Etat de la navbar */
  }
  
   handleNav = () => {
    this.isOpen = !this.isOpen
  }
   
  handleDesign = () => {
    const bars = document.getElementById("bars-icon");
    const savon = document.getElementById("savon-icon");
    savon?.classList.remove("d-none")
    bars?.classList.add("d-none")
    console.log("donuts and cats")
  }

}
