import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDisplayComponent } from './article-display.component';

describe('ArticleDisplayComponent', () => {
  let component: ArticleDisplayComponent;
  let fixture: ComponentFixture<ArticleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
