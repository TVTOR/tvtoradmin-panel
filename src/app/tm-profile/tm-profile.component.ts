import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Rx'



@Component({
  selector: 'app-tm-profile',
  templateUrl: './tm-profile.component.html',
  styleUrls: ['./tm-profile.component.css']
})
export class TMProfileComponent implements OnInit {
  public managerData
  public managers
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public rows = [];
  public columns = [];
  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var l = this.route.snapshot.paramMap.get('id')
    this.getSingleTutorsManagers(l)
    this.loadInit(l);
  }


  loadInit(id) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: false,
      searching: true,
      ordering: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.authenticationService.getAllTutorOfManagers(dataTablesParameters, id).subscribe(
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

  getSingleTutorsManagers(id) {
    this.authenticationService.getSingleTutor(id).subscribe((res) => {
      this.managerData = res.data
    })
  }
}
