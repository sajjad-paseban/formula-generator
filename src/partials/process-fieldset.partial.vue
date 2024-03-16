<template>
    <fieldset>
        <legend>
            پردازنده
        </legend>
        
        <FieldsetMenuComponent />
        <div class="process-card" v-for="(value, index) in getConditions()" :key="index">
            <div v-if="value.id === 'IF_TOOL'">
                <div class="process-card-header">
                    <span>
                        عبارت شرطی
                    </span>
                    <ul>
                        <li>
                            <button class="button-4">
                                نمایش عملیات
                            </button>
                        </li>
                        <li>
                            <button @click="removeCondition(index)" class="button-4">
                                حذف
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="process-card-title">
                    <span v-if="value.id == 'IF_TOOL'">
                        اگر
                    </span>
                    <span v-if="value.id == 'ELSE_TOOL'">
                        در غیر اینصورت
                    </span>
                    <span class="statement-item" v-for="(st, indexSt) in value.statement" :key="indexSt" @click="removeStatementItem(index, indexSt, value.statement.length)">
                        {{  st.type === "variable" || st.type === "static_value" || st.type === "calc_value" ? st.nickname + ' ' + st.value : st.nickname }}
                    </span>
                    <StatementMenuComponent :index="index" />
                </div>
                <div class="process-card-body">
                    <textarea @keyup="changeBody(index)" ref="body" name=""></textarea>
                </div>
            </div>

            <div v-else-if="value.id === 'ASIGN_VARIABLE_TOOL'">
                <div class="process-card-header">
                    <span>
                        مقدار دهی متغیرها
                    </span>
                    <ul>
                        <li>
                            <button @click="removeCondition(index)" class="button-4">
                                حذف
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="process-card-body">
                    <textarea style="height: 20px;" @keyup="changeBody(index)" ref="body" name=""></textarea>
                </div>
            </div>
        </div>
    </fieldset>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useConditionStore } from '../stores/condition';
    import FieldsetMenuComponent from '../components/fieldset-menu.component.vue';
    import StatementMenuComponent from '../components/statement-menu.component.vue';
    export default defineComponent({
        name: 'process-fieldset',
        components: { 
            FieldsetMenuComponent,
            StatementMenuComponent,
        },
        data(){
            return {
            }
        },
        methods:{
            getConditions(){
                return useConditionStore().process_condition
            },
            removeCondition(pos: number){
                useConditionStore().removeCondition(pos)
            },
            removeStatementItem(indexParent: number, indexStatement: number, length: number){
                if(indexStatement == length - 1)
                    useConditionStore().removeStatementItem(indexParent, indexStatement)
            },
            changeBody(pos: number){
                useConditionStore().addBody(
                    pos,
                    (this.$refs.body as Array<any>)[pos].value
                )
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
        position: relative;
        padding: 5px;
        
        .process-card{
            background-color: #fefefe;
            border-radius: 4px;
            margin: 5px 0;
            .process-card-header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 10px;
                border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
                span{
                    color: #ABB2B9;
                    font-size: 10px;
                }
                ul{
                    display: flex;
                    list-style: none;
                    li{
                        margin: 0 2px;
                        button{
                            font-family: 'yekan';
                            font-size: 10px;
                            padding: 0.5px 5px;
                        }
                    }
                }
            }
            .process-card-title{
                padding: 10px;
                border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                
                span.statement-item{
                    margin: 0 3px;
                    background-color: #FAFBFC;
                    color: #000;
                    border: 1px solid rgba(27, 31, 35, 0.15);
                    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
                    border-radius: 10px;
                    font-size: 11px;
                    padding: 2px 8px;
                    border-radius: 6px;
                }
            }
            .process-card-body{
                padding: 10px;
                textarea{
                    padding: 10px;
                    width: calc(100% - 20px);
                    resize: none;
                    height: 40px;
                    direction: ltr;
                }
            }
        }
    }
</style>