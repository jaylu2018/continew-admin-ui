<template>
  <div class="gi-footer">{{ appStore.getCopyright() }}</div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'

defineOptions({ name: 'GiFooter' })

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.gi-footer {
  height: 40px;
  font-size: 13px;
  color: var(--color-text-3);
  background-color: var(--color-bg-1);
  border-top: 1px dashed var(--color-neutral-3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
