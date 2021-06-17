<template lang="pug">
  q-page.row.items-center.justify-evenly
    .full-page-wrapper
      .full-page-header.q-my-lg.q-py-lg
        .text-h4.text-center.q-py-md You are invited to video-chat room.
        .text-h6.text-center Please wait, we add you to this room!

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { firebaseDb, firestore } from 'boot/firebase';
import { RoomUserInterface } from 'src/types/RoomUserInterface';

@Component
export default class Table extends Vue {
  async updateFirebaseData(roomId: string) {
    const { uid } = this.$store.state.userModule;
    const userData: RoomUserInterface = {
      uid,
      task: '',
    };

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

    await firebaseDb.collection('users')
      .doc(uid)
      .update({ roomId }).then(() => {
        this.$router.push({
          name: 'VideoChatTable',
          params: { roomId },
        });
      });
  }

  mounted() {
    const { roomId } = this.$route.params;
    firebaseDb.collection('rooms').doc(roomId).get().then((currentRoom: any) => {
      if (!currentRoom.exists) {
        this.$router.push({ name: 'FullRoom' });
      } else {
        const { activeCandidatesCount, status } = currentRoom.data();
        if (activeCandidatesCount < 4 && status === 'active') {
          if (!this.$store.getters['authModule/isAuth']) {
            this.$q.loading.show();
            this.$store.dispatch('authModule/loginAsGuest').then(() => {
              this.$q.loading.hide();
              this.$q.notify({
                icon: 'done',
                color: 'positive',
                message: 'You are signed in as a guest. Please create an account to have access to full '
                  + 'functionality of the application.',
              });
              this.updateFirebaseData(roomId);
            });
          } else {
            this.updateFirebaseData(roomId);
          }
        } else {
          this.$router.push({ name: 'FullRoom' });
        }
      }
    });
  }
}
</script>
