 <template>
  <div>
    <el-table :data="checked_list" border>
      <el-table-column align="center" v-for="col in columns" :key="col.id">
        <template slot="header" v-if="col.id == '1'">
          <div>{{col.label}}</div>
        </template>
        <template  scope="scope" v-if="col.id == '1'">
          <div>{{scope.model}}</div>
        </template>
        <template slot="header" v-if="col.id != '1'">
          <div>
            <el-checkbox @change="scope1 = col.label" :label="col.label"></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope" v-if="col.id != '1'">
          <div>
            <el-checkbox @change="scope1 = scope.row"></el-checkbox>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      scope1: "",
      columns: [
        { checked: true, id: "1", label: "模块名称", prop: "model" },
        { checked: true, id: "2", label: "新增", prop: "insert" },
        { checked: true, id: "3", label: "编辑", prop: "edit" },
        { checked: true, id: "4", label: "删除", prop: "delete" },
        { checked: true, id: "5", label: "查看", prop: "view" },
        { checked: true, id: "6", label: "打印", prop: "print" },
        { checked: true, id: "7", label: "审核", prop: "audit" },
        { checked: true, id: "8", label: "反审核", prop: "reaudit" },
        { checked: true, id: "9", label: "作废", prop: "throw" },
        { checked: true, id: "10", label: "反作废", prop: "rethrow" },
        { checked: true, id: "11", label: "导出", prop: "export" }
      ],
      checked_list: [
        {
          model: "1",
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
          model: "2",
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
          model: "3",
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
          model: "4",
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
      ],
      mounted() {
        /**
         * el-checkbox__input is-indeterminate 半选
         * el-checkbox__input is-checked       全选
         */
      },
      methods: {}
    };
  }
};
</script>