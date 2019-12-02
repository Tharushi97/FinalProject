import { Component, OnInit } from '@angular/core';
import { JobPostList } from '../modelClasses/job-post-list';
import { HttpClient } from '@angular/common/http';
import { PositionList } from '../modelClasses/position-list';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.css']
})
export class JobPostsComponent implements OnInit {

  postList:JobPostList[]=[];
  //positionList: PositionList[]=[];

  constructor(private http:HttpClient) { }

  ngOnInit() {
   // this.getJobPostList(); 
   
   this.getJobPostList().pipe(map((posistions)=>{
    return posistions.position.map(pos=>{
      return{
        _id: pos._id,
        position:pos.position,
        jobSummery:pos.jobSummery,
        jobDescription:pos.jobDescription,
        openings:pos. openings
      }
    })
  })).subscribe(data=>{
    this.postList=data;
  });
   
  
  }
  getJobPostList():Observable<any>{
    console.log("check")
      return this.http.get<{message:string,position:PositionList[]}>("http://localhost:3000/api/position/check")
  }
  
  
  
  //   getJobPostList(){
  //     this.http.post<JobPostList[]>('http://localhost:3000/getPosts',null).subscribe(
  //   res =>{
  //         this.postList=res;
  //         console.log(this.postList);
  //   }
  // );
  //   }

}

