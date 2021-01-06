<!--
 * @description:详情页面
 * @fileName: Details.vue
 * @author: Javi
 * @date: 2020-12-29 17:49:39
 * @version: V1.0
 !-->
<template>
  <div class="deatils">
    <div
      class="deatils_header"
      :style="{
        background: `url(${require('@/assets/img/member/member-bg-top.png')})`,
      }"
    >
      <v-banner :HomeState="false" :Arr="bannerList"></v-banner>
      <div class="deatils_title">
        <p><b>￥118</b> <del>门市价：￥259</del></p>
        <p style="margin-top: 5px">剩余18件</p>
      </div>
      <div class="deatils_name">
        <p>
          <b>龙吟台五百元尊享双人套餐</b>
          <span @click="fxs()">
            <van-image
              width="20"
              height="20"
              style="position: relative; top: 3px; right: 5px"
              :src="require('@/assets/img/details/details-icon-share.png')"
            ></van-image>
            <span>分享</span>
          </span>
        </p>
        <p style="color: gray; font-size: 14px; margin: 5px 0 10px 0">
          温馨提示:会员兑换，不退不换，逾期作废
        </p>
        <p>
          <span
            style="
              background: #971818;
              color: white;
              padding: 2px 5px;
              font-size: 13px;
              border-radius: 10px;
            "
            >佣金：05-10元</span
          >
          <span style="color: gray; font-size: 13px">总份数:100</span>
        </p>
      </div>
      <van-dialog v-model="fx">
        <van-image
          width="100%"
          height="100%"
          src="https://www.kuadh.com/usr/uploads/2020/11/2114566873.jpg"
        ></van-image>
      </van-dialog>
      <van-dialog v-model="show">
        <van-image
          width="100%"
          height="100%"
          src="https://www.kuadh.com/usr/uploads/2020/11/2114566873.jpg"
        ></van-image>
      </van-dialog>
      <!-- 规格 -->
      <section>
        <header>规格选择</header>
        <article>
          <van-tabs type="line" border style="width: 100%">
            <van-tab title="258双人套餐"
              >258双人套餐258双人套餐258双人套餐</van-tab
            >
            <van-tab title="258双人套餐"
              >258双人套餐258双人套餐258双人套餐258双人套餐258双人套餐</van-tab
            >
          </van-tabs>
        </article>
      </section>
      <!-- 店铺信息 -->
      <section class="dp_info">
        <header>店铺信息</header>
        <article>
          <li v-for="item in 3" :key="item[0]">
            <div>
              <span>
                <van-image
                  width="15"
                  style="margin-right: 5px"
                  height="20"
                  :src="require('@/assets/img/details/details-icon-address.png')"
                ></van-image>
                <span class="custom-title">龙鳞台（太古里店）</span>
              </span>
              <p>中国.四川.成都高新区天府- -街888号</p>
            </div>
            <van-image
              width="20"
              height="20"
              @click="phone"
              :src="require('@/assets/img/details/details-icon-phone.png')"
            ></van-image>
          </li>
          <!-- 更多 -->
          <van-collapse v-model="activeName" accordion :border="false">
            <van-collapse-item title="更多" name="1">
              <li v-for="item in 5" :key="item[0]">
                <div>
                  <span>
                    <van-image
                      width="15"
                      style="margin-right: 5px"
                      height="20"
                      :src="require('@/assets/img/details/details-icon-address.png')"
                    ></van-image>
                    <span class="custom-title">龙鳞台（太古里店）</span>
                  </span>
                  <p>中国.四川.成都高新区天府- -街888号</p>
                </div>
                <van-image
                  width="20"
                  height="20"
                  @click="phone"
                  :src="require('@/assets/img/details/details-icon-phone.png')"
                ></van-image>
              </li>
            </van-collapse-item>
          </van-collapse>
        </article>
      </section>
      <!-- 详情 -->
      <section>
        <van-tabs type="line" style="width: 100%">
          <van-tab title="商品介绍">
            <div v-html="html" class="shop_details"></div>
          </van-tab>
        </van-tabs>
      </section>
    </div>
    <footer>
      <van-button type="default" @click="Url('/')" style="witdh: 33%"
        >商城首页</van-button
      >
      <van-button type="default" style="witdh: 33%" @click="userphone"
        >联系客服</van-button
      >
      <van-button type="danger" style="witdh: 33%" @click="Url('/order')"
        >立即购买</van-button
      >
    </footer>
    <div style="width: 100%; height: 44px"></div>
  </div>
</template>

<script>
import banner from "../../components/banner";
export default {
  name: "deatils",
  data() {
    return {
      show: false,
      fx: false,
      activeName: "0",
      bannerList: [
        {
          img: require("@/assets/img/member/member-banner-poster1.png"),
          link: "/",
        },
        {
          img: require("@/assets/img/member/member-banner-poster1.png"),
          link: "/",
        },
      ],
      html: `<section data-role="outer" label="Powered by 135editor.com" style="">
    <p><strong
            style="color: rgb(51, 51, 51); font-size: 17.92px; letter-spacing: 1.5px; text-align: center; caret-color: red; -webkit-tap-highlight-color: transparent; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><span
                style="-webkit-tap-highlight-color: transparent; font-size: 14px;"><strong
                    style="-webkit-tap-highlight-color: transparent; letter-spacing: 2px; font-family: -apple-system, Helvetica, sans-serif;"><span
                        style="-webkit-tap-highlight-color: transparent; background-color: #FE3F3F; color: #FFFFFF;"><img
                            src="https://135editor.cdn.bcebos.com/files/users/898/8985736/202012/06UXCM7un_HeY4.jpg"
                            alt="店面图3.jpg" data-ratio="0.6638888888888889" data-w="1080"
                            style="box-sizing:border-box;width:&quot;auto&quot;;"></span></strong></span></strong><br>
    </p>
    <section data-role="paragraph" class="_135editor" style="text-align: center;">
        <p style="text-align: center; box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; word-break: break-all; color: rgb(51, 51, 51); font-size: 17.92px; font-weight: normal; letter-spacing: 1.5px; font-family: -apple-system, Helvetica, sans-serif;"
            align="center"><span
                style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; font-size: 20px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><strong
                    style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px;"><strong
                        style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; color: rgb(51, 51, 51); font-size: 14px; letter-spacing: 2px; text-align: center; font-family: -apple-system, Helvetica, sans-serif;"><span
                            style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; background-color: rgb(254, 63, 63); color: rgb(255, 255, 255); font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">“
                            圣梦美容”</span></strong></strong></span>
        </p>
        <p style="text-align: center; box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; word-break: break-all; color: rgb(51, 51, 51); font-size: 17.92px; font-weight: normal; letter-spacing: 1.5px; font-family: -apple-system, Helvetica, sans-serif;"
            align="center"><br></p>
        <p><span style="font-size: 14px;">圣梦致力于将国际前沿美容产品、仪器、技术带给顾客，
                为顾客提供从肌肤容颜、身体塑形到健康管理的一站式美丽生活服务，让顾客
                达到内在美与外在美和谐统一的持久美丽状态</span></p>
        <p><br></p>

        <p style="text-align: center; box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; word-break: break-all; color: rgb(51, 51, 51); font-size: 17.92px; font-weight: normal; letter-spacing: 1.5px; font-family: -apple-system, Helvetica, sans-serif;"
            align="center"><span
                style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><strong
                    style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px;"><span
                        style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; font-size: 14px;"><strong
                            style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; color: rgb(51, 51, 51); font-size: 14px; letter-spacing: 2px; text-align: center; font-family: -apple-system, Helvetica, sans-serif;"><span
                                style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; background-color: #fe3f3f; color: #ffffff;">&nbsp;<span
                                    style="padding: 0px; font-size: 14px;">紧肤面护</span>+<span
                                    style="padding: 0px; font-size: 14px;">老姜温络散寒背护</span>+<span
                                    style="padding: 0px; font-size: 14px;">美胸舒活养护</span>+<span
                                    style="padding: 0px; font-size: 14px;">甘菊莹亮眼护</span></span></strong></span></strong></span><span
                style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px;"><strong
                    style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px;"><span
                        style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; font-size: 14px;"><strong
                            style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; color: rgb(51, 51, 51); font-size: 14px; letter-spacing: 2px; text-align: center; font-family: -apple-system, Helvetica, sans-serif;"><span
                                style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; background-color: #fe3f3f; color: #ffffff;"><span
                                    style="font-size: 14px; font-family: 宋体;"></span>&nbsp;</span></strong></span></strong></span>
        </p>
        <p style="text-align: center; box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; word-break: break-all; color: rgb(51, 51, 51); font-size: 17.92px; font-weight: normal; letter-spacing: 1.5px; font-family: -apple-system, Helvetica, sans-serif;"
            align="center"><span
                style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; font-size: 24px; color: #000000;"><strong
                    style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px;"><strong
                        style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; color: rgb(51, 51, 51); font-size: 14px; letter-spacing: 2px; text-align: center; font-family: -apple-system, Helvetica, sans-serif;"><span
                            style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; background-color: #fe3f3f; color: #ffffff;">成都16店通用！</span></strong></strong></span>
        </p>
        <p style="text-align: center; box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; word-break: break-all; color: rgb(51, 51, 51); font-size: 17.92px; font-weight: normal; letter-spacing: 1.5px; font-family: -apple-system, Helvetica, sans-serif;"
            align="center"><span
                style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px; color: #000000;"><strong
                    style="box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0px; padding: 0px;"><span
                        style="color: rgb(51, 51, 51); font-size: 14px; font-weight: normal; letter-spacing: 2px; text-align: center; display: inline !important; font-family: -apple-system, Helvetica, sans-serif;">周末节假日通用不加收</span></strong></span>
        </p>
        <section class="_135editor" data-tools="135编辑器" data-id="94401">
            <section style="box-sizing:border-box;width:100%;margin:10px auto;" data-width="100%">
                <section style="display: flex; justify-content: space-between;">
                    <section style="box-sizing:border-box; width: 100%; height: 0px; overflow: hidden;"
                        data-width="100%"></section>
                    <section
                        style="box-sizing:border-box; width: 100%; margin-left: 12px; height: 0px; overflow: hidden;"
                        data-width="100%"></section>
                </section>
            </section>
        </section>
        <section class="_135editor" data-tools="135编辑器" data-id="99864">
            <section style="margin: 10px auto;">
                <section style="border: 5px solid rgb(255, 102, 104); box-sizing: border-box;">
                    <section class="box-edit" style="box-sizing: border-box;">
                        <section style="text-align: center;margin-top: 20px;">
                            <section class="135brush" data-brushtype="text"
                                style="display: inline-block;font-size: 16px;letter-spacing: 1.5px;padding:10px 2em;color: #ff6668;font-weight: bold;background: #ff6668;border-top-left-radius: 15px;border-top-right-radius: 15px;border-bottom-right-radius: 15px;">
                                <span style="color: #ffffff;">【圣梦十六店通用</span>】
                            </section>
                        </section>
                        <section style="padding: 25px 20px; box-sizing: border-box;" hm_fix="376:947">
                            <section data-autoskip="1" class="135brush"
                                style="text-align: justify; line-height: 1.75em; font-size: 14px;">
                                <section class="_135editor" data-tools="135编辑器" data-id="88109"
                                    style="color: #292929; letter-spacing: 1.5px;">
                                    <section style="text-align: center; margin: 0px auto;">
                                        <section
                                            style="border-radius: 4px; border: 1px solid rgb(117, 117, 118); display: inline-block; padding: 5px 20px; box-sizing: border-box;">
                                            <p style="color: #fefefe; font-size: 14px;"><span
                                                    style="font-size: 18px; color: #595959;" class="135brush"
                                                    data-brushtype="text">仅29.9元享门市价<span
                                                        style="font-size: 18px; color: #ff6668;"><strong><span
                                                                style="font-size: 24px;">1720元</span></strong></span></span>
                                            </p>
                                        </section>
                                    </section>
                                </section>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <br>
                                </p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <strong><span style="font-size: 18px;">【1+3选1】套餐内容</span></strong>
                                </p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <br>
                                </p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    晶致焕白紧肤面护项目1次（全程80-84分钟）+</p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    A套餐：美胸舒活养护项目1次（全程71分钟）</p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    B套餐：老姜温络散寒背护项目1次（全程75分钟）</p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    C套餐：甘菊莹亮眼护项目1次（全程47分钟）</p>
                                <p style="color: #292929; letter-spacing: 1.5px;"><br></p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <strong><span style="font-size: 18px;">【购买日期】</span></strong>
                                </p>
                                <p style="text-align: center; color: rgb(0, 0, 0); font-size: 14px; font-weight: normal; letter-spacing: 2px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;"
                                    align="center"><br></p>
                                <p><br></p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <span
                                        style="color: rgb(0, 0, 0); font-weight: normal; letter-spacing: 2px; text-align: center; font-size: 17px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;">即日起-2020.12.31</span>
                                </p>
                                <p style="text-align: center; color: rgb(0, 0, 0); font-size: 14px; font-weight: normal; letter-spacing: 2px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;"
                                    align="center"><br></p>
                                <p><br></p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <strong><span
                                            style="font-size: 18px; color: rgb(0, 0, 0); font-weight: normal; letter-spacing: 2px; text-align: center; display: inline !important; font-family: Optima-Regular, PingFangTC-light;">【预约日期】</span></strong>
                                </p>
                                <p style="text-align: center; color: rgb(0, 0, 0); font-weight: normal; letter-spacing: 2px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;"
                                    align="center"><br></p>
                                <p><br></p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <span
                                        style="color: rgb(0, 0, 0); font-weight: normal; letter-spacing: 2px; text-align: center; font-size: 17px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;">预约后-2021.03.30</span>
                                </p>
                                <p style="text-align: center; color: rgb(0, 0, 0); font-size: 14px; font-weight: normal; letter-spacing: 2px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;"
                                    align="center"><br></p>
                                <p><br></p>
                                <p style="text-align:center;" align="center"><strong><span
                                            style="letter-spacing: 2px; font-size: 18px; font-family: Optima-Regular, PingFangTC-light;">【预约方式】</span></strong>
                                </p>
                                <p style="letter-spacing: 2px; font-size: 18px;"><br></p>
                                <p><br></p>
                                <p style="text-align:center;" align="center"><span
                                        style="color: rgb(51, 51, 51); font-weight: normal; text-align: center; letter-spacing: 2px; font-size: 17px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;">短信网址预约</span>
                                </p>
                                <p style="text-align: center; color: rgb(51, 51, 51); font-size: 14px; font-weight: normal; letter-spacing: 2px; display: inline !important; font-family: Optima-Regular, PingFangTC-light;"
                                    align="center"><br></p>
                                <p><br></p>
                                <p style="text-align:center;" align="center"><span
                                        style="color: rgb(51, 51, 51); font-size: 14px; font-weight: normal; letter-spacing: 2px; text-align: center; display: inline !important; font-family: Optima-Regular, PingFangTC-light;"><strong
                                            style="margin: 0px; padding: 0px; max-width: 100%; color: rgb(255, 255, 255); font-size: 14px; letter-spacing: 2px; text-align: center; cursor: text; box-sizing: border-box !important; overflow-wrap: break-word !important; outline: none 0px !important; font-family: Optima-Regular, PingFangTC-light;"><span
                                                style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; word-wrap: break-word !important; font-size: 14px; color: #ffffff; background-color: #ff6668; text-align: justify; cursor: text; outline: none 0px !important;">关注“成都惠享生活”公众号</span></strong></span>
                                </p>
                                <p style="text-align:center;color: #292929; letter-spacing: 1.5px;" align="center">
                                    <strong
                                        style="caret-color: red; max-width: 100%; color: rgb(0, 0, 0); letter-spacing: 2px; overflow-wrap: break-word !important; font-family: Optima-Regular, PingFangTC-light;">&lt;请仔细阅读文末温馨提示&gt;</strong><br>
                                </p>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <section class="_135editor" data-tools="135编辑器" data-id="99508">
            <section style="margin:10px auto;text-align: center;">
                <section style="display: flex;justify-content: flex-end;align-items: center;">
                    <section style="align-self: flex-end;margin-bottom: 10px;margin-right: -75px;">
                        <section class="135brush" data-brushtype="text"
                            style="font-size: 16px;font-weight: bold;letter-spacing: 1.5px;align-self: center;background: #ff6668;color: #fff;padding: 4px 1em;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);-o-transform: rotate(0deg);">
                            舒适环境，休闲体验
                        </section>
                    </section>
                    <section
                        style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <section
                            style="font-size: 30px;font-weight: bold;color: #ff6668;background: #fff;align-self: flex-start;margin-bottom: -30px;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);-o-transform: rotate(0deg);"
                            hm_fix="387:483">0<span class="autonum" data-original-title="" title="">1</span>
                        </section>
                        <section class="assistant"
                            style="box-sizing:border-box; width: 100px; height: 73px; border: 2px solid rgb(255, 102, 104); overflow: hidden;">
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <p><br></p>
        <section class="_135editor" data-id="98408" data-tools="135编辑器">
            <section style="margin:10px auto;">
                <section style="display:flex;justify-content:center;align-items:center;">
                    <section style="box-sizing:border-box;width:100%;" data-width="100%"><img
                            style="box-sizing:border-box;width:100%;display:block;"
                            src="https://135editor.cdn.bcebos.com/files/users/898/8985736/202012/0nnFJrzUW_Gd2g.jpg"
                            data-ratio="0.5965583173996176" data-w="523" hm_fix="314:594" data-width="100%">
                    </section>
                    <section class="assistant" style="box-sizing:border-box;width:100px;">
                        <section class="assistant"
                            style="box-sizing:border-box; width: 35px; margin: 0px auto; height: 0px; overflow: hidden;">
                        </section>
                    </section>
                </section>
                <section style="display:flex;justify-content:center;align-items:center;margin-top:10px;">
                    <section class="assistant" style="box-sizing:border-box;width:100px;">
                        <section class="assistant"
                            style="box-sizing:border-box; width: 35px; margin: 0px auto; height: 0px; overflow: hidden;">
                        </section>
                    </section>
                    <section style="box-sizing:border-box;width:100%;" data-width="100%"><img
                            src="https://135editor.cdn.bcebos.com/files/users/898/8985736/202012/0QvY9fVOR_CMTq.jpg"
                            alt="店面图8.jpg" data-ratio="0.6666666666666666" data-w="1080"
                            style="box-sizing:border-box;width:&quot;auto&quot;;"></section>
                </section>
            </section>
        </section>
        <p><br></p>
        <p><span style="font-size: 16px;">圣梦美容每家店</span></p>
        <p><span style="font-size: 16px;">装修风格奢华，充满贵族气息</span></p>
        <p><span style="font-size: 16px;">入目就是满满的舒适感</span></p>
        <p><br></p>
        <p><br></p>
        <p style="text-align:center;" align="center"><img
                src="https://135editor.cdn.bcebos.com/files/users/898/8985736/202012/0Ftmr6LAH_LRWJ.jpg"
                alt="店面图6.jpg" data-ratio="0.6675925925925926" data-w="1080"
                style="box-sizing:border-box;width:&quot;auto&quot;;"></p>
        <p style="text-align:center;" align="center"><br></p>
        <p style="text-align:center;" align="center"><img
                src="https://135editor.cdn.bcebos.com/files/users/898/8985736/202012/0SmFzO8K8_uBWX.jpg"
                alt="店面图5.jpg" data-ratio="1.4935185185185185" data-w="1080"
                style="box-sizing:border-box;width:&quot;auto&quot;;"></p>
        <p>店内配备了专门的技师，不管是美甲还是美肤</p>
        <p>一站式搞定，解决到处跑的烦恼</p>
        <p>床上用品一客一换，定期消毒</p>
        <p>从里到外，让你放心安心</p>
        <section class="_135editor" data-tools="135编辑器" data-id="99508">
            <section style="margin:10px auto;text-align: center;">
                <section style="display: flex;justify-content: flex-end;align-items: center;">
                    <section style="align-self: flex-end;margin-bottom: 10px;margin-right: -75px;">
                        <section class="135brush" data-brushtype="text"
                            style="font-size: 16px;font-weight: bold;letter-spacing: 1.5px;align-self: center;background: #ff6668;color: #fff;padding: 4px 1em;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);-o-transform: rotate(0deg);">
                            圣梦美容套餐介绍
                        </section>
                    </section>
                    <section
                        style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <section
                            style="font-size: 30px;font-weight: bold;color: #ff6668;background: #fff;align-self: flex-start;margin-bottom: -30px;transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);-o-transform: rotate(0deg);"
                            hm_fix="387:483">0<span class="autonum" data-original-title="" title="">2</span>
                        </section>
                        <section class="assistant"
                            style="box-sizing:border-box; width: 100px; height: 73px; border: 2px solid #ff6668; overflow: hidden;">
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <p style="text-align:center;" align="center"><br></p>
        <p style="text-align:center;" align="center"><span
                style="color: #ff6668; font-size: 25px; caret-color: red;">你需要是圣梦的非会员女性</span><br>
        </p>
        <section class="_135editor" data-tools="135编辑器" data-id="98924">
            <section style="margin: 10px auto;">
                <section
                    style="display: flex;justify-content: center;align-items: center;margin-top:-2px;flex-shrink: 0;">
                    <section class="assistant"
                        style="flex-shrink: 0; margin-right: -20px; margin-top: 1px; height: 0px; overflow: hidden;transform: scale(0.4);-webkit-transform: scale(0.4);-moz-transform: scale(0.4);-ms-transform: scale(0.4);-o-transform: scale(0.4);">
                    </section>
                    <section class="135brush" data-brushtype="text"
                        style="padding: 0px 12px; font-size: 14px; color: rgb(255, 102, 104); text-align: center; letter-spacing: 1.5px; box-sizing: border-box;">
                        这样你就有机会获得<span style="font-size: 20px;">美肤体验一次</span></section>
                    <section class="assistant"
                        style="flex-shrink: 0; margin-left: -20px; height: 0px; overflow: hidden;transform: scale(0.4);-webkit-transform: scale(0.4);-moz-transform: scale(0.4);-ms-transform: scale(0.4);-o-transform: scale(0.4);">
                    </section>
                </section>
            </section>
        </section>

        <section class="_135editor" data-tools="135编辑器" data-id="100216">
            <section class="assistant" style="box-sizing:border-box;width: 50px; margin: 10px auto;"><img
                    class="assistant" style="box-sizing:border-box;width: 100%; display: block;"
                    src="https://bdn.135editor.com/files/images/editor_styles/44e7685d45a31be0e47133cbd0d29114.jpg"
                    data-ratio="2.1781376518218623" data-w="494" hm_fix="286:257" data-width="100%">
            </section>
        </section>


        <p style="text-align:center;" align="center"><br></p>
        <p style="text-align:center;" align="center"><img
                src="https://135editor.cdn.bcebos.com/files/users/898/8985736/202012/0MgyALmYE_cIk4.jpg"
                alt="1+3选1产品介绍图1.jpg" data-ratio="1.6075" data-w="800"
                style="box-sizing:border-box;width:&quot;auto&quot;;"></p>
    </section>
    <section class="_135editor" data-role="paragraph">
        <p><br></p>
    </section>
</section>`,
    };
  },
  components: {
    "v-banner": banner,
  },
  methods: {
    userphone() {
      this.show = true;
    },
    fxs() {
      this.fx = true;
    },
    phone() {
      window.location.href = "tel:400-0000-688";
    },
  },
  mounted() {},
};
</script>

<style lang='scss'>
.deatils {
  footer {
    .van-button {
      width: 33.33%;
    }
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    left: 0;
  }
  .van-tabs__content,
  .van-cell__title {
    text-align: left;
  }
  .shop_details {
    img {
      width: 100%;
    }
  }
  .deatils_header {
    width: 100%;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    background-position-y: -100px !important;
    height: 300px;
    .deatils_title {
      width: 90%;
      margin: 0 auto;
      position: relative;
      top: -5px;
      background: #ffc341;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        justify-content: space-between;
        color: white;
        padding: 5px;
        b {
          letter-spacing: 1px;
          font-size: 23px;
        }
        del {
          font-size: 13px;
          margin-left: 5px;
          margin-top: 10px;
        }
      }
    }
    .deatils_name {
      width: 90%;
      margin: 0 auto;
      p {
        b {
          font-size: 20px;
        }
        justify-content: space-between;
        display: flex;
      }
    }
  }
  .dp_info {
    article {
      li {
        justify-content: space-between;
        display: flex;
        margin: 10px 0;
        div {
          span {
            display: flex;
          }
          p {
            color: gray;
            font-size: 13px;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>
