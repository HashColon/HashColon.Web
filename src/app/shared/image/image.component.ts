import { Component, Input, OnInit } from '@angular/core';
import { Storage, StorageReference, ref, getDownloadURL } from '@angular/fire/storage';
import { keepUnstableUntilFirst } from '@angular/fire';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hashcolon-image',
  template: `
  !!!
    <!--<img [src]="imgHashpath | async"/>-->
  `,
  styles: []
})
export class ImageComponent implements OnInit {

  @Input() imgPath: string = '';
  imgHashpath: Promise<string> | undefined;

  constructor(
    private storage: Storage,
    private route: ActivatedRoute) {
    console.log("imagecomp")
  }

  ngOnInit(): void {
    // let imgpath = this.route.snapshot.queryParamMap.get('imgpath');
    let imgpath = this.route.snapshot.url.toString().replace(/,/g, '/',);
    console.log(imgpath);

    getDownloadURL(ref(this.storage, imgpath!))
      .then((url) => {
        console.log(url);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.setRequestHeader('Access-Control-Request-Headers', '*')
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')

        xhr.send();
      });


    // this.imgHashpath = getDownloadURL(ref(this.storage, imgpath!));
  }

}
