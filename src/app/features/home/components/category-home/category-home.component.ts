import { Component, inject, signal } from '@angular/core';
import { HeaderSectionComponent } from "../header-section/header-section.component";

import { Category } from '../../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../../core/services/category.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-home',
  imports: [HeaderSectionComponent, RouterLink],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.css',
})
export class CategoryHomeComponent {
  private readonly categoryService=inject(CategoryService)
  allCategories=signal<Category[]>([])
  ngOnInit(){
    this.getAllCategories()
  }
  getAllCategories(){
    return this.categoryService.getAllCategories().subscribe({
      next:(res)=>{this.allCategories.set(res.data)
        console.log('cacat : ',res.data)
      },
      error:(err)=>console.log(err)
    })
  }
}
