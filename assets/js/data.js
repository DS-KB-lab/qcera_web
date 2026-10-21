/* 奇创纪元官网 · 内容数据（中英双语）
   ---------------------------------------------------------------
   各页面的平台、仪器、数据集、合作医院和合作单位都从这里读取。
   修改内容时只改这个文件即可：每条数据中文在前、英文在后；
   首页与各页的数量统计（医院数、城市数、单位数）会自动重新计算。 */
window.QCERA = {
  /* 首页统计：医院数与合作单位数自动计算，这里只填写无法计算的两项 */
  journals: 51,

  /* 五大实验技术服务平台；gallery 为宣传册中对应平台的配图 */
  platforms: [
    {
      id: "bioinformatics", fig: true, img: "pdf_images/p2_12_1712x648.jpeg",
      gallery: ["pdf_images/p2_11_894x608.jpeg", "pdf_images/p2_23_620x473.png"],
      zh: { name: "生信平台", subtitle: "Bioinformatics Platform", desc: "整合多个国际临床数据库资源，覆盖单细胞测序与空间多组学分析全流程。",
        tags: ["UKB", "GBD", "CHARLS", "NHANES", "单细胞测序", "空间代谢组", "空间转录组", "空间蛋白组"] },
      en: { name: "Bioinformatics", subtitle: "Bioinformatics Platform", desc: "Integrating international clinical databases with full-pipeline single-cell sequencing and spatial multi-omics analysis.",
        tags: ["UKB", "GBD", "CHARLS", "NHANES", "Single-cell Seq", "Spatial Metabolomics", "Spatial Transcriptomics", "Spatial Proteomics"] }
    },
    {
      id: "cell", img: "pdf_images/p2_16_872x627.jpeg",
      gallery: ["pdf_images/p2_17_1219x422.jpeg", "pdf_images/p2_18_1592x848.jpeg", "pdf_images/p2_20_748x654.jpeg", "pdf_images/p2_21_256x296.png", "pdf_images/p2_22_768x520.jpeg", "pdf_images/p2_19_555x307.jpeg"],
      zh: { name: "细胞平台", subtitle: "Cell Biology Platform", desc: "配备流式分选仪、共聚焦显微镜、透射电镜等高端仪器，支持从细胞培养到功能检测的全流程实验。",
        tags: ["细胞培养", "流式细胞术", "质粒转染", "慢病毒转染", "WB / CO-IP", "CHIP / ELISA", "细胞增殖/凋亡", "双荧光素酶报告"] },
      en: { name: "Cell Biology", subtitle: "Cell Biology Platform", desc: "Equipped with flow cytometry sorters, confocal microscopes, TEM, and more for complete cell culture to functional assay workflows.",
        tags: ["Cell Culture", "Flow Cytometry", "Plasmid Transfection", "Lentiviral Transduction", "WB / CO-IP", "ChIP / ELISA", "Proliferation/Apoptosis", "Luciferase Reporter"] }
    },
    {
      id: "mechanism", img: "pdf_images/p3_9_828x468.jpeg",
      gallery: ["pdf_images/p3_2_299x368.jpeg", "pdf_images/p3_5_382x321.jpeg", "pdf_images/p3_4_357x327.jpeg", "pdf_images/p3_3_222x170.jpeg", "pdf_images/p3_8_540x300.jpeg", "pdf_images/p3_6_280x242.jpeg", "pdf_images/p3_7_562x292.jpeg"],
      zh: { name: "机制平台", subtitle: "Mechanism Research Platform", desc: "聚焦蛋白质翻译后修饰、程序性细胞死亡、肿瘤免疫微环境及类器官芯片等前沿研究方向。",
        tags: ["翻译后修饰", "乳酸化 / 棕榈酰化", "铁死亡 / 双硫死亡", "肿瘤免疫微环境", "类器官芯片", "相分离", "糖酵解", "细胞衰老"] },
      en: { name: "Mechanism Research", subtitle: "Mechanism Research Platform", desc: "Focused on post-translational modifications, programmed cell death, tumor immune microenvironment, and organoid-on-chip technologies.",
        tags: ["PTM", "Lactylation / Palmitoylation", "Ferroptosis / Disulfidptosis", "Tumor Immune Microenvironment", "Organoid-on-Chip", "Phase Separation", "Glycolysis", "Cellular Senescence"] }
    },
    {
      id: "animal", img: "pdf_images/p3_10_1612x1116.jpeg",
      gallery: ["pdf_images/p3_11_375x500.jpeg", "pdf_images/p3_15_776x605.jpeg", "pdf_images/p3_19_584x434.jpeg", "pdf_images/p3_18_343x359.jpeg", "pdf_images/p3_17_430x337.jpeg", "pdf_images/p3_14_788x906.jpeg", "pdf_images/p3_16_750x1052.jpeg"],
      zh: { name: "动物平台", subtitle: "Animal Experiment Platform", desc: "与佑曙生命科技深度合作，拥有成熟的肿瘤、心梗、脑缺血等疾病动物模型构建技术。",
        tags: ["动物模型构建", "活体成像", "MicroCT", "9.4T小动物核磁", "动物托管饲养", "组织取材", "免疫组化/荧光", "H&E染色"] },
      en: { name: "Animal Models", subtitle: "Animal Experiment Platform", desc: "In deep partnership with Youshu Life Technology, with mature model construction for tumor, myocardial infarction, cerebral ischemia and other diseases.",
        tags: ["Model Construction", "In Vivo Imaging", "MicroCT", "9.4T Small Animal MRI", "Animal Housing", "Tissue Sampling", "IHC / IF", "H&E Staining"] }
    },
    {
      id: "materials", fig: true, img: "pdf_images/p4_11_1094x424.jpeg",
      gallery: ["pdf_images/p4_10_626x460.jpeg", "pdf_images/p4_25_384x400.jpeg", "pdf_images/p4_24_270x270.png"],
      zh: { name: "材料平台", subtitle: "Biomaterials Platform", desc: "专注智能化材料设计、药物靶向递送与控制释放系统构建，覆盖纳米颗粒到水凝胶等多种递药体系。",
        tags: ["纳米粒酶", "水凝胶", "细菌递送", "脂质纳米颗粒", "微流控合成", "靶向递药", "控制释放", "生物效应评价"] },
      en: { name: "Biomaterials", subtitle: "Biomaterials Platform", desc: "Smart material design, targeted drug delivery, and controlled release systems spanning nanoparticles to hydrogels.",
        tags: ["Nanozymes", "Hydrogels", "Bacterial Delivery", "Lipid Nanoparticles", "Microfluidic Synthesis", "Targeted Delivery", "Controlled Release", "Bio-efficacy Evaluation"] }
    }
  ],

  /* 核心仪器设备；wide: true 表示在网格中占两列（三列网格下每行凑满 3 格，调整顺序时注意）；data: true 表示分析数据示例，不计入仪器数量 */
  equipment: [
    { img: "pdf_images/p2_17_1219x422.jpeg", zh: "BeckMan moflo astrios / BD FACSAria 高速流式细胞分选仪", en: "BeckMan moflo astrios / BD FACSAria High-speed Flow Sorters", wide: true },
    { img: "pdf_images/p2_22_768x520.jpeg", zh: "Leica SP8 STED 超高分辨率显微镜", en: "Leica SP8 STED Super-Resolution Microscope" },
    { img: "pdf_images/p2_20_748x654.jpeg", zh: "Perkin Elmer Operetta CLS 激光共聚焦高内涵分析系统", en: "Perkin Elmer Operetta CLS Confocal High-Content System" },
    { img: "pdf_images/p2_18_1592x848.jpeg", zh: "Beckman CytoFLEX S / BD LSRFortessa X-20 流式细胞分析仪", en: "Beckman CytoFLEX S / BD LSRFortessa X-20 Flow Analyzers", wide: true },
    { img: "pdf_images/p2_21_256x296.png", zh: "HITACHI H-7650 透射电子显微镜", en: "HITACHI H-7650 Transmission Electron Microscope" },
    { img: "pdf_images/p3_15_776x605.jpeg", zh: "小动物活体成像仪", en: "Small Animal In Vivo Imaging System" },
    { img: "pdf_images/p3_14_788x906.jpeg", zh: "Beecher MTA-1 组织芯片阵列仪", en: "Beecher MTA-1 Tissue Microarray" },
    { img: "pdf_images/p3_2_299x368.jpeg", zh: "Agilent 5977B GC/MS 气质联用仪", en: "Agilent 5977B GC/MS System" },
    { img: "pdf_images/p4_10_626x460.jpeg", zh: "FluidicLab 智能纳米颗粒合成仪", en: "FluidicLab Smart Nanoparticle Synthesizer" },
    { img: "pdf_images/p4_25_384x400.jpeg", zh: "微流控 INano E 纳米药物递送系统", en: "Microfluidic INano E Drug Delivery System" },
    { img: "pdf_images/p2_11_894x608.jpeg", zh: "空间转录组学分析数据", en: "Spatial Transcriptomics Analysis Data", wide: true, data: true },
    { img: "pdf_images/p3_16_750x1052.jpeg", zh: "Olympus CX43/CX33 生物显微镜", en: "Olympus CX43/CX33 Biological Microscope" }
  ],

  /* 核心医疗数据集；stats 每项为 [数值, 说明] */
  datasets: [
    {
      id: "mri",
      zh: { name: "MRI多场强影像数据集", tagline: "从0.05T到7T的跨场强配对路线",
        summary: "围绕多场强MRI配对采集构建系统化数据体系，当前已形成0.05T到3T的匹配受试者基础，并规划向5T、7T延展。",
        stats: [["53例", "现有匹配样本"], ["100例", "下阶段目标"], ["0.05T→7T", "场强跨度"], ["跨场强配对", "建设重点"]] },
      en: { name: "Multi-field-strength MRI Dataset", tagline: "Matched imaging roadmap from 0.05T to 7T",
        summary: "Systematic data built around matched MRI acquisition across field strengths, with existing 0.05T-3T foundation and planned extension toward 5T and 7T.",
        stats: [["53", "Matched Cases"], ["100", "Next Milestone"], ["0.05T→7T", "Field Range"], ["Cross-strength", "Core Focus"]] }
    },
    {
      id: "gastro",
      zh: { name: "胃肠癌肿瘤数据集", tagline: "2632条结构化随访与病理字段",
        summary: "整合2632条结构化记录，覆盖人口学、并发症、CEA/CA19-9、TNM分期、病理免疫组化与生存随访字段。",
        stats: [["2632", "总记录数"], ["63.5岁", "平均年龄"], ["2624", "CEA可用记录"], ["2621", "CA19-9可用"]] },
      en: { name: "Gastrointestinal Cancer Dataset", tagline: "2,632 structured follow-up & pathology records",
        summary: "Structured cohort covering demographics, complications, CEA/CA19-9, TNM staging, pathology, immunohistochemistry, and survival follow-up.",
        stats: [["2,632", "Total Records"], ["63.5 yr", "Mean Age"], ["2,624", "CEA Records"], ["2,621", "CA19-9 Records"]] }
    },
    {
      id: "acoustic",
      zh: { name: "听神经瘤数据集", tagline: "995条诊断记录 + 三维影像预览",
        summary: "包含影像勾画信息与三维影像内容，记录了年龄、性别、检查方式和诊断文本，并提供512×512×24的三维影像预览。",
        stats: [["994", "影像记录数"], ["44岁", "平均年龄"], ["512×512×24", "NIfTI尺寸"], ["480/521", "病灶侧别"]] },
      en: { name: "Acoustic Neuroma Dataset", tagline: "995 diagnosis records + 3D imaging preview",
        summary: "Combines structured annotation with 3D imaging content including age, sex, exam method, diagnosis, and 512×512×24 volume preview.",
        stats: [["994", "Imaging Records"], ["44 yr", "Mean Age"], ["512×512×24", "NIfTI Size"], ["480/521", "Laterality"]] }
    },
    {
      id: "chordoma",
      zh: { name: "脊索瘤多组学数据集", tagline: "稀缺病种的病理与空间组学方向",
        summary: "聚焦稀缺病种的病理与空间组学方向，强调全切片H&E、空间蛋白组/转录组与纵向临床随访的组合能力。",
        stats: [["罕见病", "病种属性"], ["病理+空间组学", "重点模态"], ["支持", "纵向随访"], ["1张", "展示图像"]] },
      en: { name: "Chordoma Multi-omics Dataset", tagline: "Rare-disease pathology & spatial omics",
        summary: "Built around whole-slide H&E, spatial proteomics/transcriptomics, and longitudinal clinical follow-up for this rare disease.",
        stats: [["Rare", "Disease Type"], ["Path+Omics", "Core Modalities"], ["Yes", "Longitudinal"], ["1", "Display Image"]] }
    },
    {
      id: "ophthalmology",
      zh: { name: "眼科多模态数据集", tagline: "Demo展示1221份样例，完整项目已达万人级",
        summary: "覆盖CRVO-ME、DME、Fuchs综合征、眼外伤、葡萄膜炎、高度近视和黄斑裂孔等方向，完整数据规模已达万人以上。",
        stats: [["1221", "Demo样例"], ["1万+", "实际规模"], ["50万人次", "临床验证"], ["OCT/CT/MRI", "核心模态"]] },
      en: { name: "Ophthalmology Multimodal Dataset", tagline: "1,221 demo samples; full program 10,000+ cases",
        summary: "Covering CRVO-ME, DME, Fuchs syndrome, ocular trauma, uveitis, high myopia, and macular hole. Full program exceeds 10,000 real-world cases.",
        stats: [["1,221", "Demo Samples"], ["10,000+", "Full Scale"], ["500K", "Clinical Validation"], ["OCT/CT/MRI", "Core Modalities"]] }
    }
  ],
  datasetPlatform: "https://ds-kb-lab.github.io/web-project/",

  /* 游戏分布页（/games/）：每个游戏一条，按顺序展示。
     play 是网页版所在文件夹（整个网页版导出放进去即可，正式版设置见 README）；
     facts 为 [数值, 中文说明, 英文说明]；shots 为游戏截图（竖屏，-s 结尾的是缩略图）。 */
  games: [
    {
      id: "miaomiao", play: "games/miaomiao/", logo: "assets/img/games/miaomiao/logo.webp",
      poster: "assets/img/games/miaomiao/shot-10-s.webp",
      facts: [["150", "关第一季主线剧情，分五章，之后关卡不封顶", "Story levels across season one’s five chapters, then no level cap"], ["9", "场鼠帮 Boss 关", "Boss levels against the Rat Gang"], ["5", "只店猫，各带一个关卡技能", "Shop cats, each with a level skill"], ["5", "处地方要收拾：从前厅一直修到屋顶花园", "Places to restore, from the front room up to the rooftop garden"], ["55", "件猫咪装扮", "Cat outfits"], ["20", "只会来门口做客的猫", "Cats who drop by to visit"]],
      shots: [
        ["shot-01", "开场剧情：花店阿婆一直替奶奶收着老店的钥匙", "The opening story: the florist next door has been keeping Grandma’s shop key"],
        ["shot-02", "第 1 关「门口的纸箱」：小手教你点第一张卡", "Level 1, “The boxes by the door”: a hand shows you where to tap"],
        ["shot-03", "第 5 关「角落里的旧冰柜」：杂物里藏着一只小猫，露出来就能把它救出来", "Level 5, “The old freezer in the corner”: a kitten is hiding in the clutter, and you can rescue it once it’s uncovered"],
        ["shot-04", "第 10 关「鼠帮的地盘」：灰皮跳上收纳格占了一格，打空它的血条就赢", "Level 10, “Rat Gang turf”: Huipi has jumped into a tray slot. Empty its health bar to win"],
        ["shot-05", "第 16 关：毛线连着的两张卡，要一起进收纳格", "Level 16: two tiles tied with yarn go into the tray together"],
        ["shot-06", "第 28 关：礼盒上的数字消到 0，它就自己打开，送一个道具", "Level 28: when the number on a gift box reaches 0, it opens and gives you a tool"],
        ["shot-07", "第 36 关「爷爷的旧闹钟」：赶在闹钟响之前把它收走", "Level 36, “Grandpa’s old alarm clock”: collect the clock tile before it rings"],
        ["shot-08", "第 55 关「阳台栏杆外」：凑齐一组钥匙，打开一个笼子", "Level 55, “Beyond the balcony railing”: clear a set of keys to open a cage"],
        ["shot-09", "第 85 关「阁楼的横梁」：黑漆漆的阁楼，只看得清灯照到的地方", "Level 85, “The attic beams”: a dark attic where you only see what the light reaches"],
        ["shot-10", "收拾好的前厅猫咖", "The front-room café, all fixed up"],
        ["shot-11", "猫咖夜景", "The café at night"],
        ["shot-12", "后院修整完成：月季、水缸和晒鱼干的竹架", "The back yard, restored: roses, a water vat and a rack for drying fish"],
        ["shot-13", "我的猫：五只店猫，各有亲密度、健康、喜好、故事和关卡技能", "My cats: all five shop cats, each with affection, health, likes, stories and a level skill"],
        ["shot-14", "救猫簿：救下的每只小猫都记在这里", "The rescue book: every kitten you save is recorded here"],
        ["shot-15", "每日挑战「今日死结」：不用帮手谁也解不开，看你最少用几次", "Daily challenge, “Today’s knot”: nobody can untie it without help, so how few rescues do you need?"],
        ["shot-16", "门口：放一碗吃的，等猫来做客", "The doorstep: leave out a bowl and wait for visiting cats"],
        ["shot-17", "奶奶的旧物收藏册", "Grandma’s keepsake album"],
        ["shot-18", "猫爬架挑战塔", "The cat-tree challenge tower"],
        ["shot-19", "爱心粮仓（筹备中）", "The Cat Food Bank (coming soon)"]
      ],
      charity: {
        shot: 18,
        zh: {
          label: "爱心粮仓 · 筹备中",
          title: "游戏里照顾大橘，现实里帮流浪猫",
          text: "一天里过一关、喂一次猫、撸一次猫，就是 1 个“认真照顾日”。全服每攒满 500 个，公司就拿出 3 元，替大家养一只真流浪猫一天。",
          fund: "捐款全部由北京奇创纪元科技有限公司从游戏收入中出资，玩家无需支付任何费用。",
          status: "正在筹备：和公益基金会签好捐赠协议以后，才开始统计和公布金额。"
        },
        en: {
          label: "Cat Food Bank · Coming soon",
          title: "Look after Daju in the game, help real stray cats",
          text: "Clear a level, feed a cat and pet a cat on the same day, and that counts as one “care day”. For every 500 care days across all players, the company puts up 3 yuan to keep one real stray cat for a day.",
          fund: "Qichuang Era pays every donation out of game revenue. Players never pay anything.",
          status: "Being set up: counting and published totals begin once we sign a donation agreement with a charitable foundation."
        }
      },
      zh: {
        name: "喵喵收纳馆", kind: "休闲益智 · 三消收纳", tagline: "收拾奶奶的老店，救下藏在杂物里的猫，解开奶奶留下的秘密",
        desc: "梧桐里 17 号，奶奶的老杂物铺已经关了快一年。奶奶住进了养老院，鼠帮趁机占了店，把几十年的旧东西翻得到处都是；街道办贴出通知：月底前不重新开张，铺面就要收回。你拿着花店阿婆替奶奶收着的钥匙回到老店，和赖着不走的橘猫大橘一起，一关一关把店收拾出来、开成一家猫咖。杂物里藏着等人救的小猫，翻出来的旧物件，一点点拼出奶奶藏了很多年的秘密。",
        genres: ["三消收纳", "剧情", "救猫", "猫咖经营", "养猫", "收集"],
        rules: ["点一张没被压住的卡片，它会飞进下面的收纳格。", "收纳格里凑齐 3 张一样的物品，就会一起消除。", "卡片全部收完就过关；7 个格子塞满又没有消除，就算失败。"],
        features: [
          ["五章主线剧情", "第一季 150 关，每 5 关一集，每章揭开一个谜：店能不能赶在月底前开起来？被鼠帮抢走的铁皮饼干盒里装着什么？阁楼的箱子要用什么密码打开？剧情可以跳过，也能在设置里的“故事回顾”重看。"],
          ["关卡越打越有花样", "冰封、隐藏、猫牌、纸箱、毛线、礼盒、闹钟、笼子和钥匙、黑暗，新玩法跟着剧情陆续登场，每 5 关一个特殊关卡。每一关都保证有解，洗牌之后也一样。"],
          ["斗鼠帮", "鼠三爷带着灰皮、豆芽、大肚占了老店。9 场 Boss 关里，老鼠会跳上收纳格占一格，打空它的血条才算赢。"],
          ["救猫", "关卡里藏着等人救的小猫，露出来点一下就能救出来，记进救猫簿。救过的猫会更常回门口看你，有的还会留下来当店猫。"],
          ["五只店猫", "大橘、狸花、糯米、花卷、墨墨各有性格和故事，跟着剧情一只只住进店里。撸猫、喂猫攒亲密度，最高 8 级，一路解锁专属小动作、第 4 段故事和专属装扮；关卡里各有本领：猫爪、眼尖、叼一张、扒拉、夜眼。"],
          ["一处处修起来", "前厅 11 项装修，每项 3 款随时可换，修好就能开门营业赚小鱼干，离线也有收入。之后还有后院、二楼阳台、阁楼和屋顶花园，每处都有自己的修整清单。"],
          ["道具和好运", "移出、撤回、洗牌三种道具。轻松关一次过关能点亮好运小灯，特殊关一开局就送帮手；同一关连输两次，送一次移出。"],
          ["猫咪成长", "猫咪分幼猫、成年、老年三个阶段，每天吃猫粮罐里的早饭。偶尔生点小病，街角宠物药店的林医生会帮忙，第一次看病免费。"],
          ["装扮和猫角落", "赵叔杂货铺分批上新：55 件装扮在衣柜里给猫换上，15 件猫角落家具，猫会自己钻进去睡觉、玩耍。街角扭蛋机每天免费扭一次，概率公开。"],
          ["门口来客和收藏册", "在门口放一碗吃的、摆一个玩具，过一会儿就有猫来做客、留下回礼，20 只来访的猫收进相册。奶奶的旧物收藏册有 4 页 36 张卡，过关就能翻卡，集齐一页解锁一幅回忆插画，店里也多一个摆件。"],
          ["每天都有新鲜事", "梧桐里早报、七日开店礼、猫爪日历。第 10 关后开放每日挑战「鼠帮的死结」：不用帮手谁也解不开，看谁用的救援最少；第 20 关后开放猫爬架挑战塔，每周一重新开始。"],
          ["爱心粮仓（筹备中）", "玩家在游戏里认真照顾猫，公司替大家养真的流浪猫，规则见上方。"]
        ],
        platform: "网页版：手机、电脑浏览器打开就能玩，无需下载。抖音小游戏版筹备中。",
        note: "游戏为简体中文；进度保存在当前浏览器里，换设备或清除浏览器数据后会从头开始。"
      },
      en: {
        name: "Miaomiao Shounaguan", kind: "Casual puzzle · tile matching", tagline: "Tidy Grandma’s old shop, rescue the cats hiding in the clutter, and uncover the secret she left behind",
        desc: "Grandma’s old junk shop at No. 17 Wutong Lane has been shut for almost a year. Grandma now lives in a care home, the Rat Gang has moved in and turned decades of keepsakes upside down, and the street office has posted a notice: reopen by the end of the month or lose the shop. You come back with the key the florist next door has been keeping for her, and together with Daju, a ginger cat who refuses to leave, you tidy the shop level by level and turn it into a cat café. Kittens wait to be rescued from the clutter, and the old things you dig up slowly reveal a secret Grandma has kept for years.",
        genres: ["Tile matching", "Story", "Cat rescue", "Café management", "Cat care", "Collecting"],
        rules: ["Tap any tile that isn’t covered and it flies into the tray below.", "Get 3 identical items in the tray and they clear together.", "Clear every tile to win. If all 7 tray slots fill up with no match, the level is lost."],
        features: [
          ["A five-chapter story", "Season one has 150 levels, one episode every 5 levels, and each chapter answers a mystery: can the shop reopen by the end of the month? What’s inside the biscuit tin the Rat Gang stole? What code opens the trunk in the attic? You can skip the story, or replay it any time from the story review in settings."],
          ["Levels that keep changing", "Frozen tiles, hidden tiles, cat tiles, boxes, yarn, gift boxes, alarm clocks, cages and keys, and darkness arrive as the story goes on, with a special level every 5 levels. Every level is guaranteed to be solvable, even after a shuffle."],
          ["Take on the Rat Gang", "Shu Sanye, the gang’s boss, and his crew Huipi, Douya and Dadu have taken over the shop. In 9 boss levels a rat jumps into a tray slot, and you win by emptying its health bar."],
          ["Rescue cats", "Kittens hide in the levels. Tap one once it’s uncovered to rescue it and add it to the rescue book. Rescued cats come back to visit more often, and some stay on as shop cats."],
          ["Five shop cats", "Daju, Lihua, Nuomi, Huajuan and Momo each have a personality and a story, and move in one by one as the story unfolds. Pet and feed them to build affection up to level 8, unlocking special moves, a fourth story chapter and an exclusive outfit. In the levels each has a skill: Paw, Sharp Eyes, Snatch, Pry and Night Eyes."],
          ["Restore it piece by piece", "The front room has 11 upgrades with 3 styles each, swappable any time. Once it’s fixed you can open up to earn dried fish, even while you’re away. Then come the back yard, the upstairs balcony, the attic and the rooftop garden, each with its own list of jobs."],
          ["Tools and luck", "Three tools: remove, undo and shuffle. Clear an easy level on the first try to light a lucky lantern, and special levels start with a helping hand; lose the same level twice and you get a free remove."],
          ["Growing up", "Cats go from kitten to adult to senior and eat breakfast from the food jar every day. If one gets a little sick, Dr Lin at the corner pet pharmacy helps, and the first visit is free."],
          ["Outfits and the cat corner", "Uncle Zhao’s store restocks in batches: 55 outfits to dress your cats in, and 15 pieces of cat-corner furniture they curl up in or play on. The street-corner capsule machine gives one free spin a day, with the odds posted."],
          ["Visitors and the album", "Leave a bowl of food and a toy by the door, and before long a cat drops by and leaves a gift; 20 visiting cats go into an album. Grandma’s keepsake album has 4 pages and 36 cards, turned over as you clear levels. Finish a page to unlock a memory illustration and a new ornament for the shop."],
          ["Something new every day", "The Wutong Lane morning paper, a 7-day opening gift and a paw-stamp calendar. After level 10 the daily challenge “The Rat Gang’s knot” opens: nobody can untie it without help, so the goal is to use as few rescues as possible. After level 20 the cat-tree challenge tower opens, restarting every Monday."],
          ["Cat Food Bank (coming soon)", "Players look after cats in the game, and the company helps keep real stray cats. See the rules above."]
        ],
        platform: "Web version: plays in any phone or desktop browser, no download needed. A Douyin mini-game version is in preparation.",
        note: "The game is in Simplified Chinese. Progress is saved in this browser and starts over on another device or after clearing browser data."
      }
    }
  ],

  /* 合作医院所在区域 */
  regions: {
    north: ["华北", "North China"],
    northeast: ["东北", "Northeast"],
    east: ["华东", "East China"],
    central: ["华中", "Central China"],
    south: ["华南", "South China"],
    southwest: ["西南", "Southwest"],
    northwest: ["西北", "Northwest"],
    overseas: ["海外", "International"]
  },

  /* 合作医院与科研机构，按城市分组。
     lng / lat 为城市中心经纬度（GeoNames, WGS84），仅用于地图节点，不是院址。
     overseas: true 显示为海外卡片；unlocated: true 只列入名单、不画地图节点。 */
  cities: [
    { id: "beijing", zh: "北京", en: "Beijing", region: "north", lng: 116.39723, lat: 39.9075,
      institutions: [
        ["北京天坛医院", "Beijing Tiantan Hospital"],
        ["301医院", "PLA General Hospital (301)"],
        ["北京协和医院", "Peking Union Medical College Hospital"],
        ["北京同仁医院", "Beijing Tongren Hospital"],
        ["北京大学第三医院", "Peking University Third Hospital"],
        ["广安门医院", "Guang'anmen Hospital"],
        ["中科院生物物理所", "Institute of Biophysics, CAS"],
        ["北京大学第一医院", "Peking University First Hospital"],
        ["北京大学人民医院", "Peking University People's Hospital"],
        ["北京清华长庚医院", "Beijing Tsinghua Changgung Hospital"],
        ["清华大学医学院", "Tsinghua University School of Medicine"],
        ["首都医科大学宣武医院", "Xuanwu Hospital, Capital Medical University"]
      ] },
    { id: "changchun", zh: "长春", en: "Changchun", region: "northeast", lng: 125.32278, lat: 43.88,
      institutions: [
        ["吉林大学第一医院", "The First Hospital of Jilin University"]
      ] },
    { id: "harbin", zh: "哈尔滨", en: "Harbin", region: "northeast", lng: 126.65, lat: 45.75,
      institutions: [
        ["黑龙江省肿瘤医院", "Heilongjiang Cancer Hospital"],
        ["哈尔滨医科大学附属第一医院", "The First Affiliated Hospital of Harbin Medical University"],
        ["哈尔滨医科大学附属第二医院", "The Second Affiliated Hospital of Harbin Medical University"]
      ] },
    { id: "shenyang", zh: "沈阳", en: "Shenyang", region: "northeast", lng: 123.43278, lat: 41.79222,
      institutions: [
        ["盛京医院", "Shengjing Hospital"],
        ["沈阳自动化所", "Shenyang Institute of Automation, CAS"],
        ["中国医科大学附属第一医院", "The First Hospital of China Medical University"]
      ] },
    { id: "shanghai", zh: "上海", en: "Shanghai", region: "east", lng: 121.45806, lat: 31.22222,
      institutions: [
        ["中山医院", "Zhongshan Hospital"],
        ["瑞金医院", "Ruijin Hospital"],
        ["上海市肺科医院", "Shanghai Pulmonary Hospital"],
        ["华山医院", "Huashan Hospital"],
        ["仁济医院", "Renji Hospital"],
        ["长海医院", "Changhai Hospital"],
        ["上海市第一人民医院", "Shanghai General Hospital"],
        ["上海市第七人民医院", "Shanghai Seventh People's Hospital"],
        ["复旦大学附属妇产科医院", "Obstetrics and Gynecology Hospital of Fudan University"],
        ["东方肝胆外科医院", "Eastern Hepatobiliary Surgery Hospital"],
        ["上海市浦东医院", "Shanghai Pudong Hospital"],
        ["复旦大学附属肿瘤医院", "Fudan University Shanghai Cancer Center"]
      ] },
    { id: "jinan", zh: "济南", en: "Jinan", region: "east", lng: 116.99722, lat: 36.66833,
      institutions: [
        ["山东大学齐鲁医院", "Qilu Hospital of Shandong University"],
        ["山东省立医院", "Shandong Provincial Hospital"],
        ["山东省肿瘤防治研究院", "Shandong Cancer Hospital and Institute"]
      ] },
    { id: "qingdao", zh: "青岛", en: "Qingdao", region: "east", lng: 120.38042, lat: 36.06488,
      institutions: [
        ["青岛大学附属医院", "Qingdao University Affiliated Hospital"]
      ] },
    { id: "zibo", zh: "淄博", en: "Zibo", region: "east", lng: 118.06333, lat: 36.79056,
      institutions: [
        ["淄博市中心医院", "Zibo Central Hospital"]
      ] },
    { id: "nanjing", zh: "南京", en: "Nanjing", region: "east", lng: 118.77778, lat: 32.06167,
      institutions: [
        ["南京鼓楼医院", "Nanjing Drum Tower Hospital"],
        ["江苏省人民医院", "Jiangsu Province Hospital"],
        ["南京脑科研究所", "Nanjing Brain Research Institute"]
      ] },
    { id: "suzhou", zh: "苏州", en: "Suzhou", region: "east", lng: 120.59538, lat: 31.30408,
      institutions: [
        ["苏州大学附属第一医院", "The First Affiliated Hospital of Soochow University"]
      ] },
    { id: "hangzhou", zh: "杭州", en: "Hangzhou", region: "east", lng: 120.16142, lat: 30.29365,
      institutions: [
        ["邵逸夫医院", "Sir Run Run Shaw Hospital"],
        ["杭州市第一人民医院", "Hangzhou First People's Hospital"],
        ["浙江大学医学院附属第一医院", "The First Affiliated Hospital, Zhejiang University School of Medicine"],
        ["浙江大学医学院附属第二医院", "The Second Affiliated Hospital, Zhejiang University School of Medicine"]
      ] },
    { id: "wenzhou", zh: "温州", en: "Wenzhou", region: "east", lng: 120.66682, lat: 27.99942,
      institutions: [
        ["温州医科大学附属第一医院", "First Affiliated Hospital of Wenzhou Medical University"],
        ["温州医科大学附属第二医院", "Second Affiliated Hospital of Wenzhou Medical University"]
      ] },
    { id: "ningbo", zh: "宁波", en: "Ningbo", region: "east", lng: 121.54945, lat: 29.87819,
      institutions: [
        ["宁波李惠利医院", "Li Huili Hospital, Ningbo"],
        ["宁波大学附属第一医院", "The First Affiliated Hospital of Ningbo University"],
        ["东方理工大学", "Eastern Institute of Technology, Ningbo"],
        ["宁波大学附属第二医院", "Second Affiliated Hospital of Ningbo University"]
      ] },
    { id: "fuzhou", zh: "福州", en: "Fuzhou", region: "east", lng: 119.30611, lat: 26.06139,
      institutions: [
        ["福建省立医院", "Fujian Provincial Hospital"],
        ["福建医科大学附属第一医院", "The First Affiliated Hospital of Fujian Medical University"]
      ] },
    { id: "xiamen", zh: "厦门", en: "Xiamen", region: "east", lng: 118.08187, lat: 24.47979,
      institutions: [
        ["厦门大学附属第一医院", "First Affiliated Hospital of Xiamen University"]
      ] },
    { id: "nanchang", zh: "南昌", en: "Nanchang", region: "east", lng: 115.85306, lat: 28.68396,
      institutions: [
        ["南昌大学第二附属医院", "Second Affiliated Hospital of Nanchang University"],
        ["南昌大学第一附属医院", "The First Affiliated Hospital of Nanchang University"]
      ] },
    { id: "wuhan", zh: "武汉", en: "Wuhan", region: "central", lng: 114.26667, lat: 30.58333,
      institutions: [
        ["同济医院", "Tongji Hospital"],
        ["协和医院", "Union Hospital"]
      ] },
    { id: "zhengzhou", zh: "郑州", en: "Zhengzhou", region: "central", lng: 113.64861, lat: 34.75778,
      institutions: [
        ["郑州大学第一附属医院", "First Affiliated Hospital of Zhengzhou University"],
        ["河南省人民医院", "Henan Provincial People's Hospital"]
      ] },
    { id: "hengyang", zh: "衡阳", en: "Hengyang", region: "central", lng: 112.61888, lat: 26.88946,
      institutions: [
        ["南华大学附属第一医院", "First Affiliated Hospital of the University of South China"]
      ] },
    { id: "guangzhou", zh: "广州", en: "Guangzhou", region: "south", lng: 113.25, lat: 23.11667,
      institutions: [
        ["广东省人民医院", "Guangdong Provincial People's Hospital"],
        ["南方医院", "Nanfang Hospital"],
        ["中山大学肿瘤防治中心", "Sun Yat-sen University Cancer Center"],
        ["中山大学附属第一医院", "The First Affiliated Hospital of Sun Yat-sen University"],
        ["暨南大学附属医院", "Affiliated Hospital of Jinan University"]
      ] },
    { id: "chongqing", zh: "重庆", en: "Chongqing", region: "southwest", lng: 106.55771, lat: 29.56026,
      institutions: [
        ["重庆医科大学附属第一医院", "First Affiliated Hospital of Chongqing Medical University"],
        ["西南医院", "Southwest Hospital"]
      ] },
    { id: "xian", zh: "西安", en: "Xi'an", region: "northwest", lng: 108.92861, lat: 34.25833,
      institutions: [
        ["西安交通大学第二附属医院", "Second Affiliated Hospital of Xi'an Jiaotong University"],
        ["陕西省人民医院", "Shaanxi Provincial People's Hospital"],
        ["西安交通大学第一附属医院", "The First Affiliated Hospital of Xi'an Jiaotong University"],
        ["西京医院", "Xijing Hospital"],
        ["西安市中心医院", "Xi'an Central Hospital"],
        ["长安医院", "Chang'an Hospital"]
      ] },
    { id: "chengdu", zh: "成都", en: "Chengdu", region: "southwest", lng: 104.06667, lat: 30.66667,
      institutions: [
        ["四川大学华西医院", "West China Hospital, Sichuan University"],
        ["四川省肿瘤医院", "Sichuan Cancer Hospital"]
      ] },
    { id: "hongkong", zh: "香港", en: "Hong Kong", region: "south", lng: 114.16936, lat: 22.3193,
      institutions: [
        ["玛丽医院", "Queen Mary Hospital"]
      ] },
    { id: "kualalumpur", zh: "吉隆坡", en: "Kuala Lumpur", region: "overseas", lng: 101.68653, lat: 3.1412, overseas: true,
      institutions: [
        ["马来亚大学医学中心", "Universiti Malaya Medical Centre"]
      ] },
    { id: "nanchong", zh: "南充", en: "Nanchong", region: "southwest", lng: 106.08473, lat: 30.79508,
      institutions: [
        ["川北医学院", "North Sichuan Medical College"]
      ] },
    { id: "wuxi", zh: "无锡", en: "Wuxi", region: "east", lng: 120.28857, lat: 31.56887,
      institutions: [
        ["江南大学附属医院", "Affiliated Hospital of Jiangnan University"]
      ] },
    { id: "jiujiang", zh: "九江", en: "Jiujiang", region: "east", lng: 115.99976, lat: 29.70475,
      institutions: [
        ["九江市人民医院", "Jiujiang People’s Hospital"]
      ] },
    { id: "ganzhou", zh: "赣州", en: "Ganzhou", region: "east", lng: 114.93333, lat: 25.83333,
      institutions: [
        ["赣南医科大学附属医院", "Affiliated Hospital of Gannan Medical University"]
      ] },
    { id: "luoyang", zh: "洛阳", en: "Luoyang", region: "central", lng: 112.45361, lat: 34.68361,
      institutions: [
        ["河南科技大学附属医院", "Affiliated Hospital of Henan University of Science and Technology"]
      ] },
    { id: "xinxiang", zh: "新乡", en: "Xinxiang", region: "central", lng: 113.86722, lat: 35.30889,
      institutions: [
        ["新乡医学院附属医院", "Affiliated Hospital of Xinxiang Medical University"]
      ] },
    { id: "qujing", zh: "曲靖", en: "Qujing", region: "southwest", lng: 103.79778, lat: 25.48333,
      institutions: [
        ["云南曲靖人民医院", "Qujing People’s Hospital, Yunnan"]
      ] },
    { id: "unlocated", zh: "东北", en: "Northeast", region: "northeast", unlocated: true,
      institutions: [
        ["大连理工大学附属医院", "Affiliated Hospital of Dalian University of Technology"]
      ] }
  ],

  /* 科研团队合作单位；logo 位于 university_logos/。
     dark: true 表示白色标志（在浅色底板上会转成深色显示）；
     area: cn 中国（含港澳）· asia 亚洲其他 · eu 欧洲 · na 北美 */
  universities: [
    { logo: "stanford.png", zh: "斯坦福大学", en: "Stanford University", area: "na" },
    { logo: "berkeley.png", zh: "加州大学伯克利分校", en: "UC Berkeley", area: "na" },
    { logo: "yale.png", zh: "耶鲁大学", en: "Yale University", area: "na" },
    { logo: "harvard.png", zh: "哈佛大学", en: "Harvard University", area: "na" },
    { logo: "cmu.png", zh: "卡耐基梅隆大学", en: "Carnegie Mellon", area: "na" },
    { logo: "max_planck.png", zh: "马克斯普朗克研究院", en: "Max Planck Institute", area: "eu" },
    { logo: "tum.png", zh: "慕尼黑工业大学", en: "TU Munich", area: "eu" },
    { logo: "eth_zurich.png", zh: "苏黎世联邦理工", en: "ETH Zurich", area: "eu" },
    { logo: "pku.png", zh: "北京大学", en: "Peking University", area: "cn" },
    { logo: "tsinghua.png", zh: "清华大学", en: "Tsinghua University", area: "cn" },
    { logo: "fudan.png", zh: "复旦大学", en: "Fudan University", area: "cn" },
    { logo: "sjtu.png", zh: "上海交通大学", en: "Shanghai Jiao Tong", area: "cn" },
    { logo: "zju.png", zh: "浙江大学", en: "Zhejiang University", area: "cn" },
    { logo: "cuhk.png", zh: "香港中文大学", en: "CUHK", area: "cn" },
    { logo: "toronto.png", zh: "多伦多大学", en: "University of Toronto", area: "na" },
    { logo: "snu.png", zh: "首尔国立大学", en: "Seoul National University", area: "asia" },
    { logo: "kaist.png", zh: "韩国科学技术院", en: "KAIST", area: "asia" },
    { logo: "hms.png", zh: "哈佛大学医学院", en: "Harvard Medical School", area: "na" },
    { logo: "utrecht.svg", zh: "乌特勒支大学", en: "Utrecht University", area: "eu" },
    { logo: "umcutrecht.svg", zh: "乌特勒支大学附属医院", en: "UMC Utrecht", area: "eu" },
    { logo: "uva.png", zh: "阿姆斯特丹大学", en: "University of Amsterdam", area: "eu" },
    { logo: "amsterdamumc.svg", zh: "阿姆斯特丹大学附属医院", en: "Amsterdam UMC", area: "eu" },
    { logo: "nki.png", zh: "荷兰癌症研究所", en: "Netherlands Cancer Institute", area: "eu" },
    { logo: "uzh.png", zh: "苏黎世大学", en: "University of Zurich", area: "eu" },
    { logo: "usz.png", zh: "苏黎世大学附属医院", en: "University Hospital Zurich", area: "eu" },
    { logo: "hku.svg", zh: "香港大学", en: "The University of Hong Kong", area: "cn" },
    { logo: "mcgill.svg", zh: "麦吉尔大学", en: "McGill University", area: "na", dark: true },
    { logo: "nankai.png", zh: "南开大学", en: "Nankai University", area: "cn" },
    { logo: "xmu.png", zh: "厦门大学", en: "Xiamen University", area: "cn" },
    { logo: "hust.png", zh: "华中科技大学", en: "Huazhong University of Science and Technology", area: "cn", dark: true },
    { logo: "whu.png", zh: "武汉大学", en: "Wuhan University", area: "cn" },
    { logo: "dlut.svg", zh: "大连理工大学", en: "Dalian University of Technology", area: "cn", dark: true },
    { logo: "mpu.png", zh: "澳门理工大学", en: "Macao Polytechnic University", area: "cn" },
    { logo: "ornl.svg", zh: "美国橡树岭国家实验室", en: "Oak Ridge National Laboratory", area: "na" },
    { logo: "tongji.png", zh: "同济大学", en: "Tongji University", area: "cn", dark: true },
    { logo: "buaa.png", zh: "北京航空航天大学", en: "Beihang University", area: "cn", dark: true },
    { logo: "hit.png", zh: "哈尔滨工业大学", en: "Harbin Institute of Technology", area: "cn", dark: true },
    { logo: "nju.png", zh: "南京大学", en: "Nanjing University", area: "cn" },
    { logo: "bit.png", zh: "北京理工大学", en: "Beijing Institute of Technology", area: "cn", dark: true },
    { logo: "um.png", zh: "马来亚大学", en: "Universiti Malaya", area: "asia" },
    { logo: "washington.svg", zh: "华盛顿大学", en: "University of Washington", area: "na", dark: true },
    { logo: "heidelberg.svg", zh: "海德堡大学", en: "Heidelberg University", area: "eu" },
    { logo: "ntu.png", zh: "新加坡南洋理工大学", en: "Nanyang Technological University", area: "asia" },
    { logo: "nus.svg", zh: "新加坡国立大学", en: "National University of Singapore", area: "asia" },
    { logo: "bern.png", zh: "伯尔尼大学", en: "University of Bern", area: "eu" },
    { logo: "scu.png", zh: "四川大学", en: "Sichuan University", area: "cn" },
    { logo: "cornell.png", zh: "康奈尔大学", en: "Cornell University", area: "na" },
    { logo: "hznu.png", zh: "杭州师范大学", en: "Hangzhou Normal University", area: "cn", dark: true },
    { logo: "sdu.svg", zh: "山东大学", en: "Shandong University", area: "cn", dark: true },
    { logo: "manchester.png", zh: "曼彻斯特大学", en: "The University of Manchester", area: "eu" },
    { logo: "hkust.svg", zh: "香港科技大学", en: "The Hong Kong University of Science and Technology", area: "cn" },
    { logo: "sia.png", zh: "沈阳自动化所", en: "Shenyang Institute of Automation, CAS", area: "cn" },
    { logo: "ia.png", zh: "中科院自动化所", en: "Institute of Automation, CAS", area: "cn", dark: true },
    { logo: "tju.png", zh: "天津大学", en: "Tianjin University", area: "cn", dark: true },
    { logo: "cityu.svg", zh: "香港城市大学", en: "City University of Hong Kong", area: "cn" },
    { logo: "kth.png", zh: "瑞典皇家理工学院", en: "KTH Royal Institute of Technology", area: "eu" },
    { logo: "ki.svg", zh: "卡罗琳斯卡医学院", en: "Karolinska Institutet", area: "eu" },
    { logo: "ubc.png", zh: "英属哥伦比亚大学", en: "The University of British Columbia", area: "na" },
    { logo: "ustc.svg", zh: "中国科学技术大学", en: "University of Science and Technology of China", area: "cn", dark: true },
    { logo: "whut.svg", zh: "武汉理工大学", en: "Wuhan University of Technology", area: "cn", dark: true },
    { logo: "unimap.png", zh: "马来西亚玻璃市大学", en: "Universiti Malaysia Perlis", area: "asia" },
    { logo: "buffalo.png", zh: "纽约州立大学布法罗分校", en: "University at Buffalo, SUNY", area: "na", dark: true },
    { logo: "utsw.svg", zh: "德克萨斯大学西南医学中心", en: "UT Southwestern Medical Center", area: "na", dark: true }
  ]
};
