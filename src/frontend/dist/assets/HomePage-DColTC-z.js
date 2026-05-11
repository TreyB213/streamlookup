import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, R as React, a as clsx, b as cn, F as Film, S as Skeleton, u as useNavigate } from "./index-Q3s0jndP.js";
import { u as useTrending, a as usePopularMovies, b as usePopularTV, P as Play } from "./use-tmdb-ZWtCVr1j.js";
import { T as Tv, m as motion } from "./proxy-B7LpWIzE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function useWatchNavigate() {
  const navigate = useNavigate();
  return reactExports.useCallback(
    (item) => {
      void navigate({
        to: "/watch",
        search: {
          tt: item.imdbId,
          type: item.type,
          season: "1",
          episode: "1",
          title: item.title,
          poster: item.posterUrl,
          tmdbId: void 0
        }
      });
    },
    [navigate]
  );
}
function PosterSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 w-[150px] sm:w-[160px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[2/3] rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 mt-2 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-1/2 mt-1 rounded" })
  ] });
}
function PosterCard({ item, index }) {
  const goToWatch = useWatchNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: Math.min(index * 0.04, 0.4), duration: 0.35 },
      className: "relative group cursor-pointer shrink-0 w-[150px] sm:w-[160px]",
      onClick: () => goToWatch(item),
      "data-ocid": `media_card.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg aspect-[2/3] bg-card glow-red-hover scale-on-hover", children: [
          item.posterUrl && item.posterUrl !== "/assets/images/placeholder.svg" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.posterUrl,
              alt: item.title,
              className: "w-full h-full object-cover",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: item.type === "tv" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-10 h-10 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "w-full mb-2 h-7 text-[11px] font-bold bg-primary hover:bg-primary/90 text-primary-foreground",
                onClick: (e) => {
                  e.stopPropagation();
                  goToWatch(item);
                },
                "data-ocid": `media_card.watch_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 mr-1 fill-current" }),
                  " Watch Now"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-foreground line-clamp-2 leading-tight", children: item.title }),
            item.year > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono mt-1", children: item.year })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 px-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-medium text-foreground line-clamp-1 leading-snug", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[9px] h-4 px-1.5 font-mono uppercase tracking-wider bg-primary/20 text-primary border-0",
                children: item.type === "tv" ? "TV" : "MOVIE"
              }
            ),
            item.year > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: item.year })
          ] })
        ] })
      ]
    }
  );
}
function ScrollArrow({
  direction,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: "shrink-0 w-8 h-8 rounded-full bg-card/80 border border-border/60 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-smooth shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "aria-label": direction === "left" ? "Scroll left" : "Scroll right",
      children: direction === "left" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
    }
  );
}
function PosterRow({
  title,
  icon,
  items,
  isLoading,
  isError,
  ocid
}) {
  const trackRef = reactExports.useRef(null);
  function scroll(direction) {
    if (!trackRef.current) return;
    const amount = direction === "left" ? -480 : 480;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-5", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg sm:text-xl text-secondary tracking-tight", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScrollArrow,
          {
            direction: "left",
            onClick: () => scroll("left"),
            ocid: `${ocid}.scroll_left`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScrollArrow,
          {
            direction: "right",
            onClick: () => scroll("right"),
            ocid: `${ocid}.scroll_right`
          }
        )
      ] })
    ] }),
    isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-muted-foreground text-sm py-6 px-3 bg-muted/20 rounded-lg",
        "data-ocid": `${ocid}.error_state`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Content unavailable. Please try again later." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: trackRef,
        className: "flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory",
        children: isLoading ? [0, 1, 2, 3, 4, 5, 6, 7].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(PosterSkeleton, {}, k)) : items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snap-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PosterCard, { item, index: i }) }, item.imdbId))
      }
    )
  ] }) });
}
function HeroSection({ item }) {
  const goToWatch = useWatchNavigate();
  const hasPoster = item.posterUrl && item.posterUrl !== "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full overflow-hidden",
      style: { minHeight: "480px", maxHeight: "640px", height: "56vw" },
      "data-ocid": "home.hero_section",
      children: [
        hasPoster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.posterUrl,
            alt: item.title,
            className: "absolute inset-0 w-full h-full object-cover object-center"
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(to right, oklch(0.12 0 0 / 0.97) 0%, oklch(0.12 0 0 / 0.6) 45%, oklch(0.12 0 0 / 0.15) 75%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(to top, oklch(0.12 0 0) 0%, oklch(0.12 0 0 / 0.4) 30%, transparent 70%)"
            }
          }
        ),
        !hasPoster && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(135deg, oklch(0.48 0.22 16 / 0.3) 0%, oklch(0.12 0 0) 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -32 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            className: "absolute inset-0 flex flex-col justify-end pb-10 sm:pb-14",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest border-0 px-2.5", children: item.type === "tv" ? "Series" : "Movie" }),
                item.year > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: item.year })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl sm:text-5xl md:text-6xl text-foreground leading-none mb-3 drop-shadow-xl", children: item.title }),
              item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-muted-foreground max-w-xl line-clamp-3 mb-5 leading-relaxed", children: item.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide glow-red h-11 px-6 text-sm",
                    onClick: () => goToWatch(item),
                    "data-ocid": "home.hero_watch_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-2 fill-current" }),
                      "Watch Now"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    className: "h-11 px-5 text-sm border-border/60 bg-card/40 backdrop-blur-sm hover:bg-card/80 text-foreground",
                    onClick: () => goToWatch(item),
                    "data-ocid": "home.hero_more_info_button",
                    children: "More Info"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function HeroSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full bg-card",
      style: { minHeight: "480px", maxHeight: "640px", height: "56vw" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 w-full h-full rounded-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-10 left-4 sm:left-8 space-y-3 max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-80 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-96 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-32 rounded-md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-28 rounded-md" })
          ] })
        ] })
      ]
    }
  );
}
function HomePage() {
  const {
    data: trending,
    isLoading: trendingLoading,
    isError: trendingError
  } = useTrending();
  const {
    data: popularMovies,
    isLoading: moviesLoading,
    isError: moviesError
  } = usePopularMovies();
  const {
    data: popularTV,
    isLoading: tvLoading,
    isError: tvError
  } = usePopularTV();
  const trendingItems = trending ?? [];
  const heroItem = trendingItems[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "home.page", children: [
    trendingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSkeleton, {}) : heroItem ? /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, { item: heroItem }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PosterRow,
        {
          title: "Trending This Week",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
          items: trendingItems,
          isLoading: trendingLoading,
          isError: trendingError,
          ocid: "home.trending_section"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: "oklch(0.16 0 0 / 0.5)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PosterRow,
        {
          title: "Popular Movies",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5" }),
          items: popularMovies ?? [],
          isLoading: moviesLoading,
          isError: moviesError,
          ocid: "home.popular_movies_section"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PosterRow,
        {
          title: "Popular TV Shows",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-5 h-5" }),
          items: popularTV ?? [],
          isLoading: tvLoading,
          isError: tvError,
          ocid: "home.popular_tv_section"
        }
      )
    ] })
  ] });
}
export {
  HomePage as default
};
