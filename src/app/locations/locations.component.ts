import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Rx'


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  date; //date Variable
  categoryForm; //These are variables
  location;
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
  locationForm;
  locationName;
  editLocationForm;
  locationvalue;
  editId;
  deleteId
  constructor(private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.locationForm = new FormGroup({
      locationName: new FormControl("",
        Validators.compose([
          Validators.required
        ]))
    });

    this.editLocationForm = new FormGroup({
      locationName: new FormControl("",
        Validators.required
      )
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
        this.authenticationService.getAllLocations(dataTablesParameters).subscribe(
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

  createLocation(locationdata) {
    const data = {
      location: locationdata.locationName
    };
    this.authenticationService.addLocation(data).subscribe(
      res => {
        if (res) {
          this.rows.push(res.body.data);
          this.display = 'none'; //set none css after close dialog
          if (res.body.success == false) {
            this.toastr.error(res.message, 'This location already exist!', { progressBar: true });
            return false;
          }
          this.toastr.success(res.message, 'Success!', { progressBar: true });
        }
      }, err => {
        console.log(err)
      });
  }

  editLocationdata(locationdata, editId) {
    const data = {
      location: locationdata.locationName
    };
    if (editId) {
      this.authenticationService.editLocation(data, editId).subscribe(
        res => {
          if (res) {
            this.display = 'none';
            this.toastr.success(res.message, 'Success!', { progressBar: true });
            this.rows.map((data) => {
              if (data._id == res.body.data._id) {
                data.location = res.body.data.location
              }
            })
          }
        }, err => {
          console.log(err)
        });
    }
  }


  getOneLocation(editId) {
    this.authenticationService.getSingleLocaion(editId).subscribe((res) => {
      this.locationvalue = res.body.data.location
    })
  }

  deleteLocations(id) {
    id = this.deleteId
    this.authenticationService.deleteLocation(id).subscribe((res) => {
      console.log(res)
      if (res) {
        this.display = 'none';
        this.toastr.success(res.message, 'Success!', { progressBar: true });
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
    this.getOneLocation(editId)
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
