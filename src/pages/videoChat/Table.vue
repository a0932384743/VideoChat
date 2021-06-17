<template lang="pug">
  q-page.row(
    v-if="hasRoom"
  )
    .page.full-width
      .full-width.full-height
        .timer.row.justify-center.full-width
          .col-xs-6.col-lg-4.text-center
            .matching-header-timer
              timer(
                :totalTime="timer.totalTime"
                :timerTitle="timer.name"
                :limitTime="timer.limitTime"
                :currentTime="timer.currentTime"
                @timerEnd="timerEnd"
              )

        hr.no-margin.hr-border-grey
        .content.row.justify-start.full-width
          .col-md-7.col-xs-12.self-end.full-height
            .flex.justify-around.row.border-bottom.title-block
              .text-h7.q-my-md.q-ml-xl.text-left.col-12 Peers
            .container-video.q-pa-md(
              :class="`size-${videoListCount}`"
            )
              video-chat(
                ref="videoChat"
                width="100%"
                :uid="$store.state.userModule.uid"
                :roomId="roomId"
                :users="roomUsers"
                @joined-room="onJoinedRoom"
                @left-room="onJoinedRoom"
                @video-list-count="onVideoListCount"
              )
            .row.justify-center.full-width.q-pt-sm
              .col-12.text-center
                q-btn.relative-position.q-mr-lg.btn-custom-size(
                  round
                  size=".9rem"
                  no-caps
                  :icon="$refs.videoChat && $refs.videoChat.isToggleVideo ? 'videocam' : 'videocam_off'"
                  @click="$refs.videoChat.toggleVideo()"
                )
                q-btn.relative-position.q-ml-lg.btn-custom-size(
                  round
                  size=".9rem"
                  no-caps
                  :icon="$refs.videoChat && $refs.videoChat.isToggleAudio ? 'mic' : 'mic_off'"
                  @click="$refs.videoChat.toggleAudio()"
                )
          .col-md-5.col-xs-12.self-end.full-height.border-left.right-block
            .wrap-block.full-height
              .friend-dialog.col-3.full-height
                .flex.justify-around.row.border-bottom
                  .text-h7.q-py-md.text-center.col-6.people.cursor-pointer.title-block(
                    :class="{'active text-weight-bold border-bottom': bar.people}"
                    @click="toggleBar('people')"
                  ) People
                  .text-h7.q-py-md.text-center.col-6.chat.cursor-pointer(
                    :class="{'active text-weight-bold border-bottom': bar.chat}"
                    @click="toggleBar('chat')"
                  )  Chat
                    span.new-message(
                      v-if="isNewMessage"
                    )
                .q-px-md.q-ml-xl.q-pt-xl#people(
                  v-if="bar.people && hasJoinedUsersIds"
                )
                  q-list
                    q-item.user-connected(
                      v-for="(userUid, userKey) in joinedUsersIds"
                      :key="`right-menu-${userKey}`"
                    )
                      q-item-section(thumbnail='')
                        q-avatar.cursor-pointer(
                          @click="activeDetailsUserUid = userUid"
                          size="3.5rem"
                        )
                          q-img.user-avatar-img(
                            :class="{'user-avatar-img-no-img': !roomUsers[userUid].photoURL}"
                            :src="roomUsers[userUid].photoURL || require('../../assets/viedo-chat/avatar/guest.png')"
                          )
                      q-item-section
                        .q-message-name.text-h6 {{ roomUsers[userUid].displayName || 'Guest' }}
                        .row.items-center
                          template(
                            v-if="roomUsers[userUid].task || ($store.state.userModule.uid !== userUid)"
                          )
                            .app-text-gray.text-body1.task-to-work {{ roomUsers[userUid].task }}
                            q-icon.q-ml-lg.cursor-pointer(
                              v-if="roomUsers[userUid].task && $store.state.userModule.uid === userUid"
                              name="done"
                              @click="onUserTaskDone"
                            )
                          template(
                            v-if="!roomUsers[userUid].task && $store.state.userModule.uid === userUid"
                          )
                            q-input.col-grow(
                              ref="userNewTask"
                              square
                              dense
                              borderless
                              v-model="userNewTask"
                              maxlength="220"
                              label="What are you working on?"
                              @keyup.enter="onUserTaskCreate"
                            )
                            q-icon.q-ml-lg.cursor-pointer(
                              name="create"
                              @click="onUserTaskCreate"
                            )
                //keep-alive
                .full-height#chat(
                  v-show="bar.chat"
                )
                  chat(
                    :isActive="bar.chat"
                    @new-message="onNewMessage"
                  )
        hr.no-margin.hr-border-grey
        .row.justify-center.full-width.q-pt-md
          .col-12.text-center
            .leave
              q-btn.relative-position.q-ml-md.text-weight-regular(
                outline
                no-caps
                size="1.2rem"
                @click="onLeave"
                label="Leave"
              )
    q-dialog(
      v-model="isInviteDialog"
      @hide="$emit('close-invite-dialog')"
    )
      q-card.invite-dialog-content.q-pa-md
        q-card-section.row.items-center.q-pt-none.q-pb-none
          .text-h6 Get Invite Link
          q-space
          q-btn.button-close(
            flat
            round
            dense
            v-close-popup
            size="1.3rem"
          ) X
        q-card-section
          .text-grey-8 Your friends can join instantly without creating an account!
          q-field.row.q-pb-none.justify-between.items-center.q-mt-lg.q-mb-md(
            borderless
            dense
          )
            q-input.col-grow.no-margin(
              outlined
              no-caps
              type="text"
              readonly
              :value="copyUrl"
            )
            q-btn.text-weight-regular.q-ml-md.q-px-lg(
              no-caps
              label="Copy Link"
              color="grey-9"
              @click="doCopy"
            )

    user-details(
      v-if="activeDetailsUserUid"
      :userUid="activeDetailsUserUid"
      :user="roomUsers[activeDetailsUserUid]"
      @close-user-details-dialog="activeDetailsUserUid = null"
    )
</template>

<script lang="ts">
import {
  Vue, Component, Watch, Prop,
} from 'vue-property-decorator';
import { RoomInterface } from 'src/types/RoomInterface';
import { RoomUserInterface, RoomUsersInterface } from 'src/types/RoomUserInterface';
import { TimerInterface, TimersInterface } from 'src/types/TimerInterface';

import { firebaseDb, firestore } from 'boot/firebase';
import Timer from 'components/Timer.vue';
import UserDetails from 'components/UserDetails.vue';
import Chat from 'components/Chat.vue';
import VideoChat from '../../components/VideoChat.vue';

@Component({
  components: {
    UserDetails,
    Chat,
    Timer,
    VideoChat,
  },
})
export default class Table extends Vue {
  @Prop({ default: false }) private inviteDialog!: boolean

  private isInviteDialog = false;

  private activeDetailsUserUid = '';

  private userNewTask = '';

  private roomUsers: RoomUsersInterface = {};

  private currentRoom: RoomInterface = {} as RoomInterface;

  private joinedUsersIds: Array<string> = [];

  private interval: any;

  private isNewMessage = false;

  private activeTimer = 'work';

  private videoListCount = 0;

  private timers: TimersInterface = {
    work: {
      name: 'Work',
      uri: 'work',
      limitTime: 15,
      currentTime: null,
    },
    rest: {
      name: 'Rest',
      uri: 'rest',
      limitTime: 6,
      currentTime: null,
    },
  }

  private bar: any = {
    people: false,
    chat: false,
  }

  private unsubscribeRoomUsers: any;

  get timer(): TimerInterface {
    return (this.timers[this.activeTimer] || {});
  }

  timerEnd() {
    this.timers.work.currentTime = null;
    this.timers.rest.currentTime = null;
    if (this.activeTimer === 'work') {
      this.activeTimer = 'rest';
    } else {
      this.activeTimer = 'work';
    }
  }

  onVideoListCount(value: number) {
    this.videoListCount = value;
  }

  onUserTaskDone() {
    this.updateRoomUser({
      task: '',
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    this.$set(this.roomUsers[this.uid], 'task', '');
  }

  onUserTaskCreate() {
    if (!this.userNewTask) {
      const userNewTaskRef = (this.$refs.userNewTask as any);
      // eslint-disable-next-line no-unused-expressions
      userNewTaskRef && userNewTaskRef[0].$el.focus();
      return;
    }

    this.updateRoomUser({
      task: this.userNewTask,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    this.$set(this.roomUsers[this.uid], 'task', this.userNewTask);
    this.userNewTask = '';
  }

  updateRoomUser(data: any) {
    const roomRef = firebaseDb.collection('rooms').doc(this.roomId);
    const usersByRoomRef = roomRef.collection('users').doc(this.uid);
    usersByRoomRef.update(data);
  }

  onNewMessage(isNewMessage: boolean) {
    this.isNewMessage = isNewMessage;
  }

  mounted() {
    if (!this.$store.getters['authModule/isAuth'] && !this.$store.getters['authModule/isGuest']) {
      this.$router.push({ name: 'Welcome' });
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'Access denied! Please Sign In' });
    }

    this.bar.people = true;

    this.$q.loading.show();

    firebaseDb.collection('rooms')
      .doc(this.roomId)
      .get()
      .then((room: any) => {
        this.currentRoom = room.data();
        if ((this.currentRoom.status !== 'active') || !this.currentRoom || !this.currentRoom.userIds.includes(this.uid)) {
          this.goToFullRoom();
          this.$q.loading.hide();
          return;
        }

        const roomTime = +((+firestore.Timestamp.now().toDate() - +this.currentRoom.createdAt.toDate()) / 60000).toFixed(2);
        const timer = this.getCurrentTimer(roomTime, this.timers.work, 0);

        this.activeTimer = timer.uri;

        this.buildUsers();
        this.$q.loading.hide();
      });
  }

  getCurrentTimer(time: number, timer: TimerInterface, currentTime: number): TimerInterface {
    const tmpCurrentTime = currentTime + timer.limitTime;

    if (tmpCurrentTime > time) {
      timer.currentTime = timer.limitTime - (time - (tmpCurrentTime - timer.limitTime));
      return timer;
    }

    return this.getCurrentTimer(time, timer.uri === 'work' ? this.timers.rest : this.timers.work, tmpCurrentTime);
  }

  // beforeDestroy() {
  //   this.unsubscribeRoomUsers();
  //   // await this.updateRoom();
  // }

  buildUsers() {
    this.unsubscribeRoomUsers = firebaseDb.collection(`rooms/${this.roomId}/users`)
      .onSnapshot((ref: any) => {
        ref.forEach((doc: any) => {
          const user = doc.data() as RoomUserInterface;

          firebaseDb.collection('users')
            .doc(user.uid)
            .get()
            .then((refUser: any) => {
              this.$set(this.roomUsers, user.uid, { ...user, ...refUser.data() });
            });
        });
      });
  }

  goToFullRoom() {
    this.$router.push({ name: 'FullRoom' });
  }

  doCopy() {
    this.$copyText(this.copyUrl).then(() => {
      this.$q.notify({ icon: 'done', color: 'positive', message: 'Copied' });
    }, () => {
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'Can not copy' });
    });
  }

  toggleBar(type: string) {
    this.bar.people = false;
    this.bar.chat = false;
    this.bar[type] = true;

    if (this.bar.chat) {
      this.isNewMessage = false;
    }
  }

  onLeave() {
    this.$q.dialog({
      title: 'Confirm',
      message: 'Are you sure you want to leave this room?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      this.updateRoom();
    });
  }

  updateRoom() {
    this.$q.loading.show();
    const { uid } = this.$store.state.userModule;
    const { roomId } = this.$route.params;
    const batch = firebaseDb.batch();
    const roomRef = firebaseDb.collection('rooms').doc(roomId);
    batch.update(roomRef, {
      userIds: firestore.FieldValue.arrayRemove(uid),
    });
    return batch.commit().then(() => {
      roomRef.get()
        .then((room: any) => {
          const userIds = room.data().userIds.length;
          firebaseDb.collection('rooms')
            .doc(roomId)
            .update({
              status: userIds ? 'active' : 'deleted',
              activeCandidatesCount: userIds,
            })
            .then(() => {
              firebaseDb.collection('users')
                .doc(uid)
                .update({
                  roomId: null,
                })
                .then(() => {
                  (this.$refs.videoChat as any).leave();
                  this.$nextTick(() => {
                    this.$q.loading.hide();
                    window.location.href = '/video-chat/rating';
                  });
                });
            });
        });
    });
  }

  get hasJoinedUsersIds(): boolean {
    return !!this.joinedUsersIds.length;
  }

  get hasRoom(): boolean {
    return !!Object.keys(this.currentRoom || {}).length && !!Object.keys(this.roomUsers || {}).length;
  }

  get copyUrl(): string {
    // eslint-disable-next-line no-restricted-globals
    const { protocol, hostname, port } = location;
    const { roomId } = this.$route.params;
    const urlPort = port ? `:${port}` : '';

    return `${protocol}//${hostname}${urlPort}/video-chat/invite/${roomId}`;
  }

  get uid(): string {
    return this.$store.state.userModule.uid as string;
  }

  get roomId(): string {
    return this.$route.params.roomId;
  }

  onJoinedRoom(ids: Array<string>) {
    this.joinedUsersIds = ids;
  }

  destroy() {
    clearInterval(this.interval);
  }

  @Watch('inviteDialog', { immediate: true, deep: true })

  onInviteDialogChanged(val: boolean) {
    if (val) {
      setTimeout(() => {
        this.isInviteDialog = val;
      }, 180); // NOTICE: 180 === transition width for block .page
    } else {
      this.isInviteDialog = val;
    }
  }

  @Watch('hasRoom')

  changeHasRoom(val: boolean) {
    if (val) {
      this.$nextTick(() => {
        (this.$refs.videoChat as any).join();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.user-connected {
  min-height: 88px;
}

.task-to-work {
  word-break: break-word;
  flex: 1 1 0;
}

.title-block {
  height: 60px;
}

.content {
  height: calc(100% - 160px);
}

.timer {
  min-height: 75px;
}

.q-img {
  height: auto;
}
.q-img__content > div {
  padding: 4px;
  background: none;
}
.border-left {
  border-left: 1px solid $border-gray;
}
.border-bottom {
  border-bottom: 1px solid $border-gray;
}
.active.border-bottom {
  border-bottom: 2px solid $border-gray-darker;
  margin-bottom: -2px;
}
.page {
  transition: width .180s;
}

.btn-custom-size {
  font-size: 16px !important;
}

.container-video {
  height: calc(100% - 180px);
  align-items: center;
  display: flex;
  min-height: 445px;

  &.size-1, &.size-2 {
    min-height: 210px;
  }
}

.leave {
  float: left;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: -170px;

  .q-btn {
    width: 170px;

    ::v-deep .q-btn__wrapper {
      min-height: auto;
    }
  }
}

span.new-message {
  width: 6px;
  height: 6px;
  background-color: rgb(204, 0, 0);
  vertical-align: middle;
  border-radius: 100%;
  display: inline-block;
  line-height: 1;
  position: relative;
  left: 16px;
}

.invite-dialog-content {
  width: 720px;
  max-width: 80vw;

  ::v-deep {
    .q-field--outlined .q-field__control {
      padding: 0 12px;
    }
  }
}

::v-deep {
  .timer {
    .text-h4 {
      font-size: 1.5rem;
    }
    .matching-header-timer {
      margin-top: .5rem;
      margin-bottom: 0;
    }
  }
}

.q-avatar {
  border: 4px solid darkseagreen;
  box-sizing: content-box;
  width: 46px;
  height: 46px;
  .user-avatar-img {
    height: 46px;
  }
}

.button-close {
  margin-right: -20px;
  &:hover {
    ::v-deep {
      .q-focus-helper {
        background: none !important;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .right-block {
    display: none;
  }
}
</style>
