import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { OurServicesComponent } from "../../our-services/our-services.component"; 

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, OurServicesComponent], 
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly _categoryService = inject(CategoryService);

  
  subCategoriesList = signal<any[]>([]);
  pageSize = signal<number>(10);
  currentPage = signal<number>(1);
  totalItems = signal<number>(0);

  ngOnInit() {
    this.getAll(this.currentPage());
  }

  getAll(page: number) {
    this._categoryService.getAllCategories(this.pageSize(), page).subscribe({
      next: (res) => {
        console.log('cat page  : ',res)
        this.subCategoriesList.set(res.data);
        this.totalItems.set(res.results); 
        this.currentPage.set(res.metadata.currentPage);
      }
    });
  }

  pageChanged(page: number): void {
    this.currentPage.set(page);
    this.getAll(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}