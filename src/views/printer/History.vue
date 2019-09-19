<template>
  <section>

    <el-table :data="records" border style="width: 100%">
      <el-table-column align="center" prop="funName" label="功能" width="200">
      </el-table-column>
      <el-table-column align="center" prop="bookName" label="账套" width="200">
      </el-table-column>
      <el-table-column align="center" prop="userName" label="用户" width="200">
      </el-table-column>
      <el-table-column align="center" prop="date" label="时间" width="200" :formatter="dateFormat">
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleShow(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[20, 40, 50, 100]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="详细" :visible.sync="dialogVisible" width="55%" >
      <el-table :data="detailed" border style="width: 100%">
        <el-table-column align="center" prop="printerName" label="打印机" width="200">
        </el-table-column>
        <el-table-column align="center" prop="templateName" label="模板" width="200">
        </el-table-column>
        <el-table-column align="center" prop="state" label="状态" :formatter="formatState" width="200">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleShowPdf(scope.$index, scope.row)">查看</el-button>
            <el-dropdown @command="handleCommand">
              <el-button type="primary" size="small" >
                打印<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item v-for="item in printerList" :key="item.id" :command="item.id">
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </section>
</template>

<script>


  import {getRecord,getRecordDetailed,url,getPrinterList} from '../../api/api'

  export default {
    data() {
      return {
        records:[],
        size:20,
        current:1,
        total:0,
        detailed:[],
        dialogVisible:false,
        printerList:[]
      }
    },
    methods:{
      handleShow: function (index, row) {
        this.dialogVisible=true;
        getRecordDetailed({"taskId":row.id}).then((res)=>{
          console.log(res);
          this.detailed = res;
        })
      },
      load:function(){
        let page = {
            "size":this.size,
            "current":this.current
        };
        getRecord(page).then((res)=>{
            console.log(res);
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
      dateFormat(row, column){
        let date = row.date;
        if (date === undefined){
          return "";
        }
        return new Date(row.date).Format("yyyy-MM-dd hh:mm:ss");
      },
      formatState:function (row, column){
        return row.state === 1 ? '打印成功' : row.state === -1 ? '打印失败' : '未知';
      },
      handleShowPdf:function (index,row) {
        window.open(url+"/pdf/"+row.id);
      },
      handlePrint:function (index,row) {

      },
      loadPrinterList:function () {
          getPrinterList(null).then((res)=>{
              this.printerList=res;
          })
      },
      handleCommand:function (command) {
          this.$message('click on item ' + command);
      }
    },
    mounted() {
      this.load();
      this.loadPrinterList();
    }
  }
</script>
