# 奇创纪元官网

北京奇创纪元科技有限公司官网，纯静态页面，通过 GitHub Pages 从 `main` 分支根目录发布：https://knewlabs.ai/ 。域名由根目录的 `CNAME` 文件指定（不要删），DNS 在 GoDaddy：`@` 的 4 条 A 记录指向 GitHub Pages（185.199.108–111.153），`www` 的 CNAME 指向 `ds-kb-lab.github.io`。旧地址 https://ds-kb-lab.github.io/qcera_web/ 会自动跳到新域名。合并到 `main` 后会自动部署，结果以仓库 Actions 里的 `pages build and deployment` 为准。

## 页面

每个板块是一个独立网址：

| 网址 | 内容 |
| --- | --- |
| `/` | 首页：总览与各板块入口 |
| `/about/` | 关于我们：团队、服务模式、研究路径、科研合规 |
| `/platforms/` | 五大实验技术服务平台 |
| `/equipment/` | 核心仪器设备 |
| `/datasets/` | 核心医疗数据集 |
| `/followup/` | 患者随访管理系统（规划总览图仍是根目录的 `follow-up.html`） |
| `/hospitals/` | 合作医院地图与名单 |
| `/partners/` | 合作高校与研究机构（2026-10-30 起暂时隐藏，见下） |
| `/contact/` | 联系我们 |
| `/games/` | 游戏分布：公司出品的游戏，可在网页上直接试玩 |
| `/game/` | 跳转到 `/games/` |

旧地址里的 `#about`、`#hospitals` 等锚点会自动跳到对应的新页面。

合作单位页目前暂时隐藏：网站上没有它的页面和入口，`/partners/` 显示 404。名单和 logo 仍保留在 `data.js` 的 `universities` 和 `university_logos/` 里。恢复方法：把页面生成脚本 `build.py`（备份在项目共享文件夹 `qcera-redesign/source/`）里的 `HIDE_PARTNERS` 改成 `False`，重新生成页面后提交，导航、页脚、首页和关于页的入口会一起回来。

## 改内容

- 平台、仪器、数据集、合作医院和合作单位都在 `assets/js/data.js`，改这一个文件即可，各页面的数量统计会自动更新。
- 每条内容都有中文 `zh` 和英文 `en` 两份，请同步修改。页面上的固定文字在各页面 `index.html` 里，英文写在同一元素的 `data-en` 属性中。
- 新增合作单位：把 logo 放进 `university_logos/`，再在 `data.js` 的 `universities` 里加一行。`assets/img/logos/` 里的同名 `.webp` 是压缩版，可以不加，缺少时会自动使用原图。
- 新增合作医院：在 `data.js` 的 `cities` 里找到对应城市，把 `[中文名, 英文名]` 加进 `institutions`。新城市需要填写经纬度 `lng` / `lat`。

## 游戏

- 游戏列表在 `data.js` 的 `games` 里，每个游戏一项：介绍文字、数字亮点、截图和试玩地址 `play`。加一项就会多一个游戏板块，首页上的游戏数量也会跟着变。
- 游戏本体放在 `games/<游戏名>/`，是 Cocos Creator 导出的 web-mobile 版本，打开这个目录的 `index.html` 就能玩。截图和标题图放在 `assets/img/games/<游戏名>/`。
- 更新《喵喵收纳馆》：用 one game 项目的正式版导出（`RELEASE=1`：爱心粮仓显示筹备中，猫友簿和金爪杯关闭，去掉试玩用的测试入口）整个替换 `games/miaomiao/`，不要只替换部分文件。换了新版本后，记得一起核对 `data.js` 里的介绍、数字亮点和截图。
- 电脑上点「开始试玩」会在页面里的手机框中打开游戏；手机上会直接进入全屏游戏页。

## 品牌动效

公司 logo 的两道弧线在同一条椭圆轨道上：上弧收尾成 ERA 的 E，下弧起笔就是 CHUANG 的 H。`assets/js/brand.js` 把 logo 当成矢量图形来用（数据来自公司提供的 logo 源文件 `奇创.ai`）：

- 开场动画：每次访问的第一个页面播放一次（约 2.5 秒，点击、滚动或按键可跳过）。两道光从左边点火，沿轨道画出两道弧线，同时一道扫描线把字母和中文名逐个“打印”出来，最后整个 logo 飞进左上角导航。系统开启“减少动态效果”时不播放。
- 导航 logo：鼠标移上去，弧线上会流过一道光（上弧短暂变回 logo 原本的蓝色）。
- 关于我们页：logo 的构造图，标出轨道中心、两道弧线的起止角度和字母基线；鼠标在图上移动会显示坐标。
- 页脚：整幅 logo 线稿，有一束光在上面慢慢移动，鼠标经过的地方亮起原色。
- 右下角圆形按钮：回到顶部，两道弧线随阅读进度填满。
- 换页：新页面从中间像轨道一样展开（Chrome / Edge / Safari 新版本支持，其它浏览器正常跳转）。
- 404 页：两条轨道线绕着 404 缓慢旋转。

换 logo 时需要重新生成 `brand.js` 开头那一行几何数据，原始脚本备份在项目共享文件夹 `qcera-redesign/source/brand/`。

## 目录

```
assets/css/site.css    全站样式
assets/js/data.js      全部内容数据
assets/js/site.js      页面渲染、中英切换、地图
assets/js/fx.js        动效（光标、粒子、标题动画、首页双螺旋）
assets/js/brand.js     logo 动效（开场动画、导航 logo、构造图、页脚、回到顶部）
assets/fonts/          Geist 字体（本地托管，国内可正常访问）
assets/img/            站点 logo、分享图、合作单位 logo 压缩版、游戏截图
assets/data/cn.svg     地图底图
games/                 游戏网页版（每个游戏一个目录）
pdf_images/            宣传册图片
university_logos/      合作单位 logo 原图
```

本地预览：在仓库上一级目录运行 `python3 -m http.server`，再打开 http://localhost:8000/qcera_web/ 。
