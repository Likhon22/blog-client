/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { FiFeather, FiBookOpen, FiUsers, FiGlobe } from "react-icons/fi";
import author1 from "../../assets/author1.jpeg";
import author2 from "../../assets/author2.jpg";
import banner from "../../assets/5_Blog_Layout_Best_Practices_From_2016-1.jpg";
const About = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <FiFeather className="text-primary" />
            <span className="text-sm uppercase tracking-wider text-primary font-semibold">
              About Zenfla
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Where Ideas Find Their Voice
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-10">
            Zenfla is a digital sanctuary for thoughtful discourse, creative
            expression, and knowledge sharing. We believe in the power of words
            to connect, inspire, and transform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/blogs" className="btn btn-primary">
              Explore Our Blog
            </Link>
            <Link to="/login" className="btn btn-outline">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img
                src={banner}
                alt="Person writing in a journal"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-base-content/80 mb-4">
                Zenfla was born from a simple yet profound belief: everyone has
                a story worth telling, knowledge worth sharing, and perspectives
                that can expand our collective understanding.
              </p>
              <p className="text-base-content/80 mb-4">
                Founded in 2023, we set out to create a platform where quality
                content could flourish, free from the noise and distractions
                that plague much of today's online experience.
              </p>
              <p className="text-base-content/80 mb-6">
                Whether you're a seasoned writer or taking your first steps into
                the world of blogging, Zenfla provides the tools, audience, and
                support needed to make your voice heard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-base-200 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              These principles guide everything we do at Zenfla, from the
              features we build to the content we highlight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <FiBookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Content</h3>
                <p className="text-base-content/70">
                  We believe in substance over noise. Our platform promotes
                  thoughtful, well-crafted articles that add real value to
                  readers' lives.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <FiUsers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inclusive Community</h3>
                <p className="text-base-content/70">
                  Zenfla welcomes diverse voices and perspectives. We're
                  committed to creating a space where everyone feels valued and
                  heard.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <FiGlobe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Perspective</h3>
                <p className="text-base-content/70">
                  Knowledge transcends borders. We strive to share insights and
                  stories from around the world, connecting readers to new ideas
                  and cultures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">1K+</h3>
              <p className="text-base-content/70">Active Readers</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
              <p className="text-base-content/70">Published Articles</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">5+</h3>
              <p className="text-base-content/70">Contributing Writers</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">10+</h3>
              <p className="text-base-content/70">Content Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              The passionate individuals behind Zenfla who work tirelessly to
              create an exceptional platform for writers and readers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 px-12 gap-12   justify-center items-center ">
            <div className="card bg-base-100 shadow-md text-center">
              <figure className="px-10 pt-10">
                <img
                  src={author1}
                  alt="Team Member"
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title justify-center">Mack</h3>
                <p className="text-primary">Co-Founder & Editor-in-Chief</p>
                <p className="text-base-content/70 text-sm">
                  Former journalist with a passion for storytelling and
                  community building.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md text-center">
              <figure className="px-10 pt-10">
                <img
                  src={author2}
                  alt="Team Member"
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title justify-center">Mark Shawon</h3>
                <p className="text-primary">Co-Founder & Technical Lead</p>
                <p className="text-base-content/70 text-sm">
                  Software engineer dedicated to creating intuitive, powerful
                  publishing tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-secondary/10 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Zenfla Community
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
            Whether you're here to share your expertise, find inspiration, or
            connect with like-minded individuals, there's a place for you at
            Zenfla.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="btn btn-primary btn-lg">
              Sign In Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
