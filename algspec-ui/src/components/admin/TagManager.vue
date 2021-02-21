<template>
  <div>
    <b-container>
      <b-card>
        <!-- Header of the outer card -->
        <template #header>
          <h6>Tag Manager</h6>
        </template>
        
        <!-- The rest of the content of the outer card -->
        <b-row align-h="center" class="mb-3">
          <b-button @click="createTag()">Create a tag</b-button>
        </b-row>
        <b-row align-h="center">
          <b-card-group deck class="mx-4 mt-2 mb-4">
            <b-card :key="tag.name" v-for="tag in tags">
              <b-row>
                <b-col cols="12">
                  <h6>{{ tag.name }}</h6>
                </b-col>
                <b-col cols="12">
                  <b-button @click="editTag(tag)">Edit</b-button>
                </b-col>
                <b-col>
                  <b-button variant="danger" @click="launchConfirmDelete(tag)">Delete</b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-row>
      </b-card>

      <!-- Popup modal for editing tags -->
      <b-modal
        id="tag-editor"
        ref="tag-editor"
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
                <label for="tag-name">Name:</label>
              </b-col>
              <b-col lg="7">
                <b-form-input
                  name="tag-name"
                  id="tag-name"
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
            @click="saveTag(close)"
          >
            Save
          </b-button>
          <b-button
            variant="danger"
            @click="discardTag(close)"
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
        <p v-if="selectedTag">Are you sure you want to delete <b>{{ selectedTag.name }}</b></p>

        <!-- Modal content -->
        <template #modal-footer="{ close }">
          
          <b-button
            variant="danger"
            @click="confirmDeleteTag(close)"
          >
            Yes
          </b-button>
          <b-button
            @click="unconfirmDeleteTag(close)"
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

const TAG_FIELDS = [
  'name',
];

export default {
  name: 'TagManager',
  data: function() {
    return {
      tags: null,
      selectedTag: null,
      editorHeaderDefault: 'Creating tag',
      editorHeader: 'Creating tag',
      editorCreate: true,
      editorBusy: false,

      name: '',
    };
  },
  mounted: async function() {
    try {
      this.tags = (await api.get('/tag/all')).data;
      console.log('setting tags...', this.tags);
    } catch (error) {
      console.log('error when mounting component: ', error);
    }
  },
  methods: {
    loadTagData() {
      for (let field of TAG_FIELDS) {
        this[field] = this.selectedTag[field];
      }
    },
    clearTagData() {
      for (let field of TAG_FIELDS) {
        this[field] = '';
      }
      this.editorHeader = this.editorHeaderDefault;
      this.editorCreate = true;
    },
    createTag() {
      this.$refs['tag-editor'].show();
    },
    editTag(tag) {
      this.selectedTag = tag;
      this.loadTagData();
      this.editorHeader = `Editing tag ${this.selectedTag.name}`;
      this.editorCreate = false;
      this.$refs['tag-editor'].show();
    },
    async saveTag(close) {
      try {
        // Create the payload
        const payload = {};
        if (!this.editorCreate) {
          payload['id'] = this.selectedTag._id;
        }
        for (let field of TAG_FIELDS) {
          payload[field] = this[field];
        }

        // Create or update the tag
        await api.post(this.editorCreate ? '/tag/create' : '/tag/update', payload);
        console.log(this.editorCreate ? 
                      `created tag ${this.name}` :
                      `updated tag ${this.selectedTag.name}`);

        // Reload all of the tag data to refresh the list
        this.tags = (await api.get('/tag/all')).data;
        console.log('setting tags...', this.tags);
        
      } catch (error) {
        console.log('error when saving tag data: ', error);

      } finally {
        // Then clear the modal fields and close it
        this.clearTagData();
        close();
      }
    },
    discardTag(close) {
      // Clear the modal fields and close it
      this.clearTagData();
      close();
    },
    async deleteTag() {
      try {
        // Create the payload
        const payload = { name: this.selectedTag.name };

        // Delete the tag
        await api.post('/tag/delete', payload);

        // Reload all of the tag data to refresh the list
        this.tags = (await api.get('/tag/all')).data;
        console.log('setting tags...', this.tags);

      } catch (error) {
        console.log('error when saving tag data: ', error);
      }
    },
    launchConfirmDelete(tag) {
      this.selectedTag = tag;
      this.$refs['confirm-delete'].show();
    },
    async confirmDeleteTag(close) {
      try {
        await this.deleteTag();
        // Reload all of the tag data to refresh the list
        this.tags = (await api.get('/tag/all')).data;
        console.log('setting tags...', this.tags);

      } catch(error) {
        console.log('error when deleting tag data: ', error);

      } finally {
        close();
      }
    },
    unconfirmDeleteTag(close) {
      close();
    }
    
  }
};
</script>

<style lang="scss" scoped>

</style>