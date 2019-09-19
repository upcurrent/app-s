<template>
  <section>
    <el-container id="cc">
      <el-aside width="200px">
        <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" node-key="id" style="margin-top: 60px"></el-tree>
      </el-aside>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">模板</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
          <el-form :inline="true" >
            <el-form-item>
              <el-button type="primary" @click="handleNew" :disabled="isDisabled">新增</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="createTemplate" :disabled="isDisabled">导入新模板</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" plain :disabled="isDisabled">删除</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-table :data="records" border style="width: 100%" height="680">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column align="center" prop="name" label="名称" >
          </el-table-column>

          <el-table-column align="center" prop="ticket" label="是否小票"  :formatter="ticketFormat">
          </el-table-column>

          <el-table-column
            align="center"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!--<el-button size="small" @click="handleDownload(scope.$index, scope.row)">下载</el-button>-->
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!--新增界面-->
    <el-dialog :title="title" :visible.sync="newVisible" :close-on-click-modal="false" width="520px">
      <el-form :model="newForm" label-width="70px"  ref="addForm">
        <el-form-item label="名称" prop="name" >
          <el-input v-model="newForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否小票">
          <el-switch v-model="newForm.ticket"></el-switch>
        </el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          accept=".jrxml"
          :limit="1"
          :action="uploadUrl_"
          :data="uploadData"
          :on-success="handSuccess"
          :on-change="handChange"
          :file-list="fileList"
          :auto-upload="false"
          :multiple="false"
          >
          <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="newVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" >提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>

  import {getFunList,getReportTemplateLis,uploadUrl,deleteReportTemplate,newTemplate,download,updateReportTemplate} from '../../api/api'

  export default {
    data() {
      return {
          isDisabled:false,
          data: [],
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          records:[],
          breadcrumb:[],
          newVisible:false,
          newForm:{
            id:0,
            funId:0,
            name:"",
            ticket:false
          },
          funId: null,
          fileList: [],
          uploadUrl_:uploadUrl,
          uploadData:{
            data:null
          },
          title:""
      };
    },
    methods: {
      handleNodeClick(node) {
        if (node.isLeaf){
          this.breadcrumb = this.getBreadcrumb(node);
          let params = {"funId":node.id};
          getReportTemplateLis(params).then((res=>{
            console.log(res);
            this.records = res;
          }))

        }
      },
      loadTree:function () {
        getFunList(null).then((res)=>{
          console.log(res);
          this.data = res;
        })
      },
      ticketFormat:function(row, column){
        return row.ticket?"是":"否";
      },
      addSubmit:function(){
          this.newForm.funId = this.funId;
          this.uploadData.data = JSON.stringify(this.newForm);
          if (this.fileList.length>0){
              this.$refs.upload.submit();
          }else {
              let params = this.newForm;
              updateReportTemplate(params).then((res=>{
                  this.newVisible=false;
              }))
          }
      },
      handleNew:function(){
        if (this.funId){
          this.title="新增";
          this.newVisible = true;
        }
      },
      handChange:function(file, fileList){
        this.fileList = fileList;
      },
      handSuccess:function(response, file, fileList){
        console.log(response);
        this.newVisible = false;
        this.newForm.funId=0;
        this.newForm.name=null;
        this.newForm.ticket=false;
        this.$refs.upload.clearFiles();
        let params = {"funId":this.funId};
        getReportTemplateLis(params).then((res=>{
          console.log(res);
          this.records = res;
        }))
      },
      handleEdit:function(index,row){
        this.newForm = row;
        this.newVisible = true;
      },
      handleDel:function(index,row){
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let params = {id:row.id};
          console.log(params);
          deleteReportTemplate(params).then((res=>{
            if (res.flag){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              let params = {"funId":this.funId};
              getReportTemplateLis(params).then((res=>{
                console.log(res);
                this.records = res;
              }))
            } else {
              this.$message.error("删除失败");
            }
          }))
        }).catch(() => {

        });
      },
      createTemplate:function(){
          let params = {funId:this.funId};
          this.axios({
              method:"post",
              url:newTemplate,
              data:params,
              responseType:"blob"
          }).then(response =>{
              let data = response.data;
              if (!data) {
                  return
              }
              let url = window.URL.createObjectURL(new Blob([data]));
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;

              let len = this.breadcrumb.length;
              let name = this.breadcrumb[len-1]+".jrxml";

              link.setAttribute('download', name);

              document.body.appendChild(link)
              link.click()
          }).catch(error=>{

          })
      },

      handleDownload:function(index,row){
          let params = {id:row.id};
          this.axios({
              method:"post",
              url:download,
              data:params,
              responseType:"blob"
          }).then(response =>{
              let data = response.data;
              if (!data) {
                  return
              }
              let url = window.URL.createObjectURL(new Blob([data]));
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;

              let name = row.name+".jrxml";

              link.setAttribute('download', name);

              document.body.appendChild(link)
              link.click()
          }).catch(error=>{

          })
      },
      getBreadcrumb:function(node){
        let n,s,t;
        for (let n_ of this.data){
          n = n_;
          for (let s_ of n_.children){
            s = s_
            for (t of  s_.children){if (t.id === node.id){this.funId = node.id; return [n.name,s.name,t.name];}
            }}}}
    },
    mounted() {
      this.loadTree();
    }
  };
</script>

<style>
  #cc .el-tree-node__content {
    height: 40px;
  }

</style>
