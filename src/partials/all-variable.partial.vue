<template>
    <fieldset>
        <legend>
            همه متغیر ها
        </legend>
        <span class="empty-variables" v-if="getVariables().length  == 0">
            درحال حاضر متغیری تعریف نشده است
        </span>
        <div class="card-variable" v-for="(item, index) in getVariables()" :key="index">
            <div class="variable">
                <span>
                    {{ item.name }}=
                </span>
                <span>
                    {{ item.value }}
                </span>
            </div>
            <button class="btn-delete button-4" @click="removeVariable(index)">
                حذف
            </button>
        </div>
    </fieldset>

</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useVariableStore } from '../stores/variable';
    
    export default defineComponent({
        name: 'all-variables',
        components: { 
        },
        data(){
            return {
            }
        },
        methods:{
            removeVariable(pos: number){
                useVariableStore().removeVariable(pos)
            },
            getVariables(){
                return useVariableStore().variable
            },
        },
        
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
        .card-variable{
                background-color: #ECF0F1;
                direction: ltr;
                padding: 5px 10px;
                border-radius: 3px;
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 5px 0;
                button.btn-delete{
                    font-size: 12px;
                    font-family: 'yekan';
                    padding: 2px 10px;
                }
        }
    }

</style>