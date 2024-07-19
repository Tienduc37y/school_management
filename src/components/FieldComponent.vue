<script setup>
import Label from "./LabelComponent.vue";
import ErrorMessage from "./ErrorMessage.vue";

const props = defineProps({
  label: String,
  required: Boolean,
  error: String,
});
</script>
<template>
  <div>
    <Label class="pb-2" v-if="props.label" :for="props.id" :required="props.required">{{
      props.label
    }}</Label>

    <slot v-bind="props" />
    
    <div class="max-h-4 h-4">
      <ErrorMessage v-show="props.error">
        {{ props.error }}
      </ErrorMessage>
    </div>
  </div>
</template>
