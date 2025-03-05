export const navigation = [
  {
    name: "Therapists",
    href: "/listings/therapists",
    current: false,
    subMenu: [
      // {
      //   name: "Male Therapists",
      //   href: "/listings/male-therapist",
      //   current: false,
      // },
      // {
      //   name: "Female Therapists",
      //   href: "/listings/female-therapist",
      //   current: false,
      // },
      // {
      //     name: "Agencies",
      //     href: "/agencies",
      //     current: false,
      //   },
    ],
  },
  { name: "Agencies", href: "/listings/agencies", current: false, subMenu: [] },
  { name: "Treatments", href: "/treatments", current: false, subMenu: [] },
  { name: "Blogs", href: "/blogs", current: false, subMenu: [] },
  // { name: "FAQs", href: "/faqs", current: false, subMenu: [] },
  // { name: "Contact Us", href: "/contact", current: false, subMenu: [] },
  {
    name: "More",
    href: "/",
    current: false,
    subMenu: [
      {
        name: "Contact Us",
        href: "/contact",
        current: false,
      },
      {
        name: "FAQs",
        href: "/faqs",
        current: false,
      },
    
    ],
  },
];
