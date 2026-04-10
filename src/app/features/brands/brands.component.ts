import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BrandsService } from '../../core/services/brands.service';
import { single } from 'rxjs';
import { Brand } from '../../shared/interfaces/brand.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { OurServicesComponent } from "../../our-services/our-services.component";

@Component({
  selector: 'app-brands',
  imports: [RouterLink, NgxPaginationModule, OurServicesComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private readonly brandsService = inject(BrandsService);
  
  brands = signal<Brand[]>([]);
  pageSize = signal<number>(10);
  currentPage = signal<number>(1);
  totalItems = signal<number>(0);

  ngOnInit() {
    this.getAllBrands(this.pageSize(), this.currentPage());
  }

  getAllBrands(limit: number = 10, page: number = 1) {
  this.brandsService.getAllBrands(limit, page).subscribe({
    next: (res) => {
      this.brands.set(res.data);
      this.totalItems.set(res.results);      
      this.currentPage.set(res.metadata.currentPage);
    }
  });
}

 pageChanged(page: number): void {
  this.currentPage.set(page);
  this.getAllBrands(this.pageSize(), page);
  window.scrollTo(0, 0);
}
}
