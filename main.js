const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.playerX = 0;
    this.playerY = 0;
    this.fieldWidth = this.field[0].length;
    this.fieldHeight = this.field.length;
  }

  static generateField(height, width) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        let selector = Math.floor(Math.random() * 10);
        let character = "";
        if (selector > 6) character = hole;
        else character = fieldCharacter;
        row.push(character);
      }
      newField.push(row);
    }

    const hatLocX = Math.floor(Math.random() * width);
    const hatLocY = Math.floor(Math.random() * height);
    newField[hatLocY][hatLocX] = hat;

    return newField;
  }

  print() {
    let output = "";
    this.field[this.playerY][this.playerX] = pathCharacter;
    for (let i = 0; i < this.field.length; i++) {
      output += this.field[i].join("") + "\n";
    }
    console.log(output);
  }

  moveCharacter(direction) {
    switch (direction) {
      case (direction = "u"):
        this.playerY -= 1;
        break;
      case (direction = "d"):
        this.playerY += 1;
        break;
      case (direction = "l"):
        this.playerX -= 1;
        break;
      case (direction = "r"):
        this.playerX += 1;
        break;
      default:
        console.log('Invalid input - enter "u", "d", "l" or "r"');
    }

    if (
      this.playerX < 0 ||
      this.playerX >= this.fieldWidth ||
      this.playerY < 0 ||
      this.playerY >= this.fieldHeight
    )
      console.log("Uh oh! You went out of bounds");
    else if (this.field[this.playerY][this.playerX] === hole)
      console.log("Oh no! You fell in a hole!");
    else if (this.field[this.playerY][this.playerX] === hat)
      console.log("Hooray! You found your hat");
    else {
      this.field[this.playerY][this.playerX] = pathCharacter;
      this.movePrompt();
    }
  }

  movePrompt() {
    this.print();
    let direction = prompt("Which way (u, d, l, r)?");
    this.moveCharacter(direction);
  }
}

const someField = new Field(Field.generateField(10, 6));
someField.movePrompt();
