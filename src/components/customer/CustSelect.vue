<template>
  <CustomerLayout>
    <template #headerLeft>
      <div class="header-width">

      </div>
    </template>
    <template #content>
      <div class="content-box">
        <div class="content-title">
          <div class="title-img">
            <img class="" src="../../assets/img/customerImg/content.png" alt="" srcset="" />
          </div>
          <div class="title-text">
            <img src="../../assets/img//customerImg/title-text-img.png" alt="" srcset="">

            <img src="../../assets/img//customerImg/title-text-img2.png" alt="" srcset="">
          </div>
        </div>
        <div class="select-box">
          <div class="consultation-top">
            <img class="consultation-text-svg" src="../../assets/img/customerImg/message2.png" alt="" srcset="" />
            <p>online consultation</p>
          </div>
        </div>
        <div class="consultation-box " @click="toCustomer">
          <div class="consultation">
            <div class="consultation-left">
              <img src="../../assets/img/customerImg/start.png" alt="">
              <img src="../../assets/img/customerImg/consultation.png" alt="">
            </div>
            <img class="consultation-right" src="../../assets/img/customerImg/fly.png" alt="">
          </div>

        </div>
      </div>

    </template>
    <template #bottom>
      <div class="bottom-info">
        <p>Contact us: +65 81827060</p>
        <div class="message-bottom-right">
          <p>FAQ</p>
          <p>Service Center</p>
        </div>
      </div>
    </template>
  </CustomerLayout>
</template>

<script setup>
import { ref, nextTick } from "vue";
import CustomerLayout from "./CustomerLayout.vue";
import { useMessageStore } from "@/store/useMessageStore";
import { socket, setSocketUrl } from "@/socket";
const store = useMessageStore();
import { gsap } from "gsap";
const maxrecoon = ref(0);
const animate = gsap.timeline();
const isButtonDisabled = ref(false);

if (store.setSocketUrl) {
  setSocketUrl(store.setSocketUrl)
}
const toCustomer = async () => {
  const userID = localStorage.getItem("userID");
  console.log(userID);
  if (userID) {
    //   this.usernameAlreadySelected = true;
    socket.auth = { userID };
    socket.connect();
  } else {
    socket.connect();
    console.log(socket.connect());
  }
  isButtonDisabled.value = true;

  // 使用 GSAP 添加进入动画效果
  // nextTick(() => {
  if (store.serverCode.code == 1) {
    animate.to(".message-container", {
      duration: 1,
      opacity: 0,
      y: -20,
      onComplete: () => {
        // 在动画完成后执行关闭窗口的逻辑
        store.toCustomer = false;
        gsap.set(".message-container", { y: 0 });
        isButtonDisabled.value = false;
      },
    });
  } else {
    isButtonDisabled.value = false;
  }

  // });
};
socket.on("session", (res) => {
  localStorage.setItem("userID", res.userID);
});
socket.on("time passes", ({ msg, code }) => {
  store.serverCode.msg = msg;
  store.serverCode.code = code;
  if (code == 0) {
    socket.disconnect();
  }
});
socket.on("user message", (msg) => {
  for (const key in msg) {
    store.userMessage.push(msg[key]);
  }
});
socket.on("connect_error", (error) => {
  console.error("连接失败：", error);
  // 在这里处理连接失败的逻辑
  if (maxrecoon.value < 3) {
    socket.connect();
  } else {
    socket.disconnect();
    isButtonDisabled.value = false;
  }
});

nextTick(() => {
  // 使用GSAP添加进入动画到content-title和select-box元素
  gsap.fromTo(
    ".content-title",
    { opacity: 0, x: -10 },
    { duration: 1, opacity: 0.5, x: 0 }
  );
  gsap.fromTo(
    ".select-customer-img",
    { opacity: 0, x: 50 },
    { duration: 1, opacity: 0.5, x: 0 }
  );
});
</script>

<style scoped>
.header-width {
  width: 20px;
}

.content-box {
  padding: 0 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 370px;
  padding: 0 20px;
  flex: 5;
}

.title-img {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
}

.title-img img {
  width: 66px;
  height: 55px;
}

.title-text {
  margin-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.title-text img {
  height: 36px;
}

.title-text img:nth-child(2) {
  margin-top: 2%;
  width: 254px;
}

.title-text img:nth-child(1) {
  width: 85px;
}

.select-box {
  width: 100%;
  /* background-color: blue; */
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}


.consultation-box {
  display: flex;
  flex: 1;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  width: 100%;
  border-radius: 10px;
}

.consultation {
  height: 100px;
  width: 100%;
  background-color: #33bcea;
  margin: 10px 0;
  border-radius: 50px;
  display: flex;
  /* 将左右边距调整为0，不需要设置右边距 */

}

.consultation-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  flex: 2;
  padding-left: 40px;
}

.consultation-left img {
  height: 32px;
}

.consultation-left img:nth-child(1) {
  width: 73px;
}

.consultation-left img:nth-child(2) {
  width: 185px;
  margin-top: 5px;
}

.consultation-right {
  display: flex;
  width: 160px;
  height: 99px;
}


.consultation-text-svg {
  width: 26.5px;
  height: 26.5px;
  margin-right: 8px;
}

.consultation-top {
  display: flex;
  align-items: center;
  font-size: 18px;
  height: 27px;
  color: #474747;
  margin-bottom: 5px;
}



.bottom-info {
  font-size: 12px;
  display: flex;
  padding: 0 30px;
  flex: 2;
  justify-content: space-between;
  align-items: center;
  color: rgba(146, 146, 146, 1);
}

.message-bottom-right {
  display: flex;
  justify-content: space-between;
}

.message-bottom-right p:nth-child(1) {
  margin-right: 20px;
}



/* 或者使用媒体查询来根据屏幕宽度调整字体大小 */
@media (max-width: 768px) {

  .content-title {
    padding: 30% 50px;
    height: 50%;
  }

  .title-img img {
    width: 60px;
    height: 50px;
  }

  .title-text p img {
    height: 25px;
  }

  .consultation-top {
    font-size: 17px;
  }

  .consultation-left img:nth-child(1) {
    width: 72px;
  }

  .consultation-left img:nth-child(2) {
    width: 125px;
    margin-top: 5px;
  }

}
</style>
