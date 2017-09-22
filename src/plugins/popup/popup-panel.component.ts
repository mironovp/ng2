import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { PopupService } from 'ng2-qgrid/plugins/popup/popup.service';
import { Popup } from './popup';

@Component({
	selector: 'q-grid-popup-panel',
	templateUrl: './popup-panel.component.html'
})
export class PopupPanelComponent implements OnInit, OnDestroy {

	constructor(private popupService: PopupService, private popup: Popup, public element: ElementRef) {
	}

	ngOnInit() {
		this.element.nativeElement.classList.add('q-grid-popup');
	}

	ngOnDestroy() {
		this.close();
	}

	close() {
		this.popupService.close(this.popup.id);
	}
}
