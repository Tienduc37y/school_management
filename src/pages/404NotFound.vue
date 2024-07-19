<template>
  <div
    class="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://haycafe.vn/wp-content/uploads/2022/03/Anh-lop-hoc-gio-tan-hoc.jpg')]"
  >
    <div
      class="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg"
    >
      <div class="text-9xl font-bold text-indigo-600 mb-4">404</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-6">Oops! Page Not Found</h1>
      <RouterLink
        to="/"
        class="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
      >
        Go Back
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
