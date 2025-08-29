import { PrimaryLayout } from '@/layouts/primary';

export type RouteType = {
  path: string;
  Component: React.ComponentType;
  Layout: React.ReactElement | null;
  SelfLayout: React.ComponentType<{ children: React.ReactNode }> | null;
  children: RouteType[];
};

export const routes: RouteType[] = [
  {
    path: 'auth',
    Component: () => <div>hello</div>,
    Layout: null,
    SelfLayout: null,
    children: [
      {
        path: 'password',
        Component: () => <div>password page</div>,
        Layout: null,
        SelfLayout: null,
        children: [
          {
            path: 'forgot',
            Component: () => <div>forgot password</div>,
            Layout: null,
            SelfLayout: PrimaryLayout,
            children: []
          },

          {
            path: 'recovery',
            Component: () => <div>recovery password</div>,
            Layout: null,
            SelfLayout: null,
            children: []
          }
        ]
      },

      {
        path: 'login',
        Component: () => <div>login page</div>,
        Layout: null,
        SelfLayout: null,
        children: []
      },

      {
        path: 'logout',
        Component: () => <div>logout page</div>,
        Layout: null,
        SelfLayout: null,
        children: []
      }
    ]
  }
];
