import { Injectable } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  layoutMode: string = ''
  destroyed = new Subject<void>();
  displayTypeMap = new Map([
    [Breakpoints.XSmall, "Vertical"],
    [Breakpoints.Small, "Vertical"],
    [Breakpoints.Medium, "Horizontal"],
    [Breakpoints.Large, "Horizontal"],
    [Breakpoints.XLarge, "Horizontal"]
  ]);

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    // set responsive layout
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.layoutMode = this.displayTypeMap.get(query) ?? 'Horizontal';
        }
      }
    });
  }
}
