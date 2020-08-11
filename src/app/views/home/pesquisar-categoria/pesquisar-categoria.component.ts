import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveService } from 'src/app/shared/service/live.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pesquisar-categoria',
  templateUrl: './pesquisar-categoria.component.html',
  styleUrls: ['./pesquisar-categoria.component.css'],
})
export class PesquisarCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<PesquisarCategoriaComponent>
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      categoria: ['', [Validators.required]],
    });
  }

  addCategoria() {
    this.rest.addCategoria(this.categoriaForm.value.categoria);
    this.cancel();
  }
  cancel(): void {
    this.dialogRef.close();
    this.categoriaForm.reset();
  }
}
