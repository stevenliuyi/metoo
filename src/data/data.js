const data = {
  沈阳: {
    photo: 'Shen_Yang.jpg',
    intro: '长江学者特聘教授，原北京大学中文系副主任、南京大学文学院语言学系主任',
    date: new Date('2018-4-5'),
    details: '原北京大学社会学系学生李悠悠发文指控沈阳在北大任教其间对其好友高岩性侵，污蔑高岩患精神病，最终导致其自杀身亡。',
    quote: '他像饿狼一样向我身上扑过来。',
    quoteby: '原北大学生高岩',
    accusations: [ { url: 'https://archive.fo/WWiak', title: '南京大学文学院语言学系主任、长江学者沈阳教授，女生高岩的死真的与你无关吗？' } ],
    links: [ { url: 'http://chin.nju.edu.cn/shownews1702.html', title: '南京大学文学院关于北大校友网上发文的声明' } ],
    wikipedia: [ { url: 'https://zh.wikipedia.org/wiki/%E6%B2%88%E9%98%B3%E4%BA%8B%E4%BB%B6', title: '沈阳事件 '} ],
    zhihu: [ { url: 'https://www.zhihu.com/question/61013507/answer/361122755', title: '关于前北大教授沈阳涉嫌性侵高岩案你怎么看？' }, { url: 'https://www.zhihu.com/question/271367761', title: '如何看待南京大学文学院针对沈阳发表的声明？'} ]
  },
  张康之: {
    photo: 'Zhang_Kangzhi.jpg',
    intro: '长江学者特聘教授，中国人民大学行政管理学系教授',
    date: new Date('2018-4-13'),
    details: '原中国人民大学学生、新浪微博网友夜凭阑发微博指控张康之曾于2005年在宿舍对其性骚扰。她同时举报，其一师兄亦曾被张康之性骚扰。',
    quote: '他便反锁了门，掐我的脸，说我胖了，问我热不热，边说边伸手到我胸前要解扣子脱外套。',
    quoteby: '原人大学生夜凭阑（化名）',
    accusations: [ { url: 'https://wallsandbooks.wordpress.com/2018/04/13/%E4%BA%BA%E5%A4%A7%E5%AD%A6%E7%94%9F%EF%BC%9A%E4%B8%BE%E6%8A%A5%E4%BA%BA%E5%A4%A7%E8%A1%8C%E6%94%BF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%9A%84%E6%95%99%E6%8E%88%E5%BC%A0%E5%BA%B7%E4%B9%8B%E6%80%A7%E9%AA%9A/', title: '夜凭阑微博存档' } ],
  },
  顾海兵: {
    photo: 'Gu_Haibin.jpg',
    intro: '中国人民大学经济学院教授',
    date: new Date('2018-4-11'),
    details: '中国人民大学学生、知乎匿名网友在知乎问题“大家怎么看中国人民大学顾海兵教授？”（已被删）中揭露顾海兵曾多次对其实施性骚扰。',
    quote: '这道貌岸然的人大教授，这表里不一的伪君子──他掐了我的屁股，还发出来胜利的笑，让我屈辱和恶心！',
    quoteby: '匿名',
    accusations: [ { url: 'https://chinadigitaltimes.net/chinese/2018/04/%E5%A4%A7%E5%AE%B6%E6%80%8E%E4%B9%88%E7%9C%8B%E4%B8%AD%E5%9B%BD%E4%BA%BA%E6%B0%91%E5%A4%A7%E5%AD%A6%E7%BB%8F%E6%B5%8E%E5%AD%A6%E9%99%A2%E7%9A%84%E9%A1%BE%E6%B5%B7%E5%85%B5%E6%95%99%E6%8E%88%EF%BC%9F/', title: '文中包含知乎匿名回答存档' } ],
    links: [ { url: 'https://wallsandbooks.wordpress.com/2018/04/13/%E4%B8%80%E5%B0%81%E5%91%BC%E5%90%81%E8%B0%83%E6%9F%A5%E9%A1%BE%E6%95%99%E6%8E%88%E7%9A%84%E5%80%A1%E8%AE%AE%E4%B9%A6%EF%BC%9A%E9%9D%A2%E5%AF%B9%E6%80%A7%E9%AA%9A%E6%89%B0%EF%BC%8C%E6%8B%92%E7%BB%9D/', title: '一封呼吁调查顾教授的倡议书：面对性骚扰，拒绝包庇和隐瞒' } ]
  },
  姚树洁: {
    photo: 'Yao_Shujie.jpg',
    intro: '长江学者特聘教授，重庆大学经济学教授、诺丁汉大学经济学教授',
    date: new Date('2018-7-28'),
    details: '网友蜗牛揭露姚树洁曾在西安交通大学讲座期间对其性骚扰。',
    quote: '趁着我去拜访请教的时候，死拉硬拽让我坐他怀里。',
    quoteby: '蜗牛（化名）',
    accusations: [ { url: 'https://twitter.com/jajia/status/1023310650125119488', title: '受害者友人推特' }]
  },
  朱军: {
    photo: 'Zhu_Jun.jpeg',
    intro: '中央电视台主持人',
    date: new Date('2018-7-26'),
    details: '原中央电视台《艺术人生》节目组实习生弦子在微博发文指控朱军曾在化妆室对其有猥亵行为。',
    quote: '他越说越兴奋，隔着衣服开始试图猥亵，丝毫不顾及我的推阻。',
    quoteby: '原央视实习生弦子（化名）',
    accusations: [ { url: 'http://www.uschinapress.com/2018/0726/1138070.shtml', title: '文中包含受害者微博存档' } ],
    links: [ { url: 'https://web.archive.org/web/20180727103522/http://china.caixin.com/2018-07-27/101309136.html', title: '女实习生指控主持人朱军性骚扰' } ],
    wikipedia: [ { url: 'https://zh.wikipedia.org/wiki/%E6%9C%B1%E5%86%9B#%E4%BA%89%E8%AE%AE%E4%BA%8B%E4%BB%B6', title: '朱军#争议事件' } ],
    zhihu: [ { url: 'https://www.zhihu.com/question/286946568', title: '如何看待朱军被爆性骚扰？' } ]
  },
  谢伦灿: {
    photo: 'Xie_Luncan.jpg',
    intro: '中国传媒大学文化产业研究院副院长、教授',
    date: new Date('2018-7-26'),
    details: '中国传媒大学新闻学院大三女生面面儿呐揭露谢伦灿于2016年11月在饭店停车场与工作室对其性侵犯。',
    quote: '发现谢伦灿老师在亲我的脸，并且拉开了我的外套，一只手伸进我的毛衣里捏我的胸。',
    quoteby: '中传学生面面儿呐（化名）',
    accusations: [ { url: 'https://zhuanlan.zhihu.com/p/40704283', title: '中国传媒大学谢伦灿教授性侵' } ],
    links: [ { url: 'https://m.weibo.cn/u/5626269779', title: '受害者微博' }, { url: 'https://www.thepaper.cn/newsDetail_forward_2295834', title: '中国传媒大学：已注意到对谢伦灿师德师风问题的举报，正核查' } ],
    zhihu: [ { url: 'https://www.zhihu.com/question/287021013', title: '如何看待中国传媒大学教授谢伦灿？' } ]
  },
  蔡翔: {
    photo: 'Cai_Xiang.gif',
    intro: '原中国传媒大学副校长',
    date: new Date('2018-7-27'),
    details: '中国传媒大学2012届毕业生指控蔡翔曾于2008年邀其一同泡温泉，并对其性骚扰。',
    quote: '我像被施了咒一样听话地去了，随后他把自己脱光了，也走了进来，坐在池边，抱住了我。',
    quoteby: '匿名',
    links: [ { url: 'http://news.dwnews.com/china/news/2018-07-27/60073695.html', title: '蔡翔被免去中传副校长6个月后涉性侵 如今去向不明' } ]
  },
  雷闯: {
    photo: 'Lei_Chuan.jpg',
    intro: '知名公益人、亿友公益创始人',
    date: new Date('2018-7-23'),
    details: '一匿名女生发文指控雷闯于2015年7月在参与徒步活动时被其在酒店房间内性侵。',
    quote: '在此之前，我完全没有任何性经验，几乎是忍受撕裂感和疼痛，一个人清醒地度过了一夜。',
    quoteby: '匿名',
    accusations: [ { url: 'http://5b0988e595225.cdn.sohucs.com/images/20180723/b6dda072c2f74f14a1bce14b404a3c15.jpeg', title: '受害者指控文章' } ],
    zhihu: [ { url: 'https://zhuanlan.zhihu.com/p/40472740', title: '公益圈知名人士雷闯性侵事件始末' }, { url: 'https://www.zhihu.com/question/286518538', title: '如果评价雷闯性侵女志愿者、实习生以及他的两次声明？' } ]
  },
  徐钢: {
    photo: 'Xu_Gang.jpg',
    intro: '美国伊利诺伊大学香槟分校（UIUC）东亚研究系副教授',
    date: new Date('2018-3-10'),
    details: '美国卫斯理安大学（Wesleyan University）王敖在豆瓣与知乎上指控徐钢长期性侵学生，此后亦有多名受害者发声揭露徐钢的性骚扰、性侵犯行径。',
    quote: '看到这个帖子里徐钢的照片仍会生理性恶心，脑海中一直闪回噩梦般的经历。徐钢的丑恶嘴脸和各种变态性癖好，依然历历在目。',
    quoteby: '原UIUC 学生 Survivor2018（化名）',
    accusations: [ { url: 'https://www.zhihu.com/question/268596088/answer/339312013', title: '王敖在知乎对徐钢的指控' } ],
    zhihu: [ { url: 'https://www.zhihu.com/question/268596088', title: '怎么看Wesleyan University 任教的王敖教授发出示警，指UIUC 的徐钢是性侵惯犯？' }, { url: 'https://www.zhihu.com/question/268889325', title: '如何评价UIUC 教授徐钢造谣并威胁揭露他的王敖教授？' } ]
  }
}

export default data;
