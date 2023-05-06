import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seats: boolean[] = new Array(80).fill(false);
  numSeats: any;
  constructor() {}
  reserveSeats(numSeats: number) {
    if (numSeats > 7) {
      alert('you cannot reserved seats more than 7');
      return;
    }
    let startIndex = -1;
    let endIndex = -1;
    let bookedSeats: number[] = [];

    // Check for available seats
    for (let i = 0; i < 80; i++) {
      if (!this.seats[i] && i + numSeats <= 80) {
        let consecutiveAvailable = true;
        for (let j = i + 1; j < i + numSeats; j++) {
          if (this.seats[j]) {
            consecutiveAvailable = false;
            break;
          }
        }
        if (consecutiveAvailable) {
          startIndex = i;
          endIndex = i + numSeats - 1;
          break;
        }
      }
    }

    // If seats not available, try to find a row with enough available seats
    if (startIndex === -1) {
      for (let i = 0; i < 80; i += 7) {
        let rowFull = true;
        for (let j = i; j < i + 7; j++) {
          if (!this.seats[j]) {
            rowFull = false;
            if (startIndex === -1) {
              startIndex = j;
            }
            endIndex = j;
          }
        }
        if (!rowFull && endIndex - startIndex + 1 >= numSeats) {
          break;
        } else {
          startIndex = -1;
          endIndex = -1;
        }
      }
    }

    // Reserve seats if available
    if (startIndex !== -1) {
      for (let i = startIndex; i <= endIndex; i++) {
        this.seats[i] = true;
        bookedSeats.push(i + 1);
      }
      alert(`Seats ${startIndex + 1} to ${endIndex + 1} reserved.`);
    } else {
      alert(`Sorry, there are no ${numSeats} seats available.`);
    }
  }
}
