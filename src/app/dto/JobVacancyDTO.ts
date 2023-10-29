export class JobVacancyDTO{
    Id!: string;
    Name!: string;
    Description!: string;
    IsActive!: boolean;
    PretestQuestionId!: string;
    ListRequirement: JobVacancyRequirementDTO[] = [];
}

export class JobVacancyRequirementDTO{
    ApplicantSpecificationId!: string;
    ApplicantSpecificationName!: string;
}