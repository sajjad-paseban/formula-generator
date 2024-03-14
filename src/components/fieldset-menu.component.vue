<template>
    <div class="fieldset-menu">
        <ul>
            <li id="tools">
                <span>
                    ابزار +
                </span>
                <div class="fieldset-sub-menu-tools">
                    <ul>
                        <li @click="addTool('IF_TOOL')">
                            اگر
                            <span>
                                (if)
                            </span>
                        </li>
                        <li @click="addTool('ASIGN_VARIABLE_TOOL')">
                            مقداردهی متغیرها
                            <span>
                                (asign value)
                            </span>
                        </li>
                        <li>
                            در غیر اینصورت
                            <span>
                                (else)
                            </span>
                        </li>
                    </ul>
                </div>
            </li>   
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { useConditionStore } from "../stores/condition";
    export default defineComponent({
        name: 'fieldset-menu',
        methods: {
            addTool(param: string){
                if(param === "ASIGN_VARIABLE_TOOL")
                    useConditionStore().addCondition({
                        id: param,
                        body: ''
                    })
                else
                    useConditionStore().addCondition({
                        id: param,
                        statement: [],
                        body: ''
                    })
            }
        }
    })
</script>


<style lang="scss" scoped>
.fieldset-menu{
    position: absolute;
    top: -23px;
    left: 5px;
    ul{
        display: flex;
        list-style: none;
        li{
            margin: 0 5px;
            position: relative;
            span{
                background-color: #e1ecf4;
                border: 1px solid #7aa7c7;
                color: #7aa7c7;
                padding: 3px 5px;
                border-radius: 5px;
                font-size: 10px;
                font-family: 'yekan';
                cursor: pointer;
            }
            
            &[id=tools]{
                .fieldset-sub-menu-tools{
                    position: absolute;
                    left: 0;
                    background-color: #e1ecf4;
                    border: 1px solid #7aa7c7;
                    width: 120px;   
                    height: auto;  
                    margin-top: 2px;
                    display: none; 
                    z-index: 5;
                    border-radius: 2px;
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        padding: 5px;
                        li{
                            width: 100%;
                            padding: 3px 5px;
                            margin: 2px 2px;
                            background-color: #fefefe;
                            border-radius: 3px;
                            user-select: none;
                            cursor: pointer;
                            span{
                                background-color: transparent;
                                border: none;
                                font-family: Arial;
                                font-size: 12px;
                                position: relative;
                                left: 6px;
                            }
                        }
                    }
                }

                &:hover{
                    .fieldset-sub-menu-tools{
                        display: block;
                    }

                }
            }
        }
    }
}
</style>