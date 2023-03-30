<script>
export default {
    inject: ['api', 'primary_color'],
    props: {
        album_id: {required: true}
    },
    data: function () {
        return {
            stream: null,
            width: 500,
            height: 500,
            errorMsg: ""
        }
    },
    methods: {
        requestCamera: async function () {
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                this.stream = await navigator.mediaDevices.getUserMedia({video: {
                    width: this.width,
                    height: this.height
                }})
                this.$refs.viewer.srcObject = this.stream
            }
        },
        takePicture: async function () {
            this.errorMsg = ""
            let screenshotCanvas = this.$refs.screenshot
            const context = screenshotCanvas.getContext("2d")
            screenshotCanvas.width = this.width
            screenshotCanvas.height = this.height
            context.drawImage(this.$refs.viewer, 0, 0, this.width, this.height)
            const screenshot = screenshotCanvas.toDataURL("image/png")
            let response = await (await fetch(this.api + "album/" + this.album_id + "/find_cluster", {
                method: 'POST',
                body: screenshot
            })).json()
            
            if (response.cluster == -1){
                this.errorMsg = "Unable to identify you"
            } else {
                this.$router.push({
                    name: "albumCluster",
                    params: {
                        cluster: response.cluster,
                        album_id: this.album_id
                    }
                })
            }
        }
    },
    mounted: function () {
        this.requestCamera()
    },
    beforeUnmount: function() {
        if (this.stream !== null) {
            this.stream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
    }
}
</script>
<template>
    <w-toolbar height="4em" fixed shadow>
      <RouterLink to="/">
        <w-icon :color="primary_color" size="2.5em">mdi mdi-image</w-icon>
      </RouterLink>
      <h1 class="title1 pa3">MemIMTo</h1>
    </w-toolbar>
    <w-flex grow column align-center justify-center>
        <w-icon size="5em" color="red" v-if="stream === null" class="pa2">mdi mdi-camera-off</w-icon>
        <video autoplay ref="viewer" style="max-width: 80%;" class="pa2"></video>
        <canvas ref="screenshot" style="display: none;"></canvas>
        <w-icon style="cursor:pointer;" @click="takePicture" class="pa2" size="4em" :color="primary_color">mdi mdi-image-filter-tilt-shift</w-icon>
        <w-alert error v-if="errorMsg != ''">{{ errorMsg }}</w-alert>
    </w-flex>
</template>