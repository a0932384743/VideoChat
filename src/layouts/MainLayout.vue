<template lang="pug">
  q-layout.main-layout(
    view="lhr LpR lFr"
  )
    q-drawer(
      show-if-above
      :width="width"
      bordered
      side="left"
      content-class="left-bar"
    )
      .left-bar-wrapper
        .left-logo(
          @click="goTO('Welcome')"
        )
          q-img.full-width(
            :src="require('src/assets/logo.svg')"
          )
        .btn-left-menu.relative-position.container.flex.flex-center.text-white(
          v-ripple
          @click="goTO('StartMatching')"
        )
          q-icon(
            name="cast_connected"
            size="2.2rem"
          )
          small Table
    q-drawer(
      v-model="right"
      show-if-above
      side="right"
      :width="width"
      bordered
      content-class="bg-grey-3"
    )
      .right-menu-wrapper
        .profile-wrapper(
          v-if="!$store.getters['authModule/isGuest']"
        )
          .profile-left-bar(
            :class="{ invisible: !accountDialog }"
          )
          q-icon.profile(
            name="account_circle"
            @click="onClickAccountDialog"
            size="2.2rem"
          )
          .empty
        .profile-wrapper(
          v-if="$route.name === 'VideoChatTable'"
        )
          .profile-left-bar(
            :class="{ invisible: !inviteDialog }"
          )
          q-icon.profile(
            name="group_add"
            @click="onClickInviteDialog"
          )
          .empty
    transition(
      name="slide-fade"
    )
      account.my-login(
        v-if="accountDialog"
        :accountDialog="closeDialog"
      )
    q-page-container
      transition(
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        appear
        :duration="800"
      )
        router-view(
          :inviteDialog="inviteDialog"
          @close-invite-dialog="inviteDialog = !inviteDialog"
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Account from 'pages/account/Account.vue';

@Component({
  components: {
    Account,
  },
})
export default class MainLayout extends Vue {
  private right = false;

  private width = 60;

  private accountDialog = false;

  private inviteDialog = false;

  mounted() {
    this.accountDialog = !!this.$route.params.isOpenLogin;
  }

  goHome() {
    this.$router.push('/');
  }

  closeDialog() {
    this.accountDialog = false;
    this.inviteDialog = false;
  }

  goTO(route: string) {
    if (this.$route.name === route) {
      return;
    }
    this.closeDialog();
    this.$router.push({
      name: route,
    });
  }

  onClickAccountDialog() {
    const safeAccountDialog = this.accountDialog;

    this.closeDialog();
    this.accountDialog = !safeAccountDialog;
  }

  onClickInviteDialog() {
    this.closeDialog();
    this.inviteDialog = true;
  }
}
</script>
<style lang="scss">
.left-bar {
  background-color: $timer-color;
}
.right-bar {
  background-color: $brand-color-light;
}
.right-bar-full {
  background-color: $brand-color-light;
}
.right-menu-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $grey-8;
  font-size: 2.5rem;
  .open-right-btn {
    margin: 1rem 0;
    cursor: pointer;
  }
  .profile-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .profile-left-bar {
      width: 0;
      height: 50px;
      background-color: $grey-7;
    }
    .profile {
      padding: 1rem 0;
      margin: 1rem 0;
      cursor: pointer;
    }
  }
}
.left-bar-wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  small {
    padding-top: 5px;
    font-size: 12px;
  }
  .left-logo {
    cursor: pointer;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-left-menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    padding: 10px 0;
    margin-bottom: 5px;
    font-size: 3rem;
    color: #ffffff;
    &:hover {
      background-color: lighten($brand-color, 15%);
    }
  }
}

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(40px);
  opacity: 0;
}
</style>
