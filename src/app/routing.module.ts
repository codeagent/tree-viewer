import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { TreeFormComponent } from './tree-form/tree-form.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeResolver } from './tree.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tree/view',
    component: TreeViewComponent,
    resolve: { tree: TreeResolver },
    canActivate: [AuthGuard]
  },
  {
    path: 'tree/form',
    component: TreeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'tree/view'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
