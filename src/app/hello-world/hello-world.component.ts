import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { ServiceFirebaseService } from 'src/app/service-firebase.service';
import { utf8Encode } from '@angular/compiler/src/util';


@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})


export class HelloWorldComponent implements OnInit {

  contatos 
  csv
  url = "https://thf.totvs.com.br/sample/api/uploads/addFile"

  colunas = [
    { property: 'id', label: 'Código', align: 'right', readonly: true, freeze: true, width: 120 },
    { property: 'nome', label: 'Nome', width: 100, required: true },
    { property: 'telefone', label: 'Telefone', width: 100 },
    { property: 'email', label: 'E-mail', width: 100, required: true },
    { property: 'outros', label: '...', width: 10, readonly: true,  },
  ];

  rowActions = {
    beforeSave: this.onBeforeSave.bind(this),
    afterSave: this.onAfterSave.bind(this),
    beforeRemove: this.onBeforeRemove.bind(this),
    afterRemove: this.onAfterRemove.bind(this),
    beforeInsert: this.onBeforeInsert.bind(this)
  };

  constructor(private serviceFirebaseService: ServiceFirebaseService,private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.listar();
  };

  // Get 
  listar(){
    this.serviceFirebaseService.getContatos().subscribe(res => {
      this.contatos = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
          
        }
      });
    })
  };

  onBeforeSave(row: any, old: any) {
    var contato = {}
    var altera = false;

    if (  (old.id !== undefined )  && (row.nome !== old.nome || row.telefone !== old.telefone || row.email !== old.email) ) {
      altera = true;
      contato = {
        nome : row.nome,
        telefone : row.telefone,
        email : row.email
      }
    }else{
      contato = {
        nome : row.nome,
        telefone : row.telefone,
        email : row.email
      }
    }
    if (altera) {
     // this.httpService.putContatos(row).toPromise();
     this.serviceFirebaseService.updateContatos(contato,row.id);
     console.log("onBeforeSave","altera",row)
    }else{
      //this.httpService.postContatos(contato).toPromise();
      this.serviceFirebaseService.postContatos(contato);
      console.log("onBeforeSave","inclui")
    }
    
    return true;
  };

  onBeforeRemove(row) {
    console.log("onBeforeRemove")
    if (row.id !== undefined ) {
      this.serviceFirebaseService.deleteContatos(row,row.id);
    }
    return true;
  };

  // Inicia a linha já com as propriedades `name` e `created` preenchidas.
  onBeforeInsert(row: any) {
    console.log("onBeforeInsert")
    return true;
  }
  onAfterSave(row) {
     console.log('onAfterSave(new): ', row);
  }
  onAfterRemove(row) {
     console.log('onAfterRemove: ', row);
  }

  //Upload de arquivos
  Upload(event) {
    let retorno;
    const fileInput = event.file.rawFile;

    retorno = this.cargaInicial(fileInput);
    this.afStorage.upload(fileInput.name,fileInput);
    this.url = "https://thf.totvs.com.br/sample/api/uploads/addFile"
  }

  cargaInicial(fileInput){

    this.csv = fileInput;

    let reader: FileReader = new FileReader();
    reader.readAsText(this.csv);

    reader.onload = (e) => {
      let csv: string = reader.result.toString();
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(',');
      let lines = [];

      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          for (let j = 0; j < headers.length; j++) {
            if (data[j] !== "" ) {
              lines.push(utf8Encode(data[j]));
            }
          }
        }
      }
      for (let index = 0; index < lines.length; index++) {
        let objeto = {};
        let linha: String = lines[index].split(";");
        objeto["nome"] = linha[0] ;
        objeto["telefone"] = linha[1];
        objeto["email"] = linha[2];
        console.log("linha",linha)
        console.log("objeto",objeto)
        this.contatos.push(objeto);
        this.serviceFirebaseService.postContatos(objeto);
      }    
    } 
  };


}