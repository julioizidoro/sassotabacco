import { Router } from '@angular/router';
import {Component, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-graficovendas',
    templateUrl: './grafico-vendas.component.html',
    styleUrls: ['./grafico-vendas.component.scss']
})
export class GraficoVendasComponent {
    data: any;

    constructor(
        private router: Router,
    ) {
        this.data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
                {
                    label: 'Gráfico de vendas',
                    data: [65, 59, 80, 81, 81, 78, 77, 81, 81, 40],
                    fill: false,
                  backgroundColor: '#218838',
                    borderColor: '#161616'
                },
            ]
        };
    }

    @Input()
    set listDates(array: Array<any>) {
        this.data.labels = array;
    }

    @Input()
    set listChart(array: Array<any>) {
        this.data.datasets[0] = {data: array, label: 'Saldo atual', fill: false,
            backgroundColor: '#218838',
            borderColor: '#161616'};
    }
}
