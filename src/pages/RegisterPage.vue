<script setup>
import IconKey from '@/components/icons/IconKey.vue';
import IconUser from '@/components/icons/IconUser.vue';
import IconEmail from '@/components/icons/IconEmail.vue'
</script>
<template>
  <div class="flex w-full flex-wrap">
    <div
      class="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-2/3"
    >
      <img
        class="h-screen w-full object-cover opacity-90"
        src="https://www.cta.org/wp-content/uploads/2020/03/empty-classroom.jpg"
        alt="Ảnh lớp học"
      />
    </div>
    <div class="flex w-full flex-col md:w-1/2 lg:w-1/3">
      <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
        <a
          href="#"
          class="border-b-4 border-b-blue-700 pb-2 text-2xl font-bold text-gray-900"
        >
          VAIS
        </a>
      </div>
      <div
        class="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12"
      >
        <p class="text-center text-3xl font-bold">Welcome</p>
        <p class="mt-2 text-center">Đăng ký tài khoản.</p>
        <form class="flex flex-col pt-3 md:pt-8">
          <div class="flex flex-col pt-4">
            <div
              class="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600"
            >
              <IconUser />
              <input
                type="text"
                class="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="laitienduc37"
                required
              />
            </div>
          </div>
          <div class="flex flex-col pt-4">
            <div
              class="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600"
            >
              <IconEmail/>
              <input
                type="text"
                class="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="laitienduc37@gmail.com"
                required
              />
            </div>
          </div>
          <div class="mb-12 flex flex-col pt-4">
            <div
              class="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600"
            >
              <IconKey />
              <input
                type="password"
                class="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="●●●●●●●●"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2"
          >
            <span class="w-full" type="submit"> Đăng ký </span>
          </button>
        </form>
        <div class="pt-12 pb-12 text-center">
          <p class="whitespace-nowrap">
            <RouterLink to="/login" class="font-semibold underline">
              Đăng nhập
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
    
  </div>
</template>
