import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // testValues = [0, 1000, -1000, 500.555, 0.000001, 1.000005, 0.682287199917446785, "0.682287199917446785"];
  // testPrecisionSpecifiers = [0, 2, 5];
  // testFormatSpecifiers = ['d','c', 'p', 'n'];//['x', 'X', 'n', 'c', 'p', 'd'];

  testValues = [0, 1000, -1000, 10.01];
  testPrecisionSpecifiers = ['', 0, 2, 5];
  testFormatSpecifiers = ['n'];//['x', 'X', 'n', 'c', 'p', 'd'];
}
