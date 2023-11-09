export class DashboardDTO{
    ActiveJobCount!: number;
    CandidateInMonth!: number;
    CandidateInWeek!: number;
    CandidateInDay!: number;
    JobDetail: ResumeJobDTO[] = [];
}

export class ResumeJobDTO{
    JobId!: string;
    JobName!: string;
    CandidatePendingCount!: number;
    CandidateFailedCount!: number;
    CandidatePassedCount!: number;
    CandidateRejectCount!: number;
    CandidateCount!: number;
}