<template lang="pug">
  q-page.row.items-center.justify-evenly(
    v-if="!LOADING"
  )
    .matching-wrapper.col-12
      .matching-header
      timer(
        totalTime="1m"
        :timerTitle="'Matching'"
        :limitTime=".15"
        :routerLink="{ name: 'VideoChatTable', params: user.roomId  }"
      )
      .matching-body
        .text-white.q-pa-md.bg-grey-9(
          v-if="!$store.state.userModule.isPremium"
        ) Support us as a premium member for $5 / month.
        q-img.matching-body-img(
          :src="randomImage"
          spinner-color="white"
        )
      .matching-footer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { firebaseDb } from 'boot/firebase';
import Timer from 'components/Timer.vue';

@Component({
  components: { Timer },
})

export default class Matching extends Vue {
  private LOADING = true;

  private user = '';

  private randomImage = `https://placeimg.com/500/300/nature?t=${Math.random()}`;

  mounted() {
    if (
      !this.$store.getters['authModule/isAuth']
      || (this.$store.getters['authModule/isAuth'] && this.$store.getters['authModule/isGuest'])
    ) {
      this.$router.push({ name: 'StartMatching' });
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'Access denied...please sign in' });
    }
    firebaseDb.collection('users')
      .doc(this.$store.state.userModule.uid)
      .get()
      .then((user: any) => {
        this.LOADING = false;
        this.user = user.data();
      });
  }
}
</script>

<style lang="scss" scoped>
  .matching-wrapper{
    height: 100vh;
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 1rem;
  .matching-header{
    width: 100%;
    .matching-header-title {
      display: flex;
      justify-content: space-between;
    }
    .matching-header-timer {
      margin: 1.5rem 0;
    }
  }
  .matching-body{
    width: 100%;
    .matching-body-img {
      width: 100%;
      height: 400px;
    }
  }
}
</style>
