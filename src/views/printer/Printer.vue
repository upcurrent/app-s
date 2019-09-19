<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" >
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
          <el-button type="danger" @click="batchDel" :disabled="batchDelDisable" plain>删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="printers"
      border
      style="width: 100%"
      height="700"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="url"
        label="路径"
        >
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false"  width="520px">
      <el-form :model="editForm" label-width="80px" :rules="editForm" ref="editForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="url" >
          <el-select v-model="editForm.url"  @click.native="handleCommand" placeholder="请选电脑已连接的打印机" style="width: 100%;" >
            <el-option v-for="i in list" :key="i" :label="i" :value="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false"  width="520px">
      <el-form :model="addForm" label-width="60px"  ref="addForm">
        <el-form-item label="名称" prop="name" >
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="url" >
          <el-select v-model="addForm.url" @click.native="handleCommand"  placeholder="请选电脑已连接的打印机" style="width: 100%;">
            <el-option v-for="i in list" :key="i" :label="i" :value="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>

  import {getPrinterList,getUnusedPrinterList,savePrinter,deletePrinter,batchDeletePrinter} from '../../api/api'

  export default {
    data() {
      return {
        printers:[],
        listLoading: false,
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        editFormVisible:false,
        editLoading:false,
        //新增界面数据
        editForm: {
          name: '',
          url:''
        },
        addForm: {
          name: '',
          url:''
        },
        list:[],
        multipleSelection:[],
        batchDelDisable : true
      }
    },
    methods:{
      loadPrinters(){
        getPrinterList(null).then((res)=>{
            this.printers = res;
        })
      },
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      handleDel:function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = { id: row.id };
          deletePrinter(para).then((res)=>{
            this.listLoading = false;
            //NProgress.done();
            if(res.flag){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }else {
              this.$message.error("删除失败");
            }

            this.loadPrinters();
          })
        }).catch(() => {

        });
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: 'xxx',
          url:''
        };
      },
      unusedPrinters:function(){
        getUnusedPrinterList(null).then((res)=>{
          this.list = res;
        })
      },
      addSubmit:function () {
        this.addLoading = true;
        //NProgress.start();
        let para = Object.assign({}, this.addForm);
        savePrinter(para).then((res) => {
          this.addLoading = false;
          //NProgress.done();
          if(res.flag){
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }else {
            this.$message.error("新增失败");
          }
          this.$refs['addForm'].resetFields();
          this.addFormVisible = false;
          this.loadPrinters();
        });
      },
      editSubmit:function () {
        this.editLoading = true;
        //NProgress.start();
        let para = Object.assign({}, this.editForm);
        savePrinter(para).then((res) => {
          this.editLoading = false;
          //NProgress.done();
          if(res.flag){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }else {
            this.$message.error("修改" +
              "失败");
          }
          this.$refs['editForm'].resetFields();
          this.editFormVisible = false;
          this.loadPrinters();
        });
      },
      handleCommand(command) {
        this.unusedPrinters();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if (this.multipleSelection.length !== 0){
          this.batchDelDisable = false
        }
      },
      batchDel:function () {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let param = [];
          for (let o of this.multipleSelection){
            param.push(o.id)
          }
          batchDeletePrinter(param).then((res=>{
            if(res.flag){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }else {
              this.$message.error("删除失败");
            }
          }))
          this.loadPrinters();
        });

      },
      printerFormat:function (i) {
        console.log(i);
      }
    },
    mounted() {
      this.loadPrinters();
    },
    watch:{
        printers:function (val) {
            console.log(val);
        }
    }
  }
</script>

<style>
  .el-dialog__body {
    padding: 30px;
  }
  .el-dialog__footer {
    padding: 10px 30px 20px 30px;
  }

</style>