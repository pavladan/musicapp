<template>
  <vs-dialog v-model="isOpen" blur class="add-track-modal">
    <template #header>
      <h4 class="not-margin">Add tracks</h4>
    </template>

    <div class="item" v-for="file in files" :key="file.id">
      #{{ file.id + 1 }}
      <vs-input
        label-placeholder="Title"
        v-model="file.title"
        :state="!file.title ? 'danger' : undefined"
      />
      <vs-input
        label-placeholder="Artist"
        v-model="file.artist"
        :state="!file.artist ? 'danger' : undefined"
      />
      <div class="flex">
        <div class="audio-player">
          <audio :src="file.fileObjectUrl" controls />
        </div>
        <vs-button
          icon
          danger
          transparent
          circle
          style="margin: 0"
          title="Remove"
          @click.stop="deleteFile(file.id)"
        >
          <i class="bx bx-x" />
        </vs-button>
      </div>
    </div>
    <div :class="`file ${isFilesExist ? 'exist' : ''}`">
      <span class="file-label" v-html="fileContainerLabel" />
      <input
        ref="fileInput"
        type="file"
        accept="audio/*"
        @change="addFiles($event.target.files)"
        class="file-input"
        multiple
      />
    </div>
    <template #footer>
      <div class="footer">
        <vs-button
          block
          @click="uploadFile()"
          :loading="loading"
          :disabled="
            !isFilesExist ||
            files.some((file) => !file.title || !file.artist || !file.track)
          "
        >
          Upload
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
import { modals, tracks } from '@/store'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AddTrackModal extends Vue {
  files: {
    id: number
    track: File
    fileObjectUrl: string
    title: string
    artist: string
  }[] = []

  $refs!: {
    fileInput: HTMLInputElement
  }

  async uploadFile() {
    await tracks.addTracks(this.files)
    if (tracks.errorMessage) return
    modals.close()
    this.files = []
  }

  addFiles(files: File[]) {
    files.forEach((file) => {
      const matchName = file.name.match(/(.*)\..+$/)
      this.files.push({
        id: this.files.length,
        track: file,
        fileObjectUrl: URL.createObjectURL(file),
        title: matchName ? matchName[1] : '',
        artist: '',
      })
    })
    this.$refs.fileInput.value = ''
  }

  deleteFile(id: number) {
    this.files = this.files.filter((file) => file.id !== id)
  }

  get isOpen() {
    return modals.modalName === 'add-track'
  }
  set isOpen(val) {
    val || modals.close()
  }

  get isFilesExist() {
    return this.files.length !== 0
  }

  get fileContainerLabel() {
    return !this.isFilesExist
      ? `Drag your file(s) here to begin
          <br />
          or click to browse`
      : `Add more files`
  }

  get loading() {
    return tracks.loading
  }
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  align-items: center;
}
.flex {
  display: flex;
  gap: 5px;
}
.file {
  position: relative;
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: rgba(var(--vs-gray-2), 1);
  color: dimgray;
  padding: 20px;
  min-height: 150px;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
  &.exist {
    min-height: 50px;
  }
  &:hover {
    outline-offset: -6px;
  }
  &-input {
    opacity: 0;
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    cursor: pointer;
  }
  &-label {
    text-align: center;
  }
}
.audio-player {
  audio {
    height: 100%;
    outline: none;
  }
}
</style>
<style lang="scss">
.add-track-modal {
  .vs-input {
    width: 100%;
  }
}
</style>
