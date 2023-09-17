import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantSpecificationService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { Router } from '@angular/router';

@Component({
    selector: 'app-requirement-list',
    templateUrl: './requirement-list.component.html',
    styleUrls: ['./requirement-list.component.scss']
})

export class RequirementComponent implements OnInit {
    listSpecification:any;
    icons = freeSet;

    constructor(
        private applicantSpecificationService: ApplicantSpecificationService,
        private router: Router
        ) { }

    ngOnInit(){
        this.getRequirement()
    }

    getRequirement(){
        this.applicantSpecificationService.getData().subscribe(data => {
            this.listSpecification = data;
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

    deleteRequirement(id:string){
        this.applicantSpecificationService.delete(id).subscribe(data => {
            this.getRequirement()
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

}