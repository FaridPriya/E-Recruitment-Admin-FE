import { JobListComponent } from "./components/job-list.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
      path: '',
      component: JobListComponent,
      data: {
        title: 'Job Vacancy'
      }
    }
    // {
    //   path: 'create',
    //   component: RequirementCreateComponent,
    //   data: {
    //     title: 'Requirement Create'
    //   }
    // },
    // {
    //   path: ':id',
    //   component: RequirementDetailComponent
    // }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class JobRoutingModule {
}