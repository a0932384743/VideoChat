<template lang="pug">
  .account-wrapper
    .row.full-width.full-height.padding80
      transition(
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="800"
      )
        .account-layer.col-12
          .row.full-width.q-pa-xl
            .title.account.text-h5.flex.items-center.justify-between.cursor-pointer(
              @click="syncedAccountDialog()"
            )
              q-icon(
                color="grey"
                name="chevron_left"
              )
              strong.q-ml-md Account
          .hr-border-grey.full-width
          .row.full-width.account-body
            .col-3.menu
              .q-pa-xl.text-h6
                q-list
                  q-item.cursor-pointer.q-mb-md(
                    :class="{'text-grey': !menu.profile}"
                  )
                    q-item-section(
                      @click="onSelectedMenu('profile')"
                    ) Profile
                  q-item.cursor-pointer.q-mb-md(
                    :class="{'text-grey': !menu.credentials}"
                  )
                    q-item-section(
                      @click="onSelectedMenu('credentials')"
                    ) Credentials
                  q-item.cursor-pointer.q-mb-md.text-grey
                    q-item-section(
                      @click="logOutUser"
                    ) Logout
            .col-9
              .q-pa-xl.full-height(
                v-if="isLoad && $store.state.authModule.authenticated"
              )
                account-profile(
                  v-if="menu.profile"
                  :accountDialog="accountDialog"
                )
                account-credentials(
                  v-if="menu.credentials"
                  :accountDialog="accountDialog"
                )
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import AccountCredentials from 'components/AccountCredentials.vue';
import AccountProfile from 'components/AccountProfile.vue';

@Component({
  components: {
    AccountCredentials,
    AccountProfile,
  },
})
export default class MyLogin extends Vue {
  @PropSync('accountDialog') syncedAccountDialog: any

  private menu: { [key: string]: boolean } = {
    profile: true,
    credentials: false,
  }

  private isLoad = false;

  mounted() {
    this.$store.dispatch('userModule/loadUserProfile')
      .finally(() => {
        this.isLoad = true;
      });
  }

  onSelectedMenu(item: string) {
    this.resetMenu();
    this.menu[item] = true;
  }

  resetMenu() {
    this.menu.profile = false;
    this.menu.credentials = false;
  }

  logOutUser() {
    this.$q.loading.show();
    this.$store.dispatch('authModule/logout').then(() => {
      this.$store.dispatch('userModule/unsetUser');
      this.$q.loading.hide();
      this.$q.notify({ icon: 'done', color: 'positive', message: 'You are logged out' });
      this.$router.push({ name: 'SignIn' });
    }).catch((error) => {
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
      this.$q.loading.hide();
    });
  }
}
</script>

<style lang="scss" scoped>
  .menu {
    border-right: 1px solid $border-gray;
  }

  .padding80 {
    padding: 0 60px;
  }

  ::v-deep {
    .q-item:hover {
      color: black !important;
    }
  }

  .account-wrapper {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .account-layer {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      //padding: 8rem 0;
      box-shadow: -1px 0 3px $grey-6;

      .account-body {
        height: calc(100% - 128px);
      }
    }
  }
</style>
