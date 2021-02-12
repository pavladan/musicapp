<template>
  <player />
</template>
<script>
import Player from '@/components/player'


const getAudioContext = () => {
  AudioContext = window.AudioContext || window.webkitAudioContext
  return new AudioContext()
}

const appendBuffer = (buffer1, buffer2, context) => {
  const numberOfChannels = Math.min(
    buffer1.numberOfChannels,
    buffer2.numberOfChannels
  )
  const tmp = context.createBuffer(
    numberOfChannels,
    buffer1.length + buffer2.length,
    buffer1.sampleRate
  )
  for (let i = 0; i < numberOfChannels; i++) {
    const channel = tmp.getChannelData(i)
    channel.set(buffer1.getChannelData(i), 0)
    channel.set(buffer2.getChannelData(i), buffer1.length)
  }
  return tmp
}

export default {
  components: { Player },
  methods: {
    async getTrack() {
      const audioContext = getAudioContext()
      socket.emit('track', console.log)

      ss(socket).on('track-stream', (stream, { stat }) => {
        stream.on('data', async (data) => {
          console.log(data)
          // calculate loading process rate
          const loadRate = (data.length * 100) / stat.size
          // next step here
          const audioBuffer = await audioContext.decodeAudioData(data.buffer)
          let source = audioContext.createBufferSource()
          const newaudioBuffer =
            source && source.buffer
              ? appendBuffer(source.buffer, audioBuffer, audioContext)
              : audioBuffer
          source = audioContext.createBufferSource()
          source.buffer = newaudioBuffer
          source.connect(audioContext.destination)

          const duration = (100 / loadRate) * audioBuffer.duration
          // play audio
          source.start(source.buffer.duration)
        })
      })
      socket.on('broadcast', function (data) {
        console.log(data)
      })
    },
  },
}
</script>
