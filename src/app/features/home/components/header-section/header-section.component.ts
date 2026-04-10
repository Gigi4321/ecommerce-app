import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-header-section',
  imports: [],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.css',
})
export class HeaderSectionComponent {
  blackText:InputSignal<string>=input.required()
  decoratedText:InputSignal<string>=input.required()
}
