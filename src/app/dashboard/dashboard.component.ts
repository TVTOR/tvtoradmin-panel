import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Rx'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  TMData = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public rows = [];
  public columns = [];
  page: Number;
  constructor(private authenticationService: AuthenticationService,
     private router: Router,
     private route :ActivatedRoute) {
      }

  ngOnInit(): void {
    this.loadInit();
  }
  
  loadInit(){
    console.log('hello')
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true, 
      processing: false,  
      searching: true,
      ordering: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.authenticationService.getTutors(dataTablesParameters).subscribe(
          resp => {
            if (resp) {
              // this.TMData = resp.data
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
  // getTutorsManagers(){
  //   this.authenticationService.getTutors().subscribe((res)=>{
  //     this.TMData = res.data
  //     this.rows = res.data
  //     console.log('--------------------', this.rows)
  //     // $('#categoryList-table').DataTable();
  //   })
  // }

  getSingletutorId(id){
    this.router.navigateByUrl('/tmprofile/'+ id);
  }

  changeTutorStatus(id){
    const userId = id;
    this.authenticationService.changeStatus(userId).subscribe((res)=>{
      $("#user-table").DataTable().draw();
    })
  }

  deleteTutorStatus(id){
    const userId = id;
    this.authenticationService.deleteStatus(userId).subscribe((res)=>{
      $("#user-table").DataTable().draw();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
