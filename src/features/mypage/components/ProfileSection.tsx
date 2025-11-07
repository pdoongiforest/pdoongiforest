function ProfileSection() {
  return (
    <section className="px-6">
      <h2 className="text-3xl font-bold">내 프로필</h2>
      <div className="border border-gray-300 rounded-lg p-4 mt-4">
        <div className="flex gap-4">
          <div className="min-w-50 min-h-50 rounded-xl bg-white">
            <img
              src="/images/너굴.png"
              alt="profile"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div>
            <p>프둥이</p>
            <span>Frontend Developer</span>

            <p>나이 비공개</p>
            <div>
              <p>피어온도</p>
              <div></div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>소셜</p>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <p>관심 분야</p>
            <ul>
              <li>JavaScript</li>
              <li>React</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
