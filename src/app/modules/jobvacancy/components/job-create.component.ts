import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantSpecificationService, JobVacancyService } from 'src/app/services/app.service';
import { ApplicantSpecificationDTO, ApplicantSpecificationItemDTO } from 'src/app/dto/ApplicantSpecificationDTO';
import { JobVacancyDTO, JobVacancyRequirementDTO } from 'src/app/dto/JobVacancyDTO';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-job-create',
    templateUrl: './job-create.component.html',
    styleUrls: ['./job-create.component.scss']
})

export class JobCreateComponent implements OnInit {
    attachedForm!: FormGroup;
    applicantSpecificationDTO!: ApplicantSpecificationDTO[];
    visible = false;
    dismissible = false;
    loading = false;
    errorMessage: any;

    skillSpec!: ApplicantSpecificationDTO[];
    educationSpec!: ApplicantSpecificationDTO[];
    experienceSpec!: ApplicantSpecificationDTO[];
    itemSkillSpec: ApplicantSpecificationItemDTO[] = [];
    itemEducationSpec: ApplicantSpecificationItemDTO[]= [];
    itemExperienceSpec: ApplicantSpecificationItemDTO[] = [];

    listRequirement: JobVacancyRequirementDTO[] = [];
    jobVacancyDTO: JobVacancyDTO = new JobVacancyDTO();

    constructor(
        private fb: FormBuilder,
        private applicantSpecificationService: ApplicantSpecificationService,
        private jobVacancyService: JobVacancyService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.setupForm()
        this.getApplicantSpec()
    }

    setupForm() {
        // Set form to default values
        this.attachedForm = this.fb.group({
          Name: ['', [Validators.required]],
          Description: [''],
          IsActive: [true]
        });
    }

    getApplicantSpec() {
        this.applicantSpecificationService.getDataWithItem().subscribe((data: any) => {
            this.applicantSpecificationDTO =  { ...this.applicantSpecificationDTO, ...data };
            const listSkill = data.filter((a: ApplicantSpecificationDTO) => a.Type == "Skill");
            if(listSkill){
                this.skillSpec = listSkill
            }

            const listEducation = data.filter((a: ApplicantSpecificationDTO) => a.Type == "Education");
            if(listEducation){
                this.educationSpec = listEducation
            }

            const listExperience = data.filter((a: ApplicantSpecificationDTO) => a.Type == "Experience");
            if(listExperience){
                this.experienceSpec = listExperience
            }
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

    _submitForm() {
        for (const i of Object.keys(this.attachedForm.controls)) {
          this.attachedForm.get(i)!.markAsDirty();
        }
    }

    getFormControl(name: string) {
        return this.attachedForm.get(name);
    }

    AddRequirement(item: ApplicantSpecificationDTO){
        var dataAny = this.listRequirement.some((a)=>a.ApplicantSpecificationId == item.Id);
        if(dataAny) {
            this.listRequirement = this.listRequirement.filter(a => a.ApplicantSpecificationId != item.Id)
        }else{
            const requirement = new JobVacancyRequirementDTO()
            requirement.ApplicantSpecificationId = item.Id;
            requirement.ApplicantSpecificationName = item.Name;
            this.listRequirement.push(requirement);
        }

        this.showItemRequirement(item);
    }

    showItemRequirement(spec: ApplicantSpecificationDTO){
        if(spec.Type == "Skill"){
            var dataAny = this.itemSkillSpec.some((a)=>a.ApplicantSpecificationId == spec.Id);
            if(dataAny) {
                this.itemSkillSpec = this.itemSkillSpec.filter(a => a.ApplicantSpecificationId != spec.Id)
            }else{
                const itemSpec = spec.ListApplicantSpecificationsItem.map((item) =>{
                    return{
                        ApplicantSpecificationId: item.ApplicantSpecificationId,
                        Id : item.Id,
                        Name: item.Name
                    } as ApplicantSpecificationItemDTO
                })
                this.itemSkillSpec = this.itemSkillSpec.concat(itemSpec);
            }
        }

        if(spec.Type == "Education"){
            var dataAny = this.itemEducationSpec.some((a)=>a.ApplicantSpecificationId == spec.Id);
            if(dataAny) {
                this.itemEducationSpec = this.itemEducationSpec.filter(a => a.ApplicantSpecificationId != spec.Id)
            }else{
                const itemSpec = spec.ListApplicantSpecificationsItem.map((item) =>{
                    return{
                        ApplicantSpecificationId: item.ApplicantSpecificationId,
                        Id : item.Id,
                        Name: item.Name
                    } as ApplicantSpecificationItemDTO
                })
                this.itemEducationSpec = this.itemEducationSpec.concat(itemSpec);
            }
        }

        if(spec.Type == "Experience"){
            var dataAny = this.itemExperienceSpec.some((a)=>a.ApplicantSpecificationId == spec.Id);
            if(dataAny) {
                this.itemExperienceSpec = this.itemExperienceSpec.filter(a => a.ApplicantSpecificationId != spec.Id)
            }else{
                const itemSpec = spec.ListApplicantSpecificationsItem.map((item) =>{
                    return{
                        ApplicantSpecificationId: item.ApplicantSpecificationId,
                        Id : item.Id,
                        Name: item.Name
                    } as ApplicantSpecificationItemDTO
                })
                this.itemExperienceSpec = this.itemExperienceSpec.concat(itemSpec);
            }
        }
    }

    generateDataSend() {
        this.jobVacancyDTO.Name = this.attachedForm.value.Name;
        this.jobVacancyDTO.Description = this.attachedForm.value.Description;
        this.jobVacancyDTO.IsActive = this.attachedForm.value.IsActive;
        this.jobVacancyDTO.ListRequirement = this.listRequirement;
    }

    save(){
        this._submitForm();
        if (this.attachedForm.valid) {
            this.loading = true;
            this.generateDataSend();
            this.jobVacancyService.postData(this.jobVacancyDTO).subscribe(data => {
                this.loading = false;
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
              }, error => {
                console.log(error);
                if (error != null) {
                    const code = error.status;
                    if (code === 401) {
                        this.router.navigateByUrl(`login`);
                    }
                }
                this.loading = false;
                this.showError(error.error);
            })
        }
        this.loading = false;
    }

    showError(msg: string){
        this.errorMessage = msg;
        this.visible = true
        this.dismissible = true;
    }

}
