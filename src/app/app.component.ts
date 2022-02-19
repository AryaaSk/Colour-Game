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

  shuffle(array: string[]) {
    var oldArray = JSON.parse(JSON.stringify(array)); //otherwise it just creates a reference and deletes the array
    var returnArray: string[] = [];
    while (oldArray.length != 0)
    {
      const randomIndex = Math.floor(Math.random() * oldArray.length);
      returnArray.push(oldArray[randomIndex]);
      oldArray.splice(randomIndex, 1);
    }

    return returnArray
  }

  //handling when the user moves a colour
  droppedUser(event: CdkDragDrop<string[]>) { 
    //since i just want to swap the 2 values we also need to move the item which is at the currentIndex, to the previousIndex
    //i cant swap just the 2 items since then it looks confusing for the user since when you are dragging it the other items move along 
    /*
    const oldItem = this.userPoints[event.currentIndex]; //need to move toBeSwapped to the previousIndex
    const newItem = this.userPoints[event.previousIndex];
    this.userPoints[event.currentIndex] = newItem;
    this.userPoints[event.previousIndex] = oldItem;
    */

    moveItemInArray(this.userPoints, event.previousIndex, event.currentIndex);
  }

  availableColours = ["blue", "red", "green", "purple", "orange"]

  correctPoints: string[] = [];
  userPoints: string[] = [];
  
  moveCount = 0;
  startGame()
  {
    this.moveCount = -1; //-1 to account for the check at the start

    //shuffle the colours
    this.correctPoints = this.shuffle(this.availableColours);
    this.userPoints = this.shuffle(this.availableColours);

    //then check to make sure the colours arent already correct (if it is all correct then restart the game)
    if (this.check().correct == this.availableColours.length)
    { this.startGame(); }
  }

  correctDisplay = 0;
  alomostDisplay = 0;
  check()
  {
    this.moveCount += 1; //everytime the user clicks check, it adds 1 to the move count

    //checks which colours are in the same position in both lists, then checks which are in within 1 point of another
    var correct = 0;
    var almost = 0;

    var i = 0;
    while (i != this.userPoints.length)
    {
      if (this.userPoints[i] == this.correctPoints[i])
      { correct += 1; }

      //now check i - 1, and i + 1 (left index and right index)
      var leftIndex = i - 1;
      var rightIndex = i + 1
      
      if (leftIndex != -1)
      {
        if (this.userPoints[i] == this.correctPoints[leftIndex])
        {
          almost += 1;
        }
      }
      if (rightIndex != this.userPoints.length)
      { 
        if (this.userPoints[i] == this.correctPoints[rightIndex])
        {
          almost += 1;
        }
      }
      i += 1;
    }

    this.correctDisplay = correct;
    this.alomostDisplay = almost;
    return {correct: correct, almost: almost}
  }


  ngOnInit()
  {
    this.startGame();
  }

}
