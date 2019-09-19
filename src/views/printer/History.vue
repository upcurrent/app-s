<template>
  <section>
    <el-container id="dd">
      <el-header style="height: 100px; margin-top: 30px">
          <el-form :inline="true" :model="printSearch1"  label-width="80px" label-position="right" style="margin-bottom: 20px;width:100%">
            <el-row style="margin-bottom: 20px">
                <el-col :span="6">
                  <el-form-item label="时间">
                    <el-date-picker
                            v-model="date"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="应用">
                  <el-select v-model="printSearch1.yingyong" placeholder="请选择软件">
                    <el-option label="YTT6" value="ytt6"></el-option>
                    <el-option label="YTA5" value="yta5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="账套">
                  <el-select v-model="printSearch1.zhangtao" placeholder="请选择账套">
                    <el-option label="账套 1" value="zt 1"></el-option>
                    <el-option label="账套 2" value="zt 2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col  :span="6">
                <el-form-item label="账套用户">
                  <el-select v-model="printSearch2.ztUser" placeholder="请选择账套用户">
                    <el-option label="用户 1" value="yh 1"></el-option>
                    <el-option label="用户 2" value="yh 2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col  :span="6">
                <el-form-item label="ERP用户">
                  <el-select v-model="printSearch2.erp" placeholder="请选择ERP用户">
                    <el-option label="ERP用户 1" value="ytt6"></el-option>
                    <el-option label="ERP用户 2" value="yta5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col  :span="6">
                <el-form-item label="功能模块">
                  <el-select v-model="printSearch2.gongneng" placeholder="请选择功能模块">
                    <el-option label="采购单据" value="zt 1"></el-option>
                    <el-option label="销售单据" value="zt 2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col  :span="6">
                <el-form-item>
                  <el-button type="primary">查询</el-button>
                  <el-button>重置</el-button>
                </el-form-item>
              </el-col>
              </el-row>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="records" border style="width: 100%;" max-height="600">
          <el-table-column align="center" prop="funName" label="功能" >
          </el-table-column>
          <el-table-column align="center" prop="bookName" label="账套" >
          </el-table-column>
          <el-table-column align="center" prop="userName" label="用户" >
          </el-table-column>
          <el-table-column align="center" prop="date" label="时间"  :formatter="dateFormat">
          </el-table-column>
          <el-table-column
                  align="center"
                  label="操作"
                  width="250">
            <template slot-scope="scope">
              <el-button size="small" @click="handleShow(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>



    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[20, 40, 50, 100]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="详细" :visible.sync="dialogVisible"  :before-close="dialogClose">
      <el-container>
        <el-main>
          <el-table :data="detailed" border  @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column align="center" prop="printerName" label="打印机" >
            </el-table-column>
            <el-table-column align="center" prop="templateName" label="模板" >
            </el-table-column>
            <el-table-column align="center" prop="state" label="状态" :formatter="formatState" >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    >
              <template slot-scope="scope">
                <el-button size="small" @click="handleShowPdf(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <!--工具条-->
          <el-col  class="toolbar" style="">
<!--             @command="handleCommand()"-->
            <el-dropdown>
              <el-button type="primary" size="small" >
                打印<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" >
<!--                <el-dropdown-item v-for=" it in printerList"  :command="it.id">-->
<!--                  {{ it.name }}-->
<!--                </el-dropdown-item>-->
                <template v-for="item in printerList">
                  <el-dropdown-item @click.native="handleCommand(item.id)" >{{ item.name }}</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-footer>
      </el-container>

    </el-dialog>

  </section>
</template>



<script>


  import {getRecord,getRecordDetailed,url,getPrinterList,printHistory} from '../../api/api'

  export default {
    data() {
      return {
        printSearch1: {

          date: '',
          yingyong: '',
          zhangtao: '',
        },
        printSearch2: {
          ztUser: '',
          erp: '',
          gongneng: '',
        },

        records:[],
        size:20,
        current:1,
        total:0,
        detailed:[],
        dialogVisible:false,
        printerList:[],
        multipleSelection:[],
        taskId:null
      }
    },
    methods:{

      handleShow: function (index, row) {
        this.dialogVisible=true;
        this.taskId = row.id;
        getRecordDetailed({"taskId":row.id}).then((res)=>{
          this.detailed = res;
        })
      },
      load:function(){
        let page = {
            "size":this.size,
            "current":this.current
        };
        getRecord(page).then((res)=>{
            this.total = res.total;
            this.records = res.records;
        })
      },
      handleSizeChange(val) {
        this.size = val;
        this.load();
      },
      handleCurrentChange(val) {
        this.current = val;
        this.load();
      },
      dateFormat(row){
        let date = row.date;
        if (date === undefined){
          return "";
        }
        return new Date(row.date).Format("yyyy-MM-dd hh:mm:ss");
      },
      formatState:function (row){
        return row.state === 1 ? '打印成功' : row.state === -1 ? '打印失败' : '未知';
      },
      handleShowPdf:function (index,row) {
        window.open(url+"/print/pdf/"+row.id);
      },
      loadPrinterList:function () {
        getPrinterList(null).then((res)=>{
          this.printerList=res;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      dialogClose:function (done) {
        this.multipleSelection = [];
        done();
      },
      composeValue:function(item){
        return {
          'button': item
        }
      },
      handleCommand:function (command) {
        if (this.multipleSelection.length === 0){
          this.$message({
            message: '请选择记录',
            type: 'warning'
          });
        }else {
          let data = {
            printerId:command,
            taskId:this.taskId,
            detailedList:[]
          };
          for(let obj of this.multipleSelection){
            data.detailedList.push({
              detailedId:obj.id
            })
          }
          printHistory(data).then((res=>{
            if(res.flag){
              this.$message({
                message: '数据已传输到打印机',
                type: 'success'
              });
              this.load();
            }else {
              this.$message.error("打印失败:"+res.msg);
            }
          }))
        }
      }
    },
    mounted() {
      this.load();
      this.loadPrinterList();
    }
  }
</script>

<style>
  #dd .el-form-item{
    margin-bottom: 0;
  }
  .el-pagination {
    padding: 20px 20px 0 0;
    float: right;
  }
</style>