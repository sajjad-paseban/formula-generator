import { defineStore } from "pinia";
import { ref } from "vue";

interface IVariableStore{
    name?: string,
    value?: string
}

export const useVariableStore = defineStore("variable-store", () =>{
    const variable: IVariableStore[] | any = ref<IVariableStore[] | any>([]);


    function addVariable(params: IVariableStore){
        variable.value.push(params)
    }

    function removeVariable(pos: number){
        (variable.value as Array<IVariableStore>).splice(pos,1)
    }

    return {
        variable,
        addVariable,
        removeVariable
    }
       
});