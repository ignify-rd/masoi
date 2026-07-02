// Dữ liệu role dựa trên Ultimate Werewolf / Werewolves Big Box (Pegasus).
// value: điểm cân bằng (dương = lợi cho Dân làng, âm = lợi cho Sói/Ma cà rồng).
// max: số lượng tối đa trong một ván (mặc định 1 cho vai đặc biệt).
// recommended: vai trò gợi ý cho ván cơ bản, ưu tiên hiển thị đầu danh sách.
// nightOrder: thứ tự được gọi dậy trong đêm (chuẩn rulebook).
// phase: 'every' = gọi mỗi đêm | 'night1' = chỉ đêm 1 | 'night2' = chỉ đêm 2
//        | 'fromNight2' = từ đêm 2 trở đi.

export const TEAMS = {
  village: { id: 'village', label: 'Dân làng', color: '#22c55e' },
  werewolf: { id: 'werewolf', label: 'Sói', color: '#ef4444' },
  vampire: { id: 'vampire', label: 'Ma cà rồng', color: '#a855f7' },
  other: { id: 'other', label: 'Khác', color: '#eab308' },
}

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
  },
}

const ROLES_DATA = [
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
    value: -1,
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
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Nếu sói cắn bạn, bạn sẽ không chết ngay và cầm cự đến đêm tiếp theo.',
    script: 'Thanh niên cứng hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'tough_guy',
    name: 'Thanh Niên Cứng',
    nameEn: 'Tough Guy',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
    ability: 'Nếu sói cắn bạn, bạn sẽ không chết ngay và cầm cự đến đêm tiếp theo.',
    script: 'Thanh niên cứng hãy thức dậy để tôi ghi nhận vai trò của bạn.',
  },
  {
    id: 'rusty_knight',
    name: 'Hiệp sĩ Kiếm Rỉ',
    nameEn: 'Rusty Knight',
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
    phase: 'every',
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
    id: 'minion',
    name: 'Kẻ phản bội',
    nameEn: 'Minion',
    team: 'werewolf',
    value: -6,
    wakesAtNight: true,
    nightOrder: 3.2,
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
    id: 'aura_seer',
    name: 'Tiên Tri Hào Quang',
    nameEn: 'Aura Seer',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 6,
    phase: 'every',
    ability:
      'Mỗi đêm, chỉ vào 1 người để biết người đó có chức năng đặc biệt hay không (không phải Dân làng, Ma Sói, Ma cà rồng).',
    script:
      'Tiên Tri Hào Quang hãy thức dậy và chỉ vào 1 người để biết người đó có chức năng đặc biệt hay không.',
  },
  {
    id: 'mystic_seeker',
    name: 'Tiên Tri Bí Ẩn',
    nameEn: 'Healer',
    team: 'village',
    value: 9,
    wakesAtNight: true,
    nightOrder: 6,
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
    value: 3,
    wakesAtNight: true,
    nightOrder: 7.1,
    phase: 'every',
    ability:
      'Trong đêm, bạn được phép giết một người chơi khác (1 lần duy nhất).',
    script: 'Nữ Thợ Săn hãy thức dậy. Bạn muốn bắn chết ai? Có thể không chọn ai.',
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
  // {
  //   id: 'blacksmith',
  //   name: 'Thợ Rèn',
  //   nameEn: 'Blacksmith',
  //   team: 'village',
  //   value: 2,
  //   wakesAtNight: true,
  //   nightOrder: 11,
  //   phase: 'every',
  //   ability:
  //     'Một lần trong ván, rèn một thanh kiếm trao cho người khác; người nhận kiếm sẽ được gọi dậy để chỉ giết 1 người.',
  //   script:
  //     'Thợ Rèn hãy thức dậy. Bạn có muốn rèn kiếm và trao cho một người chơi khác không?',
  //   scriptClose: 'Thợ Rèn đã chọn xong. Hãy nhắm mắt và ngủ lại.',
  //   nightSubSteps: [
  //     {
  //       name: 'Người nhận kiếm',
  //       phase: 'every',
  //       optional: true,
  //       script:
  //         'Một thanh kiếm đã được rèn. Tôi vừa chạm vai một người — người đó hãy mở mắt và chỉ sang người muốn giết bằng kiếm.',
  //       scriptClose:
  //         'Kiếm đã hoàn thành nhiệm vụ và gãy vụn. Hãy nhắm mắt và ngủ lại.',
  //       moderatorNote: 'Chỉ thực hiện nếu Thợ Rèn chọn rèn kiếm. Chạm vai người được chọn nhận kiếm.',
  //     },
  //   ],
  // },
  // {
  //   id: 'insomniac',
  //   name: 'Kẻ Mất Ngủ',
  //   nameEn: 'Insomniac',
  //   team: 'village',
  //   value: 3,
  //   wakesAtNight: true,
  //   nightOrder: 16,
  //   phase: 'every',
  //   ability:
  //     'Cuối mỗi đêm, bạn biết được có ít nhất 1 trong 2 người ngồi cạnh mình đã hoạt động trong đêm hay không.',
  //   script:
  //     'Kẻ Mất Ngủ hãy thức dậy. Tôi sẽ cho bạn biết 1 trong 2 người cạnh bạn có hoạt động đêm nay hay không.',
  // },
  {
    id: 'mentalist',
    name: 'Nhà ngoại cảm',
    nameEn: 'Mentalist ',
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
    id: 'prince',
    name: 'Hoàng Tử',
    nameEn: 'Prince',
    team: 'village',
    value: 2,
    wakesAtNight: false,
    nightOrder: 999,
    phase: 'every',
    ability:
      'Nếu bạn bị bình chọn để giết buổi sáng, bạn tiết lộ thân phận và được sống tiếp.',
    script: '',
  },
  {
    id: 'tanner',
    name: 'Chán Đời',
    nameEn: 'Tanner',
    team: 'other',
    value: -2,
    wakesAtNight: false,
    nightOrder: 999,
    phase: 'every',
    ability: 'Bạn chỉ thắng khi bị giết trong buổi sáng.',
    script: '',
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
  }
]

export const ROLES = ROLES_DATA.map((role) => ({
  max: 1,
  recommended: false,
  ...role,
}))

export const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]))

const ROLE_IMAGE_IDS = new Set(
  Object.keys(import.meta.glob('../../public/roles/*.webp')).map((path) =>
    path.slice(path.lastIndexOf('/') + 1, -'.webp'.length),
  ),
)

export function getRoleImageSrc(id) {
  return ROLE_IMAGE_IDS.has(id) ? `/roles/${id}.webp` : null
}

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
