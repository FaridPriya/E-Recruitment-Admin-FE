import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { PretestComponent } from './components/pretest-list.component';
import { PretestCreateComponent } from './components/pretest-create.component';
import { PretestDetailComponent } from './components/pretest-detail.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pretest',
    },
    children: [
      {
        path: '',
        component: PretestComponent,
        data: {
          title: 'Pretest List'
        }
      },
      {
        path: 'create',
        component: PretestCreateComponent,
        data: {
          title: 'Pretest Create'
        }
      },
      {
        path: ':id',
        component: PretestDetailComponent,
        data: {
          title: 'Pretest Detail'
        }
    }
    ]
  }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PretestRoutingModule {
}