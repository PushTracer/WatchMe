import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue"),
		},
		{
			path: "/motion/:uuid",
			name: "motion",
			component: () => import("../views/MotionView.vue"),
		},
		{
			path: "/info/:uuid",
			name: "info",
			component: () => import("@/views/InfoView.vue"),
		},
		{
			path: "/server",
			name: "server",
			component: () => import("@/views/ServerView.vue"),
		},
		{
			path: "/server/motion/:InstanceId",
			name: "serverMotion",
			component: () => import("@/views/ServerMotionView.vue"),
		},
	],
});

export default router;
