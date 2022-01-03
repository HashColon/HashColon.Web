import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HashColonModule, modules, modules_ordered } from '@HashColon/shared/web-home/web-modules';

@Component({
  selector: 'hashcolon-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.scss']
})
export class WebHomeComponent implements OnInit {

  moduleList = modules;
  modules_ordered = modules_ordered.slice(1);

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  _navigateTo(card: HashColonModule) {
    this.router.navigate([card.link]);
  }

}
