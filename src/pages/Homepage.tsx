import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock,
  Menu,
  Play,
  Search,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

type Course = {
  id: number;
  title: string;
  instructor: string;
  avatar: string;
  price: string;
  originalPrice: string;
  rating: number;
  students: number;
  chapters: number;
  lessons: number;
  duration: string;
  level: string;
  thumbnail: string;
  category: string;
  bestseller?: boolean;
  hot?: boolean;
  isPublic?: boolean;
  previewChapters?: boolean;
  description: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
};

const categories: Category[] = [
  { id: "all", name: "Tất cả", icon: "📚" },
  { id: "programming", name: "Lập trình", icon: "💻" },
  { id: "design", name: "Thiết kế", icon: "🎨" },
  { id: "business", name: "Kinh doanh", icon: "💼" },
  { id: "marketing", name: "Marketing", icon: "📈" },
  { id: "language", name: "Ngoại ngữ", icon: "🌍" },
];

const featuredCourses: Course[] = [
  {
    id: 1,
    title: "Lập trình Web Full Stack với React & Node.js",
    instructor: "Nguyễn Văn A",
    avatar: "🧑‍💻",
    price: "1.299.000đ",
    originalPrice: "2.499.000đ",
    rating: 4.8,
    students: 12430,
    chapters: 12,
    lessons: 156,
    duration: "42h 30p",
    level: "Trung cấp",
    thumbnail: "🖥️",
    category: "programming",
    bestseller: true,
    previewChapters: true,
    description:
      "Xây dựng ứng dụng Web hiện đại với React, Node.js, Express và MongoDB.",
  },
  {
    id: 2,
    title: "UI/UX Design từ cơ bản đến nâng cao",
    instructor: "Trần Thị B",
    avatar: "👩‍🎨",
    price: "999.000đ",
    originalPrice: "1.899.000đ",
    rating: 4.9,
    students: 8920,
    chapters: 10,
    lessons: 98,
    duration: "28h 15p",
    level: "Cơ bản",
    thumbnail: "🎨",
    category: "design",
    hot: true,
    previewChapters: true,
    description:
      "Học cách thiết kế trải nghiệm người dùng chuyên nghiệp với nguyên lý thiết kế hiện đại.",
  },
  {
    id: 3,
    title: "Digital Marketing & Social Media Strategy",
    instructor: "Lê Minh C",
    avatar: "👨‍💼",
    price: "1.499.000đ",
    originalPrice: "2.999.000đ",
    rating: 4.7,
    students: 15670,
    chapters: 15,
    lessons: 203,
    duration: "56h 00p",
    level: "Nâng cao",
    thumbnail: "📱",
    category: "marketing",
    isPublic: true,
    description:
      "Thiết kế chiến lược marketing số và quảng cáo hiệu quả trên mạng xã hội.",
  },
  {
    id: 4,
    title: "Python cho Data Science & Machine Learning",
    instructor: "Phạm Thị D",
    avatar: "👩‍🔬",
    price: "1.799.000đ",
    originalPrice: "3.499.000đ",
    rating: 4.9,
    students: 9840,
    chapters: 18,
    lessons: 234,
    duration: "68h 45p",
    level: "Nâng cao",
    thumbnail: "🤖",
    category: "programming",
    bestseller: true,
    previewChapters: true,
    description:
      "Học Python chuyên sâu cho Data Science, phân tích dữ liệu và Machine Learning.",
  },
  {
    id: 5,
    title: "Quản trị doanh nghiệp hiện đại",
    instructor: "Hoàng Văn E",
    avatar: "👔",
    price: "899.000đ",
    originalPrice: "1.699.000đ",
    rating: 4.6,
    students: 6520,
    chapters: 8,
    lessons: 72,
    duration: "24h 20p",
    level: "Cơ bản",
    thumbnail: "📊",
    category: "business",
    description:
      "Nắm vững phương pháp quản trị doanh nghiệp theo xu hướng số hóa và đổi mới.",
  },
  {
    id: 6,
    title: "Tiếng Anh giao tiếp nâng cao",
    instructor: "Emily Johnson",
    avatar: "👩‍🏫",
    price: "1.199.000đ",
    originalPrice: "2.299.000đ",
    rating: 4.8,
    students: 11250,
    chapters: 20,
    lessons: 180,
    duration: "45h 30p",
    level: "Trung cấp",
    thumbnail: "🗣️",
    category: "language",
    hot: true,
    isPublic: true,
    description:
      "Luyện kỹ năng giao tiếp tiếng Anh thực tế với bài tập và tình huống tương tác.",
  },
];

const stats = [
  { icon: BookOpen, value: "5,000+", label: "Khóa học" },
  { icon: Users, value: "250,000+", label: "Học viên" },
  { icon: Award, value: "1,200+", label: "Giảng viên" },
  { icon: TrendingUp, value: "95%", label: "Hài lòng" },
];

const howItWorks = [
  {
    step: "01",
    title: "Tìm kiếm khóa học",
    description:
      "Khám phá hàng nghìn khóa học chất lượng cao từ các chuyên gia hàng đầu.",
    icon: Search,
  },
  {
    step: "02",
    title: "Học tập linh hoạt",
    description:
      "Học theo tiến độ của bạn với video bài giảng, tài liệu và bài tập thực hành.",
    icon: Play,
  },
  {
    step: "03",
    title: "Nhận chứng chỉ",
    description:
      "Hoàn thành khóa học và nhận chứng chỉ được công nhận bởi ngành.",
    icon: Award,
  },
];

export function Homepage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCourses = useMemo(
    () =>
      featuredCourses.filter(
        (course) =>
          (activeCategory === "all" || course.category === activeCategory) &&
          (searchQuery === "" ||
            course.title.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [activeCategory, searchQuery]
  );

  const closeDetail = () => setSelectedCourse(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg transform hover:scale-105 transition-transform">
                🎓
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  EduViet
                </h1>
                <p className="text-xs text-gray-600">Học để thành công</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#courses"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Khóa học
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Cách thức
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Về EduViet
              </a>
              <a
                href="/login"
                className="px-6 py-2.5 text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Đăng nhập
              </a>
              <a
                href="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Đăng ký
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <a href="#courses" className="block text-gray-700 hover:text-orange-600 font-medium">
                Khóa học
              </a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-orange-600 font-medium">
                Cách thức
              </a>
              <a href="#about" className="block text-gray-700 hover:text-orange-600 font-medium">
                Về EduViet
              </a>
              <a href="/login" className="block w-full px-6 py-2.5 text-gray-700 border border-gray-300 rounded-xl font-medium text-center">
                Đăng nhập
              </a>
              <a
                href="/login"
                className="block w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-medium text-center"
              >
                Đăng ký
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-orange-100 rounded-full">
                <span className="text-orange-600 font-semibold text-sm">
                  ✨ Nền tảng học tập #1 tại Việt Nam
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Học hỏi,
                </span>
                <br />
                <span className="text-gray-900">Phát triển,</span>
                <br />
                <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  Thành công
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Khám phá khóa học có chương trình học công khai, xem trước miễn phí, và chỉ cần mở khóa giá khi bạn xem chi tiết khóa học.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#courses"
                  className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Khám phá ngay</span>
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
                  Xem demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl flex items-center justify-center text-3xl">
                      💻
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Web Development</div>
                      <div className="text-sm text-gray-500">12 chapters • 156 lessons</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <span className="font-semibold">4.8</span>
                      <span className="text-gray-500 text-sm">(12,430)</span>
                    </div>
                    <div className="text-orange-600 font-bold">Xem chi tiết giá</div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-2xl transform rotate-6 hover:rotate-0 transition-all w-48">
                  <div className="text-white">
                    <div className="text-4xl mb-2">🎨</div>
                    <div className="font-bold">UI/UX Design</div>
                    <div className="text-sm opacity-90">10 chapters</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 shadow-2xl transform -rotate-6 hover:rotate-0 transition-all w-48">
                  <div className="text-white">
                    <div className="text-4xl mb-2">📈</div>
                    <div className="font-bold">Marketing</div>
                    <div className="text-sm opacity-90">15 chapters</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-200 to-rose-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl font-medium transition-all transform hover:scale-105 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Khóa học nổi bật</h2>
              <p className="text-gray-600">Chọn khóa học, xem thông tin công khai, và mở chi tiết để xem giá.</p>
            </div>
            <a
              href="#courses"
              className="hidden sm:inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <span>Xem tất cả</span>
              <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedCourse(course)}
                className="group text-left bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 focus:outline-none"
              >
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center text-6xl overflow-hidden">
                  <div className="transform group-hover:scale-110 transition-transform">{course.thumbnail}</div>
                  {(course.bestseller || course.hot || course.isPublic || course.previewChapters) && (
                    <div className="absolute top-4 left-4 space-y-2">
                      {course.bestseller && (
                        <div className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                          🏆 Bestseller
                        </div>
                      )}
                      {course.hot && (
                        <div className="px-3 py-1 bg-rose-500 text-white rounded-full text-xs font-bold">
                          🔥 Hot
                        </div>
                      )}
                      {course.isPublic && (
                        <div className="px-3 py-1 bg-sky-500 text-white rounded-full text-xs font-bold">
                          🌐 Miễn phí xem công khai
                        </div>
                      )}
                      {course.previewChapters && !course.isPublic && (
                        <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold">
                          👁️ Xem trước miễn phí
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-orange-600" size={20} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">{course.avatar}</span>
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 max-h-14 overflow-hidden">{course.title}</h3>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <BookOpen size={16} className="text-orange-500" />
                      <span>{course.chapters} chương</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Play size={16} className="text-rose-500" />
                      <span>{course.lessons} bài</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-blue-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 size={16} className="text-purple-500" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-gray-500 text-sm">({course.students.toLocaleString("vi-VN")})</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Users size={14} className="inline" />
                      {course.students.toLocaleString("vi-VN")} học viên
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Xem chi tiết</div>
                      <div className="text-lg font-semibold text-gray-900">Khóa học mở</div>
                    </div>
                    <div className="rounded-full px-4 py-2 bg-orange-50 text-orange-600 font-semibold text-sm">
                      Mở ngay
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedCourse && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50" id="detail">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <button
                  type="button"
                  onClick={closeDetail}
                  className="inline-flex items-center gap-2 text-orange-600 font-semibold"
                >
                  <ChevronRight className="rotate-180" size={18} />
                  Quay lại
                </button>
                <p className="mt-3 text-sm text-gray-500">
                  Chi tiết khóa học chỉ hiển thị giá sau khi bạn chọn khóa học.
                </p>
              </div>
              <div className="rounded-full px-4 py-2 bg-amber-100 text-orange-700 text-sm font-semibold">
                {selectedCourse.isPublic ? "Khóa học công khai" : "Xem trước miễn phí"}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center text-5xl">
                    {selectedCourse.thumbnail}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giảng viên</p>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedCourse.title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{selectedCourse.instructor}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">{selectedCourse.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2 p-4 rounded-3xl bg-slate-50">
                    <BookOpen size={18} className="text-orange-500" />
                    <div>
                      <div className="text-xs text-gray-500">Chương</div>
                      <div className="font-semibold">{selectedCourse.chapters}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 rounded-3xl bg-slate-50">
                    <Play size={18} className="text-rose-500" />
                    <div>
                      <div className="text-xs text-gray-500">Bài</div>
                      <div className="font-semibold">{selectedCourse.lessons}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 rounded-3xl bg-slate-50">
                    <Clock size={18} className="text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-500">Thời lượng</div>
                      <div className="font-semibold">{selectedCourse.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 rounded-3xl bg-slate-50">
                    <BarChart3 size={18} className="text-purple-500" />
                    <div>
                      <div className="text-xs text-gray-500">Trình độ</div>
                      <div className="font-semibold">{selectedCourse.level}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-8 text-white shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="uppercase text-xs tracking-[0.3em] opacity-80">Giá khóa học</p>
                      <p className="mt-2 text-5xl font-bold">{selectedCourse.price}</p>
                    </div>
                    <div className="text-right text-sm text-orange-100 line-through opacity-90">
                      {selectedCourse.originalPrice}
                    </div>
                  </div>
                  <p className="text-sm opacity-90">
                    Giá chỉ hiển thị trong trang chi tiết khóa học. Giá được giữ kín trên homepage để tập trung vào nội dung học thử và quyền truy cập public.
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-200 p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Đánh giá học viên</p>
                      <p className="mt-2 text-2xl font-bold flex items-center gap-2">
                        {selectedCourse.rating}
                        <Star className="fill-yellow-400 text-yellow-400" size={20} />
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{selectedCourse.students.toLocaleString("vi-VN")} học viên</div>
                      <div>{selectedCourse.previewChapters ? "Xem thử được kích hoạt" : "Xem thử hạn chế"}</div>
                    </div>
                  </div>
                  <button className="w-full px-6 py-4 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-all">
                    Bắt đầu học ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cách thức hoạt động</h2>
            <p className="text-xl text-gray-600">Bắt đầu hành trình học tập của bạn chỉ với 3 bước đơn giản</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {step.step}
                </div>

                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl flex items-center justify-center mb-6 mt-4">
                  <step.icon className="text-orange-600" size={32} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>

                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-300 to-rose-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">EduViet dành cho ai?</h2>
              <p className="text-xl text-gray-600 mb-6">
                EduViet tạo ra môi trường học tập mở, nơi bạn có thể xem trước nội dung miễn phí, học thử các chương công khai và chỉ trả khi cần khóa học trọn gói.
              </p>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li>• Khóa học công khai cho người chưa đăng nhập.</li>
                <li>• Chức năng xem trước chương học miễn phí.</li>
                <li>• Giá chỉ xuất hiện khi truy cập trang chi tiết khóa học.</li>
                <li>• Thiết kế chuẩn mobile-first và dễ tương tác.</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-orange-100 to-rose-100 p-12 shadow-2xl">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-gray-700 leading-relaxed">
                Trang chủ tập trung vào nội dung và trải nghiệm trước khi hiển thị giá. Đây là cách tốt nhất để giữ người dùng xem khóa học và chỉ hiển thị thông tin mua hàng khi họ đã quan tâm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div>
                  <h3 className="text-xl font-bold">EduViet</h3>
                  <p className="text-sm text-gray-400">Học để thành công</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nền tảng học trực tuyến hàng đầu Việt Nam, mang đến kiến thức chất lượng cao cho mọi người.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Khám phá</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#courses" className="hover:text-orange-400 transition-colors">
                    Khóa học
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-orange-400 transition-colors">
                    Cách thức
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-orange-400 transition-colors">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Trung tâm hỗ trợ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Câu hỏi thường gặp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Chính sách
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex space-x-3">
                {['📘', '📷', '🐦', '💼'].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-500 hover:to-rose-500 transition-all transform hover:scale-110"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 EduViet. All rights reserved. Made with ❤️ in Vietnam</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
