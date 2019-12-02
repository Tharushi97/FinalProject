import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PositionList } from '../modelClasses/position-list';

import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';  
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  positionList: PositionList[]=[];

  addPosition:PositionList={
    _id:'',
    position:'',
    jobSummery:'',
    jobDescription:'',
    openings:''

  }
  // jobPost:Post={
  //   _id:'',
  //   position:'',
  //  // jobSummery:'',
  //   openings:null
  // }
  i:number=0;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
   
    this.getPositionList().pipe(map((posistions)=>{
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
      this.positionList=data;
    });
  }


  onSubmit(){
    
    let jobId =this.getId(this. addPosition.position)
    console.log(this.addPosition);
    this.http.put("http://localhost:3000/api/position/newpost/"+jobId,this.addPosition)
    .subscribe(respose=>{console.log(respose);
     
    })

    
}

getPositionList():Observable<any>{
  console.log("check")
    return this.http.get<{message:string,position:PositionList[]}>("http://localhost:3000/api/position/check")
}


getId(post:string){

  this.getPositionList().pipe(map((posistions)=>{
    return posistions.position.map(pos=>{
      return{
        _id: pos._id,
        position:pos.position,
        jobSummery:pos.jobSummery,
        jobDescription:pos.jobDescription
      }
    })
  })).subscribe(data=>{
    this.positionList=data;
   
   
});

for(let i of this.positionList){
  // console.log(i.position);
  if(post === i.position){
    //console.log(i._id);
    this.addPosition.jobDescription=i.jobDescription;
    this.addPosition.jobSummery=i.jobSummery;
    return this. addPosition._id=i._id;
  }
}


}

}


