<template>
    <el-container id="ii">
        <el-aside width="200px">
            <el-button type="primary"  plain style="margin-top: 40px">复制到...</el-button>
            <el-tree :data="userSelect" :props="defaultProps" accordion @node-click="handleNodeClick" node-key="id" :highlight-current="true" style="margin-top: 20px"></el-tree>
        </el-aside>
        <el-main>
            <el-tabs :tab-position="tabPosition" style="height: 100%; width: 98%">
                <!--单据功能-->
                <el-tab-pane label="单据功能">

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
                            <el-button type="primary" :style="{'float':'left'}">选择供应商</el-button>
                            <el-button type="danger" plain :style="{'float':'left'}" >删除</el-button>
                        </el-col>
                    </el-row>
                    <el-table ref="multipleTable" :data="supplierData" :style="{'margin-top':'10px'}" border tooltip-effect="dark"  @selection-change="handleSelectionChange"  height="620">
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
                    >
                    </el-pagination>
                </el-tab-pane>

                <!--客户-->
                <el-tab-pane label="客户">
                    <el-row>
                        <el-col>
                            <el-button type="primary" :style="{'float':'left'}">选择客户</el-button>
                            <el-button type="danger" plain :style="{'float':'left'}" >删除</el-button>
                        </el-col>
                    </el-row>
                    <el-table ref="multipleTable" :data="customerData" :style="{'margin-top':'10px'}" border tooltip-effect="dark"  @selection-change="handleSelectionChange"  height="620">
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
                    >
                    </el-pagination>
                </el-tab-pane>

                <!--商品-->
                <el-tab-pane label="商品">
                    <el-row>
                        <el-col>
                            <el-button type="primary" :style="{'float':'left'}">选择商品</el-button>
                            <el-button type="danger" plain :style="{'float':'left'}" >删除</el-button>
                        </el-col>
                    </el-row>
                    <el-table ref="multipleTable" :data="customerData" :style="{'margin-top':'10px'}" border tooltip-effect="dark"  @selection-change="handleSelectionChange"  height="620">
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
                    >
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                tabPosition: 'top',
                userSelect: [{
                    label: '账套 1',
                    children: [{
                        label: '用户 1-1',
                    },{
                        label: '用户 1-2',
                    }]
                },{
                    label: '账套 2',
                    children: [{
                        label: '用户 2-1',
                    }]
                },{
                    label: '账套 3',
                    children: [{
                        label: '用户 3-1',
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                supplierData: [{
                    number: '00000001',
                    name: '上海市某某某有限公司',
                    person: '王小虎',
                    phone: '13600000000',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    number: '00000001',
                    name: '上海市某某某有限公司',
                    person: '王小虎',
                    phone: '13600000000',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    number: '00000001',
                    name: '上海市某某某有限公司',
                    person: '王小虎',
                    phone: '13600000000',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    number: '00000001',
                    name: '上海市某某某有限公司',
                    person: '王小虎',
                    phone: '13600000000',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    number: '00000001',
                    name: '上海市某某某有限公司',
                    person: '王小虎',
                    phone: '13600000000',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    number: '00000001',
                    name: '上海市某某某有限公司',
                    person: '王小虎',
                    phone: '13600000000',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                customerData: [],
                multipleSelection: [],
                labelPosition: 'left',
                form: {
                    purchasePrice:false,
                    purchaseLowPrice:false,
                    purchaseHighPrice:false,
                    wholesalePrice: false,
                    sellPrice: false,
                    memberPrice: false,
                    deliveryPrice: false,
                    customPrice: false
                }
            }
        },
        methods:{
            handleCurrentChange(){

            },
            handleNodeClick(){

            },
            handleSizeChange(){

            },
            handleSelectionChange(){

            },
        }

    }
</script>

<style>
    #ii .el-tree-node__content {
        height: 40px;
    }
    .el-pagination {
        padding: 20px 20px 0 0;
        float: right;
    }
    #ii .el-form-item{
        margin-bottom: 15px;
    }
</style>