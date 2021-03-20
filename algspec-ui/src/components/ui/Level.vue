<template>
  <b-spinner v-if="levelDataLoading"></b-spinner>
  <div v-else>
    Level {{ levelData.currentLevel }}:
    <b-progress class="w-75 mx-auto" :max="levelData.experienceNeeded" variant="success">
      <b-progress-bar :value="levelData.currentExperience"> 
        <span><strong>{{ levelData.currentExperience}} / {{ levelData.experienceNeeded }}</strong></span>
      </b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Level',
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  data() {
    return {
      levelData: null,
      levelDataLoading: true
    };
  },
  mounted() {
    this.initLevelData();
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
    initLevelData() {
      const currentLevel = this.user.currentLevel.number;
      const currentExperience = this.user.currentExperience;
      const experienceNeeded = this.user.currentLevel.experienceNeeded;
      this.levelData = {
        currentLevel,
        currentExperience,
        experienceNeeded
      };
      console.log(this.levelData);
      this.levelDataLoading = false;
    }
  }
};
</script>

<style>

</style>