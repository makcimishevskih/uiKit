<script setup>
import MyButton from '@/components/MyButton'

const handle = () => {
  alert('handleClick')
}
</script>

<template>
  <h1 class='heading-1'>Button</h1>

  <h2 class='heading-2'>Event Click</h2>
  <div class='line'>
    <my-button @onClick='handle'>Primary</my-button>
    <my-button color='second' size='large' isOutlined @onClick='handle'>Secondary</my-button>
  </div>
  <h2 class='heading-2'>Size</h2>
  <div class='line'>
    <my-button>Primary</my-button>
    <my-button color='second' size='large' isOutlined>Secondary</my-button>
  </div>

  <h2 class='heading-2'>Icons</h2>
  <div class='line'>
    <my-button icon='hand'>Primary</my-button>
    <my-button icon='heart' color='second' isOutlined>Secondary</my-button>
    <my-button color='info' icon='address-book'>Info</my-button>
    <my-button color='warning' icon='credit-card' isOutlined>Warning</my-button>
    <my-button color='danger' icon='lemon'>Danger</my-button>
    <my-button color='success' icon='hourglass' isOutlined>Success</my-button>
  </div>

  <h2 class='heading-2'>Colors</h2>
  <div class='line'>
    <my-button>Primary</my-button>
    <my-button color='second'>Secondary</my-button>
    <my-button color='info'>Info</my-button>
    <my-button color='warning'>Warning</my-button>
    <my-button color='danger'>Danger</my-button>
    <my-button color='success'>Success</my-button>
  </div>


  <h2 class='heading-2'>Rounded</h2>
  <div class='line'>
    <my-button isRounded>Primary</my-button>
    <my-button color='second' isRounded>Secondary</my-button>
    <my-button color='info' isRounded>Info</my-button>
    <my-button color='warning' isRounded>Warning</my-button>
    <my-button color='danger' isRounded>Danger</my-button>
    <my-button color='success' isRounded>Success</my-button>
  </div>

  <h2 class='heading-2'>Disabled</h2>
  <div class='line'>
    <my-button isDisabled>Primary</my-button>
    <my-button color='second' isDisabled>Secondary</my-button>
    <my-button color='info' isDisabled>Info</my-button>
    <my-button color='warning' isDisabled isRounded>Warning</my-button>
    <my-button color='danger' isDisabled isRounded>Danger</my-button>
    <my-button color='success' isDisabled isRounded>Success</my-button>
  </div>
  <h2 class='heading-2'>Outlined</h2>
  <div class='line'>
    <my-button isOutlined>Primary</my-button>
    <my-button color='second' isOutlined>Secondary</my-button>
    <my-button color='info' isOutlined>Info</my-button>
    <my-button color='warning' isOutlined>Warning</my-button>
    <my-button color='danger' isOutlined>Danger</my-button>
    <my-button color='success' isOutlined>Success</my-button>
  </div>
</template>

<style scoped>
.line {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>
