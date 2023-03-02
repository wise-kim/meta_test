import { createRouter, createWebHistory , createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        // meta: {
        //     requireLogin : true
        // },
        component: ()=> import("../pages/index.vue"),
        /*
        meta:{
            title: "인덱스22", 
            metaTags:[
                {
                    name: "description",
                    content: "description222222"
                },
                { property: "og:title", content: `index 페이지222222` },
                {
                    property: 'og:image',
                    content:  'https://cdn.pixabay.com/photo/2021/02/10/17/20/robin-6002851_960_720.jpg'
                }
            ]
        }
        */
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: ()=> import("../pages/SignUp.vue")
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: () => import("../pages/SignIn.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("../pages/404.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requireLogin)) {
		if (!localStorage.getItem("NAVER_TOKEN") && !localStorage.getItem("KAKAO_TOKEN")) {
			next({
				path: "/signup",
			});
			return
		} else {
			next();
			return
		}
	} else {
		next();
		return
	}
});

export default router