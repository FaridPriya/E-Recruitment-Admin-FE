import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService, JobVacancyService, EdenAiService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobVacancyDTO } from 'src/app/dto/JobVacancyDTO';
import { CandidateDTO } from 'src/app/dto/CandidateDTO';
import { FORM_VALIDATION } from 'src/app/dto/Constanta';

@Component({
    selector: 'app-candidate-create',
    templateUrl: './candidate-create.component.html',
    styleUrls: ['./candidate-create.component.scss']
})

export class CandidateCreateComponent implements OnInit {
    attachedForm!: FormGroup;
    visible = false;
    dismissible = false;
    errorMessage: any;

    listJob:JobVacancyDTO[] = [];
    candidateDTO:CandidateDTO = new CandidateDTO();
    selectedJob!: string;
    formValidationType = FORM_VALIDATION;
    isScreeningCv = false;

    constructor(
        private fb: FormBuilder,
        private candidateService: CandidateService,
        private jobVacancyService: JobVacancyService,
        private edenAiService: EdenAiService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    formValidation(){
        return FORM_VALIDATION;
    }

    ngOnInit(): void {
        this.getJobVacancy()
        this.setupForm()
    }

    getJobVacancy() {
        this.jobVacancyService.getData().subscribe(data => {
            this.listJob = data;
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

    changeJobSelected(item: any) {
        console.log(this.selectedJob);
    }

    setupForm() {
        // Set form to default values
        this.attachedForm = this.fb.group({
          Name: ['', [Validators.required]],
          JobId:['',[Validators.required]],
          Phone:['',[Validators.required, Validators.pattern(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/)]],
          Email:['',[Validators.required, Validators.email]],
          File: [''],
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

    generateDataSend() {
        this.candidateDTO.Name = this.attachedForm.value.Name;
        this.candidateDTO.Email = this.attachedForm.value.Email;
        this.candidateDTO.NoHandphone = this.attachedForm.value.Phone;
        this.candidateDTO.IdJobVacancy = this.selectedJob;
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.attachedForm.get('File')!.setValue(file);
            this.isScreeningCv = true;
        }else{
            this.isScreeningCv = false;
        }
    }

    save(){
        this._submitForm();
        if (this.attachedForm.valid) {
            this.generateDataSend();
            this.candidateService.postData(this.candidateDTO).subscribe(data => {
                if(this.isScreeningCv) {
                    this.screeningCv(data.Id)
                }else{
                    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
    }

    screeningCv(id:string) {
        this.edenAiService.screeningCv(this.attachedForm.value.File, id).subscribe(data => {
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

    showError(msg: string){
        this.errorMessage = msg;
        this.visible = true
        this.dismissible = true;
    }

}
