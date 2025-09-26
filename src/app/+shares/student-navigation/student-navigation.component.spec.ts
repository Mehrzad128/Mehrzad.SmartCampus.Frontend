import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNavigationComponent } from './student-navigation.component';

describe('StudentNavigationComponent', () => {
  let component: StudentNavigationComponent;
  let fixture: ComponentFixture<StudentNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StudentNavigationComponent],
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
    fixture = TestBed.createComponent(StudentNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
