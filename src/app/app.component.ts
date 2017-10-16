import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  svgHeight: any; //height of svg
  svgWidth: any;  //width of svg
  transMatrix: number[] // matrix value for transformation
  transform: string; // matrix value in string format
  points: any[]; // all points are stored in this
  polyline: string; // all points for polyline in string format are stored in this
  cx: number; // x co-ordinate value entered on screen
  cy: number; // y co-ordinate value entered on screen
  isPointsAdded: boolean; // to display svg only after points are added by user
  isValidValues: boolean; // to change color of info when user enters invalid values

  // Element reference to div containing SVG element
  @ViewChild('svgRefEle') svgRefEle: ElementRef;

  constructor() { // initialize values here as per your needs
    this.svgHeight = 760;
    this.svgWidth = 1020;
    this.transMatrix = [1, 0, 0, 1, 0, 0];
    this.transform = "matrix(1 0 0 1 0 0)";
    this.points = [];
    this.polyline = "";
    this.isPointsAdded = false;
    this.isValidValues = true;
  }

  addPoint(): void { // called when Add button is clicked. Adds cx and cy to points and polyline and sets them to null
    if (this.cx == null || this.cy == null || this.cx == undefined || this.cy == undefined || this.cx < 0 || this.cy < 0 || this.cx > this.svgWidth || this.cy > this.svgHeight)
      this.isValidValues = false;
    else {
      this.points.push({ "cx": this.cx, "cy": this.cy });
      this.polyline = this.polyline + " " + this.cx + "," + this.cy;
      this.isPointsAdded = true;
      this.isValidValues = true;
      this.cx = null;
      this.cy = null;
    }
  }

  pan(dx, dy): void { // used for panning left, right, top and bottom. Changes matrix 5th and 6th position by a fixed value based on button clicked
    this.transMatrix[4] += dx;
    this.transMatrix[5] += dy;

    this.transform = "matrix(" + this.transMatrix.join(' ') + ")";
  }


  zoom(scale): void { // used for zoom in and zoom out. Multiplies matrix values by a fixed value and pans accordingly.
    for (var i = 0; i < this.transMatrix.length; i++) {
      this.transMatrix[i] *= scale;
    }
    this.transMatrix[4] += (1 - scale) * this.svgWidth / 2;
    this.transMatrix[5] += (1 - scale) * this.svgHeight / 2;

    this.transform = "matrix(" + this.transMatrix.join(' ') + ")";
  }

  private coordinates(event: MouseEvent): void { // Tracking move event on SVG element
    this.cx = event.clientX - this.svgRefEle.nativeElement.offsetLeft - 5;
    this.cy = event.clientY - this.svgRefEle.nativeElement.offsetTop - 20;
  }
}