import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/HomeView.vue'),
            redirect: '/music-library',
            children: [
                {
                    path: 'music-library',
                    name: 'music-library',
                    component: () => import('@/views/MusicLibraryView.vue'),
                },
                {
                    path: 'song-list',
                    name: 'song-list',
                    meta: { showFather: true },
                    component: () => import('@/views/SongListView.vue'),
                    children: [
                        {
                            path: 'song-list-details/:name',
                            name: 'song-list-details',
                            meta: { showFather: false },
                            component: () =>
                                import('@/views/SongListDetailsView.vue'),
                        },
                    ],
                },
                {
                    path: 'cloud-files/:filename',
                    name: 'cloud-files',
                    component: () => import('@/views/CloudFilesView.vue'),
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: () => import('@/views/SettingsView.vue'),
                },
            ],
        },
    ],
});

export default router;
