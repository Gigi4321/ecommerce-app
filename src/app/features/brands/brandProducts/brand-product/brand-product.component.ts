import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../../../core/services/brands.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../core/services/products.service';
import { Brand } from '../../../../shared/interfaces/brand.interface';
import { Product } from '../../../../shared/interfaces/product.interface';
import { CardComponent } from "../../../../shared/ui/card/card.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-brand-product',
  standalone: true,
  imports: [RouterLink, CardComponent], // ضيفنا RouterLink عشان لو هتروح لتفاصيل المنتج
  templateUrl: './brand-product.component.html',
  styleUrl: './brand-product.component.css',
})
export class BrandProductComponent implements OnInit {
  private readonly brandService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  brandId: string | null = null;
  brandData = signal<Brand | null>(null);
  products = signal<Product[]>([]); 

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: params => {
        this.brandId = params.get('id');
        if (this.brandId) {
          this.getSpecificBrand(this.brandId);
          this.getProductOfBrand(this.brandId);
        }
      }
    });
  }

  getSpecificBrand(id: string) {
    this.brandService.getSpecificProduct(id).subscribe({
      next: res => {
        this.brandData.set(res.data);
      }
    });
  }

  getProductOfBrand(id: string) {
    this.productsService.getProducts({ brand:id}).subscribe({
      next: res => {
        const filterData = res.data.filter((item :any) => item.brand._id === id);
        console.log(res)
        this.products.set(filterData); 
      }
    });
  }
}