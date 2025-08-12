import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Rx'

@Component({
  selector: 'app-tmanagers',
  templateUrl: './tmanagers.component.html',
  styleUrls: ['./tmanagers.component.css']
})
export class TmanagersComponent implements OnInit {
  public managers
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public rows = [];
  public columns = [];
  page: Number;
  deleteId
  display = 'none';
  zIndex
  showDialog
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadInit()
  }



  loadInit() {
    console.log('hello')
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: false,
      searching: true,
      ordering: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.authenticationService.getTutorsManagers(dataTablesParameters).subscribe(
          resp => {
            if (resp) {
              //   // this.TMData = resp.data
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

  getSingletutorId(id) {
    this.router.navigateByUrl('/tmprofile/' + id);
  }

  deleteTutorManager(id) {
    id = this.deleteId
    this.authenticationService.deleteStatus(id).subscribe(res => {
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

  deleteModelDiallog(deleteId) {
    this.deleteId = deleteId;
    this.display = 'block'; //Set block css
    this.zIndex = '0';
    this.showDialog = 1
  }

  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
  }

}
