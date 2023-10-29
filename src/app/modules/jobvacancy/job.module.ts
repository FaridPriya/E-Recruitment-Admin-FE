import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, TableModule, BadgeModule, AlertModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { JobRoutingModule } from "./job-routing.module";
import { JobListComponent } from "./components/job-list.component";
import { JobCreateComponent } from "./components/job-create.component";
import { JobDetailComponent } from "./components/job-detail.component";


@NgModule({
    imports: [
        JobRoutingModule,
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
        JobListComponent,
        JobCreateComponent,
        JobDetailComponent
    ]
})

export class JobModule {
}