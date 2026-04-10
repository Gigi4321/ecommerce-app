import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';

import { PorductHomeComponent } from './components/porduct-home/porduct-home.component';
import { HeaderSectionComponent } from "./components/header-section/header-section.component";
import { ContactComponent } from "./components/contactUs/contact/contact.component";
import { OurServicesComponent } from "../../our-services/our-services.component";
import { CategoryHomeComponent } from './components/category-home/category-home.component';


@Component({
  selector: 'app-home',
  imports: [SliderComponent, PorductHomeComponent, ContactComponent, OurServicesComponent,CategoryHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
