import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../../core/services/products.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { CardComponent } from "../../../../../shared/ui/card/card.component";
import { OurServicesComponent } from "../../../../../our-services/our-services.component";

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [RouterLink, CardComponent, OurServicesComponent],
  templateUrl: './category-product.component.html'
})
export class CategoryProductsComponent implements OnInit { 
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);

  products = signal<any[]>([]);
  categoryData = signal<any>(null);
  isLoading = signal<boolean>(true); 

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const catId = params.get('id');
        if (catId) {
          console.log(catId)
          this.getCategoryInfo(catId);
          this.loadProducts(catId);
        }
      }
    });
  }

  getCategoryInfo(id: string) {
    this.categoryService.getSpecificSubCategory(id).subscribe({
      next: (res) => {
        this.categoryData.set(res.data);
      },
      error: (err) => console.error('Category Info Error:', err)
    });
  }

  loadProducts(id: string) {
    this.isLoading.set(true);
    
    this.productsService.getProducts({ category: id, limit: 20 }).subscribe({
      next: (res) => {
        console.log('res',res)
         const filteredData = res.data.filter((item: any) => item.subcategory[0]._id === id);  
        console.log("helllllllllllllo")
        console.log('API Response:', filteredData);
        this.products.set(filteredData); 
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Products Load Error:', err);
        this.isLoading.set(false);
      }
    });
  }
}