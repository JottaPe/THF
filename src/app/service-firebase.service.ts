import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class ServiceFirebaseService {

  getContatos() {
    return this.firestore.collection('contatos').snapshotChanges();
  }

  postContatos(contatos: object) {
    return this.firestore.collection('contatos').add(contatos);
  }

  updateContatos(contatos: object, id: string) {
    return this.firestore.doc('contatos/'+ id ).update(contatos);
  }

  deleteContatos(contatos: object, id: string) {
    console.log(id)
    console.log(contatos)
    return this.firestore.doc('contatos/'+ id ).delete();
  }

  

  constructor(private firestore: AngularFirestore) { }
}
