import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmanagersComponent } from './tmanagers.component';

describe('TmanagersComponent', () => {
  let component: TmanagersComponent;
  let fixture: ComponentFixture<TmanagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmanagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmanagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
