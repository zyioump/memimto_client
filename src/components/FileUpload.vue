<template>
    <input type="file" ref="file"/>
    <input type="button" value="Upload" @click="submit"/>
    <p v-if="currentChunk > 0">Upload progress : {{ 100 * currentChunk / file.size }}%</p>
    <p v-if="errorMsg != ''" style="color: red">{{ errorMsg }}</p>
</template>

<script>
export default {
    inject: ['api'],
    data: function () {
        return {
            errorMsg: "",
            chunkSize: 6000000,
            currentChunk: 0,
            file: null
        }
    },
    methods: {
        submit () {
            this.errorMsg = ""
            this.file = null
            this.currentChunk = 0
            if (this.$refs.file.files.length == 1) {
                this.file = this.$refs.file.files[0]
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
                req.onload = (event) => {
                    if (event.target.status == 200) {
                        this.uploadChunk()
                    } else {
                        this.errorMsg = "Server refused"
                    }
                }
                req.send(chunk);
                this.currentChunk += chunk.size
            }
        }
    },
}
</script>