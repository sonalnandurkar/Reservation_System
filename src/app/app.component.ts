import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seats: boolean[] = Array.from({ length: 80 }, () => false);

  constructor() {}

  reserveSeats(numSeats: number) {
    if (numSeats > 7) {
      alert('You cannot reserve more than 7 seats.');
      return;
    }

    const availableSeats = this.findAvailableSeats(numSeats);

    if (!availableSeats) {
      alert(`Sorry, there are no ${numSeats} seats available.`);
      return;
    }

    const [startIndex, endIndex] = availableSeats;
    const bookedSeats = [];

    for (let i = startIndex; i <= endIndex; i++) {
      this.seats[i] = true;
      bookedSeats.push(i + 1);
    }

    alert(`Seats ${startIndex + 1} to ${endIndex + 1} reserved.`);
  }
 // Check for available seats
  private findAvailableSeats(numSeats: number): [number, number] | null {
    let startIndex = -1;
    let endIndex = -1;

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
        let availableSeats = 0;
        for (let j = i; j < i + 7; j++) {
          if (!this.seats[j]) {
            availableSeats++;
            if (availableSeats === numSeats) {
              startIndex = j - numSeats + 1;
              endIndex = j;
              break;
            }
          } else {
            availableSeats = 0;
          }
        }
        if (startIndex !== -1) {
          break;
        }
      }
    }

    return startIndex !== -1 ? [startIndex, endIndex] : null;
  }
}

