<template>
  <div class="mt-5">
    <CategoryCarousel class="categories px-5" slidesPerView=4></CategoryCarousel>
  </div>
</template>

<script>
// import api from '@/config/api';
// import { mapActions } from 'vuex';
import CategoryCarousel from '@/components/ui/CategoryCarousel';

export default {
  name: 'Learn',
  components: {
    CategoryCarousel
  },
  data: function() {
    return {
    }
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
  .categories {
    height: 50vh;
  }
</style>