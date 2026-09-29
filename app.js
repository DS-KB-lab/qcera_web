(function () {
    "use strict";

    var currentLang = "zh";
    var DEBUG_MAP = false;
    var debugMapEnabled = DEBUG_MAP || new URLSearchParams(window.location.search).get("debugMap") === "1";

    var i18n = {
        en: {
            "brand": "Qichuang Era",
            "brand.kicker": "Medical Research Conversion Deck",
            "nav.about": "About",
            "nav.platforms": "Platforms",
            "nav.equipment": "Equipment",
            "nav.datasets": "Datasets",
            "nav.hospitals": "Hospitals",
            "hero.eyebrow": "Medical Biotech · Integrated Research Services",
            "hero.title": "Technology-Driven Medical Research<br>Innovation Leading Translational Impact",
            "hero.desc": "Composed of a master's and doctoral technical team, partnering with renowned universities, leveraging scientific and technological innovation to translate research outcomes. We are committed to meeting diverse needs in the research field through our integrated one-stop service model.",
            "hero.btn1": "Explore Platforms",
            "hero.btn2": "View Network",
            "hero.note1.label": "Integrity Layer",
            "hero.note1.body": "HD monitoring, experimental logging, and graded data storage make the full workflow traceable.",
            "hero.note2.label": "Platform Sync",
            "hero.note2.body": "Bioinformatics, cell, mechanism, animal, and materials capabilities are connected to reduce handoff costs.",
            "hero.note3.label": "Translation Exit",
            "hero.note3.body": "From project design to publication, one coordinated team moves research toward real-world output.",
            "hero.panel.kicker": "Research Command Deck",
            "hero.panel.title": "Integrated Medical R&D Operating Deck",
            "hero.panel.desc": "Experimental capability, clinical collaboration, data assets, and publication output are compressed into one readable business panorama.",
            "hero.panel.foot1.label": "Service Model",
            "hero.panel.foot1.value": "Bench to bedside",
            "hero.panel.foot2.label": "Research Route",
            "hero.panel.foot2.value": "Data · Experiment · Translation",
            "hero.panel.foot3.label": "Partner Structure",
            "hero.panel.foot3.value": "Universities × Hospitals × Journals",
            "hero.ticker.1": "Bioinformatics, cell, mechanism, animal, materials, and manuscript services move in one coordinated system.",
            "hero.ticker.2": "University collaboration and hospital networks jointly accelerate translational project delivery.",
            "hero.ticker.3": "Data security, experimental traceability, and publication pathways form a closed research loop.",
            "about.eyebrow": "About Us",
            "about.title": "About Qichuang Era",
            "about.desc": "Beijing Qichuang Era Technology Co., Ltd is composed of a master's and doctoral technical team, maintaining deep partnerships with renowned universities. Through scientific innovation we translate research outcomes, and rely on our own biology and medical materials laboratories to provide full-process integrated services for the research community.",
            "about.card1.title": "HD Camera Monitoring",
            "about.card1.body": "Laboratories are equipped with HD cameras that record the entire experiment and data generation process to prevent data leakage.",
            "about.card2.title": "Data Security System",
            "about.card2.body": "Experimental data is stored on dedicated network drives with restricted access. Company computers share files internally only, with no external network connections.",
            "about.card3.title": "Duplicate-Check System",
            "about.card3.body": "Dual internal and external checking: unpublished data checked within the company, and published data checked against external databases with advanced image-matching software.",
            "about.card4.title": "Standardized Lab Notebooks",
            "about.card4.body": "Each project has a dedicated manager and lab notebook recording dates, personnel, procedures, and results to ensure data authenticity and reliability.",
            "platforms.eyebrow": "Lab Platforms",
            "platforms.title": "Five Laboratory Service Platforms",
            "platforms.desc": "We own biology and medical materials laboratories equipped with advanced instruments, capable of completing the full experimental pipeline from molecular to animal levels.",
            "datasets.eyebrow": "Datasets",
            "datasets.title": "Core Medical Datasets",
            "datasets.desc": "Covering gastrointestinal cancer, acoustic neuroma, chordoma, ophthalmology multimodal, and multi-field-strength MRI directions.",
            "datasets.cta": "<span>Visit Dataset Detail Platform →</span>",
            "datasets.ctaHint": "Jump to the full Medical Multimodal Dataset & Clinical Collaboration platform for detailed data, imaging previews, and collaboration networks.",
            "hospitals.eyebrow": "Hospital Network",
            "hospitals.title": "National Hospital Collaboration Network",
            "hospitals.desc": "Spanning 7 major regions and 22 cities across China, with deep partnerships with over 41 renowned hospitals and research institutions.",
            "hospitals.legendCity": "Partner Cities",
            "hospitals.legendLink": "Collaboration Links",
            "equip.eyebrow": "Laboratory Equipment",
            "equip.title": "Core Instrument Showcase",
            "equip.desc": "Equipped with world-class laboratory instruments spanning flow cytometry, confocal imaging, super-resolution microscopy, in vivo imaging, and nanoparticle synthesis.",
            "partners.eyebrow": "Research Partners",
            "partners.title": "Academic Partner Institutions",
            "partners.desc": "Our team members come from top universities and research institutions worldwide, spanning the US, Europe, and Asia.",
            "partners.panel.kicker": "Global Talent Matrix",
            "partners.panel.title": "Clinical questions, experimental systems, and international academic training converge within one partner network.",
            "partners.panel.desc": "This is more than a logo wall. It represents a collaboration surface that lets medicine, imaging, biomaterials, bioinformatics, and translational research move together across institutions.",
            "partners.tag1": "Medicine",
            "partners.tag2": "Imaging",
            "partners.tag3": "Biomaterials",
            "partners.tag4": "AI + Data",
            "footer.name": "Beijing Qichuang Era Technology Co., Ltd",
            "footer.nameEn": "",
            "footer.copy": "&copy; 2026 Beijing Qichuang Era Technology Co., Ltd. All rights reserved."
        },
        zh: {}
    };

    var zhOriginals = {};

    var heroStats = {
        zh: [
            { value: "41+", label: "合作医院及机构" },
            { value: "51", label: "发表学术期刊" },
            { value: "18", label: "合作高校及研究所" },
            { value: "5", label: "核心医疗数据集" }
        ],
        en: [
            { value: "41+", label: "Partner Hospitals" },
            { value: "51", label: "Published Journals" },
            { value: "18", label: "University Partners" },
            { value: "5", label: "Core Datasets" }
        ]
    };

    var platforms = {
        zh: [
            {
                icon: "🧬", img: "pdf_images/p2_12_1712x648.jpeg",
                name: "生信平台",
                subtitle: "Bioinformatics Platform",
                desc: "整合多个国际临床数据库资源，覆盖单细胞测序与空间多组学分析全流程。",
                tags: ["UKB", "GBD", "CHARLS", "NHANES", "单细胞测序", "空间代谢组", "空间转录组", "空间蛋白组"]
            },
            {
                icon: "🔬", img: "pdf_images/p2_16_872x627.jpeg",
                name: "细胞平台",
                subtitle: "Cell Biology Platform",
                desc: "配备流式分选仪、共聚焦显微镜、透射电镜等高端仪器，支持从细胞培养到功能检测的全流程实验。",
                tags: ["细胞培养", "流式细胞术", "质粒转染", "慢病毒转染", "WB / CO-IP", "CHIP / ELISA", "细胞增殖/凋亡", "双荧光素酶报告"]
            },
            {
                icon: "⚗️", img: "pdf_images/p3_9_828x468.jpeg",
                name: "机制平台",
                subtitle: "Mechanism Research Platform",
                desc: "聚焦蛋白质翻译后修饰、程序性细胞死亡、肿瘤免疫微环境及类器官芯片等前沿研究方向。",
                tags: ["翻译后修饰", "乳酸化 / 棕榈酰化", "铁死亡 / 双硫死亡", "肿瘤免疫微环境", "类器官芯片", "相分离", "糖酵解", "细胞衰老"]
            },
            {
                icon: "🐁", img: "pdf_images/p3_10_1612x1116.jpeg",
                name: "动物平台",
                subtitle: "Animal Experiment Platform",
                desc: "与佑曙生命科技深度合作，拥有成熟的肿瘤、心梗、脑缺血等疾病动物模型构建技术。",
                tags: ["动物模型构建", "活体成像", "MicroCT", "9.4T小动物核磁", "动物托管饲养", "组织取材", "免疫组化/荧光", "H&E染色"]
            },
            {
                icon: "💊", img: "pdf_images/p4_11_1094x424.jpeg",
                name: "材料平台",
                subtitle: "Biomaterials Platform",
                desc: "专注智能化材料设计、药物靶向递送与控制释放系统构建，覆盖纳米颗粒到水凝胶等多种递药体系。",
                tags: ["纳米粒酶", "水凝胶", "细菌递送", "脂质纳米颗粒", "微流控合成", "靶向递药", "控制释放", "生物效应评价"]
            },
            {
                icon: "📝",
                name: "文章服务",
                subtitle: "Manuscript Services",
                desc: "提供从课题设计到文章发表的全链条支持，包括基金写作、投稿指导、润色与深度修改服务。",
                tags: ["课题设计", "基金写作", "SCI投稿", "选刊推荐", "英文润色", "深度修改", "加速审稿", "数据作图"]
            }
        ],
        en: [
            {
                icon: "🧬", img: "pdf_images/p2_12_1712x648.jpeg",
                name: "Bioinformatics",
                subtitle: "Bioinformatics Platform",
                desc: "Integrating international clinical databases with full-pipeline single-cell sequencing and spatial multi-omics analysis.",
                tags: ["UKB", "GBD", "CHARLS", "NHANES", "Single-cell Seq", "Spatial Metabolomics", "Spatial Transcriptomics", "Spatial Proteomics"]
            },
            {
                icon: "🔬", img: "pdf_images/p2_16_872x627.jpeg",
                name: "Cell Biology",
                subtitle: "Cell Biology Platform",
                desc: "Equipped with flow cytometry sorters, confocal microscopes, TEM, and more for complete cell culture to functional assay workflows.",
                tags: ["Cell Culture", "Flow Cytometry", "Plasmid Transfection", "Lentiviral Transduction", "WB / CO-IP", "ChIP / ELISA", "Proliferation/Apoptosis", "Luciferase Reporter"]
            },
            {
                icon: "⚗️", img: "pdf_images/p3_9_828x468.jpeg",
                name: "Mechanism Research",
                subtitle: "Mechanism Research Platform",
                desc: "Focused on post-translational modifications, programmed cell death, tumor immune microenvironment, and organoid-on-chip technologies.",
                tags: ["PTM", "Lactylation / Palmitoylation", "Ferroptosis / Disulfidptosis", "Tumor Immune Microenvironment", "Organoid-on-Chip", "Phase Separation", "Glycolysis", "Cellular Senescence"]
            },
            {
                icon: "🐁", img: "pdf_images/p3_10_1612x1116.jpeg",
                name: "Animal Models",
                subtitle: "Animal Experiment Platform",
                desc: "Mature disease model construction including tumor, myocardial infarction, cerebral ischemia, with in vivo imaging and micro-CT.",
                tags: ["Model Construction", "In Vivo Imaging", "MicroCT", "9.4T Small Animal MRI", "Animal Housing", "Tissue Sampling", "IHC / IF", "H&E Staining"]
            },
            {
                icon: "💊", img: "pdf_images/p4_11_1094x424.jpeg",
                name: "Biomaterials",
                subtitle: "Biomaterials Platform",
                desc: "Smart material design, targeted drug delivery, and controlled release systems spanning nanoparticles to hydrogels.",
                tags: ["Nanozymes", "Hydrogels", "Bacterial Delivery", "Lipid Nanoparticles", "Microfluidic Synthesis", "Targeted Delivery", "Controlled Release", "Bio-efficacy Evaluation"]
            },
            {
                icon: "📝",
                name: "Manuscript Services",
                subtitle: "Manuscript Services",
                desc: "Full support from topic design to publication, including grant writing, journal selection, editing, and review acceleration.",
                tags: ["Topic Design", "Grant Writing", "SCI Submission", "Journal Selection", "English Editing", "Deep Revision", "Review Acceleration", "Data Visualization"]
            }
        ]
    };

    var equipmentData = [
        { img: "pdf_images/p2_17_1219x422.jpeg", zh: "BeckMan moflo astrios / BD FACSAria 高速流式细胞分选仪", en: "BeckMan moflo astrios / BD FACSAria High-speed Flow Sorters", wide: true },
        { img: "pdf_images/p2_18_1592x848.jpeg", zh: "Beckman CytoFLEX S / BD LSRFortessa X-20 流式细胞分析仪", en: "Beckman CytoFLEX S / BD LSRFortessa X-20 Flow Analyzers", wide: true },
        { img: "pdf_images/p2_22_768x520.jpeg", zh: "Leica SP8 STED 超高分辨率显微镜", en: "Leica SP8 STED Super-Resolution Microscope" },
        { img: "pdf_images/p2_20_748x654.jpeg", zh: "Perkin Elmer Operetta CLS 激光共聚焦高内涵分析系统", en: "Perkin Elmer Operetta CLS Confocal High-Content System" },
        { img: "pdf_images/p3_15_776x605.jpeg", zh: "小动物活体成像仪", en: "Small Animal In Vivo Imaging System" },
        { img: "pdf_images/p3_14_788x906.jpeg", zh: "Beecher MTA-1 组织芯片阵列仪", en: "Beecher MTA-1 Tissue Microarray" },
        { img: "pdf_images/p4_10_626x460.jpeg", zh: "FluidicLab 智能纳米颗粒合成仪", en: "FluidicLab Smart Nanoparticle Synthesizer" },
        { img: "pdf_images/p4_25_384x400.jpeg", zh: "微流控 INano E 纳米药物递送系统", en: "Microfluidic INano E Drug Delivery System" },
        { img: "pdf_images/p3_16_750x1052.jpeg", zh: "Olympus CX43/CX33 生物显微镜", en: "Olympus CX43/CX33 Biological Microscope" },
        { img: "pdf_images/p2_11_894x608.jpeg", zh: "空间转录组学分析数据", en: "Spatial Transcriptomics Analysis Data", wide: true }
    ];

    /*
     * WGS84 city centres from GeoNames cities15000. Coordinates are [longitude, latitude].
     * Source: https://download.geonames.org/export/dump/cities15000.zip
     */
    var cityCoordinates = {
        beijing: { lng: 116.39723, lat: 39.90750 },
        changchun: { lng: 125.32278, lat: 43.88000 },
        harbin: { lng: 126.65000, lat: 45.75000 },
        shenyang: { lng: 123.43278, lat: 41.79222 },
        shanghai: { lng: 121.45806, lat: 31.22222 },
        jinan: { lng: 116.99722, lat: 36.66833 },
        qingdao: { lng: 120.38042, lat: 36.06488 },
        zibo: { lng: 118.06333, lat: 36.79056 },
        nanjing: { lng: 118.77778, lat: 32.06167 },
        suzhou: { lng: 120.59538, lat: 31.30408 },
        hangzhou: { lng: 120.16142, lat: 30.29365 },
        wenzhou: { lng: 120.66682, lat: 27.99942 },
        ningbo: { lng: 121.54945, lat: 29.87819 },
        fuzhou: { lng: 119.30611, lat: 26.06139 },
        xiamen: { lng: 118.08187, lat: 24.47979 },
        nanchang: { lng: 115.85306, lat: 28.68396 },
        wuhan: { lng: 114.26667, lat: 30.58333 },
        zhengzhou: { lng: 113.64861, lat: 34.75778 },
        hengyang: { lng: 112.61888, lat: 26.88946 },
        guangzhou: { lng: 113.25000, lat: 23.11667 },
        chongqing: { lng: 106.55771, lat: 29.56026 },
        xian: { lng: 108.92861, lat: 34.25833 }
    };

    var hospitalsZH = [
        { id: "beijing", city: "北京", region: "华北", institutions: ["北京天坛医院", "301医院", "北京协和医院", "北京同仁医院", "北京大学第三医院", "广安门医院", "中科院生物物理所"] },
        { id: "changchun", city: "长春", region: "东北", institutions: ["吉林大学第一医院"] },
        { id: "harbin", city: "哈尔滨", region: "东北", institutions: ["黑龙江省肿瘤医院"] },
        { id: "shenyang", city: "沈阳", region: "东北", institutions: ["盛京医院", "沈阳自动化所"] },
        { id: "shanghai", city: "上海", region: "华东", institutions: ["中山医院", "瑞金医院", "上海市肺科医院", "华山医院", "仁济医院"] },
        { id: "jinan", city: "济南", region: "华东", institutions: ["山东大学齐鲁医院", "山东省立医院"] },
        { id: "qingdao", city: "青岛", region: "华东", institutions: ["青岛大学附属医院"] },
        { id: "zibo", city: "淄博", region: "华东", institutions: ["淄博市中心医院"] },
        { id: "nanjing", city: "南京", region: "华东", institutions: ["南京鼓楼医院"] },
        { id: "suzhou", city: "苏州", region: "华东", institutions: ["苏州大学附属第一医院"] },
        { id: "hangzhou", city: "杭州", region: "华东", institutions: ["邵逸夫医院", "杭州市第一人民医院"] },
        { id: "wenzhou", city: "温州", region: "华东", institutions: ["温州医科大学附属第一医院", "温州医科大学附属第二医院"] },
        { id: "ningbo", city: "宁波", region: "华东", institutions: ["宁波李惠利医院"] },
        { id: "fuzhou", city: "福州", region: "华东", institutions: ["福建省立医院"] },
        { id: "xiamen", city: "厦门", region: "华东", institutions: ["厦门大学附属第一医院"] },
        { id: "nanchang", city: "南昌", region: "华东", institutions: ["南昌大学第二附属医院"] },
        { id: "wuhan", city: "武汉", region: "华中", institutions: ["同济医院", "协和医院"] },
        { id: "zhengzhou", city: "郑州", region: "华中", institutions: ["郑州大学第一附属医院", "河南省人民医院"] },
        { id: "hengyang", city: "衡阳", region: "华中", institutions: ["南华大学附属第一医院"] },
        { id: "guangzhou", city: "广州", region: "华南", institutions: ["广东省人民医院", "南方医院", "中山大学肿瘤防治中心"] },
        { id: "chongqing", city: "重庆", region: "西南", institutions: ["重庆医科大学附属第一医院"] },
        { id: "xian", city: "西安", region: "西北", institutions: ["西安交通大学第二附属医院", "陕西省人民医院"] }
    ];

    var hospitalsEN = [
        { id: "beijing", city: "Beijing", region: "North China", institutions: ["Beijing Tiantan Hospital", "PLA General Hospital (301)", "Peking Union Medical College Hospital", "Beijing Tongren Hospital", "Peking University Third Hospital", "Guang'anmen Hospital", "Institute of Biophysics, CAS"] },
        { id: "changchun", city: "Changchun", region: "Northeast", institutions: ["The First Hospital of Jilin University"] },
        { id: "harbin", city: "Harbin", region: "Northeast", institutions: ["Heilongjiang Cancer Hospital"] },
        { id: "shenyang", city: "Shenyang", region: "Northeast", institutions: ["Shengjing Hospital", "Shenyang Institute of Automation, CAS"] },
        { id: "shanghai", city: "Shanghai", region: "East China", institutions: ["Zhongshan Hospital", "Ruijin Hospital", "Shanghai Pulmonary Hospital", "Huashan Hospital", "Renji Hospital"] },
        { id: "jinan", city: "Jinan", region: "East China", institutions: ["Qilu Hospital of Shandong University", "Shandong Provincial Hospital"] },
        { id: "qingdao", city: "Qingdao", region: "East China", institutions: ["Qingdao University Affiliated Hospital"] },
        { id: "zibo", city: "Zibo", region: "East China", institutions: ["Zibo Central Hospital"] },
        { id: "nanjing", city: "Nanjing", region: "East China", institutions: ["Nanjing Drum Tower Hospital"] },
        { id: "suzhou", city: "Suzhou", region: "East China", institutions: ["The First Affiliated Hospital of Soochow University"] },
        { id: "hangzhou", city: "Hangzhou", region: "East China", institutions: ["Sir Run Run Shaw Hospital", "Hangzhou First People's Hospital"] },
        { id: "wenzhou", city: "Wenzhou", region: "East China", institutions: ["First Affiliated Hospital of Wenzhou Medical University", "Second Affiliated Hospital of Wenzhou Medical University"] },
        { id: "ningbo", city: "Ningbo", region: "East China", institutions: ["Li Huili Hospital, Ningbo"] },
        { id: "fuzhou", city: "Fuzhou", region: "East China", institutions: ["Fujian Provincial Hospital"] },
        { id: "xiamen", city: "Xiamen", region: "East China", institutions: ["First Affiliated Hospital of Xiamen University"] },
        { id: "nanchang", city: "Nanchang", region: "East China", institutions: ["Second Affiliated Hospital of Nanchang University"] },
        { id: "wuhan", city: "Wuhan", region: "Central China", institutions: ["Tongji Hospital", "Union Hospital"] },
        { id: "zhengzhou", city: "Zhengzhou", region: "Central China", institutions: ["First Affiliated Hospital of Zhengzhou University", "Henan Provincial People's Hospital"] },
        { id: "hengyang", city: "Hengyang", region: "Central China", institutions: ["First Affiliated Hospital of the University of South China"] },
        { id: "guangzhou", city: "Guangzhou", region: "South China", institutions: ["Guangdong Provincial People's Hospital", "Nanfang Hospital", "Sun Yat-sen University Cancer Center"] },
        { id: "chongqing", city: "Chongqing", region: "Southwest", institutions: ["First Affiliated Hospital of Chongqing Medical University"] },
        { id: "xian", city: "Xi'an", region: "Northwest", institutions: ["Second Affiliated Hospital of Xi'an Jiaotong University", "Shaanxi Provincial People's Hospital"] }
    ];

    var datasetsZH = [
        { id: "mri", name: "MRI多场强影像数据集", tagline: "从0.05T到7T的跨场强配对路线", summary: "围绕多场强MRI配对采集构建系统化数据体系，当前已形成0.05T到3T的匹配受试者基础，并规划向5T、7T延展。", stats: [{ v: "53例", l: "现有匹配样本" }, { v: "100例", l: "下阶段目标" }, { v: "0.05T→7T", l: "场强跨度" }, { v: "跨场强配对", l: "建设重点" }] },
        { id: "gastro", name: "胃肠癌肿瘤数据集", tagline: "2632条结构化随访与病理字段", summary: "整合2632条结构化记录，覆盖人口学、并发症、CEA/CA19-9、TNM分期、病理免疫组化与生存随访字段。", stats: [{ v: "2632", l: "总记录数" }, { v: "63.5岁", l: "平均年龄" }, { v: "2624", l: "CEA可用记录" }, { v: "2621", l: "CA19-9可用" }] },
        { id: "acoustic", name: "听神经瘤数据集", tagline: "995条诊断记录 + 三维影像预览", summary: "包含影像勾画信息与三维影像内容，记录了年龄、性别、检查方式和诊断文本，并提供512×512×24的三维影像预览。", stats: [{ v: "994", l: "影像记录数" }, { v: "44岁", l: "平均年龄" }, { v: "512×512×24", l: "NIfTI尺寸" }, { v: "480/521", l: "病灶侧别" }] },
        { id: "chordoma", name: "脊索瘤多组学数据集", tagline: "稀缺病种的病理与空间组学方向", summary: "聚焦稀缺病种的病理与空间组学方向，强调全切片H&E、空间蛋白组/转录组与纵向临床随访的组合能力。", stats: [{ v: "罕见病", l: "病种属性" }, { v: "病理+空间组学", l: "重点模态" }, { v: "支持", l: "纵向随访" }, { v: "1张", l: "展示图像" }] },
        { id: "ophthalmology", name: "眼科多模态数据集", tagline: "Demo展示1221份样例，完整项目已达万人级", summary: "覆盖CRVO-ME、DME、Fuchs综合征、眼外伤、葡萄膜炎、高度近视和黄斑裂孔等方向，完整数据规模已达万人以上。", stats: [{ v: "1221", l: "Demo样例" }, { v: "1万+", l: "实际规模" }, { v: "50万人次", l: "临床验证" }, { v: "OCT/CT/MRI", l: "核心模态" }] }
    ];

    var datasetsEN = [
        { id: "mri", name: "Multi-field-strength MRI Dataset", tagline: "Matched imaging roadmap from 0.05T to 7T", summary: "Systematic data built around matched MRI acquisition across field strengths, with existing 0.05T-3T foundation and planned extension toward 5T and 7T.", stats: [{ v: "53", l: "Matched Cases" }, { v: "100", l: "Next Milestone" }, { v: "0.05T→7T", l: "Field Range" }, { v: "Cross-strength", l: "Core Focus" }] },
        { id: "gastro", name: "Gastrointestinal Cancer Dataset", tagline: "2,632 structured follow-up & pathology records", summary: "Structured cohort covering demographics, complications, CEA/CA19-9, TNM staging, pathology, immunohistochemistry, and survival follow-up.", stats: [{ v: "2,632", l: "Total Records" }, { v: "63.5 yr", l: "Mean Age" }, { v: "2,624", l: "CEA Records" }, { v: "2,621", l: "CA19-9 Records" }] },
        { id: "acoustic", name: "Acoustic Neuroma Dataset", tagline: "995 diagnosis records + 3D imaging preview", summary: "Combines structured annotation with 3D imaging content including age, sex, exam method, diagnosis, and 512×512×24 volume preview.", stats: [{ v: "994", l: "Imaging Records" }, { v: "44 yr", l: "Mean Age" }, { v: "512³", l: "NIfTI Size" }, { v: "480/521", l: "Laterality" }] },
        { id: "chordoma", name: "Chordoma Multi-omics Dataset", tagline: "Rare-disease pathology & spatial omics", summary: "Built around whole-slide H&E, spatial proteomics/transcriptomics, and longitudinal clinical follow-up for this rare disease.", stats: [{ v: "Rare", l: "Disease Type" }, { v: "Path+Omics", l: "Core Modalities" }, { v: "Yes", l: "Longitudinal" }, { v: "1", l: "Display Image" }] },
        { id: "ophthalmology", name: "Ophthalmology Multimodal Dataset", tagline: "1,221 demo samples; full program 10,000+ cases", summary: "Covering CRVO-ME, DME, Fuchs syndrome, ocular trauma, uveitis, high myopia, and macular hole. Full program exceeds 10,000 real-world cases.", stats: [{ v: "1,221", l: "Demo Samples" }, { v: "10,000+", l: "Full Scale" }, { v: "500K", l: "Clinical Validation" }, { v: "OCT/CT/MRI", l: "Core Modalities" }] }
    ];

    var universities = [
        { logo: "stanford.png", zh: "斯坦福大学", en: "Stanford University" },
        { logo: "berkeley.png", zh: "加州大学伯克利分校", en: "UC Berkeley" },
        { logo: "yale.png", zh: "耶鲁大学", en: "Yale University" },
        { logo: "harvard.png", zh: "哈佛大学", en: "Harvard University" },
        { logo: "cmu.png", zh: "卡耐基梅隆大学", en: "Carnegie Mellon" },
        { logo: "max_planck.png", zh: "马克斯普朗克研究院", en: "Max Planck Institute" },
        { logo: "tum.png", zh: "慕尼黑工业大学", en: "TU Munich" },
        { logo: "eth_zurich.png", zh: "苏黎世联邦理工", en: "ETH Zurich" },
        { logo: "pku.png", zh: "北京大学", en: "Peking University" },
        { logo: "tsinghua.png", zh: "清华大学", en: "Tsinghua University" },
        { logo: "fudan.png", zh: "复旦大学", en: "Fudan University" },
        { logo: "sjtu.png", zh: "上海交通大学", en: "Shanghai Jiao Tong" },
        { logo: "zju.png", zh: "浙江大学", en: "Zhejiang University" },
        { logo: "cuhk.png", zh: "香港中文大学", en: "CUHK" },
        { logo: "toronto.png", zh: "多伦多大学", en: "University of Toronto" },
        { logo: "snu.png", zh: "首尔国立大学", en: "Seoul National University" },
        { logo: "kaist.png", zh: "韩国科学技术院", en: "KAIST" }
    ];

    /* ================================================ */
    /*  INIT                                            */
    /* ================================================ */
    function init() {
        storeOriginals();
        renderHeroStats();
        renderPlatforms();
        renderEquipment();
        renderDatasets();
        renderHospitalMap();
        renderHospitalSidebar();
        renderPartnerMetrics();
        renderMarquee();
        setupLangToggle();
        setupHeader();
        setupHamburger();
        setupSmoothScroll();
        setupScrollReveal();
    }

    /* ================================================ */
    /*  STORE ZH ORIGINALS FOR SWITCHING BACK           */
    /* ================================================ */
    function storeOriginals() {
        var els = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < els.length; i++) {
            var key = els[i].getAttribute("data-i18n");
            zhOriginals[key] = els[i].innerHTML;
        }
        var cards = document.querySelectorAll("[data-i18n-title]");
        for (var j = 0; j < cards.length; j++) {
            var tkey = cards[j].getAttribute("data-i18n-title");
            var bkey = cards[j].getAttribute("data-i18n-body");
            var h3 = cards[j].querySelector("h3");
            var p = cards[j].querySelector("p");
            if (h3) zhOriginals[tkey] = h3.innerHTML;
            if (p) zhOriginals[bkey] = p.innerHTML;
        }
    }

    /* ================================================ */
    /*  LANGUAGE SWITCHING                              */
    /* ================================================ */
    function setupLangToggle() {
        var toggle = document.getElementById("lang-toggle");
        if (!toggle) return;
        toggle.addEventListener("click", function (e) {
            var btn = e.target.closest("button[data-lang]");
            if (!btn) return;
            var lang = btn.getAttribute("data-lang");
            if (lang === currentLang) return;
            currentLang = lang;
            var btns = toggle.querySelectorAll("button");
            for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
            btn.classList.add("active");
            document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
            applyLanguage(lang);
        });
    }

    function applyLanguage(lang) {
        var trans = i18n.en;

        var els = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < els.length; i++) {
            var key = els[i].getAttribute("data-i18n");
            if (lang === "en" && trans[key] !== undefined) {
                els[i].innerHTML = trans[key];
            } else if (lang === "zh" && zhOriginals[key] !== undefined) {
                els[i].innerHTML = zhOriginals[key];
            }
        }

        var cards = document.querySelectorAll("[data-i18n-title]");
        for (var j = 0; j < cards.length; j++) {
            var tkey = cards[j].getAttribute("data-i18n-title");
            var bkey = cards[j].getAttribute("data-i18n-body");
            var h3 = cards[j].querySelector("h3");
            var p = cards[j].querySelector("p");
            if (lang === "en") {
                if (h3 && trans[tkey]) h3.innerHTML = trans[tkey];
                if (p && trans[bkey]) p.innerHTML = trans[bkey];
            } else {
                if (h3 && zhOriginals[tkey]) h3.innerHTML = zhOriginals[tkey];
                if (p && zhOriginals[bkey]) p.innerHTML = zhOriginals[bkey];
            }
        }

        renderHeroStats();
        renderPlatforms();
        renderEquipment();
        renderDatasets();
        renderHospitalMap();
        renderHospitalSidebar();
        renderPartnerMetrics();
        renderMarquee();

        document.title = lang === "en"
            ? "Qichuang Era | Medical Biotech Integrated Services"
            : "奇创纪元 | 医疗生物科技一体化服务";
    }

    /* ================================================ */
    /*  HERO STATS                                      */
    /* ================================================ */
    function renderHeroStats() {
        var container = document.getElementById("hero-stats");
        if (!container) return;
        var data = heroStats[currentLang];
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += '<div class="hero-stat reveal">';
            html += '<span class="hero-stat-order">' + String(i + 1).padStart(2, "0") + '</span>';
            html += '<span class="hero-stat-value">' + data[i].value + '</span>';
            html += '<span class="hero-stat-label">' + data[i].label + '</span>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    /* ================================================ */
    /*  PLATFORMS                                        */
    /* ================================================ */
    function renderPlatforms() {
        var container = document.getElementById("platforms-grid");
        if (!container) return;
        var data = platforms[currentLang];
        var html = "";
        var modulesLabel = currentLang === "en" ? "Modules" : "模块数";
        for (var i = 0; i < data.length; i++) {
            var p = data[i];
            var hasImg = p.img ? " has-img" : "";
            html += '<article class="platform-card reveal' + hasImg + '">';
            if (p.img) {
                html += '<div class="p-img-wrap"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>';
            }
            html += '<div class="platform-copy">';
            html += '<div class="platform-card-head">';
            html += '<span class="p-index">' + String(i + 1).padStart(2, "0") + '</span>';
            html += '<p class="p-subtitle">' + p.subtitle + '</p>';
            html += '</div>';
            html += '<div class="p-icon">' + p.icon + '</div>';
            html += '<h3>' + p.name + '</h3>';
            html += '<p class="p-desc">' + p.desc + '</p>';
            html += '<div class="platform-tags">';
            for (var j = 0; j < p.tags.length; j++) {
                html += '<span class="platform-tag">' + p.tags[j] + '</span>';
            }
            html += '</div>';
            html += '<div class="platform-foot"><span class="platform-foot-label">' + modulesLabel + '</span><strong>' + p.tags.length + '</strong></div>';
            html += '</div></article>';
        }
        container.innerHTML = html;
    }

    function renderEquipment() {
        var container = document.getElementById("equipment-grid");
        if (!container) return;
        var html = "";
        for (var i = 0; i < equipmentData.length; i++) {
            var e = equipmentData[i];
            var cls = "equip-card reveal";
            if (e.wide) cls += " equip-wide";
            if (e.tall) cls += " equip-tall";
            var caption = currentLang === "en" ? e.en : e.zh;
            html += '<div class="' + cls + '">';
            html += '<div class="equip-img-wrap"><img class="equip-img" src="' + e.img + '" alt="' + caption + '" loading="lazy"></div>';
            html += '<div class="equip-overlay">';
            html += '<span class="equip-index">' + String(i + 1).padStart(2, "0") + '</span>';
            html += '<div class="equip-caption">' + caption + '</div>';
            html += '</div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    /* ================================================ */
    /*  DATASETS                                        */
    /* ================================================ */
    function renderDatasets() {
        var container = document.getElementById("dataset-grid");
        if (!container) return;
        var data = currentLang === "en" ? datasetsEN : datasetsZH;
        var html = "";
        var assetLabel = currentLang === "en" ? "Research Asset" : "研究资产";
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var extra = i === 0 ? " feature-primary" : (i === 1 ? " feature-secondary" : "");
            html += '<article class="dataset-card reveal' + extra + '">';
            html += '<div class="dataset-card-head"><span class="ds-code">DS-' + String(i + 1).padStart(2, "0") + '</span><span class="ds-track">' + assetLabel + '</span></div>';
            html += '<h3 class="ds-name">' + d.name + '</h3>';
            html += '<p class="ds-tagline">' + d.tagline + '</p>';
            html += '<p class="ds-summary">' + d.summary + '</p>';
            html += '<div class="ds-stats">';
            for (var j = 0; j < d.stats.length; j++) {
                html += '<div class="ds-stat">';
                html += '<div class="ds-stat-value">' + d.stats[j].v + '</div>';
                html += '<div class="ds-stat-label">' + d.stats[j].l + '</div>';
                html += '</div>';
            }
            html += '</div></article>';
        }
        container.innerHTML = html;
    }

    /* ================================================ */
    /*  HOSPITAL MAP                                    */
    /* ================================================ */
    var MAP_SVG_NS = "http://www.w3.org/2000/svg";
    var MAP_VIEWBOX = { width: 1000, height: 738 };

    /*
     * cn.svg contains three latitude/longitude calibration anchors. A least-squares
     * fit of those anchors yields this spherical Mercator projection in SVG units.
     * Keeping projection and markers in the same viewBox makes resizing lossless.
     */
    var MAP_PROJECTION = {
        xScale: 851.7922837322691,
        xOffset: -1048.0940462637232,
        yScale: -851.8097364908117,
        yOffset: 979.3537761260916
    };

    var MAP_CALIBRATION_POINTS = [
        { lng: 76.61527863994039, lat: 19.92982175903537, x: 90.9, y: 676.9 },
        { lng: 107.19106542370625, lat: 34.077839393563956, x: 545.5, y: 439.9 },
        { lng: 131.65169485071894, lat: 51.762861436724705, x: 909.1, y: 76.9 }
    ];

    function projectCityCoordinate(lng, lat) {
        if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
            throw new TypeError("Map coordinates must be finite longitude/latitude values.");
        }
        if (lng < -180 || lng > 180 || lat <= -85 || lat >= 85) {
            throw new RangeError("Map coordinates fall outside the supported Mercator range.");
        }

        var radians = Math.PI / 180;
        var mercatorY = Math.log(Math.tan(Math.PI / 4 + lat * radians / 2));
        return {
            x: MAP_PROJECTION.xScale * lng * radians + MAP_PROJECTION.xOffset,
            y: MAP_PROJECTION.yScale * mercatorY + MAP_PROJECTION.yOffset
        };
    }

    function validateMapProjection() {
        for (var i = 0; i < MAP_CALIBRATION_POINTS.length; i++) {
            var anchor = MAP_CALIBRATION_POINTS[i];
            var projected = projectCityCoordinate(anchor.lng, anchor.lat);
            if (Math.abs(projected.x - anchor.x) > 0.05 || Math.abs(projected.y - anchor.y) > 0.05) {
                console.error("China map projection calibration failed at anchor", anchor);
                return false;
            }
        }
        return true;
    }

    function createMapSvgElement(tagName, className, attributes) {
        var element = document.createElementNS(MAP_SVG_NS, tagName);
        if (className) element.setAttribute("class", className);
        if (attributes) {
            var names = Object.keys(attributes);
            for (var i = 0; i < names.length; i++) {
                element.setAttribute(names[i], attributes[names[i]]);
            }
        }
        return element;
    }

    function renderHospitalMap() {
        var container = document.getElementById("map-markers");
        if (!container) return;
        var data = currentLang === "en" ? hospitalsEN : hospitalsZH;

        container.textContent = "";
        container.setAttribute("data-city-count", String(data.length));
        if (!validateMapProjection()) return;

        var mapDescription = document.getElementById("china-map-desc");
        if (mapDescription) {
            mapDescription.textContent = currentLang === "en"
                ? "Partner city nodes projected from WGS84 city-centre coordinates onto the China map."
                : "合作城市节点根据 WGS84 城市中心经纬度投影到中国地图。";
        }

        for (var i = 0; i < data.length; i++) {
            var h = data[i];
            var coordinate = cityCoordinates[h.id];
            if (!coordinate) {
                console.error("Missing city coordinate for", h.id);
                continue;
            }

            var point = projectCityCoordinate(coordinate.lng, coordinate.lat);
            if (point.x < 0 || point.x > MAP_VIEWBOX.width || point.y < 0 || point.y > MAP_VIEWBOX.height) {
                console.error("Projected city falls outside the China map viewBox", h.id, point);
                continue;
            }
            var institutionLabel = currentLang === "en"
                ? h.institutions.length + (h.institutions.length === 1 ? " institution" : " institutions")
                : h.institutions.length + " 家合作机构";
            var markerLabel = h.city + " · " + institutionLabel;

            var marker = createMapSvgElement("g", "map-marker", {
                transform: "translate(" + point.x.toFixed(3) + " " + point.y.toFixed(3) + ")",
                tabindex: "0",
                role: "img",
                "aria-label": markerLabel,
                "data-city-id": h.id,
                "data-lng": coordinate.lng,
                "data-lat": coordinate.lat,
                "data-svg-x": point.x.toFixed(3),
                "data-svg-y": point.y.toFixed(3)
            });

            var title = createMapSvgElement("title");
            title.textContent = markerLabel;
            marker.appendChild(title);
            marker.appendChild(createMapSvgElement("circle", "map-marker-hit", { r: "22" }));
            marker.appendChild(createMapSvgElement("circle", "map-marker-pulse", { r: "10" }));
            marker.appendChild(createMapSvgElement("circle", "map-marker-dot", { r: "10" }));

            var label = createMapSvgElement("g", "map-marker-label");
            label.appendChild(createMapSvgElement("rect", "map-marker-label-bg", {
                x: "-88", y: "-51", width: "176", height: "32", rx: "16"
            }));
            var labelText = createMapSvgElement("text", "map-marker-label-text", { x: "0", y: "-35" });
            labelText.textContent = markerLabel;
            label.appendChild(labelText);
            marker.appendChild(label);

            if (debugMapEnabled) {
                var debugLabel = createMapSvgElement("text", "map-debug-label", { x: "16", y: "5" });
                debugLabel.textContent = h.city;
                marker.appendChild(debugLabel);
            }

            container.appendChild(marker);
        }
    }

    /* ================================================ */
    /*  HOSPITAL SIDEBAR                                */
    /* ================================================ */
    function renderHospitalSidebar() {
        var container = document.getElementById("hospital-sidebar");
        if (!container) return;
        var data = currentLang === "en" ? hospitalsEN : hospitalsZH;

        var regions = {};
        for (var i = 0; i < data.length; i++) {
            var r = data[i].region;
            if (!regions[r]) regions[r] = [];
            regions[r].push(data[i]);
        }

        var html = "";
        var regionOrder = Object.keys(regions);
        for (var k = 0; k < regionOrder.length; k++) {
            var rname = regionOrder[k];
            var cities = regions[rname];
            var total = 0;
            for (var c = 0; c < cities.length; c++) total += cities[c].institutions.length;

            html += '<div class="hospital-region-card">';
            html += '<div class="hospital-region-head">';
            html += '<h4>' + rname + ' <span class="region-badge">' + total + (currentLang === "en" ? " inst." : " 家") + '</span></h4>';
            html += '<p>' + cities.length + (currentLang === "en" ? " linked cities" : " 个协作城市") + '</p>';
            html += '</div>';
            for (var ci = 0; ci < cities.length; ci++) {
                html += '<div class="hospital-city">';
                html += '<div class="hospital-city-head"><span class="hospital-city-name">' + cities[ci].city + '</span><span class="hospital-city-count">' + cities[ci].institutions.length + '</span></div>';
                html += '<ul>';
                for (var ii = 0; ii < cities[ci].institutions.length; ii++) {
                    html += '<li>' + cities[ci].institutions[ii] + '</li>';
                }
                html += '</ul></div>';
            }
            html += '</div>';
        }
        container.innerHTML = html;
    }

    /* ================================================ */
    /*  PARTNER METRICS                                 */
    /* ================================================ */
    function renderPartnerMetrics() {
        var container = document.getElementById("partners-metrics");
        if (!container) return;
        var data = currentLang === "en"
            ? [
                { v: universities.length, l: "Institutions Shown" },
                { v: "3", l: "Global Regions" },
                { v: "MD / PhD", l: "Research Backgrounds" }
            ]
            : [
                { v: universities.length, l: "展示院校与机构" },
                { v: "3", l: "全球协作区域" },
                { v: "硕博团队", l: "研究背景结构" }
            ];

        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += '<article class="partner-metric reveal">';
            html += '<span class="partner-metric-index">' + String(i + 1).padStart(2, "0") + '</span>';
            html += '<strong class="partner-metric-value">' + data[i].v + '</strong>';
            html += '<p class="partner-metric-label">' + data[i].l + '</p>';
            html += '</article>';
        }
        container.innerHTML = html;
    }

    /* ================================================ */
    /*  MARQUEE                                         */
    /* ================================================ */
    function renderMarquee() {
        var track = document.getElementById("marquee-track");
        if (!track) return;
        var html = "";
        for (var dup = 0; dup < 2; dup++) {
            for (var i = 0; i < universities.length; i++) {
                var u = universities[i];
                var label = currentLang === "en" ? u.en : u.zh;
                html += '<div class="marquee-item">';
                html += '<div class="marquee-logo-wrap"><img src="university_logos/' + u.logo + '" alt="' + label + '" loading="lazy"></div>';
                html += '<span>' + label + '</span>';
                html += '</div>';
            }
        }
        track.innerHTML = html;
    }

    /* ================================================ */
    /*  HEADER SCROLL BEHAVIOR                          */
    /* ================================================ */
    function setupHeader() {
        var header = document.getElementById("header");
        if (!header) return;
        var last = 0;
        window.addEventListener("scroll", function () {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
            last = st;
        }, { passive: true });
    }

    /* ================================================ */
    /*  HAMBURGER MENU                                  */
    /* ================================================ */
    function setupHamburger() {
        var btn = document.getElementById("hamburger");
        var nav = document.getElementById("main-nav");
        if (!btn || !nav) return;
        btn.addEventListener("click", function () {
            btn.classList.toggle("open");
            nav.classList.toggle("open");
        });
        nav.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                btn.classList.remove("open");
                nav.classList.remove("open");
            }
        });
    }

    /* ================================================ */
    /*  SMOOTH SCROLL                                   */
    /* ================================================ */
    function setupSmoothScroll() {
        document.addEventListener("click", function (e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) return;
            var targetId = link.getAttribute("href").slice(1);
            var target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    /* ================================================ */
    /*  SCROLL REVEAL (Intersection Observer)           */
    /* ================================================ */
    function setupScrollReveal() {
        if (!("IntersectionObserver" in window)) {
            var all = document.querySelectorAll(".reveal");
            for (var i = 0; i < all.length; i++) all[i].classList.add("visible");
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add("visible");
                }
            }
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        function observe() {
            var els = document.querySelectorAll(".reveal:not(.visible)");
            for (var j = 0; j < els.length; j++) observer.observe(els[j]);
        }

        observe();

        var mo = new MutationObserver(function () {
            observe();
        });
        mo.observe(document.body, { childList: true, subtree: true });
    }

    /* ================================================ */
    /*  BOOT                                            */
    /* ================================================ */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
