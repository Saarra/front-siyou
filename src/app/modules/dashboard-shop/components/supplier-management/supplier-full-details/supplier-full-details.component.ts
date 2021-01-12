import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-supplier-full-details',
  templateUrl: './supplier-full-details.component.html',
  styleUrls: ['./supplier-full-details.component.scss']
})
export class SupplierFullDetailsComponent implements OnInit {
  suppliersList;
  suppliersData;
  currentId;
  suppProfile;
  suppInfos;
  suppLastAdded;
  suppBestSeller;
  suppDiscount;
  constructor(
    private supplierService: SupplierS2cService,
    private router: ActivatedRoute

  ) { 
    router.params.subscribe(
      params=>{
        this.currentId = params.id; 
      }
    )
      
  }

  ngOnInit() {
    this.onGetSupplierById(this.currentId)
  }
  onGetSupplierById(id){
    return this.supplierService.getSupplierById(this.currentId).subscribe(
      res=>{
         this.suppliersList = res;
         this.suppliersData = this.suppliersList.data;
      }, err=>{
        console.log(err);;
      }
    );
  }


}
