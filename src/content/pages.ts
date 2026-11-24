// Page copy for both languages. Factual statements come from the source website;
// wording was edited for clarity only. Items needing clinic review are marked REVIEW.
import type { Lang, PageKey, ServiceKey } from "./site";

export type Meta = { title: string; description: string; h1: string; intro: string };

export const FINDER_OPTIONS = ["general", "cosmetic", "implant", "surgical"] as const satisfies readonly ServiceKey[];
export const FIRST_VISIT_STEPS = ["contact", "confirm", "prepare", "visit"] as const;

export const PATIENT_INTERACTIONS = {
  en: {
    finder: {
      eyebrow: "FIND YOUR DENTAL CARE", title: "What brings you here today?",
      description: "Explore our dental services based on what you're looking for. Select a topic to learn more about the care available at our clinic.",
      explore: "Explore This Service", contact: "Contact Our Clinic",
      disclaimer: "This guide is for general service information only and does not provide a diagnosis or treatment recommendation.",
      options: {
        general: { label: "Routine Checkup & Cleaning", title: "General Dentistry", description: "Learn about routine dental care, professional cleanings, fillings, crowns, and other general dental services." },
        cosmetic: { label: "Improve My Smile", title: "Cosmetic Dentistry", description: "Explore cosmetic dental services such as teeth whitening, orthodontic treatment, and other smile-enhancing options offered by our clinic." },
        implant: { label: "Replace Missing Teeth", title: "Dental Implants", description: "Learn about dental implants and the consultation process for patients considering tooth replacement options." },
        surgical: { label: "Surgical Dental Care", title: "Surgical Dentistry", description: "Explore information about periodontal procedures, wisdom tooth extraction, and other surgical dental services available at our clinic." },
      },
    },
    journey: {
      eyebrow: "YOUR FIRST VISIT", title: "Getting Started Is Simple",
      description: "New to our clinic? Here's a simple overview of how to get in touch and prepare for your first dental visit.",
      question: "Questions Before Your First Visit?", contact: "Contact Our Clinic",
      steps: {
        contact: { title: "Get in Touch", description: "Contact our clinic by phone or through the existing website inquiry options to discuss your appointment needs." },
        confirm: { title: "Confirm Your Appointment", description: "Our team can help you with appointment-related questions and provide confirmation of your visit through the clinic's existing scheduling process. Submitting a website inquiry does not confirm an appointment." },
        prepare: { title: "Prepare for Your Visit", description: "Before your visit, you may wish to have your dental insurance information and relevant questions ready. Contact the clinic if you need guidance on what to bring." },
        visit: { title: "Visit Our Clinic", description: "Visit our Kerrisdale location at your confirmed appointment time. Our team will assist you with the next steps of your visit." },
      },
    },
  },
  zh: {
    finder: {
      eyebrow: "探索牙科服務", title: "今天想了解哪方面的牙科服務？",
      description: "根據您的需求探索診所提供的牙科服務。選擇感興趣的項目，即可進一步了解相關服務內容。",
      explore: "了解這項服務", contact: "聯絡診所",
      disclaimer: "本導覽僅供了解一般牙科服務，不構成醫療診斷或個人治療建議。",
      options: {
        general: { label: "定期檢查與洗牙", title: "一般牙科", description: "了解定期牙齒檢查、專業洗牙、補牙、牙冠及其他一般牙科服務。" },
        cosmetic: { label: "改善笑容與牙齒外觀", title: "美容牙科", description: "探索牙齒美白、牙齒矯正及診所提供的其他美容牙科服務。" },
        implant: { label: "了解缺牙重建方式", title: "植牙服務", description: "了解植牙療程及缺牙患者可進一步諮詢的相關資訊。" },
        surgical: { label: "了解牙科手術服務", title: "牙科手術", description: "了解牙周治療、智慧齒拔除，以及診所提供的其他牙科手術服務。" },
      },
    },
    journey: {
      eyebrow: "初診指南", title: "輕鬆開始您的首次看診",
      description: "第一次來到我們的診所嗎？透過以下簡單步驟，了解如何聯絡診所並為首次看診做好準備。",
      question: "首次看診前有任何疑問嗎？", contact: "聯絡診所",
      steps: {
        contact: { title: "聯絡診所", description: "您可以透過電話或網站現有的聯絡方式，向診所詢問預約及看診相關事項。" },
        confirm: { title: "確認看診安排", description: "診所團隊可協助解答預約相關問題，並透過診所現有的預約流程確認看診安排。提交網站查詢並不代表已確認預約。" },
        prepare: { title: "準備看診", description: "看診前可先準備牙科保險資料及想詢問的問題。如不確定需要攜帶哪些資料，歡迎事先聯絡診所確認。" },
        visit: { title: "前往診所", description: "依照確認的預約時間前往 Kerrisdale 診所，團隊將協助您了解接下來的看診流程。" },
      },
    },
  },
} as const;

export const META: Record<PageKey, Record<Lang, Meta>> = {
  home: {
    en: {
      title: "Dr. Joyce Wu Dental Kerrisdale | Dentist on Balsam St, Vancouver",
      description:
        "General, cosmetic, surgical and implant dentistry at Dr. Joyce Wu Dental Kerrisdale, 5763 Balsam St, Vancouver. Call +1 604-263-1878 to arrange your visit.",
      h1: "Thoughtful Dental Care in the Heart of Kerrisdale.",
      intro:
        "Discover general, cosmetic, surgical, and implant dentistry at Dr. Joyce Wu Dental Kerrisdale in Vancouver. Explore our services and contact our team to arrange your visit.",
    },
    zh: {
      title: "Dr. Joyce Wu Dental Kerrisdale｜溫哥華 Kerrisdale 牙科診所",
      description:
        "Dr. Joyce Wu Dental Kerrisdale 位於溫哥華 5763 Balsam St，提供一般牙科、美容牙科、牙科手術及植牙服務。歡迎致電 604-263-1878 安排看診。",
      h1: "用心呵護每一個笑容，從溫哥華 Kerrisdale 開始。",
      intro:
        "Dr. Joyce Wu Dental Kerrisdale 提供一般牙科、美容牙科、牙科手術及植牙服務。了解我們的診所與治療項目，歡迎聯絡團隊安排看診。",
    },
  },
  about: {
    en: {
      title: "About & Office Policy | Dr. Joyce Wu Dental Kerrisdale",
      description:
        "Payment options, dental insurance, BC Healthy Kids, Canada Dental Care Plan and cancellation policy at Dr. Joyce Wu Dental Kerrisdale in Vancouver.",
      h1: "About Our Clinic",
      intro:
        "Practical information for your visit: how we handle payment, insurance, the Canada Dental Care Plan, and appointment changes.",
    },
    zh: {
      title: "關於診所及診所政策｜Dr. Joyce Wu Dental Kerrisdale",
      description: "了解 Dr. Joyce Wu Dental Kerrisdale 的付款方式、牙科保險、BC Healthy Kids、加拿大牙科護理計劃及取消預約政策。",
      h1: "關於診所",
      intro: "看診前的實用資訊：付款方式、牙科保險、加拿大牙科護理計劃，以及更改或取消預約的安排。",
    },
  },
  team: {
    en: {
      title: "Our Dental Team | Dr. Joyce Wu Dental Kerrisdale",
      description: "Meet the dentists at Dr. Joyce Wu Dental Kerrisdale: Dr. Joyce Wu DDS, Dr. Miles Chu D.M.D., Dr. Cindy Wang D.M.D. and Dr. Sherry Liu D.M.D.",
      h1: "Meet Our Doctors",
      intro: "Four dentists caring for patients at our Balsam Street office in Kerrisdale.",
    },
    zh: {
      title: "醫師團隊｜Dr. Joyce Wu Dental Kerrisdale",
      description: "認識 Dr. Joyce Wu Dental Kerrisdale 的牙醫團隊：Dr. Joyce Wu DDS、Dr. Miles Chu D.M.D.、Dr. Cindy Wang D.M.D. 及 Dr. Sherry Liu D.M.D.。",
      h1: "認識我們的醫師",
      intro: "四位牙醫在我們位於 Kerrisdale Balsam Street 的診所為您服務。",
    },
  },
  general: {
    en: {
      title: "General Dentistry in Kerrisdale, Vancouver | Cleanings, Fillings, Root Canals",
      description:
        "Teeth cleaning, tooth-coloured fillings, crowns and bridges, root canal treatment, dentures and night guards at Dr. Joyce Wu Dental Kerrisdale.",
      h1: "General Dentistry",
      intro: "Everyday care that protects your teeth and gums — from professional cleanings to restorations, root canal treatment and dentures.",
    },
    zh: {
      title: "一般牙科｜洗牙、補牙、根管治療｜Dr. Joyce Wu Dental Kerrisdale",
      description: "Dr. Joyce Wu Dental Kerrisdale 提供洗牙、牙齒顏色填充、牙冠牙橋、根管治療、假牙及夜間護齒器等一般牙科服務。",
      h1: "一般牙科",
      intro: "守護牙齒與牙齦健康的日常護理——由專業洗牙、修復治療、根管治療到假牙。",
    },
  },
  cosmetic: {
    en: {
      title: "Cosmetic Dentistry in Kerrisdale | Orthodontics, Bioclear, Whitening",
      description:
        "Orthodontic treatment with braces or clear aligners, Bioclear, cosmetic Botox and take-home teeth whitening at Dr. Joyce Wu Dental Kerrisdale, Vancouver.",
      h1: "Cosmetic Dentistry",
      intro: "Options to improve the alignment, shape and shade of your smile, discussed with you after an assessment of your oral health.",
    },
    zh: {
      title: "美容牙科｜牙齒矯正、Bioclear、牙齒美白｜Dr. Joyce Wu Dental Kerrisdale",
      description: "Dr. Joyce Wu Dental Kerrisdale 提供傳統牙套及透明矯正器、Bioclear、肉毒桿菌素 (Botox) 及居家牙齒美白服務。",
      h1: "美容牙科",
      intro: "改善牙齒排列、形態與色澤的治療選擇，醫師會在評估您的口腔健康後與您詳細討論。",
    },
  },
  surgical: {
    en: {
      title: "Surgical Dentistry in Kerrisdale | Gum Treatment, Bone Graft, Wisdom Teeth",
      description:
        "Periodontal deep cleaning, gum grafting, periodontal flap surgery, bone grafting and wisdom tooth extraction at Dr. Joyce Wu Dental Kerrisdale.",
      h1: "Surgical Dentistry",
      intro: "Periodontal and oral surgical procedures. Whether a procedure is appropriate for you is determined after a clinical examination.",
    },
    zh: {
      title: "牙科手術｜牙周治療、骨移植、智齒拔除｜Dr. Joyce Wu Dental Kerrisdale",
      description: "Dr. Joyce Wu Dental Kerrisdale 提供牙周深層清潔、牙齦移植、牙周瓣手術、骨移植及智齒拔除。",
      h1: "牙科手術",
      intro: "牙周及口腔外科治療。是否適合進行某項治療，需經醫師臨床檢查後決定。",
    },
  },
  implant: {
    en: {
      title: "Dental Implants in Kerrisdale, Vancouver | Nobel Biocare | Dr. Joyce Wu Dental",
      description:
        "Learn about dental implants at Dr. Joyce Wu Dental Kerrisdale. Dr. Miles Chu offers Nobel Biocare implants to replace missing teeth. Book a consultation.",
      h1: "Dental Implants",
      intro: "A fixed way to replace missing teeth, supported by an artificial root placed in the jawbone.",
    },
    zh: {
      title: "植牙｜Nobel Biocare 植體｜Dr. Joyce Wu Dental Kerrisdale",
      description: "了解 Dr. Joyce Wu Dental Kerrisdale 的植牙服務。Dr. Miles Chu 為患者提供 Nobel Biocare 植體，歡迎預約諮詢。",
      h1: "植牙",
      intro: "以植入顎骨的人造牙根作為支撐，固定地修復缺失牙齒。",
    },
  },
  faq: {
    en: {
      title: "Dental FAQ | Check-ups, Cavities, X-rays & Costs | Dr. Joyce Wu Dental",
      description:
        "Answers to common questions about check-up frequency, preventing cavities, braces alternatives, gum disease, dental X-rays and cleaning costs.",
      h1: "Frequently Asked Questions",
      intro: "Straightforward answers to questions our patients often ask. For advice about your own situation, please speak with your dentist.",
    },
    zh: {
      title: "常見問題｜牙科檢查、蛀牙、X光及費用｜Dr. Joyce Wu Dental Kerrisdale",
      description: "關於定期檢查、預防蛀牙、矯正選擇、牙周病、牙科X光及洗牙費用的常見問題解答。",
      h1: "常見問題",
      intro: "患者經常詢問的問題解答。如需針對個人情況的建議，請與您的牙醫討論。",
    },
  },
  cdcp: {
    en: {
      title: "Canada Dental Care Plan (CDCP) Accepted | Dr. Joyce Wu Dental Kerrisdale",
      description: "Dr. Joyce Wu Dental Kerrisdale accepts the Canada Dental Care Plan (CDCP). Find official eligibility information and contact our Vancouver office.",
      h1: "Canada Dental Care Plan",
      intro: "Our office gladly accepts the Canada Dental Care Plan (CDCP).",
    },
    zh: {
      title: "接受加拿大牙科護理計劃 (CDCP)｜Dr. Joyce Wu Dental Kerrisdale",
      description: "Dr. Joyce Wu Dental Kerrisdale 接受加拿大牙科護理計劃 (CDCP)。查看官方資格資訊並聯絡我們的溫哥華診所。",
      h1: "加拿大牙科護理計劃",
      intro: "我們診所欣然接受加拿大牙科護理計劃（CDCP）。",
    },
  },
  contact: {
    en: {
      title: "Contact & Directions | Dr. Joyce Wu Dental Kerrisdale, 5763 Balsam St",
      description: "Call +1 604-263-1878, email or visit Dr. Joyce Wu Dental Kerrisdale at 5763 Balsam St, Vancouver. Opening hours, map and appointment inquiry form.",
      h1: "Contact Our Clinic",
      intro: "Call, email or send an inquiry and our team will follow up to arrange a suitable time.",
    },
    zh: {
      title: "聯絡我們及交通路線｜Dr. Joyce Wu Dental Kerrisdale",
      description: "致電 604-263-1878、發送電郵或親臨 5763 Balsam St, Vancouver。查看營業時間、地圖及預約查詢表格。",
      h1: "聯絡我們",
      intro: "歡迎致電、發送電郵或填寫查詢表格，我們的團隊會與您聯絡安排合適的時間。",
    },
  },
};

export type ServiceSection = {
  id: string;
  title: string;
  body: string[];
  sub?: { title: string; body: string }[];
  image?: { src: string; alt: string; w: number; h: number };
  note?: string;
};

export type ServiceContent = { card: string; image: string; sections: ServiceSection[] };

export const SERVICES: Record<ServiceKey, Record<Lang, ServiceContent>> = {
  general: {
    en: {
      card: "Cleanings, tooth-coloured fillings, crowns and bridges, root canal treatment and dentures.",
      image: "/images/teeth-cleaning.webp",
      sections: [
        {
          id: "teeth-cleaning",
          title: "Teeth Cleaning",
          body: [
            "Professional cleanings performed by dental hygienists reach areas that are difficult to clean with regular brushing and flossing alone, so buildup can be thoroughly removed.",
            "Regular cleanings also let your dentist spot early signs of problems such as decay or gum inflammation, so they can be addressed before they become more serious. Keeping up with cleanings helps protect both your smile and your long-term oral health.",
          ],
          image: { src: "/images/teeth-cleaning.webp", alt: "Hygienist performing a professional dental cleaning on a smiling patient", w: 1448, h: 1086 },
        },
        {
          id: "restorative-dentistry",
          title: "Restorative Dentistry",
          body: [],
          sub: [
            {
              title: "Tooth-Coloured Fillings",
              body: "Tooth-coloured fillings, also known as composite fillings, blend with the natural colour of your teeth, offering a discreet way to restore teeth affected by cavities.",
            },
            {
              title: "Crowns and Bridges",
              body: "Dental crowns and bridges are custom restorations designed to restore the form and function of damaged or missing teeth with a durable, natural-looking result.",
            },
          ],
          image: { src: "/images/tooth-colored-fillings.webp", alt: "Close-up of a tooth-coloured composite filling being placed on a molar", w: 560, h: 420 },
        },
        {
          id: "endodontics",
          title: "Root Canal Treatment (Endodontics)",
          body: [
            "Endodontic treatment, commonly known as a root canal, removes infected or damaged pulp from inside the tooth, then cleans and seals the tooth's interior.",
            "The procedure helps relieve pain, save the natural tooth and prevent further infection.",
          ],
          image: { src: "/images/root-canal-endodontics.webp", alt: "Clear tooth model showing the root canal and nerve", w: 560, h: 420 },
        },
        {
          id: "prosthodontics",
          title: "Dentures & Night Guards (Prosthodontics)",
          body: [
            "We offer prosthodontic solutions such as removable partial dentures, complete dentures and custom night guards, among others.",
          ],
          image: { src: "/images/crown-bridge.webp", alt: "Ceramic dental bridge placed over prepared teeth on a model", w: 560, h: 420 },
        },
      ],
    },
    zh: {
      card: "洗牙、牙齒顏色填充、牙冠牙橋、根管治療及假牙。",
      image: "/images/teeth-cleaning.webp",
      sections: [
        {
          id: "teeth-cleaning",
          title: "牙齒清潔",
          body: [
            "由牙科衛生員進行的專業清潔，可以處理日常刷牙及使用牙線難以清潔的位置，徹底清除牙垢。",
            "定期清潔亦讓牙醫及早發現蛀牙或牙齦發炎等問題的徵兆，在問題惡化前及時處理。持續定期洗牙，有助長期保持笑容及整體口腔健康。",
          ],
          image: { src: "/images/teeth-cleaning.webp", alt: "牙科衛生師為微笑的病人進行專業洗牙", w: 1448, h: 1086 },
        },
        {
          id: "restorative-dentistry",
          title: "修復牙科",
          body: [],
          sub: [
            { title: "牙齒顏色填充", body: "牙齒顏色填充物（又稱複合樹脂填充物）能與天然牙色自然融合，以低調美觀的方式修復蛀牙。" },
            { title: "牙冠／牙橋", body: "牙冠和牙橋是度身訂造的修復方案，用以恢復受損或缺失牙齒的形態與功能，耐用且外觀自然。" },
          ],
          image: { src: "/images/tooth-colored-fillings.webp", alt: "臼齒上牙齒顏色樹脂填充的特寫", w: 560, h: 420 },
        },
        {
          id: "endodontics",
          title: "根管治療",
          body: ["牙髓治療，一般稱為根管治療，是清除牙齒內受感染或受損的牙髓，再徹底清潔並密封牙齒內部。", "此治療有助緩解疼痛、保留天然牙齒，並防止感染進一步擴散。"],
          image: { src: "/images/root-canal-endodontics.webp", alt: "展示牙根管與神經的透明牙齒模型", w: 560, h: 420 },
        },
        {
          id: "prosthodontics",
          title: "假牙及護齒器（義齒修復）",
          body: ["我們提供可拆式局部假牙、全口假牙、定制夜間護齒器等多種義齒修復方案。"],
          image: { src: "/images/crown-bridge.webp", alt: "放在牙齒模型上的陶瓷牙橋", w: 560, h: 420 },
        },
      ],
    },
  },
  cosmetic: {
    en: {
      card: "Orthodontic treatment, Bioclear, cosmetic Botox and take-home teeth whitening.",
      image: "/images/teeth-whitening-tray.webp",
      sections: [
        {
          id: "orthodontic-treatment",
          title: "Orthodontic Treatment",
          body: [
            "Orthodontic treatment corrects misaligned teeth and bite issues, improving both oral function and appearance. Whether through traditional braces or clear aligner systems, treatment can help patients achieve a straighter smile with improved bite alignment.",
            "Our doctors have extensive experience with both traditional braces and clear aligner systems. Contact us to find out which option may be right for you.",
          ],
          image: { src: "/images/orthodontic-treatment.webp", alt: "Patient smiling while a dentist shows her clear aligners", w: 1448, h: 1086 },
        },
        {
          id: "bioclear",
          title: "Bioclear",
          body: [
            "The Bioclear system is a minimally invasive approach to cosmetic dentistry. It uses modern dental materials and techniques to address concerns such as gaps, chips and discolouration without extensive tooth reduction.",
          ],
          image: { src: "/images/bioclear-treatment.webp", alt: "Clear Bioclear matrix fitted over a front tooth", w: 560, h: 420 },
        },
        {
          id: "botox",
          title: "Botox",
          body: [
            "Cosmetic Botox injections are a non-surgical option for reducing the appearance of wrinkles and fine lines. By temporarily relaxing the muscles responsible for facial expressions, Botox can create a smoother appearance with minimal downtime.",
            "Please contact our office to ask about a Botox consultation.",
          ],
          image: { src: "/images/botox.webp", alt: "Botox onabotulinumtoxinA logo", w: 585, h: 221 },
        },
        {
          id: "teeth-whitening",
          title: "Teeth Whitening",
          body: [
            "We offer customized take-home whitening kits. With custom-fitted trays and professional-grade whitening gel, take-home kits brighten your smile gradually and conveniently at home.",
          ],
          image: { src: "/images/teeth-whitening-tray.webp", alt: "Custom clear whitening trays with whitening gel syringe", w: 560, h: 420 },
        },
      ],
    },
    zh: {
      card: "牙齒矯正、Bioclear、肉毒桿菌素 (Botox) 及居家牙齒美白。",
      image: "/images/teeth-whitening-tray.webp",
      sections: [
        {
          id: "orthodontic-treatment",
          title: "牙齒矯正治療",
          body: [
            "牙齒矯正治療旨在改善牙齒不齊及咬合問題，提升口腔功能與美觀。無論是傳統牙套或透明矯正器，都能幫助患者獲得更整齊的牙齒和更理想的咬合。",
            "我們的醫師在傳統牙套及透明矯正器方面均有豐富經驗。歡迎聯絡我們，了解哪種方案可能適合您。",
          ],
          image: { src: "/images/orthodontic-treatment.webp", alt: "牙醫向微笑的病人展示隱形牙套", w: 1448, h: 1086 },
        },
        {
          id: "bioclear",
          title: "Bioclear",
          body: ["Bioclear 系統是一種微創的美容牙科方法，運用先進的牙科材料與技術，處理牙縫、缺角及變色等問題，而無需大幅磨除牙齒。"],
          image: { src: "/images/bioclear-treatment.webp", alt: "套在門牙上的 Bioclear 透明牙模", w: 560, h: 420 },
        },
        {
          id: "botox",
          title: "肉毒桿菌素 (Botox)",
          body: [
            "美容用肉毒桿菌素注射是一種非手術治療，可減淡面部皺紋及細紋。透過暫時放鬆控制面部表情的肌肉，使外觀更平滑，且恢復時間短。",
            "如欲了解 Botox 諮詢詳情，請聯絡我們診所。",
          ],
          image: { src: "/images/botox.webp", alt: "Botox 標誌", w: 585, h: 221 },
        },
        {
          id: "teeth-whitening",
          title: "牙齒美白",
          body: ["我們為患者提供定制的居家美白套裝。配合度身訂造的牙托及專業級美白凝膠，讓您在家中輕鬆、逐步地亮白笑容。"],
          image: { src: "/images/teeth-whitening-tray.webp", alt: "定制透明美白牙托及美白凝膠", w: 560, h: 420 },
        },
      ],
    },
  },
  surgical: {
    en: {
      card: "Periodontal deep cleaning, gum and bone grafting, flap surgery and wisdom tooth extraction.",
      image: "/images/wisdom-tooth-xray.webp",
      sections: [
        {
          id: "periodontics",
          title: "Periodontics",
          body: [],
          sub: [
            {
              title: "Deep Cleaning",
              body: "Deep cleaning treats periodontal disease, an infection of the gums and bone that support your teeth. Unlike a regular cleaning, it removes tartar, plaque and toxins from the teeth and gums, and is typically done with local anesthetic.",
            },
            {
              title: "Gum Grafting",
              body: "Gum grafting addresses receding gums and helps prevent further recession. Tissue from the roof of the mouth or a donor source is used to augment the gum where it has receded. Gum grafts can improve appearance, reduce tooth sensitivity and help protect against tooth loss caused by recession.",
            },
            {
              title: "Periodontal Flap Surgery",
              body: "Periodontal flap surgery treats advanced gum disease by accessing the roots of the teeth. The gums are lifted back so tartar and bacteria can be removed from the roots, then repositioned for healing. It can help halt the progression of gum disease and support healthy gum tissue.",
            },
          ],
        },
        {
          id: "bone-graft",
          title: "Bone Grafting",
          body: [
            "Dental bone grafting increases the volume and density of the jawbone. It is often needed before implant surgery so there is enough bone to support the implant. Graft material is placed in the deficient area to stimulate new bone growth.",
          ],
          image: { src: "/images/bone-graft.webp", alt: "Illustration of bone graft material placed in the jaw, with a vial of graft material", w: 585, h: 215 },
        },
        {
          id: "wisdom-tooth-extraction",
          title: "Wisdom Tooth Extraction",
          body: [
            "Wisdom tooth extraction removes the third set of molars. It is often recommended because of impaction, crowding or infection, and is typically carried out under local or general anesthesia by an oral surgeon or dentist.",
          ],
          image: { src: "/images/wisdom-tooth-xray.webp", alt: "Panoramic dental X-ray showing wisdom teeth", w: 585, h: 444 },
        },
      ],
    },
    zh: {
      card: "牙周深層清潔、牙齦及骨移植、牙周瓣手術及智齒拔除。",
      image: "/images/wisdom-tooth-xray.webp",
      sections: [
        {
          id: "periodontics",
          title: "牙周病治療",
          body: [],
          sub: [
            { title: "深層清潔", body: "深層清潔用於治療牙周病，即支撐牙齒的牙齦及骨骼受到感染。與一般洗牙不同，深層清潔會清除牙齒及牙齦上的牙石、牙菌斑和毒素，通常在局部麻醉下進行。" },
            { title: "牙齦移植", body: "牙齦移植用於處理牙齦萎縮，並防止進一步萎縮。手術會取用上顎或捐贈來源的組織，補強已萎縮的牙齦。牙齦移植可改善笑容外觀、減少牙齒敏感，並有助降低因牙齦萎縮而導致牙齒脫落的風險。" },
            { title: "牙周瓣手術", body: "牙周瓣手術用於治療較嚴重的牙周病。手術時會翻開牙齦以接觸牙根，清除牙根上的牙石和細菌，再將牙齦復位以促進癒合，有助阻止牙周病惡化並促進健康牙齦組織。" },
          ],
        },
        {
          id: "bone-graft",
          title: "骨移植",
          body: ["牙科骨移植用以增加顎骨的體積和密度，通常在植牙手術前進行，以確保有足夠骨量支撐植體。手術會將骨移植材料放置於骨量不足的位置，以刺激新骨生長。"],
          image: { src: "/images/bone-graft.webp", alt: "骨移植材料放置於顎骨的示意圖", w: 585, h: 215 },
        },
        {
          id: "wisdom-tooth-extraction",
          title: "智齒拔除",
          body: ["智齒拔除是移除第三大臼齒（即智齒）的手術，常因阻生、擠迫或感染而建議進行，一般由口腔外科醫生或牙醫在局部或全身麻醉下進行。"],
          image: { src: "/images/wisdom-tooth-xray.webp", alt: "顯示智齒的全景牙科X光片", w: 585, h: 444 },
        },
      ],
    },
  },
  implant: {
    en: {
      card: "Replacement of missing teeth with Nobel Biocare implants, offered by Dr. Miles Chu.",
      image: "/images/dental-implant-nobel-biocare.webp",
      sections: [
        {
          id: "what-are-dental-implants",
          title: "What Are Dental Implants?",
          body: [
            "Dental implants are artificial tooth roots made of biocompatible materials such as titanium. They are surgically placed in the jawbone to support dental prosthetics such as crowns, bridges or dentures.",
          ],
          image: { src: "/images/dental-implant-nobel-biocare.webp", alt: "Dentist explaining a dental implant using a cross-section model", w: 1448, h: 1086 },
        },
        {
          id: "purpose",
          title: "The Purpose of Implant Treatment",
          body: [
            "Once an implant integrates with the jawbone through a process called osseointegration, it provides a stable, long-lasting foundation for replacement teeth, helping restore both function and appearance.",
            "With proper care and maintenance, dental implants can offer a durable solution for missing teeth.",
          ],
        },
        {
          id: "considerations",
          title: "General Treatment Considerations",
          body: [
            "Implant treatment begins with an assessment of your oral health. In some cases additional bone is needed to support an implant, and bone grafting may be recommended beforehand — see our Surgical Dentistry page.",
          ],
        },
        {
          id: "dr-miles-chu",
          title: "Dr. Miles Chu & Nobel Biocare",
          body: [
            "Dr. Miles Chu has extensive experience and training in dental implants, and is proud to offer Nobel Biocare implants to his patients.",
            "Nobel Biocare is a leading dental implant brand known for its quality materials and innovative design, and is trusted by dental professionals worldwide.",
          ],
        },
      ],
    },
    zh: {
      card: "由 Dr. Miles Chu 提供 Nobel Biocare 植體，修復缺失牙齒。",
      image: "/images/dental-implant-nobel-biocare.webp",
      sections: [
        {
          id: "what-are-dental-implants",
          title: "甚麼是植牙？",
          body: ["牙齒植體是以鈦等生物相容材料製成的人造牙根，經手術植入顎骨，用以支撐牙冠、牙橋或假牙等修復體。"],
          image: { src: "/images/dental-implant-nobel-biocare.webp", alt: "牙醫以植牙剖面模型向病人講解", w: 1448, h: 1086 },
        },
        {
          id: "purpose",
          title: "植牙的作用",
          body: ["植體透過「骨整合」與顎骨結合後，可為替代牙齒提供穩固而持久的基礎，幫助恢復咀嚼功能及外觀。", "只要妥善護理和定期保養，植牙可以是修復缺牙的耐用方案。"],
        },
        {
          id: "considerations",
          title: "治療前的一般考慮",
          body: ["植牙治療由評估口腔健康開始。部分情況下需要更多骨量支撐植體，醫師或會建議先進行骨移植——詳情請參閱牙科手術頁面。"],
        },
        {
          id: "dr-miles-chu",
          title: "Dr. Miles Chu 與 Nobel Biocare",
          body: ["Dr. Miles Chu 在植牙方面擁有豐富的經驗與培訓，並為患者提供 Nobel Biocare 植體。", "Nobel Biocare 是領先的植體品牌，以優質材料和創新設計見稱，深受全球牙科專業人士信賴。"],
        },
      ],
    },
  },
};

export type Faq = { id: string; q: string; a: string[]; list?: { t: string; d: string }[]; after?: string[]; link?: { href: string; label: string }; image?: boolean; review?: string };

export const FAQS: Record<Lang, Faq[]> = {
  en: [
    { id: "check-up-frequency", q: "How often should I visit the dentist for a check-up?", a: ["It is generally recommended to visit the dentist every six months for a routine check-up and cleaning. However, the frequency may vary depending on your oral health needs. Your dentist can provide personalized recommendations based on your specific circumstances."] },
    { id: "prevent-cavities", q: "What can I do to prevent cavities?", a: ["To prevent cavities, it is essential to practise good oral hygiene. This includes brushing at least twice a day with fluoride toothpaste, flossing daily, and limiting sugary snacks and drinks. Regular dental check-ups and professional cleanings are also crucial for early detection and prevention of cavities."] },
    { id: "braces-alternatives", q: "Are there any alternatives to metal braces for straightening teeth?", a: ["Yes, there are alternatives to traditional metal braces. Invisalign is a popular option that uses clear, removable aligners to gradually straighten teeth. Other options include ceramic braces, which are tooth-coloured and less noticeable. Consult with your dentist or orthodontist to determine the best treatment option for your specific needs."] },
    { id: "gum-disease", q: "What are the signs of gum disease, and how can it be treated?", a: ["Signs of gum disease include red, swollen or bleeding gums, persistent bad breath, receding gums and loose teeth. If left untreated, gum disease can lead to tooth loss and other complications. Treatment options may include professional deep cleaning (scaling and root planing), antibiotic therapy and improved oral hygiene practices."] },
    { id: "improve-smile", q: "What can I do to improve the appearance of my smile?", a: ["There are various cosmetic dentistry procedures available to enhance the appearance of your smile, including teeth whitening, veneers, dental bonding and dental implants. Your dentist can assess your oral health and discuss the most suitable treatment options for you."] },
    {
      id: "check-up-cost",
      q: "How much do dental check-ups and cleanings cost?",
      a: [
        "The cost of a check-up and cleaning can vary widely depending on the condition of your teeth and whether you have dental insurance. At Dr. Joyce Wu Dental, we follow the Fee Guide set by the BC Dental Association, which is updated annually.",
        "As previously published by our office, one session can cost between $300 and $400 without insurance. A regular session consists of an exam by a dentist, diagnostic X-rays, scaling/root planing, polish and fluoride treatment. A one-hour session of teeth cleaning costs around $220.",
        "A check-up and cleaning is recommended once every six months. Patients on periodontal maintenance schedules (to help prevent further advancement of periodontal disease) may have cleanings every three months. If you have dental insurance, your out-of-pocket costs may be significantly lower. Please contact our office or your insurance provider for current pricing based on your situation.",
      ],
      review: "Published price estimates — clinic to confirm current figures.",
    },
    {
      id: "why-x-rays",
      q: "Why do I need to take diagnostic X-rays?",
      a: ["Diagnostic dental X-rays are typically taken for several important reasons:"],
      list: [
        { t: "Detection of cavities", d: "X-rays can reveal cavities between teeth or beneath existing fillings, which may not be visible during a visual examination." },
        { t: "Assessment of tooth roots and jawbone", d: "X-rays let dentists see the roots of your teeth and the condition of your jawbone, helping diagnose infections, abscesses or bone loss due to gum disease." },
        { t: "Evaluation of tooth development", d: "X-rays help monitor the development of teeth in children and adolescents." },
        { t: "Planning for procedures", d: "Before procedures such as implants, extractions or orthodontic treatment, X-rays provide essential information about the structure of your teeth and jawbone." },
        { t: "Monitoring overall oral health", d: "Regular X-rays over time help dentists track changes and detect abnormalities early." },
      ],
      after: ["Dental X-rays use very low levels of radiation, and dentists take precautions to minimize exposure. The benefits of diagnostic X-rays for accurate diagnosis and treatment planning often outweigh the minimal risks."],
    },
    {
      id: "x-ray-radiation",
      q: "How much radiation am I getting from dental X-rays?",
      a: [
        "Radiation exposure from dental X-rays is considered minimal and safe when used as recommended by dental professionals. If you have concerns about radiation exposure, discussing them with your dentist can help ensure you receive appropriate care.",
        "The Government of Canada has published examples of typical radiation doses received from artificial sources of radiation.",
      ],
      link: { href: "https://www.cnsc-ccsn.gc.ca/eng/resources/radiation/radiation-doses/", label: "Canadian Nuclear Safety Commission — Radiation doses" },
      image: true,
    },
  ],
  zh: [
    { id: "check-up-frequency", q: "我應該多久看一次牙醫做檢查？", a: ["一般建議每六個月到牙醫診所進行例行檢查和洗牙，但實際頻率會因應您的口腔健康需要而有所不同。您的牙醫可按您的情況提供個人化建議。"] },
    { id: "prevent-cavities", q: "我該如何預防蛀牙？", a: ["預防蛀牙的關鍵是保持良好的口腔衛生，包括每天最少兩次使用含氟牙膏刷牙、每天使用牙線，以及減少含糖零食和飲品。定期牙科檢查及專業洗牙，對及早發現和預防蛀牙亦十分重要。"] },
    { id: "braces-alternatives", q: "除了金屬牙套，還有其他矯正牙齒的方法嗎？", a: ["有的。Invisalign 是常見的選擇，使用透明、可拆除的矯正器逐步矯正牙齒。其他選擇包括顏色接近牙齒、較不顯眼的陶瓷牙套。請與您的牙醫或矯正專科醫生商討，以確定最適合您的治療方案。"] },
    { id: "gum-disease", q: "牙周病有甚麼徵兆？應如何治療？", a: ["牙周病的徵兆包括牙齦紅腫或出血、持續口臭、牙齦萎縮及牙齒鬆動。若不及時治療，牙周病可能導致牙齒脫落及其他併發症。治療方法可包括專業深層清潔（刮治及根面平整）、抗生素治療，以及改善口腔衛生習慣。"] },
    { id: "improve-smile", q: "我可以怎樣改善笑容的外觀？", a: ["有多種美容牙科治療可改善笑容外觀，包括牙齒美白、貼片、牙齒黏合修復及植牙。您的牙醫可評估您的口腔健康，並與您討論最合適的治療方案。"] },
    {
      id: "check-up-cost",
      q: "牙科檢查和洗牙的費用是多少？",
      a: [
        "牙科檢查及洗牙的費用會因牙齒狀況及是否有牙科保險而有很大差異。Dr. Joyce Wu Dental 遵循 BC 牙科協會訂定的收費指南，該指南每年更新。",
        "根據本診所過往公佈的資料，在沒有保險的情況下，一次檢查約為 300 至 400 加元。常規檢查包括牙醫檢查、診斷性 X 光、刮治／根面平整、拋光及氟化物處理。一小時的洗牙費用約為 220 加元。",
        "建議每六個月進行一次牙科檢查及洗牙。正接受牙周維護計劃（以預防牙周病進一步惡化）的患者，可每三個月洗牙一次。如有牙科保險，自付費用可能大幅降低。請聯絡本診所或您的保險公司，了解按您情況計算的最新收費。",
      ],
      review: "已公佈的價格估算——有待診所確認最新數字。",
    },
    {
      id: "why-x-rays",
      q: "為甚麼我需要拍攝診斷性 X 光？",
      a: ["拍攝診斷性牙科 X 光通常有以下幾個重要原因："],
      list: [
        { t: "檢測蛀牙", d: "X 光能發現牙齒之間或舊有填充物下、肉眼難以看見的蛀牙。" },
        { t: "評估牙根和顎骨", d: "X 光讓牙醫檢查牙根及顎骨狀況，有助診斷感染、膿腫或牙周病引致的骨質流失。" },
        { t: "評估牙齒發育", d: "X 光有助監察兒童及青少年的牙齒發育。" },
        { t: "治療規劃", d: "在植牙、拔牙或牙齒矯正等治療前，X 光可提供牙齒及顎骨結構的重要資料。" },
        { t: "監察整體口腔健康", d: "定期拍攝 X 光有助牙醫追蹤口腔健康變化，及早發現異常。" },
      ],
      after: ["牙科 X 光的輻射量非常低，牙醫亦會採取措施將輻射暴露減至最低。診斷性 X 光有助準確診斷及規劃治療，其好處通常大於極微的風險。"],
    },
    {
      id: "x-ray-radiation",
      q: "牙科 X 光的輻射量有多少？",
      a: ["按照牙科專業建議使用時，牙科 X 光的輻射暴露被視為極低且安全。如您對輻射有疑慮，可與牙醫討論，以確保您得到合適的護理。", "加拿大政府已公佈一些人工輻射源的典型輻射劑量例子。"],
      link: { href: "https://www.cnsc-ccsn.gc.ca/eng/resources/radiation/radiation-doses/", label: "加拿大核安全委員會——輻射劑量（英文）" },
      image: true,
    },
  ],
};


/* ---------- CDCP page details (from the clinic's CDCP notice) ---------- */
export const CDCP_DETAILS = {
  en: {
    download: {
      title: "Printable CDCP notice",
      body: "The same information as a one-page bilingual notice (English / 中文) to save or print.",
      button: "Download PDF",
      meta: "PDF · 1.1 MB",
      alt: "Preview of the clinic's bilingual CDCP notice",
    },
    eligibility: {
      eyebrow: "01 · Who can apply",
      title: "Who can apply",
      items: [
        "No access to dental insurance",
        "Adjusted family net income under $90,000",
        "Canadian resident for tax purposes",
        "Filed your tax return for last year",
      ],
    },
    steps: {
      eyebrow: "02 · How it works",
      title: "How it works",
      items: [
        { title: "Apply online at canada.ca/dental", note: "All eligible Canadians can now apply. You must apply yourself — our office cannot apply on your behalf." },
        { title: "Receive your Sun Life welcome package & member card", note: "Usually within about 3 months." },
        { title: "Book your visit with us", note: "Appointments can be booked from the coverage start date shown in your welcome letter." },
      ],
      link: "Apply at canada.ca/dental",
    },
    fees: {
      eyebrow: "03 · Co-payment examples",
      title: "Co-payment examples",
      source: "2024 BCDA & CDCP fee guides",
      head: { service: "Service", fee: "BCDA fee", pays: "CDCP pays*", you: "You pay" },
      rows: [
        { service: "Recall exam", fee: "$39.50", pays: "$32.73", you: "$6.77" },
        { service: "X-rays (4 films)", fee: "$47.20", pays: "$42.14", you: "$5.06" },
        { service: "Scaling / root planing (4 units)", fee: "$223.20", pays: "$215.20", you: "$8.00" },
        { service: "Polish", fee: "$46.40", pays: "$11.15", you: "$35.25" },
        { service: "Fluoride", fee: "$23.50", pays: "$22.40", you: "$1.10" },
      ],
      note: "* CDCP coverage varies by adjusted family net income; amounts shown assume 100% coverage. Fee guides are updated yearly, so actual amounts may differ. Dr. Joyce Wu Dental Kerrisdale reserves the right of final interpretation.",
    },
  },
  zh: {
    download: {
      title: "可列印的 CDCP 通告",
      body: "以上資料的中英對照單頁版本，方便儲存或列印。",
      button: "下載 PDF",
      meta: "PDF · 1.1 MB",
      alt: "本診所中英對照 CDCP 通告預覽",
    },
    eligibility: {
      eyebrow: "01 · 申請資格",
      title: "申請資格",
      items: ["沒有任何形式的牙科保險", "家庭調整後淨收入低於 $90,000", "為加拿大納稅居民", "已完成去年的個人所得稅申報"],
    },
    steps: {
      eyebrow: "02 · 申請流程",
      title: "申請流程",
      items: [
        { title: "到加拿大政府官網 canada.ca/dental 送交申請", note: "須由本人自行申請，牙醫診所無法代為辦理。" },
        { title: "審核通過後，將收到 Sun Life 寄發的迎賓信及會員卡", note: "約需 3 個月。" },
        { title: "收到會員卡後，即可與我們預約", note: "請於迎賓信上的保險生效日後再預約。" },
      ],
      link: "前往 canada.ca/dental 申請",
    },
    fees: {
      eyebrow: "03 · 自付額參考",
      title: "自付額參考",
      source: "2024 BCDA 及 CDCP 收費指南",
      head: { service: "項目", fee: "診所收費", pays: "保險給付*", you: "自付額" },
      rows: [
        { service: "檢查", fee: "$39.50", pays: "$32.73", you: "$6.77" },
        { service: "X 光片（4 張）", fee: "$47.20", pays: "$42.14", you: "$5.06" },
        { service: "洗牙（4 單位）", fee: "$223.20", pays: "$215.20", you: "$8.00" },
        { service: "拋光", fee: "$46.40", pays: "$11.15", you: "$35.25" },
        { service: "塗氟", fee: "$23.50", pays: "$22.40", you: "$1.10" },
      ],
      note: "* 實際給付比例依家庭淨收入而定，上表以 100% 給付計算。收費標準每年調整，金額僅供參考。本診所保留最終解釋權。",
    },
  },
};
