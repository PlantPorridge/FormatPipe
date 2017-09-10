import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  testValues = [0, 1000, -1000, 500.555, 1.000001, 1.000005, 0.682287199917446785, "0.682287199917446785"];
  testPrecisionSpecifiers = [0, 2, 5];
  testFormatSpecifiers = ['r']; //['n', 'c', 'p', 'd'];
}
