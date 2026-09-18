/**
 * DỮ LIỆU MẪU - HỆ THỐNG QUẢN TRỊ HỌC TẬP TIN HỌC 10
 * Giáo viên bộ môn: Cô Phạm Thị Thủy - Trường THPT Vĩnh Cửu
 * 
 * Lưu ý: Dữ liệu dưới đây là dữ liệu mẫu để thử nghiệm tính năng của web app.
 * Giáo viên có thể chỉnh sửa trực tiếp thông qua khu vực "Quản trị giáo viên"
 * hoặc cập nhật nội dung chính thức của chương trình Tin học 10 tại file này.
 */

import { Lesson, Task, Quiz, Announcement, StudentProfile, StudentProgressSample } from '../types';

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Nguyễn Văn An',
  className: '10A1',
  school: 'Trường THPT Vĩnh Cửu',
  teacher: 'Cô Phạm Thị Thủy',
  avatarIcon: 'GraduationCap',
};

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    topic: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài 1: Thông tin và xử lý thông tin',
    duration: '2 tiết',
    description: 'Khái niệm thông tin, dữ liệu và quá trình xử lý thông tin trong máy tính điện tử.',
    status: 'completed',
    progressPercent: 100,
    objectives: [
      'Phân biệt được thông tin và dữ liệu.',
      'Hiểu và mô tả được các bước trong quy trình xử lý thông tin.',
      'Nhận biết vai trò quan trọng của thông tin và tin học trong đời sống hiện đại.',
    ],
    contentSummary: 'Dữ liệu là các con số, văn bản, hình ảnh, âm thanh thu nhận được từ thế giới khách quan. Thông tin là ý nghĩa của dữ liệu đối với người tiếp nhận. Máy tính xử lý dữ liệu qua 3 khâu chính: Thu nhận (Input) -> Xử lý (Processing) -> Xuất kết quả (Output) và Lưu trữ.',
    teacherNotes: 'Các em chú ý lấy ví dụ thực tế về sự khác nhau giữa dữ liệu và thông tin trong cuộc sống hàng ngày. Đừng quên nộp bài tập thực hành 1 trước thứ 5.',
    resources: [
      { name: 'Tài liệu tóm tắt bài 1 (Cô Thủy biên soạn)', type: 'doc', url: '#' },
      { name: 'Slide bài giảng Thông tin và xử lý thông tin', type: 'slides', url: '#' }
    ]
  },
  {
    id: 'lesson-2',
    topic: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài 2: Hệ nhị phân và biểu diễn dữ liệu trong máy tính',
    duration: '2 tiết',
    description: 'Hệ đếm nhị phân (Binary), các đơn vị đo dung lượng thông tin (Bit, Byte, KB, MB, GB).',
    status: 'in_progress',
    progressPercent: 65,
    objectives: [
      'Hiểu vì sao máy tính sử dụng hệ nhị phân (chỉ gồm 0 và 1).',
      'Biết cách chuyển đổi số thập phân sang số nhị phân đơn giản và ngược lại.',
      'Ghi nhớ các đơn vị đo lượng thông tin cơ bản: Byte, KB, MB, GB, TB.',
    ],
    contentSummary: 'Máy tính biểu diễn mọi loại dữ liệu (số, chữ viết, hình ảnh, âm thanh) dưới dạng dãy bit 0 và 1 nhờ các mạch điện tử có hai trạng thái đóng/ngắt. 1 Byte = 8 Bit; 1 KB = 1024 Byte; 1 MB = 1024 KB; 1 GB = 1024 MB.',
    teacherNotes: 'Nội dung quy đổi đơn vị đo dung lượng rất hay xuất hiện trong bài kiểm tra định kỳ. Các em luyện tập kỹ phần đổi số nhị phân nhé!',
    resources: [
      { name: 'Bảng tra cứu đơn vị đo dung lượng bộ nhớ', type: 'doc', url: '#' },
      { name: 'Bài tập rèn luyện đổi hệ nhị phân', type: 'doc', url: '#' }
    ]
  },
  {
    id: 'lesson-3',
    topic: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 3: Mạng máy tính và các dịch vụ Internet',
    duration: '2 tiết',
    description: 'Khái niệm mạng máy tính, mạng LAN, WAN, Internet và các dịch vụ đám mây phổ biến.',
    status: 'in_progress',
    progressPercent: 30,
    objectives: [
      'Nêu được khái niệm và các thành phần cơ bản của một mạng máy tính.',
      'Phân biệt mạng cục bộ (LAN) và mạng diện rộng (WAN/Internet).',
      'Liệt kê được các dịch vụ thông dụng trên Internet và ưu điểm của điện toán đám mây.',
    ],
    contentSummary: 'Mạng máy tính là tập hợp các máy tính được kết nối với nhau để truyền thông tin và chia sẻ tài nguyên. Các thiết bị mạng cơ bản gồm: Cáp mạng, Switch, Router, Modem, Điểm truy cập không dây (Access Point).',
    teacherNotes: 'Tiết học tới lớp mình sẽ thực hành quan sát hệ thống phòng máy tính trường THPT Vĩnh Cửu để nhận biết thiết bị Switch và Modem thật.',
    resources: [
      { name: 'Sơ đồ mạng LAN phòng thực hành Tin học', type: 'slides', url: '#' }
    ]
  },
  {
    id: 'lesson-4',
    topic: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa số',
    title: 'Bài 4: Bản quyền và an toàn thông tin trên mạng',
    duration: '1 tiết',
    description: 'Quy tắc ứng xử trên không gian mạng, sở hữu trí tuệ và biện pháp bảo vệ dữ liệu cá nhân.',
    status: 'not_started',
    progressPercent: 0,
    objectives: [
      'Nhận biết các hành vi vi phạm bản quyền phần mềm và dữ liệu số.',
      'Hiểu tầm quan trọng của việc bảo vệ mật khẩu và thông tin cá nhân.',
      'Thực hiện quy tắc ứng xử văn minh, lịch sự khi giao tiếp trên môi trường số.',
    ],
    contentSummary: 'Sử dụng phần mềm có bản quyền thể hiện sự tôn trọng pháp luật và sở hữu trí tuệ. Cần cảnh giác trước các thủ đoạn lừa đảo qua mạng (phishing), không bấm vào liên kết lạ và luôn đặt mật khẩu mạnh có cả chữ hoa, số và ký tự đặc biệt.',
    teacherNotes: 'Mỗi học sinh cần chuẩn bị 1 tình huống thực tế về an toàn mạng để thảo luận nhóm trong buổi học tới.',
    resources: [
      { name: 'Cẩm nang An toàn số dành cho học sinh THPT', type: 'doc', url: '#' }
    ]
  },
  {
    id: 'lesson-5',
    topic: 'Chủ đề 5: Lập trình cơ bản với Python',
    title: 'Bài 5: Làm quen với ngôn ngữ lập trình Python',
    duration: '3 tiết',
    description: 'Giới thiệu môi trường lập trình Python, cú pháp cơ bản, biến và hàm print(), input().',
    status: 'not_started',
    progressPercent: 0,
    objectives: [
      'Cài đặt và làm quen với môi trường viết code Python (IDLE hoặc VS Code).',
      'Sử dụng thành thạo lệnh xuất dữ liệu print() và lệnh nhập dữ liệu input().',
      'Hiểu khái niệm biến (variable) và các quy tắc đặt tên biến trong Python.',
    ],
    contentSummary: 'Python là ngôn ngữ lập trình bậc cao, cú pháp đơn giản, dễ học và rất mạnh mẽ. Lệnh print("Xin chào!") xuất văn bản ra màn hình. Lệnh x = input() cho phép người dùng nhập dữ liệu từ bàn phím. Tên biến không được bắt đầu bằng chữ số và không trùng từ khóa.',
    teacherNotes: 'Chủ đề lập trình Python rất thú vị và chiếm tỷ trọng lớn trong kỳ thi! Các em chuẩn bị máy tính ở nhà hoặc tận dụng giờ thực hành trên lớp để gõ lệnh trực tiếp nhé.',
    resources: [
      { name: 'Hướng dẫn cài đặt Python 3.x trên máy tính', type: 'doc', url: '#' },
      { name: 'File code Python mẫu các bài tập cơ bản', type: 'doc', url: '#' }
    ]
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Nhiệm vụ 1: Lập bảng so sánh thông tin và dữ liệu',
    content: 'Hãy nêu 3 ví dụ thực tế trong đời sống học sinh THPT Vĩnh Cửu để chỉ ra sự khác biệt giữa dữ liệu thô và thông tin có ý nghĩa.',
    dueDate: '2026-09-22',
    priority: 'high',
    status: 'completed',
    lessonId: 'lesson-1',
    submission: 'Dữ liệu: Điểm kiểm tra 8, 9, 7 của học sinh. Thông tin: Điểm trung bình môn Tin học là 8.0 - Đạt học lực Giỏi.',
    submittedAt: '2026-09-17 19:30'
  },
  {
    id: 'task-2',
    title: 'Nhiệm vụ 2: Luyện tập chuyển đổi hệ nhị phân sang thập phân',
    content: 'Hoàn thành các phép tính: Đổi dãy nhị phân 1011_2 và 1110_2 sang hệ thập phân; tính xem 1 USB dung lượng 16GB chứa được tương đương bao nhiêu bài hát dung lượng 4MB.',
    dueDate: '2026-09-25',
    priority: 'high',
    status: 'in_progress',
    lessonId: 'lesson-2'
  },
  {
    id: 'task-3',
    title: 'Nhiệm vụ 3: Tìm hiểu các thiết bị mạng trong phòng Tin học',
    content: 'Quan sát phòng thực hành Tin học trường THPT Vĩnh Cửu và ghi lại tên các thiết bị mạng mà em nhìn thấy (Router, Switch, Cáp mạng, v.v.).',
    dueDate: '2026-09-30',
    priority: 'medium',
    status: 'not_started',
    lessonId: 'lesson-3'
  },
  {
    id: 'task-4',
    title: 'Nhiệm vụ 4: Viết đoạn văn ngắn về văn hóa ứng xử trên mạng xã hội',
    content: 'Trình bày 5 quy tắc ứng xử văn minh khi tham gia nhóm lớp trên mạng xã hội (Facebook, Zalo) để xây dựng không gian học tập an toàn.',
    dueDate: '2026-10-05',
    priority: 'low',
    status: 'not_started',
    lessonId: 'lesson-4'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-1',
    lessonId: 'lesson-1',
    topicTitle: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài kiểm tra trắc nghiệm: Thông tin và Dữ liệu',
    description: 'Kiểm tra mức độ nắm vững kiến thức bài 1: khái niệm thông tin, dữ liệu và quy trình xử lý thông tin.',
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'q1-1',
        question: 'Phát biểu nào sau đây là chính xác nhất về khái niệm "Thông tin"?',
        options: [
          'A. Thông tin là những con số được lưu trữ trong ổ cứng máy tính.',
          'B. Thông tin là sự hiểu biết của con người về thế giới xung quanh sau khi tiếp nhận và xử lý dữ liệu.',
          'C. Thông tin và dữ liệu hoàn toàn giống nhau, không có sự phân biệt.',
          'D. Thông tin là các thiết bị phần cứng của máy tính như màn hình, chuột.'
        ],
        correctAnswer: 1,
        explanation: 'Thông tin là ý nghĩa, hiểu biết thu được từ dữ liệu sau quá trình phân tích và xử lý.'
      },
      {
        id: 'q1-2',
        question: 'Quy trình xử lý thông tin trong máy tính diễn ra theo trình tự nào sau đây?',
        options: [
          'A. Thu nhận dữ liệu -> Lưu trữ và xử lý -> Xuất thông tin kết quả',
          'B. Xuất kết quả -> Xử lý dữ liệu -> Thu nhận',
          'C. Lưu trữ -> Xuất kết quả -> Thu nhận',
          'D. Xử lý dữ liệu -> Thu nhận -> Không cần xuất'
        ],
        correctAnswer: 0,
        explanation: 'Quy trình chuẩn gồm 3 bước cơ bản: Nhập dữ liệu (Input) -> Xử lý (Processing) -> Xuất kết quả (Output), kết hợp cùng lưu trữ.'
      },
      {
        id: 'q1-3',
        question: 'Thiết bị nào sau đây đóng vai trò THU NHẬN (Input) dữ liệu vào máy tính?',
        options: [
          'A. Máy in phun màu',
          'B. Màn hình máy tính',
          'C. Bàn phím và chuột máy tính',
          'D. Loa âm thanh'
        ],
        correctAnswer: 2,
        explanation: 'Bàn phím, chuột, micro, máy quét (scanner) là các thiết bị vào (Input) dùng để thu nhận dữ liệu.'
      },
      {
        id: 'q1-4',
        question: 'Đơn vị nhỏ nhất dùng để đo lượng thông tin trong máy tính là gì?',
        options: [
          'A. Byte',
          'B. Bit (0 hoặc 1)',
          'C. Kilobyte (KB)',
          'D. Megabyte (MB)'
        ],
        correctAnswer: 1,
        explanation: 'Bit (Binary digit) là đơn vị cơ bản và nhỏ nhất đo lượng thông tin, chỉ nhận một trong hai giá trị là 0 hoặc 1.'
      }
    ]
  },
  {
    id: 'quiz-2',
    lessonId: 'lesson-2',
    topicTitle: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài kiểm tra trắc nghiệm: Hệ nhị phân và Đo lường dữ liệu',
    description: 'Luyện tập chuyển đổi hệ đếm và tính toán đơn vị đo dung lượng bộ nhớ.',
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'q2-1',
        question: '1 Byte (B) bằng bao nhiêu Bit?',
        options: [
          'A. 2 Bit',
          'B. 4 Bit',
          'C. 8 Bit',
          'D. 16 Bit'
        ],
        correctAnswer: 2,
        explanation: 'Theo chuẩn quốc tế, 1 Byte được cấu tạo từ đúng 8 bit nhị phân liên tiếp.'
      },
      {
        id: 'q2-2',
        question: 'Dãy số nhị phân 101 (trong hệ đếm cơ số 2) khi đổi sang hệ thập phân có giá trị là bao nhiêu?',
        options: [
          'A. 3',
          'B. 5',
          'C. 7',
          'D. 9'
        ],
        correctAnswer: 1,
        explanation: '101_2 = 1*2^2 + 0*2^1 + 1*2^0 = 4 + 0 + 1 = 5 trong hệ thập phân.'
      },
      {
        id: 'q2-3',
        question: '1 Gigabyte (GB) tương đương với bao nhiêu Megabyte (MB)?',
        options: [
          'A. 100 MB',
          'B. 512 MB',
          'C. 1000 MB',
          'D. 1024 MB'
        ],
        correctAnswer: 3,
        explanation: 'Trong hệ thống đo lường máy tính nhị phân, 1 GB = 2^10 MB = 1024 MB.'
      },
      {
        id: 'q2-4',
        question: 'Vì sao máy tính điện tử lại sử dụng hệ nhị phân (chỉ gồm số 0 và 1)?',
        options: [
          'A. Vì các linh kiện điện tử chỉ có hai trạng thái vật lý ổn định (có điện/ngắt điện, đóng/mở mạch).',
          'B. Vì máy tính không thể đếm được các số từ 2 đến 9.',
          'C. Vì người phát minh ra máy tính thích hai con số này.',
          'D. Vì hệ nhị phân chiếm nhiều bộ nhớ hơn hệ thập phân.'
        ],
        correctAnswer: 0,
        explanation: 'Hệ nhị phân tương thích hoàn hảo với nguyên lý vật lý của bóng bán dẫn và mạch tích hợp (chỉ gồm hai trạng thái có/không dòng điện).'
      }
    ]
  },
  {
    id: 'quiz-3',
    lessonId: 'lesson-5',
    topicTitle: 'Chủ đề 5: Lập trình cơ bản với Python',
    title: 'Bài kiểm tra trắc nghiệm: Cú pháp Python cơ bản',
    description: 'Kiểm tra kiến thức mở đầu về ngôn ngữ lập trình Python, hàm print và đặt tên biến.',
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'q3-1',
        question: 'Để in dòng chữ "THPT Vĩnh Cửu" ra màn hình trong Python, câu lệnh nào sau đây đúng cú pháp?',
        options: [
          'A. echo("THPT Vĩnh Cửu")',
          'B. print("THPT Vĩnh Cửu")',
          'C. System.out.println("THPT Vĩnh Cửu")',
          'D. write("THPT Vĩnh Cửu")'
        ],
        correctAnswer: 1,
        explanation: 'Trong Python, hàm print(...) được dùng để xuất dữ liệu hoặc văn bản ra màn hình console.'
      },
      {
        id: 'q3-2',
        question: 'Tên biến nào sau đây là HỢP LỆ trong ngôn ngữ lập trình Python?',
        options: [
          'A. 10A1_hocsinh (bắt đầu bằng chữ số)',
          'B. diem-tin-hoc (chứa dấu gạch nối trừ)',
          'C. diem_tin_hoc_10 (chứa chữ cái, dấu gạch dưới và số)',
          'D. class (trùng với từ khóa của Python)'
        ],
        correctAnswer: 2,
        explanation: 'Quy tắc đặt tên biến trong Python: chỉ gồm chữ cái, chữ số và dấu gạch dưới (_); không bắt đầu bằng số và không trùng từ khóa.'
      },
      {
        id: 'q3-3',
        question: 'Kết quả của đoạn lệnh Python sau là gì: a = 10; b = 5; print(a + b * 2)',
        options: [
          'A. 30',
          'B. 20',
          'C. 25',
          'D. 15'
        ],
        correctAnswer: 1,
        explanation: 'Theo thứ tự ưu tiên toán học, phép nhân được thực hiện trước: b * 2 = 5 * 2 = 10, sau đó lấy a + 10 = 10 + 10 = 20.'
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Chào mừng các em học sinh lớp 10 năm học mới tại THPT Vĩnh Cửu!',
    content: 'Chào các em! Cô Phạm Thị Thủy gửi lời chào thân ái đến toàn thể học sinh lớp 10. Hệ thống quản trị học tập này sẽ đồng hành cùng các em trong suốt môn Tin học 10. Hãy theo dõi các bài học và nhiệm vụ hàng tuần nhé!',
    date: '2026-09-15',
    type: 'reminder',
    isPinned: true
  },
  {
    id: 'ann-2',
    title: 'Nhắc hạn hoàn thành Nhiệm vụ 1 & Làm bài trắc nghiệm bài 1',
    content: 'Các bạn lớp 10A1, 10A2 chú ý hoàn thành nhiệm vụ so sánh Thông tin & Dữ liệu trước 22h00 ngày 22/09. Sau khi xem bài giảng, các em nhớ làm bài trắc nghiệm để củng cố điểm số.',
    date: '2026-09-17',
    type: 'task',
    isPinned: true
  },
  {
    id: 'ann-3',
    title: 'Đã mở nội dung Bài 2: Hệ nhị phân và biểu diễn dữ liệu',
    content: 'Bài học số 2 đã được cập nhật tóm tắt lý thuyết và câu hỏi trắc nghiệm rèn luyện. Các em có thể vào mục "Bài học" để xem ngay.',
    date: '2026-09-16',
    type: 'lesson',
    isPinned: false
  },
  {
    id: 'ann-4',
    title: 'Khen ngợi các bạn đạt điểm 10 trắc nghiệm bài đầu tiên',
    content: 'Cô Thủy biểu dương tinh thần tự giác học tập của các em đã hoàn thành sớm bài trắc nghiệm bài 1 với kết quả rất cao. Tiếp tục phát huy nhé các em!',
    date: '2026-09-18',
    type: 'result',
    isPinned: false
  }
];

export const INITIAL_CLASS_SAMPLES: StudentProgressSample[] = [
  { id: 'st-1', name: 'Nguyễn Văn An', className: '10A1', completedLessonsCount: 1, completedTasksCount: 1, quizAverage: 9.5, lastActive: 'Hôm nay' },
  { id: 'st-2', name: 'Trần Thị Mai', className: '10A1', completedLessonsCount: 2, completedTasksCount: 2, quizAverage: 10.0, lastActive: 'Hôm qua' },
  { id: 'st-3', name: 'Lê Hoàng Nam', className: '10A1', completedLessonsCount: 1, completedTasksCount: 0, quizAverage: 8.0, lastActive: '2 ngày trước' },
  { id: 'st-4', name: 'Phạm Minh Quân', className: '10A1', completedLessonsCount: 2, completedTasksCount: 1, quizAverage: 9.0, lastActive: 'Hôm nay' },
  { id: 'st-5', name: 'Đỗ Thảo Vy', className: '10A1', completedLessonsCount: 2, completedTasksCount: 2, quizAverage: 9.8, lastActive: 'Hôm nay' },
  { id: 'st-6', name: 'Bùi Gia Huy', className: '10A2', completedLessonsCount: 1, completedTasksCount: 1, quizAverage: 7.5, lastActive: '3 ngày trước' },
  { id: 'st-7', name: 'Vũ Ngọc Ánh', className: '10A2', completedLessonsCount: 2, completedTasksCount: 2, quizAverage: 9.2, lastActive: 'Hôm qua' },
  { id: 'st-8', name: 'Hoàng Quốc Bảo', className: '10A2', completedLessonsCount: 0, completedTasksCount: 0, quizAverage: 0, lastActive: 'Chưa tham gia' },
];
