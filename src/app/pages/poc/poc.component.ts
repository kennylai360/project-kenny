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
export class PocComponent implements OnDestroy {

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
    let itemExist: boolean = false;
    this.tableData.map((data: any) => {
      if (data.itemName === this.pocForm.controls['name'].value) {
        itemExist = true;
      }
    });
    if (!itemExist) {
      const itemObject: { Name: string, Quantity: number } = {
        Name: this.pocForm.controls['name'].value,
        Quantity: this.pocForm.controls['quantity'].value
      };
      this.pocService.addItem(itemObject).pipe((take(1))).subscribe((data: any) => {
        if (data === true) {
          this.getAllTableData();
        }
      });
    }
  }

  public deleteItem(itemName: string): void {
    this.pocService.deleteItem(itemName).pipe(take(1)).subscribe((data: any) => {
      if (data === true) {
        this.getAllTableData();
      }
    });
  }


}
