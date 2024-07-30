<template>
    <form>
        <label for="">
            نام متغیر
        </label>
        <input v-model="form.params.name" type="text">
       
        <label for="">
            نوع متغیر
        </label>
        <select v-model="form.params.type">
            <option value="0">
                مقدار ثابت
            </option>
            <option value="1">
                مقدار سیستمی
            </option>
        </select>
        <div v-if="form.params.type == 0">
            <label for="">
                مقدار متغیر
            </label>
            <input v-model="form.params.value" type="text">
        </div>
        <div v-if="form.params.type == 1">
            <label for="">
                جست و جوی متغیر
            </label>
            <select v-model="form.params.value">
                <option v-for="(item, index) in variables" :key="index" :value="item">
                    {{ item.name }}
                </option>
            </select>
        </div>
        <button type="button" @click="confirm" class="button-8">
            ثبت
        </button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAll } from "../services/variables.service";
import { useVariableStore } from "../stores/variable";

export default defineComponent({
    name: 'VariableForm',
    data(): any{
        return{
            form:{
                params:{
                    name: null,
                    type: null,
                    value: null
                }
            },
            variables: null,
        }
    },
    methods: {
        confirm(){
            useVariableStore().addVariable({
                name: this.form.params.name,
                type: this.form.params.type,
                value: this.form.params.value
            })
            this.form.params.name = null
            this.form.params.type = null
            this.form.params.value = null

        }
    },
    async mounted(){
        this.variables = (await getAll().then(res => res)).data
    }
})

</script>

<style lang="scss" scoped>
    form{
        select{
            display: block;
            width: 100%;
            margin: 5px 0;
        }
        button{
            font-family: 'vazir';
            font-size: 9px;
            padding: 5px 8px;
            margin: 6px 0;
        }
    }
</style>