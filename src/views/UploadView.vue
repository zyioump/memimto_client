<template>
    <Toolbar></Toolbar>
    <w-flex grow column align-center justify-center>
        <w-card>
            <w-toolbar style="width: 80vw;" :bg-color="primary_color">
                <h1 class="title3">Upload</h1>
            </w-toolbar>
            <p class="ma1">Please select a file :</p>
            <w-input class="ma1" v-model="files" type="file" ref="file"></w-input>
            <w-button class="ma1" @click="submit" :bg-color="primary_color">Upload</w-button>
            <w-progress class="ma1" v-if="currentChunk > 0 && currentChunk < file.size" :model-value="100 * currentChunk / file.size" size="1em" outline round :color="primary_color" stripes></w-progress>
            <w-alert class="ma1" error v-if="errorMsg != ''">{{ errorMsg }}</w-alert>
        </w-card>
    </w-flex>
</template>

<script>
import Toolbar from '../components/Toolbar.vue';
export default {
  inject: ['api', "primary_color"],
  components: {Toolbar},
  data: function () {
      return {
          errorMsg: "",
          chunkSize: 6000000,
          currentChunk: 0,
          files: [],
          file: null
      }
  },
  computed: {
    jwt () {
      return this.$root.getCookie("jwt")
    },
    is_logged() {
        return this.$root.getCookie("jwt") != ""
    }
  },
  mounted: function () {
      if (!this.is_logged) this.$router.push("/login")
  },
  methods: {
      submit () {
          this.errorMsg = ""
          this.currentChunk = 0
          if (this.files.length > 0) {
              this.file = this.files[0].file
              console.log(this.file.size)
              if (this.file.type == "application/zip"){
                  let chunkNum = Math.ceil(this.file.size/this.chunkSize);

                  console.log("Chunk num : " + chunkNum)
                  this.uploadChunk()
              } else {
                  this.errorMsg = "File type must be .zip"
              }
          } else {
              this.errorMsg = "Please select a file before"
          }
      },
      uploadChunk () {
          if (this.currentChunk < this.file.size) {
              let chunkEnd = Math.min(this.currentChunk + this.chunkSize , this.file.size);
              const chunk = this.file.slice(this.currentChunk, chunkEnd)
              
              const req = new XMLHttpRequest()
              req.open("POST", this.api + "upload", true)
              req.setRequestHeader("filesize", this.file.size)
              req.setRequestHeader("chunkstart", this.currentChunk)
              req.setRequestHeader("chunksize", chunk.size)
              req.setRequestHeader("filename", this.file.name)
              req.setRequestHeader("Authorization", this.jwt)
              req.onload = (event) => {
                  if (event.target.status == 200)  this.uploadChunk()
                  else if (event.target.status == 401) this.$router.push("/login")
                  else this.errorMsg = "Server refused"
              }
              req.send(chunk);
              this.currentChunk += chunk.size
          }
      }
  },
}
</script>