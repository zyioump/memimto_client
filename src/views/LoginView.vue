<script>
import Toolbar from '../components/Toolbar.vue';

export default {
    inject: ['api', 'primary_color'],
    components: {Toolbar},
    data: function () {
        return {
            valid: null,
            validators: {
                required: value => !!value || 'This field is required'
            },
            name: "",
            password: "",
            errorMsg: ""
        }
    },
    methods: {
        login: async function () {
            this.errorMsg = ""
            let formData = new FormData
            formData.append("name", this.name)
            formData.append("password", this.password)
            let response = await fetch(this.api + "login", {
                method: "POST",
                body: formData
            })

            if (response.status == 200){
                response = await response.json()
                document.cookie = "jwt="+response.token
                this.$router.push("/")
            } else {
                this.errorMsg = "Unvalid credential"
            }
        }
    }
}
</script>
<template>
    <Toolbar></Toolbar>
    <w-flex grow column align-center justify-center>
        <w-card>
            <w-toolbar :bg-color="primary_color">
                <h1 class="title3">Login</h1>
            </w-toolbar>
            <w-form v-model="valid" class="mt4">
                <w-input v-model="name" label="Name" :validators="[validators.required]"></w-input>
                <w-input v-model="password" label="Password" type="password" :validators="[validators.required]"></w-input>
                <w-button @click="login" class="mt4" style="width: 80vw;" type="submit" :disabled="valid === false">Login</w-button>
            </w-form>
            <w-alert error v-if="errorMsg != ''">{{ errorMsg }}</w-alert>
        </w-card>
    </w-flex>
</template>