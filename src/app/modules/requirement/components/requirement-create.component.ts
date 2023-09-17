import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantSpecificationService } from 'src/app/services/app.service';
import { ApplicantSpecificationDTO, ApplicantSpecificationItemDTO } from 'src/app/dto/ApplicantSpecificationDTO';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-requirement-create',
    templateUrl: './requirement-create.component.html',
    styleUrls: ['./requirement-create.component.scss']
})

export class RequirementCreateComponent implements OnInit {
    attachedForm!: FormGroup;
    listSpecificationItem: ApplicantSpecificationItemDTO[] = [];
    specificationItem!: string;
    applicantSpecificationDTO: ApplicantSpecificationDTO = new ApplicantSpecificationDTO();
    visible = false;
    dismissible = false;
    errorMessage: any;
    constructor(
        private fb: FormBuilder,
        private applicantSpecificationService: ApplicantSpecificationService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.setupForm()
    }

    setupForm() {
        // Set form to default values
        this.attachedForm = this.fb.group({
          Name: ['', [Validators.required]],
          Description: [''],
          Item:['']
        });
    }

    _submitForm() {
        for (const i of Object.keys(this.attachedForm.controls)) {
          this.attachedForm.get(i)!.markAsDirty();
        }
    }

    getFormControl(name: string) {
        return this.attachedForm.get(name);
    }

    setItemSpec(){
        this.addItemSpec();
        this.specificationItem = '';
    }

    addItemSpec(){
        var item = new ApplicantSpecificationItemDTO();
        item.Name = this.specificationItem;
        this.listSpecificationItem.push(item)
    }

    deleteItemSpec(itemIndex: number){
        this.listSpecificationItem.splice(itemIndex, 1);
    }

    save(){
        this._submitForm();
        if (this.attachedForm.valid) {
            this.applicantSpecificationDTO.Name = this.attachedForm.value.Name;
            this.applicantSpecificationDTO.Description = this.attachedForm.value.Description;
            this.applicantSpecificationDTO.ListApplicantSpecificationsItem = this.listSpecificationItem;

            this.applicantSpecificationService.postData(this.applicantSpecificationDTO).subscribe(data => {
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
              }, error => {
                console.log(error);
                this.showError(error.error);
            })
        }
    }

    showError(msg: string){
        this.errorMessage = msg;
        this.visible = true
        this.dismissible = true;
    }

}
