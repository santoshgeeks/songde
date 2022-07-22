import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-profile-assets',
  templateUrl: './profile-assets.component.html',
  styleUrls: ['./profile-assets.component.scss']
})
export class ProfileAssetsComponent implements OnInit {
  assetsForDownload = [
    { id: 1, icon: "../../assets/icons/box.svg", assetName: "Logotipe" },
    { id: 2, icon: "../../assets/icons/Image.svg", assetName: "Images" },
    { id: 3, icon: "../../assets/icons/file-text.svg", assetName: "Tech Rider" },
    { id: 4, icon: "../../assets/icons/folder-plus.svg", assetName: "electronic press kit" },
  ]
  isSpinner = false
  constructor(private comService: CommonService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  jpegFile: any = ''
  pdfFile: any = ''
  fileChangeEventjpeg(event: any) {
    console.log(event);
    console.log(event.target.files[0].size);
    let size = event.target.files[0].size
    let allowedSize = 1 * 1024 * 1024
    if (event.target.files[0].size > allowedSize) {
      alert("File size should be 1mb or less than 1mb")
    } else {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.jpegFile = event.target.result
      }
    }
  }
  toDataURL(url: any) {
    return fetch(url).then((response) => {
      return response.blob();
    }).then(blob => {
      return URL.createObjectURL(blob);
    });
  }
  async download(url: any) {
    let urls = [
      {
        u: "https://source.unsplash.com/user/c_v_r/1900x800",
      },
      {
        u: "https://source.unsplash.com/user/c_v_r/100x100"
      }

    ]
      const a = document.createElement("a");
      a.href = await this.toDataURL(urls[0].u);
      a.download = "myImage.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

  }
  downloadAssets(item: any) {
    console.log(item);
    let name = { name: item }

    if (item.assetName == "Logotipe") {
      this.comService.downloadtechandlogi().subscribe((res: any) => {
        console.log(res);
        if(res){
          for (let i = 0; i < res.result.gigkitimgage.length; i++) {
            this.download(res.result.gigkitimgage[i].image)
          }
        }
      })
    }
    if (item.assetName == "Tech Rider") {
      this.comService.downloadtechandlogi().subscribe((res: any) => {
        console.log(res);
        this.download(res.result.techrider.file)
      })
    }

    if (item.assetName == "Images") {
      this.comService.photos().subscribe((res: any) => {
        console.log(res);
        if(res){
          for (let i = 0; i < res.results.length; i++) {
            this.download(res.results[i].image)
          }
        }
      })
    }
    if (item.assetName == "electronic press kit") {
      window.print()
    }

  }
  fileChangeEventpdf(event: any) {
    console.log(event.target.files[0]);
    let size = event.target.files[0].size
    let allowedSize = 5 * 1024 * 1024
    if (event.target.files[0].size > allowedSize) {
      alert("File size should be 5mb or less than 5mb")
    } else {
      this.pdfFile = event.target.files[0]
    }
    // const reader = new FileReader();
    // const binaryString = reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event: any) => {

    // };
  }
  @ViewChild('takeInputLogo', { static: false }) takeInputLogo: any
  resetGpeg() {
    this.takeInputLogo.nativeElement.value = ""
    this.jpegFile = ""
  }
  edit() {
    this.resetGpeg()
    this.resetPdf()
  }
  @ViewChild('takeInputpdf', { static: false }) takeInputpdf: any
  resetPdf() {
    this.takeInputpdf.nativeElement.value = ""
    this.pdfFile = ""
  }
  saveChanges() {
    let currentUser = JSON.parse(<any>sessionStorage.getItem("user"))
    let data = {
      "image": this.jpegFile,
      "image_type": "techrider_gallery"
    }
    const formData = new FormData();
    formData.append("file", this.pdfFile);
    formData.append("user_id", currentUser.result.id);
    let pdf = formData
    if (data.image != "") {
      this.isSpinner = true
      this.comService.uploadLogotipe(data).subscribe((res: any) => {
        if (res) {
          this.isSpinner = false
          this._snackBar.open("Logotipe uploaded Success fully", "Ok", {
            duration: 2000,
            panelClass: ['success']
          })
          if (this.pdfFile) {
            this.isSpinner = true
          } else {
            this.isSpinner = false
          }
        }
      }, err => {
        this.isSpinner = false
        this._snackBar.open("Somthing went worong", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      })
    }

    if (this.pdfFile) {
      this.isSpinner = true
      this.comService.uploadTechRider(formData).subscribe((res: any) => {
        if (res) {
          this.isSpinner = false
          this._snackBar.open("Tech rider uploaded Success fully", "Ok", {
            duration: 2000,
            panelClass: ['success']
          })
        }
      }, err => {
        this.isSpinner = false
        this._snackBar.open("Somthing went worong", "Ok", {
          duration: 2000,
          panelClass: ['success']
        })
      })
    }

  }
 
  @Output() newItemEvent:any = new EventEmitter();
  @Input()  AssetsSection:any
  hideUnHide() {
    if(this.AssetsSection){
      this.AssetsSection=false
    }else{
      this.AssetsSection=true
    }
    console.log(this.AssetsSection);
    
    let data={
      section:"Assets",
      action:this.AssetsSection
    }
    this.newItemEvent.emit(data)
  }
}
