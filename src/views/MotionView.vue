<script setup>
import { ref, watch } from 'vue';
import { useComputersStore } from '@/stores/mycomputers';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import VChart from 'vue-echarts';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent]);

const route = useRoute();
const store2 = useComputersStore();

const uuid = ref(route.params.uuid);

const convertToGB = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(2);

const memoryChartOption = ref(null);
const diskChartOptions = ref([]);

const buildMemoryOption = (memory) => ({
  title: {
    text: '内存使用情况',
    subtext: '单位：MB',
    left: 'center',
    top: '2%',
  },
  grid: { top: '20%' },
  series: [{
    type: 'pie',
    radius: '70%',
    center: ['50%', '55%'],
    data: [
      { value: memory.used, name: '已使用' },
      { value: memory.free, name: '空闲' }
    ],
    label: {
      show: true,
      position: 'inside',
      formatter: '{b}: {c}MB ({d}%)'
    }
  }],
});

const buildDiskOptions = (diskUsage) =>
  (diskUsage || []).map(disk => ({
    title: {
      text: `${disk.fs} 硬盘使用情况`,
      left: 'center',
      top: '2%',
      textStyle: { fontSize: 12 }
    },
    grid: { top: '20%' },
    series: [{
      type: 'pie',
      radius: '70%',
      center: ['50%', '55%'],
      data: [
        { value: convertToGB(disk.used), name: '已使用' },
        { value: convertToGB(disk.available), name: '空闲' }
      ],
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}: {c}GB ({d}%)'
      }
    }]
  }));

const fetchAndUpdateCharts = () => {
  store2.getCurrentComputer(uuid.value);
  if (store2.computerNow) {
    if (store2.computerNow.memory) {
      memoryChartOption.value = buildMemoryOption(store2.computerNow.memory);
    }
    diskChartOptions.value = buildDiskOptions(store2.computerNow.disk?.diskusage);
  }
};

onMounted(() => {
  fetchAndUpdateCharts();
});

watch(() => route.params.uuid, (newUuid) => {
  uuid.value = newUuid;
  fetchAndUpdateCharts();
});
</script>
<template>
  <!-- ECharts 容器 -->
  <div class="chart-container">
    <v-chart v-if="memoryChartOption" :option="memoryChartOption" class="chart-item"></v-chart>
    <div v-for="(option, index) in diskChartOptions" :key="index">
      <v-chart :option="option" class="chart-item"></v-chart>
    </div>
  </div>
</template>
<style scoped>
.chart-container {
  display: flex;
  justify-content: left;
  gap: 15px
}

.chart-item {
  width: 250px;
  height: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .1);
  border-radius: 8px;
  overflow: hidden
}
</style>