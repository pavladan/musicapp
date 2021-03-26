<template>
  <div class="cover">
    <i class="bx bx-music" />
  </div>
</template>

<script>
export default {
  name: 'emptyCover'
}
</script>

<style scoped lang='scss'>
.cover {
  flex: 0 0 auto;
  border-radius: 50%;
  $size: 50px;
  width: $size;
  height: $size;
  background: rgba(var(--vs-text),.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: rgba(var(--vs-text),.7);
}
</style>
