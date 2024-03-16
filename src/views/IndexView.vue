<template>
    <div class="index-view">
        <section class="menu">
            <h3>
                فرمول ساز
            </h3>
            <variable-declaration-partial />
            <all-variable-partial />
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
            
            <process-fieldset-partial />

            <Output v-if="true" :code="code" :result="response" />
        </section>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useVariableStore } from '../stores/variable';
    import { useConditionStore } from '../stores/condition';
    import { conditionToPhpCode, variablesToPhpCode } from '../helper/functions';
    import Output from '../partials/output.partial.vue';
    import AllVariablePartial from '../partials/all-variable.partial.vue';
    import VariableDeclarationPartial from '../partials/variable-declaration.partial.vue';
    import ProcessFieldsetPartial from '../partials/process-fieldset.partial.vue';
    import { getAll } from '../services/variables.service';
    export default defineComponent({
        name: 'IndexView',
        components: { 
            Output,
            AllVariablePartial,
            VariableDeclarationPartial,
            ProcessFieldsetPartial
        },
        data(){
            return {
                response: null,
                code: ''
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
        async mounted(){
            const response = await getAll().then(res => res);
        }
        
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
        }
        .content{
            overflow-y: auto;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: calc(100% - 210px);
        }
    }
</style>