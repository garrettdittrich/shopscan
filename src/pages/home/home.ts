import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;
  options :BarcodeScannerOptions;

  productName: any;
  productImage: any;
  upc_code: any;
  loading: boolean;
  
  

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
      

  }
  
  
  test(){
    this.dataService.postRequest('070847017554').subscribe(response => {
      
      let returned_json = JSON.parse(response["_body"])
      this.productFound = true;
      this.productName = returned_json.items[0].name
      this.productImage = returned_json.items[0].largeImage
      console.log(returned_json)
    })
    console.log('You clicked the button')

    
  }
  scan() {
    this.options = {
      orientation : "landscape",
      prompt : "Scan your barcode "      
    }
    //Start loading bar
    this.loading = true;


    this.selectedProduct = {};
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      
      
      this.dataService.postRequest(barcodeData.text).subscribe(response => {
        
        try{
          this.upc_code = barcodeData.text;
          let returned_json = JSON.parse(response["_body"])
          this.productFound = true;
          this.productName = returned_json.items[0].name
          this.productImage = returned_json.items[0].largeImage
          console.log(returned_json)
          this.loading = false;
          console.log(this.loading)
        }
        catch (error){
          console.log(error);
        }
      }, complete => console.log('complete'))
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
    
  }

}
