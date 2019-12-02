export class JobPostList {
    constructor(
        public id:string,
        public title:string,
        public summary:string,
        public description:string,
        public openings:number,
        public applicants:number,
        public interviews:number,
        public shortlisted:number
    ){}
}
