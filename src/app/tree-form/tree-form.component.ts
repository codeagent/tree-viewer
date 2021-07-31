import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StorageService } from '../storage.service';
import { TreeGeneratorService } from '../tree-generator.service';

@Component({
  selector: 'app-tree-form',
  templateUrl: './tree-form.component.html',
  styleUrls: ['./tree-form.component.css']
})
export class TreeFormComponent {
  readonly form = new FormGroup({
    roots: new FormControl(8, [Validators.required, Validators.min(0)]),
    minChildren: new FormControl(1, [Validators.required, Validators.min(0)]),
    maxChildren: new FormControl(8, [Validators.required, Validators.min(0)]),
    maxDepth: new FormControl(4, [Validators.required, Validators.min(0)])
  });

  constructor(
    private readonly router: Router,
    private readonly treeGeneratorService: TreeGeneratorService,
    private readonly storageService: StorageService
  ) {}

  async generate() {
    this.treeGeneratorService
      .generateStringTree(this.form.value)
      .subscribe(tree => {
        this.storageService.setItem('tree', tree);
        this.router.navigate(['/tree/view']);
      });
  }
}
