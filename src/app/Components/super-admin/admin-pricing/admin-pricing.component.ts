import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
// AdminEditPricing
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminEditPricingComponent } from '../admin-edit-pricing/admin-edit-pricing.component';
import { SuperadminService } from 'src/app/Services/superadmin.service';

@Component({
  selector: 'app-admin-pricing',
  templateUrl: './admin-pricing.component.html',
  styleUrls: ['./admin-pricing.component.css']
})
export class AdminPricingComponent implements OnInit {

  includeService1: any;
  include1Price: any;
   includeService2: any;
  include2Price: any;
   includeService3: any;
  include3Price: any;
   includeService4: any;
  include4Price: any;
   includeService5: any;
  include5Price: any;

  adminPricingDetails: any;
  stepsArray: any[] = [];
  stepValue: any[] = [];// [0, 150, 800, 1600, 4000, 6000, 9000, 12000, 20000, 40000, 100000];
  minValue!: number;// = this.stepValue[0];
  maxValue!: number;// = this.stepValue[this.stepValue.length-1];
  monthlyTotal: number = 0;
  costPerOrder: number = 0;
  totalOrders:number=this.minValue;
  saveValue: number = 0;
  discountValue: number = 0;
  discountPercent:number=0;
  total: number = 0;
  discountArray: number[] = [];//[0,0,9,18,27,26,45,54,63,72,72];
  costPerOrderArray: number[] = [];// [0.0, 0.11, 0.1, 0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03];

  options: Options = {
    floor: 0,

    ceil: 0,

  };
   constructor(public dialog: MatDialog,private SuperadminService: SuperadminService) { }

  async ngOnInit(){
    await this.getAdminPricingData();
    this.bgColor = '#ff695b5e';

  }
  getAdminPricingData() {
       this.SuperadminService.getAdminPricing().subscribe(response => {
         if (response.returnObject.length != 0) {
          //  this.dataSource.data = response.returnObject;
           this.adminPricingDetails = response.returnObject;
           console.log("I am admin pricing detials",this.adminPricingDetails);
           let stepValueArray = this.adminPricingDetails[0].stepValueArray.split(",");
           for (let a in stepValueArray ) {
    stepValueArray[a] = parseInt(stepValueArray[a], 10); // Explicitly include base as per Álvaro's comment
           }
           this.stepValue = stepValueArray;
           console.log("I am step value", this.stepValue);
           let temp = [];
           for (let i = 0; i < this.stepValue.length;i++){
             temp.push({ value: this.stepValue[i], legend: this.adminPricingDetails[0].orderType });
           }
           this.stepsArray = temp;
           this.options = {
             stepsArray: this.stepsArray, floor: this.stepValue[0], ceil: this.stepValue[this.stepValue.length - 1],
             step: 1,
           showSelectionBar: true,
    showTicks: true,
    showTicksValues: true,
    selectionBarGradient: {
      from: '#ee4d47',
      to: '#fd665a'
    },
    getPointerColor:(value: number): string => {return '#ee4d47';},
    getLegend: (value: number): string => {
      //return '<b>Ord./Month</b>' + value;
      return 'Orders/Month'+value;
    }
           };
           this.minValue =this.stepValue[0];
           this.maxValue = this.stepValue[this.stepValue.length - 1];

           let discountValueArray = this.adminPricingDetails[0].discountArray.split(",");
           for (let a in discountValueArray ) {
    discountValueArray[a] = parseInt(discountValueArray[a], 10); // Explicitly include base as per Álvaro's comment
           }
           this.discountArray = discountValueArray;

           let costPerOrderValueArray = this.adminPricingDetails[0].costPerOrderArray.split(",");
           for (let a in costPerOrderValueArray ) {
    costPerOrderValueArray[a] = parseFloat(costPerOrderValueArray[a]); // Explicitly include base as per Álvaro's comment
           }
           this.costPerOrderArray = costPerOrderValueArray;

           this.includeService1 = this.adminPricingDetails[0].includeService1;
           this.include1Price = this.adminPricingDetails[0].include1Price;
           this.includeService2 = this.adminPricingDetails[0].includeService2;
          this.include2Price = this.adminPricingDetails[0].include2Price;

           this.includeService3 = this.adminPricingDetails[0].includeService3;
           this.include3Price = this.adminPricingDetails[0].include3Price;
           this.includeService4 = this.adminPricingDetails[0].includeService4;
           this.include4Price = this.adminPricingDetails[0].include4Price;
           this.includeService5 = this.adminPricingDetails[0].includeService5;
          this.include5Price = this.adminPricingDetails[0].include5Price;

          //  this.options.floor = this.stepValue[0];
          //  this.options.ceil = this.stepValue[this.stepValue.length - 1];
           console.log("I am new steps array",this.stepsArray,this.options.floor,this.options.ceil);

         }

         else {
          this.adminPricingDetails = response.returnObject;
 console.log("no data")
         }
      },
      error => {
        console.error(error);
        console.log(error);

     })
  }
  changValue(event: any) {
    for (let i = 0; i < this.stepValue.length;i++){
      if (event >= this.stepValue[i+1]) {
      this.totalOrders=this.minValue;
      this.discountPercent=this.discountArray[i];
      this.costPerOrder=this.costPerOrderArray[i];
      this.total = Math.round(this.totalOrders * this.costPerOrderArray[i+1]);
      this.discountValue =Math.round((this.total*this.discountArray[i])/100);
      this.monthlyTotal = Math.round(this.total - this.discountValue);
      this.saveValue = this.discountValue;

    }
    }

  }

  bgColor: string = 'linear-gradient(to right, #ff6a5b 10%, #da184f 90%);'
  // dateRange: Date[] = this.customDateRange();
  // value: number = this.dateRange[0].getTime();
  // constructor() { }


  EditPricePlan(){
    const dialogRef = this.dialog.open(AdminEditPricingComponent,
      {
        width: '1000px',
        disableClose:true,

        // margin: '0 auto'
        // disableClose: true,
        // hasBackdrop: true,
      });

      dialogRef.afterClosed().subscribe(async (result) => {
      console.log('gggggg');
    });
  }


  clickIncrement(event:any){
    this.totalOrders++;
    for (let i = 0; i < this.stepValue.length;i++){
      if (event >= this.stepValue[i+1]) {
      this.discountPercent=this.discountArray[i];
      this.costPerOrder=this.costPerOrderArray[i];
      this.total = Math.round(this.totalOrders * this.costPerOrderArray[i+1]);
      this.discountValue =Math.round((this.total*this.discountArray[i])/100);
      this.monthlyTotal = Math.round(this.total - this.discountValue);
      this.saveValue = this.discountValue;

    }
    }
  }
  clickDicrement(event:any){
    this.totalOrders--
    for (let i = 0;i<this.stepValue.length;i++){
      if (event >= this.stepValue[i+1]) {
      this.discountPercent=this.discountArray[i];
      this.costPerOrder=this.costPerOrderArray[i];
      this.total = Math.round(this.totalOrders * this.costPerOrderArray[i+1]);
      this.discountValue =Math.round((this.total*this.discountArray[i])/100);
      this.monthlyTotal = Math.round(this.total - this.discountValue);
      this.saveValue = this.discountValue;

    }
    }
  }

}
