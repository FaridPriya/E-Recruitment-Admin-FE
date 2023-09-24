import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, TableModule, BadgeModule, AlertModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { RequirementComponent } from "./components/requirement-list.component";
import { RequirementRoutingModule } from "./requirement-routing.module";
import { RequirementCreateComponent } from "./components/requirement-create.component";
import { RequirementDetailComponent } from "./components/requirement-detail.component";


@NgModule({
    imports: [
        RequirementRoutingModule,
        TableModule,
        CardModule,
        GridModule,
        CommonModule,
        IconModule,
        ButtonModule,
        FormModule,
        BadgeModule,
        AlertModule,
        FormsModule, 
        ReactiveFormsModule
    ],
    declarations: [
        RequirementComponent, 
        RequirementCreateComponent,
        RequirementDetailComponent
    ]
})

export class RequirementModule {
}