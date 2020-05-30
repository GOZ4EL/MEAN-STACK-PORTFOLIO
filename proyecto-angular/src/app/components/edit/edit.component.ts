import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/project";
import { ProjectService } from "../../services/project.service";
import { UploadService } from "../../services/upload.service";
import { Global } from "../../services/global";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DetailComponent } from "../detail/detail.component";
import { CreateComponent } from "../create/create.component";

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService, DetailComponent, CreateComponent]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public url: string;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _detailComponent: DetailComponent,
    private _createComponent: CreateComponent
    ) { 
    this.title = "Editar Proyecto";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;

      this._detailComponent.getProject(id);
    });
  }

  onSubmit(form) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project) {
          if(this.filesToUpload) {
            this._createComponent.uploadImage(form, response);
          }
        }else this.status = "failed";
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this._createComponent.fileChangeEvent(fileInput);
  }

}
