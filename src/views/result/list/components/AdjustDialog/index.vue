<script lang="ts" setup>
import { resultAdjust, cancelAdjust } from '@/api/result'
import { useVModel } from '@vueuse/core'
import { type SelectProps, message, type FormInstance, type FormProps } from 'ant-design-vue'
import { useRequest } from 'vue-request'
import { ResultStatus } from '../../providers'

interface IProp {
  visible: boolean
  record?: Record<string, any>
  needCalc: boolean
  commissionType?: number
  refresh: () => void
}

const props = withDefaults(defineProps<IProp>(), { record: () => ({}) })
const emit = defineEmits<{ 'update:visible': [] }>()
defineOptions({ name: 'ResultListTableAdjustDialog' })

const SYMBOLS = ['+', '-']

const SYMBOL_OPTIONS: SelectProps['options'] = SYMBOLS.map((symbol) => ({
  label: symbol,
  value: symbol,
}))

const visible = useVModel(props, 'visible', emit)

const formRef = ref<FormInstance>()

const disabledFlag = shallowReactive({
  showCancelAdjust: false,
  amount: false,
  desc: false,
})

const formModel = shallowReactive({
  symbol: SYMBOLS[0],
  amount: undefined as number | undefined,
  desc: '',
})

const rules: FormProps['rules'] = {
  amount: [
    {
      required: true,
      message: '请输入调整结果',
    },
    {
      validator: (_, value) => {
        if (value === 0) {
          return Promise.reject(new Error('调整金额不能为0'))
        }
        return Promise.resolve()
      },
      message: '调整金额不能为0',
    },
  ],
  desc: [
    {
      required: true,
      message: '请输入调整说明',
    },
  ],
}

const { runAsync: fetchData, loading } = useRequest(resultAdjust)

const onSubmit = async () => {
  const valid = await formRef.value?.validate().catch((err) => {
    console.error('(╯°Д°)╯︵ ┻━┻', err)
  })
  if (!valid) return
  if (!props.record || !props.commissionType) {
    message.error('Props数据错误')
    return
  }
  const { account, cycle } = props.record
  const resp = await fetchData({
    account,
    commissionType: props.commissionType,
    cycle,
    needCalc: props.needCalc,
    desc: formModel.desc,
    amount: parseFloat(`${formModel.symbol}${formModel.amount}`),
  })
  if (resp) {
    message.success('调整成功!')
    props.refresh()
    visible.value = false
  }
}

const { runAsync: adjustCancel, loading: cancelLoading } = useRequest(cancelAdjust)

const handleAdjustCancel = async () => {
  if (!props.record?.adjust.id) {
    message.error('调整ID不存在')
    return
  }
  const res = await adjustCancel(props.record?.adjust.id)
  if (res) {
    message.success('取消调整成功!')
    props.refresh()
    visible.value = false
  }
}

watchEffect(() => {
  if (props.visible && props.record) {
    const isConfirmed = props.record.confirmedStatus === ResultStatus['已确认']
    disabledFlag.showCancelAdjust = false
    disabledFlag.amount = isConfirmed
    disabledFlag.desc = isConfirmed

    const adjust = props.record.adjust
    let symbol = SYMBOLS[0]
    let amount, desc
    if (adjust) {
      // 有调整记录才显示取消调整按钮
      disabledFlag.showCancelAdjust = !isConfirmed
      symbol = adjust.amount > 0 ? SYMBOLS[0] : SYMBOLS[1]
      if (adjust.amount) {
        amount = Math.abs(adjust.amount)
      }
      desc = adjust.desc
      if (desc) {
        // 有调整说明一定可编辑
        disabledFlag.desc = false
      }
    }

    formModel.symbol = symbol ?? SYMBOL_OPTIONS[0].value
    formModel.amount = amount
    formModel.desc = desc
  } else {
    formRef.value?.resetFields()
  }
})
</script>

<template>
  <AModal v-model:open="visible" title="激励结果调整">
    <ASpin :spinning="loading">
      <AForm ref="formRef" :model="formModel" :rules="rules" :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }">
        <AFormItem label="结果调整" name="amount">
          <AInputNumber v-model:value="formModel.amount" :disabled="disabledFlag.amount" :min="0" :precision="2">
            <template #addonBefore>
              <ASelect v-model:value="formModel.symbol" :options="SYMBOL_OPTIONS" :disabled="disabledFlag.amount" />
            </template>
          </AInputNumber>
        </AFormItem>
        <AFormItem label="调整说明" name="desc">
          <ATextarea v-model:value="formModel.desc" :autoSize="{ minRows: 3, maxRows: 5 }" :disabled="disabledFlag.desc" :maxlength="300" />
        </AFormItem>
      </AForm>
    </ASpin>
    <template #footer>
      <template v-if="disabledFlag.showCancelAdjust">
        <ATooltip title="取消结果调整并清空调整说明" placement="top">
          <AButton :loading="cancelLoading" danger @click="handleAdjustCancel">取消调整</AButton>
        </ATooltip>
      </template>
      <AButton @click="visible = false">取消</AButton>
      <AButton type="primary" @click="onSubmit">确定</AButton>
    </template>
  </AModal>
</template>
