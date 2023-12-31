import { JobListComponent } from "./components/job-list.component";
import { JobCreateComponent } from "./components/job-create.component";
import { JobDetailComponent } from "./components/job-detail.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Job Vacancy',
    },
    children: [
      {
        path: '',
        component: JobListComponent,
        data: {
          title: 'Job Vacancy List'
        }
      },
      {
        path: 'create',
        component: JobCreateComponent,
        data: {
          title: 'Job Vacancy Create'
        }
      },
      {
        path: ':id',
        component: JobDetailComponent,
        data: {
          title: 'Job Vacancy Detail'
        }
      }
    ]
  }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class JobRoutingModule {
}