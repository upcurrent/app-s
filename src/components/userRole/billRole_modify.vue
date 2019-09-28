 <template>
  <div id="table_extend" style="width:100%">
    <el-table :data="copy_list" border height="60vh">
      <!-- 展开行 -->
      <el-table-column type="expand" width="50px">
        <template slot-scope="props">
          <tr
            class="el-table__row"
            v-for="(feild,index) in props.row.infos[Object.keys(props.row.infos)[0]]"
            :key="index"
            style="width:100%"
          >
            <td
              colspan="1"
              :class="[`el-table_1_column_${index+1}`,'is-center','expand-td']"
              rowspan="1"
              v-for="(prop,indez) in function_list"
              :key="indez"
              style="width:119px;"
            >
              <div class="cell" v-if="indez == 0">{{props.row.infos.name[index]}}</div>
              <div class="cell" v-else>
                <!-- v-model="info[function_list[index]]"
                  :disabled="props.row[function_list[index]+'_disable']"
                @change="info_checked(function_list[index],props.row.infos,props.row,info[function_list[index]],info.name)"-->
                <el-checkbox
                  v-model="props.row.infos[prop][index]"
                  :disabled="props.row[function_list[indez]+'_disable']"
                  @change="info_checked(prop,props.row.infos[prop],props.row,props.row.infos[prop][index],indez)"
                ></el-checkbox>
              </div>
            </td>
          </tr>
        </template>
      </el-table-column>
      <!-- 其他行 -->
      <el-table-column align="center" width="119px" v-for="(col,index) in columns" :key="index">
        <template slot="header" slot-scope="scope">
          <div v-if="index == 0">{{col.name}}</div>
          <div v-else>
            <el-checkbox
              @change="checked_header(col.prop,col.checked,scope)"
              v-model="col.checked"
              :indeterminate="col.indeterminate"
              :label="col.name"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <div v-if="index == 0">{{scope.row.name}}</div>
          <div v-else>
            <el-checkbox
              v-model="scope.row[`${col.prop}`]"
              :indeterminate="scope.row[`${col.prop}`+'_indeterminate']"
              @change="centext_checked(col.prop,scope.row[`${col.prop}`],scope.row.infos[col.prop],index)"
            ></el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div>
        <el-button type="primary" @click="save_data">保存</el-button>
      </div>
    </template>
  </div>
</template>
 <script>
import { FunctionList, ColumnsList, BillGroup, SaveRole } from "../../api/api";
import event from "../../event/evnet.js";
export default {
  data() {
    return {
      columns: [
        {
          checked: false,
          indeterminate: false,
          name: "模块名称",
          prop: "name"
        },
        {
          checked: false,
          indeterminate: false,
          name: "新增",
          prop: "insert"
        },
        {
          checked: false,
          indeterminate: false,
          name: "编辑",
          prop: "edit"
        },
        {
          checked: false,
          indeterminate: false,
          name: "删除",
          prop: "del"
        },
        {
          checked: false,
          indeterminate: false,
          name: "查看",
          prop: "view"
        },
        {
          checked: false,
          indeterminate: false,
          name: "打印",
          prop: "print"
        },
        {
          checked: false,
          indeterminate: false,
          name: "审核",
          prop: "audit"
        },
        {
          checked: false,
          indeterminate: false,
          name: "反审核",
          prop: "reaudit"
        },
        {
          checked: false,
          indeterminate: false,
          name: "作废",
          prop: "cancellation"
        },
        {
          checked: false,
          indeterminate: false,
          name: "反作废",
          prop: "reusing"
        },
        {
          checked: false,
          indeterminate: false,
          name: "导出",
          prop: "export"
        }
      ],
      example: {
        name: "",
        insert: false,
        edit: false,
        del: false,
        view: false,
        print: false,
        audit: false,
        reaudit: false,
        cancellation: false,
        reusing: false,
        export: false,
        infos: []
      },
      checked_list: [
        {
          name: "某某订单",
          insert: false,
          edit: false,
          del: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          cancellation: false,
          reusing: false,
          export: false,
          infos: [
            {
              name: "info1",
              insert: false,
              edit: false,
              del: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              cancellation: false,
              reusing: false,
              export: false
            },
            {
              name: "info2",
              insert: false,
              edit: false,
              del: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              cancellation: false,
              reusing: false,
              export: false
            },
            {
              name: "info3",
              insert: false,
              edit: false,
              del: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              cancellation: false,
              reusing: false,
              export: false
            },
            {
              name: "info4",
              insert: false,
              edit: false,
              del: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              cancellation: false,
              reusing: false,
              export: false
            }
          ]
        },
        {
          name: "2",
          insert: false,
          edit: false,
          del: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          cancellation: false,
          reusing: false,
          export: false,
          infos: []
        },
        {
          name: "3",
          insert: false,
          edit: false,
          del: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          cancellation: false,
          reusing: false,
          export: false,
          infos: []
        },
        {
          name: "4",
          insert: false,
          edit: false,
          del: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          cancellation: false,
          reusing: false,
          export: false,
          infos: []
        }
      ],
      bookId: 0,
      function_list: [
        "name",
        "insert",
        "edit",
        "del",
        "view",
        "print",
        "audit",
        "reaudit",
        "cancellation",
        "reusing",
        "export"
      ],
      bill_group: [],
      data: [],
      user_id: 0,
      fun_info_map: new Map(),
      fun_group_map: new Map(),
      group_mapker_map: new Map(),
      maker_obj: {},
      copy_list: [
        {
          name: "4",
          insert: false,
          edit: false,
          del: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          cancellation: false,
          reusing: false,
          export: false,
          infos: {
            audit: [false, false, false, false],
            cancellation: [false, false, false, false],
            del: [false, false, false, false],
            edit: [false, false, false, false],
            export: [false, false, false, false],
            insert: [false, false, false, false],
            name: ["info1", "info2", "info3", "info4"],
            print: [false, false, false, false],
            reaudit: [false, false, false, false],
            reusing: [false, false, false, false],
            view: [false, false, false, false]
          }
        },
        {
          name: "2",
          insert: false,
          edit: false,
          del: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          cancellation: false,
          reusing: false,
          export: false,
          infos: {
            audit: [false, false, false, false],
            cancellation: [false, false, false, false],
            del: [false, false, false, false],
            edit: [false, false, false, false],
            export: [false, false, false, false],
            insert: [false, false, false, false],
            name: ["info1", "info2", "info3", "info4"],
            print: [false, false, false, false],
            reaudit: [false, false, false, false],
            reusing: [false, false, false, false],
            view: [false, false, false, false]
          }
        },
        {
          name: "3",
          insert: false,
          edit: false,
          del: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          cancellation: false,
          reusing: false,
          export: false,
          infos: {
            audit: [false, false, false, false],
            cancellation: [false, false, false, false],
            del: [false, false, false, false],
            edit: [false, false, false, false],
            export: [false, false, false, false],
            insert: [false, false, false, false],
            name: ["info1", "info2", "info3", "info4"],
            print: [false, false, false, false],
            reaudit: [false, false, false, false],
            reusing: [false, false, false, false],
            view: [false, false, false, false]
          }
        }
      ]
    };
  },
  mounted() {
    this.checked_list.forEach(check_row=>{
        let obj = this.clone(check_row);
        obj.infos.forEach(info=>{
        })
        // this.copy_list.push(obj);
    })
    this.copy_list.forEach(copy => {
      this.function_list.forEach(func => {
        copy[func + "_indeterminate"] = false;
      });
    });
    ColumnsList(1).then(res => {
      this.columns = res;
      this.columns.forEach(col => {
        this.function_list.push(col.prop);
      });
    });
    event.$on("load_role", node => {
      this.fun_info_map = new Map();
      this.data = [];
      this.user_id = node.userId;
      this.columns.forEach(col => {
        col.indeterminate = false;
      });
      FunctionList(node).then(res => {
        this.checked_list = res;
        this.default_data_init();
      });
      BillGroup(node).then(res => {
        this.bill_group = res;
        this.bill_group.forEach(bill => {
          let arr = [];
          bill.funInfos.forEach(info => {
            this.fun_info_map.set(info.name, {
              fun_id: info.funId,
              user_id: this.user_id
            });
            this.data.push(this.fun_info_map.get(info.name));
            arr.push(info.name);
          });
          this.fun_group_map.set(bill.name, arr);
        });
      });
    });
  },
  methods: {
    save_data() {
      SaveRole(this.data).then(res => {
        if (res.code) {
          if (res.code == 1) {
            this.$message({
              type: "success",
              message: "保存成功",
              duration: 2000
            });
          } else {
            this.$message({
              type: "warning",
              message: "保存失败" + res.message,
              duration: 2000
            });
          }
        }
      });
    },
    // 头部点击
    checked_header(field, checked, scope) {
      this.copy_list.forEach(copy => {
        copy[field] = checked;
        this.centext_checked(field,checked,copy.infos[field],null);
      });
    },
    // 分组点击
    centext_checked(field, value, infos, index) {
        console.log(field, value, infos);
      for (let index in infos) {
        infos[index] = value;
      }
      let arr = [];
      this.copy_list.forEach(copy => {
        arr.push(copy[field]);
      });
      if (index!=null) {
        let flag = this.array_check(arr);
        switch (flag) {
          case 1:
            this.columns[index]["indeterminate"] = false;
            this.columns[index].checked = true;
            break;
          case -1:
            this.columns[index]["indeterminate"] = false;
            this.columns[index].checked = false;
            break;
          case 0:
            this.columns[index]["indeterminate"] = true;
            this.columns[index].checked = false;
            break;
        }
      }
    },
    // 单点
    info_checked(field, infos, row, value,indez) {
      let flag = this.array_check(infos);
      switch (flag) {
        case 1:
          row[field + "_indeterminate"] = false;
          row[field] = true;
          break;
        case -1:
          row[field + "_indeterminate"] = false;
          row[field] = false;
          this.centext_checked(field, value, infos, indez);
          break;
        case 0:
          row[field + "_indeterminate"] = true;
          row[field] = false;
          this.columns_indeterminate(field,true);
          break;
      }
    },
    array_check(arr) {
      let check = 0;
      arr.forEach(item => {
        if (typeof item == "boolean" && item) check++;
      });
      if (check == 0) {
        return -1;
      }
      if (check == arr.length) {
        return 1;
      }
      return 0;
    },
    // 表头选择不确定
    columns_indeterminate(field, value) {
      this.columns.forEach(col => {
        if (col.prop == field) {
          col.indeterminate = value;
        }
      });
    },
    //表头选中
    columns_checked(field) {
      this.columns.forEach(col => {
        if (col.prop == field) {
          col.checked = true;
        }
      });
    },
    //表头不选中
    columns_not_checked(field) {
      this.columns.forEach(col => {
        if (col.prop == field) {
          col.checked = false;
        }
      });
    },
    default_data_init() {
      let map = new Map();
      if (this.checked_list.length != 0) {
        Object.keys(this.checked_list[0]).forEach(key => {
          if (
            key != "name" &&
            key.includes("_indeterminate") == false &&
            key.includes("_disable") == false &&
            key != "infos"
          ) {
            map.set(key, 0);
          }
        });
        this.checked_list.forEach(checkbox_row => {
          Object.keys(checkbox_row).forEach(key => {
            if (
              key != "name" &&
              key.includes("_indeterminate") == false &&
              key.includes("_disable") == false &&
              key != "infos"
            ) {
              // checkbox_row[key + "_disable"] = false;
              let check = 0;
              checkbox_row["infos"].forEach(info => {
                Object.keys(info).forEach(field => {
                  if (field == key && info[key]) check++;
                });
              });
              if (check == checkbox_row["infos"].length) {
                checkbox_row[key + "_indeterminate"] = false;
                checkbox_row[key] = true;
              } else if (check == 0) {
                checkbox_row[key + "_indeterminate"] = false;
                checkbox_row[key] = false;
              } else {
                checkbox_row[key + "_indeterminate"] = true;
                checkbox_row[key] = false;
              }
              if (checkbox_row[key]) {
                map.set(key, map.get(key) + 1);
              }
            }
          });
        });
        map.forEach((value, key) => {
          if (value == this.checked_list.length) {
            this.columns_checked(key);
          } else if (value == 0) {
            this.columns_not_checked(key);
          } else {
            this.columns_indeterminate(key, true);
          }
        });
      }
    }
  }
};
</script>
<style>
#table_extend .el-table__expanded-cell {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 49px;
}
.expand-td {
  border-right: 0 !important;
  border-left: 1px solid #ebeef5;
}
#table_extend .el-table__expand-column {
  width: 49px !important;
}
.slot::-webkit-scrollbar {
  width: 2px;
}
.slot::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 50px;
  background: #eee;
}
.slot::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #e4e7ed;
  border-radius: 2px;
  background: #e4e7ed;
}
</style>

