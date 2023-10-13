import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-candidate-list',
    templateUrl: './candidate-list.component.html',
    styleUrls: ['./candidate-list.component.scss']
})

export class CandidateComponent implements OnInit {
    listCandidate:any;
    icons = freeSet;

    constructor(
        private candidateService: CandidateService,
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) { }

    ngOnInit(){
        this.getCandidate()
    }

    getCandidate(){
        this.candidateService.getData().subscribe(data => {
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