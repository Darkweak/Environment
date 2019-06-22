export interface Option {
    value: string;
    text: string;
}

export interface Field {
    label: string;
    text?: string;
    type?: string;
    placeholder: string;
    name: string;
    className?: string;
    options?: Option[];
}

export interface Link {
    label: string;
    path: string;
}

export interface Image {
    name: string;
    url: string;
}

export interface Category {
    '@id': string;
    name: string;
    description: string;
    color: string;
    subjects?: Subject[];
}

export interface User {
    username: string;
    subjectsOwned?: Subject[];
    subjectResponses?: SubjectResponse[];
    userResponseLikes?: ResponseLike[];
    userSubjectLikes?: SubjectLike[];
}

export interface Subject {
    '@id': string;
    name: string;
    description: string;
    subjectCreator: User;
    responsesCount: number;
    imageUrl: string;
    imageName: string;
    likesCount: number;
    responses: SubjectResponse[];
}

export interface SubjectResponse {
    description: string;
    responseCreator: User;
    responseLikes?: ResponseLike[];
}

export interface ResponseLike {
    likeOwner: User;
    likeResponse: Response;
}

export interface SubjectLike {
    userLike: User;
    subject: Subject;
}
