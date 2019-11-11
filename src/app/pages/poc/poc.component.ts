import { Component, OnDestroy } from '@angular/core';
import { PocService } from './poc.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-poc',
    templateUrl: './poc.component.html',
    styleUrls: ['./poc.component.scss'],
})
export class PocComponent implements OnDestroy{

  public pocForm: FormGroup;
  public tableData: any;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
      private pocService: PocService,
      private formBuilder: FormBuilder
    ) {
        this.pocForm = this.formBuilder.group({
          name: [null, [Validators.required]],
          quantity: [null, [Validators.required]],
        });
        this.getAllTableData();
    }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

    public getAllTableData(): void {
      this.pocService.getAllTableData().pipe(take(1)).subscribe((data: any) => {
        this.tableData = data;
      });
    }

    public addItem(): void {
      const itemObject: {Name: string, Quantity: number} = {
        Name: this.pocForm.controls['name'].value,
        Quantity: this.pocForm.controls['quantity'].value
      };
      this.pocService.addItem(itemObject).pipe((take(1))).subscribe((data: any) => {
        if (data === undefined) {
          this.getAllTableData();
        }
      });
    }

    public deleteItem(): void {
      this.pocService.deleteItem(this.pocForm.controls['name'].value).pipe(take(1)).subscribe((data: any) => {
        if (data === undefined) {
          this.getAllTableData();
        }
      });
    }


}
