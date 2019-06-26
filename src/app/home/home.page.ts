import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { writeJsonToFile, convertF, writeBlobToFile } from './code';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public datafile = '';

  constructor(
    private http: HttpClient,
    private webView: WebView,
  ) { }

  async copyFile() {

    for (let i = 1; i <= 5; i++) {
      console.log('calling getAndWrite on ', i);
      await this.getAndWrite(i);
      console.log('done calling getAndWrite on ', i);
    }

    // this.http.get('assets/languages.json').subscribe(data => {
    //   writeJsonToFile('languages.json', JSON.stringify(data));
    // });

    this.datafile = await convertF(this.webView);

    console.log('convertFileSrc of 1.mp3 =', this.datafile);


    // .then((result) => {
    //   Filesystem.getUri({
    //     directory: FilesystemDirectory.Data,
    //     path: 'EN-1.mp3',
    //   }).then((result2) => {
    //     const path = result2.uri;
    //     console.log('😁 result2.uri is', path);

    //     this.datafile = this.webView.convertFileSrc(path);

    //     // this.datafile = 'assets/1.mp3';
    //     console.log('😔 this.datafile is ', this.datafile);
    //   });
    // });
  }

  private getAndWrite(i) {
    return new Promise(resolve => {
      this.http.get(`assets/${i}.mp3`, {
        responseType: 'blob'
      }).subscribe(async data => {
        console.log('i = ', i);
        console.log('calling writeArrayBufferToFile', ` EN-${i}.mp3`);
        await writeBlobToFile(`EN-${i}.mp3`, data);
        console.log('done calling writeArrayBufferToFile', ` EN-${i}.mp3`);
        resolve();
      },
        (err) => console.log('subscribe yields error', err));
    });
  }

}
