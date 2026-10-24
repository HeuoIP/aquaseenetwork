import type { ServiceDetail } from '@/content/types';

/**
 * 三项能力 —— 中文。
 *
 * 术语严格锁定在 `src/content/termbase.ts`：能力名称、定位表述与方法
 * 词汇在所有语言中必须一致，否则它们就不再是同一个业务。
 */
export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'strategy',
    definition:
      'AQUASEE 前期策划咨询是项目的前端：把一个构想变成明确的范围、有成本依据的计划、可执行的工期，以及一组真正能把它建起来的伙伴。它既是咨询，也是亲自动手的工作，并会延续到设计与交付阶段，而不是交一份文件就结束。',
    notIncluded: [
      '法律、规划或建管部门的审批——我们准备技术依据，由当地顾问签字',
      '结构或电气工程的认证——我们聘请有资质的工程师，并对他们按任务书问责',
      '面向终端消费者的商业市场调研',
      '融资、投资或财务模型',
    ],
    costDrivers: [
      '任务书中有多少已经定案——范围已共识的成本低于范围开放的成本',
      '需要协调的相关方数量',
      '目标市场的现场与法规复杂度',
      '随着设计推进，策略需要被重新验证的比例',
    ],
    faq: [
      {
        pillar: 'strategy',
        q: '在和供应商谈之前，花钱做咨询值得吗？',
        a: '只要范围还不稳定，就值得。相对工厂报价，咨询很贵；相对把东西做错，它很便宜。通常有三个触发点：任务书还只是一个构想而不是规格；几家供应商基于不同假设分别报价；或者项目存在现场、审批或工期方面的限制条件，不先解决就会让所有报价失效。',
      },
      {
        pillar: 'strategy',
        q: '能否基于已有的设计或报价做审查，而不是从头开始？',
        a: '可以，而且这往往是最高效的切入方式。我们对照目标、标准、现场与商业现实，审查已有的东西——一套设计文件、一份招标文件、一组供应商报价——并说明哪些站得住、哪些缺失、补齐需要多少代价。这项审查本身就是完整成果，你没有义务继续进入交付。',
      },
      {
        pillar: 'strategy',
        q: '设计完成之后，你们还会继续参与吗？',
        a: '这正是重点所在。只交一份文件就结束的策略，往往会被供应链实际能做到什么、能报什么价所推翻。我们会持续参与设计深化、伙伴选择、生产与安装，因为写在前端的假设，恰恰是最后失效的那些。如果客户只需要前端，我们也会把它作为独立且有依据的工作交付。',
      },
    ],
    href: '/strategy',
    index: '01',
    eyebrow: '前期策划咨询',
    title: '前期策划咨询',
    lede: '在任何东西被设计之前，先把该问的问题问对。',
    intro:
      '多数项目不是倒在创意上，而是倒在没人检查过的那部分：范围从没钉死、假设从没验证、供应链从没真正搭起来。我们先接的就是这部分——趁决策还来得及做好。',
    paragraphs: [
      '我们批判性地读任务书：你真正想做什么、为谁而做、在商业上必须成立的是什么，以及哪些限制条件会决定结果。再由此塑造出设计、工程与采购都能据此行动的项目。',
      '建议不会停在一份演示文稿上。它与设计和交付保持连接，因为假设正是在那里被验证或推翻。',
    ],
    capabilities: [
      {
        title: '任务书与项目定义',
        description: '把愿景转写成结构化的任务书，明确目标、受众、限制条件与决策节点。',
      },
      {
        title: '可行性与现场准备度',
        description: '对照预期范围，审查现场条件、当地法规、物流与基础设施条件。',
      },
      {
        title: '概念框架',
        description: '在进入深化设计之前，确立项目的组织性构想、体验叙事与优先级层次。',
      },
      {
        title: '工期与阶段划分',
        description: '安排工程节奏，让早期决策、审批与长周期物料在不妨碍整体推进的前提下先行解决。',
      },
      {
        title: '范围与成本规划',
        description: '建立随着设计演进仍然可用的成本计划与范围矩阵，假设与预备费写明在案。',
      },
      {
        title: '伙伴策略',
        description: '选择并下达任务书给合适的设计、工程与生产伙伴，让他们对齐同一份任务书。',
      },
    ],
    deliverables: [
      '结构化的项目任务书',
      '可行性与风险清单',
      '概念框架与体验叙事',
      '工期与阶段划分计划',
      '范围、成本计划与假设记录',
      '伙伴推荐与任务书文件包',
    ],
    engagement: [
      { phase: '诊断', description: '追问任务书、现场，以及它背后的商业现实。' },
      { phase: '定义', description: '把意图转化为一致认可的范围、框架与约束条件。' },
      { phase: '计划', description: '安排工期节奏、核算成本，并选择交付路径。' },
      { phase: '对齐', description: '向伙伴下达任务书，及早化解冲突，并把概念贯彻到交付。' },
    ],
    bestFor: [
      '正在筹备第一个海外项目的开发商',
      '为特殊或定制构件寻找交付伙伴的设计机构',
      '采购的是一种体验而非一件产品的运营方',
      '范围增长快于计划的团队',
    ],
    gallery: [
      {
        after: 'overview',
        src: '/images/gallery/strategy-site.webp',
        kind: 'illustration',
        alt: '黄昏时分的河畔空地：草地、一排行道树与一条被踩出来的小路，前景里拿着一份测绘图。',
      },
      {
        after: 'activities',
        src: '/images/gallery/strategy-stages.webp',
        kind: 'illustration',
        alt: '工作室墙上的概念图纸：一张分区气泡图、一张分区平面和一张主题乐园的效果图。',
      },
      {
        after: 'overview',
        src: '/images/gallery/strategy-concept.webp',
        kind: 'illustration',
        alt: '亲子文旅目的地的俯视概念效果图，河边有戏水区、遮荫座椅、曲折步道与种植。',
      },
      {
        after: 'activities',
        src: '/images/gallery/strategy-planning.webp',
        kind: 'illustration',
        alt: '规划桌上的大幅总平面打印图、实体模型，以及显示体块模型的笔记本电脑。',
      },
    ],
    visual: {
      kind: 'image',
      src: '/images/hero/strategy-plan.webp',
      alt: '我们自己手绘的营地概念总平面：游乐区、种植，以及两者之间的流线。',
    },

    visualCaption: '概念总平面——前期规划',
    mobilePosition: '52%',
    illustration: {
      src: '/images/service/strategy-consulting-v2.webp',
      alt: '铺在桌面上的主题乐园概念总平面打印图：游乐、水、种植与路线的分区着色，附比例尺与指北针。',
      caption: '概念总平面（示意）——一个目的地是怎么被规划的',
    },


    related: [
      { href: '/creative-design', label: '创意设计与研发' },
      { href: '/supply-chain', label: '供应链与交付' },
    ],
  },
  {
    slug: 'creative-design',
    definition:
      'AQUASEE 创意设计与研发把一个已经达成共识的想法，变成可建、可报价、可维护的东西：概念、设计语言、可施工的图纸、书面技术规格、在风险值得时做出的原型，以及让成品经得起制造商与现场考验的工程协调。',
    notIncluded: [
      '所设计物件的生产——这属于我们的供应链与交付能力',
      '由当地认可的检验机构对结构出具的认证',
      '品牌识别、命名或营销campaign',
      '周边场地的景观、建筑或室内设计',
    ],
    costDrivers: [
      '设计中定制部分与基于成熟平台改造部分的比例',
      '材料规格与表面处理——滨海与海洋级暴露会显著改变成本',
      '工装：每一套新模具、夹具或加工方法都是一次性成本',
      '工程工时，包括结构、电气与控制系统设计',
      '原型与测试，以及使用场景是否要求承载或安全测试',
      '需要协调的专业数量——结构、排水、供电、控制与安全',
    ],
    faq: [
      {
        pillar: 'creative-design',
        q: '你们如何让一个概念从“好看”变成“能造”？',
        a: '可施工性是一个文件问题，不是审美问题。每一个构件都要落到尺寸、材料、表面处理、连接方式与公差，并对照它将被如何制造、运输、安装和维护来检查。如果某个构件无法按图生产，我们会尽早说明并给出替代方案及其后果，而不是等到报价阶段才发现。',
      },
      {
        pillar: 'creative-design',
        q: '能否与我们已有的建筑师或景观设计师的设计配合？',
        a: '可以。我们承接设计意图并把它变成可施工的：解决与结构、排水、供电、照明的接口问题，产出制造商可以直接据此报价的文件，并对照运营方的真实使用方式检验方案，包括清洁、维护与开放时间。同时我们会指出概念在既定材料或工艺下无法实现的地方，并给出替代方案与代价。',
      },
      {
        pillar: 'creative-design',
        q: '你们的设计依据哪些安全标准？',
        a: '我们依据设备实际运行所在地的标准，而不是某个统一默认值。在欧洲、海湾地区与亚洲大部分地区，通常是游乐设备的 EN 1176 系列与关于夹伤与冲击的 ISO 13857；在北美则是 ASTM F1487 与 ASTM F1951。公共空间与定制装置项目还要满足当地的建筑、无障碍与消防要求。我们会在规格书中写明条款编号，并安排检测。',
      },
    ],
    href: '/creative-design',
    index: '02',
    eyebrow: '创意设计与研发',
    title: '创意设计与研发',
    lede: '只有当设计能被制造、被运输、被维护时，它才算完成。',
    intro:
      '我们负责你项目里的创意与技术层：概念、空间语言、细部、物件与氛围。所有东西都以可维护为前提——今天有辨识度的东西，十年后还得能制造、能运输、能维护。',
    paragraphs: [
      '设计思维和工程现实，放在一起。概念会被画出来、建模、核算成本并尽早接受质疑，让昂贵的意外出现在纸面上，而不是出现在现场。',
      '当项目需要定制构件——一个装置、一组游乐结构、一件装置艺术、一段室内空间——我们会与合格的伙伴一起研究材料与生产路径，并在必要时先做出实体原型，再决定是否投入生产。',
    ],
    capabilities: [
      {
        title: '概念与空间设计',
        description: '基于已确认的策略，发展空间概念、动线、氛围与体验节奏。',
      },
      {
        title: '定制产品与构件设计',
        description: '设计承载项目识别度的定制构件，从一件木作到整套装置。',
      },
      {
        title: '三维建模与可视化',
        description: '产出用于决策、报批与制作的准确模型、平面布局与渲染图。',
      },
      {
        title: '材料与工艺研究',
        description: '对照项目的真实使用方式与气候，测试耐久性、触感、老化与维护表现。',
      },
      {
        title: '原型与测试',
        description: '制作实体或等比模型，在量产之前验证比例、结构、灯光或使用体验。',
      },
      {
        title: '技术文件',
        description: '产出图纸、材料表与规格文件包，让制造商有明确无歧义的东西可依。',
      },
    ],
    deliverables: [
      '设计概念与设计语言',
      '空间布局与技术图纸',
      '三维模型与渲染图',
      '材料与表面处理表',
      '原型或等比模型研究',
      '可直接用于生产的规格文件包',
    ],
    engagement: [
      { phase: '解读', description: '把策略转译为设计语言与第一个空间命题。' },
      { phase: '深化', description: '打磨概念与细部，同时进行建模、测试与成本核算。' },
      { phase: '原型', description: '在风险值得的地方，用实物验证最难的部分。' },
      { phase: '定稿', description: '收口规格文件，让生产环节不再有需要自行解释的余地。' },
    ],
    bestFor: [
      '具有鲜明空间或体验识别度的项目',
      '希望找到既能设计也能交付的设计伙伴的开发商',
      '需要目录里买不到的定制构件的团队',
      '正在升级既有环境的运营方',
    ],
    gallery: [
      {
        after: 'overview',
        src: '/images/gallery/design-sketch.webp',
        kind: 'work',
        alt: '一件游乐结构的手绘汇报稿，带滑梯与攀爬架，并画了人作为尺度参照。',
      },
      {
        after: 'activities',
        src: '/images/gallery/design-render.webp',
        kind: 'work',
        alt: '一处游乐区的俯视效果图：滑梯、沙地铺装、种植与木质攀爬架。',
      },
      {
        after: 'overview',
        src: '/images/gallery/design-swan.webp',
        kind: 'work',
        alt: '天鹅造型游乐构筑物的线稿，含滑梯与攀爬网，水绿色线条画在深色底上。',
      },
      {
        after: 'overview',
        src: '/images/gallery/design-bird.webp',
        kind: 'work',
        alt: '手绘概念草图：种植景观中一只大型粉色鸟形雕塑，带滑梯与木质攀爬构件。',
      },
      {
        after: 'activities',
        src: '/images/gallery/design-capybara.webp',
        kind: 'work',
        alt: '水豚主题游乐场的插画，配一条色板与公园中已建成设备的实拍照片。',
      },
      {
        after: 'cost',
        src: '/images/gallery/design-equipment.webp',
        kind: 'work',
        alt: '木质游乐结构的概念草图，配公园中已安装完成的设备实拍照片。',
      },
    ],
    visual: {
      kind: 'image',
      src: '/images/hero/design-sculpture.webp',
      alt: '一件鲸鱼造型游乐雕塑的手绘概念草图，带滑梯、攀爬网与波浪形构件。',
    },

    visualCaption: '概念草图——雕塑化的游乐构筑物',
    mobilePosition: '72%',
    illustration: {
      src: '/images/service/creative-design.webp',
      alt: '幼儿园院子里的屋顶游乐环境：滑梯、木质游乐构件与黄色攀爬坡。',
      caption: '游乐环境——由我们设计与渲染',
    },

    related: [
      { href: '/strategy', label: '前期策划咨询' },
      { href: '/supply-chain', label: '供应链与交付' },
    ],
  },
  {
    slug: 'supply-chain',
    definition:
      'AQUASEE 供应链与交付负责把设计变成实体资产：选择并签订合格的生产合作伙伴合同、在生产过程中管控品质、统筹物流与清关、围绕场地现实完成现场安装，并由一个能负责到底的主体交付一份有完整文件、可维护的成果。',
    notIncluded: [
      '拥有或运营制造产能——生产由合格伙伴按我们的任务书与检验标准完成',
      '交付后的无限次修改——变更按受控变更处理，并明确代价',
      '以经销价供应标准目录产品',
      '当客户自有现场团队负责安装时，当地施工人工的供应',
    ],
    costDrivers: [
      '定制开发与基于平台改造的比例，以及是否需要新工装',
      '材料与表面处理规格，包括海洋级与滨海暴露条件',
      '工程与文件编制的工时',
      '原型、等比模型与测试',
      '按体积与重量计算的运费、包装，以及清关归类与关税',
      '现场条件——进场、作业时间、开放时间，以及非营业时间的安装',
      '调试、培训、文件与支持期的长短',
    ],
    faq: [
      {
        pillar: 'supply-chain',
        q: '你们为所合作的工厂品质做担保吗？',
        a: '我们担保的是结果，这比替伙伴背书更硬。我们按明确的资质审查标准挑选伙伴，用同一份书面规格向他们下达任务书，在约定节点检验，并留存记录。如果出了问题，那是我们要解决的问题，而不是一场“到底是谁的分包商”的争论。我们不替别人的工厂担保；我们确保成果由我们负责。',
      },
      {
        pillar: 'supply-chain',
        q: '安装之后才发现的品质问题，你们怎么处理？',
        a: '安装后发现的问题，走与其他所有环节一样的证据链：规格书、检验记录、变更记录与移交文件。属于我们的缺陷，我们整改；属于误用、第三方承包商的施工，或超出约定使用条件的运行情况，我们会直说，同时仍然协助解决。交付文件包的存在，正是为了让这场对话里有事实可依。',
      },
      {
        pillar: 'supply-chain',
        q: '如果我们已经有自己的制造商，你们还能做交付吗？',
        a: '可以。当制造商已经通过资质审查、也已经理解这项工作时，这是合理的安排。此时我们的角色是规格纪律、文件、检验与物流——确保正在制造的东西与达成共识的内容一致，并让现场收到完整、有文件可查的成果。我们愿意这样合作；只是我们不会假装自己能带来并不存在的价值。',
      },
    ],
    href: '/supply-chain',
    index: '03',
    eyebrow: '供应链与交付',
    title: '供应链与交付',
    lede: '造出来是一件事，落到你的场地上是另一件。我们带来让定制产品变得可制造的那套经验——然后由你决定其中多少自己做。',
    intro:
      '工厂报价覆盖的是生产。我们带来的是生产周围的那一圈：多年拆解定制产品的经验、对每个部件如何被制造的理解，以及把这份知识重新组织成可被制造的状态——由我们、由伙伴，或由你。',
    paragraphs: [
      '多年来我们为景观、游乐与酒店度假项目做规格、采购、拆解与交付。这份工作产生了一种特定的知识：复杂物件如何拆成模块，哪些模块值得自制，其余部分应该怎么买。',
      '我们把这份知识作为一组选项交给你。产品可以整件交付、可以以套件形式由你的团队自行组装，也可以以半成品模块的形式交给你自己的团队完成。每条路径都对照同一份规格核算成本，由你选择。',
    ],
    capabilities: [
      {
        title: '产品拆解与模块设计',
        description: '把定制物件拆成可以各自规格化、定价、制造与组装的模块。',
      },
      {
        title: '自制—外购—组装选项建模',
        description: '对照同一份规格，比较整件供货、客户自行组装套件与半成品模块供货三条路径的成本。',
      },
      {
        title: '供应商资质审查与比选',
        description: '按技术、产能与商务标准识别、评估并筛选合作伙伴。',
      },
      {
        title: '生产管理与进度管控',
        description: '跨一家或多家生产合作伙伴进行排期、进度控制与问题上报。',
      },
      {
        title: '品质检验与出货前验证',
        description: '按双方约定的规格进行过程检验、样品评审与出货前验证。',
      },
      {
        title: '组装支持与移交',
        description: '提供文件、组装指导与现场支持，让客户侧的制作顺利推进。',
      },
    ],
    deliverables: [
      '产品拆解报告',
      '模块规格与图纸',
      '组装套件与半成品包定义',
      '含成本的自制—外购—组装选项矩阵',
      '合格供应商候选名单',
      '生产排期与品质记录',
      '组装手册与交付文件包',
    ],
    engagement: [
      { phase: '诊断', description: '读懂产品、任务书与预算，弄清到底是什么在驱动成本。' },
      { phase: '拆解', description: '把产品拆成模块；识别哪些是关键的、哪些是通用的、哪些应该由客户自制。' },
      { phase: '比选', description: '对照同一份规格核算三条交付路径的成本，并给出推荐。' },
      { phase: '交付', description: '管理生产、检验与发运；在客户自行组装时提供移交与支持。' },
    ],
    bestFor: [
      '希望在不降低品质的前提下压低成本的客户',
      '拥有自有加工团队或现场工坊的客户',
      '供应商报价过高的定制产品',
      '希望自己掌握部分生产的项目',
      '希望拥有一条自己看得懂、控得住的供应链的团队',
    ],
    gallery: [
      {
        after: 'overview',
        src: '/images/gallery/supply-laser.webp',
        kind: 'illustration',
        alt: '激光切割头在钢板上一条弧形轮廓，切口处火花四溅。',
      },
      {
        after: 'overview',
        src: '/images/gallery/supply-cutting.webp',
        kind: 'illustration',
        alt: '木工车间里数控雕刻机切割层压木板上的弧形构件，切好的板材堆在一旁。',
      },
      {
        after: 'activities',
        src: '/images/gallery/supply-drilling.webp',
        kind: 'illustration',
        alt: '钻床在弧形钢制连接板上钻一排孔，四周是卷曲的金属屑。',
      },
      {
        after: 'activities',
        src: '/images/gallery/supply-welding.webp',
        kind: 'illustration',
        alt: '戴防护面罩的焊工在大型定制游乐架上焊接钢制节点，火花与弧光四起。',
      },
      {
        after: 'cost',
        src: '/images/gallery/supply-assembly.webp',
        kind: 'illustration',
        alt: '两名工人在车间里组装弧形的木质与钢制游乐构件。',
      },
      {
        after: 'cost',
        src: '/images/gallery/supply-transport.webp',
        kind: 'illustration',
        alt: '黎明时分，长平板车载着包裹好的大型钢制与木质游乐构件行驶在公路上。',
      },
    ],
    visual: {
      kind: 'image',
      src: '/images/hero/supply-fabrication.webp',
      alt: '一件装置的拆解技术图：基础、结构、表皮板与膜材，分解为可制造的部件。',
    },

    visualCaption: '制作拆解——抵达现场之前的那些部件',
    mobilePosition: '52%',
    illustration: {
      src: '/images/service/supply-delivery.webp',
      alt: '完工的游乐结构裹上防护泡棉、绑在木托架上，准备出厂。',
      caption: '打包完毕，准备发运（示意）',
    },

    related: [
      { href: '/strategy', label: '前期策划咨询' },
      { href: '/creative-design', label: '创意设计与研发' },
    ],
  },
];

export function getService(slug: string): ServiceDetail {
  const found = serviceDetails.find((service) => service.slug === slug);
  if (!found) {
    throw new Error(`Unknown service slug: "${slug}". Add it to serviceDetails.`);
  }
  return found;
}