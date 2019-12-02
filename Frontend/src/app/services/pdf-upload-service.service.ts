import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class PdfUploadServiceService {
  pdfFiles: any[] = [];
  constructor(private store: AngularFireStorage) {}

  uploadPdfToStorage(files: File[], folderName: String) {
    const error = false;

    return new Promise((resolve, reject) => {
      for (let i = 0; i < files.length; i++) {
        let firstURL = files[i];
        //console.log(firstURL);
        // let path = `${folderName}/${firstURL.name}${(new Date()).getTime()}`;
        //let path = `${folderName}/${firstURL.name}${(new Date()).getTime()}`;
        let path = `${folderName}/${new Date().getTime()}${firstURL.name}`;

        let ref = this.store.ref(path);
        this.store.upload(path, firstURL).then(rst => {
          rst.ref.getDownloadURL().then(
            url => {
              //console.log('result url : ' +i+' : '+url);
              this.pdfFiles.push(url);
              if (this.pdfFiles.length === files.length) {
                resolve(this.pdfFiles);
              }
            },
            err => {
              //console.log(JSON.stringify("firebase uploading error"+err));
              reject(err);
            }
          );
        });
      }
    });
  }
}
