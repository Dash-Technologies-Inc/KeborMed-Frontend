import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalUsers: number = 0;
  totalCompanies: number = 0;

  dataSource: { companyName: string; numberOfUsers: number }[] = [];
  displayedColumns: string[] = ['companyName', 'numberOfUsers'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe((users: User[]) => {
      this.totalUsers = users.length;

      // Aggregate users per company
      const usersPerCompany = users.reduce((acc, user) => {
        const companyName = user.company?.name || 'Unknown';
        acc[companyName] = (acc[companyName] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      // Convert to dataSource format
      this.dataSource = Object.entries(usersPerCompany).map(([companyName, numberOfUsers]) => ({
        companyName,
        numberOfUsers,
      }));

      this.totalCompanies = Object.keys(usersPerCompany).length;
    });
  }
}
