<template>
  <div >
    <h2 class="title">Track list</h2>
    <vs-table>
      <template #header>
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="allMusic = $vs.sortData($event, allMusic, 'id')">
            #
          </vs-th>
          <vs-th
            sort
            @click="allMusic = $vs.sortData($event, allMusic, 'title')"
          >
            Title
          </vs-th>
          <vs-th
            sort
            @click="allMusic = $vs.sortData($event, allMusic, 'artist')"
          >
            Artist
          </vs-th>
          <vs-th
            sort
            @click="allMusic = $vs.sortData($event, allMusic, 'date')"
          >
            Date created
          </vs-th>
          <vs-th
            sort
            @click="allMusic = $vs.sortData($event, allMusic, 'action')"
          >
            Action
          </vs-th>
        </vs-tr>
      </template>

      <template #tbody>
        <div class="table_body_loader" ref="bodyContent"></div>
        <vs-tr
          v-if="!musicLoading"
          :key="i"
          v-for="(tr, i) in $vs.getSearch(allMusic, search)"
          :data="tr"
        >
          <vs-td>
            {{ i + 1 }}
          </vs-td>
          <vs-td>
            {{ tr.title }}
          </vs-td>
          <vs-td>
            {{ tr.artist }}
          </vs-td>
          <vs-td>
            {{ new Date(tr.created) }}
          </vs-td>
          <vs-td>
            <vs-button icon color="danger" border @click="deleteMusic(tr._id)">
              <i class="bx bxs-trash"></i>
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <div class="add-button">
      <vs-button
        block
        @click="isOpenAddMusicModal = !isOpenAddMusicModal"
      >
        <i class='bx bxs-plus-circle' ></i> Add Track
      </vs-button>
    </div>
    <add-music-dialog v-model="isOpenAddMusicModal"/>
  </div>
</template>

<script>
import AddMusicDialog from "@/components/addMusicDialog";
let tableLoader

export default {
  name: 'library',
  components: {AddMusicDialog},
  data: () => {
    return {
      search: '',
      musicLoading: false,
      allMusic: [],
      isOpenAddMusicModal: false,
    }
  },
  methods: {
    async getAllMusics() {
      this.musicLoading = true
      try {
        this.allMusic = await this.$axios.$get('/track')
        this.musicLoading = false
      } catch (err) {
        this.musicLoading = false
        this.$vs.notification({
          title: 'Error',
          text: 'Error Fetching Musics',
          progress: 'auto',
          color: 'danger',
        })
      }
    },
    async deleteMusic(id) {
      try {
        await this.$axios.$delete(`/track/${id}`)
        await this.getAllMusics()
      } catch (err) {
        this.$vs.notification({
          title: 'Error',
          text: 'Error Delete Track',
          progress: 'auto',
          color: 'danger',
        })
      }
    },
  },
  created() {
    this.getAllMusics()
  },
  watch: {
    musicLoading: function (value) {
      if (value) {
        tableLoader = this.$vs.loading({
          target: this.$refs.bodyContent,
          type: 'scale',
        })
      } else if (tableLoader) {
        tableLoader.close()
        tableLoader = undefined
      }
    },
  },
}
</script>

<style scoped>
.title{
  margin: 10px;
}
.table_body_loader {
  position: absolute;
  width: 100%;
  height: 100px;
}
.add-button{
  max-width: 400px;
  margin: 10px auto 0;
}
</style>
