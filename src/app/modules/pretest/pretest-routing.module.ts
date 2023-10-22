import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { PretestComponent } from './components/pretest-list.component';
import { PretestCreateComponent } from './components/pretest-create.component';



const routes: Routes = [
    {
      path: '',
      component: PretestComponent,
      data: {
        title: 'Pre-test'
      }
    },
    {
      path: 'create',
      component: PretestCreateComponent,
      data: {
        title: 'Pre-test Create'
      }
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PretestRoutingModule {
}