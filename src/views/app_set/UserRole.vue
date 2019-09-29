<template>
  <el-container id="ii">
    <el-aside width="200px">
      <el-button
        type="primary"
        plain
        style="margin: 30px 0 10px 0"
        @click="copyTableVisible = true"
      >复制到...</el-button>
      <!--复制到...-->
      <el-dialog title="复制到用户" :visible.sync="copyTableVisible">
        <el-tree
          :data="tree"
          :props="defaultProps"
          accordion
          default-expand-all
          show-checkbox
          @node-click="handleNodeClick"
          :load="load_node"
          lazy
          node-key="id"
          :highlight-current="true"
        ></el-tree>
        <el-footer style="text-align:right;padding-bottom: 0;height: 40px;">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false" style="margin-left: 20px">确 定</el-button>
        </el-footer>
      </el-dialog>
      <el-aside width="200px" style="height:75vh">
        <el-scrollbar
          wrap-class="list"
          wrap-style="color: gray;"
          view-class="view-box"
          :native="false"
          style="height:100%;overflow-x:hidden;"
        >
          <el-tree
            :data="tree"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            :load="load_node"
            lazy
            node-key="id"
            :highlight-current="true"
          ></el-tree>
        </el-scrollbar>
      </el-aside>
    </el-aside>

    <el-main>
      <el-tabs :tab-position="tabPosition" style="height: 100%; width: 98%">
        <!--单据功能-->
        <el-tab-pane label="单据功能">
          <billRole />
        </el-tab-pane>
        <!--价格-->
        <el-tab-pane label="价格">
          <el-form ref="form" :model="form" :label-position="labelPosition" label-width="90px">
            <el-form-item label="档案进价">
              <el-switch v-model="form.purchasePrice"></el-switch>
            </el-form-item>
            <el-form-item label="最低进价">
              <el-switch v-model="form.purchaseLowPrice"></el-switch>
            </el-form-item>
            <el-form-item label="最高进价">
              <el-switch v-model="form.purchaseHighPrice"></el-switch>
            </el-form-item>
            <el-form-item label="批发价">
              <el-switch v-model="form.wholesalePrice"></el-switch>
            </el-form-item>
            <el-form-item label="销售价">
              <el-switch v-model="form.sellPrice"></el-switch>
            </el-form-item>
            <el-form-item label="会员价">
              <el-switch v-model="form.memberPrice"></el-switch>
            </el-form-item>
            <el-form-item label="配送价">
              <el-switch v-model="form.deliveryPrice"></el-switch>
            </el-form-item>
            <el-form-item label="自定义价格">
              <el-switch v-model="form.customPrice"></el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!--供应商-->
        <el-tab-pane label="供应商">
          <el-row>
            <el-col>
              <el-button
                type="primary"
                :style="{'float':'left'}"
                @click="supplierTableVisible = true"
              >选择供应商</el-button>
              <el-button type="danger" plain :style="{'float':'left'}">删除</el-button>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="supplierData"
            :style="{'margin-top':'10px'}"
            border
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            height="620"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="number" label="供应商编码" width="200"></el-table-column>
            <el-table-column prop="name" label="供应商名称" width="300"></el-table-column>
            <el-table-column prop="person" label="联系人" width="200"></el-table-column>
            <el-table-column prop="phone" label="联系手机" width="250"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[20, 40, 50, 100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-tab-pane>
        <!--选择供应商-->
        <el-dialog title="选择供应商" :visible.sync="supplierTableVisible">
          <el-container>
            <el-aside :style="{'width':'200px'}">
              <el-tree
                :data="SupplierClassify"
                :props="defaultProp"
                default-expand-all
                @node-click="handleNodeClick"
              ></el-tree>
            </el-aside>
            <el-container>
              <el-main :style="{'padding-top':'0px'}">
                <el-table :data="supData" border>
                  <el-table-column type="selection" width="42"></el-table-column>
                  <el-table-column property="date" label="供应商编码"></el-table-column>
                  <el-table-column property="name" label="供应商名称"></el-table-column>
                  <el-table-column property="name" label="联系人"></el-table-column>
                  <el-table-column property="num" label="联系手机"></el-table-column>
                </el-table>
              </el-main>
              <el-footer style="text-align:right;padding-bottom: 0;height: 40px;">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                  style="margin-left: 20px"
                >确 定</el-button>
              </el-footer>
            </el-container>
          </el-container>
        </el-dialog>

        <!--客户-->
        <el-tab-pane label="客户">
          <el-row>
            <el-col>
              <el-button
                type="primary"
                :style="{'float':'left'}"
                @click="customerTableVisible = true"
              >选择客户</el-button>
              <el-button type="danger" plain :style="{'float':'left'}">删除</el-button>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="customerData"
            :style="{'margin-top':'10px'}"
            border
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            height="620"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="number" label="客户编码" width="200"></el-table-column>
            <el-table-column prop="name" label="客户名称" width="300"></el-table-column>
            <el-table-column prop="person" label="联系人" width="200"></el-table-column>
            <el-table-column prop="phone" label="联系手机" width="250"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[20, 40, 50, 100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-tab-pane>
        <!--选择客户-->
        <el-dialog title="选择客户" :visible.sync="customerTableVisible">
          <el-container>
            <el-aside :style="{'width':'200px'}">
              <el-tree
                :data="CustomerClassify"
                :props="defaultProp"
                default-expand-all
                @node-click="handleNodeClick"
              ></el-tree>
            </el-aside>
            <el-container>
              <el-main :style="{'padding-top':'0px'}">
                <el-table :data="cusData" border>
                  <el-table-column type="selection" width="42"></el-table-column>
                  <el-table-column property="date" label="客户编码"></el-table-column>
                  <el-table-column property="name" label="客户名称"></el-table-column>
                  <el-table-column property="name" label="联系人"></el-table-column>
                  <el-table-column property="num" label="联系手机"></el-table-column>
                </el-table>
              </el-main>
              <el-footer style="text-align:right;padding-bottom: 0;height: 40px;">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                  style="margin-left: 20px"
                >确 定</el-button>
              </el-footer>
            </el-container>
          </el-container>
        </el-dialog>

        <!--商品-->
        <el-tab-pane label="商品">
          <el-row>
            <el-col>
              <el-button
                type="primary"
                :style="{'float':'left'}"
                @click="goodsTableVisible = true"
              >选择商品</el-button>
              <el-button type="danger" plain :style="{'float':'left'}">删除</el-button>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="goodsData"
            :style="{'margin-top':'10px'}"
            border
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            height="620"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="number" label="商品编码" width="200"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="person" label="商品类别" width="150"></el-table-column>
            <el-table-column prop="phone" label="条码" width="200"></el-table-column>
            <el-table-column prop="phone" label="规格" width="150"></el-table-column>
            <el-table-column prop="phone" label="型号" width="150"></el-table-column>
            <el-table-column prop="phone" label="产地" width="150"></el-table-column>
            <el-table-column prop="address" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[20, 40, 50, 100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-tab-pane>
        <!--选择商品-->
        <el-dialog title="选择商品" :visible.sync="goodsTableVisible">
          <el-container>
            <el-aside :style="{'width':'200px'}">
              <el-tree
                :data="GoodsClassify"
                :props="defaultProp"
                default-expand-all
                @node-click="handleNodeClick"
              ></el-tree>
            </el-aside>
            <el-container>
              <el-main :style="{'padding-top':'0px'}">
                <el-table :data="gooData" border>
                  <el-table-column type="selection" width="42"></el-table-column>
                  <el-table-column property="date" label="商品编码"></el-table-column>
                  <el-table-column property="name" label="商品名称"></el-table-column>
                  <el-table-column property="name" label="条码"></el-table-column>
                  <el-table-column property="num" label="规格"></el-table-column>
                </el-table>
              </el-main>
              <el-footer style="text-align:right;padding-bottom: 0;height: 40px;">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                  style="margin-left: 20px"
                >确 定</el-button>
              </el-footer>
            </el-container>
          </el-container>
        </el-dialog>

        <!--仓库-->
        <el-tab-pane label="仓库">
          <el-tree
            :data="cangku"
            show-checkbox
            node-key="id"
            default-expand-all
            @node-click="node_click"
            :expand-on-click-node="false"
            :props="defaultProp"
          ></el-tree>
          <el-footer style="margin: 20px 0 0 10px">
            <el-button type="primary">保存</el-button>
            <el-button>重置</el-button>
          </el-footer>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import { getALLUserNode, AppDBNode, RoleUserNode } from "../../api/api";
import event from "../../event/evnet.js";
import billRole from "@/components/userRole/billRole.vue";
export default {
  data() {
    return {
      copyTableVisible: false,
      tabPosition: "top",
      tree: [],
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: function(data, node) {
          if (node.level == 3) {
            return true;
          } else {
            return false;
          }
        }
      },
      records: [],
      editVisible: false,
      editForm: {
        userName: "",
        password: "",
        open: false
      },
      bookId: 0,
      userSelect: [
        {
          label: "账套 1",
          children: [
            {
              label: "用户 1-1"
            },
            {
              label: "用户 1-2"
            }
          ]
        },
        {
          label: "账套 2",
          children: [
            {
              label: "用户 2-1"
            }
          ]
        },
        {
          label: "账套 3",
          children: [
            {
              label: "用户 3-1"
            }
          ]
        }
      ],
      supplierData: [
        {
          number: "00000001",
          name: "上海市某某某有限公司",
          person: "王小虎",
          phone: "13600000000",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          number: "00000001",
          name: "上海市某某某有限公司",
          person: "王小虎",
          phone: "13600000000",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          number: "00000001",
          name: "上海市某某某有限公司",
          person: "王小虎",
          phone: "13600000000",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          number: "00000001",
          name: "上海市某某某有限公司",
          person: "王小虎",
          phone: "13600000000",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          number: "00000001",
          name: "上海市某某某有限公司",
          person: "王小虎",
          phone: "13600000000",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          number: "00000001",
          name: "上海市某某某有限公司",
          person: "王小虎",
          phone: "13600000000",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      customerData: [],
      goodsData: [],
      multipleSelection: [],
      labelPosition: "left",
      form: {
        purchasePrice: false,
        purchaseLowPrice: false,
        purchaseHighPrice: false,
        wholesalePrice: false,
        sellPrice: false,
        memberPrice: false,
        deliveryPrice: false,
        customPrice: false
      },
      cangku: [
        {
          id: 1,
          label: "公司总部",
          checked: false,
          children: [
            {
              id: 4,
              label: "公司总部零售仓库",
              checked: false,
              children: [
                {
                  id: 9,
                  label: "仓库 1",
                  checked: false
                },
                {
                  id: 10,
                  label: "仓库 2",
                  checked: false
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "深圳分公司",
          checked: false,
          children: [
            {
              id: 5,
              label: "深圳分公司总仓库",
              checked: false
            },
            {
              id: 6,
              label: "深圳分公司福田区仓库",
              checked: false
            }
          ]
        },
        {
          id: 3,
          label: "广州分公司",
          checked: false,
          children: [
            {
              id: 7,
              label: "广州分公司总仓库",
              checked: false
            },
            {
              id: 8,
              checked: false,

              label: "广州分公司越秀区仓库"
            }
          ]
        }
      ],
      defaultProp: {
        children: "children",
        label: "label"
      },
      dialogVisible: false,
      supData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          num: "13800000000"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          num: "13800000000"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          num: "13800000000"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          num: "13800000000"
        }
      ],
      supplierTableVisible: false,
      SupplierClassify: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      cusData: [],
      customerTableVisible: false,
      CustomerClassify: [],
      gooData: [],
      goodsTableVisible: false,
      GoodsClassify: []
    };
  },
  components: {
    billRole: billRole
  },
  methods: {
    node_click(node) {
      node.checked = !node.checked;
    },
    load_node(node, resolve) {
      if (node.level == 1) {
        if (!node.isLeaf && node.data.id) {
          AppDBNode(node.data.id).then(res => {
            resolve(res);
          });
        }
      } else if (node.level == 2) {
        if (!node.isLeaf && node.data.id) {
          RoleUserNode(node.data.id).then(res => {
            resolve(res);
          });
        }
      }
      return resolve([]);
    },
    loadTree() {
      getALLUserNode(null).then(res => {
        this.tree = res;
      });
    },
    handleNodeClick(node) {
      if (node.bookId) {
        event.$emit("load_role", node);
      }
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    handleSelectionChange() {}
  },
  mounted() {
    this.loadTree();
  }
};
</script>

<style>
#ii .el-tree-node__content {
  height: 40px;
}
.el-pagination {
  padding: 20px 20px 0 0;
  float: right;
}
#ii .el-form-item {
  margin-bottom: 15px;
}
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>