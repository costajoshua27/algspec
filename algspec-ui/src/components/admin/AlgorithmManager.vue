<template>
  <div>
    <b-container>
      <b-card>
        <!-- Header of the outer card -->
        <template #header>
          <h6>Algorithm Manager</h6>
        </template>
        
        <!-- The rest of the content of the outer card -->
        <b-row align-h="center" class="mb-3">
          <b-button @click="createAlgorithm()">Create an algorithm</b-button>
        </b-row>
        <b-row align-h="center">
          <b-card-group deck class="mx-4 mt-2 mb-4">
            <b-card :key="alg.name" v-for="alg in algorithms">
              <b-row>
                <b-col cols="12">
                  <h6>{{ alg.name }}</h6>
                </b-col>
                <b-col cols="12">
                  <b-button @click="editAlgorithm(alg)">Edit</b-button>
                </b-col>
                <b-col cols="12">
                  <b-button variant="danger" @click="launchConfirmDelete(alg)">Delete</b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-row>
      </b-card>

      <!-- Popup modal for editing algorithms -->
      <b-modal
        id="algorithm-editor"
        ref="algorithm-editor"
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
            <!-- Name -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="algorithm-name">Name:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="algorithm-name"
                  id="algorithm-name"
                  v-model="name"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>
            
            <!-- Tags -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="algorithm-tags">Tags:</label>
              </b-col>
              <b-col lg="7">
                <multiselect
                  v-model="tags"
                  :options="tagPool"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  label="name"
                  track-by="name"
                  id="algorithm-tags"
                  name="algorithm-tags"
                  class="mx-auto w-100"
                  size="sm"
                  :max-height="250"
                  placeholder="Select tags"
                ></multiselect>
              </b-col>
            </b-form-row>

            <!-- Introduction -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="algorithm-intro">Introduction:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="algorithm-intro"
                  id="algorithm-intro"
                  v-model="introduction"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>

            <!-- Overview -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="algorithm-overview">Overview:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="algorithm-overview"
                  id="algorithm-overview"
                  v-model="overview"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>

            <!-- Visualization -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="visualization">Visualization:</label>
                <b-icon-check-circle-fill
                  v-if="!showModalError"
                  variant="success"
                  class="ml-2"
                ></b-icon-check-circle-fill>
                <b-icon-exclamation-circle-fill
                  v-if="showModalError"
                  id="modal-error"
                  variant="danger"
                  class="ml-2"
                ></b-icon-exclamation-circle-fill>
                <b-popover
                  v-if="showModalError"
                  target="modal-error"
                  triggers="hover"
                  placement="right"
                >
                  {{ modalErrorMessage }}
                </b-popover>
              </b-col>
              <b-col lg="7">
                <prism-editor
                  id="visualization"
                  class="visualization-editor"
                  v-model="visualization"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </b-col>
            </b-form-row>

            <!-- Pseudocode -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="algorithm-pseudocode">Pseudocode:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="algorithm-pseudocode"
                  id="algorithm-pseudocode"
                  v-model="pseudocode"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>

            <!-- Solutions -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="algorithm-solutions">Solutions:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="algorithm-solutions"
                  id="algorithm-solutions"
                  v-model="solutions"
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
            :disabled="name === '' || !visualizationIsValid()"
            @click="saveAlgorithm(close)"
          >
            Save
          </b-button>
          <b-button
            variant="danger"
            @click="discardAlgorithm(close)"
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
        <p v-if="selectedAlgorithm">Are you sure you want to delete <b>{{ selectedAlgorithm.name }}</b></p>

        <!-- Modal content -->
        <template #modal-footer="{ close }">
          
          <b-button
            variant="danger"
            @click="confirmDeleteAlgorithm(close)"
          >
            Yes
          </b-button>
          <b-button
            @click="unconfirmDeleteAlgorithm(close)"
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
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

const ALGORITHM_FIELDS = [
  'name',
  'tags',
  'introduction',
  'overview',
  'visualization',
  'pseudocode',
  'solutions'
];

export default {
  name: 'AlgorithmManager',
  components: {
    PrismEditor
  },
  computed: {
  },
  data: function() {
    return {
      algorithms: null,
      selectedAlgorithm: null,
      tagPool: null,
      editorHeaderDefault: 'Creating algorithm',
      editorHeader: 'Creating algorithm',
      editorCreate: true,
      editorBusy: false,
      showModalError: false,
      modalErrorMessage: '',

      name: '',
      tags: [],
      introduction: '',
      overview: '',
      visualization: '',
      pseudocode: '',
      solutions: []
    };
  },
  mounted: async function() {
    try {
      // Make the initial requests
      const getAlgorithms = api.get('/algorithm/all');
      const getTags = api.get('/tag/all');

      // Await the data
      this.algorithms = (await getAlgorithms).data;
      this.tagPool = (await getTags).data.map(obj => {
        return { name: obj.name };
      });

      console.log('setting algorithms...', this.algorithms);
      console.log('setting the available tags...', this.tagPool);

    } catch (error) {
      console.log('error when mounting component: ', error);
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.json);
    },
    visualizationIsValid() {
      if (this.visualization === '') {
        this.showModalError = true;
        this.modalErrorMessage = 'Please provide a visualization configuration object';
        return false;
      }

      try {
        JSON.parse(this.visualization);
        this.showModalError = false;
        return true;

      } catch (error) {
        this.showModalError = true;
        this.modalErrorMessage = 'Visualization configuration in not valid JSON';
        return false;
      }
    },
    loadAlgorithmData() {
      for (let field of ALGORITHM_FIELDS) {
        if (field === 'tags') {
          this[field] = this.selectedAlgorithm[field].map(name => {
            return { name };
          });
        } else if (field === 'visualization') { 
          this[field] = JSON.stringify(this.selectedAlgorithm[field], null, 2);
        } else {
          this[field] = this.selectedAlgorithm[field];
        }
      }
    },
    clearAlgorithmData() {
      for (let field of ALGORITHM_FIELDS) {
        if (field === 'tags' || field === 'solutions') {
          this[field] = [];
        } else if (field === 'visualization') {
          this[field] = ''; 
        } else {
          this[field] = '';
        }
      }
      this.editorHeader = this.editorHeaderDefault;
      this.editorCreate = true;
    },
    createAlgorithm() {
      this.$refs['algorithm-editor'].show();
    },
    editAlgorithm(alg) {
      this.selectedAlgorithm = alg;
      this.loadAlgorithmData();
      this.editorHeader = `Editing algorithm ${this.selectedAlgorithm.name}`;
      this.editorCreate = false;
      this.$refs['algorithm-editor'].show();
    },
    async saveAlgorithm(close) {
      try {
        // Create the payload
        const payload = {};
        if (!this.editorCreate) {
          payload['id'] = this.selectedAlgorithm._id;
        }
        for (let field of ALGORITHM_FIELDS) {
          if (field === 'tags') {
            payload[field] = this[field].map(obj => obj.name);
          } else if (field === 'visualization') {
            payload[field] = JSON.parse(this[field]);
          } else {
            payload[field] = this[field]; 
          }
        }

        // Create or update the algorithm
        await api.post(this.editorCreate ? '/algorithm/create' : '/algorithm/update', payload);
        console.log(this.editorCreate ? 
                      `created algorithm ${this.name}` :
                      `updated algorithm ${this.selectedAlgorithm.name}`);

        // Reload all of the algorithm data to refresh the list
        this.algorithms = (await api.get('/algorithm/all')).data;
        console.log('setting algorithms...', this.algorithms);
        
      } catch (error) {
        console.log('error when saving algorithm data: ', error);

      } finally {
        // Then clear the modal fields and close it
        this.clearAlgorithmData();
        close();
      }
    },
    discardAlgorithm(close) {
      // Clear the modal fields and close it
      this.clearAlgorithmData();
      close();
    },
    async deleteAlgorithm() {
      try {
        // Create the payload
        const payload = { name: this.selectedAlgorithm.name };

        // Delete the algorithm
        await api.post('/algorithm/delete', payload);

        // Reload all of the algorithm data to refresh the list
        this.algorithms = (await api.get('/algorithm/all')).data;
        console.log('setting algorithms...', this.algorithms);
      
      } catch (error) {
        console.log('error when saving algorithm data: ', error);
      }
    },
    launchConfirmDelete(alg) {
      this.selectedAlgorithm = alg;
      this.$refs['confirm-delete'].show();
    },
    async confirmDeleteAlgorithm(close) {
      try {
        await this.deleteAlgorithm();
        // Reload all of the algorithm data to refresh the list
        this.algorithms = (await api.get('/algorithm/all')).data;
        console.log('setting algorithms...', this.algorithms);

      } catch (error) {
        console.log('error when deleting algorithm data: ', error);

      } finally {
        close();
      }
    },
    unconfirmDeleteAlgorithm(close) {
      close();
    }
  }
};
</script>

<style scoped>
.visualization-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;
 
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
</style>