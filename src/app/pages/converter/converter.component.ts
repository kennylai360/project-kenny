import { Component, DestroyRef, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CoincapService } from '../../api/coincap.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-converter',
    imports: [AsyncPipe, CurrencyPipe, FormsModule],
    templateUrl: './converter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './converter.component.scss'
})
export class ConverterComponent {
  public btcPrice = signal<number>(0);
  public btcValue = signal<number>(null);
  public btcSymbol = signal<string>(null);
  public gbpValue = signal<number>(null);
  public btcAssetData: any = {};
  public focusedInput$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public alteredBtcPrice: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public errorLoadingData: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private coincapService: CoincapService = inject(CoincapService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    forkJoin({
      btcAssetData: this.coincapService.getBtcAssetData(),
      ratesData: this.coincapService.getRatesData(),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ btcAssetData, ratesData }) => {
        if (!ratesData?.data || !btcAssetData?.data) {
          console.error('Unexpected API response shape', { btcAssetData, ratesData });
          this.errorLoadingData.next(true);
          this.isLoadingData.next(false);
          return;
        }
        const gbpRateData = ratesData.data.filter(
          (rate) => rate.id === 'british-pound-sterling'
        )[0];
        const btcRateData = ratesData.data.filter(
          (rate) => rate.id === 'bitcoin'
        )[0];
        this.btcSymbol.set(btcRateData?.currencySymbol ?? '₿');
        const priceOfBtcInUsd: number = Math.trunc(btcAssetData.data[0]);
        const gbpRateToUsd: number = gbpRateData?.rateUsd;
        this.btcPrice.set(Math.trunc(priceOfBtcInUsd * (1 / gbpRateToUsd)));
      },
      error: (error) => {
        console.error('CoinCap API error', error);
        this.errorLoadingData.next(true);
        this.isLoadingData.next(false);
      },
      complete: () => {
        this.isLoadingData.next(false);
      },
    });
  }

  public updateBtcPriceAndRecalculate(newBtcPrice: number): void {
    this.alteredBtcPrice.next(true);
    this.btcPrice.set(newBtcPrice);
    this.btcValue.set(null);
    this.gbpValue.set(null);
  }

  public updateBTCandRecalculate(newBtcValue: number): void {
    this.btcValue.set(newBtcValue);
    this.gbpValue.set(this.btcPrice() * newBtcValue);
  }

  public updateGBPandRecalculate(newGbpValue: number): void {
    this.gbpValue.set(newGbpValue);
    if (this.btcPrice() !== 0) {
      this.btcValue.set(newGbpValue / this.btcPrice());
    }
  }

  public updateFocusedInput(focusedInput: string): void {
    this.focusedInput$.next(focusedInput);
  }
}
