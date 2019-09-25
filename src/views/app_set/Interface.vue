<template>
    <el-container id="gg">
        <el-aside width="200px">
            <el-tree :data="interfaceSelect" :props="defaultProps" highlight-current @node-click="handleNodeClick" node-key="id" style="margin-top: 40px"></el-tree>
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
<!--                <el-table-column align="center" prop="dbShow" label="显示名称">-->
<!--                    <template slot-scope="scope">-->
<!--                        <span style="margin-right: 10px">{{ scope.row.dbShow }}</span>-->
<!--                        <i class="el-icon-edit"></i>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column align="center" prop="dbShow" label="显示名称">
                    <el-input placeholder="请输入内容" v-model="input" clearable>
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                </el-table-column>

                <el-table-column align="center"  v-for="(col,index) in NeedShow" :key="index">
                    <template slot="header" slot-scope="scope">
                        <div>
                            <el-checkbox
                                    @change="checked_header(col.prop,col.checked,scope)"
                                    v-model="col.checked"
                                    :indeterminate="col.indeterminate"
                                    :label="col.label"
                            ></el-checkbox>
                        </div>
                    </template>
                    <template slot-scope="scope" >
                        <div>
                            <el-checkbox
                                    v-model="scope.row[`${col.prop}`]"
                                    @change="centext_checked(col.prop,scope.row[`${col.prop}`],scope.row.infos,scope.row)"
                            ></el-checkbox>
                        </div>
                    </template>
                </el-table-column>

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

                input: '',
                interfaces: [{
                    db: '单号',
                    dbShow: '单据编码',
                    show:false,
                    clear:false,
                },{
                    db: '单号',
                    dbShow: '单据编码',
                    show:false,
                    clear:false,
                },{
                    db: '单号',
                    dbShow: '单据编码',
                    show:false,
                    clear:false,
                },{
                    db: '单号',
                    dbShow: '单据编码',
                    show:false,
                    clear:false,
                },{
                    db: '单号',
                    dbShow: '单据编码',
                    show:false,
                    clear:false,
                },{
                    db: '单号',
                    dbShow: '单据编码',
                    show:false,
                    clear:false,
                },
                ],
                NeedShow: [
                    {
                        checked: false,
                        indeterminate: false,
                        label: "需要显示",
                        prop: "show"
                    },
                    {
                        checked: false,
                        indeterminate: false,
                        label: "默认不清空",
                        prop: "clear"
                    }
                ]
            }
        },
        methods:{
            handle_checkbox(row){
                if(row.db){
                    return true;
                }else{
                    return false;
                }
            },
            checked_header(field, checked, scope) {
                this.interfaces.forEach(i =>{
                   i[field] = checked;
                })
            },
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