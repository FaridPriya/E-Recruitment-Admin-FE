import { Component, OnInit } from '@angular/core';
import { PretestService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pretest-list',
    templateUrl: './pretest-list.component.html',
    styleUrls: ['./pretest-list.component.scss']
})

export class PretestComponent implements OnInit {
    listTest:any;
    icons = freeSet;

    constructor(
        private pretestService: PretestService,
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) { }

    ngOnInit(){
        this.getData()
    }

    getData(){
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

    deleteRequirement(id:string){
        this.pretestService.delete(id).subscribe(data => {
            this.getData()
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