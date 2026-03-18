import { Component, AfterViewInit, ViewChild, ElementRef, ViewContainerRef, Injector, ComponentRef } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { UserFormComponent } from '../user-form/user-form/user-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;

  users: User[] = [];
  chart: any;

  constructor(private userService: UserService, private injector: Injector) {}

  async ngAfterViewInit() {
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: ['#1c4980', '#383838', '#999']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });

    this.userService.users$.subscribe(users => {
      this.users = users;
      this.updateChart();
    });
  }

  updateChart() {
    if (!this.chart) return;
    const roles = ['Admin', 'Editor', 'Viewer'];
    this.chart.data.datasets[0].data = roles.map(role => this.users.filter(u => u.role === role).length);
    this.chart.update();
  }
  async openAddUserModal() {
  this.modalContainer.clear();

    const { UserFormComponent } = await import('src/app/user-form/user-form/user-form.component');
  const componentRef: ComponentRef<UserFormComponent> =
    this.modalContainer.createComponent(UserFormComponent, { injector: this.injector });

  // Subscribe to events
  componentRef.instance.userAdded.subscribe(user => this.userService.addUser(user));
  componentRef.instance.closeForm.subscribe(() => componentRef.destroy());
}
}