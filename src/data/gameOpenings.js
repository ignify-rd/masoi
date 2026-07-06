/**
 * Cốt truyện mở đầu kiểu DnD - quản trò đọc to cho cả bàn trước khi chia vai.
 * {n} = số người chơi trong ván.
 */

const VILLAGE_STORIES = [
  {
    id: 'lang_huyet_nguyet',
    title: 'Làng Huyết Nguyệt',
    paragraphs: [
      'Làng Huyết Nguyệt được dựng trên nền pháp trường cũ, nơi ba trăm năm trước dân làng đã thiêu một bầy sói biết nói tiếng người. Trước khi chết, con sói đầu đàn nguyền rằng đến đêm trăng đỏ, máu của nó sẽ thức dậy trong huyết quản những kẻ tưởng mình là người.',
      'Lời nguyền tưởng chỉ là chuyện dọa trẻ con cho đến sáng nay, khi người gác đình được tìm thấy dưới chân chuông, ngực bị xé mở nhưng cửa đình vẫn khóa từ bên trong. Trên nền tro có dấu chân người bước vào, rồi dấu chân sói bước ra. Trong sổ hộ tịch, tên của {n} người ngồi đây bị gạch bằng mực đỏ, như thể làng chỉ còn lại chừng ấy người đủ tỉnh táo để phán xét.',
      'Già làng đem ra những cổ vật cất dưới bàn thờ tổ: mắt kính của Tiên Tri để soi bóng sói trong linh hồn, bùa tro của Bảo Vệ để chặn một cửa tử, hai bình thuốc của Phù Thủy được nấu từ máu trăng, khẩu súng bạc của Thợ Săn, và sợi chỉ đỏ của Thần Tình Yêu vốn buộc sinh mạng hai người vào một lời thề. Không ai được chọn chức phận của mình; cổ vật tự tìm chủ khi đêm xuống.',
      'Từ đời tổ tiên, dân làng đã học được một điều cay đắng: ban đêm sói mạnh hơn mọi luật lệ, nhưng ban ngày chúng phải mang mặt người và chịu lời buộc tội của đám đông. Vì vậy hội đồng được lập lại. Mỗi bình minh, người sống phải tranh luận, nghi ngờ và treo lên một cái tên, trước khi trăng đỏ lấy thêm một mạng nữa.',
    ],
    hook: 'Trăng đỏ trèo lên khỏi rặng tre. Các bạn nhận chức phận của mình, và đêm đầu tiên của Làng Huyết Nguyệt bắt đầu.',
  },
  {
    id: 'lang_suong_mu',
    title: 'Làng Sương Mù Cuối Thung',
    paragraphs: [
      'Làng Sương Mù Cuối Thung nằm giữa bốn triền núi, nơi mặt trời chỉ ghé qua như một vị khách vội. Người làng tin dưới lớp sương có một con đường cổ dẫn đến hang của Thần Sói, và tổ tiên họ từng ký khế ước: đổi một phần linh hồn để được sống qua mùa đói.',
      'Khế ước bị lãng quên cho đến khi đoàn buôn cuối cùng quay về trong im lặng, không ai còn lưỡi để kể chuyện. Trên xe của họ có {n} chiếc mặt nạ gỗ khắc đúng mặt những người đang ngồi ở nhà hội, mặt sau mỗi chiếc đều ghi một chức phận: kẻ nhìn thấy sự thật, kẻ canh cửa, kẻ giữ thuốc, kẻ nổ phát súng cuối cùng, và những kẻ có móng vuốt dưới da.',
      'Đến chạng vạng, người gác cổng nhìn thấy một dân làng bước vào màn sương, rồi một con sói bước ra trong cùng chiếc áo khoác. Từ đó làng hiểu rằng sói không đến từ ngoài rừng; chúng đã ở trong làng từ lâu, chỉ chờ sương đủ dày để nhớ lại bản chất của mình.',
      'Những chức năng trong làng không phải phép màu ngẫu nhiên mà là phần còn lại của khế ước cổ. Tiên Tri nghe được lời thì thầm dưới sương, Bảo Vệ biết vẽ vòng muối trước cửa, Phù Thủy giữ công thức thuốc cứu và thuốc độc, Thợ Săn mang viên đạn bạc cuối cùng. Nhưng mỗi người chỉ biết phần của mình. Nếu nói ra quá sớm, sói sẽ biết nên cắn cổ ai trước.',
    ],
    hook: 'Đèn dầu bị sương nuốt dần. Các bạn nhận chức phận của mình, và đêm đầu tiên bắt đầu trong tiếng chân ngoài hiên.',
  },
  {
    id: 'lang_treo_chuong',
    title: 'Làng Treo Chuông Tang',
    paragraphs: [
      'Ở Làng Treo Chuông Tang, mỗi nhà treo một chiếc chuông trước cửa để báo người chết. Luật làng cấm rung chuông khi chưa thấy xác, vì người xưa tin tiếng chuông gọi hồn sói về từ rừng đen. Suốt bảy đêm qua, chuông tự ngân từ những căn nhà vẫn còn người sống.',
      'Sáng nay, dưới gốc đa giữa sân đình, dân làng đào được một hố chôn tập thể phủ đầy vải liệm mới. Trên từng mảnh vải có thêu tên của {n} người được triệu đến phiên phán xét. Trong hố còn có một tấm da sói khô, bên trong khâu đầy tóc người và móng tay người.',
      'Tư tế già giải thích rằng đây là nghi thức "đổi da": sói chọn người, khoác lấy đời sống của họ, rồi ban ngày bước đi như hàng xóm, anh em, vợ chồng. Để chống lại chúng, tổ tiên lập ra Hội Chuông Tang gồm những người giữ chức phận bí mật: Tiên Tri nghe âm chuông biết ai có linh hồn méo lệch, Bảo Vệ buộc chuông câm trước cửa người sắp chết, Phù Thủy dùng tiếng chuông để cân mạng sống và mạng chết.',
      'Nhưng hội ấy đã tan rã nhiều đời, chỉ còn truyền thuyết. Đêm nay chuông gọi lại từng chức phận vào tay người đang sống. Ban ngày, dân làng phải tự mở phiên xử, vì khi mặt trời lên, sói không thể biến hình nhưng vẫn có thể nói dối. Mỗi lời buộc tội là một hồi chuông; mỗi phiếu treo cổ là một lần thử xem ai đang sợ ánh sáng.',
    ],
    hook: 'Tiếng chuông tang thứ tám vang lên. Các bạn nhận chức phận, và ngôi làng bắt đầu tìm kẻ đang đội lốt người.',
  },
  {
    id: 'lang_lo_than',
    title: 'Làng Lò Than Đen',
    paragraphs: [
      'Làng Lò Than Đen sống nhờ những đường hầm ăn sâu vào lòng núi. Hầm số bảy bị niêm phong từ đời cụ tổ, sau vụ sập hầm chôn sống một nhóm phu than và một con thú khổng lồ mà không ai dám gọi tên. Trên cửa hầm có khắc lời cảnh báo: "Đừng đào nơi bóng tối biết đói."',
      'Mùa đông năm nay đến quá sớm, than cạn, và dân làng phá niêm phong. Bên trong không có xác người, chỉ có những vách đá bị móng vuốt rạch kín, một bộ da sói treo ngược còn ấm, và cuốn nhật ký của người thợ mỏ cuối cùng: "Nó không giết chúng tôi. Nó dạy vài người trong chúng tôi cách đói như nó."',
      'Từ lúc lên khỏi hầm, {n} người không còn ngủ yên. Có người nghe tiếng tim mình đập như tiếng chân chạy trên đá, có người thấy mắt hàng xóm phản sáng trong bóng tối. Thợ rèn trong làng nhận ra những dấu răng trên xác nạn nhân không thuộc về thú rừng, mà thuộc về hàm người đã bị kéo dài bởi lời nguyền.',
      'Để sống sót, dân làng mở lại kho di vật của những người từng xuống hầm rồi trở về: đèn soi linh hồn của Tiên Tri, áo choàng than của Bảo Vệ, thuốc đen của Phù Thủy, nỏ bạc của Thợ Săn, sách thánh của Mục sư. Những món ấy chọn người cầm chúng, nhưng quyền năng càng lớn càng khiến người đó trở thành mục tiêu. Bầy sói biết rằng nếu giết đúng người trong đêm, cả làng sẽ mù đi vào sáng hôm sau.',
    ],
    hook: 'Cửa hầm bị gió đẩy kêu rền. Các bạn nhận chức phận, và bóng tối trong núi thức dậy.',
  },
  {
    id: 'lang_hoa_trang',
    title: 'Làng Hoa Trắng Bên Mộ',
    paragraphs: [
      'Phía sau Làng Hoa Trắng là nghĩa địa cổ, nơi loài hoa không tên mọc quanh năm trên những nấm mộ không bia. Người làng tin hoa chỉ nở khi người chết còn điều chưa nói, và chỉ chuyển đỏ khi kẻ giết người vẫn đang đứng giữa đám tang.',
      'Sáng nay, nghĩa địa trắng xóa như phủ tuyết. Trên mỗi nấm mộ mới nở một bông hoa có nhụy đỏ, số bông đúng bằng {n} người đang có mặt trong nhà thờ bỏ hoang. Dưới chân bàn thờ, cha xứ mất tích để lại lá thư: "Sói đã học cách quỳ gối cầu nguyện. Đừng tìm chúng ngoài rừng nữa."',
      'Cha xứ từng là người giữ bản phả hệ của làng. Trong thư, ông viết rằng mỗi dòng họ được giao một bổn phận để canh giữ nghĩa địa: nhà tiên kiến nhìn thấy linh hồn bị thú tính che phủ, nhà canh mộ biết đóng cửa tử trong một đêm, nhà bào chế giữ thuốc hồi sinh và thuốc kết liễu, nhà thợ săn truyền nhau viên đạn bạc, nhà tình nhân giữ lời thề rằng một cái chết có thể kéo theo một cái chết khác.',
      'Những chức phận ấy tồn tại vì sói không chỉ giết người; chúng phá ký ức của làng. Khi một người bị cắn, sáng hôm sau mọi bằng chứng bắt đầu mục nát, nhân chứng nghi ngờ chính mắt mình, và người chết chỉ còn nói qua hoa trắng. Vì vậy dân làng phải xử án khi mặt trời còn đủ cao, trước khi đêm xuống và sự thật bị chôn thêm một lớp đất.',
    ],
    hook: 'Hương hoa ngọt đến nghẹt thở. Các bạn nhận chức phận, và nghĩa địa bắt đầu chờ tên kế tiếp.',
  },
  {
    id: 'lang_gieng_co',
    title: 'Làng Giếng Cổ Không Đáy',
    paragraphs: [
      'Giếng cổ giữa làng bị lấp từ mười hai năm trước, sau đêm một đứa trẻ thả gàu xuống và kéo lên một bàn tay không có thân. Mùa mưa năm nay làm đất sụt xuống, để lộ miệng giếng đen ngòm như con mắt mở lại. Từ đáy giếng, người chết bắt đầu gọi tên người sống.',
      'Ai trả lời tiếng gọi sẽ biến mất trước bình minh, chỉ để lại dấu chân trần vòng quanh giếng và mùi lông thú ẩm mốc. Đêm qua, thầy đồ của làng không trả lời, nhưng vẫn bị lôi đi. Trên tường nhà ông có dòng chữ cào bằng móng: "Sói không cần được mời vào nơi nó từng sinh ra."',
      'Trong hầm sách của thầy đồ, dân làng tìm thấy ghi chép về một giáo phái từng thờ "con sói dưới giếng". Để chống lại nó, những người phản giáo phái đã chia nhau các chức phận: Tiên Tri nhìn xuống nước giếng để thấy bản dạng thật, Bảo Vệ đóng ấn lên cửa nhà, Phù Thủy giữ hai giọt nước giếng đã được thánh hóa, Thợ Săn canh miệng giếng bằng bạc, còn Kẻ Bị Nguyền mang trong máu lời cảnh báo rằng bất cứ ai cũng có thể bị biến đổi.',
      'Tên của {n} người vừa xuất hiện trên thành giếng, khắc từ bên trong đá. Điều đó nghĩa là mỗi người đã bị kéo vào nghi thức cũ, dù muốn hay không. Sói sẽ săn trong đêm vì bóng tối thuộc về chúng; dân làng sẽ phán xét ban ngày vì chỉ dưới ánh mặt trời lời nguyền mới buộc kẻ đội lốt người phải run sợ.',
    ],
    hook: 'Từ đáy giếng vang lên một tiếng hú rất gần. Các bạn nhận chức phận, và không ai được phép trả lời tiếng gọi trong đêm.',
  },
  {
    id: 'lang_khach_la',
    title: 'Làng Khách Lạ Sau Cổng',
    paragraphs: [
      'Làng Khách Lạ Sau Cổng có một luật cổ: khi bão đen kéo qua, phải mở cổng cho người trú nạn, vì tổ tiên họ từng được cứu như vậy. Nhưng bản ghi chép lâu đời nhất kể một chuyện khác: năm ấy dân làng mở cổng cho một đoàn lữ khách, và sáng hôm sau đoàn khách biến mất, còn vài người trong làng bắt đầu thèm thịt sống.',
      'Cơn bão đêm nay đưa {n} người vào nhà hội. Trưởng làng điểm danh đủ người, nhưng sổ khách lại tự ghi thêm một cái tên không ai đọc được. Cổng làng bị cào nát từ phía trong, nghĩa là thứ nguy hiểm không đứng ngoài xin vào; nó đã ở giữa mọi người trước khi then cửa được cài.',
      'Theo luật tiếp khách cổ, mỗi người trú bão phải nhận một dấu sáp từ hòm thánh tích. Dấu ấy không chỉ để ghi danh, mà để đánh thức chức phận bị chôn trong huyết thống: người thấy ác mộng thành Tiên Tri, người đứng chặn cửa thành Bảo Vệ, người biết cây độc thành Phù Thủy, người từng mất người thân thành Thợ Săn, người mang tình yêu bị nguyền thành Cupid hoặc Cặp đôi. Cả sói cũng nhận dấu, nhưng dấu của chúng nóng lên như than dưới da.',
      'Dân làng biết có sói vì nạn nhân đầu tiên không chết như người bị thú dữ tấn công. Xác vẫn ngồi ngay ngắn bên bàn, tay cầm bát súp, miệng còn mỉm cười với khách. Chỉ khi mặt trời rọi qua cửa sổ, bóng của cái xác trên tường mới hiện hình một con sói đang cúi ăn. Từ khoảnh khắc đó, không ai được rời làng; ban ngày phải tìm ra kẻ lạ, ban đêm phải sống sót qua cơn đói của nó.',
    ],
    hook: 'Cổng làng đóng sập sau lưng. Các bạn nhận chức phận, và trong số những khuôn mặt quen thuộc có một thứ không thuộc về nơi này.',
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
