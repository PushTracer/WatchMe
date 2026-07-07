import { ref } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
	const cloud = ref("未选中");
	const monitorData = ref();

	const params = ref({
		tencentcloud: {
			credential: {
				secretId: "",
				secretKey: "",
			},
			region: "",
			profile: {
				httpProfile: {
					endpoint: "",
				},
			},
		},
	});
	const server = ref(null);

	function setInstanceMonitorData(data) {
		monitorData.value = data;
	}

	return { params, server, cloud, monitorData, setInstanceMonitorData };
});
