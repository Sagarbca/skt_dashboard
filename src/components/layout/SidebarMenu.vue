<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
  <li class="header">STOCKS</li>
    <router-link tag="li" class="pageLink" v-for="menu in menuList" :to="{ name: 'StockDetails', params: { item: menu } }" >
      <a>
        <i class="fa fa-circle-o text-yellow"></i>
        <span class="page"> {{menu}}</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
  import axios from 'axios'
  const url = 'https://dining-out-dfec2.firebaseio.com/ROBOALGO108/.json'
  export default {
    name: 'SidebarMenu',
    data() {
      return {
        menuList: [],
        msg: ''
      }
    },

    mounted: async function() {
      axios.get(url).then(response => {
        this.filterKeys(response.data)
      })
    },

    methods: {
      filterKeys(value) {
        this.menuList = Object.keys(value)
        console.log('this is the MenuList', this.menuList)
      }
    }
  }
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
