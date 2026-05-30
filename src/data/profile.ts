import { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Danan Wijaya",
  title: "Full Stack Developer",
  bio: "Top Rated full-stack developer with 10+ years of experience, helping startups and enterprises ship scalable web platforms across e-commerce, SaaS, and fintech.",
  avatar: "/images/profile/avatar.jpg",
  social: {
    github: "https://github.com/dananw",
    linkedin: "https://www.linkedin.com/in/danan-wijaya/",
    email: "dananwijaya1996@gmail.com",
    twitter: "",
    upwork: "https://www.upwork.com/freelancers/~01a287e92174442263",
  },
  stats: [
    { label: "Years experience", value: "10+" },
    { label: "Earned on Upwork", value: "$40K+" },
    { label: "Job Success Score", value: "100%" },
    { label: "Hours worked", value: "3,000+" },
  ],
};
