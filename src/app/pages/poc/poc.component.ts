import { Component } from '@angular/core';
import {PocService} from './poc.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-poc',
    templateUrl: './poc.component.html',
    styleUrls: ['./poc.component.scss'],
})
export class PocComponent {

  public pocForm: FormGroup;

    constructor(
      private pocService: PocService,
      private formBuilder: FormBuilder
    ) {
        this.pocForm = this.formBuilder.group({
          targetEndpoint: [null, [Validators.required]]
        });
    }

    public getAllTableData(): void {
      this.pocService.getAllTableData();
    }


}
