<template>
  <v-navigation-drawer v-model="drawer" app clipped :mini-variant.sync="mini" permanent>
    <!-- <v-list-item class="px-2">
      <v-list-item-title>John Leider</v-list-item-title>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item> -->

    <v-list :flat="true" :dense="true">
      <template v-for="item in items">
        <!-- Item has no sub items -->
        <template v-if="item.items === undefined">
          <v-list-item-group :key="item.title">
            <v-list-item :to="item.link" nuxt active-class="dash-nav-active">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </template>
        <!-- item has sub items -->
        <template v-else>
          <v-list-group
            :group="item.group"
            :key="item.title"
            :prepend-icon="item.icon"
            v-if="item.roles === undefined || item.roles.includes(userRole)"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-for="subItem in item.items">
              <v-list-item
                :key="subItem.title"
                :to="subItem.link"
                v-if="subItem.roles === undefined || subItem.roles.includes(userRole)"
                nuxt
                active-class="dash-nav-active"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  middleware: ['me', 'check-profile'],
  computed: {
    ...mapGetters({
      userRole: 'user/getRole',
      errors: 'getErrors',
      //  drawerVis: 'dispNavDrawer',
      selectedProfile: 'user/getSelectedProfile',
      me: 'user/getMe'
    })
  },
  components: {},
  data: () => ({
    drawer: true,
    mini: false,
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        link: '/dashboard'
      },
      {
        icon: 'mdi-map-marker-distance',
        title: 'Projects',
        link: '/projects'
      },
      {
        icon: 'mdi-map-marker-distance',
        title: 'Capacity Planning',
        link: '/capacityplanning'
      },
      {
        icon: 'mdi-account-cog',
        title: 'Admin',
        roles: ['ADMIN', 'OWNER'],
        active: false,
        group: 'admin',
        items: [
          {
            title: 'Users',
            link: '/admin/users',
            active: false
          },
          {
            title: 'Projects',
            link: '/admin/projects',
            active: false
          },
          {
            title: 'Invitations',
            link: '/admin/invitations',
            active: false
          },
          {
            title: 'Settings',
            link: '/admin/settings',
            active: false
          }
        ]
      }
    ]
  }),
  created() {},
  mounted() {},
  methods: {}
};
</script>
