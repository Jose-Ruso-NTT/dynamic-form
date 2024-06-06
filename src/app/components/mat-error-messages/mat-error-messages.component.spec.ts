import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatErrorMessagesComponent } from './mat-error-messages.component';

describe('MatErrorMessagesComponent', () => {
  let component: MatErrorMessagesComponent;
  let fixture: ComponentFixture<MatErrorMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatErrorMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
