import { RequirementComponent } from "./components/requirement-list.component";
import { RequirementCreateComponent } from "./components/requirement-create.component";
import { RequirementDetailComponent } from "./components/requirement-detail.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Requirement',
    },
    children: [
      {
        path: '',
        component: RequirementComponent,
        data: {
          title: 'Requirement List'
        }
      },
      {
        path: 'create',
        component: RequirementCreateComponent,
        data: {
          title: 'Requirement Create'
        }
      },
      {
        path: ':id',
        component: RequirementDetailComponent,
        data: {
          title: 'Requirement Detail'
        }
      }
    ]
  }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RequirementRoutingModule {
}