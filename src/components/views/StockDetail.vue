<template>
  <!-- Content Wrapper. Contains page content -->



    <!-- Main content -->
  <section class="content">
    <h2>{{headerValue}}</h2>
    <!-- SELECT2 EXAMPLE -->
    <div class="row">
      <div class="col-md-7">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">Stock Details Of {{headerValue}}</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
            </div>
          </div><!-- /.box-header -->
          <div class="box-body">
            <div class="table-responsive">
              <table class="table no-margin">
                <thead>
                <tr>
                  <th class="text-center">Key</th>
                  <th class="text-center">Value</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, key, index) in formValue">
                  <td class="text-center"><b style="color: #0d6aad">{{key}}</b></td>
                  <td class="text-center">{{item}}</td>
                </tr>
                </tbody>
              </table>
            </div><!-- /.table-responsive -->
          </div><!-- /.box-body -->
          <div class="box-footer clearfix">

          </div><!-- /.box-footer -->
        </div>
      </div>
      <div class="col-md-5">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Stock Entry</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
            </div>
          </div><!-- /.box-header -->
          <div class="box-body">
            <div class="form-group" v-if="formValue.JUMP !== undefined">
              <label>Jump</label>
              <div class="input-group">
                <button  v-for="i in jump" v-model="jump" style="margin-left: 5px;"
                         :class="{'btn-btn-success' : jumpNew !== i, 'btn btn-primary' : jumpNew === i}" value="i" @click="addJumpValue('JUMP',i)"> {{i}} </button>
              </div><!-- /.input group -->
            </div><!-- /.form group -->

            <div class="form-group">

              <label>Profit Override</label>
              <div class="input-group">
                <button  v-for="i in profitOverride" style="margin-left: 5px;"
                         :class="{'btn btn-danger' : profitOverrideNew !== i, 'btn btn-primary' : profitOverrideNew === i}"
                         @click="addPropertyOverrideValue('profitOverride',i)"> {{i}} </button>
              </div>
              <!-- /.input group -->
            </div>
            <div class="box-footer clearfix">
              <button  class="btn btn-sm btn-success btn-flat pull-left" @click="onSubmit(headerValue)">Update</button>
            </div><!-- /.box-footer -->
            <!-- /.form group -->
            <!--<div class="form-group" v-for="(item, key, index) in formValue">
              <label>{{key}} - {{item}}</label>
            </div>-->
          </div><!-- /.box-body -->
         <!-- /.box-footer -->
        </div><!-- /.box -->

      </div>
    </div>






  </section><!-- /.content -->

</template>
<script>
  // Require needed datatables modules
  import axios from 'axios'
  const url = 'https://dining-out-dfec2.firebaseio.com/ROBOALGO108/.json'

  require('datatables.net')
  require('datatables.net-bs')

  export default {
    name: 'StockDetail',

    data() {
      return {
        headerValue: '',
        formValue: {},
        jump: [0, 1, 2, 3, 4, 5, 7, 8, 9],
        profitOverride: ['YES', 'NO', 'BUY', 'SELL'],
        jumpNew: '',
        profitOverrideNew: '',
        formSubmit: {}
      }
    },
    mounted() {
      this.fetchData()
      window.setInterval(() => {
        this.fetchData()
      }, 5000)
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.headerValue = this.$route.params.item
        this.getData(this.$route.params.item)
        console.log('this is the route params', this.$route.params.item)
      },

      getData(value) {
        axios.get(url).then(response => {
          this.filterData(response.data, value)
        })
      },

      filterData(data, value) {
        console.log('this is the data', data)
        console.log('this is the value', value)
        this.formValue = data[value]
        this.valueForInput(this.formValue)
      },

      valueForInput(value) {
        this.jumpNew = value.JUMP
        this.profitOverrideNew = value.profitOverride
      },
      addJumpValue(key, value) {
        this.formSubmit[key] = value
        this.jumpNew = value
      },
      addPropertyOverrideValue(key, value) {
        this.formSubmit[key] = value
        this.profitOverrideNew = value
      },

      alertDisplay() {
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      },

      onSubmit(value) {
        axios.patch(`https://dining-out-dfec2.firebaseio.com/ROBOALGO108/${this.headerValue}/.json`,
          this.formSubmit,
          {headers: {'Content-type': 'application/json'}
          })
          .then(response => {
            this.alertDisplay()
            this.fetchData()
          })
          .catch(error => {
            alert(error)
          })
      }
    }
  }
</script>

<style>
  /* Using the bootstrap style, but overriding the font to not draw in
     the Glyphicons Halflings font as an additional requirement for sorting icons.

     An alternative to the solution active below is to use the jquery style
     which uses images, but the color on the images does not match adminlte.

  @import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
  */

  @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

  table.dataTable thead .sorting:after,
  table.dataTable thead .sorting_asc:after,
  table.dataTable thead .sorting_desc:after {
    font-family: 'FontAwesome';
  }

  table.dataTable thead .sorting:after {
    content: '\f0dc';
  }

  table.dataTable thead .sorting_asc:after {
    content: '\f0dd';
  }

  table.dataTable thead .sorting_desc:after {
    content: '\f0de';
  }
</style>
