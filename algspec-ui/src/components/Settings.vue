<template>
  <div>
    <b-card
      class="mt-5 px-1 py-3 mx-auto w-75"
      rounded
    >
      <template #header>
        <h5>Settings</h5>
      </template>
      <b-row>
        <b-col>
          <label for="settings-theme">Theme</label>
        </b-col>
        <b-col>
          <b-form-select
            id="settings-theme"
            class="w-100"
            v-model="theme"
            :options="themes"
          ></b-form-select>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Settings',
  data() {
    return {
      themes: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    // Need to define get and set, since we are using
    // theme for a v-model...rather than using mapState
    theme: {
      get() { return this.$store.state.theme; },
      set(value) { this.setTheme({ theme: value, vm: this }); }
    }
  },
  mounted() {
    this.themes = this.$themes.allThemes.map(t => {
      const text = t[0].toUpperCase() + t.substring(1);
      return {
        value: t,
        text
      };
    });
  },
  methods: {
    ...mapActions({
      setTheme: 'setTheme'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>