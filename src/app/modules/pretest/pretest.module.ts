import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, TableModule, BadgeModule, AlertModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { PretestComponent } from "./components/pretest-list.component";
import { PretestRoutingModule } from "./pretest-routing.module";
import { PretestCreateComponent } from './components/pretest-create.component';



@NgModule({
    imports: [
        PretestRoutingModule,
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
        PretestComponent,
        PretestCreateComponent
    ]
})

export class PretestModule {
}