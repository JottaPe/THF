import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  Contatos;
  
  menus = [
    { label: 'Grid', link: './hello-world' },
  ];

  constructor(private httpService: HttpService) {

  }
  ngOnInit() {
    this.httpService.getContatos().subscribe(res => {
      this.Contatos = res;
      })
    console.log("Passou aqui")
    console.log(this.Contatos);
  }

}
