import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  constructor(
    private actiavatedRouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.actiavatedRouter.params.subscribe(({id})=>{
      console.log(id);
    });
  }

}
