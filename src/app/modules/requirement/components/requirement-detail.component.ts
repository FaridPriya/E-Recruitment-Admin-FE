import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantSpecificationService } from 'src/app/services/app.service';
import { ApplicantSpecificationDTO, ApplicantSpecificationItemDTO } from 'src/app/dto/ApplicantSpecificationDTO';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-requirement-detail',
    templateUrl: './requirement-detail.component.html',
    styleUrls: ['./requirement-detail.component.scss']
})
export class RequirementDetailComponent implements OnInit {
    attachedForm!: FormGroup;
    listSpecificationItem: ApplicantSpecificationItemDTO[] = [];
    specificationItem!: string;
    applicantSpecificationDTO: ApplicantSpecificationDTO = new ApplicantSpecificationDTO();
    visible = false;
    dismissible = false;
    errorMessage: any;
    idSpecification = "";
    type = "";
    constructor(
        private fb: FormBuilder,
        private applicantSpecificationService: ApplicantSpecificationService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }
    
    ngOnInit(): void {
        this.getData();
        this.setupForm();
    }

    setupForm() {
        // Set form to default values
        this.attachedForm = this.fb.group({
          Name: ['', [Validators.required]],
          Type: ['', [Validators.required]],
          Description: [''],
          Item:['']
        });
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
        item.ApplicantSpecificationId = "";
        this.listSpecificationItem.push(item)
    }

    deleteItemSpec(itemIndex: number){
        this.listSpecificationItem.splice(itemIndex, 1);
    }

    getData() {
        this.idSpecification = this.activatedRoute.snapshot.params['id'];
        this.applicantSpecificationService.getDataById(this.idSpecification).subscribe((data: any) => {
            this.applicantSpecificationDTO =  { ...this.applicantSpecificationDTO, ...data };
            this.attachedForm.get("Name")!.setValue(this.applicantSpecificationDTO.Name);
            this.attachedForm.get("Description")!.setValue(this.applicantSpecificationDTO.Description);
            this.attachedForm.get("Type")!.setValue(this.applicantSpecificationDTO.Type);
            this.type = this.applicantSpecificationDTO.Type;
            this.listSpecificationItem = this.applicantSpecificationDTO.ListApplicantSpecificationsItem;
        }, error => {
            console.log(error);
            if (error != null) {
                const code = error.status;
                if (code === 401) {
                    this.router.navigateByUrl(`login`);
                }
            }
            this.showError(error.error);
        })
    }

    showError(msg: string){
        this.errorMessage = msg;
        this.visible = true
        this.dismissible = true;
    }

    _submitForm() {
        for (const i of Object.keys(this.attachedForm.controls)) {
          this.attachedForm.get(i)!.markAsDirty();
        }
    }

    save(){
        this._submitForm();
        if (this.attachedForm.valid) {
            this.applicantSpecificationDTO.Name = this.attachedForm.value.Name;
            this.applicantSpecificationDTO.Description = this.attachedForm.value.Description;
            this.applicantSpecificationDTO.Type = this.attachedForm.value.Type;
            this.applicantSpecificationDTO.ListApplicantSpecificationsItem = this.listSpecificationItem;

            this.applicantSpecificationService.updateData(this.applicantSpecificationDTO, this.idSpecification).subscribe(data => {
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
              }, error => {
                console.log(error);
                if (error != null) {
                    const code = error.status;
                    if (code === 401) {
                        this.router.navigateByUrl(`login`);
                    }
                }
                this.showError(error.error);
            })
        }
    }
}