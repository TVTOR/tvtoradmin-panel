import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  public tutorData;
  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id')
    this.getTutor(id)
  }

  getTutor(id) {
    this.authenticationService.getSingleTutor(id).subscribe(res => {
      this.tutorData = res.data
    })
  }

}
