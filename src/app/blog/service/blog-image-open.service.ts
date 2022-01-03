import { Injectable } from '@angular/core';
import { Storage, StorageReference, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class BlogImageOpenService {

  private blogImgRef: StorageReference;

  constructor(private storage: Storage) {
    this.blogImgRef = ref(this.storage, 'blog/img');
  }

  async GetImg(imgpath: string) {

  }
}
