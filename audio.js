class NightAudio {
  constructor(){this.enabled=true;this.context=null;this.source=null;this.ticket=0;this.buffers=new Map();this.manifest={};this.voice=null;this.ready=this.load();this.selectVoice();if('speechSynthesis'in window)window.speechSynthesis.addEventListener('voiceschanged',()=>this.selectVoice());}
  async load(){try{const r=await fetch('audio-manifest.json');if(r.ok)this.manifest=await r.json();}catch{}}
  selectVoice(){if(!('speechSynthesis'in window))return;const voices=speechSynthesis.getVoices();this.voice=voices.find(v=>/zh[-_]HK|yue/i.test(v.lang))||voices.find(v=>/cantonese|sinji|hiu.*(gaai|maan)/i.test(v.name))||null;}
  unlock(){try{const C=window.AudioContext||window.webkitAudioContext;if(C&&!this.context)this.context=new C();this.context?.resume().catch(()=>{});}catch{}}
  stop(){this.ticket++;if(this.source){try{this.source.stop();}catch{}this.source=null;}if('speechSynthesis'in window)speechSynthesis.cancel();}
  setEnabled(enabled){this.enabled=enabled;if(!enabled)this.stop();else this.unlock();}
  async say(key,text){this.stop();if(!this.enabled)return;const ticket=this.ticket;await this.ready;if(ticket!==this.ticket)return;const file=this.manifest[key];if(file&&this.context){try{let buf=this.buffers.get(file);if(!buf){const r=await fetch(file);if(!r.ok)throw Error('audio');buf=await this.context.decodeAudioData(await r.arrayBuffer());this.buffers.set(file,buf);}if(ticket!==this.ticket||!this.enabled)return;const source=this.context.createBufferSource();source.buffer=buf;source.connect(this.context.destination);this.source=source;source.start();return;}catch{}}
    this.selectVoice();if(this.voice&&'speechSynthesis'in window){const u=new SpeechSynthesisUtterance(text);u.lang='zh-HK';u.voice=this.voice;u.rate=.8;speechSynthesis.speak(u);}}
  tone(type='correct'){if(!this.enabled)return;this.unlock();const c=this.context;if(!c)return;const tones=type==='correct'?[[659,0,.16],[880,.12,.25]]:type==='pickup'?[[1174,0,.14]]:[[280,0,.12],[230,.1,.16]];for(const [hz,delay,len]of tones){const o=c.createOscillator(),gain=c.createGain();o.type='sine';o.frequency.value=hz;gain.gain.setValueAtTime(0,c.currentTime+delay);gain.gain.linearRampToValueAtTime(.09,c.currentTime+delay+.015);gain.gain.exponentialRampToValueAtTime(.001,c.currentTime+delay+len);o.connect(gain);gain.connect(c.destination);o.start(c.currentTime+delay);o.stop(c.currentTime+delay+len+.02);}}
  get hasCantonese(){return !!Object.keys(this.manifest).length||!!this.voice;}
}
export const audio=new NightAudio();
