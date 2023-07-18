import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() public passwordToCheck: string = '';

  bar0!: string;
  bar1!: string;
  bar2!: string;

  private checkPassword(value: string):string {
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;

    if(value === '') return 'empty';
    if(value.length < 8) return 'short';

    const letters = /[a-zA-Z]+/.test(value);
    const numbers = /[0-9]+/.test(value);
    const symbols = regex.test(value);

    //Has letters, symbols and numbers - the password is strong;
    if(letters && numbers && symbols) return 'strong';
    // letters-symbols/letters-digits/digits-symbols
    if((letters && symbols) || (letters && numbers) || (numbers && symbols)) return 'medium';
    // Only letters/digits/symbols - the password is easy
    if(letters || numbers || symbols) return 'easy';
 
    return ''

  }

  private colorPassword(state: string): void {
    switch (state) {
      case 'empty':
        this.bar0 = this.bar1 = this.bar2 = 'gray'
        break;
      case 'short':
        this.bar0 = this.bar1 = this.bar2 = 'red'
        break;
      case 'easy':
        this.bar0 = 'red';
        this.bar1 = 'gray';
        this.bar2 = 'gray';
        break;
      case 'medium':
        this.bar0 = 'yellow';
        this.bar1 = 'yellow';
        this.bar2 = 'gray';
        break;
      case 'strong':
        this.bar0 = 'green';
        this.bar1 = 'green';
        this.bar2 = 'green';
        break
      default:
        this.bar0 = this.bar1 = this.bar2 = 'gray'
    }
  }

  constructor() {

  }

ngOnChanges(changes: SimpleChanges) {
  const password = changes['passwordToCheck'];
  if(!password.firstChange) {    
     this.colorPassword(this.checkPassword(password.currentValue));
  }   
}
}

