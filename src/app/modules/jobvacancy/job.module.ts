import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, TableModule, BadgeModule, AlertModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { JobRoutingModule } from "./job-routing.module";
import { JobListComponent } from "./components/job-list.component";



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
        JobListComponent
    ]
})

export class JobModule {
}