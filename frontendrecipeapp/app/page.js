import PricingSection from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES, HOW_IT_WORKS_STEPS, SITE_STATS } from "@/lib/data";
import { ArrowRight, Check, Flame, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TESTIMONIALS = [
  {
    name: "Maya K.",
    role: "Home cook",
    quote: "The recipes feel like they were written for my kitchen. I waste less and eat better.",
  },
  {
    name: "Ethan R.",
    role: "Busy parent",
    quote: "Weeknights are finally calm. It tells me exactly what to do with what I have.",
  },
  {
    name: "Lina S.",
    role: "Fitness coach",
    quote: "The macro guidance and swaps are a game changer. It feels premium.",
  },
];

export default async function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F5F2] text-[#121212]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,163,177,0.15),_transparent_55%),radial-gradient(circle_at_85%_20%,_rgba(255,138,91,0.18),_transparent_50%),radial-gradient(circle_at_20%_85%,_rgba(20,20,20,0.08),_transparent_45%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.9),rgba(255,255,255,0.3))]" />

      <section className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              <Badge
                variant="outline"
                className="border-[#0FA3B1] text-[#0FA3B1] bg-white/70 text-xs font-bold uppercase tracking-[0.26em]"
              >
                <Flame className="mr-2 h-4 w-4" />
                #1 AI cooking assistant
              </Badge>
              <Badge className="bg-[#121212] text-white text-xs uppercase tracking-[0.26em]">
                Interactive pantry scan
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-[family:var(--font-display)] font-bold leading-[0.95] tracking-tight">
              A smarter kitchen that turns
              <span className="bg-gradient-to-r from-[#0FA3B1] via-[#3BB7C4] to-[#FF8A5B] bg-clip-text text-transparent">
                "what's left"
              </span>
              into plated perfection.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#5B5B5B] max-w-xl mx-auto lg:mx-0">
              Snap a photo, choose a vibe, and get a polished recipe with timing cues,
              smart swaps, and plating tips.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/dashboard">
                <Button
                  size="xl"
                  variant="primary"
                  className="rounded-full px-8 py-6 text-base font-semibold bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white shadow-[0_16px_36px_rgba(15,163,177,0.35)]"
                >
                  Start Cooking Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="xl"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold border-[#121212] text-[#121212] hover:bg-white"
              >
                Watch a 60s demo
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-[#5B5B5B]">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#0FA3B1]" />
                10k+ cooks joined in March
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#CFC9C2]" />
              <span>Average recipe ready in 14 minutes</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Card className="relative overflow-hidden rounded-[28px] border border-black/5 bg-white/80 shadow-[0_30px_80px_rgba(18,18,18,0.18)]">
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.7),transparent)]" />
              <Image
                src="/pasta-dish.png"
                alt="Plated pasta with fresh herbs"
                width={650}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-x-6 bottom-6">
                <Card className="border border-black/5 bg-white/90 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-[#0FA3B1] font-semibold">
                          Tonight's match
                        </p>
                        <h3 className="text-lg font-semibold text-[#121212]">
                          Rustic Tomato Basil Pasta
                        </h3>
                        <div className="mt-2 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-[#FF8A5B] text-[#FF8A5B]" />
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-[#121212] text-white">98% match</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Card>

            <Card className="absolute -left-6 top-10 hidden w-44 border border-black/5 bg-white/80 shadow-lg md:block animate-[float_7s_ease-in-out_infinite]">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[#5B5B5B]">Taste score</p>
                <p className="text-3xl font-semibold text-[#121212]">9.6</p>
                <p className="mt-1 text-xs text-[#5B5B5B]">Flavor, aroma, texture</p>
              </CardContent>
            </Card>
            <Card className="absolute -right-6 bottom-16 hidden w-48 border border-black/5 bg-white/80 shadow-lg md:block animate-[float_9s_ease-in-out_infinite]">
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[#5B5B5B]">Pantry ready</p>
                <p className="mt-2 text-sm text-[#121212]">Only 3 extra items needed.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto rounded-[24px] border border-black/5 bg-white/70 px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.3em] text-[#5B5B5B]">
            <span>Trusted by home cooks</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8D2CB]" />
            <span>Top 10 food app</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8D2CB]" />
            <span>Featured in chef journals</span>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-black/5 bg-white/70 text-[#121212]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          {SITE_STATS.map((stat, i) => (
            <div key={i} className="transition-transform duration-300 hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-semibold mb-1">{stat.val}</div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1] font-semibold">
                Smart kitchen stack
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-[family:var(--font-display)] font-semibold">
                Everything you need to cook like a pro.
              </h2>
            </div>
            <p className="text-lg text-[#5B5B5B] max-w-xl">
              From ingredient recognition to plating guidance, we help you build momentum
              night after night.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {FEATURES.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={i}
                  className="group border border-black/5 bg-white/80 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(18,18,18,0.15)]"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#0FA3B1]">
                          <IconComponent className="h-4 w-4" />
                          {feature.limit}
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold text-[#121212]">{feature.title}</h3>
                        <p className="mt-3 text-base text-[#5B5B5B]">{feature.description}</p>
                      </div>
                      <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-[#121212] text-white md:flex group-hover:bg-[#0FA3B1] transition-colors">
                        <IconComponent className="h-7 w-7" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="rounded-[28px] border border-black/5 bg-white/80 p-8 shadow-[0_24px_60px_rgba(18,18,18,0.15)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1] font-semibold">Why cooks stay</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-[family:var(--font-display)] font-semibold">
              Precision guidance, zero overwhelm.
            </h2>
            <p className="mt-4 text-base text-[#5B5B5B]">
              Every recipe comes with timing prompts, pantry swaps, and plated serving notes,
              so dinner feels effortless and elevated.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[#5B5B5B]">
              {[
                "Smart ingredient swaps for every pantry",
                "Balanced nutrition with macro tracking",
                "Step-by-step guidance with pro tips",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0FA3B1]/10 text-[#0FA3B1]">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-white/70 p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1]">Chef picks</p>
              <Badge className="bg-[#121212] text-white">Updated daily</Badge>
            </div>
            <div className="mt-6 space-y-4">
              {["Citrus Garlic Salmon", "Smoky Tomato Gnocchi", "Rosemary Chicken"].map((dish) => (
                <div
                  key={dish}
                  className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-3 hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="text-[#121212] font-semibold">{dish}</p>
                    <p className="text-xs text-[#5B5B5B]">Ready in 20 minutes</p>
                  </div>
                  <Badge className="bg-[#121212] text-white">Top match</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#121212] text-white">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8CDDE3] font-semibold">Three-step flow</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-[family:var(--font-display)] font-semibold">
              Dinner, streamlined.
            </h2>
            <p className="mt-4 text-lg text-[#C7C7C7]">
              We optimize for real life: minimal effort, maximum flavor, zero wasted groceries.
            </p>
          </div>
          <div className="space-y-6">
            {HOW_IT_WORKS_STEPS.map((item, i) => (
              <Card key={i} className="border border-white/10 bg-white/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8CDDE3] text-[#8CDDE3] text-lg font-semibold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-[#C7C7C7]">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#0FA3B1] font-semibold">
              Community notes
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-[family:var(--font-display)] font-semibold">
              Trusted by cooks who care about flavor.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <Card key={item.name} className="border border-black/5 bg-white/80">
                <CardContent className="p-6">
                  <p className="text-sm text-[#5B5B5B]">{item.role}</p>
                  <p className="mt-4 text-lg text-[#121212]">"{item.quote}"</p>
                  <p className="mt-4 text-sm text-[#0FA3B1] font-semibold">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto rounded-[32px] border border-black/5 bg-white/80 p-10 shadow-[0_30px_60px_rgba(18,18,18,0.12)]">
          <PricingSection />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto rounded-[36px] border border-black/5 bg-[#121212] p-10 text-center text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8CDDE3] font-semibold">Start tonight</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-[family:var(--font-display)] font-semibold">
            Make dinner feel effortless again.
          </h2>
          <p className="mt-4 text-lg text-[#C7C7C7]">
            Join thousands of cooks who turned pantry leftovers into plates worth sharing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="xl"
                variant="primary"
                className="rounded-full px-8 py-6 text-base font-semibold bg-[#0FA3B1] hover:bg-[#0D8F9B] text-white"
              >
                Start Cooking Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="xl"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-white/40 text-white hover:bg-white/10"
            >
              View pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
