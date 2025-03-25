import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  urlImage : String[] = ["/assets/savon.jpg",
                          "/assets/savon2.jpg",
                          "/assets/savon3.jpg"]

  ngOnInit(): void {
  }
}
