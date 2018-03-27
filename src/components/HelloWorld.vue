<template>
  <div class="hello">
    <group>
      <router-link v-for="item in pages" :key="item.key" :to='{name: item.name,params:{id:item.id}}'>
        <CellBox is-link>
          {{item.name}}
        </CellBox>
      </router-link>
    </group>
  </div>
</template>

<script>
  import {
    Group,
    CellBox
  } from 'vux'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        pages: [{
            key: "singer",
            name: "singer",
            id: "aa"
          },
          {
            key: "album",
            name: "album",
            id: "aa"
          },
          {
            key: "rank",
            name: "rank",
            id: "aa"
          },
          {
            key: "cd",
            name: "cd",
            id: "aa"
          },
        ]
      }
    },
    components: {
      Group,
      CellBox
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
