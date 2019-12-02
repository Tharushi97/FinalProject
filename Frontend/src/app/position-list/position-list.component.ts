import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PositionList } from '../modelClasses/position-list';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';  
import { Subject } from 'rxjs';


@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

  positions:PositionList[]=[];
  positionSub:Subscription;
  private postUpdated=new Subject<PositionList[]>();
 
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getPositions().pipe(map((posistions)=>{
      console.log("emptyda?")
      // console.log(posistions)
      return posistions.position.map(pos=>{
        return{
          _id: pos._id,
          position:pos.position,
          jobSummery:pos.jobSummery,
          jobDescription:pos.jobDescription
        }
      })
    })).subscribe(data=>{
     
      console.log(data)
      this.positions=data;
    }

    )
  }

 
   
  getPositions():Observable<any>{
    console.log("check")
    return this.http.get<{message:string,position:PositionList[]}>("http://localhost:3000/api/position/check")
  }


  delete(posId:string){
    console.log(posId);
   
    this.http.delete("http://localhost:3000/api/position/"+posId)
    .subscribe(()=>{
      const updatedPost=this. positions.filter(updatepost=>updatepost._id!==posId); // filetr used to filter the deleted post n this method update post without reloading
      this. positions=updatedPost;
      this.postUpdated.next([...this.positions]);
  });
  }
}
