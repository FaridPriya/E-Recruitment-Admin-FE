import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateDetailDTO } from 'src/app/dto/CandidteDetailDTO';


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
    constructor(
        private fb: FormBuilder,
        private candidateService: CandidateService,
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

    getData() {
        this.idCandidate = this.activatedRoute.snapshot.params['id'];
        this.candidateService.getDataById(this.idCandidate).subscribe((data: any) => {
            this.candidate = data;
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
        
    }
}