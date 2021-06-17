<template lang="pug">
  q-page.row.items-center.justify-evenly
    .rating-wrapper
      .rating-header
        q-icon(
          v-for="(item, index) in smiles"
          :key="index"
          :name="item.icon"
          :class="{'active': item.active}"
          @click="setActive(item)"
        )
      .rating-body
        q-input(
          outlined
          label="How was your experience?"
          v-model="notification"
        )
          template(
            v-slot:append
          )
            q-icon(
              name="close"
              @click="notification = ''"
              class="cursor-pointer"
            )
      .rating-footer
        q-btn.app-button(
          no-caps
          dense
          label="Submit"
          color="grey-9"
          @click="setRating"
        )
        q-btn.app-button(
          outline
          no-caps
          dense
          label="Skip"
          @click="$router.push({ name: 'StartMatching' })"
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PageRating extends Vue {
  private smiles = [
    { icon: 'sentiment_very_dissatisfied', rating: 1, active: false },
    { icon: 'sentiment_dissatisfied', rating: 2, active: false },
    { icon: 'sentiment_satisfied', rating: 3, active: false },
    { icon: 'sentiment_satisfied_alt', rating: 4, active: false },
    { icon: 'sentiment_very_satisfied', rating: 5, active: false },
  ];

  private notification = '';

  mounted() {
    if (!this.$store.getters['authModule/isAuth']) {
      this.$router.push({ name: 'SignIn' });
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'Access denied...please sign in' });
    }
  }

  setRating() {
    const rating = this.smiles.find((item) => item.active);
    // TODO get real room ID
    const room = 'i02jn38yfh-8sdufgnasdicv';
    if (rating && room) {
      const ratingObj = {
        notification: this.notification,
        rating: rating.rating,
        roomId: room,
        userId: this.$store.state.userModule.uid,
        createdAt: Date.now(),
      };
      this.$store.dispatch('userModule/setRating', ratingObj).then(() => {
        this.$q.notify({ icon: 'done', color: 'positive', message: 'Thank you for your feedback' });
        this.$router.push({ name: 'StartMatching' });
      }).catch((error) => {
        this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
      });
    } else {
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'Please select rating' });
    }
  }

  setActive(item: any) {
    this.smiles.forEach((smile) => {
      smile.active = smile.rating === item.rating;
    });
  }
}
</script>
<style lang="scss" scoped>
  .active {
    color: $grey-8 !important;
  }
  .rating-header {
    color: $grey-6;
    font-size: 4rem;
    display: flex;
    margin-bottom: 2rem;
    i {
     cursor: pointer;
     margin: 0 10px;
     &:hover {
       color: $grey-8;
     }
    }
  }
  .rating-body {
    margin-bottom: 1rem;
  }
  .rating-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    button {
      width: 60%;
      margin: .5rem 0;
    }
  }
</style>
