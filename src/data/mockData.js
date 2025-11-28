// Mock data for Social Anti-Fake News System

// 模拟用户数据 - 包含一些测试用户
export let mockUsers = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'Admin123!', // 注意：实际应用中应使用密码哈希
    avatar: '/src/assets/images/blank-image.svg',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    firstName: 'Member',
    lastName: 'User',
    email: 'member@example.com',
    password: 'Member123!',
    avatar: '/src/assets/images/blank-image.svg',
    role: 'member',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    firstName: 'Reader',
    lastName: 'User',
    email: 'reader@example.com',
    password: 'Reader123!',
    avatar: '/src/assets/images/blank-image.svg',
    role: 'reader',
    createdAt: '2024-01-03T00:00:00Z'
  }
];

// 设置模拟用户数据的函数
export const setMockUsers = (users) => {
  mockUsers = users;
};

// 模拟新闻数据 - 包含40+条新闻
let mockNewsList = [
  // News items with various statuses (fake, notFake, undetermined)
  {
    id: 1,
    topic: "New AI Technology Can Read Minds",
    shortDetail: "Recent research claims to have developed AI technology that can interpret human thoughts with high accuracy.",
    fullDetail: "A research team at a leading university claims to have made a breakthrough in brain-computer interface technology. They state that their AI system can interpret human thoughts by analyzing brain activity patterns using advanced machine learning algorithms. However, many neuroscientists remain skeptical, pointing out that while we've made progress in this field, truly 'reading minds' remains scientifically challenging.",
    status: "fake",
    reporter: "Zhang Ming",
    dateTime: "2024-01-15T08:30:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 2,
      notFake: 8
    },
    comments: [
      {
        id: 1,
        user: "Mike Johnson",
        vote: "fake",
        comment: "This is clearly misinformation. Vaccines don't contain any magnetic substances.",
        dateTime: "2023-10-15T15:45:00",
        image: ""
      },
      {
        id: 2,
        user: "Sarah Williams",
        vote: "fake",
        comment: "I'm a medical professional and can confirm these claims are false.",
        dateTime: "2023-10-15T16:20:00",
        image: "/src/assets/images/blank-image.svg"
      }
    ]
  },
  {
    id: 2,
    topic: "A Brand of Beverage Contains Carcinogenic Substances",
    shortDetail: "A rumor circulating online claims that products from a well-known beverage brand contain carcinogenic substances.",
    fullDetail: "Social media posts have recently gone viral claiming that laboratory tests found dangerous levels of carcinogens in a popular beverage brand. The company has denied these claims, stating that all their products undergo rigorous safety testing and meet regulatory standards. Public health authorities are currently investigating these allegations, but no official findings have been released yet.",
    status: "notFake",
    reporter: "Zhao Jing",
    dateTime: "2024-01-14T14:20:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 7,
      notFake: 2
    },
    comments: [
      {
        id: 1,
        user: "Emily Davis",
        vote: "notFake",
        comment: "This aligns with what we've known for years. Exercise is truly medicine!",
        dateTime: "2023-10-14T10:30:00",
        image: ""
      }
    ]
  },
  {
    id: 3,
    topic: "New Electric Vehicle Battery Range Exceeds 1000 Kilometers",
    shortDetail: "A domestic technology company announces the development of new battery technology with a range exceeding 1000 kilometers.",
    fullDetail: "A relatively unknown technology startup has made headlines with their announcement of a breakthrough in battery technology for electric vehicles. According to their press release, their new solid-state battery can provide a range of over 1000 kilometers on a single charge, far exceeding current industry standards. While the company has shown some test data, independent verification is still pending, and many industry experts are cautiously optimistic but awaiting further evidence.",
    status: "notFake",
    reporter: "Wu Wei",
    dateTime: "2024-01-13T10:15:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 3,
      notFake: 5
    },
    comments: [
      {
        id: 1,
        user: "Dr. Lisa Wang",
        vote: "fake",
        comment: "As an epidemiologist, I can confirm there is absolutely no scientific basis for this claim.",
        dateTime: "2023-10-13T17:20:00",
        image: "/src/assets/images/blank-image.svg"
      }
    ]
  },
  {
    id: 4,
    topic: "Eating Bananas Can Prevent Cancer",
    shortDetail: "Social media posts claim that consuming bananas daily can prevent various types of cancer.",
    fullDetail: "A viral post on social media platforms claims that banana consumption can prevent cancer due to certain compounds found in the fruit. While bananas are nutritious and contain antioxidants, medical experts caution that there is no scientific evidence to support the claim that bananas alone can prevent cancer. The post appears to be an exaggerated interpretation of a preliminary study that examined potential health benefits of certain plant compounds.",
    status: "fake",
    reporter: "Sun Yi",
    dateTime: "2024-01-12T09:45:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 10,
      notFake: 2
    },
    comments: [
      {
        id: 1,
        user: "Thomas Brown",
        vote: "notFake",
        comment: "The scientific consensus on climate change is overwhelming. We need to act now.",
        dateTime: "2023-10-12T12:15:00",
        image: ""
      }
    ]
  },
  {
    id: 5,
    topic: "City Subways to Achieve Full 5G Coverage",
    shortDetail: "City authorities announce plans to provide comprehensive 5G network coverage in all subway stations.",
    fullDetail: "The municipal government has announced an ambitious plan to upgrade telecommunications infrastructure in the city's subway system. According to the announcement, all subway stations and tunnels will have full 5G coverage by the end of the year, allowing passengers to enjoy high-speed internet throughout their journey. The telecommunications company responsible for the implementation has confirmed the timeline and provided details about the technical approach.",
    status: "notFake",
    reporter: "He Jian",
    dateTime: "2024-01-11T16:30:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 1,
      notFake: 12
    },
    comments: [
      {
        id: 1,
        user: "Dr. Kevin Patel",
        vote: "fake",
        comment: "This is dangerous misinformation. Cancer patients should follow their doctors' advice, not rely on unproven remedies.",
        dateTime: "2023-10-11T14:20:00",
        image: ""
      }
    ]
  },
  {
    id: 6,
    topic: "Cell Phone Radiation Causes Brain Cancer",
    shortDetail: "Social media posts revive old claims linking cell phone use to brain tumors.",
    fullDetail: "A series of viral posts on social media have resurfaced claims about the dangers of cell phone radiation. These posts reference studies that allegedly show a correlation between long-term cell phone use and brain cancer. However, major health organizations including the WHO and FDA have reviewed extensive scientific literature and found no conclusive evidence that cell phone radiation causes brain cancer. The radiation emitted by cell phones is non-ionizing and at levels far below those known to cause cancer.",
    status: "fake",
    reporter: "Ma Chao",
    dateTime: "2024-01-10T11:20:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 8,
      notFake: 3
    },
  },
  {
    id: 7,
    topic: "New Climate Change Report Shows Accelerating Trends",
    shortDetail: "Scientists release new data suggesting climate change effects are accelerating faster than previously predicted.",
    fullDetail: "A team of international researchers has published a new report indicating that global warming is occurring at a faster rate than models had previously projected. The report points to several key indicators including rising sea levels, glacial melt, and extreme weather events. However, some experts are calling for further review of the methodology, noting that while climate change is real, the specific acceleration claims need additional verification.",
    status: "undetermined",
    reporter: "Lin Xiao",
    dateTime: "2024-01-09T14:30:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 5,
      notFake: 4
    },
    comments: [
      {
        id: 1,
        user: "James Miller",
        vote: "notFake",
        comment: "While the headline is slightly exaggerated, the actual breakthrough is still impressive and promising.",
        dateTime: "2023-10-10T09:15:00",
        image: ""
      }
    ]
  },
  {
    id: 7,
    topic: "Scientists Discover New Cancer Treatment Method",
    shortDetail: "Researchers claim to have found a breakthrough treatment method that can effectively inhibit cancer cell growth.",
    fullDetail: "A team of researchers from a prestigious medical institute has published a paper describing a novel approach to cancer treatment. Their method targets specific molecular pathways unique to cancer cells, potentially offering a more effective and less toxic alternative to traditional chemotherapy. The initial laboratory results are promising, but the treatment is still in early stages of development and requires extensive clinical trials before it could be available to patients.",
    status: "notFake",
    reporter: "Lin Xia",
    dateTime: "2024-01-09T13:10:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 2,
      notFake: 15
    },
    comments: [
      {
        id: 1,
        user: "Patricia Green",
        vote: "fake",
        comment: "I contacted my local representative who confirmed this is completely false. Just another internet rumor.",
        dateTime: "2023-10-09T16:05:00",
        image: ""
      }
    ]
  },
  {
    id: 8,
    topic: "Ancient Pyramids Built by Aliens",
    shortDetail: "Alternative theorists claim new evidence suggests extraterrestrial involvement in pyramid construction.",
    fullDetail: "A documentary released on a streaming platform has reignited debates about the construction of ancient pyramids. The program presents所谓的新证据(so-called new evidence) suggesting that the precision and scale of these structures could not have been achieved by ancient civilizations alone. Mainstream archaeologists and historians have criticized these claims, pointing to extensive evidence of the sophisticated engineering and organizational capabilities of ancient societies. No credible scientific evidence supports the alien theory.",
    status: "fake",
    reporter: "Wang Lei",
    dateTime: "2024-01-08T15:40:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 18,
      notFake: 4
    },
    comments: [
      {
        id: 1,
        user: "Daniel Wilson",
        vote: "notFake",
        comment: "This makes perfect sense when you think about all the energy needed to pump, treat, and heat water.",
        dateTime: "2023-10-08T11:30:00",
        image: ""
      }
    ]
  },
  {
    id: 9,
    topic: "Organic Food Prevents Chronic Diseases",
    shortDetail: "Marketing campaigns claim that organic food consumption significantly reduces the risk of chronic diseases.",
    fullDetail: "Recent advertising campaigns for organic food products have made bold health claims, suggesting that switching to organic foods can prevent chronic diseases like cancer and heart disease. While organic farming practices avoid synthetic pesticides and fertilizers, scientific research on the health benefits is mixed. Some studies show minor differences in nutrient content, but there is limited evidence that organic food consumption provides significant protection against chronic diseases compared to conventionally grown food of the same type.",
    status: "undetermined",
    reporter: "Chen Hui",
    dateTime: "2024-01-07T10:00:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
      fake: 4,
      notFake: 6
    },
    comments: [
      {
        id: 1,
        user: "Dr. Rachel Kim",
        vote: "fake",
        comment: "As a neuroscientist, I can confirm there is no credible evidence linking cell phone use to brain cancer.",
        dateTime: "2023-10-07T15:00:00",
        image: ""
      }
    ]
  },
  {
    id: 10,
    topic: "New Quantum Computing Breakthrough Solves Global Warming",
    shortDetail: "Tech company announces that quantum computing will soon solve climate change problems.",
    fullDetail: "A technology company has issued a press release claiming their quantum computing research is on the verge of solving climate change. They state that their quantum algorithms will be able to model climate systems with unprecedented accuracy and rapidly identify optimal solutions. While quantum computing does have the potential to accelerate certain climate research applications, experts caution that these claims are significantly overstated. Quantum computers are still in early development stages and solving climate change requires comprehensive global action beyond just computational advances.",
    status: "undetermined",
    reporter: "Liu Yang",
    dateTime: "2024-01-06T09:25:00",
    image: "/src/assets/images/blank-image.svg",
    votes: {
        fake: 5,
        notFake: 4
      },
      comments: []
    },
    {
      id: 11,
      topic: "Smartphones Cause Vision Loss",
      shortDetail: "Claims that excessive smartphone use leads to permanent vision damage in young people.",
      fullDetail: "Social media posts have been circulating warnings about smartphone use causing blindness in teenagers. While extended screen time can cause eye strain and digital eye fatigue, ophthalmologists confirm there is no scientific evidence linking smartphone use to permanent vision loss. Regular breaks and proper screen settings can help alleviate temporary eye discomfort.",
      status: "fake",
      reporter: "Huang Wei",
      dateTime: "2024-01-05T14:25:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 12,
        notFake: 3
      },
      comments: []
    },
    {
      id: 12,
      topic: "New Study Shows Benefits of Green Tea",
      shortDetail: "Research confirms that regular green tea consumption improves cognitive function.",
      fullDetail: "A study published in the Journal of Nutrition examined the effects of green tea consumption on cognitive performance. The 12-week randomized controlled trial found that participants who consumed 3 cups of green tea daily showed significant improvements in memory and attention tests compared to the control group. The researchers attribute these benefits to the high concentration of antioxidants and L-theanine in green tea.",
      status: "notFake",
      reporter: "Li Na",
      dateTime: "2024-01-04T09:15:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 2,
        notFake: 18
      },
      comments: []
    },
    {
      id: 13,
      topic: "Government Plans to Tax Social Media Usage",
      shortDetail: "Rumors circulate about a new tax on social media platform usage.",
      fullDetail: "A post on social media claims that the government is planning to implement a 'social media usage tax' that would charge users based on their daily time spent on platforms. While governments worldwide have been considering regulations for digital services, officials have denied any plans for such a tax. The post appears to be misinterpreting discussions about potential taxes on tech companies, not individual users.",
      status: "undetermined",
      reporter: "Zhang Hong",
      dateTime: "2024-01-03T11:40:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 6,
        notFake: 3
      },
      comments: []
    },
    {
      id: 14,
      topic: "Coffee Consumption Linked to Longevity",
      shortDetail: "Large-scale study finds correlation between moderate coffee drinking and longer lifespan.",
      fullDetail: "A meta-analysis published in the Annals of Internal Medicine combined data from over 40 studies involving more than 2 million participants. The research found that people who consumed 2-4 cups of coffee daily had a 15% lower risk of premature death compared to non-coffee drinkers. The benefits were observed across different populations and appeared to be independent of whether the coffee was caffeinated or decaffeinated.",
      status: "notFake",
      reporter: "Chen Ming",
      dateTime: "2024-01-02T15:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 1,
        notFake: 22
      },
      comments: []
    },
    {
      id: 15,
      topic: "5G Networks Reduce Immune System Function",
      shortDetail: "Unsubstantiated claims that 5G radiation weakens the human immune system.",
      fullDetail: "Conspiracy theorists have been spreading claims that 5G technology emits radiation that can compromise the immune system, making people more susceptible to infections. However, multiple health organizations including the WHO and FDA have stated that there is no scientific evidence to support these claims. The radiation levels from 5G networks are well below international safety standards and do not have the energy to damage biological systems in the ways described.",
      status: "fake",
      reporter: "Wang Jun",
      dateTime: "2024-01-01T10:20:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 25,
        notFake: 4
      },
      comments: []
    },
    {
      id: 16,
      topic: "New Electric Vehicle Charging Record Set",
      shortDetail: "Company demonstrates EV charging technology that adds 300km range in 10 minutes.",
      fullDetail: "A leading electric vehicle manufacturer has announced a breakthrough in fast-charging technology. During a public demonstration, their new charging system was able to add 300 kilometers of range to an electric vehicle in just 10 minutes. While the technology shows promise, independent testing is still needed to verify these claims under various conditions. The company plans to begin implementing this technology in their charging networks next year.",
      status: "undetermined",
      reporter: "Liu Xin",
      dateTime: "2023-12-31T13:45:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 4,
        notFake: 7
      },
      comments: []
    },
    {
      id: 17,
      topic: "Vitamin D Deficiency Common in Office Workers",
      shortDetail: "Study reveals that 70% of indoor workers have insufficient vitamin D levels.",
      fullDetail: "Research conducted by the National Health Institute found that 70% of office workers who spend most of their day indoors have vitamin D levels below the recommended threshold. Vitamin D is primarily synthesized in the skin through exposure to sunlight, and limited sun exposure combined with indoor work environments contributes to this widespread deficiency. Health experts recommend regular outdoor breaks and consideration of vitamin D supplementation for those with limited sun exposure.",
      status: "notFake",
      reporter: "Zhang Wei",
      dateTime: "2023-12-30T08:50:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 1,
        notFake: 15
      },
      comments: []
    },
    {
      id: 18,
      topic: "Air Fryers Emit Toxic Chemicals",
      shortDetail: "Viral posts claim that air fryers release harmful compounds when cooking.",
      fullDetail: "Social media has been buzzing with claims that air fryers produce acrylamide and other potentially harmful chemicals when heating food at high temperatures. While it is true that cooking starchy foods at high temperatures can produce small amounts of acrylamide, this occurs with all cooking methods, not just air fryers. Food safety authorities state that when used according to instructions, air fryers are considered safe for food preparation.",
      status: "fake",
      reporter: "Li Jing",
      dateTime: "2023-12-29T14:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 8,
        notFake: 5
      },
      comments: []
    },
    {
      id: 19,
      topic: "New Recycling Technology Converts Plastic to Fuel",
      shortDetail: "Scientists develop process that transforms plastic waste into usable fuel.",
      fullDetail: "Researchers at a major university have developed a novel recycling technology that can convert various types of plastic waste into synthetic fuel. The process uses a catalytic reaction to break down plastic polymers into hydrocarbon chains that can be refined into diesel-like fuel. Early tests show promising conversion efficiency, but scaling the technology commercially remains a challenge. The researchers hope this approach could help address both plastic pollution and energy needs.",
      status: "undetermined",
      reporter: "Chen Hao",
      dateTime: "2023-12-28T11:15:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 3,
        notFake: 6
      },
      comments: []
    },
    {
      id: 20,
      topic: "Daily Walking Reduces Risk of Cognitive Decline",
      shortDetail: "Study shows that regular walking improves brain health in older adults.",
      fullDetail: "A 10-year longitudinal study published in Neurology examined the effects of walking on cognitive function in adults over 65. The researchers found that participants who walked at least 30 minutes daily had a 47% lower risk of developing dementia compared to those who walked less than 10 minutes daily. The protective effects were observed regardless of the walking pace, suggesting that consistency is more important than intensity for brain health benefits.",
      status: "notFake",
      reporter: "Zhao Lin",
      dateTime: "2023-12-27T09:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 0,
        notFake: 20
      },
      comments: []
    },
    {
      id: 21,
      topic: "Microchips in Vaccines Track Personal Movement",
      shortDetail: "Baseless conspiracy theory about tracking technology in COVID-19 vaccines.",
      fullDetail: "Conspiracy theorists have been spreading false claims that COVID-19 vaccines contain microchips that allow governments or corporations to track people's movements. This claim is completely unfounded. Vaccines are formulated with ingredients necessary for their effectiveness, and there is no technology currently capable of injecting functioning microchips through a standard vaccine needle. Multiple fact-checking organizations and health authorities have thoroughly debunked this conspiracy theory.",
      status: "fake",
      reporter: "Wang Xiao",
      dateTime: "2023-12-26T15:45:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 30,
        notFake: 5
      },
      comments: []
    },
    {
      id: 22,
      topic: "Plant-Based Meat Alternatives Reduce Carbon Footprint",
      shortDetail: "Research confirms environmental benefits of plant-based protein sources.",
      fullDetail: "A comprehensive life-cycle assessment published in Science compared the environmental impact of plant-based meat alternatives with conventional animal products. The study found that plant-based alternatives generate 90% less greenhouse gas emissions, require 99% less water, and use 93% less land than beef production. These findings support the growing trend of plant-based diets as a way to reduce personal environmental impact.",
      status: "notFake",
      reporter: "Li Hao",
      dateTime: "2023-12-25T10:20:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 2,
        notFake: 17
      },
      comments: []
    },
    {
      id: 23,
      topic: "New AI Can Predict Stock Market Movements",
      shortDetail: "Tech company claims their AI algorithm can forecast stock prices with 90% accuracy.",
      fullDetail: "A financial technology startup has announced the development of an AI algorithm that they claim can predict stock market movements with 90% accuracy. While AI has shown promise in analyzing market data, financial experts are skeptical of such high accuracy claims. The stock market involves numerous unpredictable factors, and past performance does not guarantee future results. The company has not released details about their testing methodology or allowed independent verification of their claims.",
      status: "undetermined",
      reporter: "Zhang Lin",
      dateTime: "2023-12-24T14:10:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 7,
        notFake: 3
      },
      comments: []
    },
    {
      id: 24,
      topic: "Sleeping With Phone Under Pillow Causes Cancer",
      shortDetail: "False claims linking手机辐射贴近头部放置与癌症风险增加。",
      fullDetail: "社交媒体上流传的帖子声称，将手机放在枕头下睡觉会因辐射增加脑癌风险。然而，世界卫生组织和其他主要健康机构表示，没有科学证据支持这一说法。手机发出的是非电离辐射，能量不足以损坏DNA或导致癌症。虽然专家建议睡前减少屏幕时间以改善睡眠质量，但这与癌症风险无关。",
      status: "fake",
      reporter: "Huang Lin",
      dateTime: "2023-12-23T11:45:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 14,
        notFake: 4
      },
      comments: []
    },
    {
      id: 25,
      topic: "Mediterranean Diet Improves Heart Health",
      shortDetail: "Long-term study confirms cardiovascular benefits of Mediterranean eating pattern.",
      fullDetail: "The PREDIMED study, a landmark randomized controlled trial, followed over 7,000 participants for more than 5 years. The results showed that participants following a Mediterranean diet supplemented with either extra-virgin olive oil or nuts had a 30% lower risk of major cardiovascular events compared to the control group. The Mediterranean diet emphasizes fruits, vegetables, whole grains, legumes, and healthy fats while limiting red meat and processed foods.",
      status: "notFake",
      reporter: "Chen Wei",
      dateTime: "2023-12-22T09:15:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 1,
        notFake: 24
      },
      comments: []
    },
    {
      id: 26,
      topic: "City Plans to Replace Bus Fleet With Electric Vehicles",
      shortDetail: "Local government announces initiative to electrify public transportation.",
      fullDetail: "The city council has approved a comprehensive plan to replace all diesel buses in the public transit fleet with electric vehicles within the next five years. The initiative includes building charging infrastructure at bus depots and implementing smart charging systems to optimize energy usage. Proponents cite reduced air pollution, lower operating costs, and improved passenger experience as key benefits. Environmental groups have praised the plan, though some transit union representatives have raised concerns about maintenance training and initial implementation costs.",
      status: "notFake",
      reporter: "Liu Ming",
      dateTime: "2023-12-21T16:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 0,
        notFake: 12
      },
      comments: []
    },
    {
      id: 27,
      topic: "New Quantum Computer Solves Previously Impossible Problems",
      shortDetail: "Tech giant claims breakthrough in quantum computing capabilities.",
      fullDetail: "A leading technology company has announced that their latest quantum computer has achieved 'quantum supremacy' by solving a computational problem that would be practically impossible for classical supercomputers. While quantum computing is an advancing field with significant potential, experts caution that practical applications for most real-world problems are still years away. The specific problem solved in this demonstration has limited practical relevance, and there are ongoing debates about the significance of the achievement.",
      status: "undetermined",
      reporter: "Wang Chen",
      dateTime: "2023-12-20T12:45:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 5,
        notFake: 6
      },
      comments: []
    },
    {
      id: 28,
      topic: "Eating Carrots Improves Night Vision",
      shortDetail: "Common belief about carrots and eyesight effectiveness.",
      fullDetail: "The idea that eating carrots improves night vision originated during World War II as a propaganda campaign to explain why British pilots had improved night bombing accuracy (actually due to radar technology). While carrots are rich in vitamin A, which is important for eye health, consuming excessive amounts does not improve night vision beyond normal levels in people with adequate vitamin A. However, vitamin A deficiency can cause night blindness, which can be corrected by restoring adequate vitamin A levels.",
      status: "fake",
      reporter: "Zhang Wei",
      dateTime: "2023-12-19T10:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 9,
        notFake: 8
      },
      comments: []
    },
    {
      id: 29,
      topic: "Exercise Improves Mental Health",
      shortDetail: "Research confirms strong link between physical activity and reduced depression.",
      fullDetail: "A meta-analysis of over 100 studies published in JAMA Psychiatry found that regular exercise is associated with a 25% lower risk of developing depression. The research shows that exercise appears to be as effective as antidepressant medication for mild to moderate depression and can enhance the effects of medication for more severe cases. Both aerobic exercise and strength training were found to have beneficial effects, with consistent moderate activity showing the best results.",
      status: "notFake",
      reporter: "Li Lin",
      dateTime: "2023-12-18T13:20:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 1,
        notFake: 26
      },
      comments: []
    },
    {
      id: 30,
      topic: "New Alzheimer's Treatment Shows Promise",
      shortDetail: "Clinical trial results indicate potential breakthrough in dementia treatment.",
      fullDetail: "Pharmaceutical company announces positive results from phase 3 clinical trials of a new drug for Alzheimer's disease. The treatment targets amyloid plaques in the brain and showed a 27% reduction in cognitive decline compared to placebo in the 18-month trial. While these results are promising, experts note that the treatment only slows progression rather than reversing damage, and long-term effects are still being studied. The drug is currently under review by regulatory agencies.",
      status: "undetermined",
      reporter: "Chen Lin",
      dateTime: "2023-12-17T15:15:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 2,
        notFake: 9
      },
      comments: []
    },
    {
      id: 31,
      topic: "Fluoridated Water Causes Cancer",
      shortDetail: "Misinformation about public water fluoridation and health risks.",
      fullDetail: "Anti-fluoridation groups have been spreading false claims that adding fluoride to public water supplies causes cancer and other health problems. However, numerous scientific studies and major health organizations including the CDC, WHO, and American Cancer Society have consistently found no credible evidence linking fluoridated water to cancer or other serious health risks when used at recommended levels. Water fluoridation remains one of the most effective public health measures for preventing tooth decay.",
      status: "fake",
      reporter: "Wang Wei",
      dateTime: "2023-12-16T11:45:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 17,
        notFake: 5
      },
      comments: []
    },
    {
      id: 32,
      topic: "Renewable Energy Cost Now Lower Than Fossil Fuels",
      shortDetail: "Global analysis shows solar and wind power are cheaper than coal and gas in most countries.",
      fullDetail: "A report by the International Renewable Energy Agency (IRENA) finds that the cost of generating electricity from new solar and wind installations is now lower than from new coal and gas plants in 91% of the world. The analysis shows that the levelized cost of energy (LCOE) for utility-scale solar PV has fallen by 89% since 2010, while onshore wind has decreased by 70%. These findings suggest that transitioning to renewable energy is not only better for the environment but also more economically advantageous in most cases.",
      status: "notFake",
      reporter: "Zhao Wei",
      dateTime: "2023-12-15T10:10:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 0,
        notFake: 19
      },
      comments: []
    },
    {
      id: 33,
      topic: "New App Can Diagnose Diseases From Selfies",
      shortDetail: "AI startup claims their application can detect health conditions from facial photos.",
      fullDetail: "A technology startup has launched an app that they claim can identify various health conditions by analyzing facial features in smartphone photos. The app uses AI algorithms to detect subtle facial changes that may indicate underlying health issues. While some skin conditions and rare genetic disorders have visible facial markers, medical experts caution that self-diagnosis apps should not replace professional medical evaluation. The company has not published peer-reviewed studies validating their technology across diverse populations.",
      status: "undetermined",
      reporter: "Zhang Lin",
      dateTime: "2023-12-14T14:25:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 8,
        notFake: 4
      },
      comments: []
    },
    {
      id: 34,
      topic: "Organic Farming Produces Less Food Per Acre",
      shortDetail: "Study compares yield efficiency between organic and conventional agriculture.",
      fullDetail: "Research published in Nature Sustainability analyzed crop yields from organic and conventional farming systems across multiple countries. The study found that organic farming produces, on average, 80% of the yield of conventional methods for the same crop and land area. While organic farming has environmental benefits like reduced pesticide use and improved soil health, the lower yield efficiency presents challenges for global food security as the population continues to grow. Some experts suggest integrated approaches that combine beneficial practices from both systems.",
      status: "notFake",
      reporter: "Li Wei",
      dateTime: "2023-12-13T09:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 2,
        notFake: 16
      },
      comments: []
    },
    {
      id: 35,
      topic: "5G Causes Bird Deaths",
      shortDetail: "Unsubstantiated claims linking 5G technology to declining bird populations.",
      fullDetail: "Social media posts have been sharing videos and images purporting to show birds falling from the sky in areas with 5G infrastructure. These posts falsely claim that 5G radiation is harmful to birds. However, wildlife experts and ornithologists have explained that sudden bird deaths can occur for various natural reasons, including disease outbreaks and severe weather events. There is no scientific evidence to support the claim that 5G technology is causing harm to bird populations.",
      status: "fake",
      reporter: "Huang Lin",
      dateTime: "2023-12-12T15:40:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 15,
        notFake: 3
      },
      comments: []
    },
    {
      id: 36,
      topic: "New Study Shows Benefits of Intermittent Fasting",
      shortDetail: "Research indicates health improvements with time-restricted eating patterns.",
      fullDetail: "A randomized controlled trial published in Cell Metabolism examined the effects of intermittent fasting on metabolic health. Participants who limited their eating window to 8 hours per day without restricting calories lost weight, reduced blood pressure, and improved insulin sensitivity compared to the control group who ate throughout the day. The researchers suggest that intermittent fasting may help reset metabolic rhythms and improve cellular repair processes during fasting periods.",
      status: "undetermined",
      reporter: "Chen Wei",
      dateTime: "2023-12-11T11:15:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 3,
        notFake: 8
      },
      comments: []
    },
    {
      id: 37,
      topic: "Smartphones Make Young People Stupid",
      shortDetail: "Alarmist claims about technology's impact on cognitive abilities.",
      fullDetail: "A viral article claims that smartphone use is causing a decline in IQ and cognitive abilities among young people. However, cognitive scientists point out that technology use changes how we think rather than diminishing our overall intelligence. While there are concerns about attention spans and social skills, research shows that digital literacy and problem-solving skills have actually improved in younger generations. The relationship between technology use and cognitive development is complex and not fully understood.",
      status: "fake",
      reporter: "Wang Lin",
      dateTime: "2023-12-10T13:25:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 11,
        notFake: 6
      },
      comments: []
    },
    {
      id: 38,
      topic: "Ocean Plastic Pollution Reaches Critical Levels",
      shortDetail: "New research quantifies the severity of plastic waste in marine environments.",
      fullDetail: "A comprehensive study published in Science Advances estimates that approximately 11 million metric tons of plastic waste enter the oceans each year. The research used improved modeling techniques to track plastic pollution from land-based sources to marine environments. The authors warn that without immediate action to reduce plastic production and improve waste management, the amount of plastic in the oceans could triple by 2040. The study highlights the urgent need for global cooperation on this environmental crisis.",
      status: "notFake",
      reporter: "Zhao Wei",
      dateTime: "2023-12-09T09:50:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 0,
        notFake: 22
      },
      comments: []
    },
    {
      id: 39,
      topic: "New Brain-Computer Interface Allows Telepathy",
      shortDetail: "Research team claims breakthrough in direct brain-to-brain communication.",
      fullDetail: "Scientists at a prestigious university have published a paper describing a brain-computer interface system that they say allows for direct brain-to-brain communication between two people. The system uses EEG to record brain activity from one participant and transcranial magnetic stimulation to transmit information to another participant. While the researchers were able to transmit simple signals, experts emphasize that this is far from the sci-fi concept of telepathy and has significant limitations in bandwidth and complexity of information that can be transmitted.",
      status: "undetermined",
      reporter: "Zhang Wei",
      dateTime: "2023-12-08T14:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 6,
        notFake: 5
      },
      comments: []
    },
    {
      id: 40,
      topic: "Vaccines Contain Aborted Fetal Tissue",
      shortDetail: "False claims about vaccine ingredients aimed at certain religious groups.",
      fullDetail: "Anti-vaccine activists have been spreading false information that vaccines contain aborted fetal tissue. While it is true that some cell lines used in vaccine development were originally derived from fetal tissue samples taken decades ago, no vaccines on the market today contain actual fetal tissue. These cell lines are used in laboratory settings to grow and study viruses during vaccine development. Major religious authorities have stated that vaccination is morally acceptable and recommended for health protection.",
      status: "fake",
      reporter: "Li Wei",
      dateTime: "2023-12-07T12:15:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 18,
        notFake: 4
      },
      comments: []
    },
    {
      id: 41,
      topic: "Green Spaces Improve Mental Well-being",
      shortDetail: "Study quantifies psychological benefits of urban parks and natural areas.",
      fullDetail: "Research published in Environmental Science & Technology analyzed data from over 300,000 participants across 10 countries. The study found that people who live near green spaces report significantly higher levels of mental well-being and lower rates of depression and anxiety. The beneficial effects were dose-dependent, with greater benefits observed for those with more frequent access to larger green areas. The researchers suggest that urban planning should prioritize green space development to improve public mental health.",
      status: "notFake",
      reporter: "Chen Lin",
      dateTime: "2023-12-06T10:30:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 1,
        notFake: 17
      },
      comments: []
    },
    {
      id: 42,
      topic: "Electric Vehicles Emit More Carbon Than Gasoline Cars",
      shortDetail: "Misleading analysis of EV lifecycle emissions compared to conventional vehicles.",
      fullDetail: "A blog post circulating online claims that when considering battery production and electricity generation, electric vehicles actually emit more carbon dioxide than gasoline-powered cars. However, comprehensive lifecycle assessments by multiple research organizations show that electric vehicles have lower overall emissions in nearly all regions of the world, even when accounting for battery manufacturing and electricity sources. As renewable energy sources increase, the emissions advantage of electric vehicles continues to grow.",
      status: "fake",
      reporter: "Wang Wei",
      dateTime: "2023-12-05T15:45:00",
      image: "/src/assets/images/blank-image.svg",
      votes: {
        fake: 13,
        notFake: 7
      },
      comments: []
    }
];

// 导出模拟新闻数据
export const mockNews = mockNewsList;

// 设置模拟新闻数据的函数
export const setMockNews = (news) => {
  mockNewsList = news;
};

// 根据ID删除新闻（软删除）
export const deleteNewsById = (newsId, isAdmin = false) => {
  try {
    if (!isAdmin) {
      throw new Error('Unauthorized: Only administrators can delete news');
    }
    
    const newsIndex = mockNewsList.findIndex(news => news.id === newsId);
    
    if (newsIndex === -1) {
      throw new Error('News not found');
    }
    
    // 软删除：添加deleted标记，而不是真正删除
    mockNewsList[newsIndex] = {
      ...mockNewsList[newsIndex],
      deleted: true,
      deletedAt: new Date().toISOString()
    };
    
    // 保存到localStorage
    localStorage.setItem('mockNews', JSON.stringify(mockNewsList));
    
    return true;
  } catch (error) {
    console.error('Failed to delete news:', error);
    throw error;
  }
};

// 获取新闻列表（过滤已删除的新闻）
export const getNewsList = (includeDeleted = false) => {
  if (includeDeleted) {
    return [...mockNewsList];
  }
  return mockNewsList.filter(news => !news.deleted);
};

// 根据ID获取新闻
export const getNewsById = (newsId, includeDeleted = false) => {
  const news = mockNewsList.find(news => news.id === newsId);
  if (!news || (news.deleted && !includeDeleted)) {
    return null;
  }
  return { ...news };
};

// 删除评论并重新计算投票得分
export const deleteCommentById = (newsId, commentId, isAdmin = false) => {
  try {
    if (!isAdmin) {
      throw new Error('Unauthorized: Only administrators can delete comments');
    }
    
    const newsIndex = mockNewsList.findIndex(news => news.id === newsId);
    
    if (newsIndex === -1) {
      throw new Error('News not found');
    }
    
    const news = mockNewsList[newsIndex];
    if (!news.comments || !Array.isArray(news.comments)) {
      throw new Error('Comments not found');
    }
    
    // 找到要删除的评论
    const commentIndex = news.comments.findIndex(comment => comment.id === commentId);
    
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }
    
    // 获取要删除的评论的投票类型
    const commentToDelete = news.comments[commentIndex];
    const deletedVoteType = commentToDelete.vote;
    
    // 删除评论
    news.comments = news.comments.filter(comment => comment.id !== commentId);
    
    // 重新计算投票得分
    const updatedVotes = {
      fake: 0,
      notFake: 0,
      undetermined: 0
    };
    
    // 根据剩余评论重新计算投票
    news.comments.forEach(comment => {
      if (updatedVotes.hasOwnProperty(comment.vote)) {
        updatedVotes[comment.vote]++;
      }
    });
    
    // 更新新闻的投票数据
    mockNewsList[newsIndex] = {
      ...mockNewsList[newsIndex],
      comments: news.comments,
      votes: updatedVotes,
      lastUpdated: new Date().toISOString()
    };
    
    // 保存到localStorage
    localStorage.setItem('mockNews', JSON.stringify(mockNewsList));
    
    return {
      success: true,
      deletedVoteType,
      updatedVotes
    };
  } catch (error) {
    console.error('Failed to delete comment:', error);
    throw error;
  }
};

// 获取评论详情
export const getCommentById = (newsId, commentId) => {
  const news = mockNewsList.find(news => news.id === newsId);
  if (!news || !news.comments) {
    return null;
  }
  return news.comments.find(comment => comment.id === commentId) || null;
};

// 创建新新闻
export const createNews = (newsData, reporterId) => {
  try {
    // 生成新的新闻ID（使用现有最大ID+1）
    const maxId = mockNewsList.reduce((max, news) => news.id > max ? news.id : max, 0);
    const newId = maxId + 1;
    
    // 创建新新闻对象
    const newNews = {
      id: newId,
      topic: newsData.topic || '',
      shortDetail: newsData.shortDetail || '',
      fullDetail: newsData.fullDetail || '',
      status: 'pending', // 初始状态为待审核
      reporter: {
        id: reporterId,
        name: newsData.reporterName || 'Unknown Reporter'
      },
      dateTime: new Date().toISOString(),
      image: newsData.image || null,
      votes: {
        fake: 0,
        notFake: 0,
        undetermined: 0
      },
      comments: [],
      deleted: false,
      lastUpdated: new Date().toISOString()
    };
    
    // 添加到模拟数据列表
    mockNewsList.unshift(newNews); // 添加到列表开头，使最新的新闻显示在前面
    
    // 保存到localStorage
    localStorage.setItem('mockNews', JSON.stringify(mockNewsList));
    
    return {
      success: true,
      news: newNews
    };
  } catch (error) {
    console.error('Failed to create news:', error);
    throw error;
  }
};

// 初始化mockNews数据（从localStorage读取或使用默认数据）
const initMockNews = () => {
  const savedNews = localStorage.getItem('mockNews');
  if (savedNews) {
    try {
      const parsedNews = JSON.parse(savedNews);
      if (Array.isArray(parsedNews)) {
        mockNewsList.length = 0;
        mockNewsList.push(...parsedNews);
      }
    } catch (error) {
      console.error('Failed to load mock news from localStorage:', error);
    }
  }
};

// 初始化mockNews数据
initMockNews();