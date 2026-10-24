import type { StudyVisualData } from '@/components/art/StudyVisual';
import type { ProjectMaterial } from '@/content/types';

/**
 * 能力研究 —— 中文。
 *
 * 重要：AQUASEE 尚未获得已交付客户项目的对外发布授权，本站也没有展示任何
 * 已完成项目。每一条都是示意性的“能力研究”，并在界面上明确标注。获得授权
 * 的项目照片与名称，将在届时补充并标注为真实完成项目。
 *
 * 所有配图均为生成的概念渲染图，用于传达设计意图，不是交付成果的照片。
 */
export type ProjectStudy = {
  slug: string;
  title: string;
  discipline: string;
  category: string;
  scale: string;
  summary: string;
  scope: string[];
  outcome: string;
  disclosure: string;
  visual: StudyVisualData;
  featured?: boolean;
};

export const materials: ProjectMaterial[] = [
  {
    slug: 'dongyuan-rooftop',
    title: '东源幼儿园屋顶游乐场',
    discipline: '创意设计',
    stage: '设计效果',
    description:
      '幼儿园屋顶的游乐环境：软质地面、攀爬塔与管状滑梯、木质游乐边界与种植平台，环绕建筑布置，而不是贴在建筑旁边。',
    image: {
      kind: 'image',
      src: '/images/cases/dongyuan-rooftop.webp',
      alt: '幼儿园屋顶游乐场的俯视效果图，蓝色软质游乐区、白色攀爬塔与滑梯、木质边界与楼间种植。',
    },
  },
  {
    slug: 'club-aerial',
    title: '泉州主题俱乐部乐园',
    discipline: '创意设计',
    stage: '设计效果',
    description:
      '围绕水景布置的主题乐园：木构塔架、环形高架步道、沙水游戏区，以及边缘一处单独的安静区。',
    image: {
      kind: 'image',
      src: '/images/cases/club-aerial.webp',
      alt: '主题乐园俯视效果图，木构游乐塔、环形高架步道、蓝色沙水游戏地面与穿过种植区的曲线步道。',
    },
  },
  {
    slug: 'yunwen-square',
    title: '安徽天长云纹广场主题乐园',
    discipline: '创意设计',
    stage: '设计效果',
    description:
      '以动物造型游乐设施、滑梯与戏水组成的主题乐园，落在有绿化的公园里，作为一个目的地而不是附属设施。',
    image: {
      kind: 'image',
      src: '/images/cases/yunwen-square.webp',
      alt: '花树公园中的彩色主题乐园效果图，动物造型游乐设施、黄色滑梯与戏水设施。',
    },
  },
  {
    slug: 'wuyi-forest',
    title: '武夷山森林亲子乐园',
    discipline: '创意设计 · 策划咨询',
    stage: '设计效果',
    description:
      '保留现状林木下的亲子乐园：遮荫帐篷、自然游乐场地、沙水区，以及林间的游乐塔。',
    image: {
      kind: 'image',
      src: '/images/cases/wuyi-forest.webp',
      alt: '林下自然游乐场俯视效果图，遮荫帐篷结构、沙地游乐区、木质游乐构件与树木之间的步道。',
    },
  },
  {
    slug: 'concept-sketch',
    title: '概念草图：主题游乐构筑物',
    discipline: '设计推敲',
    stage: '概念草图',
    description:
      '一张关于主题游乐构筑物的手绘研究稿，发布在形态还在被讨论的阶段。',
    image: {
      kind: 'image',
      src: '/images/cases/concept-sketch.webp',
      alt: '主题游乐构筑物的手绘概念草图，图中标注了各个游乐构件。',
    },
  },
  {
    slug: 'concept-plan',
    title: '概念方案：营地',
    discipline: '策划咨询',
    stage: '概念方案',
    description:
      '一份营地概念总平面手稿，用于在建模之前推敲布局、分区与空间序列。',
    image: {
      kind: 'image',
      src: '/images/cases/concept-plan.webp',
      alt: '营地概念总平面手稿，标出游乐区、种植与两者之间的流线。',
    },
  },
];

export const capabilityStudies: ProjectStudy[] = [
  {
    slug: 'resort-arrival-sequence',
    title: '度假村到达动线与大堂装置',
    discipline: '酒店度假',
    category: '空间设计、定制制作、安装',
    scale: '到达动线与大堂',
    summary:
      '针对酒店到达体验的概念工作，从前庭一直到大堂：一边发展空间与材料概念，一边推进定制雕塑装置，由合格的金属与石材伙伴据此制作并完成规格，分阶段安装以避开运营高峰。',
    scope: [
      '到达动线概念与材料叙事',
      '定制装置设计与工程审查',
      '灯光与夜间效果研究',
      '制作包装与运输规划',
      '在不停业条件下的分阶段安装',
    ],
    outcome:
      '一个从头到尾连贯的到达体验，以及制造商无需重新理解即可据此施工的同一份规格。',
    disclosure: '概念渲染——生成插图，非已完成项目',
    visual: {
      kind: 'image',
      src: '/images/study-resort-arrival.webp',
      alt: '黄昏时分的度假村到达庭院概念渲染图，木与玻璃的亭子、抛光金属雕塑与镜面水景。',
    },
    featured: true,
  },
  {
    slug: 'destination-water-play-environment',
    title: '目的地型水上游乐环境',
    discipline: '度假与休闲',
    category: '体验设计、定制设备、生产交付',
    scale: '度假村规模的宾客设施',
    summary:
      '一个互动水上游乐环境的完整设计与交付概念：与景观及工程伙伴共同建立结构化概念，为炎热气候下的度假场景设计定制游乐构件，并制定覆盖制作、检测与分阶段现场安装的生产计划。',
    scope: [
      '概念框架与体验叙事',
      '空间布局与竖向设计',
      '定制游乐构件设计与打样',
      '材料、排水与维护通道',
      '生产排序与现场分阶段计划',
    ],
    outcome:
      '一套协调好的整体交付物——设计、规格、供应结构与安装逻辑——而不是若干份日后再互相核对的文件。',
    disclosure: '概念渲染——生成插图，非已完成项目',
    visual: {
      kind: 'image',
      src: '/images/study-water-play.webp',
      alt: '热带度假村的概念鸟瞰渲染图：绿松石色泻湖、低层亭子与专属水上游乐区。',
    },
    featured: true,
  },
  {
    slug: 'custom-leisure-equipment',
    title: '定制游乐与休闲设备系列',
    discipline: '休闲与娱乐',
    category: '工业设计、打样、生产',
    scale: '多构件设备族',
    summary:
      '为一家休闲开发商开发的设备系列：少量彼此协调且有辨识度的构件，按一个系统来设计，通过打样验证结构与表面处理，再由合格的生产伙伴投入生产，并实行分阶段品质检验。',
    scope: [
      '设备系列与设计语言',
      '结构与安全工程审查',
      '原型与承载测试',
      '生产文件与表面处理规格',
      '过程品质管控与移交',
    ],
    outcome: '一个可生产、并且读起来是一个整体构想的系统，而不是一堆互不相关的产品。',
    disclosure: '概念渲染——生成插图，非已完成项目',
    visual: {
      kind: 'image',
      src: '/images/study-play-equipment.webp',
      alt: '一组定制游乐构件的概念渲染图——木质攀爬塔、不锈钢管滑梯与旋转平台——置于景观公园中。',
    },
    featured: true,
  },
  {
    slug: 'interactive-installation',
    title: '面向公共空间的互动装置',
    discipline: '文化与公共空间',
    category: '装置设计、工程协调、交付',
    scale: '永久性场地专属装置',
    summary:
      '一个在公共或酒店场景中的永久互动装置概念：与结构及电气工程师同步推进体验概念，制定有工程依据的控制与维护策略，并搭建一条适合公共环境长期服役的供应链。',
    scope: [
      '体验概念与互动设计',
      '结构与电气协调',
      '控制系统与维护策略',
      '专业分包商选择',
      '调试与移交文件',
    ],
    outcome: '一个围绕“被运营、被清洁、被维修、被年检”这些现实条件设计的装置。',
    disclosure: '概念渲染——生成插图，非已完成项目',
    visual: {
      kind: 'image',
      src: '/images/study-installation.webp',
      alt: '夜间公共广场上方悬挂的发光雕塑构件与光环阵列的概念渲染图。',
    },
  },
  {
    slug: 'landscape-integration',
    title: '景观与场地衔接研究',
    discipline: '景观与总体规划',
    category: '接口设计、技术协调',
    scale: '总体规划接口',
    summary:
      '聚焦总体规划与其内部定制构件之间接缝的研究：界面标高、管线路由、维护通道、排水与照明，都在足够早的阶段解决，让景观、建筑与交付团队基于同一套协调过的假设推进。',
    scope: [
      '界面与标高协调',
      '管线路由与通道规划',
      '排水与照明整合',
      '维护通道审查',
      '跨专业技术对齐',
    ],
    outcome: '安装过程中的意外更少，因为难办的接口已经在纸面上解决了。',
    disclosure: '概念渲染——生成插图，非已完成项目',
    visual: {
      kind: 'image',
      src: '/images/study-landscape.webp',
      alt: '黄昏时分的景观公共空间概念渲染图：下沉花园、线性水渠、阶梯式木质平台与钢结构玻璃廊架。',
    },
  },
  {
    slug: 'thematic-fabrication',
    title: '主题环境制作范围',
    discipline: '主题乐园',
    category: '布景设计、制作管理、物流',
    scale: '多构件主题布景',
    summary:
      '为设计或制作伙伴开发的主题环境制作范围：布景构件按可实际施工的方式设计，材料与表面处理按耐久性与成本选择，生产计划围绕分散制造与集中发运来组织。',
    scope: [
      '布景构件设计与构造逻辑',
      '表面处理与耐久性选择',
      '分散生产排期',
      '集中、包装与运输规划',
      '现场安装顺序',
    ],
    outcome: '一个制作伙伴能准确报价、能稳定施工的范围。',
    disclosure: '概念渲染——生成插图，非已完成项目',
    visual: {
      kind: 'image',
      src: '/images/study-thematic.webp',
      alt: '车间中主题环境制作的概念渲染图：钢架上的雕塑假山、带肋板材与表面处理样板。',
    },
  },
];

export const disclosureNote =
  '下面的能力研究是示意性的：它们描述典型合作的范围、方法与成果，配图是生成的概念渲染图。上面的项目材料是我们自己的工作，并标注了它出自哪个阶段。';