<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Capacity Planning
        </h1>
        <h3 class="font-weight-light pl-4 text-center">
          {{ selectedDate != null ? this.$dayjs(this.selectedDate).format('MMM DD, YYYY') : '' }}
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3"> </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" md="3">
        <v-date-picker
          is-expanded
          @input="changeDate"
          v-model="selectedDate"
          :attributes="attributes"
          @update:to-page="changePage"
          show-caps
        />
      </v-col>
      <v-col cols="12" md="9">
        <v-card class="pa-3 justify-center">
          <v-row v-if="capEntriesLoading">
            <v-col cols="6">
              <v-skeleton-loader type="list-item@3"></v-skeleton-loader>
            </v-col>
            <v-col cols="2">
              <v-skeleton-loader type="list-item@3"></v-skeleton-loader>
            </v-col>
            <v-col cols="1">
              <v-skeleton-loader type="list-item@3"></v-skeleton-loader>
            </v-col>
          </v-row>
          <template v-if="!capEntriesLoading">
            <v-row v-for="(capPlan, index) in capacityPlanEntries" v-bind:key="capPlan.id">
              <v-col cols="6">
                <v-autocomplete
                  dense
                  clearable
                  v-model="capPlan.projectID"
                  item-text="name"
                  item-value="id"
                  :items="projects"
                  label="Project"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-select dense clearable v-model="capPlan.workPercent" :items="capValues" label="%"></v-select>
              </v-col>
              <v-col cols="1">
                <v-btn icon v-on:click="deleteEntry(capPlan.id)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn v-if="canAddRow()" @click="addRow">+</v-btn>
                <v-btn @click="sendCapPlan" class="ma-1">Save</v-btn>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  layout: 'dashboard',
  computed: mapGetters({
    projects: 'projects/getProjects',
    me: 'user/getMe',
    capacityPlans: 'capacityplanning/getCapacityPlanEntries',
    monthlySummary: 'capacityplanning/getMonthlySummary'
  }),
  data() {
    return {
      errors: [],
      capEntriesLoading: false,
      capacityPlanEntries: [],
      capacityPlanTemplate: {
        id: undefined,
        projectID: undefined,
        workPercent: undefined
      },
      selectedMonth: undefined,
      selectedDate: undefined,
      capValues: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      attributes: []
    };
  },
  created() {},
  mounted() {
    this.initValues();
  },
  methods: {
    addRow() {
      this.capacityPlanEntries.push(JSON.parse(JSON.stringify(this.capacityPlanTemplate)));
    },
    canAddRow() {
      if (this.capacityPlanEntries.length > 19) {
        return false;
      }
      return true;
    },
    async deleteEntry(capEntryID) {
      const success = await this.$store.dispatch('capacityplanning/deleteEntry', capEntryID);
      if (success) {
        for (let i = 0; i < this.capacityPlanEntries.length; i++) {
          if (this.capacityPlanEntries[i].id === capEntryID) {
            this.capacityPlanEntries.splice(i, 1);
          }
        }
      }
    },
    changeDate() {
      this.$nextTick(() => {
        if (this.selectedDate != null) {
          const month = this.selectedDate.getMonth();
          if (month != this.selectedMonth) {
            this.selectedMonth = this.selectedDate.getMonth();
          }
          this.getCapEntryDay();
        } else {
          this.emptyCapEntryDay();
        }
      });
    },
    async getMonthlyView(monthYearObj = null) {
      let firstDateOfMonth = undefined;
      let lastDateOfMonth = undefined;

      if (monthYearObj != null) {
        const viewedMonth = new Date(monthYearObj.year, monthYearObj.month, null);
        firstDateOfMonth = this.$dayjs(viewedMonth).startOf('month');
        lastDateOfMonth = this.$dayjs(viewedMonth).endOf('month');
      } else {
        firstDateOfMonth = this.$dayjs(this.selectedDate).startOf('month');
        lastDateOfMonth = this.$dayjs(this.selectedDate).endOf('month');
      }

      const reqData = {
        resourceID: this.me.id,
        startDate: this.$dayjs(firstDateOfMonth).format('YYYY-MM-DD'),
        endDate: this.$dayjs(lastDateOfMonth).format('YYYY-MM-DD')
      };
      await this.$store.dispatch('capacityplanning/listResourceSummary', reqData);
      const completeDays = [];
      const incompleteDays = [];
      if (this.monthlySummary) {
        for (let i = 0; i < this.monthlySummary.length; i++) {
          const dayOfWeek = this.$dayjs(Date.parse(this.monthlySummary[i].workDate)).day();
          const tempDate = new Date(Date.parse(this.monthlySummary[i].workDate));
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            //skipping weekends
            continue;
          }
          if (this.monthlySummary[i].sumWorkPercent === 100) {
            completeDays.push(tempDate);
          } else {
            incompleteDays.push(tempDate);
          }
        }
      }
      this.attributes = [
        {
          bar: 'red',
          dates: incompleteDays
        },
        {
          bar: 'green',
          dates: completeDays
        }
      ];
      console.log(
        'completeDays.length:',
        completeDays.length,
        'incompleteDays.length:',
        incompleteDays.length,
        'startDate:',
        reqData.startDate,
        'endDate:',
        reqData.endDate
      );
    },
    emptyCapEntryDay() {
      this.capacityPlanEntries = [];
    },
    async getCapEntryDay() {
      this.capEntriesLoading = true;
      const dateReq = this.$dayjs(this.selectedDate)
        .utc()
        .format('YYYY-MM-DD');
      const reqData = {
        resourceID: this.me.id,
        startDate: dateReq,
        endDate: dateReq
      };

      this.capacityPlanEntries = await this.$store.dispatch('capacityplanning/listResourceDate', reqData);
      this.capacityPlanEntries.push(JSON.parse(JSON.stringify(this.capacityPlanTemplate)));
      this.capEntriesLoading = false;
    },
    changePage(page) {
      console.log('Change Page ', page);
      this.getMonthlyView(page);
    },
    async sendCapPlan() {
      const $vm = this;

      let capPlansToSend = [];
      $vm.capacityPlanEntries.forEach(capPlan => {
        if (capPlan.projectID && capPlan.workPercent) {
          capPlansToSend.push(capPlan);
        }
      });
      if (capPlansToSend.length === 0) {
        return false;
      }

      const req = {
        resourceID: this.me.id,
        workDate: this.selectedDate,
        capacityPlanEntries: capPlansToSend
      };

      const created = await this.$store.dispatch('capacityplanning/createCapacityPlan', req);
      console.log('created', created);
    },
    initValues() {
      const date = new Date();
      this.$nextTick(() => {
        this.selectedDate = date;
        this.selectedMonth = this.$dayjs(date).month();
        this.getCapEntryDay();
        this.$store.dispatch('projects/listProjects', ['open_for_time_entry=true']);
      });
    }
  }
};
</script>

<style scoped>
h1,
h2,
h3 {
  display: inline;
}
</style>
