<template>
  <div>
    <b-container>
      <b-card>
        <!-- Header of the outer card -->
        <template #header>
          <h6>Category Manager</h6>
        </template>
        
        <!-- The rest of the content of the outer card -->
        <b-row align-h="center" class="mb-3">
          <b-button @click="createCategory()">Create a category</b-button>
        </b-row>
        <b-row align-h="center">
            <b-col>
              <b-card :key="category.name" v-for="category in categories">
                <h6>Name: {{ category.name }}</h6>
                <b-button class="mr-3" @click="editCategory(category)">Edit</b-button>
                <b-button variant="danger" @click="launchConfirmDelete(category)">Delete</b-button>
              </b-card>
            </b-col>
        </b-row>
      </b-card>

      <!-- Popup modal for editing categories -->
      <b-modal
        id="category-editor"
        ref="category-editor"
        size="lg"
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
            <b-form-row>
              <b-col lg="5">
                <label for="category-name">Name:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="category-name"
                  id="category-name"
                  v-model="name"
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
            @click="saveCategory(close)"
          >
            Save
          </b-button>
          <b-button
            variant="danger"
            @click="discardCategory(close)"
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
        <p v-if="selectedCategory">Are you sure you want to delete <b>{{ selectedCategory.name }}</b></p>

        <!-- Modal content -->
        <template #modal-footer="{ close }">
          
          <b-button
            variant="danger"
            @click="confirmDeleteCategory(close)"
          >
            Yes
          </b-button>
          <b-button
            @click="unconfirmDeleteCategory(close)"
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

const CATEGORY_FIELDS = [
  'name',
];

export default {
  name: 'CategoryManager',
  data: function() {
    return {
      categories: null,
      selectedCategory: null,
      editorHeaderDefault: 'Creating category',
      editorHeader: 'Creating category',
      editorCreate: true,
      editorBusy: false,

      name: '',
    };
  },
  mounted: async function() {
    try {
      this.categories = (await api.get('/category/all')).data;
    } catch (err) {
      this.error({ message: `Error loading categories data: ${err.message}`, redirect: false });
    }
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
    loadCategoryData() {
      for (let field of CATEGORY_FIELDS) {
        this[field] = this.selectedCategory[field];
      }
    },
    clearCategoryData() {
      for (let field of CATEGORY_FIELDS) {
        this[field] = '';
      }
      this.editorHeader = this.editorHeaderDefault;
      this.editorCreate = true;
    },
    createCategory() {
      this.$refs['category-editor'].show();
    },
    editCategory(category) {
      this.selectedCategory = category;
      this.loadCategoryData();
      this.editorHeader = `Editing category ${this.selectedCategory.name}`;
      this.editorCreate = false;
      this.$refs['category-editor'].show();
    },
    async saveCategory(close) {
      try {
        // Create the payload
        const payload = {};
        if (!this.editorCreate) {
          payload['id'] = this.selectedCategory._id;
        }
        for (let field of CATEGORY_FIELDS) {
          payload[field] = this[field];
        }

        // Create or update the category
        await api.post(this.editorCreate ? '/category/create' : '/category/update', payload);

        // Reload all of the category data to refresh the list
        this.categories = (await api.get('/category/all')).data;
        
      } catch (err) {
        this.error({ message: `Error saving category data: ${err.message}`, redirect: false });

      } finally {
        // Then clear the modal fields and close it
        this.clearCategoryData();
        close();
      }
    },
    discardCategory(close) {
      // Clear the modal fields and close it
      this.clearCategoryData();
      close();
    },
    async deleteCategory() {
      try {
        // Create the payload
        const payload = { name: this.selectedCategory.name };

        // Delete the category
        await api.post('/category/delete', payload);

        // Reload all of the category data to refresh the list
        this.categories = (await api.get('/category/all')).data;

      } catch (err) {
        this.error({ message: `Error deleting category data: ${err.message}`, redirect: false });
      }
    },
    launchConfirmDelete(category) {
      this.selectedCategory = category;
      this.$refs['confirm-delete'].show();
    },
    async confirmDeleteCategory(close) {
      try {
        await this.deleteCategory();
        // Reload all of the category data to refresh the list
        this.categories = (await api.get('/category/all')).data;

      } catch(err) {
        this.error({ message: `Error reloading category data: ${err.message}`, redirect: false });

      } finally {
        close();
      }
    },
    unconfirmDeleteCategory(close) {
      close();
    }
    
  }
};
</script>

<style lang="scss" scoped>

</style>