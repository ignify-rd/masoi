// Chữ tiếng Việt của vai trò, khóa theo id trong src/data/roles.js.
//   name     tên hiển thị
//   aliases  tên gọi khác (VD tên cột trên Google Sheet) — chỉ ghi tên khác hẳn
//            tên chính, tên ở mọi ngôn ngữ và id đã tự được nhận
//   ability  mô tả năng lực trên thẻ vai
//   script   câu quản trò đọc to khi gọi (chỉ vai thức dậy ban đêm)

export const ROLE_TEXT = {
  dream_wolf: {
    name: 'Sói Mơ Mộng',
    ability:
      'Sói Mơ Mộng sẽ không thức dậy cùng phe Sói cho đến khi có một Ma Sói bị giết.',
    script: 'Sói Mơ Mộng thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  bigfoot: {
    name: 'Chân To',
    ability:
      'Ban đầu thuộc phe Dân làng, nhưng khi bị Tiên Tri soi lại ra phe Sói vì trông lông lá giống Sói. Anh ta thuộc phe Dân làng cho đến ngày không có ai bị treo cổ; ngày hôm sau anh ta tức giận và chuyển sang phe Sói.',
    script: 'Chân To hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  tanner: {
    name: 'Chán Đời',
    ability: 'Bạn chỉ thắng khi bị giết trong buổi sáng.',
    script: 'Chán Đời hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  prince: {
    name: 'Hoàng Tử',
    ability:
      'Nếu bạn bị bình chọn để giết buổi sáng, bạn tiết lộ thân phận và được sống tiếp.',
    script: 'Hoàng Tử hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  lone_wolf: {
    name: 'Sói đơn độc',
    ability: 'Bạn chỉ thắng nếu bạn là con sói cuối cùng sống sót.',
    script: 'Sói đơn độc thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  halfblood: {
    name: 'Con Lai',
    ability: 'Khi bị tiên tri soi thì bạn là Sói.',
    script: 'Con lai thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  mayor: {
    name: 'Thị Trưởng',
    ability: 'Phiếu bầu của bạn tính là 2 phiếu.',
    script: 'Thị Trưởng hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  tough_guy: {
    name: 'Thanh Niên Cứng',
    aliases: ['TN cứng'],
    ability:
      'Nếu sói cắn bạn, bạn sẽ không chết ngay và cầm cự đến đêm tiếp theo.',
    script: 'Thanh niên cứng hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  terrorist: {
    name: 'Kẻ Khủng Bố',
    aliases: ['Khủng bố'],
    ability:
      'Khi bạn chết, bạn kích hoạt một vụ nổ, giết chết 2 người bên cạnh bạn.',
    script: 'Kẻ Khủng Bố hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  rusty_knight: {
    name: 'Hiệp sĩ Kiếm Rỉ',
    aliases: ['Kiếm rỉ'],
    ability:
      'Nếu bạn bị sói cắn chết, Ma Sói bị nhiễm bệnh từ vết thương của kiếm rỉ. Con Sói nằm ngay bên trái của bạn sẽ bị chết vào đêm hôm sau. Người giữ bài Hiệp sĩ kiếm rỉ không được tiết lộ danh tính cho người khác khi còn sống, nếu không lá bài sẽ mất tác dụng.',
    script: 'Hiệp sĩ Kiếm Rỉ hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  diseased: {
    name: 'Người Bệnh',
    ability:
      'Nếu bạn bị sói cắn chết, chúng sẽ lây bệnh và không thể giết ai vào đêm tiếp theo.',
    script: 'Người Bệnh hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  hoodlum: {
    name: 'Du Côn',
    ability:
      'Gây sự 2 người vào đêm đầu tiên. Bạn sẽ thắng nếu 2 người chơi ấy chết và bạn phải sống cho đến khi game kết thúc.',
    script: 'Du Côn hãy thức dậy và chọn 2 người chơi để gây sự.',
  },
  cupid: {
    name: 'Thần Tình Yêu',
    ability:
      'Trong đêm đầu tiên, chọn 2 người chơi trở thành một cặp đôi. Nếu một người chết, người còn lại cũng chết theo.',
    script:
      'Thần Tình Yêu hãy thức dậy, mở mắt và chỉ vào 2 người để kết thành một đôi tình nhân (có thể chỉ bản thân).',
  },
  guard: {
    name: 'Bảo Vệ',
    ability:
      'Mỗi đêm, bảo vệ cho 1 người chơi. Người đó sẽ không thể bị sói cắn chết trong đêm nay. Không được bảo vệ cùng 1 người 2 đêm liên tiếp.',
    script: 'Bảo Vệ hãy thức dậy. Bạn muốn bảo vệ ai trong đêm nay?',
  },
  priest: {
    name: 'Mục sư',
    ability:
      'Vào ban đêm, chọn 1 người để ban phước (1 lần duy nhất). Người chơi ấy không thể chết vào ban đêm (trừ tự sát).',
    script: 'Mục sư hãy thức dậy. Bạn muốn ban phước cho ai?',
  },
  werewolf: {
    name: 'Ma Sói',
    ability:
      'Mỗi đêm, cả bầy Sói cùng thống nhất chọn 1 người để ăn thịt. Nạn nhân sẽ chết vào đầu ngày hôm sau.',
    script:
      'Ma Sói hãy thức dậy, nhìn nhau và cùng chọn 1 người để ăn thịt đêm nay.',
  },
  fruit_wolf: {
    name: 'Sói Ăn Chay',
    ability: 'Nếu bạn là con sói cuối cùng thì bạn sẽ không được ăn thịt.',
    script: 'Sói Ăn Chay hãy thức dậy để các Ma Sói còn lại biết.',
  },
  wolf_cub: {
    name: 'Sói Con',
    ability:
      'Nếu Sói Con bị giết, sói sẽ được ăn thịt 2 người chơi vào đêm tiếp theo.',
    script: 'Sói Con giơ tay lên để các Ma Sói còn lại biết.',
  },
  wolf_man: {
    name: 'Người sói',
    ability:
      'Bạn là sói nhưng có dòng máu của con người nên Tiên tri không soi ra bạn là Sói.',
    script: 'Người Sói hãy thức dậy để các Ma Sói còn lại biết.',
  },
  wolverine: {
    name: 'Wolverine',
    ability:
      'Nếu Wolverine là con Sói ngồi gần nạn nhân nhất, những người chơi sẽ nghe thấy tiếng kim loại chạm vào nhau.',
    script: 'Wolverine hãy thức dậy để các Ma Sói còn lại biết.',
  },
  big_bad_wolf: {
    name: 'Sói Đại Ca',
    ability:
      'Chừng nào Sói Đại Ca còn sống, mỗi đêm phe Ma Sói có thể giết thêm một người chơi ngồi cạnh nạn nhân đã chọn.',
    script: 'Sói Đại Ca hãy thức dậy để các Ma Sói còn lại biết.',
  },
  minion: {
    name: 'Kẻ phản bội',
    aliases: ['Phản bội'],
    ability:
      'Phản bội thức dậy cùng Sói và biết Sói là ai. Tham gia cùng Sói để giết Dân làng. Tuy nhiên Tiên tri khi soi vào Phản bội thì vẫn ra dân làng.',
    script: 'Kẻ phản bội giơ tay lên để các Ma Sói còn lại biết.',
  },
  alpha_wolf: {
    name: 'Sói Đầu đàn',
    ability:
      'Sau khi bầy sói chọn mục tiêu. Bạn có thể biến con mồi trở thành sói thay vì ăn thịt nếu con mồi bị ăn thịt thành công (1 ván 1 lần duy nhất).',
    script:
      'Sói Đầu đàn hãy thức dậy. Bạn có muốn biến con mồi trở thành sói không?',
  },
  dire_wolf: {
    name: 'Sói Tuyết',
    ability:
      'Đêm đầu tiên, chọn một người chơi khác làm bạn đồng hành. Nếu người đó chết, Sói Tuyết cũng chết theo. Nếu Sói Tuyết chết, người đó không chết.',
    script:
      'Sói Tuyết hãy thức dậy và chỉ vào một người chơi để làm bạn đồng hành.',
  },
  fang_face: {
    name: 'Nanh Sói',
    ability:
      'Đên đầu tiên, Nanh sói cũng thức dậy cùng những Sói khác. Nanh sói sẽ tiếp tục ngủ vào các đêm tiếp theo, cho đến khi là con sói duy nhất.',
    script: 'Nanh Sói hãy thức dậy để xem bạn là con sói cuối cùng hay không?',
  },
  white_wolf: {
    name: 'Sói Trắng',
    ability:
      'Bạn thức dậy cùng bầy sói. Mỗi 2 đêm, Sói Trắng có thể chọn 1 phe Sói để ăn thịt. Bạn chỉ thắng nếu là con sói cuối cùng và giết hết phe còn lại.',
    script:
      'Sói trắng hãy thức dậy, đêm nay bạn có muốn giết một con sói nào không.',
  },
  vampire: {
    name: 'Ma Cà Rồng',
    ability:
      'Mỗi đêm, cả bầy Ma cà rồng cùng chọn 1 người để cắn. Nạn nhân chết vào cuối ngày hôm sau.',
    script:
      'Ma Cà Rồng hãy thức dậy, nhìn nhau và cùng chọn 1 người để cắn đêm nay.',
  },
  dracula: {
    name: 'Dracula',
    ability:
      'Sau khi Ma Cà Rồng chọn mục tiêu. Bạn có thể biến con mồi trở thành Ma Cà Rồng nếu con mồi bị cắn thành công (1 ván 1 lần duy nhất).',
    script:
      'Dracula hãy thức dậy. Bạn có muốn biến con mồi trở thành Ma Cà Rồng không?',
  },
  witch: {
    name: 'Phù Thủy',
    ability: 'Có 2 bình thuốc dùng một lần: 1 bình cứu và 1 bình độc.',
    script:
      'Phù Thủy hãy thức dậy. Đây là nạn nhân của Sói đêm nay. Bạn có muốn dùng bình cứu không? Bạn có muốn dùng bình độc với ai không?',
  },
  illusion_artist: {
    name: 'Họa Sĩ Ảo Ảnh',
    aliases: ['Họa sĩ'],
    ability:
      'Mỗi đêm, chọn 1 người chơi. Nếu Tiên Tri soi người đó trong đêm nay, Tiên Tri sẽ thấy họ thuộc phe đối diện với phe thật của họ.',
    script:
      'Họa Sĩ Ảo Ảnh hãy thức dậy và chỉ vào 1 người chơi để đánh lừa Tiên Tri đêm nay.',
  },
  seer: {
    name: 'Tiên Tri',
    ability: 'Mỗi đêm, chỉ vào 1 người để biết người đó có phải Sói hay không.',
    script:
      'Tiên Tri thức dậy và chỉ vào 1 người để biết người đó có phải Sói hay không.',
  },
  one_eye_seer: {
    name: 'Tiên Tri Chột',
    ability:
      'Mỗi đêm, chọn 1 người chơi để biết họ có phải phe Sói hay không. Nếu soi ra Sói, bạn mất chức năng cho đến khi con Sói đó bị giết.',
    script:
      'Tiên Tri Chột hãy thức dậy và chỉ vào 1 người để biết họ có phải phe Sói hay không.',
  },
  aura_seer: {
    name: 'Tiên Tri Hào Quang',
    aliases: ['Tiên tri aura'],
    ability:
      'Mỗi đêm, chỉ vào 1 người để biết người đó có chức năng đặc biệt hay không (không phải Dân làng, Ma Sói, Ma cà rồng).',
    script:
      'Tiên Tri Hào Quang hãy thức dậy và chỉ vào 1 người để biết người đó có chức năng đặc biệt hay không.',
  },
  mystic_seeker: {
    name: 'Tiên Tri Bí Ẩn',
    ability: 'Mỗi đêm, chọn 1 người và biết chính xác chức năng cụ thể của họ.',
    script:
      'Tiên Tri Bí Ẩn hãy thức dậy và chỉ vào 1 người để biết chính xác chức năng cụ thể của họ.',
  },
  apprentice_seer: {
    name: 'Tiên Tri Tập sự',
    ability: 'Nếu Tiên Tri chết, bạn sẽ trở thành Tiên Tri.',
    script:
      'Tiên Tri Tập sự hãy thức dậy để xem bạn có trở thành Tiên Tri hay không. Nếu bạn trở thành Tiên Tri, hãy chỉ vào 1 người để biết họ là Sói hay không.',
  },
  beholder: {
    name: 'Người quan Sát',
    ability: 'Đêm đầu tiên tỉnh dậy, được cho biết ai là Tiên Tri.',
    script:
      'Người Quan Sát hãy thức dậy, tôi sẽ chỉ cho bạn biết ai là Tiên Tri.',
  },
  sorceress: {
    name: 'Bà Đồng',
    ability:
      'Mỗi đêm, thức dậy truy tìm Tiên Tri. Bạn thuộc phe sói nhưng Tiên Tri sẽ soi thành người.',
    script: 'Bà Đồng hãy thức dậy để truy tìm Tiên Tri.',
  },
  hunter: {
    name: 'Thợ Săn',
    ability: 'Khi bạn chết, bạn được phép giết một người chơi khác.',
    script: 'Thợ Săn hãy thức dậy. Bạn muốn săn chết ai? Có thể không chọn ai.',
  },
  huntress: {
    name: 'Nữ Thợ Săn',
    ability:
      'Trong đêm, bạn được phép giết một người chơi khác (1 lần duy nhất).',
    script:
      'Nữ Thợ Săn hãy thức dậy. Bạn muốn bắn chết ai? Có thể không chọn ai.',
  },
  exposer: {
    name: 'Người Khám Phá',
    aliases: ['Khám phá'],
    ability:
      'Một đêm trong ván, chọn 1 người chơi. Chức năng của người đó sẽ bị lộ vào sáng hôm sau.',
    script:
      'Người Khám Phá hãy thức dậy. Bạn có muốn khám phá chức năng của ai? Có thể không chọn ai.',
  },
  evil_empath: {
    name: 'Kẻ Đọc Vị',
    aliases: ['Đọc vị'],
    ability:
      'Mỗi đêm, bạn biết được Tiên Tri có đang ngồi cạnh một con Sói hay không.',
    script:
      'Kẻ Đọc Vị hãy thức dậy. Tôi sẽ cho bạn biết Tiên Tri có đang ngồi cạnh Sói hay không.',
  },
  investigator: {
    name: 'Thám Tử',
    ability:
      '1 lần trong ván, chọn 1 người, bạn sẽ sẽ biết người chơi đó hoặc 2 người ngồi cạnh người đó có phải là sói hay không.',
    script:
      'Thám tử hãy thức dậy. Bạn có muốn điều tra ai? Có thể chưa chọn ai.',
  },
  spellcaster: {
    name: 'Pháp sư',
    ability:
      'Mỗi đêm chọn một người chơi để người đó không được phép nói vào ngày hôm sau.',
    script:
      'Pháp sư hãy thức dậy. Bạn có muốn làm phép cho ai? Có thể không chọn ai.',
  },
  cursed: {
    name: 'Kẻ Bị Nguyền',
    aliases: ['Bán Sói'],
    ability:
      'Bạn thuộc phe dân làng nhưng nếu bạn bị sói cắn chết, bạn sẽ trở thành sói.',
    script: 'Kẻ Bị Nguyền hãy thức dậy để xem bạn có trở thành sói hay không.',
  },
  old_hag: {
    name: 'Mụ Già',
    ability:
      'Mỗi đêm, chọn một người chơi phải rời khỏi làng vào ngày hôm sau.',
    script:
      'Mụ Già hãy thức dậy. Bạn chọn ai rời khỏi làng vào ngày hôm sau? Có thể không chọn ai.',
  },
  mentalist: {
    name: 'Nhà ngoại cảm',
    aliases: ['Ngoại cảm'],
    ability:
      'Mỗi đêm, chọn ra 2 người chơi, bạn sẽ biết họ cùng phe với nhau hay không.',
    script:
      'Nhà ngoại cảm hãy thức dậy. Bạn chọn 2 người chơi để biết họ cùng phe với nhau hay không?',
  },
  gambler: {
    name: 'Con Bạc',
    ability:
      'Mỗi đêm (trừ đêm đầu), chỉ 1 người chơi. Nếu người chơi đó là Sói thì họ chết. Nếu không, bạn chết.',
    script: 'Con bạc hãy thức dậy, đêm nay bạn muốn chơi may rủi với ai?',
  },
  the_thing: {
    name: 'The Thing',
    ability: 'Mỗi đêm, tỉnh dậy và vỗ vào người ngồi bên cạnh mình.',
    script: 'The Thing hãy thức dậy, bạn muốn vỗ vai ai?',
  },
  haunted_ghost: {
    name: 'Ma Ám',
    ability:
      'Đêm đầu tiên, chọn một người chơi để ám. Người đó sẽ được thông báo là mình bị ám. Nếu Ma Ám chết, người bị ám cũng chết theo.',
    script: 'Ma Ám hãy thức dậy và chỉ vào một người chơi để ám họ.',
  },
  cult_leader: {
    name: 'Chủ Giáo Phái',
    ability:
      'Mỗi đêm, chọn 1 người chơi tham gia vào giáo phái của bạn. Nếu tất cả người chơi còn sống đều trong giáo phái, bạn thắng.',
    script:
      'Chủ Giáo Phái hãy thức dậy. Bạn chọn 1 người chơi để tham gia vào giáo phái của bạn.',
  },
  insomniac: {
    name: 'Kẻ Mất Ngủ',
    aliases: ['Mất Ngủ'],
    ability:
      'Cuối mỗi đêm, bạn biết được có ít nhất 1 trong 2 người ngồi cạnh mình có hoạt động trong đêm hay không.',
    script:
      'Kẻ Mất Ngủ hãy thức dậy. Tôi sẽ cho bạn biết người ngồi cạnh bạn có hoạt động đêm nay hay không.',
  },
  villager: {
    name: 'Dân Làng',
    ability:
      'Không có năng lực đặc biệt. Nhiệm vụ là tìm ra và treo cổ Sói/Ma cà rồng.',
  },
}

/** Bước gọi đêm bổ sung (NIGHT_EXTRAS trong src/data/roles.js). */
export const NIGHT_EXTRA_TEXT = {
  lovers: {
    name: 'Cặp đôi',
    script: 'Cặp đôi thức dậy và trao nhau thông tin.',
  },
  cupidThirdTeam: {
    name: 'Thần Tình Yêu — phe thứ 3',
    playerCondition: 'Hơn 12 người chơi',
    script:
      'Thần Tình Yêu thức dậy. Tôi sẽ cho bạn biết bạn có thuộc phe thứ 3 (phe Cặp đôi) hay không.',
    moderatorNote:
      'Chỉ áp dụng khi có hơn 12 người chơi, thực hiện ngay sau khi Cặp đôi đã thức dậy. Nếu Cupid ghép hai người thuộc hai phe đối lập (ví dụ Sói/Ma cà rồng với Dân làng), báo cho Cupid biết họ thuộc phe thứ 3. Nếu không, báo Cupid vẫn thuộc phe Dân làng.',
  },
}
