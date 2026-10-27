import type { ProcessStep } from '@/content/types';

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    image: { src: '/images/gallery/strategy-site.webp', kind: 'illustration', alt: '黄昏时分的河畔空地：草地、一排行道树与一条被踩出来的小路，前景里拿着一份测绘图。' },
    title: '任务书',
    duration: '通常 1–2 周',
    description:
      '我们先按你的描述接手项目，然后开始追问：目标是什么、面向谁、哪些已经定下、哪些确实还有余地、成功在运营层面意味着什么。',
    deliverables: ['确认的目标', '限制条件清单', '预算与周期的初步框架'],
  },
  {
    index: '02',
    image: { src: '/images/gallery/strategy-planning.webp', kind: 'illustration', alt: '规划桌上的大幅总平面打印图、实体模型，以及显示体块模型的笔记本电脑。' },
    title: '策略',
    duration: '2–4 周',
    description:
      '项目被定型：确立组织性的核心构想、排出优先级的范围、可实现的成本计划，以及清晰的决策顺序。复杂的任务书会被压缩为真正决定结果的少数几件事。',
    deliverables: ['概念框架', '范围矩阵', '含假设条件的成本计划'],
  },
  {
    index: '03',
    image: { src: '/images/gallery/design-sketch.webp', kind: 'work', alt: '一件游乐结构的手绘汇报稿，带滑梯与攀爬架，并画了人作为尺度参照。' },
    title: '设计与研发',
    duration: '4–10 周',
    description:
      '设计与工程、成本和可制造性同步推进。最容易出问题的部分会被优先建模、打样或测试，趁改动代价还低的时候。',
    deliverables: ['设计图纸与模型', '效果可视化', '技术规格', '必要的原型'],
  },
  {
    index: '04',
    image: { src: '/images/gallery/supply-assembly.webp', kind: 'illustration', alt: '两名工人在车间里组装弧形的木质与钢制游乐构件。' },
    title: '寻源与签约',
    duration: '3–6 周',
    description:
      '按真实需求挑选伙伴——能力、产能、沟通与同类项目记录——然后在同等条件下比价，并以明确的规格与工期义务签订合同。',
    deliverables: ['合格候选名单', '对比分析', '合同与生产排期'],
  },
  {
    index: '05',
    image: { src: '/images/gallery/supply-welding.webp', kind: 'illustration', alt: '戴防护面罩的焊工在大型定制游乐架上焊接钢制节点，火花与弧光四起。' },
    title: '生产与管控',
    duration: '视范围而定',
    description:
      '生产进度对照单一排期跟踪，在约定节点进行过程检验。问题尽早上报，规格变更按受控变更处理，而不是让它悄悄漂移。',
    deliverables: ['进度报告', '检验记录', '经批准的变更记录'],
  },
  {
    index: '06',
    image: { src: '/images/gallery/supply-transport.webp', kind: 'illustration', alt: '黎明时分，长平板车载着包裹好的大型钢制与木质游乐构件行驶在公路上。' },
    title: '交付与移交',
    duration: '2–8 周',
    description:
      '运输、安装与调试围绕现场的实际情况来安排——进场条件、运营时间、作业顺序与当地用工。项目以文件归档、必要的培训与支持期收尾。',
    deliverables: ['交付与安装记录', '调试确认', '移交与维护文件'],
  },
];