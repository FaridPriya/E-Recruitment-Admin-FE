import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JobVacancyService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})

export class JobListComponent implements OnInit {
    listJob:any;
    icons = freeSet;

    constructor(
        private jobVacancyService: JobVacancyService,
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) { }

    ngOnInit(){
        this.getJobs()
    }

    getJobs(){
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

    deleteRequirement(id:string){
        this.jobVacancyService.delete(id).subscribe(data => {
            this.getJobs()
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