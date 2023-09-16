import { RequirementComponent } from "./components/requirement-list.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
      path: '',
      component: RequirementComponent,
      data: {
        title: 'Requirement'
      }
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RequirementRoutingModule {
}