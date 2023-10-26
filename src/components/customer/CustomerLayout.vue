<template>
    <div class="message-container">
        <div class="message-header">
            <slot name="headerLeft"></slot>
            <div class="header-img">
                <img src="../../assets/img/customerImg/msg-icon.png" alt="" srcset="" />
            </div>
            <div class="header-title">
                <p>客服</p>
            </div>
            <div class="header-close">
                <img class="close-svg" width="18" height="18" src="../../assets/img/customerImg/close.png" @click="toClose"
                    alt="" srcset="">

            </div>

        </div>
        <div class="message-content">
            <slot name="content"></slot>
        </div>
        <div class="message-bottom">
            <slot name="bottom"></slot>
        </div>
        <div v-if="store.isEmailBox" class="email-box">
            <div class="email-box-inp">
                <div class="inp-top">
                    <span>电话</span>
                    <input type="text">
                </div>
                <div class="inp-bot">
                    <span>邮箱</span>
                    <input type="text">
                </div>
            </div>
            <p class="email-text">
                (choose one to fill in)
            </p>
            <div class="email-box-btn">
                <p class="box-btn-left" @click="store.toggleEmail">
                    Cancel
                </p>
                <p class="box-btn-right">
                    Contact Me
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMessageStore } from '@/store/useMessageStore';
import { gsap } from 'gsap';
import { nextTick } from 'vue';

const store = useMessageStore();

const toClose = () => {
    // 创建一个缩小动画，将消息容器从当前大小缩小为0，持续时间为1秒
    gsap.to('.message-container', {
        duration: 1,
        x: 600,
        onComplete: () => {
            // 在动画完成后执行关闭窗口的逻辑
            store.isChatVisible = !store.isChatVisible;
            store.isEmailBox = !store.isEmailBox
            nextTick(() => {
                // 执行另一个动画，例如放大动画
                gsap.from('.right-box', {
                    duration: 1,
                    x: 200,
                });
            })

        },
    });
};
</script>

<style scoped>
.message-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    height: 90%;
    right: 1%;
    bottom: 2%;
    max-width: 502px;
    max-height: 728px;
    width: 100%;
    pointer-events: auto;
    border-radius: 3%;
    background: #FFFFFF !important;
    z-index: 9999;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 12px 48px 4px;
}

.message-header {
    display: flex;

    padding: 0 40px;
    height: 78px;
    align-items: center;
    justify-content: space-between;

}

.header-img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
}

.header-img img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}



.message-content {
    display: flex;
    flex-direction: column;
    flex: 10 1 0;
    position: relative;
    height: 345px;

}

.message-bottom {
    display: flex;
    height: 100px;
    flex-direction: column;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

}

.header-title {
    display: none;
}

.header-title p {
    font-size: 15px;
    font-weight: 700;
}

.email-box {
    width: 100%;
    height: 423px;
    position: absolute;
    background-color: #ffffff;
    bottom: 0;
    border-radius: 15px;
    z-index: 9999999999;
    box-shadow: 0px 0px 12px rgba(12, 39, 50, 0.15);
}

.email-box-inp {
    position: absolute;
    top: 86px;
    left: 25px;
    width: 90%;
    margin-bottom: 20px;

}

input:focus {
    border-color: #F1FBFF;
    border-top-color: #B2DFF1;
    /* 设置边框颜色为蓝色 */
    border-width: 1px;
    /* 设置边框宽度 */
    /* border-style: solid; */
    /* 设置边框样式为实线 */
    outline: none;
    /* 去除默认的外部轮廓样式 */
    border-radius: 0px;
}

.inp-top {
    margin-bottom: 25px;
}

.inp-bot,
.inp-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #9d9d9d;

}


.email-box-inp span {
    width: 37px;
    height: 27px;
    font-weight: 400;
    font-size: 18px;
    color: #929292;
    line-height: 27px;
}

.email-box-inp input {
    flex: 2;
    margin-left: 18px;
    border: none;
    height: 40px;
}

.email-text {
    position: absolute;
    top: 50%;
    /* 调整适当的底部距离 */
    left: 50%;
    /* 将文本水平居中 */
    transform: translateX(-49%);
    /* 通过平移来水平居中 */
    width: 200px;
    height: 27px;

    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    /* identical to box height, or 150% */
    letter-spacing: 0.04em;

    /* 灰度/3 */
    color: #929292;
}

.email-box-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    width: 100%;
}

.box-btn-left,
.box-btn-right {
    text-align: center;
    flex: 1;
    height: 58px;
    line-height: 58px;


}

.box-btn-left {
    background-color: #ececec;
    color: #474747;
    border-bottom-left-radius: 15px;
}

.box-btn-right {
    background-color: #2daee4;
    border-bottom-right-radius: 12px;
    color: #FFFFFF;
}

@media screen and (max-width: 768px) {

    /* 在小屏幕下应用的样式 */
    .message-container {
        bottom: 0;
        right: 0;
        height: 78%;
    }

    .header-img {
        display: none;

    }

    .message-header {
        padding: 0 25px;
        height: 51px;
    }


    .close-svg {
        width: 15px;
    }

    .header-title {
        display: flex;
        flex: 10;
        align-items: center;
        justify-content: center;
    }


}
</style>









