/**
 * @Author: lvzhaoxuan
 * @Date: 2026-02-03 16:22:57
 * @Description: 海康无插件SDK接口定义 依据海康威视WebSDK_noPlugin_V3.4.0_251202_20251204103656 编写 内容与返回值请以文档为准
 */

declare namespace HikVisionWebSDKNoPluginVersion {
	/**
	 * @description 海康SDK错误码 异常事件回调在用户传入的回调函数中处理，第一个参数为事件代码（回放异常，回放停止和硬盘空间不足），第二个参数为事件发生的窗口号。
	 * */
	export const HKSDK_ERROR_CODE: {
		/** 回放异常*/
		readonly PLUGIN_EVENTTYPE_PLAYABNORMAL: 0
		/** 回放停止*/
		readonly PLUGIN_EVENTTYPE_PLAYBACKSTOP: 2
		/** 语音对讲失败*/
		readonly PLUGIN_EVENTTYPE_AUDIOTALKFAIL: 3
		/** 硬盘空间不足（录像）*/
		readonly PLUGIN_EVENTTYPE_NOFREESPACE: 21
	}

	/** HKSDK_ERROR_CODE 对象的 value 类型 */
	export type HKSDKErrorCodeValue = (typeof HKSDK_ERROR_CODE)[keyof typeof HKSDK_ERROR_CODE]

	export const HK_PLAYER_ERROR_CODE: {
		readonly 1001: "码流传输过程异常"
		readonly 1002: "回放结束"
		readonly 1003: "取流失败，连接被动断开"
		readonly 1004: "对讲连接被动断开"
		readonly 1005: "广播连接被动断开"
		readonly 1006: "视频编码格式不支持 目前只支持h264 和 h265"
		readonly 1007: "网络异常导致websocket断开"
		readonly 1008: "首帧回调超时"
		readonly 1009: "对讲码流传输过程异常"
		readonly 1010: "广播码流传输过程异常"
		readonly 1011: "数据接收异常，请检查是否修改了视频格式"
		readonly 1012: "播放资源不足"
		readonly 1013: "当前环境不支持该鱼眼展开模式"
		readonly 1014: "外部强制关闭了"
		readonly 1015: "获取播放url失败"
		readonly 1016: "文件下载完成"
		readonly 1017: "密码错误"
		readonly 1018: "链接到萤石平台失败"
		readonly 1019: "未找到录像片段"
		readonly 1020: "水印模式等场景，当前通道需要重新播放"
		readonly 1021: "缓存溢出"
		readonly 1022: "采集音频失败，可能是在非https/localhost域下使用对讲导致,或者没有插耳机等"
	}

	export type HK_PLAYER_ERROR_CODE_VALUE = keyof typeof HK_PLAYER_ERROR_CODE

	export interface WebVideoCtrl {
		/**
		 * @description 检查浏览器是否支持无插件，Chromium 内核需要大于 90。
		 * @param {*}
		 * @returns {boolean} true: 支持无插件，false 不支持无插件
		 */
		I_SupportNoPlugin: () => boolean

		/**
		 * @description: 初始化插件的各种属性
		 * @param {string} szWidth 插件宽度
		 * @param {string} szHight 插件高度
		 * @param {I_InitPluginOptions} options 初始化插件的配置参数
		 * @return {*}
		 */
		I_InitPlugin: (szWidth: string, szHight: string, options?: I_InitPluginOptions) => void

		/**
		 * @description:在 HTML DOM 元素中插入播放插件
		 * @param {string} szContainerID DOM 元素的 ID
		 * @return {number} 0：成功，-1：失败
		 */
		I_InsertOBJECTPlugin(szContainerID: string): number

		/**
		 * @description: 登录设备
		 * @param {string} szIP 设备IP地址
		 * @param {number} iPrototocol http 协议，1 表示 http 协议 2 表示 https 协议
		 * @param {number} iPort 登录设备的 http/https 端口号，根据 iPrototocol 选择传入不同的端口
		 * @param {string} szUserName 登录用户名
		 * @param {string} szPassword 登录密码
		 * @param {I_LoginOptions} options 可选参数
		 * @return {*}
		 */
		I_Login: (
			szIP: string,
			iPrototocol: number,
			iPort: number,
			szUserName: string,
			szPassword: string,
			options?: I_LoginOptions
		) => void

		/**
		 * @description: 登出设备
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @return {number} 0：成功，-1：失败
		 */
		I_Logout: (szDeviceIdentify: string) => number

		/**
		 * @description: 获取设备基本信息
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_GetDeviceInfoOptions} options 可选参数
		 * @return {*}
		 */
		I_GetDeviceInfo: (szDeviceIdentify: string, options?: I_GetDeviceInfoOptions) => void

		/**
		 * @description: 获取模拟通道信息
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_GetAnalogChannelInfoOptions} options 可选参数
		 * @return {*}
		 */
		I_GetAnalogChannelInfo: (
			szDeviceIdentify: string,
			options?: I_GetAnalogChannelInfoOptions
		) => void

		/**
		 * @description: 获取数字通道信息
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_GetDigitalChannelInfoOptions} options 可选参数
		 * @return {*}
		 */
		I_GetDigitalChannelInfo: (
			szDeviceIdentify: string,
			options?: I_GetDigitalChannelInfoOptions
		) => void

		/**
		 * @description: 获取零通道信息
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_GetZeroChannelInfoOptions} options 可选参数
		 * @return {*}
		 */
		I_GetZeroChannelInfo: (szDeviceIdentify: string, options?: I_GetZeroChannelInfoOptions) => void

		/**
		 * @description: 录像搜索 录像搜索结果每次最多返回 40 条，如果结果数量超过 40 条，用户需要多次调用该接口，并且设置一个搜索位置。
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {number} iChannelID 通道 ID
		 * @param {string} szStartTime 开始时间：如：2013-12-23 00:00:00
		 * @param {string} szEndTime 结束时间：如：2013-12-23 23:59:59
		 * @param {I_RecordSearchOptions} options 可选参数
		 * @return {*}
		 */
		I_RecordSearch: (
			szDeviceIdentify: string,
			iChannelID: number,
			szStartTime: string,
			szEndTime: string,
			options?: I_RecordSearchOptions
		) => void

		/**
		 * @description: 获取音频信息
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_GetAudioInfoOptions} options 可选参数
		 * @return {*}
		 */
		I_GetAudioInfo: (szDeviceIdentify: string, options?: I_GetAudioInfoOptions) => void

		/**
		 * @description: 获取端口
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @return {I_GetDevicePortResult | null} 成功：端口对象 失败：null
		 */
		I_GetDevicePort: (szDeviceIdentify: string) => I_GetDevicePortResult | null

		/**
		 * @description: 设置码流加密秘钥
		 * @param {string} szSecretKey 密钥
		 * @param {number} iWndIndex 要设置加密的窗口号，如不传则默认使用当前选择窗口
		 * @return {null} 成功：null 失败：null
		 */
		I_SetSecretKey: (szSecretKey: string, iWndIndex?: number) => null

		/**
		 * @description:开始预览。只支持H264、H265、smartH264、smartH265编码格式。Demo内置两种类型的按钮：直连模式与代理模式，是为了兼容不同设备对直连和代理方案的支持程度。设备对ws代理转发兼容不一，有的设备不代理无法预览，设备只要能成功用其中一种预览、回放成功即可。
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_StartRealPlayOptions} options 可选参数
		 * @return {*}
		 */
		I_StartRealPlay: (szDeviceIdentify: string, options?: I_StartRealPlayOptions) => void

		/**
		 * @description: 开始回放
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_StartPlaybackOptions} options 可选参数
		 * @return {*}
		 */
		I_StartPlayback: (szDeviceIdentify: string, options?: I_StartPlaybackOptions) => void
		/**
		 * @description: 停止播放（停止预览和停止回放统一使用该函数）
		 * @param {I_StopOptions} options 可选参数
		 * @return {*}
		 */
		I_Stop: (options?: I_StopOptions) => void

		/**
		 * @description: 停止播放全部窗口
		 * @return {Promise<void>} 停止所有播放
		 */
		I_StopAll: () => Promise<void>

		/**
		 * @description: 暂停播放，回放时可以调用
		 * @param {I_PauseOptions} options 可选参数
		 * @return {*}
		 */
		I_Pause: (options?: I_PauseOptions) => void

		/**
		 * @description: 恢复播放，把播放状态从单帧/暂停恢复到正常播放状态
		 * @param {I_ResumeOptions} options 可选参数
		 * @return {*}
		 */
		I_Resume: (options?: I_ResumeOptions) => void

		/**
		 * @description: 减速播放，每调用一次，播放速度降低一个等级，插件最大支持1/8倍速到8倍速，设备自身可能也有限制。目前设备正在陆续支持无插件慢放中
		 * @param {I_PlaySlowOptions} options 可选参数
		 * @return {*}
		 */
		I_PlaySlow: (options?: I_PlaySlowOptions) => void

		/**
		 * @description: 加速播放，每调用一次，播放速度增加一个等级，插件最大支持1/8倍速到8倍速，设备自身可能也有限制。目前设备正在陆续支持无插件快放中
		 * @param {I_PlayFastOptions} options 可选参数
		 * @return {*}
		 */
		I_PlayFast: (options?: I_PlayFastOptions) => void

		/**
		 * @description: 获取当前播放时间
		 * @param {I_GetOSDTimeOptions} options 可选参数
		 * @return {*}
		 */
		I_GetOSDTime(options?: I_GetOSDTimeOptions): void

		/**
		 * @description: 打开声音
		 * @param {number} iWndIndex 播放窗口号，可不传，表示操作当前选中窗口
		 * @return {Promise<void>}
		 */
		I_OpenSound: (iWndIndex?: number) => Promise<void>

		/**
		 * @description: 关闭声音
		 * @param {number} iWndIndex 播放窗口号，可不传，表示操作当前选中窗口
		 * @return {Promise<void>}
		 */
		I_CloseSound: (iWndIndex?: number) => Promise<void>

		/**
		 * @description: 设置音量
		 * @param {number} iVolume 音量大小，取值范围 0-100
		 * @param {number} iWndIndex 播放窗口号，可不传，表示操作当前选中窗口
		 * @return {Promise<void>}
		 */
		I_SetVolume: (iVolume: number, iWndIndex?: number) => Promise<void>

		/**
		 * @description: 抓取预览/回放图片，保存到浏览器下载文件中 抓图图片格式与接口调用时传的文件名有关：如果文件名带有.bmp后缀，则抓取bmp图片；如果不带则是jpg
		 * @param {string} szPicName 图片名称
		 * @param {I_CapturePicOptions} options 可选参数
		 * @return {number} 0：成功，-1：失败
		 */
		I2_CapturePic: (szPicName: string, options?: I_CapturePicOptions) => number

		/**
		 * @description: 修改画面分割类型
		 * @param {number} iWndType 画面分割类型：1- 1*1，2- 2*2，3- 3*3，4- 4*4 (最大显示数值为4*4分割，数字超过4返回16分割)
		 * @return {Promise<void>}
		 */
		I_ChangeWndNum: (iWndType: number) => Promise<void>

		/**
		 * @description: 开始录像
		 * @param {string} szFileName 录像文件名
		 * @param {I_StartRecordOptions} options 可选参数
		 * @return {*}
		 */
		I_StartRecord: (szFileName: string, options?: I_StartRecordOptions) => void

		/**
		 * @description: 停止录像
		 * @param {I_StopRecordOptions} options 可选参数
		 * @return {*}
		 */
		I_StopRecord: (options?: I_StopRecordOptions) => void

		/**
		 * @description: 开始下载录像 调用该接口，可以下载存储在设备中的录像
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {string} szPlaybackURI 录像URL，这个URL在录像搜索中可以得到
		 * @param {string} szFileName 要下载录像录像名字
		 * @param {I_StartDownloadRecordOptions} options 可选参数
		 * @return {number} 成功返回一个大于等于0的下载ID，失败返回-1 （无插件直接下载）
		 */
		I_StartDownloadRecord: (
			szDeviceIdentify: string,
			szPlaybackURI: string,
			szFileName: string,
			options?: I_StartDownloadRecordOptions
		) => number

		/**
		 * @description: 开始按时间下载 调用该接口，可以下载存储在设备中的录像,需要设备能力支持
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {number} szPlaybackURI 录像URL，这个URL在录像搜索中可以得到
		 * @param {string} szFileName 要下载录像录像名字
		 * @param {string} szStartTime 开始时间：如：2013-12-23 00:00:00
		 * @param {string} szEndTime 结束时间：如：2013-12-23 23:59:59
		 * @param {I_StartDownloadRecordOptions} options 可选参数
		 * @return {number} 成功返回一个大于等于0的下载ID，失败返回-1 （无插件直接下载）
		 */
		I_StartDownloadRecordByTime: (
			szDeviceIdentify: string,
			szPlaybackURI: string,
			szFileName: string,
			szStartTime: string,
			szEndTime: string,
			options?: I_StartDownloadRecordOptions
		) => number

		/**
		 * @description:云台方向控制
		 * @param {number} iPTZIndex 操作类型（1-上，2-下，3-左，4-右，5-左上，6-左下，7-右上，8-右下，9-自转，10-调焦+， 11-调焦-, 12-F聚焦+, 13-聚焦-, 14-光圈+, 15-光圈-）
		 * @param {boolean} bStop 是否停止iPTZIndex指定的操作，true|false
		 * @param {I_PTZControlOptions} options 可选参数
		 * @return {void}
		 */
		I_PTZControl: (iPTZIndex: number, bStop: boolean, options?: I_PTZControlOptions) => void

		/**
		 * @description: 设置预置点
		 * @param {number} iPresetID 预置位ID
		 * @param {I_SetPresetOptions} options 可选参数
		 * @return {void}
		 */
		I_SetPreset: (iPresetID: number, options?: I_SetPresetOptions) => void

		/**
		 * @description: 调用预置点
		 * @param {number} iPresetID 预置位ID
		 * @param {I_GoPresetOptions} options 可选参数
		 * @return {void}
		 */
		I_GoPreset: (iPresetID: number, options?: I_GoPresetOptions) => void

		/**
		 * @description: 开启电子放大。开启后，在窗口中鼠标左键拖动从左上到右下是放大，右下到左上是缩小。
		 * @param {number} iWndIndex 播放窗口号，可不传，表示操作当前选中窗口
		 * @return {Promise<void>}
		 */
		I_EnableEZoom: (iWndIndex?: number) => Promise<void>

		/**
		 * @description: 关闭电子放大
		 * @param {number} iWndIndex 播放窗口号，可不传，表示操作当前选中窗口
		 * @return {Promise<void>}
		 */
		I_DisableEZoom: (iWndIndex?: number) => Promise<void>

		/**
		 * @description: 开启3D放大。开启后，在窗口中鼠标左键拖动方向从左上到右下是放大，右下到左上是缩小。
		 * @param {number} iWndIndex 播放窗口号，可不传，表示操作当前选中窗口
		 * @return {Promise<void>}
		 */
		I_Enable3DZoom: (iWndIndex?: number) => Promise<void>

		/**
		 * @description: 关闭3D放大
		 * @param {number} iWndIndex 播放窗口号，可不传，表示操作当前选中窗口
		 * @return {Promise<void>}
		 */
		I_Disable3DZoom: (iWndIndex?: number) => Promise<void>

		/**
		 * @description: 全屏播放
		 * @param {boolean} bFullScreen 是否全屏，true|false
		 * @return {Promise<void>}
		 */
		I_FullScreen: (bFullScreen: boolean) => Promise<void>

		/**
		 * @description: 导出设备的配置参数，该接口会自动弹出路径选择框
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {string} szDevicePassWord 设备密码
		 * @return {Promise<void>}
		 */
		I_ExportDeviceConfig: (szDeviceIdentify: string, szDevicePassWord: string) => Promise<void>

		/**
		 * @description: 导入设备的配置参数，该接口会自动弹出文件选择框。导入配置参数后设备可能会重启。
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {string} szFileName 配置文件路径
		 * @return {Promise<void>}
		 */
		I_ImportDeviceConfig(szDeviceIdentify: string, szFileName: string): Promise<void>

		/**
		 * @description: 恢复设备的默认配置参数 恢复完默认参数后，设备需要 重启。完全恢复默认参数会将所有的用户信息也恢复到设备的默认值
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {string} szMode 恢复模式，1-恢复出厂设置，2-恢复自定义设置
		 * @param {I_RestoreDefaultOptions} options 可选参数
		 * @return {void}
		 */
		I_RestoreDefault: (
			szDeviceIdentify: string,
			szMode: number,
			options?: I_RestoreDefaultOptions
		) => void

		/**
		 * @description: 重启设备
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_RestartOptions} options 可选参数
		 * @return {void}
		 */
		I_Restart: (szDeviceIdentify: string, options?: I_RestartOptions) => void

		/**
		 * @description: 开始异步升级，升级完成后，设备需要重启
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {string} szFileName 升级文件路径
		 * @return {void}
		 */
		I2_StartUpgrade: (szDeviceIdentify: string, szFileName: string) => void

		/**
		 * @description: 获取升级的进度
		 * @return {Promise<{percent: number, upgradeStatus: boolean}>} Promise。回调参数：percent, upgrading；
		 * percent：成功返回一个大于等于0的升级进度，失败返回-1
		 * upgrading：是否处于升级状态
		 */
		I_UpgradeProgress: () => Promise<{ percent: number; upgradeStatus: boolean }>

		/**
		 * @description: 重新连接设备
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {I_ReconnectOptions} options 可选参数
		 * @return {void}
		 */
		I_Reconnect: (szDeviceIdentify: string, options?: I_ReconnectOptions) => void
		/**
		 * @description: 获取当前窗口的信息
		 * @param {number} iWndIndex 窗口索引
		 * @return {I_GetWindowStatusInfo} 窗口信息对象:
		 * iIndex		窗口索引
		 * szIP			窗口中正在播放的IP地址
		 * iChannelID	窗口中正在播放的通道号
		 * iPlayStatus	窗口播放状态：0-没有播放，1-预览，2-回放，3-暂停，4-单帧，5-倒放，6-倒放暂停
		 */
		I_GetWindowStatus: (iWndIndex: number) => I_GetWindowStatusInfo

		/**
		 * @description: 发送HTTP请求 接口需要登录成功后才能使用。
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {string} szURI 请求URI
		 * @param {I_SendHTTPRequestOptions} options 可选参数
		 * @return {void}
		 */
		I_SendHTTPRequest: (
			szDeviceIdentify: string,
			szURI: string,
			options?: I_SendHTTPRequestOptions
		) => void
		/**
		 * @description: 获取叠加信息 接口需要登录成功后才能使用。
		 * @param {string} szDeviceIdentify 设备标识（IP_Port）
		 * @param {string} szURI ISAPI协议
		 * @param {I_GetTextOverlayOptions} options 可选参数
		 * @return {void}
		 */
		I_GetTextOverlay: (
			szDeviceIdentify: string,
			szURI: string,
			options?: I_GetTextOverlayOptions
		) => void
	}

	interface I_InitPluginOptions {
		/** 插件的背景颜色。表示插件的背景颜色，子窗口的背景颜色，子窗口的边框颜色，子窗框选中的边框颜色。插件中有一套自己的默认颜色。
		 * szColorProperty 的格式为：”plugin-background:ffffff; sub-background:ffffff; sub-border:ffffff; sub-border-select:ffffff”，
		 * 表示插件的背景颜色，插件子窗口的背景颜色，窗口边框的颜色，窗口边框选中后的颜色。
		 * */
		szColorProperty?: string

		/** ocx 插件的 ID，OEM 时可以修改对应 ID 来实现开发包绑定不同的插件，默认为海康 WEB3.0 插件（无插件不支持该参数）*/
		szOcxClassId?: string

		/** 非 IE 插件的 MIMETYPE，OEM 时可以修改对应 ID 来实现开发包绑定不同的插件，默认为海康 WEB3.0 插件 */
		szMimeTypes?: string

		/** 分屏类型：1- 1x1，2- 2x2，3- 3x3，4- 4x4 默认值为 1，单画面*/
		iWndowType?: number

		/** 单窗口双击全屏，默认支持，true(支持)，false(不支持)。（无插件默认 true 不支持修改）(最大显示数值为 4*4 分割，数字超过 4 返回 16 分割)*/
		bWndFull?: boolean

		/** 播放模式，默认值为 2，正常播放模式。暂不支持其它模式。*/
		iPlayMode?: number

		/** JS 调试模式，控制台打印调试信息，true(开启)，false(关闭) */
		bDebugMode?: boolean

		/**无插件模式 */
		bNoPlugin: boolean
		/**
		 * 窗口选中事件的回调函数。仅包含一个参数（为 XML 字符串），用于表示当前选中的窗口号。
		 *
		 * 用户可传入此函数，当窗口被选中时会自动调用。参数为如下格式的 XML 字符串：
		 *
		 * <?xml version="1.0"?>
		 * <RealPlayInfo>
		 *   <SelectWnd>0</SelectWnd> <!-- 触发事件的窗口号，从 0 开始 -->
		 * </RealPlayInfo>
		 */
		cbSelWnd?: (xmdDoc: string) => void

		/** 插件事件回调函数，有三个参数，第一个参数是事件类型，第二个参数是窗口号（无插件不支持该回调）。
		 * cbEvent 是插件的异常事件回调函数，有三个参数，第一个参数是事件类型(具体值在异常事件回调中有说明)，第二个是触发事件的窗口号。
		 */
		cbEvent?: (iEventType: HKSDKErrorCodeValue, iWndIndex: number, params2: any) => void

		/** 封装格式，2-PS 格式 11-MP4 格式。（无插件不支持该参数）*/
		iPackageType?: number

		/** 窗口双击回调函数，有两个参数，第一个参数是窗口号，第二个参数是是否全屏（无插件不支持该回调）*/
		cbDoubleClickWnd?: (iWndIndex: number, isFullScreen: boolean) => void

		/** 远程配置库关闭回调（无插件不支持该回调）*/
		cbRemoteConfig?: (config: any) => void

		/** 插件初始化完成回调，必须要定义*/
		cbInitPluginComplete: () => void

		/** 插件错误回调*/
		cbPluginErrorHandler?: (
			iWndIndex: number,
			iErrorCode: HK_PLAYER_ERROR_CODE_VALUE,
			oError: any
		) => void

		/** 性能不足回调*/
		cbPerformanceLack?: () => void

		/** 码流加密秘钥错误回调*/
		cbSecretKeyError?: () => void
	}

	interface I_LoginOptions {
		/** http 交互方式，true 表示异步，false 表示同步*/
		async?: boolean
		/** CGI 协议选择，1 表示 ISAPI，如果不传这个参数，会自动选择一种设备支持的协议.*/
		cgi?: string
		/** 登录成功回调，参数为 XML 响应对象
		 */
		success?: (xmlDoc: XMLDocument) => void
		/** 失败回调函数，有两个参数，第一个是 http 状态码，第二个是设备返回的 XML(可能为空)*/
		error?: (cdoe: number, xmlDoc?: XMLDocument) => void
	}

	interface I_GetDeviceInfoOptions {
		/**  http 交互方式，true 表示异步，false 表示同步*/
		async?: boolean
		/**
		 * 成功回调函数，有一个参数，表示返回的 XML 内容。
		 * 返回的 XML 格式示例：
		 * ```xml
		 * <DeviceInfo>
		 *   <deviceName></deviceName>   <!-- 设备名称 -->
		 *   <deviceID></deviceID>       <!-- 设备ID -->
		 *   <deviceType></deviceType>   <!-- 设备类型（可能为空） -->
		 *   <model></model>             <!-- 设备编号 -->
		 *   <serialNumber></serialNumber> <!-- 设备序列号 -->
		 *   <macAddress></macAddress>   <!-- 设备MAC地址 -->
		 *   <firmwareVersion></firmwareVersion> <!-- 设备主控版本 -->
		 *   <firmwareReleasedDate></firmwareReleasedDate> <!-- 主控版本编码时间 -->
		 *   <encoderVersion></encoderVersion> <!-- 设备编码版本 -->
		 *   <encoderReleasedDate></encoderReleasedDate> <!-- 设备编码版本时间 -->
		 * </DeviceInfo>
		 * ```
		 */
		success?: (xmlDoc: XMLDocument) => void

		/**  失败回调函数，有两个参数，第一个是 http 状态码，第二个是设备返回的 XML（可能为空）*/
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}
	interface I_GetAnalogChannelInfoOptions {
		/** http 交互方式，true 表示异步，false 表示同步 */
		async?: boolean

		/**
		 * 成功回调函数，有一个参数，表示返回的 XML 内容。
		 * 返回的 XML 格式示例：
		 * ```xml
		 * <VideoInputChannelList>
		 *   <VideoInputChannel>
		 *     <id></id>                             <!-- 通道ID -->
		 *     <inputPort></inputPort>                 <!-- 通道号 -->
		 *     <videoInputEnabled></videoInputEnabled>  <!-- 是否使能 -->
		 *     <name></name>                           <!-- 通道名 -->
		 *     <videoFormat></videoFormat>             <!-- 通道制式 -->
		 *   </VideoInputChannel>
		 * </VideoInputChannelList>
		 * ```
		 */
		success?: (xmlDoc: XMLDocument) => void

		/** 失败回调函数，有两个参数，第一个是 http 状态码，第二个是设备返回的 XML（可能为空） */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_GetDigitalChannelInfoOptions {
		/**
		 * @description http 交互方式，true 表示异步，false 表示同步
		 */
		async?: boolean

		/**
		 * 成功回调函数，有一个参数，表示返回的 XML 内容。
		 * 返回的 XML 格式示例：
		 * ```xml
		 * <InputProxyChannelStatusList>
		 *   <InputProxyChannelStatus>
		 *     <id></id>                          <!-- 通道的ID -->
		 *     <sourceInputPortDescriptor>
		 *       <proxyProtocol></proxyProtocol>   <!-- 接入协议 -->
		 *       <addressingFormatType></addressingFormatType>  <!-- IP地址类型 -->
		 *       <ipAddress></ipAddress>          <!-- IP地址 -->
		 *       <managePortNo></managePortNo>    <!-- 管理端口号 -->
		 *       <srcInputPort></srcInputPort>     <!-- IP通道号 -->
		 *       <userName></userName>            <!-- 接入的用户名 -->
		 *       <streamType></streamType>        <!-- 码流类型 -->
		 *       <online></online>                 <!-- 是否在线（true/false） -->
		 *     </sourceInputPortDescriptor>
		 *   </InputProxyChannelStatus>
		 * </InputProxyChannelStatusList>
		 * ```
		 */
		success?: (xmlDoc: XMLDocument) => void

		/**
		 * @description 失败回调函数，有两个参数，第一个是 http 状态码，第二个是设备返回的 XML（可能为空）
		 */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_GetZeroChannelInfoOptions {
		/** http 交互方式，true 表示异步，false 表示同步 */
		async?: boolean

		/**
		 * 成功回调函数，参数为返回的 XML 内容。
		 * 返回的 XML 格式示例：
		 * ```xml
		 * <ZeroVideoChannelList>
		 *   <ZeroVideoChannel>
		 *     <id>1</id>              // 通道ID
		 *     <enabled>true</enabled>  // 是否使能
		 *     <inputPort>1</inputPort>  // 通道号
		 *   </ZeroVideoChannel>
		 * </ZeroVideoChannelList>
		 * ```
		 */
		success?: (xmlDoc: XMLDocument) => void

		/** 失败回调函数，有两个参数，第一个是 http 状态码，第二个是设备返回的 XML（可能为空） */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_RecordSearchOptions {
		/** http 交互方式，true 表示异步，false 表示同步 */
		async?: boolean
		/** 搜索录像的位置（默认为 0），0 表示返回结果的第 0-40 条，40 表示 40-80 条，依次类推 */
		iSearchPos?: number
		/** 码流类型 1-主码流，2-子码流，默认主码流 */
		iStreamType?: number
		/**
		 * 成功回调函数，有一个参数，表示返回的 XML 内容。
		 * 返回的 XML 格式示例：
		 * ```xml
		 * <CMSearchResult>
		 *   <responseStatus>true</responseStatus>
		 *   <responseStatusStrg>MORE</responseStatusStrg>  <!-- 根据此标志决定是否继续搜索。OK表示已完成 -->
		 *   <numOfMatches>40</numOfMatches>  <!-- 本次搜索返回的录像条数 -->
		 *   <matchList>
		 *     <searchMatchItem>
		 *       <trackID>101</trackID>  <!-- 录像ID -->
		 *       <startTime>2013-12-23T03:06:58Z</startTime>  <!-- 录像开始时间 -->
		 *       <endTime>2013-12-23T03:16:57Z</endTime>  <!-- 录像结束时间 -->
		 *       <playbackURI>rtsp://...</playbackURI>  <!-- 包含开始时间、结束时间、录像名字、大小等信息 -->
		 *       <metadataDescriptor>motion</metadataDescriptor>  <!-- 录像类型：timing|motion|motionOrAlarm|motionAndAlarm|manual|smart -->
		 *     </searchMatchItem>
		 *   </matchList>
		 * </CMSearchResult>
		 * ```
		 */
		success?: (xmlDoc: XMLDocument) => void
		/** 失败回调函数，有两个参数，第一个是 http 状态码，第二个是设备返回的 XML（可能为空） */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_GetAudioInfoOptions {
		/** http 交互方式，true 表示异步，false 表示同步 */
		async?: boolean

		/**
		 * 成功回调函数，有一个参数，表示返回的 XML 内容。
		 * 返回的 XML 格式示例：
		 * ```xml
		 * <TwoWayAudioChannelList>
		 *   <TwoWayAudioChannel>
		 *     <id></id>                           <!-- 通道ID -->
		 *     <enabled></enabled>                 <!-- 是否启用语音对讲 -->
		 *     <audioCompressionType></audioCompressionType> <!-- 音频编码 -->
		 *   </TwoWayAudioChannel>
		 * </TwoWayAudioChannelList>
		 * ```
		 */
		success?: (xmlDoc: XMLDocument) => void

		/** 失败回调函数，有两个参数，第一个是 http 状态码，第二个是设备返回的 XML（可能为空） */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_StartRealPlayOptions {
		/** 	播放窗口，如果不传，则默认使用当前选择窗口播放（默认选中窗口0） */
		iWndIndex?: number
		/** 码流类型1-主码流，2-子码流，3-第三码流，默认使用主码流预览 */
		iStreamType?: number
		/**播放通道号，默认通道1 */
		iChannelID?: number | string
		/**是否播放零通道，默认为false */
		bZeroChannel?: boolean
		/**RTSP端口号，可以选择传入，如果不传，开发包会自动判断设备的RTSP端口 */
		iPort?: number
		/**是否需要websocket代理。默认为false。为true时，发出的websocket请求可以通过Nginx特定规则进行代理转发到设备，常用于用户不能直接访问设备网段时利用Nginx进行转发访问。在HTTPS下，需要置为true。某些设备在HTTP下，也需要置为true。 */
		bProxy?: boolean
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_StartPlaybackOptions {
		/**  播放窗口，如果不传，则默认使用当前选择窗口播放（默认选中窗口0） */
		iWndIndex?: number
		/** 开始时间，默认为当天00:00:00，格式如：2013-12-23 00:00:00 */
		szStartTime?: string
		/** 结束时间，默认为当天23:59:59，格式如：2013-12-23 23:59:59 */
		szEndTime?: string
		/**播放通道号，默认通道1 */
		iChannelID?: number | string
		/**RTSP端口号，可以选择传入，如果不传，开发包会自动判断设备的RTSP端口 */
		iPort?: number
		/**转码回放参数对象，传入此参数，将按照此对象中的编码参数进行转码回放（转码回放需要设备支持，如果不支持，则不要传入这个参数）。 */
		oTransCodeParam?: {
			/**帧率 取值范围：0-全部， 5-1，6-2，7-4，8-6，9-8，10-10，11-12，12-16，13-20，14-15，15-18，16－22， 255-自动（和源一致） */
			TransFrameRate: number
			/** 分辨率 取值范围： 1-CIF(352*288/352*240)，2-QCIF(176*144/176*120)，3-4CIF(704*576/704*480)或D1(720*576/720*486)，255-Auto(使用当前码流分辨率)  */
			TransResolution: number
			/**码率 取值范围： 2-32K，3-48k，4-64K，5-80K，6-96K，7-128K，8-160k，9-192K，10-224K，11-256K，12-320K，13-384K，14-448K，15-512K，16-640K，17-768K，18-896K，19-1024K，20-1280K，21-1536K，22-1792K，23-2048K，24-3072K，25-4096K，26-8192K，255- 自动（和源一致） */
			TransBitrate: number
		}
		/**码流类型1-主码流，2-子码流，默认主码流 */
		iStreamType?: number
		/**是否需要websocket代理。默认为false。为true时，发出的websocket请求可以通过Nginx特定规则进行代理转发到设备，常用于用户不能直接访问设备网段时利用Nginx进行转发访问。 */
		bProxy?: boolean
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_StopOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_PauseOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_ResumeOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_PlaySlowOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_PlayFastOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_GetOSDTimeOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数，有一个参数，表示OSD时间。*/
		success?: (osdTime: string) => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_CapturePicOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**回调函数，传了图片就不会下载到本地，而是获取图片的Uint8Array数据 。*/
		cbCallback?: (file: Uint8Array) => void
	}

	interface I_StartRecordOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**是否创建日期文件夹（true：创建，false：不创建），默认true */
		bDateDir?: boolean
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_StopRecordOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_StartDownloadRecordOptions {
		/**是否创建日期文件夹（true：创建，false：不创建），默认true */
		bDateDir?: boolean
	}

	interface I_PTZControlOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**云台速度，默认为4 */
		iPTZSpeed?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_SetPresetOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_GoPresetOptions {
		/**播放窗口号，可不传，表示操作当前选中窗口 */
		iWndIndex?: number
		/**成功回调函数*/
		success?: () => void
		/**失败回调函数*/
		error?: () => void
	}

	interface I_RestoreDefaultOptions {
		/**成功回调函数，有一个参数，表示返回的XML内容。*/
		success?: (xmlDoc: XMLDocument) => void
		/**失败回调函数，有两个参数，第一个是http状态码，第二个是设备返回的XML(可能为空)  */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_RestartOptions {
		/**成功回调函数，有一个参数，表示返回的XML内容。*/
		success?: (xmlDoc: XMLDocument) => void
		/**失败回调函数，有两个参数，第一个是http状态码，第二个是设备返回的XML(可能为空)  */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_ReconnectOptions {
		/**成功回调函数，有一个参数，表示返回的XML内容。*/
		success?: (xmlDoc: XMLDocument) => void
		/**失败回调函数，有两个参数，第一个是http状态码，第二个是设备返回的XML(可能为空)  */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_GetWindowStatusInfo {
		/**窗口索引*/
		iIndex: number
		/**窗口中正在播放的IP地址*/
		szIP: string
		/**窗口中正在播放的通道号*/
		iChannelID: number
		/**窗口播放状态：0-没有播放，1-预览，2-回放，3-暂停，4-单帧，5-倒放，6-倒放暂停*/
		iPlayStatus: number

		//下方属性文档未给出但是实际有
		// b3DZoom: boolean
		// bEZoom: boolean
		// bPTZAuto: boolean
		// bRecord: boolean
		// bShttpIPChannel: boolean
		// bSound: boolean
		// iCGIPort: number
		// szDeviceIdentify: string
	

	}

	interface I_SendHTTPRequestOptions {
		/**是否同步（true:异步方式，false:同步方式），默认异步 */
		async?: boolean
		/**GET、POST、PUT、DELETE，默认GET*/
		type?: string
		/**xml数据，默认为空*/
		data?: XMLDocument
		/**认证信息，默认为空*/
		auth?: any
		/**成功回调函数，有一个参数，表示返回的XML内容。*/
		success?: (xmlDoc: XMLDocument) => void
		/**失败回调函数，有两个参数，第一个是http状态码，第二个是设备返回的XML(可能为空)  */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_GetTextOverlayOptions {
		/**成功回调函数，有一个参数，表示返回的XML内容。*/
		success?: (xmlDoc: XMLDocument) => void
		/**失败回调函数，有两个参数，第一个是http状态码，第二个是设备返回的XML(可能为空)  */
		error?: (code: number, xmlDoc?: XMLDocument) => void
	}

	interface I_GetDevicePortResult {
		/**设备端口*/
		iDevicePort: number
		/**HTTP端口*/
		iHttpPort: number
		/**RTSP端口*/
		iRtspPort: number
		/**http-WebSocket端口*/
		iWebSocketPort: number
		/**https-WebSockets端口*/
		iWebSocketsPort: number
	}
}

declare const WebVideoCtrl: HikVisionWebSDKNoPluginVersion.WebVideoCtrl

interface Window {
	WebVideoCtrl: HikVisionWebSDKNoPluginVersion.WebVideoCtrl
}
