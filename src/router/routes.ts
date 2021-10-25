import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('pages/Welcome.vue'),
  },

  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/sign-in',
    component: () => import('pages/auth/Auth.vue'),
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('pages/auth/SignIn.vue'),
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import('pages/auth/SignUp.vue'),
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('pages/auth/ForgotPassword.vue'),
      },
      {
        path: 'reset-password/:token',
        name: 'ResetPassword',
        component: () => import('pages/auth/ResetPassword.vue'),
      },
    ],
  },

  {
    path: '/video-chat',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/video-chat/start-matching',
    children: [
      {
        path: 'start-matching',
        name: 'StartMatching',
        component: () => import('pages/videoChat/StartMatching.vue'),
        meta: { ifAuthenticated: true },
      },
      {
        path: 'matching',
        name: 'Matching',
        component: () => import('pages/videoChat/Matching.vue'),
        meta: { ifAuthenticated: true },
      },
      {
        path: 'table/:roomId',
        name: 'VideoChatTable',
        component: () => import('pages/videoChat/Table.vue'),
      },
      {
        path: 'invite/:roomId',
        name: 'VideoChatInviteTable',
        component: () => import('pages/videoChat/InviteTable.vue'),
      },
      {
        path: 'full-room',
        name: 'FullRoom',
        component: () => import('pages/videoChat/FullRoom.vue'),
      },
      {
        path: 'rating',
        name: 'Rating',
        component: () => import('pages/videoChat/Rating.vue'),
        meta: { ifAuthenticated: true },
      },
    ],
  },

  {
    path: '/email-actions',
    name: 'FirebaseEmailActions',
    component: () => import('pages/FirebaseEmailActions.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    name: 'Error404',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
