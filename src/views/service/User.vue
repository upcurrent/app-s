<template>
    <section>
        <el-container id="bb">
            <el-aside width="200px">
                <el-tree :data="tree" :props="defaultProps" accordion @node-click="handleNodeClick" node-key="id" :highlight-current="true" style="margin-top: 40px"></el-tree>
            </el-aside>
            <el-main>
                <el-table v-loading="loading" :data="records" border style="width: 100%" height="760">
                    <el-table-column align="center" prop="userName" label="名称" >
                    </el-table-column>

                    <el-table-column align="center" prop="password" label="密码" :formatter="passwordFormat">
                    </el-table-column>

                    <el-table-column align="center" prop="ticket" label="是否启用" :formatter="openFormat">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="操作"
                            >
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>

        <!--新增界面-->
        <el-dialog title="编辑" :visible.sync="editVisible" :close-on-click-modal="false" width="520px">
            <el-form :model="editForm" label-width="80px"  :rules="editForm" ref="editForm">
                <el-form-item label="名称" prop="userName" style="width: 450px">
                    <el-input v-model="editForm.userName" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" style="width: 450px">
                    <el-input v-model="editForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="editForm.open"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" >提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import {getUserNode,getUserList,saveUser} from '../../api/api'

    export default{
        data(){
            return {
                tree:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                records:[],
                editVisible:false,
                editForm:{
                    userName:"",
                    password:"",
                    open:false
                },
                bookId:0,
                loading:false
            }
        },
        methods:{
            loadTree:function () {
                getUserNode(null).then((res=>{
                    this.tree=res;
                }))
            },
            loadUserList:function () {
                this.loading = true;
                getUserList(this.bookId).then((res=>{
                    this.records = res;
                })).finally(()=>{
                    this.loading = false;
                })
            },
            handleNodeClick:function (node) {
                if (node.isLeaf){
                    this.bookId = node.id;
                    this.loadUserList();
                }
            },
            passwordFormat:function(row){
                if (row.password){
                    return "*********";
                }
            },
            openFormat:function(row){
                return row.open?"是":"否";
            },
            handleEdit:function (index,row) {
                this.editForm = Object.assign({}, row);
                this.editVisible = true;
            },
            editSubmit:function () {
                saveUser(this.editForm).then((res=>{
                    this.editLoading = false;
                    //NProgress.done();
                    if(res.flag){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }else {
                        this.$message.error("修改" +
                            "失败");
                    }
                    this.$refs['editForm'].resetFields();
                    this.editVisible = false;
                    this.loadUserList();
                }))
            }
        },
        mounted(){
            this.loadTree();
        }
    }
</script>

<style>
    #bb .el-main {
        padding: 30px 20px;
    }
    #bb .el-tree-node__content {
        height: 40px;
    }
</style>