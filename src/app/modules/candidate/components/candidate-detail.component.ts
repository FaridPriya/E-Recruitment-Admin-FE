import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService, PretestService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateDetailDTO } from 'src/app/dto/CandidteDetailDTO';
import { CandidatePretestAnswerDTO } from 'src/app/dto/CandidatePretestAnswerDTO';
import { ConverterHelper } from './converter-helper';


@Component({
    selector: 'app-candidate-detail',
    templateUrl: './candidate-detail.component.html',
    styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {
    attachedForm!: FormGroup;
    visible = false;
    dismissible = false;
    errorMessage: any;

    idCandidate = '';
    candidate: CandidateDetailDTO = new CandidateDetailDTO();
    resumeParse: any = null;
    converterHelper = ConverterHelper

    candidatePretestAnswerDTO: CandidatePretestAnswerDTO[] = []
    constructor(
        private fb: FormBuilder,
        private candidateService: CandidateService,
        private pretestService: PretestService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }
    
    ngOnInit(): void {
        this.getData();
        this.getPretestResult();
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

    getData() {
        this.idCandidate = this.activatedRoute.snapshot.params['id'];
        this.candidateService.getDataById(this.idCandidate).subscribe((data: any) => {
            this.candidate = data;
            this.resumeParse = this.candidate.AIScreeningResult;

            if (this.resumeParse != null && this.resumeParse != undefined) {
                this.parseResumeResult();
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

    getPretestResult() {
        this.pretestService.getCandidateAnswer(this.idCandidate).subscribe((data: any) => {
            this.candidatePretestAnswerDTO = data
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

    parseResumeResult() {
        this.resumeParse = JSON.parse(this.resumeParse);
        console.log(this.resumeParse);
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

    save(status: number){
        this.candidateService.updateStatus(this.idCandidate, status).subscribe(data => {
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