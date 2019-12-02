export interface IApplicant {
    _id?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    mobile?: string,
    linkedin?: string,
    cv?: any,
    cvDoc?: any,
    nic?: string,
    referral?: string
    rate?: string,
    evaluated?: boolean,
    notes?: any[],
    interviewerComments?: any[],
    interviewPoints?: number,
    writtenResults?:any[]
    currentSalary?: string,
    offeredSalary?: string,
    shortlisted?: boolean,
    interviewSheduled?: boolean,
    positionId?:string,
    selected?:boolean
}


export class Applicant implements IApplicant {
    constructor(
        public _id?: string,
        public firstname?: string,
        public lastname?: string,
        public email?: string,
        public mobile?: string,
        public cv?: any,
        public nic?: string,
        public linkedin?: string,
        public referral?: string,
        public evaluated?: boolean,
        public rate?: string,
        public cvDoc?: any,
        public notes?: any[],
        public interviewerComments?: any[],
        public interviewPoints?: number,
        public writtenResult?: any[],
        public currentSalary?: string,
        public offeredSalary?: string,
        public shortlisted?: boolean,
        public interviewSheduled?: boolean,
        public positionId?: string,
        public selected?:boolean

    ) {

    }
}