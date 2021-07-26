import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] =[];
  hereoSeleccionado: Heroe | undefined;
  bacio: boolean = false;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    
  }

  buscando(){
    this.bacio = false;
    this.heroesService.getSugerencias(this.termino.trim()).subscribe((heroes)=>{
      this.heroes = heroes;
      this.bacio = this.heroes.length === 0;
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    if(event.option.value !== ''){
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
  
      this.heroesService.getHeroe(heroe.id!).subscribe(heroe => this.hereoSeleccionado = heroe);
    }else{
      this.hereoSeleccionado = undefined;
    }
    
  }

}
