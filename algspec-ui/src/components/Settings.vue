<template>
  <div>
    <label for="settings-theme">Theme</label>
    <b-form-select
      id="settings-theme"
      class="w-50"
      v-model="theme"
      :options="themes"
    ></b-form-select>
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