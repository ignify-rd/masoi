// Dữ liệu role dựa trên Ultimate Werewolf / Werewolves Big Box (Pegasus).
// value: điểm cân bằng (dương = lợi cho Dân làng, âm = lợi cho Sói/Ma cà rồng).
// max: số lượng tối đa trong một ván (mặc định 1 cho vai đặc biệt).
// recommended: vai trò gợi ý cho ván cơ bản, ưu tiên hiển thị đầu danh sách.
// nightOrder: thứ tự được gọi dậy trong đêm (chuẩn rulebook).
// phase: 'every' = gọi mỗi đêm | 'night1' = chỉ đêm 1 | 'night2' = chỉ đêm 2
//        | 'fromNight2' = từ đêm 2 trở đi.
// aliases: tên gọi khác (VD tên cột trên Google Sheet) — tên/nameEn/id đã tự
//          được nhận, chỉ cần ghi những tên khác hẳn.
// randomPair: bước gọi đêm có nút chọn ngẫu nhiên 2 số người chơi.
//
// File này phải là dữ liệu thuần (không dùng API riêng của Vite) để
// scripts/google-sheets/build.mjs chạy được bằng node.

export const TEAMS = {
  village: { id: 'village', label: 'Dân làng', color: '#74b85f' },
  werewolf: { id: 'werewolf', label: 'Sói', color: '#e35d4d' },
  vampire: { id: 'vampire', label: 'Ma cà rồng', color: '#b47fe0' },
  other: { id: 'other', label: 'Khác', color: '#62a8d9' },
}

export const TEAM_IDS = Object.keys(TEAMS)

export const PHASE_LABEL = {
  every: 'Mỗi đêm',
  night1: 'Chỉ đêm 1',
  night2: 'Chỉ đêm 2',
  fromNight2: 'Từ đêm 2',
}

/** Bước gọi đêm bổ sung (không phải vai trò chọn trong ván). */
export const NIGHT_EXTRAS = {
  lovers: {
    id: 'lovers',
    requiresRole: 'cupid',
    nightOrder: 1.5,
    name: 'Cặp đôi',
    phase: 'every',
    script: 'Cặp đôi thức dậy và trao nhau thông tin.',
  },
  cupidThirdTeam: {
    id: 'cupidThirdTeam',
    requiresRole: 'cupid',
    minPlayers: 13,
    nightOrder: 1.55,
    name: 'Thần Tình Yêu — phe thứ 3',
    phase: 'night1',
    playerCondition: 'Hơn 12 người chơi',
    script:
      'Thần Tình Yêu thức dậy. Tôi sẽ cho bạn biết bạn có thuộc phe thứ 3 (phe Cặp đôi) hay không.',
    moderatorNote:
      'Chỉ áp dụng khi có hơn 12 người chơi, thực hiện ngay sau khi Cặp đôi đã thức dậy. Nếu Cupid ghép hai người thuộc hai phe đối lập (ví dụ Sói/Ma cà rồng với Dân làng), báo cho Cupid biết họ thuộc phe thứ 3. Nếu không, báo Cupid vẫn thuộc phe Dân làng.',
  }
}

const ROLES_DATA = [
  {
    id: 'dream_wolf',
    name: 'Sói Mơ Mộng',
    nameEn: 'Dreamwolf',
    team: 'werewolf',
    value: -5,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability:
      'Sói Mơ Mộng sẽ không thức dậy cùng phe Sói cho đến khi có một Ma Sói bị giết.',
    script: 'Sói Mơ Mộng thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'bigfoot',
    name: 'Chân To',
    nameEn: 'Big Foot',
    team: 'village',
    value: -2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability:
      'Ban đầu thuộc phe Dân làng, nhưng khi bị Tiên Tri soi lại ra phe Sói vì trông lông lá giống Sói. Anh ta thuộc phe Dân làng cho đến ngày không có ai bị treo cổ; ngày hôm sau anh ta tức giận và chuyển sang phe Sói.',
    script: 'Chân To hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'tanner',
    name: 'Chán Đời',
    nameEn: 'Tanner',
    team: 'other',
    value: -2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Bạn chỉ thắng khi bị giết trong buổi sáng.',
    script: 'Chán Đời hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'prince',
    name: 'Hoàng Tử',
    nameEn: 'Prince',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability:
      'Nếu bạn bị bình chọn để giết buổi sáng, bạn tiết lộ thân phận và được sống tiếp.',
    script: 'Hoàng Tử hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'lone_wolf',
    name: 'Sói đơn độc',
    nameEn: 'Lone Wolf',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability:
      'Bạn chỉ thắng nếu bạn là con sói cuối cùng sống sót.',
    script:
      'Sói đơn độc thức dậy để tôi ghi nhận vai trò của bạn.'
  },
  {
    id: 'halfblood',
    name: 'Con Lai',
    nameEn: 'Halfblood',
    team: 'village',
    value: 0,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability:
      'Khi bị tiên tri soi thì bạn là Sói.',
    script:
      'Con lai thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'mayor',
    name: 'Thị Trưởng',
    nameEn: 'Mayor',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Phiếu bầu của bạn tính là 2 phiếu.',
    script: 'Thị Trưởng hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'tough_guy',
    name: 'Thanh Niên Cứng',
    nameEn: 'Tough Guy',
    aliases: ['TN cứng'],
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Nếu sói cắn bạn, bạn sẽ không chết ngay và cầm cự đến đêm tiếp theo.',
    script: 'Thanh niên cứng hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'terrorist',
    name: 'Kẻ Khủng Bố',
    nameEn: 'Terrorist',
    aliases: ['Khủng bố'],
    team: 'village',
    value: -1,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Khi bạn chết, bạn kích hoạt một vụ nổ, giết chết 2 người bên cạnh bạn.',
    script: 'Kẻ Khủng Bố hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'rusty_knight',
    name: 'Hiệp sĩ Kiếm Rỉ',
    nameEn: 'Rusty Knight',
    aliases: ['Kiếm rỉ'],
    team: 'village',
    value: 5,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Nếu bạn bị sói cắn chết, Ma Sói bị nhiễm bệnh từ vết thương của kiếm rỉ. Con Sói nằm ngay bên trái của bạn sẽ bị chết vào đêm hôm sau. Người giữ bài Hiệp sĩ kiếm rỉ không được tiết lộ danh tính cho người khác khi còn sống, nếu không lá bài sẽ mất tác dụng.',
    script: 'Hiệp sĩ Kiếm Rỉ hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'diseased',
    name: 'Người Bệnh',
    nameEn: 'Diseased',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Nếu bạn bị sói cắn chết, chúng sẽ lây bệnh và không thể giết ai vào đêm tiếp theo.',
    script: 'Người Bệnh hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'hoodlum',
    name: 'Du Côn',
    nameEn: 'Hoodlum',
    team: 'other',
    value: 0,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability:
      'Gây sự 2 người vào đêm đầu tiên. Bạn sẽ thắng nếu 2 người chơi ấy chết và bạn phải sống cho đến khi game kết thúc.',
    script:
      'Du Côn hãy thức dậy và chọn 2 người chơi để gây sự.',
  },
  {
    id: 'cupid',
    name: 'Thần Tình Yêu',
    nameEn: 'Cupid',
    team: 'village',
    value: 3,
    recommended: true,
    randomPair: true,
    wakesAtNight: true,
    nightOrder: 1,
    phase: 'night1',
    ability:
      'Trong đêm đầu tiên, chọn 2 người chơi trở thành một cặp đôi. Nếu một người chết, người còn lại cũng chết theo.',
    script:
      'Thần Tình Yêu hãy thức dậy, mở mắt và chỉ vào 2 người để kết thành một đôi tình nhân (có thể chỉ bản thân).'
  },
  {
    id: 'guard',
    name: 'Bảo Vệ',
    nameEn: 'Guard',
    team: 'village',
    value: 4,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 2,
    phase: 'every',
    ability:
      'Mỗi đêm, bảo vệ cho 1 người chơi. Người đó sẽ không thể bị sói cắn chết trong đêm nay. Không được bảo vệ cùng 1 người 2 đêm liên tiếp.',
    script:
      'Bảo Vệ hãy thức dậy. Bạn muốn bảo vệ ai trong đêm nay?',
  },
  {
    id: 'priest',
    name: 'Mục sư',
    nameEn: 'Priest',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 2,
    phase: 'night1',
    ability:
      'Vào ban đêm, chọn 1 người để ban phước (1 lần duy nhất). Người chơi ấy không thể chết vào ban đêm (trừ tự sát).',
    script:
      'Mục sư hãy thức dậy. Bạn muốn ban phước cho ai?',
  },
  {
    id: 'werewolf',
    name: 'Ma Sói',
    nameEn: 'Werewolf',
    team: 'werewolf',
    value: -6,
    max: 10,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 3,
    phase: 'every',
    ability:
      'Mỗi đêm, cả bầy Sói cùng thống nhất chọn 1 người để ăn thịt. Nạn nhân sẽ chết vào đầu ngày hôm sau.',
    script:
      'Ma Sói hãy thức dậy, nhìn nhau và cùng chọn 1 người để ăn thịt đêm nay.',
  },
  {
    id: 'fruit_wolf',
    name: 'Sói Ăn Chay',
    nameEn: 'Fruit Wolf',
    team: 'werewolf',
    value: -3,
    wakesAtNight: true,
    nightOrder: 3.1,
    phase: 'night1',
    ability:
      'Nếu bạn là con sói cuối cùng thì bạn sẽ không được ăn thịt.',
    script:
      'Sói Ăn Chay hãy thức dậy để các Ma Sói còn lại biết.'
  },
  {
    id: 'wolf_cub',
    name: 'Sói Con',
    nameEn: 'Wolf Cub',
    team: 'werewolf',
    value: -8,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
    ability:
      'Nếu Sói Con bị giết, sói sẽ được ăn thịt 2 người chơi vào đêm tiếp theo.',
    script:
      'Sói Con giơ tay lên để các Ma Sói còn lại biết.',
  },
  {
    id: 'wolf_man',
    name: 'Người sói',
    nameEn: 'Wolf Man',
    team: 'werewolf',
    value: -7,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
    ability:
      'Bạn là sói nhưng có dòng máu của con người nên Tiên tri không soi ra bạn là Sói.',
    script:
      'Người Sói hãy thức dậy để các Ma Sói còn lại biết.',
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    nameEn: 'Wolverine',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
    ability:
      'Nếu Wolverine là con Sói ngồi gần nạn nhân nhất, những người chơi sẽ nghe thấy tiếng kim loại chạm vào nhau.',
    script: 'Wolverine hãy thức dậy để các Ma Sói còn lại biết.',
  },
  {
    id: 'big_bad_wolf',
    name: 'Sói Đại Ca',
    nameEn: 'Big Bad Wolf',
    team: 'werewolf',
    value: -9,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
    ability:
      'Chừng nào Sói Đại Ca còn sống, mỗi đêm phe Ma Sói có thể giết thêm một người chơi ngồi cạnh nạn nhân đã chọn.',
    script:
      'Sói Đại Ca hãy thức dậy để các Ma Sói còn lại biết.',
  },
  {
    id: 'minion',
    name: 'Kẻ phản bội',
    nameEn: 'Minion',
    aliases: ['Phản bội'],
    team: 'werewolf',
    value: -6,
    wakesAtNight: true,
    nightOrder: 3.3,
    phase: 'night1',
    ability:
      'Phản bội thức dậy cùng Sói và biết Sói là ai. Tham gia cùng Sói để giết Dân làng. Tuy nhiên Tiên tri khi soi vào Phản bội thì vẫn ra dân làng.',
    script:
      'Kẻ phản bội giơ tay lên để các Ma Sói còn lại biết.',
  },
  {
    id: 'alpha_wolf',
    name: 'Sói Đầu đàn',
    nameEn: 'Alpha Wolf',
    team: 'werewolf',
    value: -9,
    wakesAtNight: true,
    nightOrder: 3.3,
    phase: 'every',
    ability:
      'Sau khi bầy sói chọn mục tiêu. Bạn có thể biến con mồi trở thành sói thay vì ăn thịt nếu con mồi bị ăn thịt thành công (1 ván 1 lần duy nhất).',
    script:
      'Sói Đầu đàn hãy thức dậy. Bạn có muốn biến con mồi trở thành sói không?',
  },
  {
    id: 'dire_wolf',
    name: 'Sói Tuyết',
    nameEn: 'Dire Wolf',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 3.3,
    phase: 'night1',
    ability:
      'Đêm đầu tiên, chọn một người chơi khác làm bạn đồng hành. Nếu người đó chết, Sói Tuyết cũng chết theo. Nếu Sói Tuyết chết, người đó không chết.',
    script:
      'Sói Tuyết hãy thức dậy và chỉ vào một người chơi để làm bạn đồng hành.',
  },
  {
    id: 'fang_face',
    name: 'Nanh Sói',
    nameEn: 'Fang Face',
    team: 'werewolf',
    value: -5,
    wakesAtNight: true,
    nightOrder: 3.4,
    phase: 'every',
    ability:
      'Đên đầu tiên, Nanh sói cũng thức dậy cùng những Sói khác. Nanh sói sẽ tiếp tục ngủ vào các đêm tiếp theo, cho đến khi là con sói duy nhất.',
    script:
      'Nanh Sói hãy thức dậy để xem bạn là con sói cuối cùng hay không?',
  },
  {
    id: 'white_wolf',
    name: 'Sói Trắng',
    nameEn: 'White Wolf',
    team: 'other',
    value: -2,
    wakesAtNight: true,
    nightOrder: 3.99,
    phase: 'every',
    ability:
      'Bạn thức dậy cùng bầy sói. Mỗi 2 đêm, Sói Trắng có thể chọn 1 phe Sói để ăn thịt. Bạn chỉ thắng nếu là con sói cuối cùng và giết hết phe còn lại.',
    script:
      'Sói trắng hãy thức dậy, đêm nay bạn có muốn giết một con sói nào không.',
  },
  {
    id: 'vampire',
    name: 'Ma Cà Rồng',
    nameEn: 'Vampire',
    team: 'vampire',
    value: -7,
    max: 6,
    wakesAtNight: true,
    nightOrder: 4,
    phase: 'every',
    ability:
      'Mỗi đêm, cả bầy Ma cà rồng cùng chọn 1 người để cắn. Nạn nhân chết vào cuối ngày hôm sau.',
    script:
      'Ma Cà Rồng hãy thức dậy, nhìn nhau và cùng chọn 1 người để cắn đêm nay.',
  },
  {
    id: 'dracula',
    name: 'Dracula',
    nameEn: 'Dracula',
    team: 'vampire',
    value: -10,
    wakesAtNight: true,
    nightOrder: 4.1,
    phase: 'every',
    ability:
      'Sau khi Ma Cà Rồng chọn mục tiêu. Bạn có thể biến con mồi trở thành Ma Cà Rồng nếu con mồi bị cắn thành công (1 ván 1 lần duy nhất).',
    script:
      'Dracula hãy thức dậy. Bạn có muốn biến con mồi trở thành Ma Cà Rồng không?',
  },
  {
    id: 'witch',
    name: 'Phù Thủy',
    nameEn: 'Witch',
    team: 'village',
    value: 5,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 5,
    phase: 'every',
    ability:
      'Có 2 bình thuốc dùng một lần: 1 bình cứu và 1 bình độc.',
    script:
      'Phù Thủy hãy thức dậy. Đây là nạn nhân của Sói đêm nay. Bạn có muốn dùng bình cứu không? Bạn có muốn dùng bình độc với ai không?',
  },
  {
    id: 'illusion_artist',
    name: 'Họa Sĩ Ảo Ảnh',
    nameEn: 'The Illusion Artist',
    aliases: ['Họa sĩ'],
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 5.9,
    phase: 'every',
    ability:
      'Mỗi đêm, chọn 1 người chơi. Nếu Tiên Tri soi người đó trong đêm nay, Tiên Tri sẽ thấy họ thuộc phe đối diện với phe thật của họ.',
    script:
      'Họa Sĩ Ảo Ảnh hãy thức dậy và chỉ vào 1 người chơi để đánh lừa Tiên Tri đêm nay.',
  },
  {
    id: 'seer',
    name: 'Tiên Tri',
    nameEn: 'Seer',
    team: 'village',
    value: 7,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 6,
    phase: 'every',
    ability:
      'Mỗi đêm, chỉ vào 1 người để biết người đó có phải Sói hay không.',
    script:
      'Tiên Tri thức dậy và chỉ vào 1 người để biết người đó có phải Sói hay không.',
  },
  {
    id: 'one_eye_seer',
    name: 'Tiên Tri Chột',
    nameEn: 'One-Eye Seer',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 6,
    phase: 'every',
    ability:
      'Mỗi đêm, chọn 1 người chơi để biết họ có phải phe Sói hay không. Nếu soi ra Sói, bạn mất chức năng cho đến khi con Sói đó bị giết.',
    script:
      'Tiên Tri Chột hãy thức dậy và chỉ vào 1 người để biết họ có phải phe Sói hay không.',
  },
  {
    id: 'aura_seer',
    name: 'Tiên Tri Hào Quang',
    nameEn: 'Aura Seer',
    aliases: ['Tiên tri aura'],
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 100,
    phase: 'every',
    ability:
      'Mỗi đêm, chỉ vào 1 người để biết người đó có chức năng đặc biệt hay không (không phải Dân làng, Ma Sói, Ma cà rồng).',
    script:
      'Tiên Tri Hào Quang hãy thức dậy và chỉ vào 1 người để biết người đó có chức năng đặc biệt hay không.',
  },
  {
    id: 'mystic_seeker',
    name: 'Tiên Tri Bí Ẩn',
    nameEn: 'Mystic Seeker',
    team: 'village',
    value: 9,
    wakesAtNight: true,
    nightOrder: 100,
    phase: 'every',
    ability:
      'Mỗi đêm, chọn 1 người và biết chính xác chức năng cụ thể của họ.',
    script:
      'Tiên Tri Bí Ẩn hãy thức dậy và chỉ vào 1 người để biết chính xác chức năng cụ thể của họ.',
  },
  {
    id: 'apprentice_seer',
    name: 'Tiên Tri Tập sự',
    nameEn: 'Apprentice Seer',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 6.5,
    phase: 'every',
    ability:
      'Nếu Tiên Tri chết, bạn sẽ trở thành Tiên Tri.',
    script:
      'Tiên Tri Tập sự hãy thức dậy để xem bạn có trở thành Tiên Tri hay không. Nếu bạn trở thành Tiên Tri, hãy chỉ vào 1 người để biết họ là Sói hay không.',
  },
  {
    id: 'beholder',
    name: 'Người quan Sát',
    nameEn: 'Beholder',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 6.9999,
    phase: 'night1',
    ability: 'Đêm đầu tiên tỉnh dậy, được cho biết ai là Tiên Tri.',
    script:
      'Người Quan Sát hãy thức dậy, tôi sẽ chỉ cho bạn biết ai là Tiên Tri.',
  },
  {
    id: 'sorceress',
    name: 'Bà Đồng',
    nameEn: 'Sorceress',
    team: 'werewolf',
    value: -3,
    wakesAtNight: true,
    nightOrder: 6.9,
    phase: 'every',
    ability:
      'Mỗi đêm, thức dậy truy tìm Tiên Tri. Bạn thuộc phe sói nhưng Tiên Tri sẽ soi thành người.',
    script:
      'Bà Đồng hãy thức dậy để truy tìm Tiên Tri.',
  },
  {
    id: 'hunter',
    name: 'Thợ Săn',
    nameEn: 'Hunter',
    team: 'village',
    value: 3,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 7,
    phase: 'every',
    ability:
      'Khi bạn chết, bạn được phép giết một người chơi khác.',
    script: 'Thợ Săn hãy thức dậy. Bạn muốn săn chết ai? Có thể không chọn ai.',
  },
  {
    id: 'huntress',
    name: 'Nữ Thợ Săn',
    nameEn: 'Huntress',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 7.1,
    phase: 'every',
    ability:
      'Trong đêm, bạn được phép giết một người chơi khác (1 lần duy nhất).',
    script: 'Nữ Thợ Săn hãy thức dậy. Bạn muốn bắn chết ai? Có thể không chọn ai.',
  },
  {
    id: 'exposer',
    name: 'Người Khám Phá',
    nameEn: 'Exposer',
    aliases: ['Khám phá'],
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      'Một đêm trong ván, chọn 1 người chơi. Chức năng của người đó sẽ bị lộ vào sáng hôm sau.',
    script:
      'Người Khám Phá hãy thức dậy. Bạn có muốn khám phá chức năng của ai? Có thể không chọn ai.',
  },
  {
    id: 'evil_empath',
    name: 'Kẻ Đọc Vị',
    nameEn: 'Evil Empath',
    aliases: ['Đọc vị'],
    team: 'werewolf',
    value: -5,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      'Mỗi đêm, bạn biết được Tiên Tri có đang ngồi cạnh một con Sói hay không.',
    script:
      'Kẻ Đọc Vị hãy thức dậy. Tôi sẽ cho bạn biết Tiên Tri có đang ngồi cạnh Sói hay không.',
  },
  {
    id: 'investigator',
    name: 'Thám Tử',
    nameEn: 'Investigator',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      '1 lần trong ván, chọn 1 người, bạn sẽ sẽ biết người chơi đó hoặc 2 người ngồi cạnh người đó có phải là sói hay không.',
    script:
      'Thám tử hãy thức dậy. Bạn có muốn điều tra ai? Có thể chưa chọn ai.',
  },
  {
    id: 'spellcaster',
    name: 'Pháp sư',
    nameEn: 'Spellcaster',
    team: 'village',
    value: 1,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      'Mỗi đêm chọn một người chơi để người đó không được phép nói vào ngày hôm sau.',
    script:
      'Pháp sư hãy thức dậy. Bạn có muốn làm phép cho ai? Có thể không chọn ai.',
  },
  {
    id: 'cursed',
    name: 'Kẻ Bị Nguyền',
    nameEn: 'Cursed',
    aliases: ['Bán Sói'],
    team: 'village',
    value: -2,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      'Bạn thuộc phe dân làng nhưng nếu bạn bị sói cắn chết, bạn sẽ trở thành sói.',
    script:
      'Kẻ Bị Nguyền hãy thức dậy để xem bạn có trở thành sói hay không.',
  },
  {
    id: 'old_hag',
    name: 'Mụ Già',
    nameEn: 'Old Hag',
    team: 'village',
    value: 1,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      'Mỗi đêm, chọn một người chơi phải rời khỏi làng vào ngày hôm sau.',
    script:
      'Mụ Già hãy thức dậy. Bạn chọn ai rời khỏi làng vào ngày hôm sau? Có thể không chọn ai.',
  },
  {
    id: 'mentalist',
    name: 'Nhà ngoại cảm',
    nameEn: 'Mentalist',
    aliases: ['Ngoại cảm'],
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      'Mỗi đêm, chọn ra 2 người chơi, bạn sẽ biết họ cùng phe với nhau hay không.',
    script:
      'Nhà ngoại cảm hãy thức dậy. Bạn chọn 2 người chơi để biết họ cùng phe với nhau hay không?',
  },
  {
    id: 'gambler',
    name: 'Con Bạc',
    nameEn: 'Gambler',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'fromNight2',
    ability:
      'Mỗi đêm (trừ đêm đầu), chỉ 1 người chơi. Nếu người chơi đó là Sói thì họ chết. Nếu không, bạn chết.',
    script:
      'Con bạc hãy thức dậy, đêm nay bạn muốn chơi may rủi với ai?',
  },
  {
    id: 'the_thing',
    name: 'The Thing',
    nameEn: 'The Thing',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
    ability:
      'Mỗi đêm, tỉnh dậy và vỗ vào người ngồi bên cạnh mình.',
    script:
      'The Thing hãy thức dậy, bạn muốn vỗ vai ai?',
  },
  {
    id: 'haunted_ghost',
    name: 'Ma Ám',
    nameEn: 'Haunted Ghost',
    team: 'village',
    value: -2,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'night1',
    ability:
      'Đêm đầu tiên, chọn một người chơi để ám. Người đó sẽ được thông báo là mình bị ám. Nếu Ma Ám chết, người bị ám cũng chết theo.',
    script:
      'Ma Ám hãy thức dậy và chỉ vào một người chơi để ám họ.',
  },
  {
    id: 'cult_leader',
    name: 'Chủ Giáo Phái',
    nameEn: 'Cult Leader',
    team: 'other',
    value: 1,
    wakesAtNight: true,
    nightOrder: 9,
    phase: 'every',
    ability:
      'Mỗi đêm, chọn 1 người chơi tham gia vào giáo phái của bạn. Nếu tất cả người chơi còn sống đều trong giáo phái, bạn thắng.',
    script:
      'Chủ Giáo Phái hãy thức dậy. Bạn chọn 1 người chơi để tham gia vào giáo phái của bạn.',
  },
  {
    id: 'insomniac',
    name: 'Kẻ Mất Ngủ',
    nameEn: 'Insomniac',
    aliases: ['Mất Ngủ'],
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 100,
    phase: 'every',
    ability:
      'Cuối mỗi đêm, bạn biết được có ít nhất 1 trong 2 người ngồi cạnh mình có hoạt động trong đêm hay không.',
    script:
      'Kẻ Mất Ngủ hãy thức dậy. Tôi sẽ cho bạn biết người ngồi cạnh bạn có hoạt động đêm nay hay không.',
  },
  {
    id: 'villager',
    name: 'Dân Làng',
    nameEn: 'Villager',
    team: 'village',
    value: 1,
    max: 30,
    recommended: true,
    wakesAtNight: false,
    nightOrder: 999,
    phase: 'every',
    ability:
      'Không có năng lực đặc biệt. Nhiệm vụ là tìm ra và treo cổ Sói/Ma cà rồng.',
    script: '',
  },
]

export const ROLES = ROLES_DATA.map((role) => ({
  max: 1,
  recommended: false,
  ...role,
}))

export const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]))

// Bảng slot cố định dùng để nhúng vai trò vào code chia sẻ setup.
// Mỗi phần tử: [id, sức chứa] — sức chứa là `max` tại thời điểm vai được thêm
// vào bảng, quyết định cơ số của chữ số tương ứng trong mã.
//
// QUY TẮC (giống THEME_CODE_BY_ID trong themes.js): vị trí trong mảng này LÀ
// một phần của định dạng mã. KHÔNG BAO GIỜ chèn vào giữa, xoá dòng, đổi thứ tự
// hay đổi sức chứa của vai đã tồn tại — mọi code cũ đã share sẽ giải mã sai.
// - Thêm vai mới  -> luôn chèn vào ĐẦU bảng (vị trí trong ROLES_DATA thì tuỳ ý).
//   Dòng đầu là chữ số hàng cao nhất, dòng cuối là hàng đơn vị: chèn đầu chỉ
//   thêm số 0 vô nghĩa nên code cũ giữ nguyên giá trị; append cuối sẽ đẩy lệch
//   mọi chữ số và làm code cũ giải ra setup khác.
// - Bỏ vai khỏi ROLES_DATA -> vẫn GIỮ NGUYÊN dòng ở đây (slot bị "chôn"), code
//   cũ chứa vai đó vẫn giải mã được và phần vai đã bỏ sẽ bị lược đi.
// - Đổi `max` trong ROLES_DATA -> an toàn, chỉ giới hạn UI; sức chứa ở đây giữ
//   nguyên, số lượng vượt quá sẽ được kẹp lại khi giải mã.
// - Sửa xong chạy `npm run gen:sheet` để cập nhật Google Sheet script;
//   `npm test` sẽ báo nếu thiếu slot, sai thứ tự hoặc quên cập nhật sheet.
export const ROLE_SLOTS = [
  ['tanner', 1],
  ['prince', 1],
  ['lone_wolf', 1],
  ['halfblood', 1],
  ['mayor', 1],
  ['tough_guy', 1],
  ['terrorist', 1],
  ['rusty_knight', 1],
  ['diseased', 1],
  ['hoodlum', 1],
  ['cupid', 1],
  ['guard', 1],
  ['priest', 1],
  ['werewolf', 10],
  ['fruit_wolf', 1],
  ['wolf_cub', 1],
  ['wolf_man', 1],
  ['minion', 1],
  ['alpha_wolf', 1],
  ['fang_face', 1],
  ['white_wolf', 1],
  ['vampire', 6],
  ['dracula', 1],
  ['witch', 1],
  ['seer', 1],
  ['aura_seer', 1],
  ['mystic_seeker', 1],
  ['apprentice_seer', 1],
  ['sorceress', 1],
  ['hunter', 1],
  ['huntress', 1],
  ['investigator', 1],
  ['spellcaster', 1],
  ['cursed', 1],
  ['old_hag', 1],
  ['mentalist', 1],
  ['gambler', 1],
  ['cult_leader', 1],
  ['villager', 30],
  ['insomniac', 1],
  ['big_bad_wolf', 1],
  ['dire_wolf', 1],
  ['wolverine', 1],
  ['haunted_ghost', 1],
  ['bigfoot', 1],
  ['dream_wolf', 1],
  ['the_thing', 1],
  ['beholder', 1],
  ['illusion_artist', 1],
  ['evil_empath', 1],
  ['one_eye_seer', 1],
  ['exposer', 1],
]

export function canIncreaseRole(id, selected) {
  const role = ROLE_BY_ID[id]
  if (!role) return false
  return (selected[id] || 0) < role.max
}

export function clampRoleCount(id, count) {
  const role = ROLE_BY_ID[id]
  if (!role || count <= 0) return 0
  return Math.min(count, role.max)
}

/**
 * Làm sạch setup đọc từ nguồn ngoài (localStorage, lịch sử ván): bỏ id không
 * còn tồn tại, bỏ số lượng <= 0 và kẹp theo `max`.
 */
export function normalizeSetup(roles) {
  if (!roles || typeof roles !== 'object') return {}
  return Object.fromEntries(
    Object.entries(roles)
      .map(([id, c]) => [id, clampRoleCount(id, Number(c) || 0)])
      .filter(([, c]) => c > 0),
  )
}
