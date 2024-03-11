import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoincapService } from '../../services/coincap.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CoincapService],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent {
  public btcPrice: number = 0;
  public btcValue: number = null;
  public btcSymbol: string = null;
  public timeLoaded: Date = null;
  public gbpValue: number = null;
  public btcAssetData: any = {};
  public alteredBtcPrice: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  private coincapService: CoincapService = inject(CoincapService);

  constructor() {
    forkJoin({
      btcAssetData: this.coincapService.getBtcAssetData(),
      ratesData: this.coincapService.getRatesData(),
    }).subscribe(
      ({ btcAssetData, ratesData }) => {
        this.timeLoaded = new Date();
        const coinbaseBtcData = btcAssetData.data.filter(
          (data) =>
            data.exchangeId === 'Coinbase Pro' && data.quoteSymbol === 'GBP'
        );
        const gbpRateData = ratesData.data.filter(
          (rate) => rate.id === 'british-pound-sterling'
        )[0];
        const btcRateData = ratesData.data.filter(
          (rate) => rate.id === 'bitcoin'
        )[0];
        this.btcSymbol = btcRateData.currencySymbol;
        const priceOfBtcInUsd: number = Math.trunc(coinbaseBtcData[0].priceUsd);
        const gbpRateToUsd: number = gbpRateData?.rateUsd;
        this.btcPrice = Math.trunc(priceOfBtcInUsd * (1 / gbpRateToUsd));
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoadingData.next(false);
      }
    );
  }

  public updateBtcPriceAndRecalculate(newBtcPrice: number): void {
    this.alteredBtcPrice.next(true);
    this.btcPrice = newBtcPrice;
    this.btcValue = null;
    this.gbpValue = null;
  }

  public updateBTCandRecalculate(newBtcValue: number): void {
    this.btcValue = newBtcValue;
    this.gbpValue = this.btcPrice * this.btcValue;
  }

  public updateGBPandRecalculate(newGbpValue: number): void {
    this.gbpValue = newGbpValue;
    if (this.btcPrice !== 0) {
      this.btcValue = this.gbpValue / this.btcPrice;
    }
  }
}
