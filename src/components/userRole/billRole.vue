 <template>
  <div id="table_extend" style="width:100%">
    <el-table :data="checked_list" border>
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
                  v-model="info[prop]"
                  :disabled="props.row[prop+'_disable']"
                  @change="info_checked(prop,props.row.infos,props.row,info[prop])"
                ></el-checkbox>
              </div>
            </td>
          </tr>
        </template>
      </el-table-column>
      <!-- 其他行 -->
      <el-table-column align="center" width="119px" v-for="(col,index) in columns" :key="index">
        <template slot="header" slot-scope="scope">
          <div v-if="index == 0">{{col.label}}</div>
          <div v-else>
            <el-checkbox
              @change="checked_header(col.prop,col.checked,scope)"
              v-model="col.checked"
              :indeterminate="col.indeterminate"
              :label="col.label"
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
              @change="centext_checked(col.prop,scope.row[`${col.prop}`],scope.row.infos,scope.row)"
            ></el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
import { getUserNode, FunctionList } from "../../api/api";
import event from "../../event/evnet.js";
export default {
  data() {
    return {
      columns: [
        {
          checked: false,
          indeterminate: false,
          label: "模块名称",
          prop: "name"
        },
        {
          checked: false,
          indeterminate: false,
          label: "新增",
          prop: "insert"
        },
        {
          checked: false,
          indeterminate: false,
          label: "编辑",
          prop: "edit"
        },
        {
          checked: false,
          indeterminate: false,
          label: "删除",
          prop: "delete"
        },
        {
          checked: false,
          indeterminate: false,
          label: "查看",
          prop: "view"
        },
        {
          checked: false,
          indeterminate: false,
          label: "打印",
          prop: "print"
        },
        {
          checked: false,
          indeterminate: false,
          label: "审核",
          prop: "audit"
        },
        {
          checked: false,
          indeterminate: false,
          label: "反审核",
          prop: "reaudit"
        },
        {
          checked: false,
          indeterminate: false,
          label: "作废",
          prop: "throw"
        },
        {
          checked: false,
          indeterminate: false,
          label: "反作废",
          prop: "rethrow"
        },
        {
          checked: false,
          indeterminate: false,
          label: "导出",
          prop: "export"
        }
      ],
      checked_list: [
        {
          name: "1",
          insert: false,
          edit: false,
          delete: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          throw: false,
          rethrow: false,
          export: false,
          infos: [
            {
              name: "info1",
              insert: false,
              edit: false,
              delete: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              throw: false,
              rethrow: false,
              export: false
            },
            {
              name: "info2",
              insert: false,
              edit: false,
              delete: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              throw: false,
              rethrow: false,
              export: false
            },
            {
              name: "info3",
              insert: false,
              edit: false,
              delete: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              throw: false,
              rethrow: false,
              export: false
            },
            {
              name: "info4",
              insert: false,
              edit: false,
              delete: false,
              view: false,
              print: false,
              audit: false,
              reaudit: false,
              throw: false,
              rethrow: false,
              export: false
            }
          ]
        },
        {
          name: "2",
          insert: false,
          edit: false,
          delete: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          throw: false,
          rethrow: false,
          export: false,
          infos: []
        },
        {
          name: "3",
          insert: false,
          edit: false,
          delete: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          throw: false,
          rethrow: false,
          export: false,
          infos: []
        },
        {
          name: "4",
          insert: false,
          edit: false,
          delete: false,
          view: false,
          print: false,
          audit: false,
          reaudit: false,
          throw: false,
          rethrow: false,
          export: false,
          infos: []
        }
      ],
      bookId: 0,
      function_list: []
    };
  },
  mounted() {
    event.$on("load_role", node => {
      FunctionList(node.bookId).then(res => {
        this.checked_list = res;
        this.default_data_init();
      });
    });
    this.checked_list.forEach(checked_box => {
      Object.keys(checked_box).forEach(field => {
        if (field != "name") {
          checked_box[field + "_indeterminate"] = false;
          checked_box[field + "_disable"] = false;
        }
      });
    });
  },
  methods: {
    // 头部选中
    checked_header(field, checked, scope) {
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
    // 分组选中
    centext_checked(field, value, infos, row) {
      this.columns.forEach(col => {
        if (col.prop == field) {
          let checked = 0;
          let not_checked = 0;
          this.checked_list.forEach((checked_box, indez) => {
            if (checked_box[field]) {
              checked++;
            } else {
              not_checked++;
            }
          });
          if (checked > 0 && not_checked > 0) {
            // 一部分选中
            col.indeterminate = true;
            col.checked = false;
          } else if (checked == 0) {
            // 全不选
            col.indeterminate = false;
            col.checked = false;
          } else if (not_checked == 0) {
            // 全选
            col.indeterminate = false;
            col.checked = true;
          }
        }
      });
      infos.forEach(info => {
        info[field] = value;
      });
      if (row != null) {
        row[field + "_indeterminate"] = false;
      }
    },
    info_checked(field, infos, row, value) {
      let checked = 0;
      let not_checked = 0;
      infos.forEach(info => {
        if (info[field]) {
          checked++;
        } else {
          not_checked++;
        }
      });
      console.log(row);
      if (checked > 0 && not_checked > 0) {
        // 一部分选中
        row[field + "_indeterminate"] = true;
        row[field] = true;
        this.columns_indeterminate(field, true);
      } else if (checked == 0) {
        // 全不选
        row[field + "_indeterminate"] = false;
        row[field] = false;
        this.centext_checked(field, false, infos, null);
      } else if (not_checked == 0) {
        // 全选
        this.centext_checked(field, true, infos, null);
        row[field + "_indeterminate"] = false;
        row[field] = true;
      }
      console.log({ ...arguments });
    },
    // 表头选择不确定
    columns_indeterminate(field, value) {
      this.columns.forEach(col => {
        if (col.prop == field) {
          col.indeterminate = value;
        }
      });
    },
    default_data_init() {
      let obj = {
        insert: false,
        edit: false,
        delete: false,
        view: false,
        print: false,
        audit: false,
        reaudit: false,
        throw: false,
        rethrow: false,
        export: false
      };
      console.log(this.checked_list)
      this.checked_list.forEach(func => {
        func = Object.assign({name:func.name,infos:func.infos},this.clone(obj));
        func.infos.forEach(info =>{
          info = Object.assign({name:info.name},this.clone(obj));
        })
      });
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

