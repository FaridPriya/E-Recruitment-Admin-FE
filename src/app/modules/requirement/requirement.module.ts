import { NgModule } from "@angular/core";
import { RequirementComponent } from "./components/requirement-list.component";
import { RequirementRoutingModule } from "./requirement-routing.module";

@NgModule({
    imports: [
        RequirementRoutingModule,
    ],
    declarations: [RequirementComponent]
})

export class RequirementModule {
}