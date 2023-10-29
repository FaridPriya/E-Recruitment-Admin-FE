import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantSpecificationService, JobVacancyService, PretestService } from 'src/app/services/app.service';
import { ApplicantSpecificationDTO, ApplicantSpecificationItemDTO } from 'src/app/dto/ApplicantSpecificationDTO';
import { JobVacancyDTO, JobVacancyRequirementDTO } from 'src/app/dto/JobVacancyDTO';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PretestQuestionDTO } from 'src/app/dto/PretestQuestionDTO';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})

export class JobDetailComponent implements OnInit {
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
    jobId!: string;
    listTest!: PretestQuestionDTO[];
    pretestSelected!: string;

    constructor(
        private fb: FormBuilder,
        private applicantSpecificationService: ApplicantSpecificationService,
        private jobVacancyService: JobVacancyService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private pretestService: PretestService
    ) { }

    ngOnInit(): void {
        this.setupForm()
        this.getPreTest();
        this.getData();
        this.getApplicantSpec()
    }

    setupForm() {
        // Set form to default values
        this.attachedForm = this.fb.group({
          Name: ['', [Validators.required]],
          Description: [''],
          PretestQuestionId: [''],
          IsActive: [true]
        });
    }

    getPreTest(){
        this.pretestService.getData().subscribe(data => {
            this.listTest = data;
        }, error => {
            if (error != null) {
                const code = error.status;
                if (code === 401) {
                    this.router.navigateByUrl(`login`);
                }
            }
            console.log(error);
        })
    }

    getData() {
        this.jobId = this.activatedRoute.snapshot.params['id'];
        this.jobVacancyService.getDataById(this.jobId).subscribe((data: any) => {
            this.jobVacancyDTO =  { ...this.jobVacancyDTO, ...data };
            this.attachedForm.get("Name")!.setValue(this.jobVacancyDTO.Name);
            this.attachedForm.get("Description")!.setValue(this.jobVacancyDTO.Description);
            this.attachedForm.get("IsActive")!.setValue(this.jobVacancyDTO.IsActive);
            this.listRequirement = this.jobVacancyDTO.ListRequirement;
            this.pretestSelected = this.jobVacancyDTO.PretestQuestionId;
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

    getApplicantSpec() {
        this.applicantSpecificationService.getDataWithItem().subscribe((data: any) => {
            this.applicantSpecificationDTO =  { ...this.applicantSpecificationDTO, ...data };
            const listSkill = data.filter((a: ApplicantSpecificationDTO) => a.Type == "Skill");
            if(listSkill){
                this.skillSpec = listSkill;
                this.skillSpec.forEach(item => {
                    var isSelected =  this.listRequirement.some(x => x.ApplicantSpecificationId == item.Id)
                    if(isSelected) {
                        item.IsSelected = true;
                        this.showItemRequirement(item);
                    }else{
                        item.IsSelected = false;
                    }
                })
            }

            const listEducation = data.filter((a: ApplicantSpecificationDTO) => a.Type == "Education");
            if(listEducation){
                this.educationSpec = listEducation;
                this.educationSpec.forEach(item => {
                    var isSelected =  this.listRequirement.some(x => x.ApplicantSpecificationId == item.Id)
                    if(isSelected) {
                        item.IsSelected = true;
                        this.showItemRequirement(item);
                    }else{
                        item.IsSelected = false;
                    }
                })
            }

            const listExperience = data.filter((a: ApplicantSpecificationDTO) => a.Type == "Experience");
            if(listExperience){
                this.experienceSpec = listExperience;
                this.experienceSpec.forEach(item => {
                    var isSelected =  this.listRequirement.some(x => x.ApplicantSpecificationId == item.Id)
                    if(isSelected) {
                        item.IsSelected = true;
                        this.showItemRequirement(item);
                    }else{
                        item.IsSelected = false;
                    }
                })
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
        this.jobVacancyDTO.PretestQuestionId = this.pretestSelected;
        this.jobVacancyDTO.ListRequirement = this.listRequirement;
    }

    save(){
        this._submitForm();
        if (this.attachedForm.valid) {
            this.loading = true;
            this.generateDataSend();
            this.jobVacancyService.updateData(this.jobVacancyDTO, this.jobId).subscribe(data => {
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
