const questions = [
  {
    id: 1,
    topic: "Guided Learning",
    topic_en: "Guided Learning",
    question_vi:
      "Phát biểu nào sau đây mô tả đúng nhất về Học Tập Có Hướng Dẫn (Guided Learning) trong Gemini?",
    question_en:
      "Which of these statements best describes Guided Learning in Gemini?",
    answer_vi:
      "Guided Learning cho phép bạn tìm hiểu sâu hơn về một chủ đề, sử dụng các câu hỏi mở để tạo ra một cuộc thảo luận học tập.",
    answer_en:
      "Guided Learning allows you to dive deeper into a topic, using open-ended questions to create a learning discussion.",
  },
  {
    id: 2,
    topic: "NotebookLM",
    topic_en: "NotebookLM",
    question_vi:
      "Công cụ Khám phá (Discover Tool) trong NotebookLM sẽ tìm kiếm các nguồn dữ liệu bổ sung cho sổ ghi chép (notebook) của bạn.",
    question_en:
      "The Discover Tool in NotebookLM will find additional data sources for your notebook.",
    answer_vi: "Đúng (True)",
    answer_en: "True",
  },
  {
    id: 3,
    topic: "Gemini Interface",
    topic_en: "Gemini Interface",
    question_vi:
      "Những mục nào sau đây có thể được truy cập trong menu bên (side menu) của Gemini? (Chọn tất cả)",
    question_en:
      "Which of the following can be accessed in the side menu of Gemini? (Select all)",
    answer_vi: "Các mục chính xác là: Recent Chats, Gems, New Chat.",
    answer_en: "The correct items are: Recent Chats, Gems, New Chat.",
  },
  {
    id: 4,
    topic: "Canvas",
    topic_en: "Canvas",
    question_vi:
      "Những điều nào sau đây có thể được hoàn thành với Canvas trong Gemini? (Chọn tất cả)",
    question_en:
      "Which of the following can be completed with Canvas in Gemini? (Select all)",
    answer_vi:
      "Tạo đồ họa thông tin tương tác (Create interactive infographics), Tạo các câu đố tùy chỉnh (Create custom quizzes).",
    answer_en: "Create interactive infographics, Create custom quizzes.",
  },
  {
    id: 5,
    topic: "NotebookLM",
    topic_en: "NotebookLM",
    question_vi:
      "Công cụ nào để giáo viên tạo bản đồ tư duy (mind map) từ tài liệu có sẵn?",
    question_en:
      "Which tool could a teacher use to create a mind map from existing resources?",
    answer_vi: "NotebookLM",
    answer_en: "NotebookLM",
  },
  {
    id: 6,
    topic: "AI Safety",
    topic_en: "AI Safety",
    question_vi:
      "Hệ thống AI cho kết quả định kiến do dữ liệu huấn luyện được gọi là gì?",
    question_en:
      "When an AI system shows a tendency to produce results that are systematically prejudiced due to the data it was trained on, this is known as:",
    answer_vi: "Bias (Định kiến)",
    answer_en: "Bias",
  },
  {
    id: 7,
    topic: "NotebookLM Data",
    topic_en: "NotebookLM Data",
    question_vi:
      "Nguồn dữ liệu nào có thể dùng trong NotebookLM? (Chọn tất cả)",
    question_en:
      "Which of the following data sources can be used in NotebookLM? (Select all which apply)",
    answer_vi: "Google Docs, Copied Text.",
    answer_en: "Google Docs, Copied Text.",
  },
  {
    id: 8,
    topic: "Workspace AI",
    topic_en: "Workspace AI",
    question_vi:
      "AI Pro trong Gmail cho phép tạo phản hồi không cần rời Gmail.",
    question_en:
      "An educator is using Gmail with Google AI Pro for Education, which allows them to generate responses to emails without leaving Gmail.",
    answer_vi: "Đúng (True)",
    answer_en: "True",
  },
  {
    id: 9,
    topic: "Interactive Activity",
    topic_en: "Interactive Activity",
    question_vi:
      "Prompt nào tốt nhất để tạo hoạt động tương tác giúp học sinh hiểu khối lượng riêng (density)?",
    question_en:
      "Which of the following approaches would be the best to create an interactive activity to help their students understand density?",
    answer_vi:
      "Yêu cầu Gemini tạo một ứng dụng nền web bằng Canvas cho phép học sinh điều chỉnh khối lượng và thể tích của vật thể và xem khối lượng riêng của nó thay đổi.",
    answer_en:
      "Ask Gemini to create a web-based application with Canvas that allows students to adjust the mass and volume of an object and see how its density changes, and whether it floats or sinks in a liquid.",
  },
  {
    id: 10,
    topic: "Image Analysis",
    topic_en: "Image Analysis",
    question_vi:
      "Sắp xếp các bước hỗ trợ học sinh gặp khó khăn trong hóa học (Chụp ảnh bài làm, Tải ảnh lên, Xác định lỗi, Gợi ý bài mới).",
    question_en:
      "Arrange the tasks in order to provide a solution to support a student struggling with a complex concept in chemistry.",
    answer_vi:
      "1. Chụp ảnh bài làm -> 2. Tải ảnh lên Gemini -> 3. Xác định các quan niệm sai lầm -> 4. Gợi ý các bài toán mới.",
    answer_en:
      "1. Take an image of the students work -> 2. Upload the image to Gemini -> 3. Ask Gemini to identify the common mis-conceptions -> 4. Ask Gemini to suggest new problems for them to solve.",
  },
  {
    id: 11,
    topic: "Prompting",
    topic_en: "Prompting",
    question_vi:
      "Prompt Gemini nào phù hợp nhất cho mục tiêu phát triển chuyên môn về phân hóa (differentiation)?",
    question_en:
      "Which of these Gemini prompts would be most appropriate for professional development goals regarding differentiation?",
    answer_vi:
      "Tôi là một giáo viên trung học cơ sở có kinh nghiệm, hãy giúp tôi lập danh sách các chiến lược để hỗ trợ tôi đáp ứng nhu cầu của tất cả học sinh trong lớp học có trình độ đa dạng của mình.",
    answer_en:
      "I am an experienced middle school teacher, help me create a list of strategies to help support me to meet the needs of all of my students in my mixed ability classroom.",
  },
  {
    id: 12,
    topic: "AI Ethics",
    topic_en: "AI Ethics",
    question_vi:
      "Hành động nào để giải quyết lo ngại về đạo văn khi dùng AI tạo dàn ý?",
    question_en:
      "What actions could a teacher take to deal with the concern of plagiarism when using AI tools for generating essay outlines?",
    answer_vi:
      "Thực hiện các hướng dẫn rõ ràng về sử dụng AI, nhấn mạnh liêm chính học thuật, và dạy học sinh cách trích dẫn hoặc sử dụng AI làm điểm khởi đầu cho tác phẩm gốc.",
    answer_en:
      "Implement clear classroom guidelines for AI use, emphasize academic integrity, and teach students how to appropriately cite AI tools or use them as a starting point for their own original work.",
  },
  {
    id: 13,
    topic: "Gemini Tools",
    topic_en: "Gemini Tools",
    question_vi: "Công cụ nào có sẵn trong Gemini? (Chọn tất cả)",
    question_en:
      "Which of the following tools are available in Gemini? (Select All Correct Responses)",
    answer_vi:
      "Image - Create with Imagen, Canvas - Create Docs and Apps, Guided Learning - Learn and Understand Topics.",
    answer_en:
      "Image - Create with Imagen, Canvas - Create Docs and Apps, Guided Learning - Learn and Understand Topics.",
  },
  {
    id: 14,
    topic: "Workspace AI",
    topic_en: "Workspace AI",
    question_vi: "Phương pháp nào để tạo video từ Slides bằng AI Pro?",
    question_en:
      "Which of the following methods could be used to create a new video based on slides using Google AI Pro for Education?",
    answer_vi:
      "Khi các slide đang mở, yêu cầu Gemini trong thanh slide (slide bar) tạo một Google Vid.",
    answer_en:
      "With the slides open, ask Gemini in the slide bar to create a Google Vid",
  },
  {
    id: 15,
    topic: "Prompting",
    topic_en: "Prompting",
    question_vi:
      "Cách tiếp cận nào dùng Gemini hợp lý hóa việc soạn thảo mô tả công việc (job description)?",
    question_en:
      "Which approach using Gemini is most likely to streamline the administrative task of drafting a job description for a new teaching position?",
    answer_vi:
      "Nhập prompt vào Gemini, đóng vai chuyên gia HR Giáo dục, yêu cầu mô tả công việc bao gồm kỹ năng và kinh nghiệm cần thiết.",
    answer_en:
      "Enter a prompt in Gemini, acting as an Education HR specialist, requesting a job description for a teaching role including required skills and experience.",
  },
  {
    id: 16,
    topic: "Gemini Access",
    topic_en: "Gemini Access",
    question_vi:
      "Phương pháp nào để mở Gemini for Education? (Chọn tất cả)",
    question_en:
      "Which of the following methods can be used to open Gemini for Education? (Select all which apply)",
    answer_vi:
      "Truy cập gemini.google.com trong thanh địa chỉ (Omnibox), Truy cập biểu tượng Gemini trong Trình khởi chạy Ứng dụng (Apps Launcher).",
    answer_en:
      "Head to gemini.google.com in the Omnibox, Head to the Gemini Icon in the Apps Launcher",
  },
  {
    id: 17,
    topic: "NotebookLM Differentiation",
    topic_en: "NotebookLM Differentiation",
    question_vi:
      "Cách tốt nhất để NotebookLM hỗ trợ học sinh với trình độ đọc khác nhau?",
    question_en:
      "What is the best way NotebookLM can support all learners with different reading abilities understand a story?",
    answer_vi:
      "Yêu cầu NotebookLM tạo nhiều bản tóm tắt của câu chuyện, mỗi bản được điều chỉnh cho một trình độ đọc khác nhau.",
    answer_en:
      "Ask NotebookLM to generate multiple summaries of the story, each tailored to a different reading level.",
  },
  {
    id: 18,
    topic: "Prompting Basics",
    topic_en: "Prompting Basics",
    question_vi: "Mục đích chính của 'prompt' khi tương tác với AI?",
    question_en:
      "What is the main purpose of a 'prompt' when interacting with an AI?",
    answer_vi:
      "Để đưa cho AI một hướng dẫn, câu hỏi hoặc nhiệm vụ cụ thể để thực hiện.",
    answer_en:
      "To give the AI a specific instruction, question, or task to perform.",
  },
  {
    id: 19,
    topic: "AI Misuse Detection",
    topic_en: "AI Misuse Detection",
    question_vi:
      "Công cụ nào trong Workspace giúp tìm hiểu cách bài tập được tạo khi nghi ngờ sử dụng AI?",
    question_en:
      "What tools within Google Workspace could a teacher use to find out more about how the work was created when they suspect Generative AI misuse?",
    answer_vi:
      "Sử dụng Lịch sử Phiên bản (Version History) để xem quá trình tạo ra bài tập theo thời gian.",
    answer_en:
      "Use Version History to see the creation process over time.",
  },
  {
    id: 20,
    topic: "AI Ethics",
    topic_en: "AI Ethics",
    question_vi:
      "Nội dung nào phù hợp cho hướng dẫn sử dụng AI có trách nhiệm và đạo đức?",
    question_en:
      "Which of the following would be appropriate content for simple classroom guidelines on the responsible and ethical use of generative AI?",
    answer_vi:
      "Một hướng dẫn yêu cầu học sinh phải trích dẫn rõ ràng các công cụ AI khi chúng được sử dụng để động não hoặc soạn thảo.",
    answer_en:
      "A guideline requiring students to explicitly cite AI tools when used for brainstorming or drafting.",
  },
  {
    id: 21,
    topic: "Data Privacy",
    topic_en: "Data Privacy",
    question_vi:
      "Gemini trên tài khoản Workspace for Education không sử dụng dữ liệu của bạn để huấn luyện mô hình.",
    question_en:
      "Gemini on a Google Workspace for Education account doesn't use your data to train the model.",
    answer_vi: "Đúng (True)",
    answer_en: "True",
  },
  {
    id: 22,
    topic: "Image Prompting",
    topic_en: "Image Prompting",
    question_vi: "Prompt nào tốt nhất để tạo hình ảnh con quái vật hữu ích cho học sinh nhỏ tuổi?",
    question_en: "Which of these prompts would be best for generating an image of a monster your students have described?",
    answer_vi: "Tạo hình ảnh một con quái vật hay giúp đỡ và thích ăn rác. Đó là một con quái vật màu hồng với nụ cười tươi và có nhiều tay để nhặt đồ vật. Sử dụng phong cách hoạt hình và đảm bảo hình ảnh phù hợp với học sinh nhỏ tuổi.",
    answer_en: "Create an image of a helpful monster who loves to eat litter. They are a pink monster with a big smile and lots of hands for picking up items. Use a cartoon style and ensure the image is suitable for younger students.",
  },
  {
    id: 23,
    topic: "AI Terminology",
    topic_en: "AI Terminology",
    question_vi:
      "Lỗi khi chatbot AI tạo ra đầu ra sai, vô nghĩa mà có vẻ đáng tin là gì?",
    question_en:
      "When AI chatbots generate false, nonsensical, or misleading outputs that seem believable, these errors are referred to as what?",
    answer_vi: "Hallucinations (Ảo giác)",
    answer_en: "Hallucinations",
  },
  {
    id: 24,
    topic: "Prompting Basics",
    topic_en: "Prompting Basics",
    question_vi:
      "Bốn lĩnh vực chính cần xem xét khi viết prompt hiệu quả?",
    question_en:
      "What are the four main areas to consider when writing an effective prompt?",
    answer_vi:
      "Persona, Task, Context, and Format (Vai trò, Nhiệm vụ, Ngữ cảnh, và Định dạng)",
    answer_en: "Persona, Task, Context, and Format",
  },
  {
    id: 25,
    topic: "Prompting",
    topic_en: "Prompting",
    question_vi:
      "Prompt nào tốt nhất để tạo khung đánh giá (rubric) bài thuyết trình cụ thể?",
    question_en:
      "Which of these prompts would give the best response when creating a rubric to assess a 5-minute oral presentation on reducing waste?",
    answer_vi:
      "Đóng vai là giáo viên Nhân văn có chuyên môn trong việc viết khung đánh giá, và yêu cầu Gemini tạo một khung đánh giá 3 cấp độ với các tiêu chí và thang điểm, chỉ định định dạng bảng.",
    answer_en:
      "Act as a Humanities teacher with expertise in writing rubrics, and ask Gemini to generate a 3-level rubric with criteria (like research and public speaking) and point values for the presentation, specifying a table format.",
  },
  {
    id: 26,
    topic: "Gemini Feature",
    topic_en: "Gemini Feature",
    question_vi: "Tính năng 'Double Check Response' cho phép làm gì?",
    question_en:
      "What does the 'Double Check Response' feature in Gemini allow you to do?",
    answer_vi: "Khám phá các nguồn dữ liệu trên web cho câu trả lời.",
    answer_en: "Explore the data sources for the answer from the web.",
  },
  {
    id: 27,
    topic: "AI Safety",
    topic_en: "AI Safety",
    question_vi:
      "Cách tốt nhất để xử lý thông tin sai (ngày tháng trận chiến) do AI cung cấp?",
    question_en:
      "What is the best way to handle a situation where a Gemini's summary includes a specific date for a battle that the teacher believes is incorrect?",
    answer_vi:
      "Coi ngày tháng sai là một ảo giác và kiểm tra lại thông tin bằng cách sử dụng các nguồn đáng tin cậy, nguồn sơ cấp trước khi sử dụng.",
    answer_en:
      "Treat the incorrect date as a likely hallucination and fact-check the information using reliable, primary sources before using it.",
  },
  {
    id: 28,
    topic: "Document Analysis",
    topic_en: "Document Analysis",
    question_vi:
      "Gemini có thể giúp giáo viên hiểu quy tắc trường học mới bằng cách nào? (chọn tất cả)",
    question_en:
      "How can Gemini help an educator read and understand a new school policy? (Select all which apply)",
    answer_vi:
      "Tải lên PDF và yêu cầu Gemini tạo bản tóm tắt âm thanh; Tải lên PDF và sử dụng Guided Learning để tìm hiểu thêm; Tải lên PDF và yêu cầu Gemini tóm tắt.",
    answer_en:
      "Upload a PDF of the policy into Gemini and ask Gemini to create an audio overview; Upload a PDF of the policy into Gemini and use Guided Learning to learn more about it; Upload a PDF of the policy and then ask Gemini for a Summary.",
  },
  {
    id: 29,
    topic: "Gemini Feature",
    topic_en: "Gemini Feature",
    question_vi: "Nút 'Sources' trong Gemini có chức năng gì?",
    question_en:
      "After generating an output, what does the 'Sources' button in Gemini do?",
    answer_vi: "Hiển thị các trang web được sử dụng để tạo ra nội dung.",
    answer_en: "Shows the websites used to create the content.",
  },
  {
    id: 30,
    topic: "Imagen",
    topic_en: "Imagen",
    question_vi:
      "Imagen hoạt động trong Gemini như thế nào? (chọn tất cả)",
    question_en:
      "Which of the following describes how Imagen works within Gemini? (Select All Correct Responses)",
    answer_vi:
      "Nó tạo ra hình ảnh từ các lời nhắc bằng văn bản; Nó có thể chỉnh sửa các hình ảnh có sẵn.",
    answer_en:
      "It generates images from text prompts; It can edit existing images.",
  },
  {
    id: 31,
    topic: "NotebookLM Document Analysis",
    topic_en: "NotebookLM Document Analysis",
    question_vi:
      "NotebookLM có thể giúp giáo viên hiểu quy tắc trường học mới bằng cách nào? (chọn tất cả)",
    question_en:
      "How can NotebookLM help an educator understand a number of new school policies? (Select all which apply)",
    answer_vi:
      "Tạo một danh sách Câu hỏi Thường gặp (FAQ) dựa trên nội dung; Sử dụng Discover Sources để tìm nội dung tương tự từ internet; Tạo một hướng dẫn học tập (study guide) dựa trên nội dung.",
    answer_en:
      "Create an FAQ based on the content; Use Discover Sources to find similar content from the internet; Create a study guide based on the content.",
  },
  {
    id: 32,
    topic: "AI Ethics",
    topic_en: "AI Ethics",
    question_vi:
      "Giáo viên nên làm gì với các chủ đề gây tranh cãi do AI đề xuất?",
    question_en:
      "What should a teacher do with potentially controversial essay topics generated by AI?",
    answer_vi:
      "Xem xét phê phán từng chủ đề về mức độ phù hợp với lứa tuổi, tiềm năng thúc đẩy tranh luận tôn trọng, tính trung lập về mặt thực tế và bất kỳ định kiến cố hữu nào, sau đó chỉnh sửa đầu ra trước khi sử dụng với học sinh.",
    answer_en:
      "Critically review each topic for its age-appropriateness, potential to foster respectful debate, factual neutrality, and any inherent biases, then revise the output before using with students.",
  },
  {
    id: 33,
    topic: "AI Risk",
    topic_en: "AI Risk",
    question_vi:
      "Rủi ro khi giáo viên dùng tài liệu AI tạo ra mà không xem xét kỹ lưỡng? (chọn tất cả)",
    question_en:
      "What risks does it cause if a science teacher uses AI-generated materials directly without thoroughly reviewing them?",
    answer_vi:
      "Nội dung do AI tạo ra có thể chứa thông tin không chính xác về mặt thực tế, sau đó được truyền đến học sinh; Nội dung do AI tạo ra có thể được viết ở mức độ không phù hợp với học sinh (quá đơn giản hoặc quá phức tạp).",
    answer_en:
      "The AI-generated content could contain factual inaccuracies, which are then passed to the student; The AI-generated content could be written at an inappropriate level for the students (either too simple or too complex).",
  },
  {
    id: 34,
    topic: "NotebookLM",
    topic_en: "NotebookLM",
    question_vi:
      "Bạn có thể chia sẻ Notebooks từ NotebookLM với người dùng khác trong tổ chức của bạn.",
    question_en:
      "You can share your Notebooks from NotebookLM with other users in your organisation.",
    answer_vi: "Đúng (True)",
    answer_en: "True",
  },
  {
    id: 35,
    topic: "NotebookLM Feature",
    topic_en: "NotebookLM Feature",
    question_vi:
      "Tóm tắt âm thanh (Audio Overviews) trong NotebookLM có thể được tải xuống để sử dụng bên ngoài Notebook.",
    question_en:
      "Audio Overviews in NotebookLM can be downloaded for use outside of the notebook.",
    answer_vi: "Sai (False)",
    answer_en: "False",
  },
  {
    id: 36,
    topic: "Workspace AI",
    topic_en: "Workspace AI",
    question_vi:
      "Các nhiệm vụ AI Pro có thể hoàn thành trong Google Docs? (chọn tất cả)",
    question_en:
      "Which of the following tasks can Google AI Pro for Education complete in Google Docs? (Select all which apply)",
    answer_vi:
      "Tạo văn bản mới, dựa trên một lời nhắc; Viết lại văn bản, sử dụng một giọng điệu cụ thể; Tóm tắt văn bản trong một tài liệu; Đọc soát và sửa ngữ pháp và chính tả.",
    answer_en:
      "Generate new text, based on a prompt; Rewrite text, using a specific tone; Summarize the text in a document; Proofread and correct grammar and spelling.",
  },
  {
    id: 37,
    topic: "Critical Thinking",
    topic_en: "Critical Thinking",
    question_vi:
      "Hành động nào của giáo viên hiệu quả nhất để bồi dưỡng tư duy phản biện về thông tin AI?",
    question_en:
      "To foster critical thinking skills regarding the AI-generated information, which teacher action would be most effective?",
    answer_vi:
      "Giao cho học sinh nhiệm vụ kiểm tra chéo ít nhất ba sự kiện chính do Gemini cung cấp với các nguồn độc lập, có uy tín, và sau đó thảo luận về bất kỳ sự khác biệt nào mà họ tìm thấy.",
    answer_en:
      "Assign students the task of cross-referencing at least three key facts provided by Gemini with independent, reputable sources, and then discuss any discrepancies they find.",
  },
];

let currentLanguage = "vi";
let filteredQuestions = [...questions];

function flipCard(element) {
  element.classList.toggle("flipped");
}

function setLanguage(lang) {
  currentLanguage = lang;
  document
    .getElementById("lang-vi")
    .classList.toggle("bg-google-blue", lang === "vi");
  document
    .getElementById("lang-en")
    .classList.toggle("bg-google-blue", lang === "en");
  document
    .getElementById("lang-vi")
    .classList.toggle("text-white", lang === "vi");
  document
    .getElementById("lang-en")
    .classList.toggle("text-white", lang === "en");

  document
    .getElementById("lang-vi")
    .classList.toggle("bg-gray-100", lang === "en");
  document
    .getElementById("lang-en")
    .classList.toggle("bg-gray-100", lang === "vi");
  document
    .getElementById("lang-vi")
    .classList.toggle("text-google-blue", lang === "en");
  document
    .getElementById("lang-en")
    .classList.toggle("text-google-blue", lang === "vi");

  document.getElementById("search-input").placeholder =
    lang === "vi"
      ? "Tìm kiếm câu hỏi theo nội dung hoặc chủ đề..."
      : "Search questions by content or topic...";
  document.getElementById("title-h1").textContent =
    lang === "vi" ? "ÔN TẬP CẤP TỐC" : "QUICK REVIEW";
  document.getElementById("title-h2").textContent =
    "GEMINI CERTIFIED EDUCATOR";
  document.getElementById("footer-text").textContent =
    lang === "vi"
      ? "Chúc bạn thành công với kỳ thi Gemini Certified Educator!"
      : "Good luck with the Gemini Certified Educator exam!";
  document.getElementById("exam-link-text").textContent =
    lang === "vi"
      ? "Vào link bài thi chính thức"
      : "Access Official Exam Link";

  renderQuestions(filteredQuestions);
}

function filterQuestions() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  filteredQuestions = questions.filter((q) => {
    const searchFieldVi =
      q.question_vi.toLowerCase() + " " + q.topic.toLowerCase();
    const searchFieldEn =
      q.question_en.toLowerCase() + " " + q.topic_en.toLowerCase();

    return (
      searchFieldVi.includes(searchTerm) ||
      searchFieldEn.includes(searchTerm)
    );
  });
  renderQuestions(filteredQuestions);
}

function renderQuestions(data) {
  const container = document.getElementById("questions-container");
  const placeholder = document.getElementById("placeholder");

  if (data.length === 0) {
    placeholder.classList.remove("hidden");
    placeholder.textContent =
      currentLanguage === "vi"
        ? "Không tìm thấy câu hỏi nào phù hợp. Vui lòng thử từ khóa khác."
        : "No matching questions found. Please try a different keyword.";
  } else {
    placeholder.classList.add("hidden");
  }

  container.innerHTML = data
    .map(
      (q) => `
          <div class="flip-card transition duration-300 transform hover:scale-[1.02] hover:cursor-pointer" onclick="flipCard(this)">
              <div class="flip-card-inner">
                  <!-- Front: Question -->
                  <div class="flip-card-front">
                      <span class="text-xs text-gray-500 bg-pink-100 px-3 py-1 rounded-full absolute top-4 left-4">${
                        currentLanguage === "vi" ? q.topic : q.topic_en
                      }</span>
                      <h3 class="text-sm font-bold text-gemini-purple absolute top-4 right-4">Câu ${
                        q.id
                      }</h3>
                      <p class="text-gray-800 text-base font-semibold flex flex-col h-full justify-center">
                          ${
                            currentLanguage === "vi"
                              ? q.question_vi
                              : q.question_en
                          }
                      </p>
                      <p class="text-xs text-gray-400 mt-auto">${
                        currentLanguage === "vi"
                          ? "Click để xem đáp án"
                          : "Click to see answer"
                      }</p>
                  </div>
                  
                  <!-- Back: Answer -->
                  <div class="flip-card-back">
                      <p class="text-base leading-relaxed text-center flex flex-col h-full justify-center">
                          ${
                            currentLanguage === "vi"
                              ? q.answer_vi
                              : q.answer_en
                          }
                      </p>
                      <p class="text-xs mt-auto">${
                        currentLanguage === "vi"
                          ? "Click để xem câu hỏi"
                          : "Click to see question"
                      }</p>
                  </div>
              </div>
          </div>
      `
    )
    .join("");
}

window.onload = () => {
  renderQuestions(questions);
  setLanguage("vi");
};