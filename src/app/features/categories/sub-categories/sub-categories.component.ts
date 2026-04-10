import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { OurServicesComponent } from "../../../our-services/our-services.component";
import { log } from 'node:console';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [CommonModule, OurServicesComponent, RouterLink],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css',
})
export class SubCategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);
  categoryInfo=signal<any>(null);

  subCategoriesList = signal<any[]>([]);
  paginationInfo = signal<any>(null);
  categoryId = signal<string | null>(null);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.categoryId.set(id);        
        if (id) {
         this.loadAllSubCategories(id)          
         this.loadCategoryData(id)          

        }
      }
    });
  }
  loadCategoryData(id:string){
    this.categoryService.getSpecificCategory(id).subscribe({
      next:res=>{
        this.categoryInfo.set(res.data)
      }

    })
  }

  loadAllSubCategories(id:string){
    this.categoryService.getSubCategoriesOnCategory(id).subscribe({
      next:res=>{
        this.subCategoriesList.set(res.data)
      }
    })

   
  }
 
}