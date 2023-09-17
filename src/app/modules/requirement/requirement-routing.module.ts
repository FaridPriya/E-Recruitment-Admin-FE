import { RequirementComponent } from "./components/requirement-list.component";
import { RequirementCreateComponent } from "./components/requirement-create.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
      path: '',
      component: RequirementComponent,
      data: {
        title: 'Requirement'
      }
    },
    {
      path: 'create',
      component: RequirementCreateComponent,
      data: {
        title: 'Requirement Create'
      }
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RequirementRoutingModule {
}