<template>
  <div>
    <b-container>
      <b-card>
        <!-- Header of the outer card -->
        <template #header>
          <h6>Module Manager</h6>
        </template>
        
        <!-- The rest of the content of the outer card -->
        <b-row align-h="center" class="mb-3">
          <b-button @click="createModule()">Create an module</b-button>
        </b-row>
        <b-row align-h="center">
            <b-col>
              <b-card :key="mod.name" v-for="mod in modules">
                <h6>Name: {{ mod.name }}</h6>
                <b-button class="mr-3" @click="editModule(mod)">Edit</b-button>
                <b-button variant="danger" @click="launchConfirmDelete(mod)">Delete</b-button>
              </b-card>
            </b-col>
        </b-row>
      </b-card>

      <!-- Popup modal for editing modules -->
      <b-modal
        id="module-editor"
        ref="module-editor"
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
                <label for="module-name">Name:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="module-name"
                  id="module-name"
                  v-model="name"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>
            
            <!-- Categories -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="module-categories">Categories:</label>
              </b-col>
              <b-col lg="7">
                <multiselect
                  v-model="categories"
                  :options="categoryPool"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  label="name"
                  track-by="name"
                  id="module-categories"
                  name="module-categories"
                  class="mx-auto w-100"
                  size="sm"
                  :max-height="250"
                  placeholder="Select categories"
                ></multiselect>
              </b-col>
            </b-form-row>

            <!-- Description -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="module-description">Description:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="module-description"
                  id="module-description"
                  v-model="description"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>

            <!-- Introduction -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="module-intro">Introduction:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="module-intro"
                  id="module-intro"
                  v-model="introduction"
                  class="mx-auto w-100"
                  size="sm"
                ></b-form-input>
              </b-col>
            </b-form-row>

            <!-- Solutions -->
            <b-form-row class="mb-2">
              <b-col lg="5">
                <label for="module-solutions">Solutions:</label>
              </b-col>
              <b-col lg="7">
                <prism-editor
                  id="module-solutions"
                  class="solutions-editor"
                  v-model="solution"
                  :highlight="highlighter"
                  line-numbers
                ></prism-editor>
              </b-col>
            </b-form-row>

          </b-card>
        </b-overlay>

        <!-- Modal footer -->
        <template #modal-footer="{ close }">
          <b-button
            variant="primary"
            :disabled="name === ''"
            @click="saveModule(close)"
          >
            Save
          </b-button>
          <b-button
            variant="danger"
            @click="discardModule(close)"
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
        <p v-if="selectedModule">Are you sure you want to delete <b>{{ selectedModule.name }}</b></p>

        <!-- Modal content -->
        <template #modal-footer="{ close }">
          
          <b-button
            variant="danger"
            @click="confirmDeleteModule(close)"
          >
            Yes
          </b-button>
          <b-button
            @click="unconfirmDeleteModule(close)"
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
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

const MODULE_FIELDS = [
  'name',
  'categories',
  'description',
  'introduction',
  'solutions'
];

export default {
  name: 'ModuleManager',
  components: {
    PrismEditor
  },
  computed: {
  },
  data: function() {
    return {
      modules: null,
      selectedModule: null,
      categoryPool: null,
      editorHeaderDefault: 'Creating module',
      editorHeader: 'Creating module',
      editorCreate: true,
      editorBusy: false,

      name: '',
      categories: [],
      description: '',
      introduction: '',
      solution: '' // should be []
    };
  },
  mounted: async function() {
    try {
      // Make the initial requests
      const getModules = api.get('/module/all');
      const getCategories = api.get('/category/all');

      // Await the data
      this.modules = (await getModules).data;
      this.categoryPool = (await getCategories).data;

    } catch (err) {
      this.error({ message: `Error loading modules data: ${err.message}`, redirect: false });
    }
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
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
    async loadModuleData() {
      for (let field of MODULE_FIELDS) {
        if (field === 'categories') {
          const categoriesToLoad = [];
          for (let cat of this.selectedModule[field]) {
            categoriesToLoad.push(api.get(`/category/${cat}`));
          }
          this[field] = (await Promise.all(categoriesToLoad)).map(elem => elem.data);
        } else {
          this[field] = this.selectedModule[field];
        }
      }
    },
    clearModuleData() {
      for (let field of MODULE_FIELDS) {
        if (field === 'categories' || field === 'solutions') {
          this[field] = [];
        } else {
          this[field] = '';
        }
      }
      this.editorHeader = this.editorHeaderDefault;
      this.editorCreate = true;
    },
    createModule() {
      this.$refs['module-editor'].show();
    },
    editModule(module) {
      this.selectedModule = module;
      this.loadModuleData();
      this.editorHeader = `Editing module ${this.selectedModule.name}`;
      this.editorCreate = false;
      this.$refs['module-editor'].show();
    },
    async saveModule(close) {
      try {
        // Create the payload
        const payload = {};
        if (!this.editorCreate) {
          payload['id'] = this.selectedModule._id;
        }
        for (let field of MODULE_FIELDS) {
          payload[field] = this[field]; 
        }

        // Create or update the module
        await api.post(this.editorCreate ? '/module/create' : '/module/update', payload);

        // Reload all of the module data to refresh the list
        this.modules = (await api.get('/module/all')).data;
        
      } catch (err) {
        this.error({ message: `Error saving module data: ${err.message}`, redirect: false });

      } finally {
        // Then clear the modal fields and close it
        this.clearModuleData();
        close();
      }
    },
    discardModule(close) {
      // Clear the modal fields and close it
      this.clearModuleData();
      close();
    },
    async deleteModule() {
      try {
        // Create the payload
        const payload = { name: this.selectedModule.name };

        // Delete the module
        await api.post('/module/delete', payload);

        // Reload all of the module data to refresh the list
        this.modules = (await api.get('/module/all')).data;
      
      } catch (err) {
        this.error({ message: `Error deleting module: ${err.message}`, redirect: false });
      }
    },
    launchConfirmDelete(mod) {
      this.selectedModule = mod;
      this.$refs['confirm-delete'].show();
    },
    async confirmDeleteModule(close) {
      try {
        await this.deleteModule();
        // Reload all of the module data to refresh the list
        this.modules = (await api.get('/module/all')).data;
      
      } catch (err) {
        this.error({ message: `Error reloading module data: ${err.message}`, redirect: false });

      } finally {
        close();
      }
    },
    unconfirmDeleteModule(close) {
      close();
    }
  }
};
</script>

<style lang="scss" scoped>
  .solutions-editor {
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