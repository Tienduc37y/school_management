<script setup>
import { onMounted, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { getCookie } from "@/axios/setupApi";
import store from "@/store";
import debounce from "lodash.debounce";
import { loginSchema } from "@/utils/validate";
import { arrayToObject } from "@/utils/function";
import FieldComponent from "@/components/FieldComponent.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconKey from "@/components/icons/IconKey.vue";
import { LABEL_LOGIN } from "@/constants/option";

const router = useRouter();
const emit = defineEmits(["setLoading"]);
const errors = ref({
  username: "",
  password: "",
});
let formLogin = reactive({
  username: "",
  password: "",
});
onMounted(() => checkAccessToken());
const checkAccessToken = () => {
  if (getCookie("accessToken")) {
    return router.push("/teacher");
  } else {
    return router.push("/login");
  }
};
const handleSubmitForm = debounce(async () => {
  try {
    loginSchema.validateSync(formLogin, { abortEarly: false });
    errors.value = {
      username: "",
      password: "",
    };
    emit("setLoading", true);
    await store.dispatch("loginUser", formLogin);

    if (!errors.value.username && !errors.value.password) {
      checkAccessToken();
    }
  } catch (error) {
    if (Array.isArray(error.inner)) {
      const errorMess = error.inner.map((item) => ({
        [item.path]: item.message,
      }));
      return (errors.value = arrayToObject(errorMess));
    }
  } finally {
    emit("setLoading", false);
  }
}, 500);
</script>
<template>
  <div class="flex w-full flex-wrap">
    <div class="flex w-full flex-col md:w-1/2 lg:w-1/3">
      <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
        <RouterLink to="/" class="border-b-4 border-b-blue-700 pb-2 text-2xl font-bold text-gray-900">VAIS</RouterLink>
      </div>
      <div
        class="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12"
      >
        <p class="text-center text-3xl font-bold">Chào Mừng</p>
        <p class="mt-2 text-center">Đăng nhập để quản lý trường học.</p>
        <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="handleSubmitForm">
          <div class="flex flex-col pb-4">
            <FieldComponent
              v-for="(value, key,index) of LABEL_LOGIN"
              :error="errors[key]"
              :label="value.text"
              :required="value.required"
              :key="index"
              class="py-2"
            >
              <div class="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                <IconUser v-if="key === 'username'"></IconUser>
                <IconKey v-if="key === 'password'"></IconKey>
                <input
                  :type="`${key === 'password' ? 'password' : 'text'}`"
                  :id="key"
                  :name="formLogin[key]"
                  class="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  autocomplete="off"
                  v-model="formLogin[key]"
                  :placeholder="value.placeholder"
                />
              </div>
            </FieldComponent>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-4 py-3 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2"
          >
            <span class="w-full" type="submit"> Đăng nhập </span>
          </button>
        </form>
        <div class="pt-12 pb-12 text-center">
          <p class="whitespace-nowrap">
            Bạn chưa có tài khoản ?
            <RouterLink to="/register" class="font-semibold underline">
              Đăng ký
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div
      class="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-2/3"
    >
      <img
        class="h-screen w-full object-cover opacity-90"
        src="https://haycafe.vn/wp-content/uploads/2022/03/Anh-lop-hoc-gio-tan-hoc.jpg"
        alt="Ảnh lớp học"
      />
    </div>
  </div>
</template>
