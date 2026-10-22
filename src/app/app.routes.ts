import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
  path: 'login',
  loadComponent: () =>
    import(
      './features/auth/pages/login/login.component'
    ).then(
      m => m.LoginComponent
    )
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
  path: '',
  component: AppLayoutComponent,
  canActivate: [authGuard],
  children: [
    {
      path: 'transactions',
      loadComponent: () =>
        import(
          './features/transactions/pages/transaction-list/transaction-list.component'
        ).then(
          m => m.TransactionListComponent
        )
    },

    {
      path: 'transactions/new',
      loadComponent: () =>
        import(
          './features/transactions/pages/create-transaction/create-transaction.component'
        ).then(
          m => m.CreateTransactionComponent
        )
    },
    {
      path: 'transactions/:id/edit',
      loadComponent: () =>
        import(
          './features/transactions/pages/edit-transaction/edit-transaction.component'
        ).then(
          m => m.EditTransactionComponent
        )
    },
    {
      path: 'dashboard',
      loadComponent: () =>
        import(
          './features/dashboard/pages/dashboard/dashboard.component'
        ).then(
          m => m.DashboardComponent
        )
    },
    {
      path: 'admin/users',
      canActivate: [roleGuard],
      data: {
        role: 'admin'
      },
      loadComponent: () =>
        import(
          './features/admin/pages/user-management/user-management.component'
        ).then(
          m => m.UserManagementComponent
        )
      }
    ]
  },
];
