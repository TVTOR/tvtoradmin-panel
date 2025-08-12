import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TMProfileComponent } from './tm-profile.component';

describe('TMProfileComponent', () => {
  let component: TMProfileComponent;
  let fixture: ComponentFixture<TMProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TMProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TMProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
