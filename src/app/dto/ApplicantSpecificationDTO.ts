export class ApplicantSpecificationDTO{
    Id!: string;
    Name!: string;
    Type!: string;
    Description!: string;
    ListApplicantSpecificationsItem: ApplicantSpecificationItemDTO[] = [];
}

export class ApplicantSpecificationItemDTO{
    Id!: string;
    ApplicantSpecificationId!: string;
    Name!: string;
}