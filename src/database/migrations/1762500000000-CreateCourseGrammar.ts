import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseGrammar1762500000000 implements MigrationInterface {
  async up(runner: QueryRunner): Promise<void> {
    await runner.query(`CREATE TABLE IF NOT EXISTS course_lesson_grammar (
      lesson_id BIGINT NOT NULL,
      position INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      pattern TEXT,
      description TEXT,
      example TEXT,
      example_pinyin TEXT,
      translation TEXT,
      PRIMARY KEY (lesson_id, position),
      FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    const lessons: { id: number; number: number }[] = await runner.query(`SELECT l.id, l.lesson_number AS number
      FROM course_lessons l JOIN course_books b ON b.id = l.book_id
      WHERE b.code = 'contemporary-chinese-1'`);
    const ids = new Map<number, number>(lessons.map((lesson) => [Number(lesson.number), lesson.id]));
    if (ids.size !== 15) throw new Error('Book 1 lessons must exist before importing grammar');
    for (const [position, point] of seed.entries()) {
      await runner.query(`INSERT INTO course_lesson_grammar
        (lesson_id, position, title, pattern, description, example, example_pinyin, translation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title=VALUES(title), pattern=VALUES(pattern), description=VALUES(description),
          example=VALUES(example), example_pinyin=VALUES(example_pinyin), translation=VALUES(translation)`,
        [ids.get(Number(point.lesson.slice(-2))), position, point.title, point.pattern,
          point.description, point.example, point.examplePinyin, point.translation]);
    }
  }

  async down(runner: QueryRunner): Promise<void> {
    await runner.query('DROP TABLE IF EXISTS course_lesson_grammar');
  }
}

const seed = [
  {
    "lesson": "Bài 01",
    "title": "Câu khẳng định & phủ định với 是",
    "pinyin": "Shì Sentences",
    "pattern": "主語 + 是 / 不是 + 名詞",
    "description": "Dùng để khẳng định hoặc phủ định danh tính, nghề nghiệp, quốc tịch.",
    "english": "Used to identify or negate identity, profession, nationality.",
    "example": "我是白如玉。/ 我不是老師。",
    "examplePinyin": "Wǒ shì Bái Rúyù. / Wǒ bú shì lǎoshī.",
    "translation": "Tôi là Bạch Như Ngọc. / Tôi không phải là giáo viên."
  },
  {
    "lesson": "Bài 01",
    "title": "Câu hỏi Yes/No với 嗎",
    "pinyin": "Ma Questions",
    "pattern": "陳述句 + 嗎？",
    "description": "Đặt trợ từ nghi vấn 嗎 ở cuối câu để tạo câu hỏi Có/Không.",
    "english": "Placed at the end of a statement to form a Yes/No question.",
    "example": "你是台灣人嗎？",
    "examplePinyin": "Nǐ shì Táiwān rén ma?",
    "translation": "Bạn có phải là người Đài Loan không?"
  },
  {
    "lesson": "Bài 01",
    "title": "Câu hỏi tỉnh lược với 呢",
    "pinyin": "Ne Elliptical Questions",
    "pattern": "名詞/代詞 + 呢？",
    "description": "Hỏi lại đối phương hoặc truy hỏi vị trí của ai/cái gì ('Còn... thì sao?').",
    "english": "Used to ask 'What about...?' or inquire location/status.",
    "example": "我很好，你呢？",
    "examplePinyin": "Wǒ hěn hǎo, nǐ ne?",
    "translation": "Tôi rất khỏe, còn bạn thì sao?"
  },
  {
    "lesson": "Bài 01",
    "title": "Phó từ 也 (Cũng) & 都 (Đều)",
    "pinyin": "Adverbs 也 & 都",
    "pattern": "主語 + 也/都 + 動詞/形容詞",
    "description": "也 diễn tả sự đồng nhất; 都 diễn tả tất cả/toàn bộ.",
    "english": "也 indicates 'also/too'; 都 indicates 'all/both'.",
    "example": "他也學中文。/ 我們都不是美國人。",
    "examplePinyin": "Tā yě xué Zhōngwén. / Wǒmen dōu bú shì Měiguó rén.",
    "translation": "Anh ấy cũng học tiếng Trung. / Chúng tôi đều không phải là người Mỹ."
  },
  {
    "lesson": "Bài 02",
    "title": "Câu sở hữu / tồn tại với 有",
    "pinyin": "Possession & Existence with 有",
    "pattern": "主語 + 有 / 沒有 + 賓語",
    "description": "Diễn tả sự sở hữu ('có') hoặc phủ định ('không có' dùng 沒有).",
    "english": "Indicates possession ('have') or non-possession (use 沒有).",
    "example": "我有三個哥哥。/ 他沒有妹妹。",
    "examplePinyin": "Wǒ yǒu sān gè gēge. / Tā méiyǒu mèimei.",
    "translation": "Tôi có 3 người anh trai. / Anh ấy không có em gái."
  },
  {
    "lesson": "Bài 02",
    "title": "Cấu trúc Số từ + Lượng từ + Danh từ",
    "pinyin": "Number + Classifier + Noun",
    "pattern": "數詞 + 量詞 + 名詞",
    "description": "Số đếm phải đi kèm lượng từ thích hợp trước danh từ. Dùng 兩 (liǎng) cho số lượng 2.",
    "english": "Numbers must be followed by measure words. Use 兩 (liǎng) for quantity 2.",
    "example": "兩隻狗 / 五個人",
    "examplePinyin": "Liǎng zhī gǒu / Wǔ gè rén",
    "translation": "2 con chó / 5 người"
  },
  {
    "lesson": "Bài 02",
    "title": "Đại từ chỉ định 這 (Đây) / 那 (Đó)",
    "pinyin": "Demonstratives 這 & 那",
    "pattern": "這 / 那 (+ 量詞) + 名詞",
    "description": "這 chỉ khoảng cách gần người nói; 那 chỉ khoảng cách xa.",
    "english": "這 refers to close objects ('this'); 那 refers to distant ones ('that').",
    "example": "這是我的家人。/ 那隻狗很小。",
    "examplePinyin": "Zhè shì wǒ de jiāren. / Nà zhī gǒu hěn xiǎo.",
    "translation": "Đây là gia đình tôi. / Con chó đó rất nhỏ."
  },
  {
    "lesson": "Bài 02",
    "title": "Phó từ 都 (Tất cả / Đều)",
    "pinyin": "All / Both with 都",
    "pattern": "主語 (複數) + 都 + Predicate",
    "description": "Đứng trước động từ/tính từ để chỉ toàn bộ chủ ngữ số nhiều.",
    "english": "Placed before predicates to emphasize 'all' or 'both'.",
    "example": "他們都很忙。/ 我們都喜歡吃台灣菜。",
    "examplePinyin": "Tāmen dōu hěn máng. / Wǒmen dōu xǐhuan chī Táiwān cài.",
    "translation": "Họ đều rất bận. / Chúng tôi đều thích ăn món Đài Loan."
  },
  {
    "lesson": "Bài 03",
    "title": "Mục đích di chuyển với 去 + VP",
    "pinyin": "Purpose Movement 去 + VP",
    "pattern": "主語 + 去 + 地點 + 做什麼",
    "description": "Diễn tả đi đến đâu để thực hiện mục đích gì.",
    "english": "Indicates going to a place to accomplish a purpose.",
    "example": "我明天去圖書館看書。",
    "examplePinyin": "Wǒ míngtiān qù túshūguǎn kàn shū.",
    "translation": "Ngày mai tôi đi thư viện đọc sách."
  },
  {
    "lesson": "Bài 03",
    "title": "Trạng ngữ chỉ thời gian trong câu",
    "pinyin": "Time Expressions in Sentences",
    "pattern": "時間 + 主語 + VP  hoặc  主語 + 時間 + VP",
    "description": "Trạng ngữ thời gian đứng trước chủ ngữ hoặc ngay sau chủ ngữ (trước động từ).",
    "english": "Time words appear either before the subject or directly after it.",
    "example": "週末我看電影。/ 我週末看電影。",
    "examplePinyin": "Zhōumò wǒ kàn diànyǐng. / Wǒ zhōumò kàn diànyǐng.",
    "translation": "Cuối tuần tôi đi xem phim."
  },
  {
    "lesson": "Bài 03",
    "title": "Trợ động từ 想 / 要 / 打算",
    "pinyin": "Intentions: 想, 要, 打算",
    "pattern": "主語 + 想 / 要 / 打算 + VP",
    "description": "想: muốn/mong ước; 要: muốn/cần làm; 打算: dự định/kế hoạch.",
    "english": "想 (would like), 要 (want/plan), 打算 (intend/plan).",
    "example": "我想學中文。/ 我打算去台灣旅遊。",
    "examplePinyin": "Wǒ xiǎng xué Zhōngwén. / Wǒ dǎsuàn qù Táiwān lǚyóu.",
    "translation": "Tôi muốn học tiếng Trung. / Tôi dự định đi du lịch Đài Loan."
  },
  {
    "lesson": "Bài 03",
    "title": "Động từ ly hợp (V-sep)",
    "pinyin": "Separable Verbs (V-sep)",
    "pattern": "V + (成分) + N",
    "description": "Động từ gồm 2 yếu tố V+N, có thể tách ra để chèn lượng từ, thời lượng, trợ từ.",
    "english": "Verbs formed by V+N that can split to insert components.",
    "example": "唱歌 (唱了三小時的歌) / 上網 / 睡覺",
    "examplePinyin": "Chànggē (Chàng le sān xiǎoshí de gē) / Shàngwǎng / Shuìjiào",
    "translation": "Hát karaoke (Hát 3 tiếng đồng hồ) / Lướt web / Ngủ"
  },
  {
    "lesson": "Bài 04",
    "title": "Cách biểu thị giá tiền",
    "pinyin": "Expressing Money & Prices",
    "pattern": "數詞 + 塊 (元) + 數詞 + 毛 (角) (+ 分)",
    "description": "Văn nói dùng 塊 (kuài), 毛 (máo); văn viết dùng 元 (yuán), 角 (jiǎo).",
    "english": "Spoken Chinese uses 塊/毛; written uses 元/角.",
    "example": "這本書一共一百五十塊。",
    "examplePinyin": "Zhè běn shū yīgòng yī bǎi wǔ shí kuài.",
    "translation": "Cuốn sách này tổng cộng 150 đài tệ."
  },
  {
    "lesson": "Bài 04",
    "title": "Trợ từ ngữ khí 吧 (Đề nghị/Gợi ý)",
    "pinyin": "Suggestions with 吧",
    "pattern": "Câu đề nghị + 吧！",
    "description": "Đóng vai trò gợi ý, thương lượng hoặc rủ rê một cách lịch sự.",
    "english": "Used at the end of sentences for polite suggestions or agreement.",
    "example": "我們買這支手機吧！",
    "examplePinyin": "Wǒmen mǎi zhè zhī shǒujī ba!",
    "translation": "Chúng mình mua chiếc điện thoại này đi!"
  },
  {
    "lesson": "Bài 04",
    "title": "Phó từ 一共 (Tổng cộng)",
    "pinyin": "Total Amount with 一共",
    "pattern": "一共 + 數字/金額/量詞",
    "description": "Dùng khi tính tổng số lượng hoặc tổng chi phí.",
    "english": "Used when summing up quantities or total cost.",
    "example": "請問一共多少錢？ / 一共五百塊。",
    "examplePinyin": "Qǐngwèn yīgòng duōshǎo qián? / Yīgòng wǔ bǎi kuài.",
    "translation": "Xin hỏi tổng cộng bao nhiêu tiền? / Tổng cộng 500 đài tệ."
  },
  {
    "lesson": "Bài 05",
    "title": "Phó từ mức độ 太...了 / 真 / 很",
    "pinyin": "Degree Exclamations: 太...了, 真, 很",
    "pattern": "太 + Adj + 了 / 真 + Adj / 很 + Adj",
    "description": "太...了 (quá/rất), 真 (thật là), 很 (rất).",
    "english": "Expresses degree and emotions ('too/so/very').",
    "example": "牛肉麵太美味了！ / 這裡的東西真便宜。",
    "examplePinyin": "Niúròumiàn tài měiwèi le! / Zhèlǐ de dōngxi zhēn piányi.",
    "translation": "Mì bò ngon quá đi! / Đồ ở đây thật là rẻ."
  },
  {
    "lesson": "Bài 05",
    "title": "Bổ ngữ trạng thái với 得",
    "pinyin": "Complement Marker 得 (de)",
    "pattern": "V + (O) + V + 得 + Adj",
    "description": "Đứng sau động từ để miêu tả mức độ, trạng thái hoặc kết quả của hành động.",
    "english": "Follows verbs to evaluate or describe how an action is performed.",
    "example": "他學中文學得很好。 / 媽媽做飯做得不錯。",
    "examplePinyin": "Tā xué Zhōngwén xué de hěn hǎo. / Māma zuò fàn zuò de búcuò.",
    "translation": "Anh ấy học tiếng Trung rất tốt. / Mẹ nấu ăn khá ngon."
  },
  {
    "lesson": "Bài 05",
    "title": "Phân biệt phủ định 不 & 沒",
    "pinyin": "Negation: 不 vs. 沒",
    "pattern": "不 + V/Adj (hiện tại/thói quen) | 沒 + V (quá khứ/chưa)",
    "description": "不 dùng phủ định tính chất, thói quen, tương lai; 沒 phủ định sự việc đã xảy ra.",
    "english": "不 negates habits/future/states; 沒 negates past actions/completion.",
    "example": "我不吃牛肉。 / 我今天沒吃早餐。",
    "examplePinyin": "Wǒ bù chī niúròu. / Wǒ jīntiān méi chī zǎocān.",
    "translation": "Tôi không ăn thịt bò. / Hôm nay tôi chưa ăn sáng."
  },
  {
    "lesson": "Bài 06",
    "title": "Biểu thị vị trí với 在",
    "pinyin": "Locative Structure with 在",
    "pattern": "主語 + 在 + 地點 (+ 方位詞)",
    "description": "Diễn tả vị trí tồn tại của người hoặc vật.",
    "english": "Expresses location of a person or object.",
    "example": "他們學校在山上。 / 書在桌子上。",
    "examplePinyin": "Tāmen xuéxiào zài shān shàng. / Shū zài zhuōzi shàng.",
    "translation": "Trường của họ ở trên núi. / Sách ở trên bàn."
  },
  {
    "lesson": "Bài 06",
    "title": "Phương tiện di chuyển 坐 / 騎 / 走路",
    "pinyin": "Means of Transport: 坐, 騎, 走路",
    "pattern": "坐/騎 + 交通工具 + 去/來 + 地點",
    "description": "坐 (đi xe/tàu), 騎 (đi xe máy/xe đạp), 走路 (đi bộ).",
    "english": "坐 (take bus/train), 騎 (ride bike/scooter), 走路 (walk).",
    "example": "我坐公車去學校。 / 他騎機車上班。",
    "examplePinyin": "Wǒ zuò gōngchē qù xuéxiào. / Tā qí jīchē shàngbān.",
    "translation": "Tôi đi xe buýt đến trường. / Anh ấy đi xe máy đi làm."
  },
  {
    "lesson": "Bài 06",
    "title": "Cấu trúc 從...到... (Từ... Đến...)",
    "pinyin": "From... To... (從...到...)",
    "pattern": "從 + 地點A/時間A + 到 + 地點B/時間B",
    "description": "Biểu thị phạm vi khoảng cách không gian hoặc khoảng thời gian.",
    "english": "Indicates spatial distance or time span.",
    "example": "從我家到學校很近。 / 從早上到晚上。",
    "examplePinyin": "Cóng wǒ jiā dào xuéxiào hěn jìn. / Cóng zǎoshàng dào wǎnshàng.",
    "translation": "Từ nhà tôi đến trường rất gần. / Từ sáng đến tối."
  },
  {
    "lesson": "Bài 07",
    "title": "Cấu trúc Thời gian + Địa điểm + Hành động",
    "pinyin": "Time + Place + Action Order",
    "pattern": "Time + Place + Event",
    "description": "Trật tự từ chuẩn trong câu tiếng Trung: Khi nào -> Ở đâu -> Làm gì.",
    "english": "Standard Chinese sentence order: Time -> Place -> Action.",
    "example": "他下午在教室寫書法。",
    "examplePinyin": "Tā xiàwǔ zài jiàoshì xiě shūfǎ.",
    "translation": "Chiều nay anh ấy luyện viết thư pháp ở lớp học."
  },
  {
    "lesson": "Bài 07",
    "title": "Trạng thái đang diễn ra với 在",
    "pinyin": "Progressive Action with 在",
    "pattern": "主語 + 在 (+ 動詞)",
    "description": "Diễn tả hành động đang diễn ra tại thời điểm nói.",
    "english": "Indicates an action currently in progress.",
    "example": "看！陳先生正在唱歌。 / 我們在開會。",
    "examplePinyin": "Kàn! Chén xiānsheng zhèngzài chànggē. / Wǒmen zài kāihuì.",
    "translation": "Kìa! Thầy Trần đang hát. / Chúng tôi đang họp."
  },
  {
    "lesson": "Bài 07",
    "title": "Phó từ 就 (Biểu thị nhanh/sớm)",
    "pinyin": "Sooner than expected with 就",
    "pattern": "Condition/Distance + 就 + V",
    "description": "Nhấn mạnh sự việc xảy ra nhanh chóng, dễ dàng hoặc sớm hơn dự kiến.",
    "english": "Emphasizes that an event occurs quickly, easily, or early.",
    "example": "走路十分鐘就到了。",
    "examplePinyin": "Zǒulù shí fēnzhōng jiù dào le.",
    "translation": "Đi bộ 10 phút là tới rồi."
  },
  {
    "lesson": "Bài 08",
    "title": "Câu so sánh với 比",
    "pinyin": "Comparison Sentences with 比",
    "pattern": "A + 比 + B + Adj + (一點 / 得多 / 多了)",
    "description": "So sánh hơn giữa A và B. Thêm 一點 (một chút) hoặc 得多/多了 (hơn nhiều).",
    "english": "Compares A and B. Add 一點 (a little) or 得多/多了 (much more).",
    "example": "高鐵比火車快得多。 / 西瓜比蘋果大一點。",
    "examplePinyin": "Gāotiě bǐ huǒchē kuài de duō. / Xīguā bǐ píngguǒ dà yīdiǎn.",
    "translation": "Tàu cao tốc nhanh hơn tàu hỏa rất nhiều. / Dưa hấu to hơn táo một chút."
  },
  {
    "lesson": "Bài 08",
    "title": "Trình tự hành động 先...再...",
    "pinyin": "First... Then... (先...再...)",
    "pattern": "先 + Action 1 + 再 + Action 2",
    "description": "Diễn tả trình tự thời gian của hai hành động nối tiếp nhau.",
    "english": "Indicates the chronological order of two consecutive events.",
    "example": "我想先吃晚飯再做功課。",
    "examplePinyin": "Wǒ xiǎng xiān chī wǎnfàn zài zuò gōngkè.",
    "translation": "Tôi muốn ăn tối trước rồi mới làm bài tập."
  },
  {
    "lesson": "Bài 08",
    "title": "Phủ định so sánh với 沒有",
    "pinyin": "Negative Comparison with 沒有",
    "pattern": "A + 沒有 + B + (那麼/這麼) + Adj",
    "description": "A không bằng B (không đến mức như B).",
    "english": "A is not as... as B.",
    "example": "火車沒有高鐵那麼快。",
    "examplePinyin": "Huǒchē méiyǒu gāotiě nàme kuài.",
    "translation": "Tàu hỏa không nhanh bằng tàu cao tốc."
  },
  {
    "lesson": "Bài 09",
    "title": "Nguyên nhân - Kết quả 因為...所以...",
    "pinyin": "Cause & Effect: 因為...所以...",
    "pattern": "因為 + Cause, 所以 + Effect",
    "description": "Liên kết hai mệnh đề biểu thị quan hệ nguyên nhân và kết quả.",
    "english": "Connects clauses to state reason and result.",
    "example": "因為下雨，所以我們不去打球。",
    "examplePinyin": "Yīnwèi xià yǔ, suǒyǐ wǒmen bú qù dǎ qiú.",
    "translation": "Vì trời mưa nên chúng tôi không đi chơi bóng."
  },
  {
    "lesson": "Bài 09",
    "title": "Giả định 要是...就...",
    "pinyin": "Condition: 要是...就...",
    "pattern": "要是 + Condition, 就 + Result",
    "description": "Diễn tả điều kiện giả định và kết quả kéo theo.",
    "english": "States a hypothetical condition and its outcome.",
    "example": "要是明天有空，我就跟你去觀光。",
    "examplePinyin": "Yàoshi míngtiān yǒu kòng, wǒ jiù gēn nǐ qù guānguāng.",
    "translation": "Nếu ngày mai rảnh, tôi sẽ đi tham quan với bạn."
  },
  {
    "lesson": "Bài 09",
    "title": "Mục đích di chuyển 來 + VP",
    "pinyin": "Coming to do something (來 + VP)",
    "pattern": "主語 + 來 + VP",
    "description": "Diễn tả hướng di chuyển tiến lại gần người nói để thực hiện mục đích.",
    "english": "Indicates coming towards the speaker to perform an action.",
    "example": "他是來台灣學中文的。",
    "examplePinyin": "Tā shì lái Táiwān xué Zhōngwén de.",
    "translation": "Anh ấy đến Đài Loan để học tiếng Trung."
  },
  {
    "lesson": "Bài 10",
    "title": "Phân biệt 形容詞 + 一點 vs 一點 + 名詞",
    "pinyin": "Adjective + 一點 vs. 一點 + Noun",
    "pattern": "Adj + 一點 (so sánh/yêu cầu) | 一點 + N (số lượng nhỏ)",
    "description": "便宜一點 (Rẻ hơn một chút); 買一點水果 (Mua một ít hoa quả).",
    "english": "Adj + 一點 (a bit more...); 一點 + Noun (a little amount of...).",
    "example": "請算便宜一點。 / 我想買一點傳統糕點。",
    "examplePinyin": "Qǐng suàn piányi yīdiǎn. / Wǒ xiǎng mǎi yīdiǎn chuántǒng gāodiǎn.",
    "translation": "Xin tính rẻ hơn một chút. / Tôi muốn mua một ít bánh truyền thống."
  },
  {
    "lesson": "Bài 10",
    "title": "Đánh giá đặc tính 好/難 + V",
    "pinyin": "Evaluation: 好/難 + Verb",
    "pattern": "好 / 難 + 看 / 吃 / 喝 / 學 / 寫",
    "description": "好+V: dễ/ngon/đẹp (đánh giá tích cực); 難+V: khó/dở/xấu (đánh giá tiêu cực).",
    "english": "好+V (easy/good); 難+V (difficult/bad).",
    "example": "台灣的水果很好吃。 / 中文漢字有點難寫。",
    "examplePinyin": "Táiwān de shuǐguǒ hěn hǎochī. / Zhōngwén hànzì yǒudiǎn nán xiě.",
    "translation": "Hoa quả Đài Loan rất ngon. / Chữ Hán tiếng Trung hơi khó viết."
  },
  {
    "lesson": "Bài 10",
    "title": "Định ngữ phức hợp với 的",
    "pinyin": "Relative Clauses with 的",
    "pattern": "[S + V / Clause] + 的 + Noun",
    "description": "Mệnh đề định ngữ đứng trước 的 để bổ nghĩa cho danh từ phía sau.",
    "english": "Clauses precede 的 to modify the head noun.",
    "example": "我朋友給我的包子很好吃。",
    "examplePinyin": "Wǒ péngyǒu gěi wǒ de bāozi hěn hǎochī.",
    "translation": "Cái bánh bao mà bạn tôi cho ăn rất ngon."
  },
  {
    "lesson": "Bài 11",
    "title": "Trợ từ 了 cuối câu (Thay đổi trạng thái)",
    "pinyin": "Change of Situation (Sentential 了)",
    "pattern": "Câu + 了",
    "description": "Diễn tả một tình huống mới xuất hiện hoặc trạng thái có sự thay đổi.",
    "english": "Indicates a new situation or change of state.",
    "example": "現在有手機的人多了。 / 我會打網球了。",
    "examplePinyin": "Xiànzài yǒu shǒujī de rén duō le. / Wǒ huì dǎ wǎngqiú le.",
    "translation": "Bây giờ người có điện thoại nhiều rồi. / Tôi biết đánh quần vợt rồi."
  },
  {
    "lesson": "Bài 11",
    "title": "Biểu thị dừng hành động 不...了",
    "pinyin": "Not anymore (不...了)",
    "pattern": "主語 + 不 + V / Adj + 了",
    "description": "Diễn tả hành động hoặc trạng thái không còn tiếp diễn nữa.",
    "english": "Indicates that an action or state is discontinued.",
    "example": "我媽媽不喝咖啡了。 / 他不想買那台電腦了。",
    "examplePinyin": "Wǒ māma bù hē kāfēi le. / Tā bù xiǎng mǎi nà tái diànnǎo le.",
    "translation": "Mẹ tôi không uống cà phê nữa. / Anh ấy không muốn mua máy tính đó nữa."
  },
  {
    "lesson": "Bài 11",
    "title": "Quan hệ nhượng bộ 雖然...但是...",
    "pinyin": "Concession: 雖然...但是...",
    "pattern": "雖然 + Clause 1, 但是 + Clause 2",
    "description": "Tuy... nhưng... (biểu thị quan hệ nghịch chuyển giữa 2 mệnh đề).",
    "english": "Expresses concession ('although..., but...').",
    "example": "雖然這間房子很小，但是很乾淨。",
    "examplePinyin": "Suīrán zhè jiān fángzi hěn xiǎo, dànshì hěn gānjiàng.",
    "translation": "Tuy căn phòng này rất nhỏ nhưng rất sạch sẽ."
  },
  {
    "lesson": "Bài 12",
    "title": "Trợ từ biểu thị thời lượng V + 了 + Duration",
    "pinyin": "Action Duration with Verbal 了",
    "pattern": "V + 了 + Thời lượng (+ 的 + N)  hoặc  V + O + V + 了 + Thời lượng",
    "description": "Diễn tả khoảng thời gian hành động đã hoàn thành hoặc kéo dài.",
    "english": "Indicates the duration of a completed or ongoing action.",
    "example": "他在台灣住了一年。 / 他學中文學了三個月。",
    "examplePinyin": "Tā zài Táiwān zhù le yī nián. / Tā xué Zhōngwén xué le sān gè yuè.",
    "translation": "Anh ấy đã sống ở Đài Loan 1 năm. / Anh ấy học tiếng Trung được 3 tháng rồi."
  },
  {
    "lesson": "Bài 12",
    "title": "Hành động nối tiếp 一...就...",
    "pinyin": "As soon as... (一...就...)",
    "pattern": "一 + Event A + 就 + Event B",
    "description": "Sự việc B diễn ra ngay sau khi sự việc A vừa kết thúc.",
    "english": "Indicates Event B happens immediately after Event A.",
    "example": "我一下課，就回宿舍。 / 他一回國就找工作。",
    "examplePinyin": "Wǒ yī xiàkè, jiù huí sùshè. / Tā yī huíguó jiù zhǎo gōngzuò.",
    "translation": "Tôi vừa tan học là về ktx ngay. / Anh ấy vừa về nước là tìm việc ngay."
  },
  {
    "lesson": "Bài 12",
    "title": "Biểu thị sự tăng tiến 越來越...",
    "pinyin": "More and more (越來越...)",
    "pattern": "主語 + 越來越 + Adj / V-psych",
    "description": "Mức độ biến đổi ngày càng tăng theo thời gian.",
    "english": "Indicates a progressive increase over time.",
    "example": "天氣越來越熱了。 / 他的中文越來越好。",
    "examplePinyin": "Tiānqì yuè lái yuè rè le. / Tā de Zhōngwén yuè lái yuè hǎo.",
    "translation": "Thời tiết ngày càng nóng rồi. / Tiếng Trung của anh ấy ngày càng tốt."
  },
  {
    "lesson": "Bài 13",
    "title": "Cấu trúc nhấn mạnh 是...的",
    "pinyin": "Focus Structure 是...的",
    "pattern": "主語 + 是 + [Thời gian/Địa điểm/Phương thức] + V + 的",
    "description": "Nhấn mạnh thời gian, địa điểm, phương thức hoặc chủ thể của hành động đã xảy ra.",
    "english": "Highlights time, location, manner, or agent of a past event.",
    "example": "我是坐捷運來的。 / 這支手機是在夜市買的。",
    "examplePinyin": "Wǒ shì zuò jiéyùn lái de. / Zhè zhī shǒujī shì zài yèshì mǎi de.",
    "translation": "Tôi là đi tàu điện ngầm đến đây. / Chiếc điện thoại này là mua ở chợ đêm."
  },
  {
    "lesson": "Bài 13",
    "title": "Sơ lược câu xử trí 把 (Câu 把)",
    "pinyin": "Introduction to 把 Sentences",
    "pattern": "主語 + 把 + Noun (Xác định) + V + 結果/地點",
    "description": "Đưa tân ngữ lên trước động từ để nhấn mạnh sự tác động/xử lý làm thay đổi trạng thái của vật.",
    "english": "Places object before verb to emphasize disposal or effect.",
    "example": "請你把功課做完。 / 他把這杯咖啡喝了。",
    "examplePinyin": "Qǐng nǐ bǎ gōngkè zuò wán. / Tā bǎ zhè bēi kāfēi hē le.",
    "translation": "Cậu hãy làm xong bài tập đi. / Anh ấy uống hết ly cà phê này rồi."
  },
  {
    "lesson": "Bài 13",
    "title": "Phân biệt phó từ 剛 vs 剛才",
    "pinyin": "Just vs. Just now: 剛 vs. 剛才",
    "pattern": "剛 + V (phó từ) | 剛才 (danh từ thời gian)",
    "description": "剛 mang tính chủ quan (vừa mới); 剛才 là danh từ thời gian (vừa rồi/mới đây).",
    "english": "剛 is an adverb ('just'); 剛才 is a time noun ('just now').",
    "example": "我剛到台灣。 / 他剛才去圖書館了。",
    "examplePinyin": "Wǒ gāng dào Táiwān. / Tā gāngcái qù túshūguǎn le.",
    "translation": "Tôi vừa mới đến Đài Loan. / Vừa rồi anh ấy đã đi thư viện."
  },
  {
    "lesson": "Bài 14",
    "title": "Đại từ nghi vấn mang nghĩa toàn thể",
    "pinyin": "All-inclusive Question Words",
    "pattern": "誰 / 什麼 / 哪裡 + 都 / 也 + Predicate",
    "description": "Từ hỏi kết hợp với 都/也 biểu thị tính toàn thể ('ai cũng...', 'cái gì cũng...').",
    "english": "Question words + 都/也 express 'everyone', 'everything', 'everywhere'.",
    "example": "誰都知道這件事。 / 他什麼都想買。",
    "examplePinyin": "Shéi dōu zhīdào zhè jiàn shì. / Tā shénme dōu xiǎng mǎi.",
    "translation": "Ai cũng biết việc này. / Cái gì anh ấy cũng muốn mua."
  },
  {
    "lesson": "Bài 14",
    "title": "Bổ ngữ kết quả 見 / 開 / 好",
    "pinyin": "Result Complements 見, 開, 好",
    "pattern": "V + 見 / 開 / 好",
    "description": "見 (thấy/nhận ra), 開 (mở ra/tách ra), 好 (xong xuôi/hoàn thành tốt).",
    "english": "見 (perceive), 開 (open/apart), 好 (ready/complete).",
    "example": "你看見我的鑰匙了嗎？ / 晚餐準備好了。",
    "examplePinyin": "Nǐ kànjiàn wǒ de yào shi le ma? / Wǎncān zhǔnbèi hǎo le.",
    "translation": "Cậu có nhìn thấy chìa khóa của tôi không? / Bữa tối đã chuẩn bị xong rồi."
  },
  {
    "lesson": "Bài 14",
    "title": "Hành động lặp lại 又 vs 再",
    "pinyin": "Repetition: 又 vs. 再",
    "pattern": "又 + V (đã lặp lại) | 再 + V (sẽ lặp lại)",
    "description": "又 dùng cho hành động đã lặp lại trong quá khứ; 再 dùng cho hành động sẽ lặp lại trong tương lai.",
    "english": "又 for past repeated actions; 再 for future repeated actions.",
    "example": "今天他又遲到了。 / 歡迎下次再來！",
    "examplePinyin": "Jīntiān tā yòu chídào le. / Huānyíng xià cì zài lái!",
    "translation": "Hôm nay anh ấy lại đến muộn rồi. / Hoan nghênh lần sau lại đến!"
  },
  {
    "lesson": "Bài 15",
    "title": "Cấu trúc Ngoài... ra... 除了...以外...",
    "pinyin": "Besides / Except (除了...以外...)",
    "pattern": "除了 + A + 以外, (主語 + 也/還/都) + B",
    "description": "Chỉ sự bổ sung ('ngoài A ra còn B') hoặc loại trừ ('ngoài A ra tất cả đều B').",
    "english": "Expresses addition ('in addition to') or exclusion ('except for').",
    "example": "除了台灣以外，我也去過日本。 / 除了他以外，大家都來了。",
    "examplePinyin": "Chúle Táiwān yǐwài, wǒ yě qù guò Rìběn. / Chúle tā yǐwài, dàjiā dōu lái le.",
    "translation": "Ngoài Đài Loan ra, tôi cũng từng đi Nhật Bản. / Ngoại trừ anh ấy ra, mọi người đều đã đến."
  },
  {
    "lesson": "Bài 15",
    "title": "Cấu trúc hai hành động song song 一邊...一邊...",
    "pinyin": "Simultaneous Actions: 一邊...一邊...",
    "pattern": "主語 + 一邊 + Action 1 + 一邊 + Action 2",
    "description": "Diễn tả hai hành động diễn ra cùng một lúc.",
    "english": "Indicates two actions being performed at the same time.",
    "example": "我們一邊喝茶，一邊聊天。 / 他喜歡一邊聽音樂一邊寫功課。",
    "examplePinyin": "Wǒmen yībiān hē chá, yībiān liáotiān. / Tā xǐhuan yībiān tīng yīnyuè yībiān xiě gōngkè.",
    "translation": "Chúng tôi vừa uống trà vừa trò chuyện. / Anh ấy thích vừa nghe nhạc vừa làm bài tập."
  },
  {
    "lesson": "Bài 15",
    "title": "Cấu trúc trạng thái đi kèm V1 著 V2",
    "pinyin": "Accompanying State (V1 著 V2)",
    "pattern": "V1 + 著 + V2",
    "description": "V1+著 đóng vai trò phương thức/trạng thái cho hành động V2.",
    "english": "V1+著 indicates the manner or accompanying state of V2.",
    "example": "他們站著聊天。 / 老師笑著對我們說話。",
    "examplePinyin": "Tāmen zhàn zhe liáotiān. / Lǎoshī xiào zhe duì wǒmen shuōhuà.",
    "translation": "Họ đứng trò chuyện. / Thầy giáo mỉm cười nói chuyện với chúng tôi."
  }
];
