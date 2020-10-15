import { parseTime, getLastMonth } from './index'
export const PROVINCE_CODE = 440000 // 广东省编号

export const PAGE_SIZE = 10

export const EVT_TYPE_SINGLE = '1' // 零星发送
export const EVT_TYPE_BATCH = '2' // 批量发送

export const EXPORT_FLAG_SUC = '1' // 在校学生批量缴费确认（导盘）-查询批量导入明细数据 成功
export const EXPORT_FLAG_FAIL = '0' // 在校学生批量缴费确认（导盘）-查询批量导入明细数据 失败
export const RCHK_FLAG_F = '0' // 维护标志
export const INSU_TYPE_BASIC = '310' // 险种类型 - 基本医疗保险
export const CALC_RULES_PS = '1' // 计算规则  -- 个人工资
export const SUM_DATA_TYPE_S = '2' // 交接表类型 -- 交接汇总表
export const ITRC_DSPO_STAS_N = '00' // 未审签
export const ITRC_DSPO_STAS_S = '02' // 已审签
export const ITRC_DSPO_STAS_SEND = '03' // 已发送财务

// 日期时间默认值
export const CURRENT_MONTH = parseTime(new Date(), '{y}-{m}') // 当前年月
export const CURRENT_DAY = parseTime(new Date(), '{y}-{m}-{d}') // 当前天
export const CURRENT_DAY_TIME = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}') // 当前时间
export const CURRENT_MONTH_FIRST_TIME = parseTime(new Date().setDate(1), '{y}-{m}-{d} {h}:{i}:{s}') // 当前月第一天时间
export const CURRENT_MONTH_FIRST = parseTime((new Date()).setDate(1), '{y}-{m}-{d}') // 当月第一天
export const LAST_MONTH_FIRST = parseTime(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), '{y}-{m}-{d}') // 上月第一天
export const LAST_MONTH = getLastMonth() // 上个月
export const CURRENT_YEAR = parseTime(new Date(), '{y}') // 当前年

// 码表默认值
export const RCHK_FLAG_N = '0' // 审核状态 - 未审核

//  码表
export const INSUTYPE = 'insutype' //  险种
export const FINC = 'finc' //  款项
export const STOIN_REA = 'stoin_rea' // 入库原因
export const SM_BIZ_STAS = 'sm_biz_stas' // 业务状态
export const DSPO_STAS = 'dspo_stas' // 处理状态
export const CHG_INFO = 'chg_info' // 变动情况
export const CLCT_FLAG = 'clct_flag' // 缴费标识
export const CLCT_TYPE = 'clct_type' // 缴费类型
export const SURV_STAS = 'survStas' // 生存信息
export const PSNTYPE = 'psnType' // 人员类别
export const GEND = 'GEND' // 性别
export const NATY = 'NATY' // 民族
export const EDUC = 'EDUC' // 学历
export const POLSTAS = 'POLSTAS' // 政治面貌
export const MRG_STAS = 'MRG_STAS' // 婚姻状况
export const RESD_NATU = 'RESD_NATU' // 户口性质
export const CLCTNOTCDOCTYPE = 'clctNotcDocType' // 单据类型
export const SP_IDET_TYPE = 'SP_IDET_TYPE' // 特殊人员身份
export const SP_IDET_SOUC = 'SP_IDET_SOUC' // 特殊人员身份来源

// 财务管理/基金收入管理
export const APPY_MNY_STAS = 'APPY_MNY_STAS' // 请款状态
export const ASIT_TYPE = 'ASIT_TYPE' // 资助类型
export const AFIL_REGN = 'AFIL_REGN' // 请款状态
export const ARVL_FLAG = 'ARVL_FLAG' //  到账标志

//  社保卡
export const BANK_ID_CODE = 'bank_id_code' // 制卡银行

// 居民医保征缴信息核销
export const CANC_QUERY_TYPE = 'CANC_QUERY_TYPE'// 业务类型
export const BIZ_APPY_OBJ_TYPE = 'BIZ_APPY_OBJ_TYPE'// 查询类型

//  险种
export const RCHK_FLAG = 'rchk_flag' // 状态
export const ADMDVS_GZ = 'admdvs_gz' // 行政区划
export const PSN_INSU_STAS = 'psn_insu_stas' // 参保状态

// 一次性缴
export const APPY_OBJ = 'APPY_OBJ' // 申请主体
export const LEAVE_REA = 'LEAVE_REA' // 离开原因
export const INSUTYPE_RETR_FLAG = 'INSUTYPE_RETR_FLAG' // 险种离退休标识
export const SBMT_INFO = 'SBMT_INFO' // 提交资料
export const INSU_FLAG = 'INSU_FLAG' // 是否曾参保

// export const RCHK_FLAG = 'RCHK_FLAG' // 复核标志(查询页面的业务状态
export const POOLAREA = 'POOLAREA'
export const EMP_STAS = 'EMP_STAS'
export const CERT_TYPE = 'CERT_TYPE'
export const NAT_REGN_CODE = 'NAT_REGN_CODE'

// export const CANC_QUERY_TYPE = 'CANC_QUERY_TYPE' // 核销业务查询类型
// export const BIZ_APPY_OBJ_TYPE = 'BIZ_APPY_OBJ_TYPE' // 查询主体

// 大中专院校信息管理
export const MPS_APPY_BIZ_TYPE = 'MPS_APPY_BIZ_TYPE' // 申报业务类型
export const MPS_DCLA_STAS = 'MPS_DCLA_STAS' // 申报状态
export const MPS_INFO_TYPE = 'MPS_INFO_TYPE' // 信息类别
export const CRTF_CNFM_FLAG = 'CRTF_CNFM_FLAG' // 到账信息
export const MPS_BIZ_STAS = 'MPS_BIZ_STAS' // 业务状态

// 医保关系转出管理
export const RLTS_RCHK_FLAG = 'RLTS_RCHK_FLAG' // 审核状态
export const cc = 'BANK_TYPE_CODE' // 银行类型
export const TRAF_ACCT_WAY = 'TRAF_ACCT_WAY' // 个账转移方式
export const TRAF_TYPE = 'TRAF_TYPE' // 转移方式
export const ARS_PROV = 'ARS_PROV' // 是否跨省
export const ACCT_SEND_STAS = 'ACCT_SEND_STAS' // 个账传送状态

// 医保待遇管理
export const TRT_DATA_SOUR = 'TRT_DATA_SOUR' // 医保待遇数据来源
export const TRT_EVT_TYPE = 'TRT_EVT_TYPE' // 医保待遇事件类型
export const ACP_CHK_FLAG = 'ACP_CHK_FLAG' // 受理审核标志

// 个人账户
export const ACCT_BIZ_STAS = 'ACCT_BIZ_STAS' // 个人账户业务状态
export const ACCT_DATA_SOUC = 'ACCT_DATA_SOUC' // 个人账户数据来源
export const BIZ_SITA = 'BIZ_SITA' // 业务情形
export const WITD_TYPE = 'WITD_TYPE' // 提现类型
export const ACCT_DSPO_WAY = 'ACCT_DSPO_WAY' // 个人账户处理方式

// 参保管理
export const CHK_STAS = 'CHK_STAS' // 审核状态
export const EMP_CHG_TYPE = 'EMP_CHG_TYPE' // 单位变更类型

// 城乡居民缴费确认
export const URBMI_DLAY_FLAG = 'URBMI_DLAY_FLAG' // 显示延迟扣费

// 城乡居民缴费
export const CLCT_WAY = 'CLCT_WAY' // 征收方式
export const RCHK_FLAG_UN = '0' // 审核状态   -- 未审核
export const CLCT_WAY_V = '03' // 征收方式 -- 经办机构自收
export const OBJECT_TYPE_EMPLOY = '2' // 当事人对象类型  -- 灵活就业
export const OBJECT_TYPE_UNIT = '4' // 当事人对象类型   -- 单位
export const CLCT_ASGN_SCHM_CODE = 'CLCT_ASGN_SCHM_CODE' // 缴费分配方案
export const CLCT_SOUC = 'CLCT_SOUC' // 缴费来源
export const CLCT_BIZ_TYPE_CODE = 'CLCT_BIZ_TYPE_CODE' // 缴费业务类型
export const ZERO_CLCT_FLAG = 'ZERO_CLCT_FLAG' // 是否零缴费

export const ZERO_CLCT_FLAG_N = '0' // 是否零缴费 --- 否
export const CLCT_SOUC_N = '1' // 缴费来源 --- 非划拨
export const CLCT_BIZ_TYPE_CODE_V = '1' // 缴费业务类型 --- 正常缴费
export const CLCT_ASGN_SCHM_CODE_V = '310' // 缴费分配方案 --- 默认

export const CAPT_DFR_TAB_STAS = 'CAPT_DFR_TAB_STAS'// 资金拨付表状态 --待保存

export const EMP_TYPE = 'EMP_TYPE' // 单位类型

export const ACCT_CHK_STAS = 'ACCT_CHK_STAS' // 注资状态
export const NCHG_DEPT = 'NCHG_DEPT' // 经办机构
export const OPT_CHNL = 'OPT_CHNL' // 经办渠道

export const PSN_CERT_TYPE = 'PSN_CERT_TYPE' // 证件类型

export const USED_STAS = 'USED_STAS' // 确认情况

// 医保关系录入
export const REFLIN_CNFM_STAS = 'REFLIN_CNFM_STAS' // 匹配方式
export const PRCS_TYPE = 'PRCS_TYPE' // 办理形式
export const ADMDVS = 'ADMDVS' // 经办机构行政区划
export const TRAF_ACCT_FLAG = 'TRAF_ACCT_FLAG' // 是否转移个账
export const REFLIN_USED_STAS = 'REFLIN_USED_STAS' // 确认情况
export const CHG_REA = 'CHG_REA' // 变更原因

export const SUM_DATA_TYPE = 'SUM_DATA_TYPE' // 业务类型

export const ITRC_DSPO_STAS = '00' // 处理状态

export const FIN_REFD_FLAG = 'FIN_REFD_FLAG' // 向财政退款标志

