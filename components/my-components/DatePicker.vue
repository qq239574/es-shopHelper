<template>
    <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
        <slot></slot>
    </picker>
</template>
<script>
import {getDate} from './getDateSection.js'
    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                date: currentDate,
            }
        },
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            }
        },
        methods: {
            bindDateChange: function(e) {
                this.date = e.target.value; 
                this.$emit('change',this.date)
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                if (type === 'start') {
                    return getDate(-90)
                     
                } else if (type === 'end') {
                     return getDate(0)
                }
            }
        }
    }
</script>