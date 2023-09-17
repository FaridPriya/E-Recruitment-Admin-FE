export class ApplicantSpecificationDTO{
    Name!: string;
    Description!: string;
    ListApplicantSpecificationsItem: ApplicantSpecificationItemDTO[] = [];
}

export class ApplicantSpecificationItemDTO{
    Name!: string;
}