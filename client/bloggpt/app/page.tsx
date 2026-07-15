"use client";

import { useState } from "react";
import { generateBlog } from "./actions/generateBlog";
import BlogInputForm from "@/components/BlogInputForm";
import InteractiveBlogLoader from "@/components/InteractiveBlogLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { marked } from "marked";
import Image from "next/image";
import DOMPurify from "dompurify";

const BlogGeneratorPage: React.FC = () => {
  const [blog, setBlog] = useState<any | null>(null);
  const [blogMarkdown, setBlogMarkdown] = useState<string>("");
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleGenerateBlog = async (topic: string) => {
    setLoading(true);
    setError(null);
    setBlog(null);
    setBlogMarkdown("");
    setCurrentTopic(topic);
    setImageUrl(null);
    setImageError(null);

    try {
      const blogData = await generateBlog(topic);
      const cleanedBlog = blogData.blog.raw
        .replace(/^```markdown\n/, "") // Remove the opening ```markdown
        .replace(/\n```$/, "") // Remove the closing ```
        .trim();
      const htmlBlog = marked(cleanedBlog);
      setBlog(htmlBlog);
      setBlogMarkdown(cleanedBlog);

      // Image generation is separate so an image failure does not discard
      // an article that was generated successfully.
      try {
        const imageResponse = await fetch(
          "http://127.0.0.1:8002/generate-image/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic }),
          },
        );
        const imageData = await imageResponse.json();
        if (!imageResponse.ok) {
          throw new Error(imageData.detail || "Failed to generate image");
        }
        setImageUrl(imageData.imageUrl);
      } catch (imageErr) {
        setImageError((imageErr as Error).message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBlog(null);
    setBlogMarkdown("");
    setCurrentTopic("");
    setImageUrl(null);
    setImageError(null);
    setError(null);
  };

  const handleDownloadWord = async () => {
    setDownloading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8002/download-word/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: currentTopic,
          content: blogMarkdown,
          image_data_url: imageUrl,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.detail || "Failed to create Word document");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const safeName = currentTopic.replace(/[^a-z0-9_-]+/gi, "-").replace(/^-|-$/g, "");
      anchor.href = downloadUrl;
      anchor.download = `${safeName || "generated-article"}.docx`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (downloadError) {
      setError((downloadError as Error).message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            AI Blog Generator
          </CardTitle>
          <CardDescription className="text-center">
            Enter a topic and let AI create a blog post with an image for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <InteractiveBlogLoader />
          ) : blog ? (
            <div className="space-y-6">
              <div className="mb-4 flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleReset}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Generate Another Blog
                </Button>
                <Button onClick={handleDownloadWord} disabled={downloading}>
                  <Download className="mr-2 h-4 w-4" />
                  {downloading ? "Creating Word File..." : "Download as Word"}
                </Button>
              </div>
              {imageUrl && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Generated blog image"
                    unoptimized
                    // layout="fill"
                    fill
                    // objectFit="cover"
                    // className="transition-opacity duration-300 ease-in-out"
                    className="object-cover transition-opacity duration-300 ease-in-out"
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                  />
                </div>
              )}
              {imageError && (
                <div className="rounded border border-amber-400 bg-amber-50 px-4 py-3 text-amber-800">
                  The blog was generated, but its image could not be created: {imageError}
                </div>
              )}
              {error && (
                <div className="rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700">
                  Word download failed: {error}
                </div>
              )}
              <div
                className="prose lg:prose-xl dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog) }}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <BlogInputForm onSubmit={handleGenerateBlog} loading={loading} />
              {error && (
                <div
                  className="bg-red-100 border border-neutral-200 border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-100 dark:border-red-800 dark:border-neutral-800"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogGeneratorPage;
