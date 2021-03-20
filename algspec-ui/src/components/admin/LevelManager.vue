<template>
  <div>
    <b-container>
      <b-card>
        <!-- Header of the outer card -->
        <template #header>
          <h6>Level Manager</h6>
        </template>
        
        <!-- The rest of the content of the outer card -->
        <b-row align-h="center" class="mb-3">
          <b-button @click="createLevel()">Add a new level</b-button>
        </b-row>
        <b-row align-h="center">
          <b-col>
            <b-card :key="level.number" v-for="level in levels">
              <h6>Level: {{ level.number }}</h6>
              <p>Experience Needed: {{ level.experienceNeeded }}</p> 
              <b-button class="mr-3" @click="editLevel(level)">Edit</b-button>
              <b-button variant="danger" @click="launchConfirmDelete(level)">Delete</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-card>

      <!-- Popup modal for editing levels -->
      <b-modal
        id="level-editor"
        ref="level-editor"
        size="xl"
        no-close-on-backdrop
      >
        <!-- Modal header -->
        <template #modal-header>
          <h6>{{ editorHeader }}</h6>
        </template>

        <!-- Modal content -->
        <b-overlay :show="editorBusy" rounded>
          <b-card>
            <!-- Number -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="level-number">Number:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="level-number"
                  id="level-number"
                  v-model="number"
                  class="mx-auto w-100"
                  size="sm"
                  :disabled="true"
                ></b-form-input>
              </b-col>
            </b-form-row>

            <!-- Experience Needed -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="experience-needed">Experience Needed:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="experience-needed"
                  id="experience-needed"
                  type="number"
                  v-model="experienceNeeded"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>
          </b-card>
        </b-overlay>

        <!-- Modal footer -->
        <template #modal-footer="{ close }">
          <b-button
            variant="primary"
            :disabled="experienceNeeded === 0"
            @click="saveLevel(close)"
          >
            Save
          </b-button>
          <b-button
            variant="danger"
            @click="discardLevel(close)"
          >
            Discard
          </b-button>
        </template>
      </b-modal>

      <!-- Popup modal for confirming deletions -->
      <b-modal
        id="confirm-delete"
        ref="confirm-delete"
        size="sm"
        no-close-on-backdrop
      >
        <p v-if="selectedLevel">Are you sure you want to delete <b>Level {{ selectedLevel.number }}</b></p>

        <!-- Modal content -->
        <template #modal-footer="{ close }">
          
          <b-button
            variant="danger"
            @click="confirmDeleteLevel(close)"
          >
            Yes
          </b-button>
          <b-button
            @click="unconfirmDeleteLevel(close)"
          >
            No
          </b-button>
        </template>
      </b-modal>

    </b-container>
  </div>
</template>

<script>
import api from '@/config/api';
import { mapActions } from 'vuex';

export default {
  name: 'LevelManager',
  components: {
  },
  computed: {
  },
  data: function() {
    return {
      levels: null,
      selectedLevel: null,
      editorHeader: '',
      editorCreate: true,
      editorBusy: false,
      showModalError: false,
      modalErrorMessage: '',

      nextLevelNumber: 0,
      number: 0,
      experienceNeeded: 0,
    };
  },
  mounted: async function() {
    try {
      // Make the initial request(s)
      this.levels = (await api.get('/level/all')).data.sort((a, b) => b.number - a.number);

      console.log('setting levels...', this.levels);

      // Find the largest level number to determine the next one to create
      if (this.levels.length > 0) {
        this.nextLevelNumber = this.levels.sort((a, b) => b.number - a.number)[0].number + 1;
      }
      this.clearLevelData();

    } catch (err) {
      this.error({ message: `Error loading levels data: ${err.message}`, redirect: false });
    }
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
    loadLevelData() {
      this.number = this.selectedLevel.number;
      this.experienceNeeded = this.selectedLevel.experienceNeeded;
    },
    clearLevelData() {
      this.number = this.nextLevelNumber;
      this.experienceNeeded = 0; 
      this.editorHeader = `Creating Level ${this.nextLevelNumber}`;
      this.editorCreate = true;
    },
    createLevel() {
      this.$refs['level-editor'].show();
    },
    editLevel(level) {
      this.selectedLevel = level;
      this.loadLevelData();
      this.editorHeader = `Editing Level ${this.selectedLevel.number}`;
      this.editorCreate = false;
      this.$refs['level-editor'].show();
    },
    async saveLevel(close) {
      try {
        // Create the payload
        const payload = {};
        if (!this.editorCreate) {
          payload['id'] = this.selectedLevel._id;
        }
        payload.number = this.number;
        payload.experienceNeeded = this.experienceNeeded;

        // Create or update the level
        await api.post(this.editorCreate ? '/level/create' : '/level/update', payload);
        console.log(this.editorCreate ? 
                      `created level ${this.number}` :
                      `updated level ${this.selectedLevel.number}`);

        // Reload all of the level data to refresh the list
        this.levels = (await api.get('/level/all')).data.sort((a, b) => b.number - a.number);
        console.log('setting levels...', this.levels);

        // Update the next level number if necessary
        if (this.editorCreate) {
          ++this.nextLevelNumber;
        }
        
      } catch (err) {
        this.error({ message: `Error saving level data: ${err.message}`, redirect: false });

      } finally {
        // Then clear the modal fields and close it
        this.clearLevelData();
        close();
      }
    },
    discardLevel(close) {
      // Clear the modal fields and close it
      this.clearLevelData();
      close();
    },
    async deleteLevel() {
      try {
        // Create the payload
        const payload = { number: this.selectedLevel.number };

        // Delete the level
        await api.post('/level/delete', payload);

        // Reload all of the level data to refresh the list
        this.levels = (await api.get('/level/all')).data.sort((a, b) => b.number - a.number);
        console.log('setting levels...', this.levels);

        // Update the next level number if necessary
        if (this.number === this.nextLevelNumber) {
          --this.nextLevelNumber;
        }
      
      } catch (err) {
        this.error({ message: `Error deleting level data: ${err.message}`, redirect: false });

      } finally {
        // Then clear the modal fields and close it
        this.clearLevelData();
      }
    },
    launchConfirmDelete(level) {
      this.selectedLevel = level;
      this.$refs['confirm-delete'].show();
    },
    async confirmDeleteLevel(close) {
      try {
        await this.deleteLevel();
        // Reload all of the level data to refresh the list
        this.levels = (await api.get('/level/all')).data.sort((a, b) => b.number - a.number);
        console.log('setting levels...', this.levels);
      
      } catch (err) {
        this.error({ message: `Error reloading level data: ${err.message}`, redirect: false });

      } finally {
        close();
      }
    },
    unconfirmDeleteLevel(close) {
      close();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>