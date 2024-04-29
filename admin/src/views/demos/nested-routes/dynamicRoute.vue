<template> <div>路由id：{{ route.params.id }}</div> </template>

<script setup name="DynamicRoute">
  const route = useRoute();
</script>
