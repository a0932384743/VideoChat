<template lang="pug">
  .timer
    .matching-header-title.q-pt-sm
      .text-h6 {{ timerTitle }}
      .text-h6 {{ totalTime || (timerMinutesLeft - timerMinutesPassed) + 'm' }}
    .matching-header-timer
      q-linear-progress(
        size='6px'
        :value='progress'
      )
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component
export default class VideoChat extends Vue {
  @Prop({ default: '', type: String }) private totalTime!: string;

  @Prop({ default: '', type: String }) private timerTitle!: string;

  @Prop({ default: 0, type: Number }) private currentTime!: number;

  @Prop({ default: 0, type: Number }) private limitTime!: number;

  @Prop({
    default() {
      return {};
    },
  }) private routerLink: any;

  private progress = 1;

  private interval: any;

  private coefficient = 0.0020833; // NOTICE: ((time * 60) / 8 ) / 125 - one second for 1 minute

  private timerMinutesLeft = 0;

  private timerMinutesPassed = 0;

  mounted() {
    this.startTimer();
  }

  startTimer() {
    const coefficient = this.coefficient / this.limitTime;
    this.timerMinutesLeft = this.limitTime;
    if (this.currentTime) {
      this.timerMinutesLeft = Math.ceil(this.currentTime);
      this.progress = this.currentTime / this.limitTime;
    }

    let timerMillisecondsPassed = 0;
    this.interval = setInterval(() => {
      timerMillisecondsPassed += 125;
      const minutes = Math.floor(timerMillisecondsPassed / 60 / 1000);
      if (minutes !== this.timerMinutesPassed) {
        this.timerMinutesPassed = minutes;
      }
      if (this.progress > 0) {
        this.progress -= coefficient;
      } else {
        clearInterval(this.interval);
        this.$emit('timerEnd');
        if (this.routerLink.name) {
          this.$router.push({ name: this.routerLink.name, params: { roomId: this.routerLink.params } });
        }
      }
    }, 125);
  }

  @Watch('limitTime')

  onLimitTimeChanged() {
    clearInterval(this.interval);
    this.progress = 1;
    this.startTimer();
  }
}
</script>

<style lang="scss" scoped>
  .timer{
    width: 100%;
    .matching-header-title {
      display: flex;
      justify-content: space-between;
    }
    .matching-header-timer {
      margin: 1.5rem 0;
    }
  }
  ::v-deep {
    .q-linear-progress {
      color: $timer-color !important;
    }
  }
</style>
