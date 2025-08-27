"use client"
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import Clasic from "@/public/clasic.png"

export default function AboutPage() {
  return (
      <main>
            <div className="m-10">
                  <Link href="/">
      <FaArrowLeftLong />
      </Link>
      </div>
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Project Section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">About the Project</h1>
        <p className="text-muted-foreground leading-relaxed">
          <b> Brain Fork </b> is a modern web-based “second brain” application that helps you easily organize important links, notes, and resources without the complexity of heavy tools like Notion. Designed with a responsive layout, smooth navigation, and clean UI components, it provides a lightweight yet scalable solution for personal knowledge management while keeping the user experience simple and engaging.
           <br/>
          Under the hood,<b>Brain Fork</b> is built with <Link href="https://nextjs.org/"><b>Next.js</b></Link> for a scalable full-stack foundation, <Link href='https://tailwindcss.com/'><b>Tailwind CSS</b></Link> combined with <Link href='https://ui.shadcn.com/'><b>shadcn/ui</b></Link> for fast styling and elegant components, and a PostgreSQL database to reliably store and manage your data. This tech stack ensures both performance and flexibility, allowing the app to grow with your needs..
        </p>
      </section>

      {/* Author Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
        <p className="text-muted-foreground leading-relaxed">
  Hi, I’m <span className="font-medium">
      <Link href="https://www.arkitworks.xyz/"><b>Arkit</b> </Link> 👋</span> people know me as{" "}
  <span className="inline-flex items-center gap-1 align-middle">
    <Image
      src={Clasic}
      alt="logo"
      height={20}
      width={20}
      className="inline-block"
    />
    <Link href="https://x.com/0zRythm" className="inline-block">
      <b>Rythm</b>
    </Link>
  </span>{" "}
   — A developer passionate about building interactive applications and
  exploring new technologies. I enjoy working with modern frameworks like
  React and Next.js, and I’m always learning new tools to improve both
  frontend and backend development skills.
</p>

        <p className="text-muted-foreground leading-relaxed mt-4">
          When I’m not coding, I love diving into philosophy, experimenting with 
          creative projects, and sharing knowledge with others. My ultimate goal 
          is to build applications that not only solve problems but also inspire 
          people.
        </p>
      </section>
    </div>
    </main>
  )
}
