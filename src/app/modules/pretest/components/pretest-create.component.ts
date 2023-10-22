import { Component, OnInit } from '@angular/core';
import { PretestService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FORM_VALIDATION } from 'src/app/dto/Constanta';
import { PretestQuestionDTO, PretestQuestionItemDTO } from 'src/app/dto/PretestQuestionDTO';
import { freeSet } from '@coreui/icons';
import { LoadingService } from 'src/app/services/Loading.Service';


@Component({
    selector: 'app-pretest-create',
    templateUrl: './pretest-create.component.html',
    styleUrls: ['./pretest-create.component.scss']
})

export class PretestCreateComponent implements OnInit {
    attachedForm!: FormGroup;
    visible = false;
    dismissible = false;
    errorMessage: any;
    icons = freeSet;

    formValidationType = FORM_VALIDATION;
    question!: string;
    listQuestionItem: PretestQuestionItemDTO[] = [];
    pretestDataSend: PretestQuestionDTO = new PretestQuestionDTO();

    constructor(
        private fb: FormBuilder,
        private pretestService: PretestService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public loadingService: LoadingService
    ) { }

    formValidation(){
        return FORM_VALIDATION;
    }

    ngOnInit(): void {
        this.setupForm()
    }

    setupForm() {
        // Set form to default values
        this.attachedForm = this.fb.group({
          Name: ['', [Validators.required]],
          Description: [''],
          Question: [''],
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

    setquestion(){
        this.addQuestion();
        this.question = '';
    }

    addQuestion(){
        var item = new PretestQuestionItemDTO();
        if(this.question != '' && this.question != undefined) {
            item.Question = this.question;
            item.IndexNo = this.listQuestionItem.length + 1;
            this.listQuestionItem.push(item);
            this.orderingIndexQuestion();
        }
    }

    deleteQuestion(itemIndex: number){
        this.listQuestionItem.splice(itemIndex, 1);
    }

    updateQuestion(itemIndex: number){
        this.question = '';
        this.question = this.listQuestionItem[itemIndex].Question;
        this.deleteQuestion(itemIndex);
    }

    orderingIndexQuestion(){
        if(this.listQuestionItem.length > 0){
            this.listQuestionItem.forEach((item, index) => {
                item.IndexNo = index++;
            })
        }
    }

    generateDataSend() {
        this.pretestDataSend.Name = this.attachedForm.value.Name;
        this.pretestDataSend.Description = this.attachedForm.value.Description;
        this.pretestDataSend.ListPretestQuestionItem = this.listQuestionItem;
    }

    save(){
        this._submitForm();
        if (this.attachedForm.valid) {
            this.orderingIndexQuestion();
            this.generateDataSend();
            this.pretestService.postData(this.pretestDataSend).subscribe(data => {
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

    showError(msg: string){
        this.errorMessage = msg;
        this.visible = true
        this.dismissible = true;
    }

}
