<template>
    <el-container id="gg">
        <el-aside width="200px">
            <el-tree :data="interfaceSelect" :props="defaultProps" accordion @node-click="handleNodeClick" node-key="id" style="margin-top: 40px"></el-tree>
        </el-aside>
        <el-main>
            <el-form :inline="true" :model="formInlineIF" style="margin-top: 20px">
                <el-form-item>
                    <el-select v-model="value" placeholder="请选择需要编辑的界面">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="margin-left: 10px">保存</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>


            <el-table :data="interfaces" border style="width: 100%" height="680" >
<!--                <el-table-column type="selection" width="40" :selectable="handle_checkbox"></el-table-column>-->
                <el-table-column align="center" prop="db" label="原名称"></el-table-column>
                <el-table-column align="center" prop="dbShow" label="显示名称">
                    <i class="el-icon-edit"></i>
                </el-table-column>
                <el-table-column align="center" label="需要显示">

                </el-table-column>
                <el-table-column align="center" label="默认不清空"></el-table-column>
                <el-table-column align="center" label="排序">
                    <template>
                        <el-button type="primary" plain icon="el-icon-upload2" circle></el-button>
                        <el-button icon="el-icon-top" circle></el-button>
                        <el-button icon="el-icon-bottom" circle></el-button>
                        <el-button type="primary" plain icon="el-icon-download" circle></el-button>
                    </template>
                </el-table-column>
<!--                <el-table-column-->
<!--                        align="center"-->
<!--                        label="操作"-->
<!--                >-->
<!--                    <template>-->
<!--                        <el-button size="small">编辑</el-button>-->
<!--                        <el-button type="danger" size="small">删除</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->

            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                interfaceSelect: [{
                    label: '采购单据',
                    children: [{
                        label: '采购订货单',
                    }, {
                        label: '采购订货单查询',
                    }, {
                        label: '采购入库单',
                    },{
                        label: '采购入库单查询',
                    }]
                }, {
                    label: '销售单据',
                    children: [{
                        label: '批发订货单',
                    }]
                }, {
                    label: '库存单据',
                    children: [{
                        label: '仓库调拨单',
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                formInlineIF: [],

                options: [{
                    value: '选项1',
                    label: '单据信息'
                }, {
                    value: '选项2',
                    label: '商品明细列表'
                }, {
                    value: '选项3',
                    label: '新增商品控件'
                }, {
                    value: '选项4',
                    label: '查询条件',
                    disabled: true
                }, {
                    value: '选项5',
                    label: '单据列表',
                    disabled: true
                }],
                value: '',

                interfaces: [{
                    db: '单号',
                    dbShow: '单据编码'
                },{
                    db: '单据日期',
                    dbShow: '单据日期'
                },{
                    db: '供应商',
                    dbShow: '供应商'
                },{
                    db: '仓库',
                    dbShow: '仓库'
                },{
                    db: '经销方式',
                    dbShow: '经销方式'
                },{
                    db: '业务员',
                    dbShow: '业务员'
                },{
                    db: '备注',
                    dbShow: '备注'
                },{
                    db: '制单人',
                    dbShow: '制单人'
                },]
            }
        },
        methods:{
            handle_checkbox(row){
                if(row.db){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
</script>

<style>
    #gg .el-tree-node__content {
        height: 40px;
    }
    #gg .el-button.is-circle{
        padding: 8px;
    }
    #gg .el-form-item{
        margin-bottom: 15px;
    }
</style>