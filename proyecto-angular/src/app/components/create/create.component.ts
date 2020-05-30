import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { UploadService } from "../../services/upload.service";
import { Global } from "../../services/global";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public url: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
    ) { 
    this.title = "Crear Proyecto";
    this.url = Global.url;
    this.project = new Project("", "", "", "", 2020 , "", "");
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this.saveProject(form);
  }

  saveProject(form) {
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project) {
          this.uploadImage(form, response);
        }else this.status = "failed";
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  uploadImage(form, response) {
    this._uploadService.makeFileRequest(
      this.url+"upload-image/"+response.project._id, 
      [], 
      this.filesToUpload, 
      "image"
      )
    .then((result: any) => {
      this.save_project = result.project;

      this.status = "success";
      console.log(result);
      form.reset();
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
