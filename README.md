# Quản Trò Ma Sói

Web app hỗ trợ quản trò game Ma Sói (Ultimate Werewolf): sắp ván, cân bằng điểm, chọn chủ đề đổi luật, đọc kịch bản gọi vai ban đêm và lưu lịch sử ván. Chạy hoàn toàn trên trình duyệt, không có backend.

## Tính năng

- **Thư viện vai**: 52 vai, lọc theo phe, tìm theo tên tiếng Việt, tên tiếng Anh hoặc tên tắt.
- **Sắp ván**: thêm/bớt vai, xem điểm cân bằng và số lá mỗi phe; gợi ý setup tự động cho 4–24 người.
- **Chủ đề ván**: 43 chủ đề đổi luật và cộng điểm cân bằng, có điều kiện vai bắt buộc; có nút random chủ đề hợp lệ.
- **Mã ván**: copy một mã ngắn (VD `8T6mF0Oe`, `1hrWDsXAm-3`) để chia sẻ setup kèm chủ đề, dán vào ô "Nhập mã" để tải lại.
- **Thứ tự gọi ban đêm**: kịch bản đọc to cho từng vai, ghi chú từng bước, ẩn các bước chỉ gọi đêm đầu, chọn ngẫu nhiên cặp đôi cho Thần Tình Yêu. Tải lại trang giữa ván không mất gì.
- **Hẹn giờ thảo luận** có chuông báo và giữ màn hình sáng.
- **Lịch sử ván**: lưu phe thắng, ghi chú, chủ đề; dùng lại setup cũ.
- **Google Sheet**: script sinh mã ván từ bảng ghi ván trên Google Sheet.

## Chạy dự án

Cần Node.js **22.12 trở lên**.

```bash
npm install
npm run dev          # chạy bản phát triển
npm test             # chạy test
npm run build        # build ra dist/
npm run preview      # build rồi phục vụ ở 0.0.0.0:9008
npm run gen:sheet    # sinh lại dữ liệu cho script Google Sheet
```

Domain được phép truy cập dev/preview server khai báo ở `allowedHosts` trong [vite.config.js](vite.config.js).

## Cấu trúc

```
src/
  App.jsx                 state chính: setup, chủ đề, đang chơi hay không
  styles.css              biến màu, bố cục và control dùng chung
  components/             mỗi component đi kèm file .css cùng tên
  data/                   dữ liệu + logic thuần, không phụ thuộc React
    roles.js              dữ liệu vai, ROLE_SLOTS (định dạng mã ván)
    themes.js             dữ liệu chủ đề, THEME_CODE_BY_ID
    roleCode.js           mã hoá / giải mã mã ván
    nightSteps.js         dựng danh sách bước gọi ban đêm
    suggestSetup.js       gợi ý setup theo số người
    balance.js            tính điểm, ngưỡng cân bằng
    matchHistory.js       lịch sử ván
    storage.js            đọc/ghi localStorage an toàn
    roleImages.js         tìm ảnh vai trong public/roles/
    *.test.js             test
  ui/                     dialog thay alert/confirm, format điểm, hook useStoredState
scripts/google-sheets/
  MaSoiCode.gs            Apps Script dán vào Google Sheet
  build.mjs               sinh phần dữ liệu trong MaSoiCode.gs
public/roles/<id>.webp    ảnh vai (vai chưa có ảnh thì hiện chấm màu phe)
```

`roles.js` và `themes.js` phải là dữ liệu thuần, không dùng API riêng của Vite, vì `build.mjs` đọc chúng bằng Node.

## Dữ liệu

### Vai trò — `ROLES_DATA` trong [src/data/roles.js](src/data/roles.js)

| Trường | Ý nghĩa |
|---|---|
| `id` | Khóa cố định, dùng trong mã ván, ghi chú, lịch sử. Không đổi sau khi đã dùng. |
| `name`, `nameEn` | Tên hiển thị tiếng Việt / tiếng Anh. |
| `aliases` | Tên gọi khác, VD tên cột trên Google Sheet (`['TN cứng']`). Chỉ cần ghi tên khác hẳn tên chính. |
| `team` | `village`, `werewolf`, `vampire` hoặc `other`. |
| `value` | Điểm cân bằng: dương lợi Dân làng, âm lợi Sói/Ma cà rồng. |
| `max` | Số lá tối đa trong một ván, mặc định 1. |
| `recommended` | Vai đề xuất cho ván cơ bản, xếp đầu thư viện. |
| `wakesAtNight` | Có được gọi dậy ban đêm không. |
| `nightOrder` | Thứ tự gọi, số nhỏ gọi trước (0 = nhận mặt đầu đêm 1, 3 = bầy Sói, 100 = cuối đêm). |
| `phase` | `every` mỗi đêm, `night1` chỉ đêm 1, `night2` chỉ đêm 2, `fromNight2` từ đêm 2. Bước không phải `every`/`fromNight2` có nút Ẩn. |
| `ability` | Mô tả năng lực trên thẻ vai. |
| `script` | Câu quản trò đọc to khi gọi. |
| `randomPair` | Bước gọi có nút chọn ngẫu nhiên 2 số người chơi. |

`NIGHT_EXTRAS` (cùng file) là các bước gọi không phải vai, chỉ xuất hiện khi có vai `requiresRole` và đủ `minPlayers`. VD bước Cặp đôi khi có Thần Tình Yêu.

### Chủ đề — `THEMES_DATA` trong [src/data/themes.js](src/data/themes.js)

| Trường | Ý nghĩa |
|---|---|
| `id`, `name`, `aliases` | Như vai trò. |
| `description` | Luật của chủ đề, quản trò đọc cho cả bàn. |
| `value` | Điểm cộng vào điểm cân bằng của ván. |
| `favors` | Phe được lợi (để tô màu). |
| `requires` | Điều kiện bắt buộc, phải thỏa hết: `{ roles: ['witch'], min: 1, label }` (tổng số lá các vai trong danh sách) hoặc `{ team: 'vampire', min: 1, label }` (tổng số lá của phe). |
| `nightSteps` | Bước gọi ban đêm thêm vào: `{ id, nightOrder, phase, name, script, moderatorNote }`. `id` không được trùng id chủ đề nào. |

Mã 1 ký tự của mỗi chủ đề nằm ở `THEME_CODE_BY_ID` cùng file.

## Quy trình thường gặp

Sau mỗi lần sửa dữ liệu, chạy `npm test`. Test báo đỏ là có lỗi thật: id gõ sai, thiếu slot mã ván, quên sinh lại sheet…

**Thêm vai**
1. Thêm vào `ROLES_DATA`, đặt ở đâu cũng được. Tên cột trên sheet khác tên vai thì thêm `aliases`.
2. Chèn `['<id>', <max>]` vào **ĐẦU** `ROLE_SLOTS`. Không bao giờ thêm vào cuối hay chèn giữa (xem [Mã ván](#mã-ván)).
3. Có ảnh thì thêm `public/roles/<id>.webp`, app tự nhận.
4. `npm run gen:sheet`, `npm test`, rồi dán lại `MaSoiCode.gs` vào Apps Script.

**Bỏ vai**: xoá khỏi `ROLES_DATA` nhưng **giữ nguyên** dòng trong `ROLE_SLOTS`. Mã cũ có vai đó vẫn giải được, phần vai đã bỏ bị lược đi.

**Đổi số lá tối đa**: sửa `max` trong `ROLES_DATA`. Không sửa sức chứa trong `ROLE_SLOTS`.

**Thêm chủ đề**
1. Thêm vào `THEMES_DATA`.
2. Gán một ký tự **chưa từng dùng** trong `THEME_CODE_BY_ID` (`0-9`, `A-Z`, `a-z`; ký tự tiếp theo hiện là `h`).
3. `npm run gen:sheet`, `npm test`, dán lại script vào Apps Script.

**Bỏ chủ đề**: xoá khỏi `THEMES_DATA` nhưng giữ dòng trong `THEME_CODE_BY_ID` để ký tự đó không bị dùng lại.

## Mã ván

Dạng `<mã vai>` hoặc `<mã vai>-<mã chủ đề>`.

- **Mã vai**: số lượng từng vai ghép thành một số lớn theo thứ tự `ROLE_SLOTS` (mỗi vai là một chữ số, cơ số = sức chứa + 1), rồi viết ở hệ base62. Vai đầu bảng là hàng cao nhất, vai cuối bảng là hàng đơn vị.
- **Mã chủ đề**: 1 ký tự cố định theo `THEME_CODE_BY_ID`.

Vì vậy vị trí trong `ROLE_SLOTS` là một phần của định dạng:
- Chèn vai mới vào **đầu** bảng chỉ thêm một chữ số 0 ở hàng cao nhất, mọi mã cũ giữ nguyên giá trị.
- Thêm vào cuối, chèn giữa, xoá dòng, đổi thứ tự hay đổi sức chứa đều làm mã cũ giải ra setup khác **mà không báo lỗi**.

[roleCode.test.js](src/data/roleCode.test.js) giữ vài mã đã chia sẻ và setup đúng của chúng. Test này đỏ nghĩa là `ROLE_SLOTS` hoặc `THEME_CODE_BY_ID` vừa bị sửa sai cách. Hãy sửa dữ liệu, đừng sửa test.

> Mã tạo trước ngày 03/09/2026 có thể giải ra sai setup: hôm đó 4 vai mới bị thêm vào cuối `ROLE_SLOTS`.

## Google Sheet

[MaSoiCode.gs](scripts/google-sheets/MaSoiCode.gs) sinh mã ván từ một dòng trong bảng ghi ván.

- **Cài đặt**: Google Sheet → Tiện ích mở rộng → Apps Script → dán toàn bộ file → Lưu → tải lại sheet.
- **Dùng**: bấm vào một ô trên dòng ván → menu **Ma Sói → Copy mã ván**. Có thể gán hàm `copyMaVan` cho một nút vẽ trên sheet.
- **Bảng tính**: dòng 1 là tiêu đề. Cột trùng tên vai chứa số lượng vai đó; tên so khớp không phân biệt hoa thường và dấu, nhận tên tiếng Việt, tiếng Anh, `aliases` hoặc id. Cột `Chủ đề` chứa tên chủ đề. Cột `Số Người` (không bắt buộc) dùng để cảnh báo khi tổng số lá không khớp.

Phần `ROLE_SLOTS`/`THEMES` giữa hai dòng `>>> / <<< DỮ LIỆU SINH TỰ ĐỘNG` do `npm run gen:sheet` sinh ra, đừng sửa tay. Sinh lại xong phải dán lại cả file vào Apps Script thì sheet mới cập nhật.

Cột có tên không khớp vai nào sẽ bị bỏ qua. Nếu thấy cảnh báo lệch "Số Người", hãy kiểm tra tên cột hoặc thêm `aliases`.

## Lưu trữ

Mọi dữ liệu nằm trong `localStorage` của trình duyệt đang dùng. Xoá dữ liệu trình duyệt là mất lịch sử; đổi máy hay đổi trình duyệt thì không thấy dữ liệu cũ.

| Key | Nội dung |
|---|---|
| `masoi.setup` | Setup đang sắp: `{ id vai: số lượng }` |
| `masoi.theme` | Chủ đề đang chọn |
| `masoi.startedAt` | Thời điểm bắt đầu ván đang chơi (không có = đang sắp ván) |
| `masoi.nightNotes` | Ghi chú các bước gọi đêm, theo khóa `role:<id>`, `extra:<id>`, `theme:<id>` |
| `masoi.nightHidden` | Các bước đang ẩn |
| `masoi.matches` | Lịch sử ván |

## Cân bằng và thiết kế chủ đề

- Tổng điểm vai cộng điểm chủ đề trong khoảng **±3** là cân bằng (`BALANCED_RANGE` trong [balance.js](src/data/balance.js)). Nhóm mới nên để +1 đến +3, nhóm đã quen để −1 đến −3.
- **Phe Sói luôn ≤ 1/3 số người chơi.** Gợi ý setup tuân theo quy tắc này. Định giá chủ đề nên tính trên ván mẫu 12 người / 4 sói. Vì Sói chỉ cắn 1 người/đêm còn lượt treo cổ của làng co giãn, mọi chủ đề cho làng thêm lượt treo cổ hoặc thêm nguồn thông tin xác nhận đều mạnh hơn vẻ ngoài.
- **Sói ngồi trong làng và nghe hết mọi thảo luận công khai.** Cơ chế công khai chỉ có giá trị khi nó chặn cứng một mục tiêu (VD Đèn Canh Đêm, Mùa Tỏi), không có giá trị nếu cần làng đoán trúng người Sói định cắn. Cơ chế cần "cả làng đồng thuận" thì Sói có quyền phủ quyết.
- **Quản trò gọi đủ mọi vai mỗi đêm, kể cả vai đã chết**, để làng không suy ra ai còn sống. Giới hạn "một lần trong ván" không giảm việc cho quản trò. Tránh bắt cả bầy Sói thống nhất thêm quyết định trong bóng tối; thay vào đó giao quyền cho một người (VD Sói Trưởng), mã hoá lựa chọn vào chính mục tiêu đã chỉ, hoặc cho hiệu ứng tự động.

## Test

`npm test` chạy [vitest](https://vitest.dev) trên:
- toàn vẹn dữ liệu vai/chủ đề,
- mã ván (mã cố định + mã hoá/giải mã ngẫu nhiên),
- gợi ý setup cho mọi số người 4–24,
- các bước gọi đêm,
- localStorage,
- script Google Sheet: đã sinh lại mới nhất chưa, và có sinh ra đúng mã như app không.
