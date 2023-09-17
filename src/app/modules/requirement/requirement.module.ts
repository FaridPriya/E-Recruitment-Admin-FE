import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, CardModule, GridModule, TableModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { RequirementComponent } from "./components/requirement-list.component";
import { RequirementRoutingModule } from "./requirement-routing.module";

@NgModule({
    imports: [
        RequirementRoutingModule,
        TableModule,
        CardModule,
        GridModule,
        CommonModule,
        IconModule,
        ButtonModule
    ],
    declarations: [RequirementComponent]
})

export class RequirementModule {
}