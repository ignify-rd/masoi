// Chữ tiếng Việt của chủ đề, khóa theo id trong src/data/themes.js.
//   name         tên chủ đề
//   aliases      tên gọi khác (VD tên trên Google Sheet)
//   description  luật của chủ đề, quản trò đọc cho cả bàn
//   steps        chữ của bước gọi đêm, khóa theo id bước trong nightSteps:
//                { name, script, moderatorNote }

export const THEME_TEXT = {
  endless_night: {
    name: 'Đêm Vô Tận',
    description:
      'Mặt trời gần như không mọc: cứ sau mỗi ngày lại có hai đêm liên tiếp, bầy Sói được cắn ở cả hai đêm rồi làng mới được họp lại.',
  },
  distant_howl: {
    name: 'Tiếng Hú Xa',
    description:
      'Bầy Sói đánh hơi được sức mạnh: đêm 1 quản trò cho bầy Sói biết những ai có năng lực ban đêm, nhưng không cho biết đó là vai gì.',
    steps: {
      distant_howl_reveal: {
        name: 'Tiếng Hú Xa — Sói đánh hơi',
        script:
          'Bầy Sói hãy mở mắt một lần nữa. Tôi sẽ chỉ ra những người có năng lực ban đêm.',
        moderatorNote:
          'Gọi ở cuối đêm 1, sau khi tất cả các vai khác đã ngủ lại. Chỉ tay lần lượt vào từng người có năng lực ban đêm — KHÔNG nói đó là vai gì',
      },
    },
  },
  mole: {
    name: 'Kẻ Nội Gián',
    description:
      'Bầy Sói cài người vào làng: đêm 1, bầy Sói thống nhất chọn ra 1 người phe Dân làng làm kẻ nội gián. Kẻ nội gián chuyển sang thắng cùng phe Sói và thức dậy cùng bầy Sói nhưng không có khả năng giết người. Họ vẫn giữ năng lực của vai cũ, và Tiên Tri soi kẻ nội gián vẫn ra là người.',
    steps: {
      mole_pick: {
        name: 'Kẻ Nội Gián — Sói chọn kẻ nội gián',
        script: 'Bầy Sói hãy thống nhất chọn ai là kẻ nội gián.',
        moderatorNote:
          'Chỉ đêm 1, gọi ngay sau lượt cắn khi bầy Sói còn đang mở mắt. Ghi lại ai là kẻ nội gián.',
      },
      mole_wake: {
        name: 'Kẻ Nội Gián — thức dậy cùng bầy Sói',
        script: 'Kẻ nội gián hãy thức dậy cùng đàn Sói.',
        moderatorNote:
          'Đêm 1: chạm vào người vừa được chọn để họ mở mắt nhận mặt bầy Sói. Từ đêm 2, kẻ nội gián mở mắt cùng bầy nhưng không được cắn; vai cũ của họ vẫn được gọi như bình thường. Đêm nào cũng đọc câu này, kể cả khi kẻ nội gián đã chết.',
      },
    },
  },
  thick_fog: {
    name: 'Sương Mù Dày',
    description:
      'Sương che hết bản dạng: các vai soi chỉ biết được mục tiêu CÓ hay KHÔNG có năng lực ban đêm, không biết phe.',
  },
  blood_moon: {
    name: 'Trăng Máu',
    description:
      'Đêm đầu tiên trăng đỏ treo thấp: bầy Sói được cắn 2 người trong đêm 1. Từ đêm 2 trở đi mọi thứ trở lại bình thường.',
  },
  mob_rule: {
    name: 'Luật Đám Đông',
    description:
      'Dân làng sợ xử oan: muốn treo cổ phải có quá bán số người còn sống bỏ phiếu cho cùng một người, nếu không thì ngày hôm đó không ai chết.',
  },
  alpha_curse: {
    name: 'Sói Nguyền',
    description:
      'Lời nguyền của đầu đàn xuyên qua mọi lớp bảo vệ: khi Sói Đầu đàn dùng năng lực biến con mồi thành sói, lời nguyền luôn thành công 100%, kể cả khi con mồi được Bảo Vệ che chắn, được Mục sư ban phước hay được Phù Thủy cứu.',
    steps: {
      alpha_curse_mark: {
        name: 'Sói Nguyền — báo người bị nguyền',
        script: 'Người sau đây bị nguyền, đêm sau sẽ tỉnh dậy cùng đàn Sói.',
        moderatorNote:
          'Gọi ngay sau Sói Đầu đàn. Đêm nào cũng đọc câu này để làng không đoán ra lời nguyền đã dùng hay chưa; chỉ trong đêm Sói Đầu đàn vừa nguyền thì chạm vào người bị nguyền để họ biết mình đã thành Sói. Từ đêm sau gọi người đó dậy cùng bầy Sói.',
      },
    },
  },
  wolf_covenant: {
    name: 'Khế Ước Bầy Sói',
    description:
      'Bầy sói ký khế ước với tay trong: Kẻ Phản Bội / Bà Đồng được thức dậy nhận mặt bầy Sói trong đêm 1 (nhưng Sói không biết họ là ai).',
  },
  night_of_vengeance: {
    name: 'Đêm Trả Thù',
    description:
      'Bầy sói trả thù cho đồng loại: mỗi khi làng treo cổ trúng một con Sói thì đêm hôm đó bầy được cắn thêm một người. Chỉ áp dụng cho một nửa số Sói đầu tiên bị treo (làm tròn xuống), sau đó bầy hết khả năng trả thù.',
  },
  creeping_curse: {
    name: 'Lời Nguyền Lan Rộng',
    description:
      'Lời nguyền lan theo máu: Kẻ Bị Nguyền hoá sói khi bị cắn HOẶC khi ngồi cạnh (trái/phải, tính trong số người còn sống) nạn nhân bị Sói cắn đêm đó.',
  },
  red_thread: {
    name: 'Sợi Chỉ Đỏ',
    description:
      'Lời thề tình nhân mạnh hơn lời thề với làng: Cặp đôi luôn tách thành phe thứ 3.',
  },
  blood_pact: {
    name: 'Giao Ước Máu',
    description:
      'Kẻ Chán Đời kéo theo người khác xuống mồ: nếu Chán Đời bị treo cổ, người bên phải của Chán đời mà vote giết sẽ chết ngay lập tức.',
  },
  blood_thirst: {
    name: 'Cơn Khát',
    description:
      'Bầy Sói biết nhịn: nếu đêm nào bầy Sói tự nguyện không cắn ai thì đêm hôm sau chúng được cắn hai người.',
  },
  last_stand: {
    name: 'Sói Cùng Đường',
    description:
      'Con sói cuối cùng liều mạng: khi phe Sói chỉ còn đúng một thành viên sống sót, một lần duy nhất trong ván nó được chọn một đêm để cắn hai người thay vì một.',
  },
  scent_of_blood: {
    name: 'Mùi Máu',
    description:
      'Bầy sói ngửi được mùi quyền năng: mỗi khi cắn chết một người, quản trò gật đầu cho bầy Sói biết nạn nhân có năng lực ban đêm, hoặc lắc đầu nếu đó chỉ là dân thường.',
  },
  long_night: {
    name: 'Đêm Dài',
    description:
      'Mặt trời lên muộn, làng chưa kịp họp: ngày đầu tiên KHÔNG treo cổ ai, chỉ thảo luận rồi vào thẳng đêm 2.',
  },
  reverse_trial: {
    name: 'Phiên Toà Ngược',
    description:
      'Bị cáo được quyền có luật sư: người bị treo cổ chọn một người bào chữa, người này phản biện hộ người bị treo cổ. Nếu bị cáo bị treo thì luật sư mất quyền vote ngày hôm sau; bị cáo thoát thì luật sư được tính 2 vote trong ngày hôm sau.',
  },
  great_storm: {
    name: 'Cơn Bão',
    description:
      'Một đêm nào đó bão sẽ ập xuống: quản trò bí mật chọn trước một đêm trong ván, đêm ấy mọi năng lực ban đêm đều thất bại, kể cả đòn cắn. Sáng ra không ai chết và không ai biết mình đã bị bão chặn.',
  },
  tidal_moon: {
    name: 'Trăng Định Kỳ',
    description:
      'Trăng lên theo chu kỳ: các đêm lẻ bầy Sói được cắn hai người, các đêm chẵn chúng hoàn toàn không được cắn ai.',
  },
  wolf_leader: {
    name: 'Sói Trưởng',
    description:
      'Bầy sói có kẻ cầm đầu: đêm 1 bầy Sói tự chọn một con làm đầu đàn. Mỗi đêm sau khi cả bầy đã chỉ mục tiêu, riêng đầu đàn được giơ tay để đổi - không giết nữa mà quản trò cho bầy biết vai của chính mục tiêu đó. Nếu đầu đàn chết, bầy sói mất quyền cắn đêm hôm đó.',
    steps: {
      wolf_leader_pick: {
        name: 'Sói Trưởng — chọn đầu đàn',
        script:
          'Bầy Sói hãy thống nhất chỉ vào một con trong bầy để làm Sói Trưởng.',
        moderatorNote:
          'Gọi ngay sau lượt cắn của bầy Sói trong đêm 1, khi cả bầy còn đang mở mắt. Ghi lại ai là đầu đàn. Nếu đầu đàn chết, bầy Sói mất quyền cắn trong đêm hôm đó.',
      },
      wolf_leader_peek: {
        name: 'Sói Trưởng — đổi cắn lấy soi',
        script:
          'Sói Trưởng giơ tay nếu muốn đổi: không giết mục tiêu này nữa, mà biết vai của họ.',
        moderatorNote:
          'Chỉ hỏi SAU khi cả bầy đã chốt mục tiêu. Nếu đầu đàn giơ tay: mục tiêu sống, quản trò cho cả bầy biết vai của mục tiêu đó. Nếu không giơ tay thì cắn như bình thường.',
      },
    },
  },
  sheriff: {
    name: 'Cảnh Sát Trưởng',
    description:
      'Làng lập lại trật tự: ngày đầu tiên cả làng bầu công khai một Cảnh Sát Trưởng. Từ đó mọi phiên vote treo cổ nếu hoà phiếu thì Cảnh Sát Trưởng quyết định ai bị treo. Cảnh Sát Trưởng chết thì làng bầu người mới ngay trong ngày hôm đó.',
  },
  forest_journey: {
    name: 'Chuyến Đi Rừng',
    description:
      'Mụ Già đuổi ai thì người đó lang thang trong rừng cả ngày; khi trở về, họ một lá bốc ngẫu nhiên từ bộ gồm các lá dưới đây:\n' +
      '1. Khẩu Súng Rỉ Sét: một lần, ban ngày, công khai bắn chết một người.\n' +
      '2. Lọ Thuốc Giải: tự động cứu chính chủ khỏi đòn giết đầu tiên nhắm vào họ trong đêm.\n' +
      '3. Mảnh Gương Vỡ: Dùng 1 lần 1 ván trong đêm, Có khả năng như Tiên tri. Nếu phe sói bốc được thì sẽ như Tiên Tri Hào Quang\n' +
      '4. Áo choàng tàng hình: đêm hôm về làng, mọi năng lực nhắm vào họ đều trượt.\n' +
      '5. La Bàn Hỏng: đêm hôm về làng, biết có Sói ngồi cạnh hay không.\n' +
      '6. Chuyến Đi Vô Ích: không có gì xảy ra.\n' +
      '7. Mùi Thú Hoang: từ đó đến hết ván, mọi vai soi nhắm vào chính họ đều nhận kết quả phe Sói.\n' +
      '8. Vết Thương: ngày hôm sau mất quyền bỏ phiếu và đêm hôm đó không được thức dậy dùng năng lực.\n' +
      '9. Vết Cắn Trong Rừng: thắng cùng phe Sói và biết mặt bầy nhưng không có quyền cắn, nếu vốn đã là Sói thì lá này vô hiệu.\n' +
      '10. Nước Thánh Trong Rừng: nếu người bốc thuộc phe Sói thì họ mất trí nhớ, từ đó mất quyền cắn và không thức dậy cùng bầy nữa (vẫn thắng cùng phe Sói); bầy vẫn cắn bình thường. Nếu là Dân thì không có gì xảy ra.\n' +
      '11. Chết Trong Rừng: người bốc lá này chết ngay lập tức.\n' +
      '12. Nấm độc: Người bốc ăn phải nấm độc, sẽ chết sau x đêm. Phù thủy có thể cứu bằng bình cứu. (Quản trò sẽ random x trong khoảng 1-4 và giữ bí mật)',
    steps: {
      forest_journey_item: {
        name: 'Chuyến Đi Rừng — người vừa về làng',
        script:
          'Người vừa đi rừng về hãy thức dậy. Giơ tay nếu bạn muốn dùng món đồ của mình đêm nay.',
        moderatorNote:
          'Gọi ở đầu đêm, chỉ đêm mà có người vừa từ rừng trở về. Nếu họ dùng Áo Choàng Tàng Hình / La Bàn Hỏng / Mảnh Gương Vỡ thì xử lý ngay ở bước này và nhớ đánh dấu lá bài đã hết.',
      },
    },
  },
  lunar_eclipse: {
    name: 'Nguyệt Thực',
    description:
      'Không có trăng cho Sói hóa thân: đêm 1 bầy Sói chỉ nhận mặt nhau, không được cắn ai.',
  },
  royal_decree: {
    name: 'Chiếu Chỉ Hoàng Gia',
    description:
      'Hoàng Tử nắm quyền phán xử: sau khi lộ thân phận, mỗi ngày phiếu bầu của Hoàng Tử được tính gấp đôi.',
  },
  first_dawn: {
    name: 'Bình Minh Đầu Tiên',
    description:
      'Ván mở màn giữa ban ngày: Trò chơi bắt đầu vào ban ngày thay vì ban đêm. Làng thảo luận và treo cổ một người trước khi đêm thật sự bắt đầu.',
  },
  holy_antidote: {
    name: 'Thuốc Giải Thánh',
    description:
      'Phù Thủy giữ được thuốc giải cho vết cắn ma cà rồng: khi có người chết vào buổi sáng vì Ma Cà Rồng, Phù Thủy được quyền lật bài công khai và dùng bình cứu ngay tại chỗ để cứu người đó.',
  },
  silver_claw: {
    name: 'Sói Bạc',
    description:
      'Ma Sói ở làng này có móng vuốt bằng bạc: đòn cắn của Sói giết được Ma Cà Rồng như người thường (Ma Cà Rồng mất khả năng miễn nhiễm với Sói).',
  },
  garlic_harvest: {
    name: 'Mùa Tỏi',
    description:
      'Làng vừa được mùa tỏi: mỗi ngày cả làng chọn 1 người để treo tỏi trước cửa; đêm đó Ma Cà Rồng không cắn được người đó.',
  },
  night_watch: {
    name: 'Đèn Canh Đêm',
    description:
      'Làng cắt cử người thức gác: mỗi đêm trước khi trời tối, cả làng công khai chọn một người gác đêm. Người đó không thể bị giết trong đêm ấy, nhưng cũng không được dùng năng lực ban đêm của mình.',
  },
  village_ledger: {
    name: 'Nhật Ký Làng',
    description:
      'Làng ghi biên bản mọi lời khai: ai đã công khai nhận mình là một vai cụ thể thì quản trò ghi lại, và người đó không được đổi lời khai cho tới hết ván. Nói mập mờ không tính là khai, nhưng đã nêu tên vai thì bị ghi.',
  },
  rumor_mill: {
    name: 'Lời Đồn',
    description:
      'Tin đồn bay khắp làng: mỗi sáng quản trò đưa kín cho một người còn sống ngẫu nhiên một mẩu giấy ghi phe của một người còn sống ngẫu nhiên khác. Người nhận được toàn quyền giữ kín, công bố hay bịa lại.',
  },
  village_militia: {
    name: 'Dân Quân Tự Vệ',
    description:
      'Làng đông người và đang giận dữ: 1 lần trong ván, làng được treo cổ 2 người (bỏ phiếu hai lượt liên tiếp).',
  },
  white_list: {
    name: 'Danh Sách Trắng',
    description:
      'Làng lập danh sách người trong sạch: mỗi sáng quản trò công bố tên một người thuộc phe Dân làng, mỗi người chỉ được công bố một lần trong ván. Một lần duy nhất, bầy Sói được thay tên hôm đó bằng tên một con sói, và làng không có cách nào biết ngày nào bị thay.',
    steps: {
      white_list_swap: {
        name: 'Danh Sách Trắng — Sói thay tên',
        script:
          'Bầy Sói hãy thức dậy. Người này sẽ được công bố. Có muốn thay tên sẽ được công bố sáng mai bằng tên một con sói khác không.',
        moderatorNote:
          'Cả ván bầy Sói chỉ được thay MỘT lần — dùng rồi thì bấm Ẩn bước này. Nếu bầy thay, sáng mai đọc tên con sói đó y như một cái tên trong sạch bình thường, không để lộ gì khác.',
      },
    },
  },
  price_of_truth: {
    name: 'Giá Của Sự Thật',
    description:
      'Sự thật phải trả bằng máu: từ sáng ngày thứ 2 trở đi, nếu quá bán số người còn sống đồng ý thì làng bỏ luôn quyền treo cổ hôm đó để đổi lấy việc quản trò công bố công khai phe của một người bất kỳ.',
  },
  inquisition: {
    name: 'Toà Án Dị Giáo',
    description:
      'Giáo hội giám sát mọi phiên xử: người bị treo cổ luôn bị lật bài, quản trò công bố vai trò của họ cho cả làng.',
  },
  silver_bullet: {
    name: 'Đạn Bạc',
    description:
      'Lò rèn của làng đúc thêm đạn: Thợ Săn được thêm 1 phát bắn và có thể chủ động bắn trong ngày (một lần duy nhất) thay vì chỉ bắn khi chết.',
  },
  witch_sabbath: {
    name: 'Đêm Hội Phù Thủy',
    aliases: ['Hội Phù Thủy'],
    description:
      'Đêm hội mở kho thuốc: Phù Thủy được chọn dùng 3 bình giết thay vì 1 bình cứu và 1 bình giết.',
  },
  talking_graveyard: {
    name: 'Nghĩa Địa Biết Nói',
    description:
      'Người chết trong đêm còn kịp để lại dấu: mỗi sáng quản trò công bố vai trò của nạn nhân bị giết đêm qua.',
  },
  death_note: {
    name: 'Sổ Tang',
    description:
      'Người chết để lại lời trăn trối: mỗi người chết ban đêm được để lại MỘT câu trước khi rời game. Quản trò sẽ quyết định câu đấy có hợp pháp hay không, chỉ được nói về người khác, không được khai vai của mình. Lời trăn trối sẽ được công bố vào buổi sáng 2 ngày sau. Phe sói sẽ được quyền xóa lời trăn trối 1 lần 1 game.',
    steps: {
      death_note_erase: {
        name: 'Sổ Tang — Sói xóa lời trăn trối',
        script:
          'Bầy Sói hãy thức dậy. Đây là lời trăn trối đang chờ công bố — giơ tay nếu bầy muốn xóa nó.',
        moderatorNote:
          'Gọi ở đầu đêm, chỉ khi đang có lời trăn trối chưa công bố. Cả ván bầy Sói chỉ được xóa MỘT lần — dùng rồi thì ẩn bước này đi.',
      },
    },
  },
  undying_village: {
    name: 'Làng Bất Tử',
    description:
      'Không ai thật sự rời làng: người bị cắn hay bị treo cổ vẫn ngồi lại, vẫn nói và vote như thường, chỉ mất năng lực của vai mình. Phe Sói / Ma Cà Rồng chỉ mất quyền cắn khi cả phe đã chết. Phù Thủy không được biết ai bị cắn, chỉ chọn cứu hay không cứu nạn nhân đêm đó. Quản trò âm thầm ghi ai đã chết thật và tự tuyên bố khi ván kết thúc.',
  },
  double_trial: {
    name: 'Toà Án Kép',
    description:
      'Toà xử không nghỉ: mỗi ngày làng treo cổ hai người thay vì một, bằng cách bỏ phiếu hai lượt liên tiếp.',
  },
  bite_mark: {
    name: 'Dấu Răng',
    description:
      'Vết cắn để lại dấu chỉ hướng: mỗi sáng quản trò công bố khoảng cách từ nạn nhân đêm qua tới con Sói gần nhất là chẵn hay lẻ, tính theo số ghế trong vòng tròn người còn sống và theo chiều ngắn hơn. Nếu chính nạn nhân là Sói thì khoảng cách tính là 0, tức chẵn.',
  },
  body_count: {
    name: 'Đếm Xác',
    description:
      'Làng điểm danh mỗi sáng: quản trò công bố số lượng vai phe Sói và phe Ma Cà Rồng còn sống, chỉ con số chứ không nói danh tính.',
  },
  holy_water: {
    name: 'Nước Thánh',
    description:
      'Làng còn giữ một bình nước thánh: một lần duy nhất trong cả ván, nếu quá bán số người còn sống cùng chỉ vào một người thì quản trò công bố công khai người đó thuộc phe nào.',
  },
  talisman: {
    name: 'Bùa Hộ Mệnh',
    description:
      'Cả làng đeo bùa: đầu ván mỗi người được phát một lá bùa dùng một lần. Ai cũng sẽ có 2 mạng. Nếu bị cắn hoặc bị treo cổ, người đó tiếp tục sống tiếp như không có chuyện gì xảy ra.',
  },
}
