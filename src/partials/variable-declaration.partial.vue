<template>
    <fieldset>
        <legend>
            متغیر ها
        </legend>
        <variable-form />
    </fieldset>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import VariableForm from '../forms/VariableForm.vue';

    export default defineComponent({
        components: {
            VariableForm
        }
    })
</script>

<style lang="scss" scoped>
    fieldset{
        margin: 10px;
        border-radius: 3px;
        border: 1px solid rgba($color: #000000, $alpha: 0.1);
        font-family: 'vazir';
        font-size: 12px;
        legend{
            font-family: 'digital';
            font-size: 15px;
            margin-right: 10px;
            padding: 0 5px;
        }
        span.empty-variables{
            display: block;
            text-align: center;
            font-size: 10px;
            color: rgba($color: #000000, $alpha: 0.5);
        }
        padding: 5px;
    }

</style>