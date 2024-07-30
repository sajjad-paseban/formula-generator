<template>
    <fieldset>
        <legend>
            همه متغیر ها
        </legend>
        <span class="empty-variables" v-if="getVariables().length  == 0">
            درحال حاضر متغیری تعریف نشده است
        </span>
        <div class="card-variable" v-for="(item, variableIndex) in getVariables()" :key="variableIndex">
            <div class="variable">
                <span>
                    {{ item.name }}=
                </span>
                <span :title="item.type == 1 ? item.value.information : null">
                    {{ item.type == 1 ? item.value.name : item.value }}
                </span>
            </div>
            <div class="variable-menu">
                <button class="btn-delete button-4" @click="removeVariable(variableIndex)">
                    حذف
                </button>
                <button v-if="item.type == 1 && item.value.params" class="button-4" @click="showParameters(variableIndex)">
                    پارامترها
                </button>
            </div>
            <div class="card-parameters" v-if="item.type == 1 && item.value.params" :ref="'card_parameters_' + variableIndex">
                <div class="input-group" v-for="(value, parameterIndex) in convert(item.value.params)" :key="parameterIndex">
                    <label :for="value.id" :title="value.information">
                        <span>
                            ({{ value.id }})
                        </span>
                        {{ value.nickname }}
                    </label>
                    <input type="text" @keyup="setParameters(variableIndex, parameterIndex, $event)" :name="value.id" :id="value.id" :title="value.information">
                </div>
            </div>
        </div>
    </fieldset>
    
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useVariableStore } from '../stores/variable';
    
    interface IParamsParameter{
        id?: string,
        nickname?: string,
        information?: string,
        value?: string
    }
    interface IData {
        params: IParamsParameter[]  
    }

    export default defineComponent({
        name: 'all-variables',
        components: { 
        },
        data(): IData{
            return {
                params: []
            }
        },
        methods:{
            removeVariable(pos: number){
                useVariableStore().removeVariable(pos)
            },
            showParameters(index: number){
                (this.$refs['card_parameters_'+index] as Array<any>)[0].classList.toggle('show')
            },
            getVariables(){
                return useVariableStore().variable
            },
            convert(json: any){
                return JSON.parse(json)
            },
            setParameters(variableIndex: number, parameterIndex: number, e: any){
                const value = e.target.value
                useVariableStore().setParameter(variableIndex, parameterIndex, value)
            }
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
            border-radius: 3px;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;

            .variable{
                padding: 14px 10px;
            }
            .variable-menu{
                display: flex;
                position: absolute;
                top: -14px;
                right: 0;
                button{
                    margin: 0 2px;
                    font-size: 12px;
                    font-family: 'yekan';
                    padding: 2px 8px;
                }
                
            }
            .card-parameters{
                display: none;
                border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
                width: calc(100% - 20px);
                padding: 10px 10px;
                &.show{
                    display: block;
                }
                .input-group{
                    text-align: right;
                    input{
                        width: 100%;
                        margin: 2px 0;
                    }
                }
            }
        }
    }

</style>