import { Component, OnInit } from '@angular/core';
import { IApplicant, Applicant } from 'src/app/modelClasses/applicant';
import { ActivatedRoute } from '@angular/router';
import { PositionList } from 'src/app/modelClasses/position-list';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';  
import { Subject } from 'rxjs';
import { ApplicantManagementService } from 'src/app/services/application-management.service';

@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.css']
})
export class RecruitComponent implements OnInit {

  
  
  posit:PositionList={
    _id:'',
    position:'',
    jobSummery:'',
    jobDescription:'',
    openings:''

  }
 
   SelectApplicant:Applicant[]=[]; //unsorted selected applicants
   sortApplicant:Applicant[]=[]; //sorted applicants
   private appUpdated=new Subject<Applicant[]>();
   

  constructor(private route:ActivatedRoute, private http:HttpClient, private applicantManagementService: ApplicantManagementService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
     this.posit._id=id;
        console.log(this.posit._id);
       this.getApplicants();
  }

  //http request to get applicants from back-end
  getApplicants(){
   
    this.applicantManagementService.getAllEvaluated().subscribe(
      res=>{
        // console.log(res.body)
        this.SelectApplicant = res.body
        // console.log(this.SelectApplicant);
      },err=>{
        console.log(JSON.stringify(err))
      }
    )
    // this.selectApplicants();
  }

  
  //select applicants applied for particular position
  selectApplicants(){
    console.log("Select");
    let j=0;
    for(let i of this.SelectApplicant){
      if(i.selected!=true){
      if(this.posit._id == i.positionId){
        this.sortApplicant[j]=i;
        j++;
      }
       
    }
    }
    // console.log(this.sortApplicant);
    // this.sortApplicants();
  }


  //sort applicants
  sortApplicants(){
    for( let l=0; l<this.sortApplicant.length-1; l++){
      for( let k=0; k< this.sortApplicant.length-l-1;k++){
        if(this.sortApplicant[k].interviewPoints < this.sortApplicant[k+1].interviewPoints ){
          let temp = this.sortApplicant[k];
          this.sortApplicant[k]= this.sortApplicant[k+1];
          this.sortApplicant[k+1] = temp;
        }
      }
    }
  }


  //if applicant is selected
  appSelected(appl:Applicant){
    console.log(appl);
    var conf= window.confirm("Are you sure you want to select this applicant?");
    if(conf){   
      let appId = appl._id
      appl.selected=true;
      console.log(appl);
    this.http.put("http://localhost:3000/applicant/updateUserDetails",appl)
    .subscribe(()=>{
      const updatedPost=this.sortApplicant.filter(updatepost=>updatepost._id!==appl._id); // filetr used to filter the deleted post n this method update post without reloading
      this.sortApplicant=updatedPost;
      this.appUpdated.next([...this.sortApplicant]);
  
  })}}


  







}
