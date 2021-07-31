import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener } from '@angular/material/tree';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { Tree, TreeNode } from '../tree-generator.service';

interface FlattenedTreeNode<T> extends TreeNode<T> {
  level: number;
  expandable: boolean;
}

class TreeDataSource<T, F> extends DataSource<F> {
  set data(data: T[]) {
    this._data = data;
    this._expanded = this.getExpanded();
  }

  get data() {
    return this._data;
  }

  private _pageSize = 30;
  private _itemSize = 50;
  private _data: T[] = [];
  private _expanded: F[] = [];
  private disconnect$ = new Subject();

  constructor(
    private readonly viewport: CdkVirtualScrollViewport,
    private readonly treeControl: FlatTreeControl<F>,
    private readonly treeFlattener: MatTreeFlattener<T, F>
  ) {
    super();
  }

  connect(): Observable<F[]> {
    this.viewport.setTotalContentSize(this._expanded.length * this._itemSize);

    return merge(
      of(null),
      this.viewport.elementScrolled(),
      this.treeControl.expansionModel.changed.pipe(
        takeUntil(this.disconnect$),
        tap(() => (this._expanded = this.getExpanded())),
        tap(() =>
          this.viewport.setTotalContentSize(
            this._expanded.length * this._itemSize
          )
        )
      )
    ).pipe(
      takeUntil(this.disconnect$),
      map(() => this.getOffset()),
      tap(x => this.viewport.setRenderedContentOffset(x * this._itemSize)),
      map(x => this.getViewedData(x))
    );
  }

  disconnect() {
    this.disconnect$.next();
  }

  private getOffset() {
    return Math.floor(
      this.viewport.elementRef.nativeElement.scrollTop / this._itemSize
    );
  }

  private getViewedData(offset: number) {
    return this._expanded.slice(offset, offset + this._pageSize);
  }

  private getExpanded() {
    const flattened = this.treeFlattener.flattenNodes(this._data);
    return this.treeFlattener.expandFlattenedNodes(flattened, this.treeControl);
  }
}

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit, AfterViewInit {
  tree: Tree<string>;
  treeFlattener = new MatTreeFlattener<
    TreeNode<string>,
    FlattenedTreeNode<string>
  >(
    (node: TreeNode<string>, level: number) =>
      Object.assign(node, {
        level,
        expandable: !!node.children && node.children.length > 0
      }),
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  treeControl = new FlatTreeControl<FlattenedTreeNode<string>>(
    node => node.level,
    node => node.expandable
  );
  hasChild = (_: number, node: FlattenedTreeNode<string>) => node.expandable;
  @ViewChild(CdkVirtualScrollViewport)
  virtualScroll: CdkVirtualScrollViewport = null;
  dataSource: TreeDataSource<TreeNode<string>, FlattenedTreeNode<string>>;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(e => {
      this.tree = e.tree;
    });
  }

  ngAfterViewInit() {
    this.dataSource = new TreeDataSource(
      this.virtualScroll,
      this.treeControl,
      this.treeFlattener
    );
    this.dataSource.data = this.tree;
  }
}
