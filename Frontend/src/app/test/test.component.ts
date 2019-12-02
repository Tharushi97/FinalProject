import { Component, OnInit } from '@angular/core'
import { NewPosition } from '../modelClasses/new-position';
import { PostNewPositionService } from '../services/post-new-position.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  position : NewPosition = {
    title:'',
    summary:'',
    description:''
  };
  constructor(private postPosition:PostNewPositionService,
    private http:HttpClient ) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.position);
    this.http.post<any>('http://localhost:3000/addPosition',this.position).subscribe(
      data => console.log('success', data)
    )
    alert ("New position added!");
    // this.http.post<>('http://localhost:3000/addPosition', this.position).subscribe(
    //   response => {
    //     this.position = response;
    //     console.log(this.position);
    //     alert('Successfully');
    // this.getProjects();
    //   });
      

  }

}

// export interface Position{
//  title:string;
//  summary:string;
//  description:string;
// }
