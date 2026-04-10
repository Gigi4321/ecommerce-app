import { Component, inject, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderSectionComponent } from "../header-section/header-section.component";
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../shared/interfaces/product.interface';
import { RouterLink } from "@angular/router";

import { CardComponent } from "../../../../shared/ui/card/card.component";
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: 'app-porduct-home',
  imports: [HeaderSectionComponent, CardComponent, NgxPaginationModule],
  templateUrl: './porduct-home.component.html',
  styleUrl: './porduct-home.component.css',
})
export class PorductHomeComponent {
  private readonly productService = inject(ProductsService)
  private readonly platformId = inject(PLATFORM_ID)

  productList: WritableSignal<Product[]> = signal([])
  cp = signal<number>(0)
  pageSize = signal<number>(0)
  total = signal<number>(0)
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.getProductsData()
  }
  getProductsData(e: number = 1) {
    this.productService.getProducts({ page: e, limit: 12 }).subscribe({
      next: res => {
        this.productList.set(res.data)
        this.cp.set(res.metadata.currentPage)
        this.pageSize.set(res.metadata.limit)
        this.total.set(res.results)
      },
      error: err => console.log("err", err)
    })
  }
  pageChanged(e: number) {
    this.getProductsData(e)
  }

}
