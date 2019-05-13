import { Component, OnInit } from '@angular/core';
import { ThfGridModule } from '@totvs/thf-ui/components/thf-grid';
import { ThfKendoModule } from '@totvs/thf-kendo';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  colunas = [
    { property: 'id', label: 'Código', align: 'right', width: 120 },
    { property: 'nome', label: 'Nome', width: '200px', required: true },
    { property: 'telefone', label: 'Contato', width: 150 },
    { property: 'email', label: 'E-Mail', width: 150 }
  ];
  contatos

  rowActions = {
    beforeSave: this.onBeforeSave.bind(this),
    afterSave: this.onAfterSave.bind(this),
    beforeRemove: this.onBeforeRemove.bind(this),
    afterRemove: this.onAfterRemove.bind(this),
    beforeInsert: this.onBeforeInsert.bind(this)
  };


  constructor(private httpService: HttpService) { }

  ngOnInit() {
   this.listar();
  }

  listar(){
    this.httpService.getContatos().subscribe(res => {
      this.contatos = res;
    })
  }

  onBeforeSave(row: any, old: any) {
    var contato = {}
    var altera = false;
    
    if (  (old.nome!== undefined )  && (row.nome !== old.nome || row.telefone !== old.telefone || row.email !== old.email) ) {
      console.log(old)
      altera = true;
    }else{
      contato = {
        id : row.id,
        nome : row.nome,
        telefone : row.telefone,
        email : row.email
      }
    }
    if (altera) {
      this.httpService.putContatos(row).toPromise();
    }else{
      this.httpService.postContatos(contato).toPromise();
    }
    
    return true;
  }

  onAfterSave(row) {
     console.log('onAfterSave(new):');
   
  }

  onBeforeRemove(row) {

    this.httpService.delContatos(row).toPromise();
     console.log('onBeforeRemove:');

    return true;
  }

  onAfterRemove(row) {
    console.log('onAfterRemove: ');
  }

  onBeforeInsert(row) {
     console.log('onBeforeInsert: ');
    
    return true;
  }
}