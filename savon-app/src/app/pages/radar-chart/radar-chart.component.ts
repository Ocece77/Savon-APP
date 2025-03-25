import { Component } from '@angular/core';
import Chart, { ChartData, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent{
  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: false,
      }
    ],
  };
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
 }
