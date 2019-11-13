import { Router } from '@angular/router';
import {Component, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-timeline',
    templateUrl: './linha-tempo.component.html',
    styleUrls: ['./linha-tempo.component.scss']
})
export class LinhaTempoComponent {
    data: any;

    constructor(
        private router: Router,
    ) {
        this.data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
                {
                    label: 'Fluxo de caixa',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#880E4F'
                },
            ]
        };
    }

    selectData(event) {
        let data = (this.data.labels[event.element._index] + '/2019');
        data = data.substring(6, 10) + '-' + data.substring(3, 5) + '-' + data.substring(0, 2);
        this.router.navigate(['fluxocaixa', data]);
    }

    @Input()
    set listDates(array: Array<any>) {
        this.data.labels = array;
    }

    @Input()
    set listChart(array: Array<any>) {
        this.data.datasets[0] = {data: array, label: 'Saldo atual', fill: false,
            borderColor: '#880E4F'};
    }
}
