<template>
  <div class="about">
    <router-link to="/about/a">about切a</router-link> <br />
    <router-link to="/about/b">about切b</router-link><br />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'aboutView',
};
</script>
