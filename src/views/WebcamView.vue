<script>
export default {
    inject: ['api'],
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
                this.errorMsg = "Face not found"
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
    }
}
</script>
<template>
    <div v-if="stream === null">Cannot access webcam</div>
    <video autoplay ref="viewer"></video>
    <canvas ref="screenshot" style="display: none;"></canvas>
    <br/>
    <input type="button" value="Show album" @click="takePicture">
    <p v-if="errorMsg != ''" style="color: red;">{{ errorMsg }}</p>

</template>