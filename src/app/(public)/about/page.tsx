export default function AboutPage() {
  return (
    <div className="section-gap py-10">
      <div className="flex flex-col justify-center items-center mb-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-4">
          About Zantech
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-6 text-lg leading-relaxed text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800">Who We Are</h2>

        <p>
          Welcome to <span className="font-semibold">Zan Tech</span>, your
          premier destination for electronics and robotics in Bangladesh. As a
          leading provider in the tech industry, we pride ourselves on offering
          a wide array of top-quality products at competitive prices, ensuring
          that our customers receive the best value for their investments.
        </p>

        <p>
          At Zan Tech, we understand the importance of staying ahead in the
          rapidly evolving world of technology. Our inventory is constantly
          updated with the latest advancements in electronics and robotics,
          enabling our customers to embrace the transformative power of
          technology with ease.
        </p>

        <p>
          Whether you are a hobbyist, a professional, or a tech enthusiast, our
          selection caters to all levels of expertise and interest. We’re
          committed to making innovation accessible, reliable, and rewarding for
          everyone in Bangladesh.
        </p>
      </div>
    </div>
  );
}
