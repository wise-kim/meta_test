<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useMeta } from "vue-meta";
const isLogin = ref(false);
const data = reactive({ isLogin });

const router = useRouter();
onMounted(() => {
    document.dispatchEvent(new Event("custom-render-trigger"));
    setTimeout(() => {
        loginCheck(); //  XXX 로그인 동적으로 체크 못하냐고-_-+
    }, 500);
});

const loginCheck = () => {
    if (localStorage.getItem("KAKAO_TOKEN") || localStorage.getItem("NAVER_TOKEN")) {
        data.isLogin = true;
    } else {
        data.isLogin = false;
    }
};

const logout = () => {
    if (localStorage.getItem("KAKAO_TOKEN")) {
        localStorage.removeItem("KAKAO_TOKEN");
        Kakao.Auth
            .logout
            /* 연결끊기가 카카오가입 탈퇴임???
            Kakao.API.request({
                url: "/v1/user/unlink",
            })
                .then(function (res) {
                    console.log("kakao unlink success", res);
                })
                .catch((error) => {
                    console.log("unlink error:::", error);
                })
                */
            ();
        router.push({ path: "/signup" });
    } else if (localStorage.getItem("NAVER_TOKEN")) {
        naverLogout();
        router.push({ path: "/signup" });
    }
};

const naverLogout = () => {
    axios
        .post("https://nid.naver.com/oauth2.0/token", null, {
            params: {
                grant_type: "delete",
                client_id: "IgsfsyuqQGNjYLQgfKhP",
                client_secret: "nEgwJtvI_3",
                access_token: localStorage.getItem("NAVER_TOKEN"),
                service_provider: "NAVER",
            },
        })
        .then((res) => {
            const data = res.data;
            if (data.result == "success") {
                localStorage.removeItem("NAVER_TOKEN");
            }
        });
};
// XXX: vue-meta test
useMeta({
    title: "메타 타이틀 테스트",
    htmlAttrs: { lang: "ko", amp: true },
    meta: [
        { property: "og:title", content: `기본메타테그 타이틀 변경 가능한가` },
        {
            property: "og:image",
            content: `https://cdn.pixabay.com/photo/2021/02/10/17/20/robin-6002851_960_720.jpg`,
        },
        {
            property: "og:description",
            content: "default og description 변경 가능한가",
        },
    ],
});
</script>

<template>
    <!-- <nav>
        <router-link to="/" active-class="font-bold">Home</router-link>
        <router-link to="/signup" active-class="font-bold">SignUp</router-link>
        <button v-if="loginCheck()" @click="logout">logout</button>
    </nav> -->
    <metainfo>
        <template v-slot:title="{ content }">{{ content }}</template>
    </metainfo>
    <div class="w-full max-w-lg mx-auto">
        <button v-if="isLogin" @click="logout">logout</button>
        <router-view></router-view>
    </div>
</template>

<style scoped></style>
