import { MigrationInterface, QueryRunner } from 'typeorm';

type Book1Word = {
  traditional: string;
  simplified: string | null;
  pinyin: string;
  zhuyin: string;
  meaningVi: string;
  meaningEn: string | null;
  wordType: string | null;
  tocflLevel: string | null;
  strokeCount: number | null;
  lessonNumbers: number[];
};

type Book1Lesson = { lessonNumber: number; title: string };

const BOOK_CODE = 'contemporary-chinese-1';
const LESSONS: Book1Lesson[] = [
  {
    "lessonNumber": 1,
    "title": "歡迎你來臺灣！ (Welcome to Taiwan!)"
  },
  {
    "lessonNumber": 2,
    "title": "我的家人 (My Family)"
  },
  {
    "lessonNumber": 3,
    "title": "週末做什麼？ (What Are You Doing Over the Weekend?)"
  },
  {
    "lessonNumber": 4,
    "title": "請問一共多少錢？ (How Much Does That Cost in Total?)"
  },
  {
    "lessonNumber": 5,
    "title": "牛肉麵真好吃 (Beef Noodles Are Really Delicious)"
  },
  {
    "lessonNumber": 6,
    "title": "他們學校在山上 (Their School Is in the Mountains)"
  },
  {
    "lessonNumber": 7,
    "title": "早上九點去KTV (Going to KTV at 9 O'clock)"
  },
  {
    "lessonNumber": 8,
    "title": "坐火車去臺南 (Taking a Train to Tainan)"
  },
  {
    "lessonNumber": 9,
    "title": "放假去哪裡玩？ (Where Are You Going for Holidays?)"
  },
  {
    "lessonNumber": 10,
    "title": "臺灣的水果很好吃 (The Fruit in Taiwan Tastes Great)"
  },
  {
    "lessonNumber": 11,
    "title": "我要租房子 (I Would Like to Rent a Place)"
  },
  {
    "lessonNumber": 12,
    "title": "你在臺灣學多久的中文？ (How Long Have You Studied Chinese?)"
  },
  {
    "lessonNumber": 13,
    "title": "生日快樂 (Happy Birthday)"
  },
  {
    "lessonNumber": 14,
    "title": "天氣太冷了！ (The Weather Is Too Cold!)"
  },
  {
    "lessonNumber": 15,
    "title": "我很不舒服 (I Feel Uncomfortable / Health)"
  }
];
const WORDS: Book1Word[] = [
  {
    "traditional": "妳/你",
    "simplified": "你",
    "pinyin": "nǐ",
    "zhuyin": "ㄋㄧˇ",
    "meaningVi": "bạn, anh, chị",
    "meaningEn": "you",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "來",
    "simplified": "来",
    "pinyin": "lái",
    "zhuyin": "ㄌㄞˊ",
    "meaningVi": "đến, tới",
    "meaningEn": "to come",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "是",
    "simplified": "是",
    "pinyin": "shì",
    "zhuyin": "ㄕˋ",
    "meaningVi": "là",
    "meaningEn": "to be",
    "wordType": "Vst",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "小姐",
    "simplified": "小姐",
    "pinyin": "xiǎojiě",
    "zhuyin": "ㄒㄧㄠˇ ㄐㄧㄝˇ",
    "meaningVi": "cô, tiểu thư, chị",
    "meaningEn": "Miss, Ms.",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "嗎",
    "simplified": "吗",
    "pinyin": "ma",
    "zhuyin": "ㄇㄚ˙",
    "meaningVi": "không (trợ từ nghi vấn)",
    "meaningEn": "question particle",
    "wordType": "Ptc",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "接",
    "simplified": "接",
    "pinyin": "jiē",
    "zhuyin": "ㄐㄧㄝ",
    "meaningVi": "đón (ai đó)",
    "meaningEn": "to pick up (someone)",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "我們",
    "simplified": "我们",
    "pinyin": "wǒmen",
    "zhuyin": "ㄨㄛˇ ㄇㄣ˙",
    "meaningVi": "chúng tôi, chúng ta",
    "meaningEn": "we, us",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "我",
    "simplified": "我",
    "pinyin": "wǒ",
    "zhuyin": "ㄨㄛˇ",
    "meaningVi": "tôi",
    "meaningEn": "I, me",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "這",
    "simplified": "这",
    "pinyin": "zhè/zhèi",
    "zhuyin": "ㄓㄜˋ",
    "meaningVi": "đây, này",
    "meaningEn": "this",
    "wordType": "Det",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "先生",
    "simplified": "先生",
    "pinyin": "xiānsheng",
    "zhuyin": "ㄒㄧㄢ ㄕㄥ˙",
    "meaningVi": "ông, ngài, anh",
    "meaningEn": "Mr., gentleman, husband",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "好",
    "simplified": "好",
    "pinyin": "hǎo",
    "zhuyin": "ㄏㄠˇ",
    "meaningVi": "tốt, hay, khỏe",
    "meaningEn": "good, fine, healthy",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "姓",
    "simplified": "姓",
    "pinyin": "xìng",
    "zhuyin": "ㄒㄧㄥˋ",
    "meaningVi": "họ, mang họ",
    "meaningEn": "to be surnamed / surname",
    "wordType": "Vst/N",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "叫",
    "simplified": "叫",
    "pinyin": "jiào",
    "zhuyin": "ㄐㄧㄠˋ",
    "meaningVi": "tên là, gọi",
    "meaningEn": "to be called / to call",
    "wordType": "Vst",
    "tocflLevel": "1",
    "strokeCount": 5,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "請問",
    "simplified": "请问",
    "pinyin": "qǐngwèn",
    "zhuyin": "ㄑㄧㄥˇ ㄨㄣˋ",
    "meaningVi": "xin hỏi",
    "meaningEn": "May I ask...?",
    "wordType": "Phrase",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "名字",
    "simplified": "名字",
    "pinyin": "míngzi",
    "zhuyin": "ㄇㄧㄥˊ ㄗ˙",
    "meaningVi": "tên",
    "meaningEn": "name",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "臺灣/台灣",
    "simplified": "台湾",
    "pinyin": "Táiwān",
    "zhuyin": "ㄊㄞˊ ㄨㄢ",
    "meaningVi": "Đài Loan",
    "meaningEn": "Taiwan",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 28,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "華人",
    "simplified": "华人",
    "pinyin": "Huárén",
    "zhuyin": "ㄏㄨㄚˊ ㄖㄣˊ",
    "meaningVi": "người Hoa",
    "meaningEn": "ethnic Chinese",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "坐",
    "simplified": "坐",
    "pinyin": "zuò",
    "zhuyin": "ㄗㄨㄛˋ",
    "meaningVi": "ngồi, đi (máy bay, xe); đi (phương tiện), ngồi",
    "meaningEn": "to take (transport), to sit; to travel by, sit",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      1,
      8
    ]
  },
  {
    "traditional": "飛機",
    "simplified": "飞机",
    "pinyin": "fēijī",
    "zhuyin": "ㄈㄟ ㄐㄧ",
    "meaningVi": "máy bay",
    "meaningEn": "airplane",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "到",
    "simplified": "到",
    "pinyin": "dào",
    "zhuyin": "ㄉㄠˋ",
    "meaningVi": "đến, tới",
    "meaningEn": "to arrive, to reach",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "捷運",
    "simplified": "捷运",
    "pinyin": "jiéyùn",
    "zhuyin": "ㄐㄧㄝˊ ㄩㄣˋ",
    "meaningVi": "tàu điện ngầm MRT",
    "meaningEn": "Mass Rapid Transit (MRT)",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 25,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "美國",
    "simplified": "美国",
    "pinyin": "Měiguó",
    "zhuyin": "ㄇㄟˇ ㄍㄨㄛˊ",
    "meaningVi": "nước Mỹ",
    "meaningEn": "USA",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "中國",
    "simplified": "中国",
    "pinyin": "Zhōngguó",
    "zhuyin": "ㄓㄨㄥ ㄍㄨㄛˊ",
    "meaningVi": "Trung Quốc",
    "meaningEn": "China",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "日本",
    "simplified": "日本",
    "pinyin": "Rìběn",
    "zhuyin": "ㄖˋ ㄅㄣˇ",
    "meaningVi": "Nhật Bản",
    "meaningEn": "Japan",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "越南",
    "simplified": "越南",
    "pinyin": "Yuènán",
    "zhuyin": "ㄩㄝˋ ㄋㄢˊ",
    "meaningVi": "Việt Nam",
    "meaningEn": "Vietnam",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 21,
    "lessonNumbers": [
      1
    ]
  },
  {
    "traditional": "家",
    "simplified": "家",
    "pinyin": "jiā",
    "zhuyin": "ㄐㄧㄚ",
    "meaningVi": "gia đình, nhà",
    "meaningEn": "family, home",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "有",
    "simplified": "有",
    "pinyin": "yǒu",
    "zhuyin": "ㄧㄡˇ",
    "meaningVi": "có",
    "meaningEn": "to have",
    "wordType": "Vst",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "幾",
    "simplified": "几",
    "pinyin": "jǐ",
    "zhuyin": "ㄐㄧˇ",
    "meaningVi": "mấy, bao nhiêu",
    "meaningEn": "how many",
    "wordType": "Det",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "口",
    "simplified": "口",
    "pinyin": "kǒu",
    "zhuyin": "ㄎㄡˇ",
    "meaningVi": "người (lượng từ gia đình)",
    "meaningEn": "measure word for family members",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 3,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "人",
    "simplified": "人",
    "pinyin": "rén",
    "zhuyin": "ㄖㄣˊ",
    "meaningVi": "người",
    "meaningEn": "person, people",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 2,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "爸爸",
    "simplified": "爸爸",
    "pinyin": "bàba",
    "zhuyin": "ㄅㄚˋ ㄅㄚ˙",
    "meaningVi": "bố, cha",
    "meaningEn": "father, dad",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "媽媽",
    "simplified": "妈妈",
    "pinyin": "māma",
    "zhuyin": "ㄇㄚ ㄇㄚ˙",
    "meaningVi": "mẹ",
    "meaningEn": "mother, mom",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "哥哥",
    "simplified": "哥哥",
    "pinyin": "gēge",
    "zhuyin": "ㄍㄜ ㄍㄜ˙",
    "meaningVi": "anh trai",
    "meaningEn": "older brother",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "姐姐",
    "simplified": "姐姐",
    "pinyin": "jiějie",
    "zhuyin": "ㄐㄧㄝˇ ㄐㄧㄝ˙",
    "meaningVi": "chị gái",
    "meaningEn": "older sister",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "弟弟",
    "simplified": "弟弟",
    "pinyin": "dìdi",
    "zhuyin": "ㄉㄧˋ ㄉㄧ˙",
    "meaningVi": "em trai",
    "meaningEn": "younger brother",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "妹妹",
    "simplified": "妹妹",
    "pinyin": "mèimei",
    "zhuyin": "ㄇㄟˋ ㄇㄟ˙",
    "meaningVi": "em gái",
    "meaningEn": "younger sister",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "照片/相片",
    "simplified": "照片/相片",
    "pinyin": "zhàopiàn",
    "zhuyin": "ㄓㄠˋ ㄆㄧㄢˋ",
    "meaningVi": "bức ảnh",
    "meaningEn": "photo, picture",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 28,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "房子",
    "simplified": "房子",
    "pinyin": "fángzi",
    "zhuyin": "ㄈㄤˊ ㄗ˙",
    "meaningVi": "ngôi nhà, căn nhà; căn nhà, phòng trọ",
    "meaningEn": "house, building; house, apartment",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      2,
      11
    ]
  },
  {
    "traditional": "看",
    "simplified": "看",
    "pinyin": "kàn",
    "zhuyin": "ㄎㄢˋ",
    "meaningVi": "nhìn, xem, đọc",
    "meaningEn": "to look, see, read",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "都",
    "simplified": "都",
    "pinyin": "dōu",
    "zhuyin": "ㄉㄡ",
    "meaningVi": "đều",
    "meaningEn": "all, both",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "伯母",
    "simplified": "伯母",
    "pinyin": "bómǔ",
    "zhuyin": "ㄅㄛˊ ㄇㄨˇ",
    "meaningVi": "bác gái (mẹ của bạn)",
    "meaningEn": "aunt (friend's mother)",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "工作",
    "simplified": "工作",
    "pinyin": "gōngzuò",
    "zhuyin": "ㄍㄨㄥ ㄗㄨㄛˋ",
    "meaningVi": "công việc / làm việc; công việc",
    "meaningEn": "work, job / to work; job, work",
    "wordType": "N/V; N",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      2,
      12
    ]
  },
  {
    "traditional": "決定",
    "simplified": "决定",
    "pinyin": "juédìng",
    "zhuyin": "ㄐㄩㄝˊ ㄉㄧㄥˋ",
    "meaningVi": "quyết định",
    "meaningEn": "to decide / decision",
    "wordType": "Vst/N",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "醫生",
    "simplified": "医生",
    "pinyin": "yīshēng",
    "zhuyin": "ㄧ ㄕㄥ",
    "meaningVi": "bác sĩ",
    "meaningEn": "doctor",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      2,
      15
    ]
  },
  {
    "traditional": "教授",
    "simplified": "教授",
    "pinyin": "jiàoshòu",
    "zhuyin": "ㄐㄧㄠˋ ㄕㄡˋ",
    "meaningVi": "giáo sư",
    "meaningEn": "professor",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 19,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "校長",
    "simplified": "校长",
    "pinyin": "xiàozhǎng",
    "zhuyin": "ㄒㄧㄠˋ ㄓㄤˇ",
    "meaningVi": "hiệu trưởng",
    "meaningEn": "principal, president",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 18,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "律師",
    "simplified": "律师",
    "pinyin": "lǜshī",
    "zhuyin": "ㄌㄩˋ ㄕ",
    "meaningVi": "luật sư",
    "meaningEn": "lawyer",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 17,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "常常",
    "simplified": "常常",
    "pinyin": "chángcháng",
    "zhuyin": "ㄔㄤˊ ㄔㄤˊ",
    "meaningVi": "thường xuyên",
    "meaningEn": "often, frequently",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "做",
    "simplified": "做",
    "pinyin": "zuò",
    "zhuyin": "ㄗㄨㄛˋ",
    "meaningVi": "làm",
    "meaningEn": "to do, make",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      2
    ]
  },
  {
    "traditional": "週末",
    "simplified": "周末",
    "pinyin": "zhōumò",
    "zhuyin": "ㄓㄡ ㄇㄛˋ",
    "meaningVi": "cuối tuần",
    "meaningEn": "weekend",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "聽",
    "simplified": "听",
    "pinyin": "tīng",
    "zhuyin": "ㄊㄧㄥ",
    "meaningVi": "nghe",
    "meaningEn": "to listen",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "音樂",
    "simplified": "音乐",
    "pinyin": "yīnyuè",
    "zhuyin": "ㄧㄣ ㄩㄝˋ",
    "meaningVi": "âm nhạc",
    "meaningEn": "music",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "運動",
    "simplified": "运动",
    "pinyin": "yùndòng",
    "zhuyin": "ㄩㄣˋ ㄉㄨㄥˋ",
    "meaningVi": "thể thao / vận động",
    "meaningEn": "exercise, sports / to exercise",
    "wordType": "N/Vi",
    "tocflLevel": "1",
    "strokeCount": 24,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "打",
    "simplified": "打",
    "pinyin": "dǎ",
    "zhuyin": "ㄉㄚˇ",
    "meaningVi": "đánh, chơi (bóng bằng tay)",
    "meaningEn": "to play (ball games with hands)",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 5,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "網球",
    "simplified": "网球",
    "pinyin": "wǎngqiú",
    "zhuyin": "ㄨㄤˇ ㄑㄧㄡˊ",
    "meaningVi": "quần vợt",
    "meaningEn": "tennis",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 25,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "棒球",
    "simplified": "棒球",
    "pinyin": "bàngqiú",
    "zhuyin": "ㄅㄤˋ ㄑㄧㄡˊ",
    "meaningVi": "bóng chày",
    "meaningEn": "baseball",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "和",
    "simplified": "和",
    "pinyin": "hàn/hé",
    "zhuyin": "ㄏㄢˋ",
    "meaningVi": "và, cùng với",
    "meaningEn": "and, with",
    "wordType": "Conj/Prep",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "游泳",
    "simplified": "游泳",
    "pinyin": "yóuyǒng",
    "zhuyin": "ㄧㄡˊ ㄩㄥˇ",
    "meaningVi": "bơi lội",
    "meaningEn": "to swim",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 24,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "常",
    "simplified": "常",
    "pinyin": "cháng",
    "zhuyin": "ㄔㄤˊ",
    "meaningVi": "thường",
    "meaningEn": "often",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "籃球",
    "simplified": "篮球",
    "pinyin": "lánqiú",
    "zhuyin": "ㄌㄢˊ ㄑㄧㄡˊ",
    "meaningVi": "bóng rổ",
    "meaningEn": "basketball",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 31,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "也",
    "simplified": "也",
    "pinyin": "yě",
    "zhuyin": "ㄧㄝˇ",
    "meaningVi": "cũng",
    "meaningEn": "also, too",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 3,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "踢",
    "simplified": "踢",
    "pinyin": "tī",
    "zhuyin": "ㄊㄧ",
    "meaningVi": "đá (bóng)",
    "meaningEn": "to kick, play (soccer)",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "足球",
    "simplified": "足球",
    "pinyin": "zúqiú",
    "zhuyin": "ㄗㄨˊ ㄑㄧㄡˊ",
    "meaningVi": "bóng đá",
    "meaningEn": "soccer, football",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "晚飯",
    "simplified": "晚饭",
    "pinyin": "wǎnfàn",
    "zhuyin": "ㄨㄢˇ ㄈㄢˋ",
    "meaningVi": "bữa tối",
    "meaningEn": "dinner",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "菜",
    "simplified": "菜",
    "pinyin": "cài",
    "zhuyin": "ㄘㄞˋ",
    "meaningVi": "món ăn, rau",
    "meaningEn": "dish, food, cuisine",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "吃",
    "simplified": "吃",
    "pinyin": "chī",
    "zhuyin": "ㄔ",
    "meaningVi": "ăn",
    "meaningEn": "to eat",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "好不好",
    "simplified": "好不好",
    "pinyin": "hǎobùhǎo",
    "zhuyin": "ㄏㄠˇ ㄅㄨˋ ㄏㄠˇ",
    "meaningVi": "được không?, thế nào?",
    "meaningEn": "How about...?, Is it good?",
    "wordType": "Phrase",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "想",
    "simplified": "想",
    "pinyin": "xiǎng",
    "zhuyin": "ㄒㄧㄤˇ",
    "meaningVi": "muốn, nghĩ",
    "meaningEn": "to want to, would like to / to think",
    "wordType": "Vaux/Vst",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "覺得",
    "simplified": "觉得",
    "pinyin": "juéde",
    "zhuyin": "ㄐㄩㄝˊ ㄉㄜ˙",
    "meaningVi": "cảm thấy, cho rằng",
    "meaningEn": "to feel, think",
    "wordType": "Vst",
    "tocflLevel": "1",
    "strokeCount": 21,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "影集",
    "simplified": "影集",
    "pinyin": "yǐngjí",
    "zhuyin": "ㄧㄥˇ ㄐㄧˊ",
    "meaningVi": "phim truyền hình dài tập",
    "meaningEn": "TV series / drama",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 27,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "電影",
    "simplified": "电影",
    "pinyin": "diànyǐng",
    "zhuyin": "ㄉㄧㄢˋ ㄧㄥˇ",
    "meaningVi": "phim điện ảnh",
    "meaningEn": "movie",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 28,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "咖啡",
    "simplified": "咖啡",
    "pinyin": "kāfēi",
    "zhuyin": "ㄎㄚ ㄈㄟ",
    "meaningVi": "cà phê",
    "meaningEn": "coffee",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "喝",
    "simplified": "喝",
    "pinyin": "hē",
    "zhuyin": "ㄏㄜ",
    "meaningVi": "uống",
    "meaningEn": "to drink",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      3
    ]
  },
  {
    "traditional": "一共",
    "simplified": "一共",
    "pinyin": "yígòng",
    "zhuyin": "ㄧ ㄍㄨㄥˋ",
    "meaningVi": "tổng cộng",
    "meaningEn": "altogether, in total",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "多少",
    "simplified": "多少",
    "pinyin": "duōshǎo",
    "zhuyin": "ㄉㄨㄛ ㄕㄠˇ",
    "meaningVi": "bao nhiêu",
    "meaningEn": "how much, how many",
    "wordType": "Det",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "錢",
    "simplified": "钱",
    "pinyin": "qián",
    "zhuyin": "ㄑㄧㄢˊ",
    "meaningVi": "tiền",
    "meaningEn": "money",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "老闆",
    "simplified": "老板",
    "pinyin": "lǎobǎn",
    "zhuyin": "ㄌㄠˇ ㄅㄢˇ",
    "meaningVi": "ông chủ, chủ cửa hàng",
    "meaningEn": "boss, storekeeper",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "買",
    "simplified": "买",
    "pinyin": "mǎi",
    "zhuyin": "ㄇㄞˇ",
    "meaningVi": "mua",
    "meaningEn": "to buy",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "水果",
    "simplified": "水果",
    "pinyin": "shuǐguǒ",
    "zhuyin": "ㄕㄨㄟˇ ㄍㄨㄛˇ",
    "meaningVi": "hoa quả, trái cây",
    "meaningEn": "fruit",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      4,
      10
    ]
  },
  {
    "traditional": "蘋果",
    "simplified": "苹果",
    "pinyin": "píngguǒ",
    "zhuyin": "ㄆㄧㄥˊ ㄍㄨㄛˇ",
    "meaningVi": "quả táo",
    "meaningEn": "apple",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "斤",
    "simplified": "斤",
    "pinyin": "jīn",
    "zhuyin": "ㄐㄧㄣ",
    "meaningVi": "cân (600g ở Đài Loan); cân (600g)",
    "meaningEn": "catty (weight unit = 600g); catty (600g)",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 4,
    "lessonNumbers": [
      4,
      10
    ]
  },
  {
    "traditional": "塊",
    "simplified": "块",
    "pinyin": "kuài",
    "zhuyin": "ㄎㄨㄞˋ",
    "meaningVi": "đồng (tiền), miếng",
    "meaningEn": "dollar (NTD), piece",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "貴",
    "simplified": "贵",
    "pinyin": "guì",
    "zhuyin": "ㄍㄨㄟˋ",
    "meaningVi": "đắt",
    "meaningEn": "expensive",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "便宜",
    "simplified": "便宜",
    "pinyin": "piányi",
    "zhuyin": "ㄆㄧㄢˊ ㄧ˙",
    "meaningVi": "rẻ",
    "meaningEn": "cheap",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "吧",
    "simplified": "吧",
    "pinyin": "ba",
    "zhuyin": "ㄅㄚ˙",
    "meaningVi": "nhé, chứ (trợ từ)",
    "meaningEn": "sentence final particle",
    "wordType": "Ptc",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "隻/支",
    "simplified": "只/支",
    "pinyin": "zhī",
    "zhuyin": "ㄓ",
    "meaningVi": "chiếc, cây (điện thoại, bút)",
    "meaningEn": "measure word for phones, pens",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 4,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "手機",
    "simplified": "手机",
    "pinyin": "shǒujī",
    "zhuyin": "ㄕㄡˇ ㄐㄧ",
    "meaningVi": "điện thoại di động",
    "meaningEn": "cell phone",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "新",
    "simplified": "新",
    "pinyin": "xīn",
    "zhuyin": "ㄒㄧㄣ",
    "meaningVi": "mới",
    "meaningEn": "new",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "舊",
    "simplified": "旧",
    "pinyin": "jiù",
    "zhuyin": "ㄐㄧㄡˋ",
    "meaningVi": "cũ",
    "meaningEn": "old (not new)",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "太",
    "simplified": "太",
    "pinyin": "tài",
    "zhuyin": "ㄊㄞˋ",
    "meaningVi": "quá, lắm",
    "meaningEn": "too, excessively",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 4,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "了",
    "simplified": "了",
    "pinyin": "le",
    "zhuyin": "ㄌㄜ˙",
    "meaningVi": "rồi (trợ từ)",
    "meaningEn": "particle for change of state",
    "wordType": "Ptc",
    "tocflLevel": "1",
    "strokeCount": 2,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "種",
    "simplified": "种",
    "pinyin": "zhǒng",
    "zhuyin": "ㄓㄨㄥˇ",
    "meaningVi": "loại, kiểu",
    "meaningEn": "kind, type",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "能",
    "simplified": "能",
    "pinyin": "néng",
    "zhuyin": "ㄋㄥˊ",
    "meaningVi": "có thể",
    "meaningEn": "can, to be able to",
    "wordType": "Vaux",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "上網",
    "simplified": "上网",
    "pinyin": "shàngwǎng",
    "zhuyin": "ㄕㄤˋ ㄨㄤˇ",
    "meaningVi": "lên mạng, truy cập internet",
    "meaningEn": "to access the internet",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "那",
    "simplified": "那",
    "pinyin": "nà/nèi",
    "zhuyin": "ㄋㄚˋ",
    "meaningVi": "đó, kia",
    "meaningEn": "that",
    "wordType": "Det",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "賣",
    "simplified": "卖",
    "pinyin": "mài",
    "zhuyin": "ㄇㄞˋ",
    "meaningVi": "bán",
    "meaningEn": "to sell",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "要",
    "simplified": "要",
    "pinyin": "yào",
    "zhuyin": "ㄧㄠˋ",
    "meaningVi": "cần, tốn / muốn",
    "meaningEn": "to take, require / to want",
    "wordType": "Vst/Vaux",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "萬",
    "simplified": "万",
    "pinyin": "wàn",
    "zhuyin": "ㄨㄢˋ",
    "meaningVi": "mười nghìn (vạn)",
    "meaningEn": "ten thousand",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      4
    ]
  },
  {
    "traditional": "牛肉",
    "simplified": "牛肉",
    "pinyin": "niúròu",
    "zhuyin": "ㄋㄧㄡˊ ㄖㄡˋ",
    "meaningVi": "thịt bò",
    "meaningEn": "beef",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "麵",
    "simplified": "面",
    "pinyin": "miàn",
    "zhuyin": "ㄇㄧㄢˋ",
    "meaningVi": "mì",
    "meaningEn": "noodles",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "真",
    "simplified": "真",
    "pinyin": "zhēn",
    "zhuyin": "ㄓㄣ",
    "meaningVi": "thực sự, thật",
    "meaningEn": "really, truly",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "好吃",
    "simplified": "好吃",
    "pinyin": "hǎochī",
    "zhuyin": "ㄏㄠˇ ㄔ",
    "meaningVi": "ngon (thức ăn)",
    "meaningEn": "delicious (for food)",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "招牌",
    "simplified": "招牌",
    "pinyin": "zhāopái",
    "zhuyin": "ㄓㄠ ㄆㄞˊ",
    "meaningVi": "món đặc sản, biển hiệu",
    "meaningEn": "signboard, house specialty",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 20,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "點",
    "simplified": "点",
    "pinyin": "diǎn",
    "zhuyin": "ㄉㄧㄢˇ",
    "meaningVi": "gọi (món); giờ",
    "meaningEn": "to order (food); o'clock",
    "wordType": "V; M",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      5,
      7
    ]
  },
  {
    "traditional": "碗",
    "simplified": "碗",
    "pinyin": "wǎn",
    "zhuyin": "ㄨㄢˇ",
    "meaningVi": "bát, tô / lượng từ bát",
    "meaningEn": "bowl / measure word for bowls",
    "wordType": "N/M",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "湯",
    "simplified": "汤",
    "pinyin": "tāng",
    "zhuyin": "ㄊㄤ",
    "meaningVi": "canh, súp",
    "meaningEn": "soup",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "辣",
    "simplified": "辣",
    "pinyin": "là",
    "zhuyin": "ㄌㄚˋ",
    "meaningVi": "cay",
    "meaningEn": "spicy, hot",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "飲料",
    "simplified": "饮料",
    "pinyin": "yǐnliào",
    "zhuyin": "ㄧㄣˇ ㄌㄧㄠˋ",
    "meaningVi": "đồ uống, nước giải khát",
    "meaningEn": "drink, beverage",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "紅茶",
    "simplified": "红茶",
    "pinyin": "hóngchá",
    "zhuyin": "ㄏㄨㄥˊ ㄔㄚˊ",
    "meaningVi": "hồng trà",
    "meaningEn": "black tea",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "綠茶",
    "simplified": "绿茶",
    "pinyin": "lǜchá",
    "zhuyin": "ㄌㄩˋ ㄔㄚˊ",
    "meaningVi": "lục trà, trà xanh",
    "meaningEn": "green tea",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "夜市",
    "simplified": "夜市",
    "pinyin": "yèshì",
    "zhuyin": "ㄧㄝˋ ㄕˋ",
    "meaningVi": "chợ đêm",
    "meaningEn": "night market",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "逛",
    "simplified": "逛",
    "pinyin": "guàng",
    "zhuyin": "ㄍㄨㄤˋ",
    "meaningVi": "đi dạo, lượn quanh",
    "meaningEn": "to stroll, wander",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "東西",
    "simplified": "东西",
    "pinyin": "dōngxī",
    "zhuyin": "ㄉㄨㄥ ㄒㄧ",
    "meaningVi": "đồ đạc, vật dụng",
    "meaningEn": "thing, stuff",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "臭豆腐",
    "simplified": "臭豆腐",
    "pinyin": "chòudòufu",
    "zhuyin": "ㄔㄡˋ ㄉㄡˋ ㄈㄨ˙",
    "meaningVi": "đậu phụ thối",
    "meaningEn": "stinky tofu",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 24,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "珍珠奶茶",
    "simplified": "珍珠奶茶",
    "pinyin": "zhēnzhū nǎichá",
    "zhuyin": "ㄓㄣ ㄓㄨ ㄋㄞˇ ㄔㄚˊ",
    "meaningVi": "trà sữa trân châu",
    "meaningEn": "bubble milk tea",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 34,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "試",
    "simplified": "试",
    "pinyin": "shì",
    "zhuyin": "ㄕˋ",
    "meaningVi": "thử",
    "meaningEn": "to try, test",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "包子",
    "simplified": "包子",
    "pinyin": "bāozi",
    "zhuyin": "ㄅㄠ ㄗ˙",
    "meaningVi": "bánh bao",
    "meaningEn": "steamed stuffed bun",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "餓",
    "simplified": "饿",
    "pinyin": "è",
    "zhuyin": "ㄜˋ",
    "meaningVi": "đói",
    "meaningEn": "hungry",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "飽",
    "simplified": "饱",
    "pinyin": "bǎo",
    "zhuyin": "ㄅㄠˇ",
    "meaningVi": "no",
    "meaningEn": "full (after eating)",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      5
    ]
  },
  {
    "traditional": "學校",
    "simplified": "学校",
    "pinyin": "xuéxiào",
    "zhuyin": "ㄒㄩㄝˊ ㄒㄧㄠˋ",
    "meaningVi": "trường học",
    "meaningEn": "school",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 26,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "在",
    "simplified": "在",
    "pinyin": "zài",
    "zhuyin": "ㄗㄞˋ",
    "meaningVi": "ở, tại; đang",
    "meaningEn": "to be located at; in the process of (progressive)",
    "wordType": "Vst/Prep; Adv/V",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      6,
      7
    ]
  },
  {
    "traditional": "山上",
    "simplified": "山上",
    "pinyin": "shānshàng",
    "zhuyin": "ㄕㄢ ㄕㄤˋ",
    "meaningVi": "trên núi",
    "meaningEn": "on a mountain, in the mountains",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "哪裡",
    "simplified": "哪里",
    "pinyin": "nǎlǐ",
    "zhuyin": "ㄋㄚˇ ㄌㄧˇ",
    "meaningVi": "ở đâu, chỗ nào",
    "meaningEn": "where",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "遠",
    "simplified": "远",
    "pinyin": "yuǎn",
    "zhuyin": "ㄩㄢˇ",
    "meaningVi": "xa",
    "meaningEn": "far",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "那裡",
    "simplified": "那里",
    "pinyin": "nàlǐ",
    "zhuyin": "ㄋㄚˋ ㄌㄧˇ",
    "meaningVi": "chỗ đó, nơi đó",
    "meaningEn": "there, that place",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "風景",
    "simplified": "风景",
    "pinyin": "fēngjǐng",
    "zhuyin": "ㄈㄥ ㄐㄧㄥˇ",
    "meaningVi": "phong cảnh, cảnh đẹp",
    "meaningEn": "scenery, landscape",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 21,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "美",
    "simplified": "美",
    "pinyin": "měi",
    "zhuyin": "ㄇㄟˇ",
    "meaningVi": "đẹp",
    "meaningEn": "beautiful",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "前面",
    "simplified": "前面",
    "pinyin": "qiánmiàn",
    "zhuyin": "ㄑㄧㄢˊ ㄇㄧㄢˋ",
    "meaningVi": "phía trước",
    "meaningEn": "in front",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "海",
    "simplified": "海",
    "pinyin": "hǎi",
    "zhuyin": "ㄏㄞˇ",
    "meaningVi": "biển",
    "meaningEn": "sea, ocean",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "後面",
    "simplified": "后面",
    "pinyin": "hòumiàn",
    "zhuyin": "ㄏㄡˋ ㄇㄧㄢˋ",
    "meaningVi": "phía sau",
    "meaningEn": "behind, back",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "山",
    "simplified": "山",
    "pinyin": "shān",
    "zhuyin": "ㄕㄢ",
    "meaningVi": "núi",
    "meaningEn": "mountain",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 3,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "真的",
    "simplified": "真的",
    "pinyin": "zhēnde",
    "zhuyin": "ㄓㄣ ㄉㄜ˙",
    "meaningVi": "thực sự",
    "meaningEn": "really, truly",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "地方",
    "simplified": "地方",
    "pinyin": "dìfāng",
    "zhuyin": "ㄉㄧˋ ㄈㄤ",
    "meaningVi": "nơi, địa điểm",
    "meaningEn": "place",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "近",
    "simplified": "近",
    "pinyin": "jìn",
    "zhuyin": "ㄐㄧㄣˋ",
    "meaningVi": "gần",
    "meaningEn": "near, close",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "方便",
    "simplified": "方便",
    "pinyin": "fāngbiàn",
    "zhuyin": "ㄈㄤ ㄅㄧㄢˋ",
    "meaningVi": "thuận tiện, tiện lợi",
    "meaningEn": "convenient",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "走路",
    "simplified": "走路",
    "pinyin": "zǒulù",
    "zhuyin": "ㄗㄡˇ ㄌㄨˋ",
    "meaningVi": "đi bộ",
    "meaningEn": "to walk",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "分鐘",
    "simplified": "分钟",
    "pinyin": "fēnzhōng",
    "zhuyin": "ㄈㄣ ㄓㄨㄥ",
    "meaningVi": "phút",
    "meaningEn": "minute",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "離",
    "simplified": "离",
    "pinyin": "lí",
    "zhuyin": "ㄌㄧˊ",
    "meaningVi": "cách (khoảng cách)",
    "meaningEn": "away from (distance)",
    "wordType": "Prep",
    "tocflLevel": "1",
    "strokeCount": 19,
    "lessonNumbers": [
      6
    ]
  },
  {
    "traditional": "大概",
    "simplified": "大概",
    "pinyin": "dàgài",
    "zhuyin": "ㄉㄚˋ ㄍㄞˋ",
    "meaningVi": "khoảng, đại khái",
    "meaningEn": "approximately, probably",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      6,
      9
    ]
  },
  {
    "traditional": "KTV",
    "simplified": "KTV",
    "pinyin": "KTV",
    "zhuyin": "KTV",
    "meaningVi": "quán Karaoke",
    "meaningEn": "Karaoke bar",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 0,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "唱歌",
    "simplified": "唱歌",
    "pinyin": "chànggē",
    "zhuyin": "ㄔㄤˋ ㄍㄜ",
    "meaningVi": "hát karaoke / hát",
    "meaningEn": "to sing a song",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 28,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "分",
    "simplified": "分",
    "pinyin": "fēn",
    "zhuyin": "ㄈㄣ",
    "meaningVi": "phút",
    "meaningEn": "minute",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 4,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "見面",
    "simplified": "见面",
    "pinyin": "jiànmiàn",
    "zhuyin": "ㄐㄧㄢˋ ㄇㄧㄢˋ",
    "meaningVi": "gặp mặt",
    "meaningEn": "to meet",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "從",
    "simplified": "从",
    "pinyin": "cóng",
    "zhuyin": "ㄘㄨㄥˊ",
    "meaningVi": "từ (thời gian, địa điểm)",
    "meaningEn": "from",
    "wordType": "Prep",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "中午",
    "simplified": "中午",
    "pinyin": "zhōngwǔ",
    "zhuyin": "ㄓㄨㄥ ㄨˇ",
    "meaningVi": "buổi trưa",
    "meaningEn": "noon",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "得",
    "simplified": "得",
    "pinyin": "děi",
    "zhuyin": "ㄉㄟˇ",
    "meaningVi": "phải",
    "meaningEn": "must, have to",
    "wordType": "Vaux",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "銀行",
    "simplified": "银行",
    "pinyin": "yínháng",
    "zhuyin": "ㄧㄣˊ ㄏㄤˊ",
    "meaningVi": "ngân hàng",
    "meaningEn": "bank",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "時候",
    "simplified": "时候",
    "pinyin": "shíhou",
    "zhuyin": "ㄕˊ ㄏㄡ˙",
    "meaningVi": "khi, lúc",
    "meaningEn": "time, moment",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "後天",
    "simplified": "后天",
    "pinyin": "hòutiān",
    "zhuyin": "ㄏㄡˋ ㄊㄧㄢ",
    "meaningVi": "ngày kia",
    "meaningEn": "day after tomorrow",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "午餐",
    "simplified": "午餐",
    "pinyin": "wǔcān",
    "zhuyin": "ㄨˇ ㄘㄢ",
    "meaningVi": "bữa trưa",
    "meaningEn": "lunch",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "剛",
    "simplified": "刚",
    "pinyin": "gāng",
    "zhuyin": "ㄍㄤ",
    "meaningVi": "vừa mới",
    "meaningEn": "just now",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "下課",
    "simplified": "下课",
    "pinyin": "xiàkè",
    "zhuyin": "ㄒㄧㄚˋ ㄎㄜˋ",
    "meaningVi": "tan học",
    "meaningEn": "to finish class",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "下午",
    "simplified": "下午",
    "pinyin": "xiàwǔ",
    "zhuyin": "ㄒㄧㄚˋ ㄨˇ",
    "meaningVi": "buổi chiều",
    "meaningEn": "afternoon",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "半",
    "simplified": "半",
    "pinyin": "bàn",
    "zhuyin": "ㄅㄢˋ",
    "meaningVi": "nửa, rưỡi",
    "meaningEn": "half",
    "wordType": "Det",
    "tocflLevel": "1",
    "strokeCount": 5,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "結束",
    "simplified": "结束",
    "pinyin": "jiéshù",
    "zhuyin": "ㄐㄧㄝˊ ㄕㄨˋ",
    "meaningVi": "kết thúc",
    "meaningEn": "to finish, end",
    "wordType": "Vp",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "最近",
    "simplified": "最近",
    "pinyin": "zuìjìn",
    "zhuyin": "ㄗㄨㄟˋ ㄐㄧㄣˋ",
    "meaningVi": "dạo này, gần đây",
    "meaningEn": "recently, lately",
    "wordType": "Adv/N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "忙",
    "simplified": "忙",
    "pinyin": "máng",
    "zhuyin": "ㄇㄤˊ",
    "meaningVi": "bận",
    "meaningEn": "busy",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "每",
    "simplified": "每",
    "pinyin": "měi",
    "zhuyin": "ㄇㄟˇ",
    "meaningVi": "mỗi",
    "meaningEn": "every, each",
    "wordType": "Det",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "天",
    "simplified": "天",
    "pinyin": "tiān",
    "zhuyin": "ㄊㄧㄢ",
    "meaningVi": "ngày",
    "meaningEn": "day",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 4,
    "lessonNumbers": [
      7,
      8
    ]
  },
  {
    "traditional": "書法",
    "simplified": "书法",
    "pinyin": "shūfǎ",
    "zhuyin": "ㄕㄨ ㄈㄚˇ",
    "meaningVi": "thư pháp",
    "meaningEn": "calligraphy",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "課",
    "simplified": "课",
    "pinyin": "kè",
    "zhuyin": "ㄎㄜˋ",
    "meaningVi": "môn học, tiết học",
    "meaningEn": "class, lesson",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "開始",
    "simplified": "开始",
    "pinyin": "kāishǐ",
    "zhuyin": "ㄎㄞ ㄕˇ",
    "meaningVi": "bắt đầu",
    "meaningEn": "to begin, start",
    "wordType": "Vp/N",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "字",
    "simplified": "字",
    "pinyin": "zì",
    "zhuyin": "ㄗˋ",
    "meaningVi": "chữ",
    "meaningEn": "character",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "寫",
    "simplified": "写",
    "pinyin": "xiě",
    "zhuyin": "ㄒㄧㄝˇ",
    "meaningVi": "viết",
    "meaningEn": "to write",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "可以",
    "simplified": "可以",
    "pinyin": "kěyǐ",
    "zhuyin": "ㄎㄜˇ ㄧˇ",
    "meaningVi": "có thể, được",
    "meaningEn": "can, may (permission)",
    "wordType": "Vaux",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "問",
    "simplified": "问",
    "pinyin": "wèn",
    "zhuyin": "ㄨㄣˋ",
    "meaningVi": "hỏi",
    "meaningEn": "to ask",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "比賽",
    "simplified": "比赛",
    "pinyin": "bǐsài",
    "zhuyin": "ㄅㄧˇ ㄙㄞˋ",
    "meaningVi": "cuộc thi, trận đấu",
    "meaningEn": "game, competition / to compete",
    "wordType": "N/Vi",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      7
    ]
  },
  {
    "traditional": "火車",
    "simplified": "火车",
    "pinyin": "huǒchē",
    "zhuyin": "ㄏㄨㄛˇ ㄔㄜ",
    "meaningVi": "tàu hỏa",
    "meaningEn": "train",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "去",
    "simplified": "去",
    "pinyin": "qù",
    "zhuyin": "ㄑㄩˋ",
    "meaningVi": "đi",
    "meaningEn": "to go",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 5,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "臺南/台南",
    "simplified": "台南",
    "pinyin": "Táinán",
    "zhuyin": "ㄊㄞˊ ㄋㄢˊ",
    "meaningVi": "thành phố Đài Nam",
    "meaningEn": "Tainan city",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "高鐵",
    "simplified": "高铁",
    "pinyin": "gāotiě",
    "zhuyin": "ㄍㄠ ㄊㄧㄝˇ",
    "meaningVi": "đường sắt cao tốc HSR",
    "meaningEn": "High Speed Rail (HSR)",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 31,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "快",
    "simplified": "快",
    "pinyin": "kuài",
    "zhuyin": "ㄎㄨㄞˋ",
    "meaningVi": "nhanh",
    "meaningEn": "fast, quick",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "票",
    "simplified": "票",
    "pinyin": "piào",
    "zhuyin": "ㄆㄧㄠˋ",
    "meaningVi": "vé",
    "meaningEn": "ticket",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "舒服",
    "simplified": "舒服",
    "pinyin": "shūfú",
    "zhuyin": "ㄕㄨ ㄈㄨˊ",
    "meaningVi": "thoải mái, dễ chịu; dễ chịu, khỏe khoắn",
    "meaningEn": "comfortable; comfortable, feeling well",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      8,
      15
    ]
  },
  {
    "traditional": "站",
    "simplified": "站",
    "pinyin": "zhàn",
    "zhuyin": "ㄓㄢˋ",
    "meaningVi": "ga, trạm",
    "meaningEn": "station, stop",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "玩",
    "simplified": "玩",
    "pinyin": "wán",
    "zhuyin": "ㄨㄢˊ",
    "meaningVi": "chơi, du ngoạn",
    "meaningEn": "to play, have fun",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "參觀",
    "simplified": "参观",
    "pinyin": "cānguān",
    "zhuyin": "ㄘㄢ ㄍㄨㄢ",
    "meaningVi": "tham quan",
    "meaningEn": "to visit, tour",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 36,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "古蹟",
    "simplified": "古迹",
    "pinyin": "gǔjī",
    "zhuyin": "ㄍㄨˇ ㄐㄧ",
    "meaningVi": "di tích lịch sử",
    "meaningEn": "historic site",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 23,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "小吃",
    "simplified": "小吃",
    "pinyin": "xiǎochī",
    "zhuyin": "ㄒㄧㄠˇ ㄔ",
    "meaningVi": "món ăn vặt, đặc sản địa phương",
    "meaningEn": "snack, local delicacy",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "有名",
    "simplified": "有名",
    "pinyin": "yǒumíng",
    "zhuyin": "ㄧㄡˊ ㄇㄧㄥˊ",
    "meaningVi": "nổi tiếng",
    "meaningEn": "famous",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      8
    ]
  },
  {
    "traditional": "放假",
    "simplified": "放假",
    "pinyin": "fàngjià",
    "zhuyin": "ㄈㄤˋ ㄐㄧㄚˋ",
    "meaningVi": "nghỉ lễ, nghỉ hè",
    "meaningEn": "to have a holiday/vacation",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 21,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "打算",
    "simplified": "打算",
    "pinyin": "dǎsuàn",
    "zhuyin": "ㄉㄚˇ ㄙㄨㄢˋ",
    "meaningVi": "dự định, kế hoạch",
    "meaningEn": "to plan to / plan",
    "wordType": "Vaux/N",
    "tocflLevel": "1",
    "strokeCount": 19,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "暑假",
    "simplified": "暑假",
    "pinyin": "shǔjià",
    "zhuyin": "ㄕㄨˇ ㄐㄧㄚˋ",
    "meaningVi": "nghỉ hè",
    "meaningEn": "summer vacation",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 26,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "回國",
    "simplified": "回国",
    "pinyin": "huíguó",
    "zhuyin": "ㄏㄨㄟˊ ㄍㄨㄛˊ",
    "meaningVi": "về nước",
    "meaningEn": "return to one's country",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "電視",
    "simplified": "电视",
    "pinyin": "diànshì",
    "zhuyin": "ㄉㄧㄢˋ ㄕˋ",
    "meaningVi": "truyền hình, tivi",
    "meaningEn": "television",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 24,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "影片",
    "simplified": "影片",
    "pinyin": "yǐngpiàn",
    "zhuyin": "ㄧㄥˇ ㄆㄧㄢˋ",
    "meaningVi": "video, đoạn phim",
    "meaningEn": "film, video",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 19,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "旅行",
    "simplified": "旅行",
    "pinyin": "lǚxíng",
    "zhuyin": "ㄌㄩˇ ㄒㄧㄥˊ",
    "meaningVi": "du lịch",
    "meaningEn": "to travel / trip",
    "wordType": "Vi/N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "功課",
    "simplified": "功课",
    "pinyin": "gōngkè",
    "zhuyin": "ㄍㄨㄥ ㄎㄜˋ",
    "meaningVi": "bài tập về nhà",
    "meaningEn": "homework",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "出去",
    "simplified": "出去",
    "pinyin": "chūqù",
    "zhuyin": "ㄔㄨ ㄑㄩˋ",
    "meaningVi": "đi ra ngoài",
    "meaningEn": "to go out",
    "wordType": "Vi",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "下個星期",
    "simplified": "下个星期",
    "pinyin": "xià ge xīngqī",
    "zhuyin": "ㄒㄧㄚˋ ㄍㄜ˙ ㄒㄧㄥ ㄑㄧ",
    "meaningVi": "tuần tới",
    "meaningEn": "next week",
    "wordType": "Phrase",
    "tocflLevel": "1",
    "strokeCount": 34,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "有時候",
    "simplified": "有时候",
    "pinyin": "yǒushíhòu",
    "zhuyin": "ㄧㄡˇ ㄕˊ ㄏㄡ˙",
    "meaningVi": "có đôi khi, thỉnh thoảng",
    "meaningEn": "sometimes",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 26,
    "lessonNumbers": [
      9
    ]
  },
  {
    "traditional": "西瓜",
    "simplified": "西瓜",
    "pinyin": "xīguā",
    "zhuyin": "ㄒㄧ ㄍㄨㄚ",
    "meaningVi": "dưa hấu",
    "meaningEn": "watermelon",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "芒果",
    "simplified": "芒果",
    "pinyin": "mángguǒ",
    "zhuyin": "ㄇㄤˊ ㄍㄨㄛˇ",
    "meaningVi": "xoài",
    "meaningEn": "mango",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "香蕉",
    "simplified": "香蕉",
    "pinyin": "xiāngjiāo",
    "zhuyin": "ㄒㄧㄤ ㄐㄧㄠ",
    "meaningVi": "chuối",
    "meaningEn": "banana",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 21,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "木瓜",
    "simplified": "木瓜",
    "pinyin": "mùguā",
    "zhuyin": "ㄇㄨˋ ㄍㄨㄚ",
    "meaningVi": "đu đủ",
    "meaningEn": "papaya",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "甜",
    "simplified": "甜",
    "pinyin": "tián",
    "zhuyin": "ㄊㄧㄢˊ",
    "meaningVi": "ngọt",
    "meaningEn": "sweet",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "酸",
    "simplified": "酸",
    "pinyin": "suān",
    "zhuyin": "ㄙㄨㄢ",
    "meaningVi": "chua",
    "meaningEn": "sour",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "新鮮",
    "simplified": "新鲜",
    "pinyin": "xīnxiān",
    "zhuyin": "ㄒㄧㄣ ㄒㄧㄢ",
    "meaningVi": "tươi ngon",
    "meaningEn": "fresh",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 30,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "市場",
    "simplified": "市场",
    "pinyin": "shìchǎng",
    "zhuyin": "ㄕˋ ㄔㄤˇ",
    "meaningVi": "chợ",
    "meaningEn": "market",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      10
    ]
  },
  {
    "traditional": "租",
    "simplified": "租",
    "pinyin": "zū",
    "zhuyin": "ㄗㄨ",
    "meaningVi": "thuê",
    "meaningEn": "to rent",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "套房",
    "simplified": "套房",
    "pinyin": "tàofáng",
    "zhuyin": "ㄊㄠˋ ㄈㄤˊ",
    "meaningVi": "phòng khép kín (có WC riêng)",
    "meaningEn": "suite, studio apartment",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "雅房",
    "simplified": "雅房",
    "pinyin": "yǎfáng",
    "zhuyin": "ㄧㄚˇ ㄈㄤˊ",
    "meaningVi": "phòng chung nhà vệ sinh",
    "meaningEn": "room with shared bathroom",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "房東",
    "simplified": "房东",
    "pinyin": "fángdōng",
    "zhuyin": "ㄈㄤˊ ㄉㄨㄥ",
    "meaningVi": "chủ nhà",
    "meaningEn": "landlord",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "房租",
    "simplified": "房租",
    "pinyin": "fángzū",
    "zhuyin": "ㄈㄤˊ ㄗㄨ",
    "meaningVi": "tiền thuê nhà",
    "meaningEn": "rent money",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "月",
    "simplified": "月",
    "pinyin": "yuè",
    "zhuyin": "ㄩㄝˋ",
    "meaningVi": "tháng",
    "meaningEn": "month",
    "wordType": "N/M",
    "tocflLevel": "1",
    "strokeCount": 4,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "押金",
    "simplified": "押金",
    "pinyin": "yājīn",
    "zhuyin": "ㄧㄚ ㄐㄧㄣ",
    "meaningVi": "tiền đặt cọc",
    "meaningEn": "deposit",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 16,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "搬",
    "simplified": "搬",
    "pinyin": "bān",
    "zhuyin": "ㄅㄢ",
    "meaningVi": "chuyển, dời",
    "meaningEn": "to move",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "搬家",
    "simplified": "搬家",
    "pinyin": "bānjiā",
    "zhuyin": "ㄅㄢ ㄐㄧㄚ",
    "meaningVi": "chuyển nhà",
    "meaningEn": "to move house",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "環境",
    "simplified": "环境",
    "pinyin": "huánjìng",
    "zhuyin": "ㄏㄨㄢˊ ㄐㄧㄥˋ",
    "meaningVi": "môi trường, xung quanh",
    "meaningEn": "environment",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 31,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "安靜",
    "simplified": "安静",
    "pinyin": "ānjìng",
    "zhuyin": "ㄢ ㄐㄧㄥˋ",
    "meaningVi": "yên tĩnh",
    "meaningEn": "quiet",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      11
    ]
  },
  {
    "traditional": "計畫/計畫",
    "simplified": "计划",
    "pinyin": "jìhuà",
    "zhuyin": "ㄐㄧˋ ㄏㄨㄚˋ",
    "meaningVi": "kế hoạch, dự định",
    "meaningEn": "to plan / plan",
    "wordType": "V/N",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "年",
    "simplified": "年",
    "pinyin": "nián",
    "zhuyin": "ㄋㄧㄢˊ",
    "meaningVi": "năm",
    "meaningEn": "year",
    "wordType": "M",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "久",
    "simplified": "久",
    "pinyin": "jiǔ",
    "zhuyin": "ㄐㄧㄡˇ",
    "meaningVi": "lâu (thời gian)",
    "meaningEn": "long (time)",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 3,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "時間",
    "simplified": "时间",
    "pinyin": "shíjiān",
    "zhuyin": "ㄕˊ ㄐㄧㄢ",
    "meaningVi": "thời gian",
    "meaningEn": "time",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "先",
    "simplified": "先",
    "pinyin": "xiān",
    "zhuyin": "ㄒㄧㄢ",
    "meaningVi": "trước tiên",
    "meaningEn": "first",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 6,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "念/唸",
    "simplified": "念",
    "pinyin": "niàn",
    "zhuyin": "ㄋㄧㄢˋ",
    "meaningVi": "học, đọc",
    "meaningEn": "to study, read",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "大學",
    "simplified": "大学",
    "pinyin": "dàxué",
    "zhuyin": "ㄉㄚˋ ㄒㄩㄝˊ",
    "meaningVi": "đại học",
    "meaningEn": "university",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 19,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "需要",
    "simplified": "需要",
    "pinyin": "xūyào",
    "zhuyin": "ㄒㄩ ㄧㄠˋ",
    "meaningVi": "cần thiết",
    "meaningEn": "to need",
    "wordType": "Vst",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "花",
    "simplified": "花",
    "pinyin": "huā",
    "zhuyin": "ㄏㄨㄚ",
    "meaningVi": "tiêu, tốn (thời gian/tiền)",
    "meaningEn": "to spend (time/money)",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "獎學金",
    "simplified": "奖学金",
    "pinyin": "jiǎngxuéjīn",
    "zhuyin": "ㄐㄧㄤˇ ㄒㄩㄝˊ ㄐㄧㄣ",
    "meaningVi": "học bổng",
    "meaningEn": "scholarship",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 39,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "成績",
    "simplified": "成绩",
    "pinyin": "chéngjī",
    "zhuyin": "ㄔㄥˊ ㄐㄧ",
    "meaningVi": "thành tích, điểm số",
    "meaningEn": "grade, result",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 24,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "學費",
    "simplified": "学费",
    "pinyin": "xuéfèi",
    "zhuyin": "ㄒㄩㄝˊ ㄈㄟˋ",
    "meaningVi": "học phí",
    "meaningEn": "tuition fee",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 28,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "公司",
    "simplified": "公司",
    "pinyin": "gōngsī",
    "zhuyin": "ㄍㄨㄥ ㄙ",
    "meaningVi": "công ty",
    "meaningEn": "company",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 13,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "替",
    "simplified": "替",
    "pinyin": "tì",
    "zhuyin": "ㄊㄧˋ",
    "meaningVi": "thay, cho (ai đó)",
    "meaningEn": "for, on behalf of",
    "wordType": "Prep",
    "tocflLevel": "2",
    "strokeCount": 12,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "希望",
    "simplified": "希望",
    "pinyin": "xīwàng",
    "zhuyin": "ㄒㄧ ㄨㄤˋ",
    "meaningVi": "hy vọng",
    "meaningEn": "to hope / hope",
    "wordType": "Vst/N",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "語言",
    "simplified": "语言",
    "pinyin": "yǔyán",
    "zhuyin": "ㄩˇ ㄧㄢˊ",
    "meaningVi": "ngôn ngữ",
    "meaningEn": "language",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 21,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "中心",
    "simplified": "中心",
    "pinyin": "zhōngxīn",
    "zhuyin": "ㄓㄨㄥ ㄒㄧㄣ",
    "meaningVi": "trung tâm",
    "meaningEn": "center",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "畢業",
    "simplified": "毕业",
    "pinyin": "bìyè",
    "zhuyin": "ㄅㄧˋ ㄧㄝˋ",
    "meaningVi": "tốt nghiệp",
    "meaningEn": "to graduate",
    "wordType": "Vp-sep",
    "tocflLevel": "2",
    "strokeCount": 24,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "找",
    "simplified": "找",
    "pinyin": "zhǎo",
    "zhuyin": "ㄓㄠˇ",
    "meaningVi": "tìm kiếm",
    "meaningEn": "to look for",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      12
    ]
  },
  {
    "traditional": "生日",
    "simplified": "生日",
    "pinyin": "shēngrì",
    "zhuyin": "ㄕㄥ ㄖˋ",
    "meaningVi": "sinh nhật",
    "meaningEn": "birthday",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "快樂",
    "simplified": "快乐",
    "pinyin": "kuàilè",
    "zhuyin": "ㄎㄨㄞˋ ㄌㄜˋ",
    "meaningVi": "vui vẻ, hạnh phúc",
    "meaningEn": "happy",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 28,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "回來",
    "simplified": "回来",
    "pinyin": "huílái",
    "zhuyin": "ㄏㄨㄟˊ ㄌㄞˊ",
    "meaningVi": "trở về",
    "meaningEn": "to come back",
    "wordType": "Vi",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "忘/忘了",
    "simplified": "忘/忘了",
    "pinyin": "wàng/wàngle",
    "zhuyin": "ㄨㄤˋ",
    "meaningVi": "quên",
    "meaningEn": "to forget",
    "wordType": "Vpt",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "記得",
    "simplified": "记得",
    "pinyin": "jìde",
    "zhuyin": "ㄐㄧˋ ㄉㄜ˙",
    "meaningVi": "ghi nhớ",
    "meaningEn": "to remember",
    "wordType": "Vst",
    "tocflLevel": "1",
    "strokeCount": 17,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "當然",
    "simplified": "当然",
    "pinyin": "dāngrán",
    "zhuyin": "ㄉㄤ ㄖㄢˊ",
    "meaningVi": "đương nhiên, tất nhiên",
    "meaningEn": "certainly, of course",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 25,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "交換",
    "simplified": "交换",
    "pinyin": "jiāohuàn",
    "zhuyin": "ㄐㄧㄠ ㄏㄨㄢˋ",
    "meaningVi": "trao đổi",
    "meaningEn": "to exchange",
    "wordType": "V",
    "tocflLevel": "2",
    "strokeCount": 19,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "蛋糕",
    "simplified": "蛋糕",
    "pinyin": "dàngāo",
    "zhuyin": "ㄉㄢˋ ㄍㄠ",
    "meaningVi": "bánh ngọt, bánh sinh nhật",
    "meaningEn": "cake",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 21,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "禮物",
    "simplified": "礼物",
    "pinyin": "lǐwù",
    "zhuyin": "ㄌㄧˇ ㄨˋ",
    "meaningVi": "quà tặng",
    "meaningEn": "gift, present",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 26,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "送",
    "simplified": "送",
    "pinyin": "sòng",
    "zhuyin": "ㄙㄨㄥˋ",
    "meaningVi": "tặng",
    "meaningEn": "to give as a present",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 10,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "祝",
    "simplified": "祝",
    "pinyin": "zhù",
    "zhuyin": "ㄓㄨˋ",
    "meaningVi": "chúc",
    "meaningEn": "to wish (someone something)",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "乾杯",
    "simplified": "干杯",
    "pinyin": "gānbēi",
    "zhuyin": "ㄍㄢ ㄅㄟ",
    "meaningVi": "nâng ly, cạn ly",
    "meaningEn": "Cheers!, to toast",
    "wordType": "V-sep",
    "tocflLevel": "2",
    "strokeCount": 16,
    "lessonNumbers": [
      13
    ]
  },
  {
    "traditional": "天氣",
    "simplified": "天气",
    "pinyin": "tiānqì",
    "zhuyin": "ㄊㄧㄢ ㄑㄧˋ",
    "meaningVi": "thời tiết",
    "meaningEn": "weather",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "冷",
    "simplified": "冷",
    "pinyin": "lěng",
    "zhuyin": "ㄌㄥˇ",
    "meaningVi": "lạnh",
    "meaningEn": "cold",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "熱",
    "simplified": "热",
    "pinyin": "rè",
    "zhuyin": "ㄖㄜˋ",
    "meaningVi": "nóng",
    "meaningEn": "hot",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "下雨",
    "simplified": "下雨",
    "pinyin": "xiàyǔ",
    "zhuyin": "ㄒㄧㄚˋ ㄩˇ",
    "meaningVi": "mưa",
    "meaningEn": "to rain",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 11,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "颱風",
    "simplified": "台风",
    "pinyin": "táifeng",
    "zhuyin": "ㄊㄞˊ ㄈㄥ",
    "meaningVi": "bão",
    "meaningEn": "typhoon",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 23,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "穿",
    "simplified": "穿",
    "pinyin": "chuān",
    "zhuyin": "ㄔㄨㄢ",
    "meaningVi": "mặc",
    "meaningEn": "to wear, put on",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "衣服",
    "simplified": "衣服",
    "pinyin": "yīfú",
    "zhuyin": "ㄧ ㄈㄨˊ",
    "meaningVi": "quần áo",
    "meaningEn": "clothes",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 14,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "旅館",
    "simplified": "旅馆",
    "pinyin": "lǚguǎn",
    "zhuyin": "ㄌㄩˇ ㄍㄨㄢˇ",
    "meaningVi": "khách sạn, nhà nghỉ",
    "meaningEn": "hotel",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 26,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "太太",
    "simplified": "太太",
    "pinyin": "tàitai",
    "zhuyin": "ㄊㄞˋ ㄊㄞ˙",
    "meaningVi": "vợ, bà",
    "meaningEn": "wife, Mrs.",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "乾淨",
    "simplified": "干净",
    "pinyin": "gānjìng",
    "zhuyin": "ㄍㄢ ㄐㄧㄥˋ",
    "meaningVi": "sạch sẽ",
    "meaningEn": "clean",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "窗戶",
    "simplified": "窗户",
    "pinyin": "chuānghu",
    "zhuyin": "ㄔㄨㄤ ㄏㄨ˙",
    "meaningVi": "cửa sổ",
    "meaningEn": "window",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "往",
    "simplified": "往",
    "pinyin": "wǎng",
    "zhuyin": "ㄨㄤˇ",
    "meaningVi": "hướng về",
    "meaningEn": "toward, to",
    "wordType": "Prep",
    "tocflLevel": "1",
    "strokeCount": 8,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "藍色",
    "simplified": "蓝色",
    "pinyin": "lánsè",
    "zhuyin": "ㄌㄢˊ ㄙㄜˋ",
    "meaningVi": "màu xanh dương",
    "meaningEn": "blue color",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 26,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "因為",
    "simplified": "因为",
    "pinyin": "yīnwèi",
    "zhuyin": "ㄧㄣ ㄨㄟˋ",
    "meaningVi": "bởi vì",
    "meaningEn": "because",
    "wordType": "Conj",
    "tocflLevel": "1",
    "strokeCount": 18,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "住",
    "simplified": "住",
    "pinyin": "zhù",
    "zhuyin": "ㄓㄨˋ",
    "meaningVi": "ở, sống",
    "meaningEn": "to live, stay",
    "wordType": "Vst",
    "tocflLevel": "1",
    "strokeCount": 7,
    "lessonNumbers": [
      14
    ]
  },
  {
    "traditional": "一直",
    "simplified": "一直",
    "pinyin": "yìzhí",
    "zhuyin": "ㄧ ㄓˊ",
    "meaningVi": "liên tục, suốt",
    "meaningEn": "continuously, all the time",
    "wordType": "Adv",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "流鼻水",
    "simplified": "流鼻水",
    "pinyin": "liú bíshuǐ",
    "zhuyin": "ㄌㄧㄡˊ ㄅㄧˊ ㄕㄨㄟˇ",
    "meaningVi": "chảy nước mũi",
    "meaningEn": "to have a runny nose",
    "wordType": "V-sep",
    "tocflLevel": "1",
    "strokeCount": 28,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "頭",
    "simplified": "头",
    "pinyin": "tóu",
    "zhuyin": "ㄊㄡˊ",
    "meaningVi": "đầu",
    "meaningEn": "head",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 16,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "痛",
    "simplified": "痛",
    "pinyin": "tòng",
    "zhuyin": "ㄊㄨㄥˋ",
    "meaningVi": "đau",
    "meaningEn": "painful, hurt",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 12,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "胃口",
    "simplified": "胃口",
    "pinyin": "wèikǒu",
    "zhuyin": "ㄨㄟˋ ㄎㄡˇ",
    "meaningVi": "khẩu vị, thèm ăn",
    "meaningEn": "appetite",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 12,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "差",
    "simplified": "差",
    "pinyin": "chā",
    "zhuyin": "ㄔㄚ",
    "meaningVi": "kém, tồi",
    "meaningEn": "poor, bad",
    "wordType": "Vs",
    "tocflLevel": "1",
    "strokeCount": 9,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "喉嚨",
    "simplified": "喉咙",
    "pinyin": "hóulóng",
    "zhuyin": "ㄏㄡˊ ㄌㄨㄥˊ",
    "meaningVi": "họng",
    "meaningEn": "throat",
    "wordType": "N",
    "tocflLevel": "2",
    "strokeCount": 28,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "發炎",
    "simplified": "发炎",
    "pinyin": "fāyán",
    "zhuyin": "ㄈㄚ ㄧㄢˊ",
    "meaningVi": "phát viêm, viêm nhiễm",
    "meaningEn": "to be inflamed",
    "wordType": "Vp-sep",
    "tocflLevel": "2",
    "strokeCount": 20,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "生病",
    "simplified": "生病",
    "pinyin": "shengbìng",
    "zhuyin": "ㄕㄥ ㄅㄧㄥˋ",
    "meaningVi": "bị bệnh, ốm",
    "meaningEn": "to fall ill / sick",
    "wordType": "Vp-sep",
    "tocflLevel": "1",
    "strokeCount": 15,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "發燒",
    "simplified": "发烧",
    "pinyin": "fāshāo",
    "zhuyin": "ㄈㄚ ㄕㄠ",
    "meaningVi": "bị sốt",
    "meaningEn": "to have a fever",
    "wordType": "Vp-sep",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "感冒",
    "simplified": "感冒",
    "pinyin": "gǎnmào",
    "zhuyin": "ㄍㄢˇ ㄇㄠˋ",
    "meaningVi": "bị cảm cúm",
    "meaningEn": "to catch a cold",
    "wordType": "Vp",
    "tocflLevel": "1",
    "strokeCount": 26,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "休息",
    "simplified": "休息",
    "pinyin": "xiūxí",
    "zhuyin": "ㄒㄧㄨ ㄒㄧˊ",
    "meaningVi": "nghỉ ngơi",
    "meaningEn": "to rest",
    "wordType": "Vi",
    "tocflLevel": "1",
    "strokeCount": 20,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "藥",
    "simplified": "药",
    "pinyin": "yào",
    "zhuyin": "ㄧㄠˋ",
    "meaningVi": "thuốc",
    "meaningEn": "medicine",
    "wordType": "N",
    "tocflLevel": "1",
    "strokeCount": 19,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "照顧",
    "simplified": "照顾",
    "pinyin": "zhàogù",
    "zhuyin": "ㄓㄠˋ ㄍㄨˋ",
    "meaningVi": "chăm sóc",
    "meaningEn": "to take care of",
    "wordType": "V",
    "tocflLevel": "1",
    "strokeCount": 34,
    "lessonNumbers": [
      15
    ]
  },
  {
    "traditional": "健康",
    "simplified": "健康",
    "pinyin": "jiànkāng",
    "zhuyin": "ㄐㄧㄢˋ ㄎㄤ",
    "meaningVi": "sức khỏe / khỏe mạnh",
    "meaningEn": "health / healthy",
    "wordType": "N/Vs",
    "tocflLevel": "1",
    "strokeCount": 22,
    "lessonNumbers": [
      15
    ]
  }
];

export class SeedContemporaryChineseBook1Vocabulary1762400000000 implements MigrationInterface {
  name = 'SeedContemporaryChineseBook1Vocabulary1762400000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    const books = (await queryRunner.query(
      'SELECT id FROM course_books WHERE code = ?',
      [BOOK_CODE],
    )) as Array<{ id: number | string }>;
    const bookId = Number(books[0]?.id);
    if (!bookId) throw new Error(`Course book ${BOOK_CODE} must exist before importing vocabulary`);

    const lessonRows = (await queryRunner.query(
      'SELECT id, lesson_number AS lessonNumber FROM course_lessons WHERE book_id = ?',
      [bookId],
    )) as Array<{ id: number | string; lessonNumber: number | string }>;
    const lessonIds = new Map(lessonRows.map((lesson) => [Number(lesson.lessonNumber), Number(lesson.id)]));

    for (const lesson of LESSONS) {
      const lessonId = lessonIds.get(lesson.lessonNumber);
      if (!lessonId) throw new Error(`Missing Book 1 lesson ${lesson.lessonNumber}`);
      await queryRunner.query(
        'UPDATE course_lessons SET title = ? WHERE id = ?',
        [lesson.title, lessonId],
      );
    }

    for (const word of WORDS) {
      const existing = (await queryRunner.query(
        'SELECT id FROM vocabulary WHERE traditional = ? ORDER BY id ASC LIMIT 1',
        [word.traditional],
      )) as Array<{ id: number | string }>;
      let vocabularyId = Number(existing[0]?.id);

      if (!vocabularyId) {
        await queryRunner.query(
          `INSERT INTO vocabulary
            (traditional, simplified, pinyin, zhuyin, meaning_vi, meaning_en, word_type, tocfl_level, stroke_count, audio_url)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`,
          [word.traditional, word.simplified, word.pinyin, word.zhuyin, word.meaningVi, word.meaningEn, word.wordType, word.tocflLevel, word.strokeCount],
        );
        const inserted = (await queryRunner.query('SELECT LAST_INSERT_ID() AS id')) as Array<{ id: number | string }>;
        vocabularyId = Number(inserted[0]?.id);
      } else {
        await queryRunner.query(
          `UPDATE vocabulary SET simplified = ?, pinyin = ?, zhuyin = ?, meaning_vi = ?, meaning_en = ?,
            word_type = ?, tocfl_level = ?, stroke_count = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
          [word.simplified, word.pinyin, word.zhuyin, word.meaningVi, word.meaningEn, word.wordType, word.tocflLevel, word.strokeCount, vocabularyId],
        );
      }

      for (const lessonNumber of word.lessonNumbers) {
        const lessonId = lessonIds.get(lessonNumber);
        if (!lessonId) throw new Error(`Missing Book 1 lesson ${lessonNumber}`);
        await queryRunner.query(
          'INSERT IGNORE INTO course_lesson_vocabulary (lesson_id, vocabulary_id) VALUES (?, ?)',
          [lessonId, vocabularyId],
        );
      }
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const lessons = (await queryRunner.query(
      `SELECT l.id FROM course_lessons l
       JOIN course_books b ON b.id = l.book_id
       WHERE b.code = ?`,
      [BOOK_CODE],
    )) as Array<{ id: number | string }>;

    for (const lesson of lessons) {
      await queryRunner.query(
        'DELETE FROM course_lesson_vocabulary WHERE lesson_id = ?',
        [lesson.id],
      );
    }
  }
}
