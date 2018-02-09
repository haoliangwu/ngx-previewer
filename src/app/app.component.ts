import { Component } from '@angular/core';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  file: File;

  selectFile(files: FileList) {
    this.file = files.item(0);
  }
}
