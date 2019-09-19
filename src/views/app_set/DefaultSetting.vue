<template>
    <el-container id="ff">
        <el-aside width="200px">
            <el-tree :data="userSort" :props="defaultProps" accordion @node-click="handleNodeClick" node-key="id" :highlight-current="true" style="margin-top: 40px"></el-tree>
        </el-aside>
        <el-main>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="供应商">
                    <el-input placeholder="请选择供应商" v-model="input1" class="input-with-select">
                        <el-button slot="append" icon="el-icon-more"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="客户">
                    <el-input placeholder="请选择客户" v-model="input2" class="input-with-select">
                        <el-button slot="append" icon="el-icon-more"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="仓库">
                    <el-cascader
                            placeholder="请选择或搜索仓库"
                            :options="warehouse"
                            filterable
                            clearable
                            :show-all-levels="false"
                            :props="{ checkStrictly: true }"
                            style="width: 300px">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="业务员">
                    <el-cascader
                            placeholder="请选择或搜索业务员"
                            :options="salesman"
                            filterable
                            clearable
                            :show-all-levels="false"
                            :props="{ checkStrictly: true }"
                            style="width: 300px">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="光标定位">
                    <el-radio-group v-model="cursor">
                        <el-radio label="数量"></el-radio>
                        <el-radio label="单价"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">保存</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>

    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                userSort:[{
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

                form: [],
                warehouse:[{
                    value: 'shenzhen',
                    label: '深圳分公司总仓库',
                    children: [{
                        value: 'sz 1',
                        label: '仓库 1',
                    },{
                        value: 'sz 2',
                        label: '仓库 2',
                    }]
                },{
                    value: 'guangzhou',
                    label: '广州分公司仓库',
                    children: [{
                        value: 'gz 1',
                        label: '仓库 1',
                    }]
                },{
                    value: 'zhongshan',
                    label: '中山分公司仓库'
                }],

                salesman:[{
                    value: 'zongbu',
                    label: '公司总部',
                    children: [{
                        value: 'zongnbuyewu 1',
                        label: '业务员 1',
                    },{
                        value: 'zongbuyewu 2',
                        label: '业务员 2',
                    }]
                },{
                    value: 'shenzhenyewu',
                    label: '深圳分公司',
                    children: [{
                        value: 'szyewu 1',
                        label: '业务员 1',
                    }]
                },{
                    value: 'zhongshanyewu',
                    label: '中山分公司',
                    children: [{
                        value: 'zsyewu 1',
                        label: '业务员 1',
                    }]
                }],
                cursor:[],
            }
        }
    }
</script>

<style>
    #ff .el-tree-node__content {
        height: 40px;
    }
    #ff .el-main{
        flex-grow: 0;
        padding: 30px 10px;
    }
    .input-with-select {
        background-color: #fff;
    }
    #ff .el-input-group__append, .el-input-group__prepend{
        padding: 0 14px;
    }
</style>