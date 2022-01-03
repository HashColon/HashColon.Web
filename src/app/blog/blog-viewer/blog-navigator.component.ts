import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AuthService } from '@HashColon/shared/auth.service';
import { BlogCrudOpenService } from '@Blog/service/blog-crud-open.service';
import { BlogCrudAuthService } from '@Blog/service/blog-crud-auth.service';
import { BlogNavNode, BlogNavSource } from '@Blog/service/blog-navigation.model';

@Component({
  selector: 'hashcolon-blog-navigator',
  templateUrl: './blog-navigator.component.html',
  styleUrls: ['./blog-navigator.component.scss']
})
export class BlogNavigatorComponent implements OnInit {

  blogNavTreeControl: FlatTreeControl<BlogNavNode>;
  blogNavSource: BlogNavSource;

  // test
  ngOnInit() { }

  constructor(
    private auth: AuthService,
    private crudOpen: BlogCrudOpenService,
    private crudAuth: BlogCrudAuthService
  ) {
    this.blogNavTreeControl = new FlatTreeControl<BlogNavNode>(BlogNavNode.getLevel, BlogNavNode.hasChildren);
    if (auth.IsAdminAuth())
      this.blogNavSource = new BlogNavSource(this.blogNavTreeControl, crudAuth);
    else
      this.blogNavSource = new BlogNavSource(this.blogNavTreeControl, crudOpen);

    auth.onAuthStateChanged.subscribe(isAuth => {
      if (isAuth)
        this.blogNavSource = new BlogNavSource(this.blogNavTreeControl, crudAuth);
      else
        this.blogNavSource = new BlogNavSource(this.blogNavTreeControl, crudOpen);

    })
  }

  _hasChildrenAndPublic = (_: number, node: BlogNavNode) => (!!node.children && !node.isPrivate);
  _hasNoChildAndPublic = (_: number, node: BlogNavNode) => {
    if (node.children) return false;
    if (node.isPrivate) return false;
    return true;
  }
}
