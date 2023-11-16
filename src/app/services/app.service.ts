import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';
import { LOCAL_STORAGE_NAME, STATUS_FILTER } from '../environments/const';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppInterceptor } from './app.interceptor';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


export abstract class AbstractMasterRestService {
    constructor(
        protected http: HttpClient,
        public actionUrl: string) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'AllowSpecificOrigin',
            'Access-Control-Allow-Credentials': 'true',
            'Authorization':  `bearer ` + localStorage.getItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
        })
    };

    httpOptionsUpload = {
        headers: new HttpHeaders({
            'Authorization':  `bearer ` + localStorage.getItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
        })
    };
}


/** ***************************************************************************
* ACCOUNT SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class AccountService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Account');
    }

    login(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl + '/login', body, this.httpOptions);
    }
}

/** ***************************************************************************
* Applicant Specification SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class ApplicantSpecificationService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'ApplicantSpecification');
    }

    getData(): Observable<any> {
        return this.http.get<any>(this.actionUrl, this.httpOptions);
    }

    getDataWithItem(): Observable<any> {
        return this.http.get<any>(this.actionUrl+'/AllWithItem', this.httpOptions);
    }

    getDataById(id: string): Observable<any> {
        return this.http.get<any>(this.actionUrl + `/${id}`, this.httpOptions);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(this.actionUrl + `/${id}`, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    postData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl, body, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    updateData(data: any, id: string): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.put<any>(this.actionUrl + `/${id}`, body, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }
}


/** ***************************************************************************
* JOB VACANCY SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class JobVacancyService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'JobVacancy');
    }

    getData(): Observable<any> {
        return this.http.get<any>(this.actionUrl, this.httpOptions);
    }

    getDataById(id: string): Observable<any> {
        return this.http.get<any>(this.actionUrl + `/${id}`, this.httpOptions);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(this.actionUrl + `/${id}`, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    postData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl, body, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    updateData(data: any, id: string): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.put<any>(this.actionUrl + `/${id}`, body, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }
}

/** ***************************************************************************
* Candidate SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class CandidateService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Candidate');
    }

    getData(jobId: string, status: STATUS_FILTER): Observable<any> {
        var path = `${this.actionUrl}?`;
        if (jobId != undefined && jobId != null) {
            path += `&jobId=${jobId}`
        }

        if(status != undefined && status != null) {
            path += `&status=${status}`
        }

        return this.http.get<any>(path, this.httpOptions);
    }

    getDataById(id: string): Observable<any> {
        return this.http.get<any>(this.actionUrl + `/${id}`, this.httpOptions);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(this.actionUrl + `/${id}`, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    postData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl, body, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    updateStatus(id: string, status: number): Observable<any> {
        return this.http.put<any>(this.actionUrl + `/Status/${id}/${status}`, null, this.httpOptions);
    }
}

/** ***************************************************************************
* EDEN AI SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class EdenAiService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'EdenAi');
    }

    screeningCv(data: any, id: string): Observable<any> {
        const formData = new FormData();
        formData.append('pdfFile', data);
        return this.http.post<any>(`${this.actionUrl}/ScreeningCV/${id}`, formData, this.httpOptionsUpload);
    }
}

/** ***************************************************************************
* PRETEST SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class PretestService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Pretest');
    }

    getData(): Observable<any> {
        return this.http.get<any>(this.actionUrl, this.httpOptions);
    }

    getCandidateAnswer(id: string): Observable<any> {
        return this.http.get<any>(this.actionUrl+`/PretestCandidateAnswers/${id}`, this.httpOptions);
    }

    getDataById(id: string): Observable<any> {
        return this.http.get<any>(this.actionUrl + `/${id}`, this.httpOptions);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(this.actionUrl + `/${id}`, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    postData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl, body, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }

    updateData(data: any, id: string): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.put<any>(this.actionUrl + `/${id}`, body, this.httpOptions).pipe(
            tap((success: Response) => {
                Swal.fire({
                    title: "Success",
                    text: "",
                    icon: "success"
                });
            }),
            catchError((error: any) => {
                if (error.status !== 401) {
                    Swal.fire({
                        title: "Error",
                        text: error.error,
                        icon: "error"
                    });
                }
                throw error;
            })
        );
    }
}

/** ***************************************************************************
* DASHBOARD SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class DashboardService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Dashboard');
    }

    getData(): Observable<any> {
        return this.http.get<any>(this.actionUrl, this.httpOptions);
    }
}