<template>
    <form>
        <label for="">
            نام متغیر
        </label>
        <input v-model="form.params.name" type="text">
       
        <label for="">
            مقدار متغیر
        </label>
        <input v-model="form.params.value" type="text">
       
        <button type="button" @click="confirm" class="button-8">
            ثبت
        </button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVariableStore } from "../stores/variable";

export default defineComponent({
    name: 'VariableForm',
    data(): any{
        return{
            form:{
                params:{
                    name: null,
                    value: null
                }
            },
            variableStore: useVariableStore()
        }
    },
    methods: {
        confirm(){
            this.variableStore.addVariable({
                name: this.form.params.name,
                value: this.form.params.value
            })
            this.form.params.name = null
            this.form.params.value = null

        }
    }
})

</script>

<style lang="scss" scoped>
    form{
        button{
            font-family: 'vazir';
            font-size: 9px;
            padding: 5px 8px;
            margin: 6px 0;
        }
    }
</style>