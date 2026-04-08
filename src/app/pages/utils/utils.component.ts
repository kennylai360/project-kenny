import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-utils',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './utils.component.html',
  styleUrl: './utils.component.scss',
})
export class UtilsComponent {
  protected textToModify: string;
  protected shouldBeLowerCase: boolean = true;
  protected icon = {
    clipboard: faClipboard,
  };

  public copyToClipboard(): void {
    navigator.clipboard.writeText(
      this.stringToConvertToBeCopied(this.textToModify)
    );
  }

  public switchCase(): void {
    this.shouldBeLowerCase = !this.shouldBeLowerCase;
  }

  public stringToConvertToBeCopied(textToBeChanged: string): string {
    let returnString = '';
    let caseShouldBeLower: boolean = this.shouldBeLowerCase;
    for (let i = 0; i < textToBeChanged.length; i++) {
      if (textToBeChanged[i] !== ' ') {
        if (caseShouldBeLower) {
          returnString += textToBeChanged[i].toLowerCase();
          caseShouldBeLower = !caseShouldBeLower;
        } else {
          returnString += textToBeChanged[i].toUpperCase();
          caseShouldBeLower = !caseShouldBeLower;
        }
      } else {
        returnString += textToBeChanged[i];
      }
    }

    return returnString;
  }
}
