<script>
import Toolbar from '../components/Toolbar.vue'

export default {
    inject: ["api", "primary_color"],
    props: {album: {required: true}},
    components: {Toolbar},
    data: function () {
        return {
            album: {},
            errorMsg: ""
        };
    },
    methods: {
        recluster: async function () {
            this.errorMsg = ""
            let response = await fetch(this.api + "recluster/" + this.album.id, {
                headers: {
                    "Authorization": this.jwt
                }
            })
            if (response.status == 401) this.$router.push("/login")
            else if (response.status != 200) this.errorMsg = "Something went wrong"
            else this.$router.push("/")
        },
        deleteAlbum: async function() {
            this.errorMsg = ""
            let response = await fetch(this.api + "delete/" + this.album.id, {
                headers: {
                    "Authorization": this.jwt
                }
            })
            if (response.status == 401) this.$router.push("/login")
            else if (response.status != 200) this.errorMsg = "Something went wrong"
        }
    },
    computed: {
        is_logged() {
            return this.$root.getCookie("jwt") != ""
        },
        jwt () {
            return this.$root.getCookie("jwt")
        },
    },
    mounted: function () {
        if (!this.is_logged) this.$router.push("/login")
    },
}
</script>
<template>
    <Toolbar :title="album.name"></Toolbar>
    <w-flex grow column align-center justify-center>
        <w-card>
            <w-flex wrap>
                <w-confirm :bg-color="primary_color" @confirm="recluster" class="ma1">Recluster</w-confirm>
                <w-confirm bg-color="error" @confirm="deleteAlbum" class="ma1">Delete</w-confirm>
                <w-alert v-if="errorMsg != ''" error>{{ errorMsg }}</w-alert>
            </w-flex>
        </w-card>
    </w-flex>
</template>