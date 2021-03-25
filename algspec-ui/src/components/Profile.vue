<template>
  <div class="profile p-4">
    <div>
      {{ user }}
      <!-- profile photo inserted here -->
      <img class="profile-picture">
    </div>
    <h3>{{ user.username }}</h3> 
    <Level></Level>
    <b-container>
      <b-card>
        <!-- Section for lesson completedness -->
        <b-row>
          <ul class="lesson-container">
            <li :class="{ 'lesson-element': true, 'select-lesson-element': isComplete }" @click="toggleLessonElement()">completed</li>
            <li :class="{ 'lesson-element': true, 'select-lesson-element': isProgress }" @click="toggleLessonElement()">in-progress</li>
          </ul>
          <div v-if="isComplete">
            <div v-for="algCompleted in user.algorithmsCompleted" :key="algCompleted.name">
              {algCompleted}
            </div>
          </div>
          <div v-else>
            <div v-for="algInProgress in user.algorithmsInProgress" :key="algInProgress.name">
              {algInProgress}
              hello2
            </div>
          </div>
        </b-row>
        <b-row>
          <b-button v-b-modal.profile-editor>Edit Profile</b-button>
        </b-row>
      </b-card>

      <b-modal id="profile-editor">
        Edit Profile Here. IDK what fields to put
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Level from '@/components/ui/Level';

export default {
  name: 'Profile',
  components: {
    Level
  },
  data() {
    return {
      isComplete: true,
      isProgress: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions({

    }),
    toggleLessonElement() {
      this.isComplete = !this.isComplete;
      this.isProgress = !this.isProgress;
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    height: 100vh;
  }

  .lesson-container {
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0 2rem 0 2rem;
  }

  .lesson-element {
    margin: 0 2rem 0 2rem;
    &:hover {
      color:red;
    }
    cursor: pointer;
  }

  .select-lesson-element {
    background-color: gray;
    border-top: red;
    cursor: default;
  }


</style>