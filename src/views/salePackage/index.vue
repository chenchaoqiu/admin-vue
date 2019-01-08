<template>
  <div class="component">
    <div class="ohide" fo-size="16">
      <!--查询行-->
      <div class="fl" style="line-height: 36px;">
        <!--计划查询-->
        <div class="fl">卡项查询：</div>
        <div class="demo-input-suffix fl feel-input">
          <el-input v-model="keyWord" placeholder="请输入项目名称"></el-input>
        </div>
        <el-button @click="search" class="fl" type="primary">搜索</el-button>
      </div>
    </div>

    <div class="ohide" style="margin: 8px 0;">
      <!--状态快捷搜索-->
      <div class="fl" style="line-height: 36px;">
        <div class="fl">卡项类别：</div>
        <div class="fl">
          <ul fo-size="16">
            <!--<li v-for="item in tab_list" @click="tabAffair(item.categoryId)">{{item.name}}</li>-->
            <li :class="categoryId==''?'xs':''" @click="tabAffair('')">全部</li>
            <li :class="item.categoryId==categoryId?'xs':''" v-for="item in categoryList" @click="tabAffair(item.categoryId)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="ohide">
      <!--需求操作-->
      <el-button class="fl" @click="showAddModal" type="primary">新增卡项</el-button>
      <!--<el-button class="fl" type="primary">excel导出</el-button>-->
    </div>
    <!--表格-->
    <div class="ellipsis" style="margin-top: 30px;">
      <el-table :data="tableData3" border style="width: 100%">
        <el-table-column prop="salePackageId" label="卡项ID" min-width="180"></el-table-column>
        <el-table-column prop="name" label="卡项名称" min-width="180"></el-table-column>
        <el-table-column prop="constainProjects" label="包含项目" min-width="350"></el-table-column>
        <el-table-column prop="price" label="产品价格" min-width="180"></el-table-column>
        <el-table-column prop="saleStatus" label="上架状态" min-width="180">
          <template slot-scope="scope">
            <el-button class="fl" tab-btn type="primary" :disabled="scope.row.saleStatus == 1"  @click="handleUp(scope.row.salePackageId)">上架</el-button>
            <el-button class="fl" tab-btn type="primary" :disabled="scope.row.saleStatus == 0"   style="margin-left: 13px;" @click="handleDown(scope.row.salePackageId)">下架</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="180">
          <template slot-scope="scope">
            <!--<el-button class="fl" tab-btn type="primary" @click="operate(scope.row.salePackageId)">操作</el-button>-->
            <jurisbtn :tClick="operate" :tData="JSON.stringify(scope.row)" tName="操作"></jurisbtn>
            <el-button class="fl" tab-btn tab-bg='green' @click="check(scope.row.salePackageId)" type="primary" style="margin-left: 13px;">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div style=" margin-top: 10px;">
      <el-pagination @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--创建卡项弹窗start-->
    <div v-if="status" class="teamwork">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div class="teamwork-text">
          <p class="teamwork-text-title">
            <i fo-size='18'>新增卡项</i>
            <i @click="close" class="fr"><svg-icon icon-class="x" /></i>
          </p>
          <div class="teamwork-text-nr">
            <el-form class="login-form" label-position="right" label-width="100px" autoComplete="off"  ref="loginForm">
              <!--<el-form-item label="卡项类别">
                <el-input fo-size='14' size="small" style="width: 150px;" name="categoryId" v-model="form.categoryId" type="text" autoComplete="off" placeholder="请输入卡项类别" />
              </el-form-item>-->
              <el-form-item label="卡项类别" >
                <el-select v-model="form.categoryId" placeholder="卡项类别"  style="width: 160px" >
                  <el-option v-for="item in categoryList" :label="item.name" :key="item.categoryId" :value="item.categoryId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卡项名称">
                <el-input fo-size='14' size="small" style="width:280px;"  name="name" v-model="form.name" maxlength="15"  type="text" autoComplete="off" placeholder="请输入卡项名称" />
              </el-form-item>
              <el-form-item label="卡项副标题">
                <el-input fo-size='14' size="small" style="width:360px;"  name="subTitle" v-model="form.subTitle" maxlength="20" type="text" autoComplete="off" placeholder="请输入卡项副标题" />
              </el-form-item>
              <el-form-item label="卡项类型" >
                <el-radio-group v-model="form.type">
                 <!-- <el-radio label="项目卡" value="1"></el-radio>
                  <el-radio label="体验卡" value="2"></el-radio>-->
                  <el-radio :label="1">项目卡</el-radio>
                  <el-radio :label="2">体验卡</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="卡项原价">
                <el-input fo-size='14' size="small" style="width:165px;" name="marketPrice" v-model="form.marketPrice" maxlength="10" type="text" autoComplete="off" placeholder="请输入卡项原价" />
              </el-form-item>
              <el-form-item label="卡项现价">
                <el-input fo-size='14' size="small" style="width:165px;" name="price" v-model="form.price" maxlength="10"  type="text" autoComplete="off" placeholder="请输入卡项现价" />
              </el-form-item>
              <el-form-item label="绑定项目">
                  <div style="color:#3096f8"  @click="selectPro(multipleSelection)">选择项目</div>
                  <div v-for="(item,index) in proArr" style="margin-bottom: 20px">
                    <span>{{item.name}}</span>
                    <span style="padding-left: 40px">{{item.price}}</span>
                    <span style="padding-left: 40px">
                      <el-input-number size="small" :value="item.num" v-model="item.num" @change="handleChange(item.projectId,item.num)" :min="1" :max="999"  label="1"></el-input-number>
                    </span>
                  </div>
              </el-form-item>
              <el-form-item label="上下架" >
                <!--<el-radio-group v-model="form.saleStatus">
                  <el-radio label="上架" value="0" ></el-radio>
                  <el-radio label="下架" value="1"></el-radio>
                </el-radio-group>-->
                <el-radio-group v-model="form.saleStatus">
                  <el-radio :label="1">上架</el-radio>
                  <el-radio :label="0">下架</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="卡项封面：" prop="coverImgUrl">
                <el-upload v-model="form.coverImgUrl"
                           name="image"
                           class="avatar-uploader"
                           :action="uploadImageUrl"
                           :show-file-list="false"
                           :on-success="handleLogoSuccess"
                           :before-upload="beforeLogoUpload">
                  <img v-if="form.coverImgUrl" :src="form.coverImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

            </el-form>

            <vue-editor
              useCustomImageHandler
              @imageAdded="handleImageAdded" v-model="form.description"  ></vue-editor>
          </div>
          <div style="text-align: right;padding-right: 30px;">
            <el-button type="primary" @click="save" v-if="showType  == 1">保存</el-button>
              <!--<el-button type="primary" @click="salePackageModify" v-if="showType  == 2">确认修改</el-button>-->
          </div>
        </div>
      </div>
    </div>
    <!--创建卡项弹窗end-->
    <!--选择项目弹框start-->
    <div v-if="showSelect" class="teamwork teamwork2">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div class="teamwork-text">
          <p class="teamwork-text-title">
            <i fo-size='18'>选择项目</i>
            <i @click="closeSlePro" class="fr"><svg-icon icon-class="x" /></i>
          </p>
          <div class="teamwork-text-nr" >
            <div class="fl" style="line-height: 36px;margin-bottom: 20px">
              <!--计划查询-->
              <div class="fl">项目查询：</div>
              <div class="demo-input-suffix fl feel-input">
                <el-input v-model="proSearchWord" placeholder="请输入内容"></el-input>
              </div>
              <el-button @click="searchPro" class="fl" type="primary">搜索</el-button>
            </div>

            <el-table
              ref="multipleTable"
              :data="tableData4"
              tooltip-effect="dark"
              border
              style="width: 100%;max-height:80%;overflow-y: scroll"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="项目名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="price"
                label="产品价格"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <!--分页-->
            <div style=" margin-top: 10px;">
              <el-pagination @current-change="handleCurrentChangePro"
                             :current-page.sync="currentPage5"
                             :page-size="pageSize"
                             layout="total, prev, pager, next, jumper"
                             :total="proTotal">
              </el-pagination>
            </div>
          </div>
          <div style="text-align: right;padding-right: 30px;">
            <el-button type="primary" @click="saveSel">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--选择项目弹框end-->

    <!--操作-->
    <div v-if="bStatus" class="teamwork">
      <div class="teamwork-mb"></div>
      <div class="teamwork-tc">
        <div class="teamwork-text">
          <p class="teamwork-text-title">
            <i fo-size='18'>{{tabTitle}}</i>
            <i @click="closeB" class="fr"><svg-icon icon-class="x" /></i>
          </p>
          <div class="teamwork-text-nr">
            <el-form class="login-form" label-position="right" label-width="100px" autoComplete="off"  :model="form" ref="loginForm">
              <el-form-item label="卡项类别" >
                <el-select v-model="form.categoryId"  placeholder="卡项类别"  style="width: 160px" :disabled="disabledInput">
                  <el-option v-for="item in categoryList" :label="item.name" :key="item.categoryId" :value="item.categoryId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卡项名称">
                <el-input fo-size='14' size="small" style="width:280px;" :disabled="disabledInput" name="name" v-model="form.name" maxlength="15"  type="text" autoComplete="off" placeholder="请输入卡项名称" />
              </el-form-item>
              <el-form-item label="卡项副标题">
                <el-input fo-size='14' size="small" style="width:360px;" :disabled="disabledInput"  name="subTitle" v-model="form.subTitle" maxlength="20" type="text" autoComplete="off" placeholder="请输入卡项副标题" />
              </el-form-item>
              <el-form-item label="卡项类型" >
                <el-radio-group v-model="form.type" :disabled="disabledInput">
                  <el-radio :label="1">项目卡</el-radio>
                  <el-radio :label="2">体验卡</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="卡项原价">
                <el-input fo-size='14' size="small" style="width:165px;" name="marketPrice" :disabled="disabledInput" v-model="form.marketPrice" maxlength="10" type="text" autoComplete="off" placeholder="请输入卡项原价" />
              </el-form-item>
              <el-form-item label="卡项现价">
                <el-input fo-size='14' size="small" style="width:165px;" name="price" :disabled="disabledInput" v-model="form.price" maxlength="10"  type="text" autoComplete="off" placeholder="请输入卡项现价" />
              </el-form-item>
              <el-form-item label="绑定项目">
                <div >
                  <div style="color:#3096f8"  @click="selectPro(multipleSelection)" v-if="showType == 2">选择项目</div>
                  <div v-for="(item,index) in proArr" style="margin-bottom: 20px">
                    <span>{{item.name}}</span>
                    <span style="padding-left: 40px">{{item.price}}</span>
                    <span style="padding-left: 40px">
                        <el-input-number :disabled="disabledInput" size="small" :value="item.num" v-model="item.num" @change="handleChange(item.projectId,item.num)" :min="1" :max="999"  label="1"></el-input-number>
                    </span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="上下架" >
                <el-radio-group v-model="form.saleStatus" :disabled="disabledInput">
                  <el-radio :label="1">上架</el-radio>
                  <el-radio :label="0">下架</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="卡项封面：" prop="coverImgUrl">
                <el-upload v-model="form.coverImgUrl"
                           :disabled="disabledInput"
                           name="image"
                           class="avatar-uploader"
                           :action="uploadImageUrl"
                           :show-file-list="false"
                           :on-success="handleLogoSuccess"
                           :before-upload="beforeLogoUpload">
                  <img v-if="form.coverImgUrl" :src="form.coverImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

            </el-form>

            <vue-editor
              useCustomImageHandler
              @imageAdded="handleImageAdded" v-model="form.description"  :disabled="disabledInput"></vue-editor>
          </div>
          <div style="text-align: right;padding-right: 30px;">
            <!--<el-button type="primary" @click="save" v-if="showType  == 1">保存</el-button>-->
            <el-button type="primary" @click="salePackageModify" v-if="showType  == 2">确认修改</el-button>
            <el-button type="primary" @click="closeB"  v-if="showType  == 3">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/modules/index'
  import { VueEditor } from 'vue2-editor'
  import axios from 'axios'
  import Jurisbtn from '@/components/jurisdiction'
  import('showdown').then(showdown => { // 用了 Dynamic import
    const converter = new showdown.Converter();// 初始化
    this.html = converter.makeHtml(this.content)// 转化
  });
  export default {
    name: 'index',
    data() {
      return {
        uploadImageUrl: api.url + '/api/pcadmin/common/uploadImage',
        val: '', /* 计划查询*/
        value1: '', /* 开始日期*/
        value2: '', /* 结束日期*/
        tableData3: [], /* 接口返回来的数据[{}]*/
        currentPage4: 1, /* 分页定位到第几页*/
        total: 5, /* 总条数*/
        pageSize: api.pageSize, /* 一页多少条数据*/
        keyWord: '',
        proSearchWord: '',
        currentPage5: 1,
        proPage: '', // 项目的page
        proPageSize: 5,
        dataList: '',
        proTotal: 5,
        tab_list: [],
        memberTypeId: 0,
        status: false,
        showSelect: false, // 选择项目弹框
        form: {// 表单值
          categoryId: '',
          name: '',
          subTitle: '',
          marketPrice: '',
          price: '',
          type: 1,
          saleStatus: 1,
          coverImgUrl: '',
          description: '',
          isNumLimit: '',
          limitNum: '',
          projects: ''
        },
        tableData4: [],
        multipleSelection: [],
        proArr: [],
        content: '', // 文本框
        projects: [], // 项目[]
        categoryList: [], // 后台返回的列表
        showType: 1, // 新建是1，操作是2，查看是3
        bStatus: false,
        disabledInput: false, // 是否可输入
        categoryId: '',
        tabTitle: '', // 操作卡项-查看卡项
        fetPage: 1, // 当前分页
        categoryIdNull: ''
      }
    },
    components: {
      VueEditor,
      Jurisbtn
    },
    computed: {

    },
    methods: {
      // 新建是1，操作是2，查看是3
      check(e1) {
        this.projects = []
        this.disabledInput = true
        this.showType = 3
        this.tabTitle = '查看卡项详情'
        this.salePackageDetail(e1);
        this.bStatus = true;
        // this.proList({ proPage: 1 })
      },
      // 点击操作
      operate(e1) {
        e1 = JSON.parse(e1.toElement.name).salePackageId;
        this.projects = []
        this.showType = 2
        this.tabTitle = '修改卡项'
        this.disabledInput = false
        this.salePackageDetail(e1);
        this.bStatus = true;
        this.proList({ proPage: 1 })
      },
      closeB() {
        this.bStatus = false;
      },
      // 详情接口
      async salePackageDetail(sid) {
        const jquery = {
          salePackageId: sid
        }
        const json = await api.salePackageDetail(jquery)
        this.proArr = json.data.projectList
        this.form = json.data
      },
      // 修改详情
      async salePackageModify() {
        this.proArr.forEach(function(h) {
          this.projects.push({ projectId: h.projectId, num: h.num });// [{"projectId":2,"num":3},{"projectId":3,"num":5}]
        }.bind(this))
        this.loading = true
        /* 新增项目*/
        const jquery = {
          name: this.form.name || '',
          subTitle: this.form.subTitle || '',
          marketPrice: this.form.marketPrice || '',
          price: this.form.price || '',
          type: this.form.type,
          categoryId: this.form.categoryId || '',
          salePackageId: this.form.salePackageId || '',
          saleStatus: this.form.saleStatus,
          coverImgUrl: this.form.coverImgUrl || '',
          description: this.form.description || '',
          projects: this.projects || ''
        }
        const josn = await api.salePackageModify(jquery)
        if (josn.imei_error_code === 0) {
          this.loading = false
          this.status = false
          this.bStatus = false
          this.fet({ page: this.fetPage })
        }
      },
      // 上架saleStatus=1
      handleUp(id) {
        this.changeStatus(id, 1);
      },
      // 下架saleStatus=0
      handleDown(id) {
        this.changeStatus(id, 0);
      },
      // 详情接口
      async changeStatus(sid, type) {
        const jquery = {
          salePackageId: sid,
          saleStatus: type
        }
        const json = await api.changeStatus(jquery)
        if (json.imei_error_code === 0) {
          this.fet({ page: this.fetPage })
        }
      },

      // 富文本图片上传
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData();
        formData.append('image', file)

        axios({
          url: api.url + '/api/pcadmin/common/uploadImage',
          method: 'POST',
          data: formData
        })
          .then((result) => {
            const url = result.data.data // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
            resetUploader();
          })
          .catch((err) => {
            console.log(err);
          })
      },

      // 保存新建
      save() {
        this.proArr.forEach(function(h) {
          this.projects.push({ projectId: h.projectId, num: h.num });// [{"projectId":2,"num":3},{"projectId":3,"num":5}]
        }.bind(this))
        this.addProject();// 新建卡项-接口
      },

      handleLogoSuccess(res, file) {
        this.form.coverImgUrl = res.data
      },
      async initCategoryList() {
        const jquery = {
          pageNo: 1,
          pageSize: this.pageSize
        }
        const josn = await api.categoryList(jquery)
        this.tab_list = josn.data.list
        this.categoryList = josn.data.list
      },
      beforeLogoUpload(file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1
        /* if (!isJPG) {
          this.$message.error('上传LOGO图片只能是 JPG 格式!')
        }*/
        if (!isLt2M) {
          this.$message.error('上传LOGO图片大小不能超过 1MB!')
        }
        return isLt2M
      },
      handleDescSuccess(res, file) {
        this.form.descriptionImgUrl = res.data
      },
      // 新建卡项接口
      async addProject(e) {
        this.loading = true
        /* 新增项目*/
        const jquery = {
          name: this.form.name || '',
          subTitle: this.form.subTitle || '',
          marketPrice: this.form.marketPrice || '',
          price: this.form.price || '',
          type: this.form.type,
          categoryId: this.form.categoryId || '',
          saleStatus: this.form.saleStatus,
          coverImgUrl: this.form.coverImgUrl || '',
          description: this.form.description || '',
          projects: this.projects || ''
        }
        const josn = await api.addSalePackage(jquery)
        if (josn.imei_error_code === 0) {
          this.loading = false
          this.status = false
          this.fet({ page: this.fetPage })
        }
      },
      // 选择项目弹框
      selectPro(rows) {
        this.showSelect = true
        this.$nextTick(function() {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        });
      },
      tabAffair(e) {
        if (e === '') {
          this.categoryId = ''
        } else {
          this.categoryId = e
        }
        this.search()
      },

      closeSlePro() {
        this.showSelect = false
      },
      // 搜索项目
      searchPro() {
        this.proList({
          keyword: this.proSearchWord || '',
          categoryId: this.categoryId || ''
        })
      },
      // 多选项目
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 保存多选项目
      saveSel() {
        this.showSelect = false
        this.multipleSelection.forEach(element => {
          this.$set(element, 'num', 1)
        })
        this.proArr = this.multipleSelection;
      },
      // 改变项目次数
      handleChange(id, value) {
        // console.log(id, ~~value + 1)
      },
      // 卡项列表接口
      async fet(e) {
        /* 接口对接async await*/
        const jquery = {
          pageNo: e.page || 1,
          pageSize: this.pageSize,
          categoryId: this.categoryId || '',
          keyWord: this.keyWord || ''
        }
        const josn = await api.salePackageList(jquery)
        this.tableData3 = josn.data.list
        this.total = josn.data.totalSize
      },
      // 卡项分页
      handleCurrentChange(val) {
        this.fet({ page: val })
        this.fetPage = val;// 保存当前分页
      },
      // 项目列表接口
      async proList(e) {
        /* 接口对接async await*/
        const jquery = {
          pageNo: e.proPage || 1,
          pageSize: this.pageSize,
          searchWord: this.proSearchWord || ''
        }
        const josn = await api.projectList(jquery)
        this.tableData4 = josn.data.list
        this.proTotal = josn.data.totalSize
      },
      handleCurrentChangePro(val) {
        this.proList({ proPage: val })
      },
      search() {
        this.fet({
          keyword: this.keyword,
          categoryId: this.categoryId
        })
      },

      showAddModal: function() {
        this.projects = [];
        this.multipleSelection = [];
        this.proArr = [];
        this.form = {// 重置
          categoryId: '',
          name: '',
          subTitle: '',
          marketPrice: '',
          price: '',
          type: 1,
          saleStatus: 1,
          coverImgUrl: '',
          description: '',
          isNumLimit: '',
          limitNum: '',
          projects: ''
        };
        this.proList({ proPage: 1 })
        this.showType = 1
        this.status = true;
      },
      close() {
        this.status = false;
      }
    },
    created: function() {
      this.fet({ page: 1 })
      this.initCategoryList();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .component{
    margin:15px;
    padding:15px;
    background: #fff;
  }
  .feel-input{
    width:248px;
    margin-right: 20px;
    margin-left: 10px;
  }
  .time-input{
    width:140px;
    .el-date-editor.el-input{
      width:100%;
    }
  }
  li{
    float: left;
    padding:0 10px;
    cursor: pointer;
    color: #666;
    &.xs,&:hover{
      color: #3096f8;
    }
  }
  .teamwork2{
    z-index: 3000!important;
  }
</style>
