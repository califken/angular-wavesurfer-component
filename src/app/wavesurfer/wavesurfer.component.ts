import { Component, AfterViewInit, Input } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { Subject, interval } from 'rxjs';

interface Track {
  name?: string;
  artist?: string;
  image?: string;
  fileurl?: string;
}
@Component({
  selector: 'app-wavesurfer',
  template: `<div id="app-cover">
  <div id="bg-artwork"></div>
  <div id="bg-layer"></div>
  <div id="player">
      <div id="player-track" [ngClass]="{'active': isPlaying}">
          <div id="album-name">{{ track.artist }}</div>
          <div id="track-name">{{ track.name }}</div>
          <div id="track-time" [ngClass]="{'active': isPlaying}">
              <div id="current-time">{{ currentTimeSrc | async }}</div>
              <div id="track-length">{{ duration.toFixed(2) }}</div>
          </div>
          <div id="s-area">
           <div id="waveform"></div>
          </div>
      </div>
      <div id="player-content">
          <div id="album-art" [ngClass]="{'active': isPlaying}">
              <img [src]="track.image" class="active" id="_1">
          </div>
          <div id="player-controls">
              <div class="control" *ngIf="!isPlaying">
                  <div class="button" (click)="play()" id="play-pause-button">
                      <i class="fas fa-play"></i>
                  </div>
              </div>
              <div class="control" *ngIf="isPlaying">
                  <div class="button" (click)="pause()" id="play-pause-button">
                      <i class="fas fa-pause"></i>
                  </div>
              </div>
              <div class="control">
                  <div class="button" id="play-previous">
                      <i class="fas fa-heart"></i>
                  </div>
              </div>
              <div class="control">
                  <div class="button" id="play-next">
                      <i class="fas fa-share"></i>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
`,
  styleUrls: ['./wavesurfer.component.css'],
})
export class WavesurferComponent implements AfterViewInit {
  @Input() track: Track;
  public wavesurfer: WaveSurfer;
  public isPlaying: boolean = false;
  public duration = 0;
  public currenttime = 0;
  public currentTimeSrc = new Subject<string>();

  constructor() {}

  ngAfterViewInit() {
    this.generateWaveform();
  }

  generateWaveform(): void {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      height: 50,
      scrollParent: false,
      cursorWidth: 3,
      cursorColor: '#FFF',
      hideScrollbar: true,
      waveColor: '#FFF',
    });
    this.wavesurfer.load(this.track.fileurl);
    this.wavesurfer.on('audioprocess', () => this.waveOnAudioprocess());
    this.wavesurfer.on('ready', () => this.ready());
    this.wavesurfer.on('play', () => (this.isPlaying = true));
    this.wavesurfer.on('pause', () => (this.isPlaying = false));
  }

  waveOnAudioprocess() {
    this.isPlaying = true;
    let ct = this.wavesurfer.getCurrentTime();
    this.currentTimeSrc.next(ct.toFixed(2));
  }

  ready() {
    this.duration = this.wavesurfer.getDuration();
    this.play();
  }

  play() {
    this.wavesurfer.play();
    const source = interval(100);
    const subscribe = source.subscribe((val) => val);
  }
  pause() {
    this.wavesurfer.pause();
  }
}
 