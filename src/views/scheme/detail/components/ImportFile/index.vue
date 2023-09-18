<script lang="ts" setup>
import { downloadTemplate, checkExcel as checkExcelApi, doImport } from '@/api/commission'
import { UploadOutlined } from '@ant-design/icons-vue'
import { useVModel } from '@vueuse/core'
import { useRequest } from 'vue-request'
import { message, type UploadFile } from 'ant-design-vue'
import { useCustomUpload } from '@/hooks/useCustomUpload'
import { type UploadFileRes } from '@/api/file'

interface IProp {
  open?: boolean
  ruleId?: number
  title?: string
  refresh?: () => void
}

const props = withDefaults(defineProps<IProp>(), { open: false })
const emit = defineEmits(['update:open'])
defineOptions({ name: 'SchemeDetailImportFile' })

const visible = useVModel(props, 'open', emit)

function initState() {
  return {
    btnDisable: true,
    checkResult: undefined as CommissionApi.CheckExcelRes | undefined,
    fileList: [] as UploadFile<UploadFileRes>[],
  }
}

const uiState = shallowReactive(initState())

const { customUpload } = useCustomUpload()

const fetchTemplate = () => {
  if (!props.ruleId) return
  downloadTemplate(props.ruleId, props.title)
}

const uploadedFile = computed(() => uiState.fileList[0]?.response)

const { runAsync, loading: checking } = useRequest(checkExcelApi)

const checkExcel = async () => {
  if (!props.ruleId) return
  if (!uploadedFile.value) {
    message.error('请先上传文件')
    return
  }

  uiState.checkResult = await runAsync(props.ruleId, uploadedFile.value.fileId)
  if (uiState.checkResult?.checkResult) {
    uiState.btnDisable = false
  }
}

const downloadFailedFile = () => {
  if (!uiState.checkResult?.url) return
  window.open(uiState.checkResult.url)
}

const { runAsync: importExcel, loading: importLoading } = useRequest(doImport)
const handleOk = async () => {
  if (!props.ruleId) return
  if (!uploadedFile.value) {
    message.error('请先上传文件')
    return
  }

  const res = await importExcel(props.ruleId, uploadedFile.value.fileId)
  if (res) {
    message.success('导入成功')
    if (props.refresh) props.refresh()
    visible.value = false
  }
}

const handleCancel = () => {
  visible.value = false
}

watch(
  () => uiState.fileList,
  () => {
    uiState.checkResult = undefined
    uiState.btnDisable = true
  }
)

watch(
  () => visible.value,
  (val) => {
    if (!val) {
      Object.assign(uiState, initState())
    }
  }
)
</script>

<template>
  <AModal
    v-model:open="visible"
    title="导入结果"
    okText="确定导入"
    :okButtonProps="{ disabled: uiState.btnDisable, loading: importLoading }"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <ASpin :spinning="checking">
      <ol class="ol">
        <li>
          <span>点击此处</span>
          <AButton type="link" size="small" style="padding: 0" @click="fetchTemplate">下载导入模板</AButton>
        </li>
        <li>按模板格式，整理好数据</li>
        <li>
          <div class="step3">
            <span>上传整理好的数据文件</span>
            <div class="uploader">
              <AUpload v-model:file-list="uiState.fileList" accept=".xlsx,.xls" :maxCount="1" :customRequest="customUpload">
                <AButton size="small">
                  <template #icon>
                    <UploadOutlined />
                  </template>
                  上传文件
                </AButton>
              </AUpload>
            </div>
          </div>
        </li>
        <li>
          <span>点击此处</span>
          <AButton type="link" size="small" style="padding: 0" @click="checkExcel">校验数据格式</AButton>
          <AAlert v-if="uiState.checkResult !== undefined" :type="uiState.checkResult?.checkResult ? 'success' : 'error'" showIcon>
            <template #message>
              <span v-if="uiState.checkResult?.checkResult">校验通过，请开始导入</span>
              <template v-else>
                <span>校验不通过，点击此处</span>
                <AButton type="link" size="small" style="padding: 0" @click="downloadFailedFile">下载校验说明</AButton>
              </template>
            </template>
          </AAlert>
        </li>
      </ol>
    </ASpin>
  </AModal>
</template>

<style lang="less" scoped>
.ol {
  counter-reset: num;
  li {
    counter-increment: num;
    margin-bottom: @spacing-row-base;
    &::before {
      content: '第' counter(num) '步:';
      margin-right: @spacing-col-sm;
    }
  }
}
.step3 {
  display: inline-block;
  vertical-align: top;
  .uploader {
    margin-top: @spacing-row-sm;
  }
}
</style>
