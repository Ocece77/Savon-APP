import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  urlImage : String[] = ["savon-app/src/assets/savon.jpg",
"savon-app/src/assets/savon2.jpg",
 "savon-app/src/assets/savon3.jpg",]
  ngOnInit(): void {
    
  }
}
