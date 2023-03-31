<script>
import Toolbar from '../components/Toolbar.vue';

export default {
    inject: ['api', 'primary_color'],
    components: {Toolbar},
    data: function () {
        return {

        }
    }
}
</script>
<template>
    <Toolbar></Toolbar>
    <w-flex grow column align-center justify-center>
        <w-card>
            test
        </w-card>
    </w-flex>
</template>