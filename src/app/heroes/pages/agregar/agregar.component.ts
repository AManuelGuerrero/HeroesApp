import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width:100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];


  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    alt_img: ''
  }

  constructor(
    private actiavatedRouter: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    if(this.router.url.includes('editar')){
      this.actiavatedRouter.params.pipe(
        switchMap(({id})=>
        this.heroeService.getHeroe(id))
      ).subscribe((heroe)=>{
        this.heroe = heroe;
      })
    }
  
  }


  guardar(){

    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      this.heroeService.actualizarHeroe(this.heroe).subscribe(resp =>{
        this.mostrarSnakbar('Registro Actualizado');
      }); 
    }else{
      this.heroeService.agregarHeroe(this.heroe).subscribe(resp =>{
        this.mostrarSnakbar('Registro Creado');
        this.router.navigate(['/heroes/editar',resp.id]);
      }); 
    }
    
  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe((resp)=>{
      if(resp){
        this.heroeService.eliminarHeroe(this.heroe.id!).subscribe(resp=>{
        this.router.navigate(['/heroes']);
        });
      }
      
    })

    
  }

  mostrarSnakbar( mensaje: string){
    this._snackBar.open(mensaje, 'OK!',{
      duration: 2500
    });
  }

}
