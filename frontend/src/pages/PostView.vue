<template>
    <div>
        PostView for post {{ postId }}
    </div>
</template>

<script>
export default {
  name: 'PostView',
  props: {
    postId: String
  }
}
</script>