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
            component: () => import('@/views/MusicLibraryView.vue'),
            // children: [
            //     {
            //         path: 'add-music',
            //         name: 'add-music',
            //         component: () => import('../views/AddMusicView.vue'),
            //     },
            // ],
        },
        {
            path: '/song-list',
            name: 'song-list',
            component: () => import('@/views/SongListView.vue'),
        },
        {
            path: '/config',
            name: 'config',
            component: () => import('@/views/ConfigView.vue'),
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
