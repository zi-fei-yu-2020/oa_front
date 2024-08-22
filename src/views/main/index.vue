<template>
  <div>首页</div>
</template>



<script setup>
import { ref } from "vue";
// import CountTo from '@/components/CountTo.vue'
// import { get_statistics } from '@/api/api.js'

const panels = ref([]);
// panels.value = [
//     {
//         title: '工单数量',
//         value: 60,
//         unit: '月',
//         unitColor: 'success',
//         subTitle: '总工单数',
//         subValue: 200,
//         subUnit: ''
//     },
//     {
//         title: '待运维审批',
//         value: 49,
//         unit: '天',
//         unitColor: 'success',
//         subTitle: '总审批数量',
//         subValue: 100,
//         subUnit: ''
//     },
//     {
//         title: '正在发布中',
//         value: 49,
//         unit: '天',
//         unitColor: 'success',
//         subTitle: '总发布数量',
//         subValue: 49,
//         subUnit: ''
//     },
//     {
//         title: '完成工单数',
//         value: 49,
//         unit: '月',
//         unitColor: 'success',
//         subTitle: '总完成率',
//         subValue: 49,
//         subUnit: ''
//     }
// ]
// get_statistics().then((res) => {
//   panels.value = res.data.result.data;
//   // console.log(panels.value);
// });
</script>