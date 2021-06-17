<template lang="pug">
  #chat-wrapper
    #messages.full-width
      q-chat-message.items-start.q-mb-md(
        v-for="(message, index) in messages"
        :key="index"
        :name="getOwnerNameOfMessage(message)"
        :text="[replaceURLWithHTMLLinks(message.text)]"
        bg-color="white"
      )
        template(
          v-slot:avatar
        )
          q-avatar.q-ml-md.q-mr-sm.cursor-pointer(
            @click="activeDetailsUserUid = message.userId"
          )
            q-img.user-avatar-img(
              :class="{'user-avatar-img-no-img': !users[message.userId] || !users[message.userId].photoURL}"
              :src="(users[message.userId] && users[message.userId].photoURL) || require('../assets/viedo-chat/avatar/guest.png')"
           )
    .footer.q-px-md.q-py-sm
      q-input(
        v-model='text'
        label='Start typing...'
        dense
        borderless
        value=''
        @keydown.enter.prevent="sendMessage"
      )
        template(
          v-slot:after=''
        )
          q-btn(
            round
            dense
            flat
            icon='send'
            @click='sendMessage'
          )
    user-details(
      v-if="activeDetailsUserUid"
      :userUid="activeDetailsUserUid"
      :user="users[activeDetailsUserUid]"
      @close-user-details-dialog="activeDetailsUserUid = null"
    )
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
} from 'vue-property-decorator';
import { firebaseDb } from 'boot/firebase';
import ResizeWindowMixin from 'src/mixins/ResizeWindowMixin';
import { ChatMessageInterface } from 'src/types/ChatMessageInterface';
import UserDetails from 'components/UserDetails.vue';
import { UsersInterface } from 'src/types/store/UserInterface';

@Component({
  mixins: [ResizeWindowMixin],
  components: {
    UserDetails,
  },
})
export default class VideoChat extends Vue {
  @Prop({ default: false }) private isActive!: boolean

  private text = '';

  private users: UsersInterface = {};

  private messages: Array<ChatMessageInterface> = [];

  private isLoading = false;

  private activeDetailsUserUid = '';

  mounted() {
    this.loadMessages();
  }

  get roomId() {
    return this.$route.params.roomId;
  }

  loadMessages() {
    firebaseDb.collection('messages')
      .where('roomId', '==', this.roomId)
      .orderBy('createdAt', 'asc')
      .onSnapshot((ref) => {
        this.newMessage();
        this.isLoading = true;

        this.messages.push(...ref.docChanges().map(({ doc }) => {
          const message = doc.data(); 
          if (message.userId && !this.users[message.userId]) {
            firebaseDb.collection('users')
              .doc(message.userId)
              .get()
              .then((userRef: any) => {
                this.$set(this, 'users', { ...this.users, ...{ [message.userId]: userRef.data() } });
              });
          }

          return message;
        }) as Array<any>);
      });
  }

  newMessage() {
    this.$emit('new-message', this.isLoading && !this.isActive);
  }

  replaceURLWithHTMLLinks(text: string) {
    // eslint-disable-next-line no-useless-escape
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a class='link-blank' href='$1' target='_blank'>$1</a>");
  }

  onResizeWindow() {
    const chatWrapper = window.document.getElementById('chat-wrapper');
    const messages = window.document.getElementById('messages');
    const maxHeight = (chatWrapper && chatWrapper.offsetHeight) || 0;
    if (messages) {
      messages.style.maxHeight = `${maxHeight - 70}px`;
    }
    if (chatWrapper) {
      chatWrapper.style.maxHeight = `${window.innerHeight - chatWrapper.offsetTop - 60}px`;
    }
  }

  sendMessage() {
    if (this.text.length > 0) {
      const message = {
        userId: this.$store.state.userModule.uid,
        roomId: this.roomId,
        text: this.text,
        createdAt: new Date(),
      };
      firebaseDb.collection('messages').add(message)
        .then(() => {
          this.text = '';
        }).catch((error) => {
          this.$q.notify({ icon: 'report_problem', color: 'warning', message: error.message });
        });
    } else {
      this.$q.notify({ icon: 'report_problem', color: 'warning', message: 'You need to type some text...' });
    }
  }

  getOwnerNameOfMessage(message: ChatMessageInterface) {
    const name = this.hasMyMessage(message) ? 'me' : (this.users[message.userId] && this.users[message.userId].displayName) || 'Guest';
    const createdAt = new Date(message.createdAt.seconds * 1000);
    const time = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(createdAt);

    return `<span class="message__name">${name}</span> <span class="message__time app-text-gray-light">- ${time}</span>`;
  }

  hasMyMessage(message: ChatMessageInterface) {
    return message.userId === this.$store.state.userModule.uid;
  }

  @Watch('isActive')

  changeIsActive() {
    this.onResizeWindow();
  }
}
</script>

<style lang="scss" scoped>
  #chat-wrapper {
    height: calc(100% - 67px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 12px;
    #messages {
      padding: 0 1rem 12px 1rem;
      max-height: 420px;
      overflow: auto;
    }
    .footer {
      border-top: 1px solid $border-gray;
    }
  }
  .q-avatar {
    border: 4px solid darkseagreen;
    box-sizing: content-box;
    width: 40px;
    height: 40px;
    .user-avatar-img {
      height: 46px;

      &.user-avatar-img-no-img {
        margin-top: -3px;
      }
    }
  }
  ::v-deep {
    .q-message-container {
      align-items: start;

      .q-message-text {
        padding-left: 0;
        padding-bottom: 0;
      }

      .q-message-text:last-child {
        min-height: 38px;
      }
    }

    .q-message-text-content {
      color: $gray;
    }

    .link-blank {
      color: $gray;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
</style>
