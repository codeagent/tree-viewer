import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as TreeGen from 'tree-json-generator';

export type Tree<T> = TreeNode<T>[];

export interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

export interface TreeCreationParams {
  roots: number;
  minChildren: number;
  maxChildren: number;
  maxDepth: number;
}

@Injectable({ providedIn: 'root' })
export class TreeGeneratorService {
  generateStringTree(params: TreeCreationParams): Observable<Tree<string>> {
    return of(
      TreeGen.generate({
        node: {
          id: '@id()',
          value: '@randomName()',
          children: '@child()'
        },
        rootNodesNumber: params.roots,
        childNodesNumber: [params.minChildren, params.maxChildren],
        hasChildRate: 0.4,
        maxLevel: params.maxDepth
      })
    ).pipe(delay(1000));
  }
}
