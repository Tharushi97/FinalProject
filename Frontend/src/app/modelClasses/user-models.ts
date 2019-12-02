export interface IGeveoUser {
    firstname?: string,
    lastname?: string,
    email?: string,
    mobile?:string,
    nic?:string,
    linkedin?:string,
    positionId?:string,
    cv?: File ,
    cvDoc?: any,
    evaluated?: boolean
}

export class UserModels implements IGeveoUser{
    constructor(
        public firstname?: string,
        public lastname?: string,
        public email?: string,
        public mobile?: string,
        public nic?: string,
        public linkedin?: string,
        public positionId?: string,
        public cv?: File,
        public cvDoc?: any,
        public evaluated?: boolean
    ){

    }
}