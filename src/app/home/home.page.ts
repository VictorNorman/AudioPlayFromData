import { Component } from '@angular/core';
import { FilesystemDirectory, Filesystem } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public datafile = '';
  private win: any = window;

  constructor(
    private http: HttpClient,
    private webView: WebView,
  ) {}

  copyFile() {
    this.http.get('assets/1.mp3', {
      responseType: 'arraybuffer'
    }).subscribe(data => {
      Filesystem.writeFile({
        data: data as unknown as string,
        path: 'EN-1.mp3',
        directory: FilesystemDirectory.Data,
      }).then((result) => {
        Filesystem.getUri({
          directory: FilesystemDirectory.Data,
          path: 'EN-1.mp3',
        }).then((result2) => {
          const path = result2.uri;
          console.log('😁 result2.uri is', path);

          this.datafile = this.webView.convertFileSrc(path);

          // this.datafile = 'assets/1.mp3';
          console.log('😔 this.datafile is ', this.datafile);
        });
      });
    });
  }

}
