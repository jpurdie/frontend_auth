<template>
  <v-card class="mx-auto" tile>
    <v-navigation-drawer permanent width="">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Settings
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" @click="doNav(item.path)">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'dashboard-layout',
  propse: {
    pagePath: String
  },
  components: {},
  data() {
    return {
      displayPanel: '',
      selectedItem: 0,
      items: [
        { text: 'Personal', icon: 'mdi-account', path: '/settings/personal' },
        { text: 'Security', icon: 'mdi-lock', path: '/settings/security' }
      ]
    };
  },
  computed: mapGetters({
    me: 'user/getMe'
  }),
  watch: {},
  mounted() {
    this.init();
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].path === this.$route.path) {
        this.selectedItem = i;
        break;
      }
    }
  },
  methods: {
    changePanel(panelName) {
      this.displayPanel = panelName;
    },
    init() {
      this.$store.dispatch('updateNavDrawerDisp', false);
    },
    doNav(path) {
      this.$router.push(path);
    }
  }
};
</script>
