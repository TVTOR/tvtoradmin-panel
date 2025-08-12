import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsendComponent } from './emailsend.component';

describe('EmailsendComponent', () => {
  let component: EmailsendComponent;
  let fixture: ComponentFixture<EmailsendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
