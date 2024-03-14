<template>
    <div class="index-view">
        <section class="menu">
            <h3>
                فرمول ساز
            </h3>
            <fieldset>
                <legend>
                    متغیر ها
                </legend>
                <variable-form />
            </fieldset>
            
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

            <ul class="sub-menu">
                <li>
                    <a class="button-3" @click="save()">
                        ذخیره
                    </a>
                </li>
                <li>
                    <a class="button-3 bg-danger">
                        خروج
                    </a>
                </li>
            </ul>
        </section>
        <section class="content">
            
            
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

            <Output v-if="true" :code="code" :result="response" />
        </section>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import VariableForm from '../forms/VariableForm.vue';
    import { useVariableStore } from '../stores/variable';
    import { useConditionStore } from '../stores/condition';
    import FieldsetMenuComponent from '../components/fieldset-menu.component.vue';
    import StatementMenuComponent from '../components/statement-menu.component.vue';
    import { conditionToPhpCode, variablesToPhpCode } from '../helper/functions';
    import Output from '../partials/output.partial.vue'
    export default defineComponent({
        name: 'IndexView',
        components: { 
            VariableForm,
            FieldsetMenuComponent,
            StatementMenuComponent,
            Output
        },
        data(){
            return {
                response: null,
                code: ''
            }
        },
        methods:{
            removeVariable(pos: number){
                useVariableStore().removeVariable(pos)
            },
            getVariables(){
                return useVariableStore().variable
            },
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
            save(){
                const variables = variablesToPhpCode(useVariableStore().variable);
                const condition = conditionToPhpCode(useConditionStore().process_condition, useVariableStore().variable);
                let data = new FormData();
                const code = variables + "\n" + condition
                this.code = code;

                data.append('code', code);

                fetch('http://localhost/back-formula-app/public/api/compiler/run',{
                    method: 'POST',
                    body: data
                })
                .then(res => res.json())
                .then(response => this.response = response)
            }
        },
        
    })
</script>

<style scoped lang="scss">
    .index-view{
        display: flex;    
        .menu{
            background-color: #fff;
            width: calc(200px + 10px);
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            border-left: 2px solid rgba($color: #000000, $alpha: 0.1);
            
            h3{
                font-family: 'yekan';
                text-align: center;
                padding: 10px 0;
                color: rgba($color: #000000, $alpha: 0.5);
                font-size: 18px;
                border-bottom: 2px solid rgba($color: #000000, $alpha: 0.1);
            }

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
            
            ul.sub-menu{
                display: flex;
                list-style: none;
                justify-content: start;
                padding: 5px 10px;
                li{
                    margin: 0 2px;
                    a{
                        font-size: 12px;
                        font-family: 'yekan';
                        padding: 2px 8px;
                    }
                }       
            }

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
        .content{
            overflow-y: auto;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: calc(100% - 210px);
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
        }
    }
</style>