<template>
	<view class="content padding-top">
		<view class="cu-bar bg-white">
			<view class="action">图片上传</view>
			<view class="action">{{ imgList.length }}/4</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length < 4"><text class="cuIcon-cameraadd"></text></view>
			</view>
		</view>
		<view class="btn-area"><button class="cu-btn bg-green shadow" @tap="Upload">上传</button></view>
	</view>
</template>

<script>
const uploadImage = require('../../utils/uploadToAliOss/uploadAliyun.js');
export default {
	data() {
		return {
			imgList: []
		};
	},
	onLoad() {},
	methods: {
		Upload() {
			let _this = this;
			console.log('_this.imgList----', _this.imgList);
			if (_this.imgList.length > 0) {
				/**
				 * 上传图片到阿里云OSS
				 */
				let promise = Promise.all(
					_this.imgList.map((tempFilePath, index) => {
						return new Promise(function(resolve, reject) {
							//JS直传阿里云OSS
							uploadImage({
								filePath: tempFilePath,
								dir: 'xxxx/xxxx/', //上传的目录
								success: function(res) {
									console.log('上传成功---', res);
									resolve(res);
								},
								fail: function(res) {
									console.log('上传失败---', res);
								}
							});
						});
					})
				).then(() => {
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					});
				});
			}
		},
		ChooseImage() {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths);
					} else {
						this.imgList = res.tempFilePaths;
					}
				}
			});
		},
		ViewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			uni.showModal({
				title: '召唤师',
				content: '确定要删除这段回忆吗？',
				cancelText: '再看看',
				confirmText: '再见',
				success: res => {
					if (res.confirm) {
						this.imgList.splice(e.currentTarget.dataset.index, 1);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.btn-area {
	margin: 100rpx 0rpx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.cu-btn {
		width: 90%;
		height: 80rpx;
	}
}
</style>
