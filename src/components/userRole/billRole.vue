 <template>
  <div id="table_extend" style="width:100%">
    <el-table :data="checked_list" border height="60vh">
      <!-- 展开行 -->
      <el-table-column type="expand" width="50px">
        <template slot-scope="props">
          <tr
            class="el-table__row"
            v-for="(info,index) in props.row.infos"
            :key="index"
            style="width:100%"
          >
            <td
              colspan="1"
              :class="[`el-table_1_column_${index+1}`,'is-center','expand-td']"
              rowspan="1"
              v-for="(prop,index) in Object.keys(info)"
              :key="index"
              style="width:119px;"
            >
              <div class="cell" v-if="index == 0">{{info.name}}</div>
              <div class="cell" v-else>
                <el-checkbox
                  v-model="info[function_list[index]]"
                  :disabled="props.row[function_list[index]+'_disable']"
                  @change="info_checked(function_list[index],props.row.infos,props.row,info[function_list[index]],info.name)"
                ></el-checkbox>
              </div>
            </td>
          </tr>
        </template>
      </el-table-column>
      <!-- 其他行 -->
      <template>
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
                :disabled="scope.row[`${col.prop}`+'_disable']"
                :indeterminate="scope.row[col.prop+'_indeterminate']"
                @change="centext_checked(col.prop,scope.row[`${col.prop}`],scope.row.infos,scope.row,true)"
              ></el-checkbox>
            </div>
          </template>
        </el-table-column>
      </template>
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
      columns1: [
        {
          prop: "name",
          name: "模块名称"
        },
        {
          prop: "insert",
          indeterminate: false,
          name: "新增",
          checked: false
        },
        {
          prop: "edit",
          indeterminate: false,
          name: "编辑",
          checked: false
        },
        {
          prop: "del",
          indeterminate: false,
          name: "删除",
          checked: false
        },
        {
          prop: "view",
          indeterminate: false,
          name: "查看",
          checked: false
        },
        {
          prop: "print",
          indeterminate: false,
          name: "打印",
          checked: false
        },
        {
          prop: "audit",
          indeterminate: false,
          name: "审核",
          checked: false
        },
        {
          prop: "reaudit",
          indeterminate: false,
          name: "反审核",
          checked: false
        },
        {
          prop: "cancellation",
          indeterminate: false,
          name: "作废",
          checked: false
        },
        {
          prop: "reusing",
          indeterminate: false,
          name: "返作废",
          checked: false
        },
        {
          prop: "export",
          indeterminate: false,
          name: "导出",
          checked: false
        }
      ],
      columns: [],
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
      checked_list: [],
      bookId: 20,
      function_list: [],
      bill_group: [],
      data: [],
      user_id: 0,
      fun_info_map: new Map(),
      fun_group_map: new Map(),
      node: null
    };
  },
  mounted() {
    event.$on("load_role", node => {
      this.node = node;
      ColumnsList(this.bookId).then(res => {
        this.columns = res;
        this.function_list = [];
        this.columns.forEach(col => {
          this.function_list.push(col.prop);
          col.indeterminate = false;
        });
      });
      this.fun_info_map = new Map();
      this.data = [];
      this.user_id = node.userId;
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
    formatter_method() {
      let obj = {};
      this.function_list.forEach(func => {
        obj[func] = 0;
      });
      let sum = 0;
      this.checked_list.forEach(check_box => {
        sum += this.checked_list[0].infos.length;
        check_box.infos.forEach(info => {
          this.function_list.forEach(func => {
            if (info[func]) obj[func]++;
          });
        });
      });
      this.function_list.forEach(func => {
        // console.log(sum,obj[func] ,func)
        if (sum == obj[func]) {
          this.columns_checked(func);
        }
        if (obj[func] == 0) {
          this.columns_not_checked(func);
        } else {
          this.columns_indeterminate(func, false);
        }
      });
    },
    save_data() {
      SaveRole({ data: this.data, bookId: this.bookId }).then(res => {
        if (res.code) {
          if (res.code == 1) {
            this.$message({
              type: "success",
              message: "保存成功",
              duration: 2000
            });
            event.$emit("load_role", this.node);
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
      this.fun_info_map.forEach((value, key) => {
        let obj = this.fun_info_map.get(key);
        obj[field] = checked;
      });
      this.checked_list.forEach(checked_box => {
        checked_box[field] = checked;
        if (checked) {
          this.columns_indeterminate(field, false);
        }
        checked_box.infos.forEach(info => {
          info[field] = checked;
        });
        if (!checked) {
          checked_box[field + "_indeterminate"] = false;
        }
      });
    },
    // 分组点击
    centext_checked(field, value, infos, row, flag) {
      this.columns.forEach(col => {
        if (col.prop == field) {
          let check = 0;
          this.checked_list.forEach(checked_box => {
            if (checked_box[field]) check++;
          });
          if (check == 0) {
            // 全不选
            col.indeterminate = false;
            col.checked = false;
          } else if (check == this.checked_list.length) {
            // 全选
            col.indeterminate = false;
            col.checked = true;
          } else {
            // 一部分选中
            col.indeterminate = true;
            col.checked = false;
          }
        }
      });
      if (flag) {
        infos.forEach(info => {
          info[field] = value;
        });
        let names = this.fun_group_map.get(row.name);
        names.forEach(name => {
          let result = this.fun_info_map.get(name);
          result[field] = value;
        });
      }

      if (row != null) {
        row[field + "_indeterminate"] = false;
      }
    },
    // 单点
    info_checked(field, infos, row, value, name) {
      let result = this.fun_info_map.get(name);
      result[field] = value;
      let checked = 0;
      let not_checked = 0;
      infos.forEach(info => {
        if (info[field]) {
          checked++;
        } else {
          not_checked++;
        }
      });
      if (checked > 0 && not_checked > 0) {
        // 一部分选中
        row[field + "_indeterminate"] = true;
        row[field] = true;
        this.columns_indeterminate(field, true);
      } else if (checked == 0) {
        // 全不选
        row[field + "_indeterminate"] = false;
        row[field] = false;
        this.centext_checked(field, false, infos, row, false);
      } else if (not_checked == 0) {
        // 全选
        row[field + "_indeterminate"] = false;
        row[field] = true;
        this.centext_checked(field, true, infos, row, false);
      }
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
      console.log(field + " _________check");
      this.columns.forEach(col => {
        if (col.prop == field) {
          col.checked = true;
        }
      });
    },
    //表头不选中
    columns_not_checked(field) {
      console.log(field);
      this.columns.forEach(col => {
        if (col.prop == field) {
          col.checked = false;
        }
      });
    },
    default_data_init() {
      let map = new Map();
      if (this.checked_list.length != 0) {
        // this.function_list.forEach(key => {
        //   map.set(key, 0);
        // });
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
              // if (checkbox_row[key]) {
              //   map.set(key, map.get(key) + 1);
              // }
            }
          });
        });
        this.formatter_method();
        // map.forEach((value, key) => {
        //   if (value == this.checked_list.length) {
        //     this.columns_checked(key);
        //   } else if (value == 0) {
        //     this.columns_not_checked(key);
        //   } else {
        //     this.columns_indeterminate(key, true);
        //   }
        // });
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

