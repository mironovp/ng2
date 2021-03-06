import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-summary-column-aggregation',
	templateUrl: 'example-summary-column-aggregation.component.html',
	styleUrls: ['example-summary-column-aggregation.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSummaryColumnAggregationComponent {
	static id = 'summary-column-aggregation';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
