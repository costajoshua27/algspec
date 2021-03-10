<template>
  <div>
    <label for="settings-theme">Theme</label>
    <b-form-select
      id="settings-theme"
      v-model="theme"
      :options="themes"
    ></b-form-select>
    Theme: {{ user.settings.theme }}  
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
      return {
        value: t,
        text: t
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