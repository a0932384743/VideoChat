<template lang="pug">
  .profile-layer.full-height
    .profile-body
      .profile-data
        .flex
          label.full-width.text-body1.q-mb-sm Profile Picture
          .user-avatar
            q-icon.default-icon.text-grey-8(
              name="account_circle"
              size="4.5rem"
              v-if="$store.state.userModule.photoURL === ''"
            )
            q-avatar(
              size="4.5rem"
            )
              q-img.user-avatar-img(
                :src="$store.state.userModule.photoURL"
              )
            label.q-ml-xl
              q-btn.q-px-md.select-img.cursor-pointer.overflow-hidden(
                no-caps
                outline
                label="Select Image"
                size=".9rem"
              )
                input.cursor-pointer(
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="filesChange($event)"
                )
        .row
          q-input.full-width.q-my-lg(
            outlined
            dense
            type="text"
            label="Name"
            v-model="user.displayName"
          )
          q-input.full-width.q-mb-lg(
            outlined
            dense
            type="text"
            label="What is your title?"
            v-model="userDetails.title"
          )
          q-input.full-width.q-mb-lg(
            outlined
            dense
            type="text"
            label="What is your goal?"
            v-model="userDetails.goal"
          )
          q-input.full-width.q-mb-lg(
            outlined
            dense
            type="text"
            label="What are your interests?"
            v-model="userDetails.interests"
          )
          q-input.full-width(
            outlined
            dense
            type="text"
            label="Which communities are you in?"
            v-model="userDetails.communities"
          )
    .profile-footer
      hr.hr-border-grey.full-width.q-my-lg
      .row.full-width.justify-end.flex
        q-btn.q-px-md(
          label="Cancel"
          no-caps
          outline
          size=".9rem"
          @click="hideForm"
        )
        q-btn.q-px-md.q-ml-md(
          label="Save"
          no-caps
          color="grey-9"
          size=".9rem"
          @click="onSubmit"
        )
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import { UserProfileInterface } from 'src/types/store/UserInterface';

@Component
export default class AccountProfile extends Vue {
  @PropSync('accountDialog') syncedAccountDialog: any

  private user = {
    displayName: '',
  }

  private userDetails: UserProfileInterface = {
    title: '',
    goal: '',
    interests: '',
    communities: '',
  }

  mounted() {
    const { displayName, profile } = this.$store.state.userModule;
    this.user.displayName = displayName;
    this.userDetails = { ...profile };
  }

  hideForm() {
    this.syncedAccountDialog();
  }

  filesChange(event: any) {
    this.$q.loading.show();
    const payload = {
      uid: this.$store.state.userModule.uid,
      file: event.target.files[0],
    };
    this.$store.dispatch('userModule/uploadAvatar', payload)
      .then(() => {
        this.$q.notify({ icon: 'done', color: 'positive', message: 'Image upload successful' });
        this.$q.loading.hide();
      })
      .catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
        this.$q.loading.hide();
      });
  }

  onSubmit() {
    this.$q.loading.show();
    this.$store.dispatch('userModule/updateProfile', { user: this.user, profile: this.userDetails })
      .then(() => {
        this.$q.notify({ icon: 'done', color: 'positive', message: 'Update successful' });
      })
      .catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
      })
      .finally(() => {
        this.$q.loading.hide();
        this.hideForm();
      });
  }
}
</script>

<style lang="scss" scoped>
.profile-layer {
  .profile-body {
    height: calc(100% - 90px);
  }

  .q-btn.select-img {
    position: relative;
    input[type="file"] {
      width: 100%;
      height: 100%;
      padding-left: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .q-avatar {
    width: 60px;
    height: 60px;
    .user-avatar-img {
      height: 60px;

      &.user-avatar-img-no-img {
        margin-top: -2px;
      }
    }
  }
  ::v-deep {
    .user-avatar-img {
      height: 60px;
      width: 60px;
    }
  }
}
</style>
