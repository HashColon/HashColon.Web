import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerToolsComponent } from './file-explorer-tools.component';

describe('FileExplorerToolsComponent', () => {
  let component: FileExplorerToolsComponent;
  let fixture: ComponentFixture<FileExplorerToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExplorerToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
