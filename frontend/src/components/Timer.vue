<template>
    <div>
        <small>
            <p class="text-danger m-2">Retentez à nouveau dans {{limit.min}} minutes</p>
        </small>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    name: 'Timer',
    computed: {
        ...mapGetters({
            limit: 'limit',
        }),
    },
}

</script>
