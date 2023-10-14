export class JobVacancyDTO{
    Id!: string;
    Name!: string;
    Description!: string;
    ListRequirement: JobVacancyRequirementDTO[] = [];
}

export class JobVacancyRequirementDTO{
    ApplicantSpecificationId!: string;
    ApplicantSpecificationName!: string;
}