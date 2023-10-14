import { CandidateComponent } from "./components/candidate-list.component";
import { CandidateCreateComponent } from "./components/candidate-create.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
      path: '',
      component: CandidateComponent,
      data: {
        title: 'Candidate'
      }
    },
    {
      path: 'create',
      component: CandidateCreateComponent,
      data: {
        title: 'Candidate Create'
      }
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CandidateRoutingModule {
}