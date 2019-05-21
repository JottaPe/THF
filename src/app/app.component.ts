import { Component } from '@angular/core';
import { HttpService } from './http.service';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
const config = {
    apiKey: "AIzaSyDhTyY8bBVY89iw4YrTbco_rMHa49dGhEA",
    authDomain: "ftptprime.firebaseapp.com",
    databaseURL: "https://ftptprime.firebaseio.com",
    projectId: "ftptprime",
    storageBucket: "ftptprime.appspot.com",
    messagingSenderId: "830307047288",
    appId: "1:830307047288:web:3fa8ea18c5028c99"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
    firebase.initializeApp(config);
    firebase.firestore().settings(settings);
  };

}
