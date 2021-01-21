<template>
  <div>
    <el-button icon="el-icon-search" circle v-on:click="query"></el-button>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="value"
      style="float: right"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="change">
    </el-pagination>
  </div>
</template>
<script>
  import * as cmsApi from "./../api/cms";
  export default {
    data() {
      return {
        total: 50,
        params: {
          size: 5,
          page: 1,
        },
        list: []
      }
    },
    methods: {
      query: function () {
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          console.log(res);
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;
        });
        // alert("查询");
      },
      change: function (page) {
        // alert(page);
        this.params.page = page;
        this.query();
      }
    },
    //钩子函数，页面渲染完毕后触发
    mounted(){
      this.query();
    },
  }
</script>
