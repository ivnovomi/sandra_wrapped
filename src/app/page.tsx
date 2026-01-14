import StoryViewer from '@/components/StoryViewer';
import storyData from '@/data/story.json';
import { StoryData, SlideType, Slide } from '@/types/story';
import { getDynamicContent } from '@/lib/dynamicContent';

export default async function Home() {
  const { images, videos } = await getDynamicContent();

  // Filter and transform base slides
  const baseSlides = storyData.slides.filter(s =>
    s.id !== 'gallery' && s.id !== 'dedications'
  ).map(slide => ({
    ...slide,
    type: slide.type as SlideType
  }));

  // Create dynamic gallery slide with ALL images (Visual Marquee)
  const gallerySlide: Slide = {
    id: 'dynamic_gallery',
    type: 'gallery',
    duration: 15000,
    content: {
      title: 'Tesoro Visual',
      images: images
    }
  };

  // Create interactive gallery exploration slide
  const galleryExploreSlide: Slide = {
    id: 'gallery_explore',
    type: 'gallery_explore',
    duration: 30000,
    content: {
      title: 'Galería Interactiva',
      images: images
    }
  };

  // Create intro for dedications
  const dedicationsIntroSlide: Slide = {
    id: 'dedications_intro',
    type: 'dedications_intro',
    duration: 8000,
    content: {
      title: 'Dedicando Amor',
    }
  };

  // Add images to the life_review slide for the masonry background
  const finalBaseSlides = baseSlides.map(slide => {
    if (slide.type === 'fast_review') {
      return {
        ...slide,
        content: {
          ...slide.content,
          images: images
        }
      };
    }
    return slide;
  });

  // Create dynamic dedication slides
  const dedicationSlides: Slide[] = videos.map((v, i) => ({
    id: `dedication_${i}`,
    type: 'dedications',
    duration: v.duration || 15000,
    content: {
      title: 'Dedicatorias',
      videos: [v]
    }
  }));

  const story: StoryData = {
    ...storyData,
    slides: [
      ...finalBaseSlides.slice(0, 4), // Intro, Life Review, Birth, Profession
      gallerySlide,
      galleryExploreSlide,
      dedicationsIntroSlide,
      ...dedicationSlides,
      ...finalBaseSlides.slice(4) // Timeline, Love, Outro
    ]
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-black font-sans antialiased">
      <StoryViewer story={story} />
    </main>
  );
}
