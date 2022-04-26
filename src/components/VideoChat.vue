<template lang="pug">
  .video-list.flex.items-center(
    :class="`size-${videoList.length}`"
  )
    .video-item.q-my-sm(
      v-for="item in videoList"
      :key="item.id"
    )
      .q-mx-sm.relative-position.flex.flex-center.items-center.justify-center
        video.vertical-bottom(
          autoplay
          playsinline
          ref="videos"
          :height="cameraHeight"
          :muted="item.muted"
          :id="item.id"
        )
        div.absolute-bottom.text-caption.text-white.text-left.q-ma-sm {{ getUserName(item.extra.uid) }}
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
} from 'vue-property-decorator';
import RTCMultiConnection from 'rtcmulticonnection';
import { RoomUsersInterface } from 'src/types/RoomUserInterface';

require('adapterjs');

@Component
export default class VideoChat extends Vue {
  @Prop({ default: 'public-room', type: String }) private roomId!: string;

  @Prop({ default: 'https://rtc-camera.herokuapp.com/' }) private socketURL!: string;

  @Prop({ default: 190, type: [Number, String] }) private cameraHeight!: number | string;

  @Prop({ default: '' }) private uid!: string;

  @Prop(Object) private users!: RoomUsersInterface;

  @Prop({ default: false }) private enableLogs!: boolean;

  @Prop({ default: true }) private enableAudio!: boolean;

  @Prop({ default: true }) private enableVideo!: boolean;

  private rtcmConnection: any;

  private localVideo: any;

  private videoList: Array<any> = [];

  private isToggleVideo = true;

  private isToggleAudio = true;

  mounted() {
    const that = this as VideoChat;
    this.isToggleVideo = this.enableVideo;
    this.isToggleAudio = this.enableAudio;
    this.rtcmConnection = new RTCMultiConnection();
    this.rtcmConnection.socketURL = this.socketURL;
    this.rtcmConnection.autoCreateMediaElement = false;
    this.rtcmConnection.autoCloseEntireSession = true;

    this.rtcmConnection.session = {
      audio: this.enableAudio,
      video: this.enableVideo,
    };

    this.rtcmConnection.iceServers = [{
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun.l.google.com:19302?transport=udp',
      ],
    }];

    this.rtcmConnection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: this.enableAudio,
      OfferToReceiveVideo: this.enableVideo,
    };

    this.rtcmConnection.onstream = (stream: any) => {
      const found = that.videoList.find((video) => video.id === stream.streamid);
      if (found === undefined) {
        const video = {
          id: stream.streamid,
          muted: stream.type === 'local',
          extra: stream.extra,
          isAudio: true,
        };

        that.videoList.push(video);

        if (stream.type === 'local') {
          that.localVideo = video;
          that.localVideo.userId = stream.userId;
        }
      }

      setTimeout(() => {
        const videos = (that.$refs.videos as Array<any>);
        for (let i = 0, len = videos.length; i < len; i += 1) {
          if (videos[i].id === stream.streamid) {
            videos[i].srcObject = stream.stream;
            break;
          }
        }
      }, 1000);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      that.$emit('joined-room', that.videoList.map((video) => video.extra.uid));
    };
    this.rtcmConnection.onstreamended = (stream: any) => {
      const newList: Array<any> = [];
      that.videoList.forEach((item: any) => {
        if (item.id !== stream.streamid) {
          newList.push(item);
        }
      });
      that.videoList = newList;
      that.$emit('left-room', that.videoList.map((video: any) => video.extra.uid as string));
    };
    this.rtcmConnection.onmute = (e: any) => {
      if (!e.mediaElement) {
        return;
      }

      if (e.muteType === 'both' || e.muteType === 'video') {
        e.mediaElement.src = null;
        // e.mediaElement.stop();
        e.mediaElement.poster = e.snapshot || 'https://cdn.webrtc-experiment.com/images/muted.png';
      } else if (e.muteType === 'audio') {
        e.mediaElement.muted = true;
        that.videoList = that.videoList.map((video) => {
          if (video.extra.uid === e.extra.uid) {
            video.isAudio = false;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return video;
        });
      }
    };
    this.rtcmConnection.onunmute = (e: any) => {
      if (!e.mediaElement) {
        return;
      }

      if (e.unmuteType === 'both' || e.unmuteType === 'video') {
        e.mediaElement.poster = null;
        e.mediaElement.src = URL.createObjectURL(e.stream);
        // e.mediaElement.play();
      } else if (e.unmuteType === 'audio') {
        e.mediaElement.muted = false;
        that.videoList = that.videoList.map((video) => {
          if (video.extra.uid === e.extra.uid) {
            video.isAudio = true;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return video;
        });
      }
    };

    this.rtcmConnection.onleave = (user: any) => {
      that.videoList = that.videoList.filter((video: any) => video.extra.uid !== user.extra.uid);
    };
  }

  join() {
    const that = this as VideoChat;
    this.rtcmConnection.openOrJoin(this.roomId, (isRoomExist: boolean | undefined, roomId: string) => {
      if (isRoomExist === false && that.rtcmConnection.isInitiator === true) {
        that.$emit('opened-room', roomId);
      }
    });
  }

  toggleVideo() {
    this.isToggleVideo = !this.isToggleVideo;
    if (this.rtcmConnection.attachStreams.length) {
      const localStream = this.rtcmConnection.attachStreams[0];
      if (this.isToggleVideo) {
        localStream.unmute('video');
      } else {
        localStream.mute('video');
      }
    }
  }

  toggleAudio() {
    this.isToggleAudio = !this.isToggleAudio;
    if (this.rtcmConnection.attachStreams.length) {
      const localStream = this.rtcmConnection.attachStreams[0];
      if (this.isToggleAudio) {
        localStream.unmute('audio');
      } else {
        localStream.mute('audio');
      }
    }
  }

  leave() {
    this.rtcmConnection.attachStreams.forEach((localStream: any) => {
      localStream.stop();
    });

    this.videoList = [];
  }

  getUserName(uid: string): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const defaultName = 'Guest';
    if (!this.users[uid]) {
      return defaultName;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.users[uid].displayName || defaultName;
  }

  beforeDestroy() {
    this.leave();
  }

  @Watch('videoList')

  changeVideoList() {
    this.$emit('video-list-count', this.videoList.length);
  }
}
</script>

<style lang="scss" scoped>
.video-list {
  //background: whitesmoke;
  //height: 100%;
  width: 100%;

  .video-item {

    video {
      height: 200px;
      max-height: 100%;
      width: 270px;
      background: #efefef;
      border: 1px solid #efefef;
    }
  }

  &.size-1 {
    .video-item, .relative-position {
      width: 100%;
      height: 100%;
      text-align: center;

      video {
        max-width: 100%;
      }
    }
  }
}

.video-list div {
  padding: 0;

  video {
    transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
  }
}

.video-item {
  //background: #c5c4c4;
  display: flex;
  width: 50%;
}

.video-item:nth-child(odd) {
  justify-content: flex-end;
}
</style>
