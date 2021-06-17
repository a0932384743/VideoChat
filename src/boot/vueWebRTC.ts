import Vue from 'vue';
import WebRTC from 'vue-webrtc';
import * as io from 'socket.io-client';

window.io = io;

Vue.use(WebRTC);
