import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlHeroes: string ='/heroes';
  private limit: number = 6;

  constructor(
    private http: HttpClient
  ) 
  { }

  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(environment.baseUrl+this.urlHeroes);
  }

  getHeroe(id: string):Observable<Heroe>{
    return this.http.get<Heroe>(environment.baseUrl+this.urlHeroes+'/'+id);
  }


  getSugerencias( termino: string ):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(environment.baseUrl+this.urlHeroes+'?q='+termino+'&_limit='+this.limit);
  }
}
