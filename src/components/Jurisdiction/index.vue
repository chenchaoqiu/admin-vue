<template>
    <button
      class="fl el-button fl el-button--primary el-button--medium"
      tab-btn
      type="primary"
      v-if="jurisdiction[0]"
      :name="tData"
      @click="tClick" >
      {{tName}}
    </button>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'jurisdiction',
    props: {
      tName: {
        type: String
      },
      tData: {
        type: String,
        default: null
      },
      tClick: {
        type: Function,
        default: null
      }
    },
    computed: {
      ...mapGetters([
        'jurisdiction'
      ])
    },
    mounted() {

    }
  };
</script>

<style scoped>

</style>
