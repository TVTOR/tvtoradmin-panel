import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Rx'

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  date; //date Variable
  subject;
  public dataValue;
  display = 'none'; //default Variable
  zIndex = '1'; //default Variable
  public isEdit = 0;
  TMData = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public rows = [];
  public columns = [];
  page: Number;
  showDialog
  subjectForm
  subjectName
  subjectvalue
  colorvalue
  color
  editSubjectForm
  editId;
  deleteId;
  constructor(private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.subjectForm = new FormGroup({
      subjectName: new FormControl("",
        Validators.required
      ),
      color: new FormControl("",
        Validators.required
      )
    });
    this.editSubjectForm = new FormGroup({
      subjectName: new FormControl("",
        Validators.compose([
          Validators.required
        ])),
      color: new FormControl("",
        Validators.compose([
          Validators.required
        ]))
    });

    this.loadInit();
  }

  loadInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: false,
      searching: true,
      ordering: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.authenticationService.getAllSubjects(dataTablesParameters).subscribe(
          resp => {
            if (resp) {
              this.rows = resp.data.data
              callback({
                recordsTotal: resp.data.total,
                recordsFiltered: resp.data.total,
                data: []
              })
            }
          }, err => {
            console.log(err)
          }
        );
      }
    };
  }

  createSubject(subjectdata) {
    const data = {
      subject: subjectdata.subjectName,
      colorcode: subjectdata.color
    };
    this.authenticationService.addSubject(data).subscribe(
      res => {
        if (res) {
          this.rows.push(res.body.data);
          this.display = 'none'; //set none css after close dialog
          if (res.body.success == false) {
            this.toastr.error(res.message, 'This subject already exist!', { progressBar: true });
            return false;
          }
          this.toastr.success(res.message, 'Success!', { progressBar: true });
          this.subjectForm.reset()
        }
      }, err => {
        console.log(err)
      });
  }

  editSubjectdata(subjectdata, editId) {
    const data = {
      subject: subjectdata.subjectName,
      colorcode: subjectdata.color
    };
    if (editId) {
      this.authenticationService.editSubject(data, editId).subscribe(
        res => {
          if (res) {
            this.display = 'none';
            this.toastr.success(res.message, 'Success!', { progressBar: true });
            this.loadInit();
            this.rows.map((data) => {
              if (data._id == res.body.data._id) {
                data.subject = res.body.data.subject
              }
            })
          }
        }, err => {
          console.log(err)
        });
    }
  }

  getOneSubject(editId) {
    this.authenticationService.getSingleSubject(editId).subscribe((res) => {
      this.subjectvalue = res.body.data.subject,
        this.colorvalue = res.body.data.colorcode
    })
  }

  deleteSubject(id) {
    id = this.deleteId
    this.authenticationService.deleteSubject(id).subscribe(res => {
      if (res) {
        console.log(res)
        this.display = 'none';
        this.toastr.success(res.message, 'Deleted!', { progressBar: true });
        this.rows = this.rows.filter((data) => {
          return data._id != id
        })
      }
    })
  }

  openModalDialog() {
    this.display = 'block'; //Set block css
    this.zIndex = '0';
    this.showDialog = 1
  }
  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
  }

  openEditModalDialog(editId) {
    this.editId = editId
    this.getOneSubject(editId);
    this.display = 'block'; //Set block css
    this.zIndex = '0';
    this.showDialog = 2
  }

  deleteModelDiallog(deleteId) {
    this.deleteId = deleteId;
    this.display = 'block'; //Set block css
    this.zIndex = '0';
    this.showDialog = 3
  }
}
