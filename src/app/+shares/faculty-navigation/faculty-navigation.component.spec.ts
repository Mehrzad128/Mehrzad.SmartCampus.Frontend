import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyNavigationComponent } from './faculty-navigation.component';

describe('FacultyNavigationComponent', () => {
  let component: FacultyNavigationComponent;
  let fixture: ComponentFixture<FacultyNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyNavigationComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
