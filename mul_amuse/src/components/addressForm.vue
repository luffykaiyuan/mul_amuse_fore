<template>
  <div class="addressForm">
    <van-form color="red">
      <van-field
        v-model="name"
        :label="namel"
        @blur="Blur('name')"
        @focus="Focus('name')"
        placeholder="请输入姓名"
        colon
        :required="requiredName"
        @input="Input('name')"
      />
      <van-field
        v-model="tel"
        type="tel"
        :rules="[{ pattern, message: '请输入正确的手机号码' }]"
        @blur="Blur('tel')"
        @focus="Focus('tel')"
        @input="Input('tel')"
        label="手机号码"
        colon
        :required="requiredTel"
        placeholder="请输入手机号码"
      />
      <van-field
        readonly
        clickable
        name="area"
        @blur="Blur('area')"
        @focus="Focus('area')"
        @input="Input('area')"
        :value="value"
        label="所在地区"
        :required="requiredArea"
        placeholder="请选择所在区域"
        colon
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        v-model="address"
        @blur="Blur('address')"
        @focus="Focus('address')"
        @input="Input('address')"
        label="详细地址"
        :required="requiredAddress"
        placeholder="请输入详细地址"
        colon
      />
<!--      <van-field v-model="ps" :label="psl" placeholder="请输入备注" colon />-->
    </van-form>
  </div>
</template>

<script>
import areaList from "../assets/area/area.js";
export default {
  data() {
    return {
      name: "",
      // ps: "",
      tel: "",
      address: "",
      areaList,
      pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
      requiredAddress: true,
      requiredName: true,
      requiredTel: true,
      requiredArea: true,
      namel: "姓" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "名",
      // psl: "备" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "注",
      showArea: false,
      value: "",
    };
  },
  methods: {
    onConfirm(values) {
      this.requiredArea = false;
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    Blur(value) {
      if (value == "address") {
        this.address == "" ? (this.requiredAddress = true) : null;
      }
      if (value == "tel") {
        this.tel == "" ? (this.requiredTel = true) : null;
      }
      if (value == "name") {
        this.name == "" ? (this.requiredName = true) : null;
      }
      this.$emit("childByValue", [
        this.requiredTel,
        this.requiredAddress,
        this.requiredName,
        this.requiredArea,
        this.name,
        this.tel,
        this.value,
        this.address,
      ]);
    },
    Focus(value) {
      if (value == "address") {
        this.requiredAddress = false;
      }
      if (value == "tel") {
        this.requiredTel = false;
      }
      if (value == "name") {
        this.requiredName = false;
      }
    },
    Input(value) {
      this.$emit("childInput", [
        this.requiredTel,
        this.requiredArea,
        this.requiredAddress,
        this.tel,
        this.name,
        this.value,
        this.address,
      ]);
    },
  },
};
</script>

<style lang='scss'>
.newAddress {
  .top {
    background-color: #f5f5f5;
  }
}
</style>
