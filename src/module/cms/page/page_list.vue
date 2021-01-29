<template>
  <div>
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点" style="width: 120px">
        <el-option
          v-for="item in siteList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="params.pageAliase" placeholder="请输入页面别名" style="width: 150px"></el-input>
      <el-button type="primary" icon="el-icon-search" circle v-on:click="query"></el-button>
      <el-button type="primary" icon="el-icon-plus" circle @click="add()"></el-button>

    </el-form>
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
      <el-table-column label="操作" width="150">
        <template slot-scope="page">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit" circle
            @click="edit(page.row.pageId)">
          </el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete" circle
            @click="del(page.row.pageId)">
          </el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-info" circle
            @click="preview(page.row.pageId)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      style="float: right"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>
<script>
  import * as cmsApi from "./../api/cms";

  export default {
    data() {
      return {
        siteList: [{
          id: "5a751fab6abb5044e0d19ea1",
          name: "门户主站"
        }],
        total: 50,
        params: {
          size: 5,
          page: 1,
          pageAliase: "",
          siteId: ""
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
      },
      add: function () {
        this.$router.push({
          path: '/cms/page/add/', query: {
            page: this.params.page,
            siteId: this.params.siteId
          }
        })
      },
      edit: function (pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId, query: {
            page: this.params.page,
            siteId: this.params.siteId
          }
        })
      },
      del: function (pageId) {
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          cmsApi.page_delete(pageId).then((res) => {
            console.log(res);
            if (res.success) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              //查询页面
              this.query()
            } else {
              this.$message.error('删除失败');
            }
          });
        });
      },
      preview:function (pageId) {
        window.open("http://www.xuecheng.com/cms/preview/"+pageId)
      }
    },
    //钩子函数，页面渲染完毕后触发
    mounted() {
      this.query(
        this.params.page = Number.parseInt(this.$route.query.page || 1),
        this.params.siteId = this.$route.query.siteId || ''
      );
    },
  }
</script>
