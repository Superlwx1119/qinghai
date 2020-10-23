export default {
  bind(el, binding) {
    if (binding.value) {
      const arr = binding.value.split('_')
      const name = arr[0]
      const css_class_name = arr[1]
      document.styleSheets[0].addRule('.el-input-number-unit' + '_' + css_class_name + ' .el-input-number__increase::before', 'content: "' + name + '"; position: absolute; left: -31px; height: 200%; line-height: 32px; min-width: 30px; background: #f0f2f5; border-left: 1px solid #DCDFE6; pointer-events:none;')
      document.styleSheets[0].insertRule('.el-input-number-unit' + '_' + css_class_name + ' .el-input-number__increase::before { content: "' + name + '"; position: absolute; left: -31px; height: 200%; line-height: 32px; min-width: 30px; background: #f0f2f5; border-left: 1px solid #DCDFE6; pointer-events:none; }', 0)
    }
  }
}
