import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService, JobVacancyService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { JobVacancyDTO } from 'src/app/dto/JobVacancyDTO';
import { STATUS_FILTER } from 'src/app/environments/const';

@Component({
    selector: 'app-candidate-list',
    templateUrl: './candidate-list.component.html',
    styleUrls: ['./candidate-list.component.scss']
})

export class CandidateComponent implements OnInit {
    listCandidate:any;
    icons = freeSet;

    listJob:JobVacancyDTO[] = [];
    selectedJob!: any;

    statusFilter = [
        { Id: STATUS_FILTER.Pending, Name: 'Pending' },
        { Id: STATUS_FILTER.Passed, Name: 'Passed' },
        { Id: STATUS_FILTER.Failed, Name: 'Failed' }
    ]
    selectedStatus!:any;

    constructor(
        private candidateService: CandidateService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private jobVacancyService: JobVacancyService,
        ) { }

    ngOnInit(){
        this.getCandidate()
        this.getJobVacancy()
    }

    clearFilter() {
        this.selectedJob = null;
        this.selectedStatus = null;
    }

    getCandidate(){
        this.candidateService.getData(this.selectedJob, this.selectedStatus).subscribe(data => {
            this.listCandidate = data;
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

    deleteCandidate(id:string){
        this.candidateService.delete(id).subscribe(data => {
            this.getCandidate()
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

    create() {
        this.router.navigate(['create'], { relativeTo: this.activatedRoute });
    }

    detail(id: string) {
        this.router.navigate([id], { relativeTo: this.activatedRoute });
    }

}