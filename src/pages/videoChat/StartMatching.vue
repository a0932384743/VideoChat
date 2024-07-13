<template lang="pug">
  q-page.items-center.row
    .row.justify-center.full-width(
      v-if="isLoad"
    )
      .col-lg-6.col-xl-4.col-md-7.q-pa-md
        .title.flex
          h1.text-h5 Start matching for a table.
        q-form.q-mb-md(
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          ref="form"
        )
          q-input(
            outlined
            ref="input"
            v-model="task"
            type="text"
            label="What are you working on?"
            :rules="[ val => val.trim().length > 0 || 'Please write something']"
            @blur="$refs.input.resetValidation()"
          )
          .text-grey(
            v-if="!$store.state.userModule.isPremium"
          ) Free members can match table once a day,
            |
            |
            a.get-premium.text-grey(href='#') get premium membership for $5 / month.
        .row.justify-center.q-pt-md
          .col-lg-5.col-sm-6
            q-btn.q-mb-md.full-width.text-weight-regular.app-button(
              no-caps
              dense
              color="grey-9"
              label="Match Table"
              @click="onMatch"
            )
            q-btn.full-width.text-weight-regular.app-button(
              outline
              no-caps
              dense
              color="grey-8"
              icon="add"
              label="Create Private Table"
              @click="onCreatePrivate"
            )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { firebaseDb, firestore } from 'boot/firebase';

import { RoomInterface } from 'src/types/RoomInterface';
import { RoomUserInterface } from 'src/types/RoomUserInterface';

@Component({
  firestore: {
    rooms: firebaseDb.collection('rooms')
      .where('isPublic', '==', 1)
      .where('status', '==', 'active')
      .where('activeCandidatesCount', '<', 4)
      .limit(1),
  },
})
export default class StartMatching extends Vue {
  private task = '';

  private rooms: Array<RoomInterface> = [];

  private isLoad = false;

  async mounted() {
    this.$q.loading.show();
    // TODO: !!!!!!!!! Remove queries nesting
    await firebaseDb.collection('users')
      .doc(this.$store.state.userModule.uid)
      .get()
      .then(async (refUser: any) => {
        const roomId = refUser.exists && refUser.data().roomId;
        if (roomId) {
          await firebaseDb.collection('rooms')
            .doc(roomId)
            .get()
            .then((ref: any) => {
              if (ref.exists && (ref.data().status === 'active')) {
                this.$router.push({ name: 'VideoChatTable', params: { roomId } });
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ref;
              }
              return firebaseDb.collection('users')
                .doc(this.$store.state.userModule.uid)
                .update({ roomId: null });
            });
        }
      });

    this.isLoad = true;
    this.$q.loading.hide();

    if (
      !this.$store.getters['authModule/isAuth']
      || (this.$store.getters['authModule/isAuth'] && this.$store.getters['authModule/isGuest'])
    ) {
      this.$router.push({ name: 'Welcome' });
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'Access denied! Please Sign In' });
    }
  }

  async onMatch() {
    const isValidate = await (this.$refs.form as any).validate();
    if (!isValidate) {
      return;
    }

    let roomId = this.rooms[0] && this.rooms[0].id;
    const { uid } = this.$store.state.userModule;
    const userData: RoomUserInterface = {
      uid,
      task: this.task,
    };

    if (!roomId) {
      roomId = await this.createRoomFromUsers({ isPublic: 1 }, userData);
    } else {
      const batch = firebaseDb.batch();
      const roomRef = firebaseDb.collection('rooms').doc(roomId);
      const usersByRoomRef = roomRef.collection('users').doc(uid);

      batch.update(roomRef, {
        userIds: firestore.FieldValue.arrayUnion(uid),
      });

      await usersByRoomRef
        .get()
        .then((user: any) => {
          if (user.exists) {
            userData.updatedAt = firestore.FieldValue.serverTimestamp();
            batch.update(usersByRoomRef, userData);
          } else {
            userData.createdAt = firestore.FieldValue.serverTimestamp();
            batch.set(usersByRoomRef, userData);
          }

          batch.commit().then(() => {
            roomRef.get()
              .then((room: any) => {
                firebaseDb.collection('rooms')
                  .doc(roomId)
                  .update({
                    activeCandidatesCount: room.data().userIds.length,
                  });
              });
          });
        });
    }

    this.updateUser(uid, {
      roomId,
    })
      .then(() => {
        this.$router.push({ name: 'Matching' });
      });
  }

  async onCreatePrivate() {
    const isValidate = await (this.$refs.form as any).validate();
    if (!isValidate) {
      return;
    }

    const { uid } = this.$store.state.userModule;
    const userData = {
      uid,
      task: this.task,
    };

    const roomId = await this.createRoomFromUsers({ isPublic: 0 }, userData);

    this.updateUser(uid, {
      roomId,
    })
      .then(() => {
        this.$router.push({ name: 'VideoChatTable', params: { roomId } });
      });
  }

  updateUser(uid: string, userData: any) {
    return firebaseDb.collection('users')
      .doc(uid)
      .set(userData);
  }

  createRoomFromUsers(room: any, user: RoomUserInterface) {
    return firebaseDb.collection('rooms')
      .add({
        ...room,
        status: 'active',
        activeCandidatesCount: 1,
        userIds: firestore.FieldValue.arrayUnion(user.uid),
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then((ref) => {
        const roomId = ref.id;
        user.createdAt = firestore.FieldValue.serverTimestamp();

        firebaseDb.collection('rooms')
          .doc(roomId)
          .collection('users')
          .doc(user.uid)
          .set(user);

        return roomId;
      });
  }
}
</script>
