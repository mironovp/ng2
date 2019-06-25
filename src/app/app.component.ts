import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	ChangeDetectionStrategy,
	HostBinding,
	ElementRef,
	ViewChildren,
	QueryList,
	AfterViewInit,
	NgZone
} from '@angular/core';
import {
	Router,
	Routes,
	RouterLinkActive,
	ActivatedRoute
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { APP_ROUTES } from '../examples/example.module';
import { Location } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {
	@HostBinding('class.app-is-mobile') isMobile: boolean;
	examples: Routes = APP_ROUTES;

	@ViewChildren(RouterLinkActive, { read: ElementRef })
	menuItems: QueryList<ElementRef>;

	private mobileQueryListener: () => void;
	private mobileQuery: MediaQueryList;
	inputValue: string;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private location: Location,
		private zone: NgZone,
		cd: ChangeDetectorRef,
		media: MediaMatcher,
	) {
		const setIsMobile = () => this.isMobile = this.mobileQuery.matches;

		this.mobileQueryListener = () => {
			setIsMobile();
			cd.detectChanges();
		};

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.mobileQuery.addListener(this.mobileQueryListener);
		setIsMobile();
	}

	onSearchChange() {
		this.location.go(this.router.url.split('?')[0], (this.inputValue) ? `search=${this.inputValue}` : '');
	}

	getGithubUrl(): string {
		return `https://github.com/qgrid/ng2-example/tree${this.router.url.split('?')[0]}/latest/src/app`;
	}

	getStackblitzUrl(): string {
		return `https://stackblitz.com/github/qgrid/ng2-example/tree${this.router.url.split('?')[0]}/latest`;
	}

	ngAfterViewInit() {
		const subscriber = this.activatedRoute.queryParams.subscribe(params => {
			if (params['search']) {
				this.inputValue = params['search'];
				subscriber.unsubscribe();
			}
		});
		this.zone.runOutsideAngular(() => {
			setTimeout(() => {
				if (this.menuItems.first && !this.findRequestedItem()) {
					this.router.navigateByUrl(this.menuItems.first.nativeElement.getAttribute('href'));
				}
				const activeItem = this.findActiveItem();
				if (activeItem) {
					activeItem.nativeElement.scrollIntoView();
				}
			}, 0);
		});
	}

	private findRequestedItem() {
		return this.menuItems.find(item => item.nativeElement.getAttribute('href').includes(this.router.url.split('?')[0]));
	}

	private findActiveItem() {
		return this.menuItems.find(item => item.nativeElement.classList.contains('app-active'));
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this.mobileQueryListener);
	}
}
