import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { StorageService } from './storage.service';
import { Tree } from './tree-generator.service';

@Injectable({
  providedIn: 'root'
})
export class TreeResolver<T> implements Resolve<Tree<T>> {
  constructor(private readonly storageService: StorageService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Tree<T>> {
    return of(this.storageService.getItem('tree', null));
  }
}
