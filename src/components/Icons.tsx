import {
  User,
  LucideProps,
  Heart,
  ImagePlus,
  Settings,
  LogOut,
  ArrowLeft,
  ArrowRight,
  StepForward,
  StepBack,
  FilterX,
  Search,
  Check,
  ChevronsUpDown,
  XSquare,
  Loader2,
  LayoutDashboard,
} from "lucide-react";

const Icons = {
  user: User,
  heart: Heart,
  creaePost: ImagePlus,
  settings: Settings,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  logout: LogOut,
  stepForward: StepForward,
  stepBack: StepBack,
  filter: FilterX,
  search: Search,
  check: Check,
  chevronsUpDown: ChevronsUpDown,
  x: XSquare,
  loader: Loader2,
  dashboard: LayoutDashboard,
  logo: (props: LucideProps) => (
    <svg viewBox="18.832 22.321 330.281 188.327" {...props}>
      <g
        transform="matrix(0.027569, 0, 0, -0.027569, 18.670212, 211.270908)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M6230 3430 l0 -3430 815 0 815 0 0 3430 0 3430 -815 0 -815 0 0 -3430z"
          fill="#0f172a"
        />
        <path
          d="M2637 6239 c-550 -37 -1069 -231 -1515 -566 -144 -108 -376 -333 -489 -473 -697 -865 -828 -2041 -337 -3029 138 -280 302 -507 524 -732 230 -232 460 -399 750 -543 289 -143 537 -221 870 -273 163 -25 604 -25 775 0 986 147 1800 762 2199 1663 241 545 301 1201 162 1785 -225 950 -930 1721 -1856 2029 -239 80 -450 121 -720 140 -160 11 -190 11 -363 -1z m376 -1985 c302 -62 558 -309 641 -619 24 -87 31 -249 17 -340 -54 -335 -291 -603 -617 -697 -68 -20 -101 -23 -234 -22 -142 0 -162 3 -240 28 -159 53 -261 117 -376 239 -361 379 -286 1007 154 1292 198 127 418 168 655 119z"
          fill="#0f172a"
        />
        <path
          d="M8557 5133 c-4 -3 -7 -250 -7 -547 l0 -541 315 -315 315 -315 -315 -315 -315 -315 0 -537 0 -538 552 0 553 0 307 307 308 308 308 -308 307 -307 548 0 547 0 0 542 0 543 -310 310 -310 310 310 310 310 310 0 552 0 553 -538 0 -537 0 -315 -315 c-173 -173 -319 -315 -325 -315 -6 0 -152 142 -325 315 l-315 315 -531 0 c-292 0 -534 -3 -537 -7z"
          fill="#0f172a"
        />
      </g>
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
};

export default Icons;
