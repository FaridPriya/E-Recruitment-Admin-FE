import { CandidateComponent } from "./components/candidate-list.component";
import { CandidateCreateComponent } from "./components/candidate-create.component";
import { CandidateDetailComponent } from "./components/candidate-detail.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Candidate',
    },
    children: [
      {
        path: '',
        component: CandidateComponent,
        data: {
          title: 'Candidate List'
        }
      },
      {
        path: 'create',
        component: CandidateCreateComponent,
        data: {
          title: 'Candidate Create'
        }
      },
      {
        path: ':id',
        component: CandidateDetailComponent,
        data: {
          title: 'Candidate Detail'
        }
      }
    ]
  }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CandidateRoutingModule {
}