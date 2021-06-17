<template lang="pug">
  q-dialog(
    v-model="model"
    @hide="$emit('close-user-details-dialog')"
  )
    q-card.dialog-content.q-pa-md
      q-card-section.row.items-center.q-pb-sm.header
        q-avatar(
          size="3.5rem"
        )
          q-img.user-avatar-img(
            :class="{'user-avatar-img-no-img': !user.photoURL}"
            :src="user.photoURL || require('../assets/viedo-chat/avatar/guest.png')"
          )
        .q-message-name.text-h6.q-ml-lg {{ user.displayName || 'Guest' }}
        q-space
        q-btn.button-close(
          flat
          round
          dense
          v-close-popup
          size="1.3rem"
        ) X
      q-card-section.no-padding.details(
        style="max-height: 50vh" class="scroll"
      )
        template(
          v-if="hasDataProfile"
        )
          q-card(
            flat
            v-if="profile.title"
          )
            q-card-section.q-pb-xs
              .text-h6 What is your title?
            q-card-section.q-pt-none.app-text-gray {{ profile.title }}

          q-card(
            flat
            v-if="profile.goal"
          )
            q-card-section.q-pb-xs
              .text-h6 What is your goal?
            q-card-section.q-pt-none.app-text-gray {{ profile.goal }}

          q-card(
            flat
            v-if="profile.interests"
          )
            q-card-section.q-pb-xs
              .text-h6 What are your interests?
            q-card-section.q-pt-none.app-text-gray {{ profile.interests }}

          q-card(
            flat
            v-if="profile.communities"
          )
            q-card-section.q-pb-xs
              .text-h6 Which communities are you in?
            q-card-section.q-pt-none.app-text-gray {{ profile.communities }}

        q-card.q-mt-md(
          flat
          v-else
        )
          q-card-section.text-center The user has not filled in the data
</template>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';
import { UserInterface, UserProfileInterface } from 'src/types/store/UserInterface';

@Component
export default class UserDetails extends Vue {
  @Prop() private user!: UserInterface;

  @Prop() private userUid!: string;

  private model = false;

  private profile: UserProfileInterface = {};

  mounted() {
    this.$store.dispatch('userModule/loadUserProfile', this.userUid)
      .then((profile: UserProfileInterface) => {
        this.profile = profile;
      })
      .finally(() => {
        this.model = true;
      });
  }

  get hasDataProfile() {
    return !!this.profile;
  }
}
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 700px;
  max-width: 80vw;
}

.button-close {
  margin-top: -30px;
  margin-right: -20px;
  &:hover {
    ::v-deep {
      .q-focus-helper {
        background: none !important;
      }
    }
  }
}

.q-avatar {
  border: 4px solid darkseagreen;
  box-sizing: content-box;
  height: 45px;
  width: 45px;
  .user-avatar-img {
    height: 45px;

    &.user-avatar-img-no-img {
      margin-top: -2px;
    }
  }
}
</style>
