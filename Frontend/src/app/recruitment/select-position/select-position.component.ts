import { Component, OnInit } from '@angular/core';
import { PositionList } from 'src/app/modelClasses/position-list';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select-position',
  templateUrl: './select-position.component.html',
  styleUrls: ['./select-position.component.css']
})
export class SelectPositionComponent implements OnInit {
  positionList: PositionList[]=[];

  SelectPosition:PositionList={
    _id:'',
    position:'',
    jobSummery:'',
    jobDescription:'',
    openings:''
  }

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
    this.SetPosition(this.SelectPosition.position);
  // console.log(this.SelectPosition);
  // this.http.post("http://localhost:3000/api/position/selectPosition",this.SelectPosition);
  // this.dataShare.savePosition(this.SelectPosition.position);
  this.router.navigate(['/Recruitment',this.SelectPosition._id])
  }

  getPositionList():Observable<any>{
    console.log("check")
      return this.http.get<{message:string,position:PositionList[]}>("http://localhost:3000/api/position/check")
      
  }

  SetPosition(post:string){
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
      this.SelectPosition.jobDescription=i.jobDescription;
      this.SelectPosition.jobSummery=i.jobSummery;
      return this. SelectPosition._id=i._id;
    }
  }
  
  }







}


