import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData{
  cvDoc: string
}
@Component({
  selector: 'app-cv-viewer',
  templateUrl: './cv-viewer.component.html',
  styleUrls: ['./cv-viewer.component.css']
})
export class CvViewerComponent implements OnInit {

  pdfSrc: any
  constructor(
    public sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<CvViewerComponent>,
    @Inject(MAT_DIALOG_DATA)  public data : DialogData
  ) { }

  ngOnInit() {
    let url = this.data.cvDoc
    console.log(this.data.cvDoc)
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

}
