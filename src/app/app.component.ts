import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (){}

  title = 'pointGame';

  correctPoints = ["blue", "red", "green", "purple", "orange"]

  userPoints = this.shuffle(["blue", "red", "green", "purple", "orange"])
  droppedUser(event: CdkDragDrop<string[]>) {
    moveItemInArray( this.userPoints, event.previousIndex, event.currentIndex );
  }

  shuffle(array: string[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  //testing code:
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  dropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
       this.movies,
       event.previousIndex,
       event.currentIndex
      );
  }

}
