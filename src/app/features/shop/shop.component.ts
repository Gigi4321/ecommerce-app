import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from "../../shared/ui/card/card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { OurServicesComponent } from "../../our-services/our-services.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-shop',
  imports: [CardComponent, NgxPaginationModule, OurServicesComponent, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  private readonly productsService = inject(ProductsService)
  productList = signal<Product[]>([])
  cp = signal<number>(0)
  pageSize = signal<number>(0)
  total = signal<number>(0)
  ngOnInit() {
    this.getAllProducts()
  }
  getAllProducts(number:number=1) {
    this.productsService.getProducts({ page: number, limit: 12 }).subscribe({
      next: res => {
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit)
        this.cp.set(res.metadata.currentPage)
        this.total.set(res.results)
      }
    })
  }
  pageChanged(e:number){
    this.getAllProducts(e)
  }
}
