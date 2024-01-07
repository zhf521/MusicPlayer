import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/music-library',
        },
        {
            path: '/music-library',
            name: 'music-library',
            meta: { showFather: true },
            component: () => import('@/views/MusicLibraryView.vue'),
            children: [
                {
                    path: 'add-music/:filename',
                    name: 'add-music',
                    meta: { showFather: false },
                    component: () => import('../views/AddMusicView.vue'),
                },
            ],
        },
        {
            path: '/song-list',
            name: 'song-list',
            component: () => import('@/views/SongListView.vue'),
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('@/views/SettingView.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;
