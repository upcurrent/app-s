<template>
    <el-container id="aa" :style="{height:'100%',height:'100%'}">

        <el-container>
            <el-aside width="300px">
                <el-row>
                    <el-col>
                        <el-button type="primary" :style="{'float':'left'}"  @click="addNew">新增</el-button>
                        <el-button :style="{'float':'left'}" :disabled="allow" @click="replace">修改</el-button>
                        <el-button type="danger" plain :style="{'float':'left'}" :disabled="allow" @click="del">删除</el-button>
                    </el-col>
                </el-row>
                <el-table
                        ref="app_view_data"
                        @row-click="load_info"
                        :data="app_view_data"
                        :style="{'margin-top':'10px'}"
                        :show-header='false'
                        :highlight-current-row="true"
                        border
                        height="700"
                >
                    <el-table-column
                            prop="serverName"

                    >
                    </el-table-column>
                </el-table>
            </el-aside>
            <el-main>
                <el-row :style="{'margin-top':'5px','margin-bottom':'10px'}">
                    <el-col :style="{width:'300px'}">
                        <el-button type="primary" :style="{'margin-left':'10px'}" :disabled="allow" @click="db_info_add">新增</el-button>
                        <el-button @click="db_info_replace" :disabled="db_allow">修改</el-button>
                        <el-button type="danger" plain @click="db_info_del" :disabled="db_allow">删除</el-button>
                    </el-col>
                </el-row>
                <el-table
                        :data="db_info_data"
                        ref="db_info_data"
                        :highlight-current-row="true"
                        @row-click="bufferData"
                        border
                        height="700"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column
                            type="index"
                            width="50"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="账套"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="ip"
                            label="ip地址"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="port"
                            label="端口"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="password"
                            label="密码"

                            :formatter="formartPassword"
                    >
                    </el-table-column>

                    <el-table-column
                            prop="dbName"
                            label="数据库名称"

                    >
                    </el-table-column>

                </el-table>

                <el-dialog
                        :modal="false"
                        :visible.sync="App_dialog_visible"
                        width="450px"
                        :before-close="handleClose"
                        :close-on-click-modal="false"
                        :style="{height:'auto'}"
                >
                    <el-form label-width="110px" :model="form" ref="form" :rules="form_rules">
                        <el-input type="hidden" v-model='form.id'></el-input>
                        <el-input type="hidden" v-model='form.appName'></el-input>
                        <el-input type="hidden" v-model='form.projectId'></el-input>
                        <el-form-item label="选择服务">
                            <el-col :span="20">
                                <el-form-item >
                                    <el-select v-model="value" @change="item_change" :style="{width:'233px'}">
                                        <el-option v-for="item,index in options"
                                                   :key="index"
                                                   :label="item.name"
                                                   :value="index">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="名称：">
                            <el-col :span="20">
                                <el-form-item prop="serverName">
                                    <el-input v-model="form.serverName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="IP:">
                            <el-col :span="20">
                                <el-form-item prop="ip">
                                    <el-input v-model="form.ip"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="端口：">
                            <el-col :span="20">
                                <el-form-item prop="port">
                                    <el-input v-model="form.port"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="App_dialog_visible = false">取 消</el-button>
                        <el-button @click="save_check" type="primary">保 存</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                        :modal="false"
                        :visible.sync="db_dialog_visible"
                        width="500px"
                        :before-close="handleClose"
                        :close-on-click-modal="false"
                        :style="{height:'auto'}"
                >
                    <el-form
                            :model="db_info_form"
                            status-icon
                            :rules="rules"
                            ref="db_info_form"
                            label-width="90px"
                    >
                        <el-input type="hidden" v-model='db_info_form.id'></el-input>
                        <el-input type="hidden" v-model='db_info_form.serverId'></el-input>
                        <el-form-item label="账套:">
                            <el-col :span="20">
                                <el-form-item  prop="name">
                                    <el-input v-model="db_info_form.name" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="ip地址:">
                            <el-col :span="20" >
                                <el-form-item  prop="ip">
                                    <el-input  v-model="db_info_form.ip" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="端口:">
                            <el-col :span="20">
                                <el-form-item  prop="port">
                                    <el-input v-model.number="db_info_form.port"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="用户名:">
                            <el-col :span="20">
                                <el-form-item  prop="userName">
                                    <el-input v-model="db_info_form.userName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="密码:">
                            <el-col :span="20">
                                <el-form-item  prop="password">
                                    <el-input type="password" v-model="db_info_form.password"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="数据库名:">
                            <el-col :span="20">
                                <el-form-item  prop="dbName">
                                    <el-input v-model="db_info_form.dbName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="数据库类型:">
                            <el-col :span="20">
                                <el-form-item  prop="dbType">
                                    <el-select v-model="db_info_form.dbType" placeholder="请选择">
                                        <el-option
                                                v-for="item in optionsType"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="db_dialog_visible = false">取 消</el-button>
                        <el-button @click="test_db">测试账套</el-button>
                        <el-button @click="info_save_check" type="primary">保 存</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                        :visible.sync="up_dialog_visible"
                        width="300px"
                        title="提示"
                        :style="{height:'auto'}"
                >
                    <span>请选择一项！</span>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="up_dialog_visible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>


    import axios from 'axios';
    import {url,getDbType} from '../../api/api'

    export default{
        data(){
            return{
                options:[
                ],
                value: '',
                rules: {
                    name: [
                        {required: true, message: '请输入账套', trigger: 'blur'}
                    ],
                    port: [
                        {required: true, message: '请输入端口', trigger: 'blur'},
                    ],
                    ip: [
                        {required: true, message: '请输入IP地址', trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, message: '请输入登录用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    dbName: [
                        {required: true, message: '请输入数据库', trigger: 'blur'}
                    ],
                },
                allow:true,
                db_allow:true,
                up_dialog_visible: false,
                App_dialog_visible: false,
                db_dialog_visible: false,
                shift_data: {},
                app_view_data: [],
                db_info_data: [],
                form: {
                    serverName: "",
                    projectId:0,
                    appName:"",
                    id: 0,
                    ip: "",
                    port: "",
                    type: "",
                    dbs: []
                },
                db_info_form: {
                    id: 0,
                    serverId: 0,
                    name: "",
                    ip: "",
                    port: "",
                    userName: "",
                    password: "",
                    dbName: "",
                    type: "",
                    dbType:""
                },
                form_rules: {
                    serverName: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                },
                frash: false,
                edit_app_id: 0,
                edit_db_info_id: 0,
                optionsType:[]
            }
        },
        mounted() {
            this.localDbType();
            this.load_app_list();
        },
        methods: {
            localDbType:function(){
                getDbType(null).then((res)=>{
                    console.log(res);
                    this.optionsType = res;
                })
            },
            item_change(value){
                this.form.projectId = this.options[value].projectId;
                this.form.serverName = this.options[value].name;
                this.form.appName = this.options[value].path;
            },
            handleClose(done) {
                this.$confirm('数据未保存是否关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            addNew() {
                let obj = {...this.form};
                this.form = obj;
                for (let item in this.form) {
                    if (typeof this.form[item] === "object") {
                        this.form[item] = [];
                    } if (typeof this.form[item] === "number") {
                        this.form[item] = 0;
                    } else {
                        this.form[item] = "";
                    }
                }
                this.form.dbs = [];
                this.form.type = "new";
                this.form.id = 0;
                this.App_dialog_visible = true;
                this.resetForm('form');
            },
            replace() {
                let thit = this;
                if (this.edit_app_id === 0) {
                    this.up_dialog_visible = true;
                } else {
                    let app_list = this.app_view_data;
                    for (let item in app_list) {
                        if (app_list[item].id === this.edit_app_id) {
                            this.form = app_list[item];
                        }
                    }
                    console.log(this.form.appName);
                    this.options.forEach(function (item) {
                        if(thit.form.appName === item.path){
                            thit.value = item.name;
                        }
                    });
                    this.App_dialog_visible = false;
                    this.form.type = "update";
                    this.App_dialog_visible = true;
                    this.resetForm('form');
                }
            },
            del() {
                if (this.edit_app_id === 0) {
                    this.up_dialog_visible = true;
                } else {
                    let app_list = this.app_view_data;
                    for (let item in app_list) {
                        if (app_list[item].id === this.edit_app_id) {
                            app_list[item].type = "del";
                        }
                    }
                    this.attach("del");
                }
            },
            db_info_add() {
                let obj = {...this.db_info_form};
                this.db_info_form = obj;
                for (let item in this.db_info_form) {
                    if (typeof this.db_info_form[item] === "number") {
                        this.db_info_form[item] = 0;
                    } else {
                        this.db_info_form[item] = "";
                    }
                }
                this.db_info_form.serverId = this.edit_app_id;
                this.db_info_form.type = "new";
                this.db_dialog_visible = true;
                this.resetForm('db_info_form');

            },
            db_info_replace() {
                this.db_info_form.type = "update";
                this.db_dialog_visible = true;
                this.resetForm('db_info_form');

            },
            db_info_del() {
                let app_list = this.app_view_data;
                for (let item in app_list) {
                    if (app_list[item].id === this.edit_app_id) {
                        app_list[item].type = "update";
                        for (let db_serval in app_list[item].dbs) {
                            if (app_list[item].dbs[db_serval].id === this.edit_db_info_id)
                                app_list[item].dbs[db_serval].type = "del";
                        }
                    }
                }
                this.attach(null);
            },
            load_info(row, column, event) {
                this.edit_db_info_id = 0;
                this.allow = false;
                this.db_allow = true;
                this.edit_app_id = row.id;
                this.db_info_data = typeof row.dbs === "string" ? [] : row.dbs;
            },
            bufferData(row, column, event) {
                this.db_allow = false;
                this.edit_db_info_id = row.id;
                this.db_info_form = row;
            },
            save_check() {
                if(!this.form.serverName){
                    this.$message({
                        message:"请输入名称\n",
                        center: true,
                        type:"warning"
                    });
                    return;
                }
                let obj = {...this.form};
                if (obj.type === "update") {
                    let app_list = this.app_view_data;
                    for (let item in app_list) {
                        if (app_list[item].id === this.edit_app_id) {
                            app_list[item] = obj;
                        }
                    }
                    this.attach(null);
                } else {
                    this.app_view_data.push(obj);
                    this.$refs['app_view_data'].toggleRowSelection(this.app_view_data[this.app_view_data.length],true);
                }
                this.App_dialog_visible = false;
                for (let item in this.form) {
                    if (typeof this.form[item] === "object") {
                        this.form[item] = [];
                    } else if (typeof this.form[item] === "number") {
                        this.form[item] = 0;
                    }else {
                        this.form[item] = "";
                    }
                }
            },
            test_db(){
                let data = this.db_info_form;
                axios.post(url+"/appServerManage/testDb",data).then(res => {
                    console.log(res.data);
                    let re = res.data;
                    if (re.flag){
                        this.$message({
                            message:"连接成功\n",
                            center: true,
                            type:"success"
                        });
                    }else {
                        this.$message({
                            message:"连接失败\n"+res.data.msg,
                            center: true,
                            type:"error"
                        });
                    }

                }).catch(res => console.log(res));
            },
            info_save_check() {
                let obj = {...this.db_info_form};
                this.db_dialog_visible = false;
                let app_list = this.app_view_data;
                if(obj.type === "update"){
                    for(let item in app_list){
                        if(app_list[item].id === obj.serverId){
                            app_list[item].type="update";
                        }
                    }
                }else{
                    for(let item in app_list){
                        if(app_list[item].id === obj.serverId){
                            app_list[item].dbs.push(obj);
                            if(app_list[item].type != "new"){
                                app_list[item].type="update";
                            }
                        }
                    }
                    for(let item in this.db_info_form){
                        if(typeof this.db_info_form[item] === "number"){
                            this.db_info_form[item] = 0;
                        }else{
                            this.db_info_form[item] = "";
                        }
                    }
                }
                this.attach(null);
            },
            attach(type) {
                let thit = this;
                let obj = [];
                for(let app of this.app_view_data){
                    if(app.type){
                        obj.push(app);
                    }
                }
                console.log({...obj});
                axios.post(url+"/appServerManage/saveApps", obj).then(res => {
                    if(res.data.flag === false){
                        this.$message({
                            message:"保存失败\n"+res.data.msg,
                            center: true,
                            type:"warning"
                        });
                    }
                    if(type){
                        this.db_info_data = [];
                    }
                    thit.load_app_list()
                }).catch(res => console.log(res));
            },
            load_app_list() {
                axios.post(url+"/appServerManage/getApp").then(res => {
                    if(res.flag === false){
                        this.$message({
                            message:"加载失败\n"+res.msg,
                            center: true,
                            type:"warning"
                        });
                    }else{
                        this.app_view_data = res.data;
                        this.static_load_info();
                    }

                }).catch(res => console.log(res));
                this.frash = false;
                axios.post(url+"/appServerManage/getAppInfo").then(res => {
                    this.options = res.data;
                }).catch(res => console.log(res));
            },
            formartPassword:function(row, column, cellValue, index){
                let obj = "";
                while(true){
                    if(obj.length === cellValue.length) break;
                    obj+="*";
                }
                return obj;
            },
            static_load_info() {
                let app_list = this.app_view_data;
                for (let item in app_list) {
                    if (app_list[item].id === this.edit_app_id) {
                        this.db_info_data = app_list[item].dbs;
                    }
                }
            },
            resetForm(formName) {
                this.$nextTick(()=>{
                    this.$refs[formName].clearValidate()
                })
            }
        },
        watch:{
            db_info_data:function(new_db_info_data,old_db_info_data){
                if(new_db_info_data === []){
                    this.db_allow = true;
                }
            }
        }
    }
</script>

<style>

    #aa .el-aside{
        margin: 20px 20px 0 0;
        /*border: 1px solid #EBEEF5;*/
        padding-top: 5px;
    }
    #aa .el-aside .el-row{
        margin-top: 5px;
        margin-bottom: 10px;
    }
    #aa .el-main {
        margin: 20px 20px 0 0;
        padding: 5px 20px;
        /*border: 1px solid #EBEEF5;*/
    }
    #aa .el-main .el-row{
        margin-left: -10px;
    }

</style>