<template>
    <fieldset>
        <legend>
            خروجی
        </legend>
        <div class="content">
            <fieldset>
                <legend>
                    قطعه کد تولید شده
                </legend>
                {{ code }}
            </fieldset>

            <fieldset>
                <legend>
                    نتیجه
                </legend>

                {{ result }}
            </fieldset>
        </div>
    </fieldset>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: 'output',
        props: ['code', 'result']
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
            font-size: 14px;
            margin-right: 10px;
            padding: 0 5px;
        }
        .content{
            display: flex;
            flex-direction: row-reverse;
            fieldset{
                legend{
                    text-align: right;;
                }
                direction: ltr;
                width: 100%;
                padding: 5px;
            }
        }
    }
</style>