<template>
  <div id="dashboard">
    <b-container>
      <!-- Top row of learn page -->
      <b-row>
        <b-col lg="6" class="my-2 my-lg-0">
          <b-card>
            <!-- Header of the stats card -->
            <template #header>
              <h4>Statistics</h4>
            </template>
            <!-- Body of stats card, some graph-->
          </b-card>
        </b-col>
        <b-col lg="6" class="my-2 my-lg-0">
          <b-row>
            <!-- Progress circle graph -->
            <b-col sm="6" class="my-2 my-lg-0">
              <b-card class="mr-2">
                <AlgorithmProgress></AlgorithmProgress>
              </b-card>
            </b-col>
            <!-- Level Card -->
            <b-col sm="6" class="my-2 my-lg-0">
              <b-card>
                <template #header>
                  <div class="level-header">
                    <h6><b>{{ computeLearningTitle }}</b></h6>
                    <b-icon icon="trophy" class="level-icon"></b-icon>
                  </div>
                </template>
                
                <div class="level-body">
                  <div class="level-text">
                    <p>Level {{ currentLevel }}</p>
                    <p>{{ currentExperience }} points to reach Level {{ currentLevel }}</p>
                  </div>
                  <Level></Level>
                </div>
              </b-card>
              <!-- Achievements Earned Card -->
              <b-card class="mt-4 text-left">
                <h6 class="small-msg">Nice Job!</h6>
                <p>Achievements Earned</p>
                <h6>20/40</h6>
              </b-card>
            </b-col>
          </b-row>
          
        </b-col>

      </b-row>

      <h4 class="text-left">Resume Learning</h4>
      <!-- Bottom row of learn page -->
      <b-row>
        <!-- Insert carousel here -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AlgorithmProgress from '@/components/ui/AlgorithmProgress';
import Level from '@/components/ui/Level';

export default {
  name: 'Dashboard',
  components: {
    AlgorithmProgress,
    Level
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    computeLearningTitle() {
      let levels = Object.keys(this.titles);
      let numLevels = levels.map(level => parseInt(level));
      let titleLevel = Math.min(...numLevels.filter(level => 100 < level));
    
      return this.titles[titleLevel];
    }
  },
  data() {
    return {
      titles: null,
      currentLevel: null,
      currentExperience: null
    };
  },
  created() {
    this.titles = {
      20: 'Beginner',
      40: 'Intermediate Learner',
      60: 'Competent Learner',
      80: 'Great Learner',
      100: 'Advanced Learner',
      101: 'Professor',
    }
    this.currentLevel = this.user.currentLevel.number;
    this.currentExperience = this.user.currentExperience;
  },

  mounted() {
  },

  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
  }
};
</script>

<style lang="scss" scoped>
  #dashboard {
    margin-top: 100px;
  }

  .level-icon {
    width: 2rem;
    height: 2rem;
    color:yellow;
  }

  .card {
    width: 100%;
  }

  .card-header {
    border-bottom: none;
  }

  .level-header {
    display: flex;
    justify-content: space-between;
  }

  .level-text {
    font-size: .75rem;
    display: flex;
    justify-content: space-between;
  }

  .small-msg{
    font-size: .75rem;
  }


</style>