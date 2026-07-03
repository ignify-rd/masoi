/**
 * Cốt truyện mở đầu kiểu DnD — quản trò đọc to cho cả bàn trước khi chia vai.
 * {n} = số người chơi trong ván.
 */

const VILLAGE_STORIES = [
  {
    id: 'lang_keo_gung',
    title: 'Làng Kẹo Gừng',
    paragraphs: [
      'Các bạn đang ngồi trong Làng Kẹo Gừng — nơi mà mỗi năm vào đúng đêm trăng khuyết, dân làng tổ chức Hội Thưởng Thức Bánh Quy. Năm nay, {n} người được mời vào vòng tròn lửa trại vì… ai cũng nói mình nấu bánh ngon nhất vùng.',
      'Sáng nay, bà chủ tiệm bánh phát hiện chiếc bánh quy hình sói — nguyên cái — bị cắn mất một góc. Dấu răng to hơn răng người, nhưng nhỏ hơn răng con lợn của anh Hùng bên cạnh. Anh Hùng đang rất buồn vì bị so sánh như vậy.',
      'Thị trưởng đứng lên phát biểu: "Từ đêm nay, ai còn sống đến sáng mai được ăn bánh miễn phí. Ai chết… thôi, kệ, coi như nhịn ăn vì làng." Cả làng vỗ tay. Tiếng vỗ tay hơi dài. Hơi đáng sợ.',
    ],
    hook: 'Trăng lên. Các bạn nhận vai trò của mình — và đêm đầu tiên của Hội Kẹo Gừng bắt đầu.',
  },
  {
    id: 'lang_cuoi_wifi',
    title: 'Làng Cuối Sóng',
    paragraphs: [
      'Làng Cuối Sóng nằm giữa đồi, cách thị trấn mười hai cây số và cách sóng điện thoại… cũng mười hai cây số, nhưng theo hướng ngược lại. {n} người trong phòng này là toàn bộ dân làng còn ở lại sau đợt di dân sang thành phố.',
      'Đêm qua, chó nhà ông Tư sủa suốt ba tiếng. Sáng nay ông Tư bảo chó sủa vì "nhìn thấy cái gì đó hai chân mà không biết cười". Ông Tư không giỏi miêu tả. Cả làng lo lắng.',
      'Bà nhiệm vụ — tức là tôi, người đang đọc truyện này — hợp chung sổ đỏ và tổ chức họp khẩn. Quyết định: ban ngày ai nói to thì phải uống nước lã. Ban đêm ai mở mắt trái phép thì phải kể một bí mật đời tư. Làng đã thống nhất. Không ai hối hận. Chưa.',
    ],
    hook: 'Bây giờ, hãy tưởng tượng các bạn đang ngồi quanh bếp lò của Làng Cuối Sóng. Chia vai trò xong, chúng ta bắt đầu đêm đầu tiên.',
  },
  {
    id: 'lang_hai_lan_treo',
    title: 'Làng Hai Lần Treo Nhầm',
    paragraphs: [
      'Chào mừng đến Làng Hai Lần Treo Nhầm — cái tên không phải vì làng treo ai đó hai lần, mà vì tháng trước họ treo nhầm cùng một người hai lần trong hai đêm liên tiếp. Người đó là anh Phúc, bán thịt. Anh Phúc vẫn còn sống. Anh Phúc không muốn nói chuyện này nữa.',
      'Đêm nay có {n} người tụ họp tại quán "Hết Pin" để chơi trò "Tìm Sói" cho vui — trò mà dân làng phát minh sau khi quyết định không treo ai nữa cho đến khi chắc chắn hơn. Ít nhất là lý thuyết là vậy.',
      'Luật mới của làng: trước khi treo cổ phải hỏi ít nhất hai lần "Bạn có chắc không?" và một lần "Bạn có chắc chắc không?" Cả làng đã ký tên. Có người ký nhầm vào chỗ "đồng ý bán nhà".',
    ],
    hook: 'Đèn dầu vặn nhỏ. Các bạn là dân Làng Hai Lần Treo Nhầm — ai sói, ai người, tự biết trong lòng. Đêm bắt đầu.',
  },
  {
    id: 'lang_tiem_banh_mi',
    title: 'Làng Bánh Mì Nóng',
    paragraphs: [
      'Làng Bánh Mì Nóng nổi tiếng vì lò bánh mở cửa lúc năm giờ sáng và vì không ai dám đi ngang qua lò lúc nửa đêm. {n} thành viên quan trọng nhất của làng — tức là ai hay mua bánh sớm nhất — đang có mặt trong căn phòng này.',
      'Hôm qua, thợ làm bánh tìm thấy bột mì bị giẫm dấu chân. Dấu chân không phải chân người, không phải chân gà, mà là thứ gì đó đi bằng hai chân và rất thích carbohydrate.',
      'Cả làng họp khẩn dưới gốc đa. Kết luận: đêm nay không ai được ăn bánh mì sau chín giờ — kẻ phá luật bị nghi ngờ ngay lập tức. Một người hỏi: "Thế nếu đói thì sao?" Cả làng im lặng. Câu hỏi hay. Không ai trả lời.',
    ],
    hook: 'Mùi men vẫn còn trong không khí. Các bạn nhận vai trò — và đêm đầu tiên của cuộc săn tìm kẻ phá bột bắt đầu.',
  },
  {
    id: 'lang_hoi_thi_hoa',
    title: 'Làng Hội Thi Hoa',
    paragraphs: [
      'Mỗi mùa xuân, Làng Hội Thi Hoa tổ chức cuộc thi cắm hoa. Năm nay có {n} thí sinh — tức là {n} người ngồi đây — và giải nhất là một cuộn len đỏ, thứ mà bà già cả làng đều muốn.',
      'Đêm trước thi, vườn hoa của chị Lan bị giẫm nát. Dấu chân lớn, lông dính trên cánh hồng. Chị Lan khóc. Anh em họ chị Lan nghi ngờ anh em họ chị Hoa. Chị Hoa nghi ngờ chó nhà hàng xóm. Chó không có quyền biện hộ.',
      'Thị trưởng tuyên bố: cuộc thi vẫn diễn ra, nhưng song song là cuộc điều tra "ai làm hại hoa và ai hay gầm gừ ban đêm". Cả làng gật đầu. Một người hỏi có được gầm gừ ban ngày không. Bị bác bỏ.',
    ],
    hook: 'Hoa vẫn thơm. Nghi ngờ cũng vậy. Các bạn nhận vai trò — đêm đầu tiên của Làng Hội Thi Hoa bắt đầu.',
  },
  {
    id: 'lang_gieng_co',
    title: 'Làng Bên Giếng Cổ',
    paragraphs: [
      'Làng Bên Giếng Cổ có một giếng khô từ năm ngoái, nhưng đêm nào cũng nghe tiếng hú từ phía đó. Già trẻ gái trai đều bảo: "Chắc gió thôi." Gió thì không hú theo nhịp. {n} người trong phòng này là những ai dám ngồi lại nghe hết câu chuyện.',
      'Tuần trước, áo của anh Minh phơi ngoài sân bị xé thành sợi. Anh Minh bảo đó là lỗi chó. Chó nhà anh Minh bảo không biết. Chó có vẻ thành thật.',
      'Làng họp và thống nhất: ai đi gần giếng một mình ban đêm thì tự chịu trách nhiệm. Ai ở lại chơi trò đêm nay thì phải chơi hết ván, không được bỏ giữa chừng đi đổ xăng. Cả {n} người gật đầu. Có người gật hơi chậm.',
    ],
    hook: 'Gió lạnh từ giếng không thổi vào phòng này — may thế. Các bạn nhận vai trò. Đêm đầu tiên bắt đầu.',
  },
  {
    id: 'lang_du_lich',
    title: 'Làng Homestay Bất Ổn',
    paragraphs: [
      'Làng Homestay Bất Ổn nằm trên đồi, view đẹp, wifi yếu, và đánh giá năm sao với chú thích "trải nghiệm sống còn thực tế". Đêm nay có {n} khách — tức là các bạn — đăng ký gói "Một Đêm Cùng Dân Làng".',
      'Chủ homestay dặn: ban đêm đừng ra ban công, đừng mở cửa khi nghe gõ, và đừng tin ai nói "tôi chỉ ra ngoài một phút". Sáng mai ai còn sót lại được ăn sáng miễn phí và một voucher giảm giá lần sau. Voucher không hoàn tiền.',
      'Trên bảng tin trong sảnh có dòng chữ: "Khách số 3 năm ngoái vẫn chưa check-out." Không ai nhớ khách số 3 là ai. Không ai muốn nhớ.',
    ],
    hook: 'Đèn hành lang tắt dần. Các bạn là khách của Làng Homestay Bất Ổn — chia vai trò xong, đêm đầu tiên bắt đầu.',
  },
]

function fillPlaceholders(text, totalPlayers) {
  return text.replace(/\{n\}/g, String(totalPlayers || '?'))
}

export function pickStory(totalPlayers) {
  const raw = VILLAGE_STORIES[Math.floor(Math.random() * VILLAGE_STORIES.length)]
  return {
    id: raw.id,
    title: raw.title,
    paragraphs: raw.paragraphs.map((p) => fillPlaceholders(p, totalPlayers)),
    hook: raw.hook ? fillPlaceholders(raw.hook, totalPlayers) : null,
  }
}
