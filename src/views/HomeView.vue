<template>
  <div class="home">
    <router-link to="/a">home切a</router-link><br />
    <router-link to="/b">home切b</router-link><br />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
