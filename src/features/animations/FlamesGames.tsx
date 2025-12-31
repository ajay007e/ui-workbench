import { useState, useRef, useEffect } from "react";
import "./FlamesGame.css";
import {
    FaUserFriends,
    FaHeart,
    FaHandshake,
    FaRing,
    FaSkull,
    FaStar,
} from "react-icons/fa";

/* ---------------- CONSTANTS ---------------- */

type LetterItem = {
    char: string;
    crossed: boolean;
};

type FlamesItem = {
    letter: string;
    removed: boolean;
    active?: boolean;
    count?: number | null;
};

type GameNavbarProps = {
    subtitle?: string;
};
const FLAMES = ["F", "L", "A", "M", "E", "S"];

const FLAMES_MAP = {
    F: {
        label: "Friend",
        color: "from-blue-400 to-blue-600",
        icon: FaUserFriends,
        description: "You share a strong bond of friendship.",
    },
    L: {
        label: "Love",
        color: "from-pink-400 to-rose-500",
        icon: FaHeart,
        description: "Love is clearly in the air.",
    },
    A: {
        label: "Affection",
        color: "from-purple-400 to-purple-600",
        icon: FaHandshake,
        description: "There is deep care and affection between you.",
    },
    M: {
        label: "Marriage",
        color: "from-green-400 to-emerald-600",
        icon: FaRing,
        description: "A strong sign of lifelong commitment.",
    },
    E: {
        label: "Enemy",
        color: "from-red-400 to-red-600",
        icon: FaSkull,
        description: "Better keep some distance.",
    },
    S: {
        label: "Sibling",
        color: "from-yellow-400 to-amber-500",
        icon: FaUserFriends,
        description: "A bond like siblings — strong and lasting.",
    },
    PERFECT: {
        label: "Perfect Match",
        color: "from-pink-500 via-rose-500 to-purple-600",
        icon: FaStar,
        description:
            "A rare and beautiful connection — you truly complete each other.",
    },
};

/* ---------------- NAVBAR ---------------- */

const GameNavbar = ({ subtitle }: GameNavbarProps) => (
    <div className="mb-3 shrink-0">
        <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span className="text-sm font-semibold tracking-wide text-gray-800">
                    FLAMES
                </span>
            </div>
            <span className="text-xs uppercase tracking-wide text-gray-400">
                {subtitle}
            </span>
        </div>
        <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
);

/* ---------------- MAIN COMPONENT ---------------- */

export default function FlamesGame() {
    const [step, setStep] = useState("intro");
    const [showSecond, setShowSecond] = useState(false);

    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");

    const [lettersA, setLettersA] = useState<LetterItem[]>([]);
    const [lettersB, setLettersB] = useState<LetterItem[]>([]);

    const [activeA, setActiveA] = useState<number | null>(null);
    const [activeB, setActiveB] = useState<number | null>(null);

    const [result, setResult] = useState<string | null>(null);

    const [flamesState, setFlamesState] = useState<FlamesItem[]>(
        FLAMES.map((l) => ({ letter: l, removed: false })),
    );

    const skipRef = useRef(false);

    const name1Ref = useRef<HTMLInputElement | null>(null);
    const name2Ref = useRef<HTMLInputElement | null>(null);
    const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

    /* ---------------- AUTO FOCUS ---------------- */

    useEffect(() => {
        if (step === "input" && name1Ref.current) {
            name1Ref.current.focus();
        }
    }, [step]);

    useEffect(() => {
        if (showSecond && name2Ref.current) {
            name2Ref.current.focus();
        }
    }, [showSecond]);

    const prepareLetters = (name: string): LetterItem[] =>
        name
            .toLowerCase()
            .replace(/[^a-z]/g, "")
            .split("")
            .map((c) => ({ char: c, crossed: false }));

    /* ---------------- GAME LOGIC ---------------- */

    const startGame = async () => {
        skipRef.current = false;
        setStep("cancel");

        const a = prepareLetters(name1);
        const b = prepareLetters(name2);

        setLettersA([...a]);
        setLettersB([...b]);

        for (let i = 0; i < a.length; i++) {
            setActiveA(i);
            for (let j = 0; j < b.length; j++) {
                setActiveB(j);
                if (!skipRef.current) await delay(300);
                if (!b[j].crossed && a[i].char === b[j].char) {
                    a[i].crossed = true;
                    b[j].crossed = true;
                    break;
                }
            }
            setLettersA([...a]);
            setLettersB([...b]);
            setActiveB(null);
            if (!skipRef.current) await delay(400);
        }

        const remaining =
            a.filter((l) => !l.crossed).length + b.filter((l) => !l.crossed).length;

        if (remaining === 0) {
            setResult("PERFECT");
            setStep("result");
            return;
        }

        flamesElimination(remaining);
    };

    const flamesElimination = async (count: number) => {
        setStep("flames");

        const list = FLAMES.map((l) => ({
            letter: l,
            removed: false,
            active: false,
            count: null,
        }));

        let index = 0;

        while (list.filter((l) => !l.removed).length > 1) {
            let steps = count;
            while (steps > 0) {
                if (!list[index].removed) {
                    steps--;
                    list.forEach((l) => (l.active = false));
                    list[index].active = true;
                    setFlamesState([...list]);
                    if (!skipRef.current) await delay(350);
                }
                index = (index + 1) % list.length;
            }
            list[(index - 1 + list.length) % list.length].removed = true;
            setFlamesState([...list]);
            if (!skipRef.current) await delay(500);
        }

        const remaining = list.find((l) => !l.removed);
        if (remaining) {
            setResult(remaining.letter);
        }
        setStep("result");
    };

    const reset = () => {
        setStep("intro");
        setShowSecond(false);
        setName1("");
        setName2("");
        setResult(null);
        skipRef.current = false;
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-[380px] h-[540px] p-6 flex flex-col">
                {["input", "cancel", "flames"].includes(step) && (
                    <GameNavbar
                        subtitle={
                            step === "input"
                                ? showSecond
                                    ? "Someone special"
                                    : "Your name"
                                : step === "cancel"
                                    ? "Matching letters"
                                    : "Counting FLAMES"
                        }
                    />
                )}
                {/* INTRO */}
                {step === "intro" && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                        {" "}
                        {/* Icon */}{" "}
                        <div className="relative">
                            {" "}
                            <div className="absolute inset-0 rounded-full bg-pink-200 blur-xl opacity-50"></div>{" "}
                            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                                {" "}
                                <FaHeart className="text-white text-4xl animate-pulse" />{" "}
                            </div>{" "}
                        </div>{" "}
                        {/* Title */}{" "}
                        <div className="space-y-2">
                            {" "}
                            <h1 className="text-4xl font-extrabold tracking-wide text-gray-800">
                                {" "}
                                FLAMES{" "}
                            </h1>{" "}
                            <p className="text-sm text-gray-500">
                                {" "}
                                Friendship · Love · Affection · Marriage · Enemy · Sibling{" "}
                            </p>{" "}
                        </div>{" "}
                        {/* Description */}{" "}
                        <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                            {" "}
                            Enter two names and discover your relationship using the classic
                            FLAMES game we all grew up with ❤️{" "}
                        </p>{" "}
                        {/* CTA */}{" "}
                        <button
                            onClick={() => setStep("input")}
                            className="cursor-pointer mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            {" "}
                            Start Playing{" "}
                        </button>{" "}
                        {/* Footer hint */}{" "}
                        <p className="text-xs text-gray-400 pt-2">Just for fun ✨</p>{" "}
                    </div>
                )}{" "}
                {/* INPUT */}
                {step === "input" && (
                    <div className="mt-6 space-y-8">
                        <div className="rounded-2xl bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 border border-pink-200 px-6 py-8 shadow-md">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                                    <FaHeart className="text-white text-2xl animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-gray-500">
                                        {showSecond ? "Step Two" : "Step One"}
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {showSecond ? "Someone Special" : "Your Name"}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {showSecond
                                            ? "Every connection has two sides."
                                            : "Every story begins with a name."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* INPUT AREA — MINIMAL */}
                        <div className="space-y-10">
                            {/* YOUR NAME */}
                            <div className="relative">
                                {name1 && (
                                    <label
                                        className="absolute -top-4 left-0 text-xs text-pink-500 transition"
                                        style={{ fontFamily: "'Dancing Script', cursive" }}
                                    >
                                        Your name
                                    </label>
                                )}

                                <input
                                    ref={name1Ref}
                                    className="w-full bg-transparent border-b-2 border-gray-300
                     focus:border-pink-500 outline-none
                     text-4xl text-gray-800 py-2
                     transition disabled:opacity-50"
                                    style={{ fontFamily: "'Love Light', cursive" }}
                                    value={name1}
                                    disabled={showSecond}
                                    placeholder="Your name"
                                    onChange={(e) =>
                                        setName1(e.target.value.replace(/[^a-zA-Z]/g, ""))
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && name1 && !showSecond) {
                                            setShowSecond(true);
                                        }
                                    }}
                                />
                            </div>

                            {/* SOMEONE SPECIAL */}
                            {showSecond && (
                                <div className="relative animate-flamesFadeIn">
                                    {name2 && (
                                        <label
                                            className="absolute -top-4 left-0 text-xs text-pink-500 transition"
                                            style={{ fontFamily: "'Dancing Script', cursive" }}
                                        >
                                            Someone special
                                        </label>
                                    )}

                                    <input
                                        ref={name2Ref}
                                        className="w-full bg-transparent border-b-2 border-gray-300
                       focus:border-pink-500 outline-none
                       text-4xl text-gray-800 py-2
                       transition"
                                        style={{ fontFamily: "'Love Light', cursive" }}
                                        value={name2}
                                        placeholder="Someone special"
                                        onChange={(e) =>
                                            setName2(e.target.value.replace(/[^a-zA-Z]/g, ""))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && name2) {
                                                startGame();
                                            }
                                        }}
                                    />

                                    <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">
                                        Press <span className="text-gray-600">Enter</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* MATCHING */}
                {step === "cancel" && (
                    <div className="flex-1 flex flex-col justify-center text-center space-y-4">
                        <div>
                            <p className="text-sm text-gray-600">Your Name</p>
                            <div className="flex justify-center gap-2">
                                {lettersA.map((l, i) => (
                                    <span
                                        key={i}
                                        style={{ fontFamily: "'Barrio', system-ui" }}
                                        className={`text-xl ${l.crossed
                                                ? "line-through text-red-400"
                                                : activeA === i
                                                    ? "text-blue-500 scale-125"
                                                    : ""
                                            }`}
                                    >
                                        {l.char.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">Someone Special</p>
                            <div className="flex justify-center gap-2">
                                {lettersB.map((l, i) => (
                                    <span
                                        key={i}
                                        style={{ fontFamily: "'Barrio', system-ui" }}
                                        className={`text-xl ${l.crossed
                                                ? "line-through text-red-400"
                                                : activeB === i
                                                    ? "text-green-500 scale-125"
                                                    : ""
                                            }`}
                                    >
                                        {l.char.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => (skipRef.current = true)}
                            className="cursor-pointer underline text-sm text-gray-500 hover:text-pink-500"
                        >
                            Skip Animation
                        </button>
                    </div>
                )}
                {/* FLAMES */}
                {step === "flames" && (
                    <div className="flex-1 flex flex-col justify-center space-y-4">
                        <div className="flex justify-center gap-3">
                            {flamesState.map((f, i) => (
                                <div
                                    key={i}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${f.removed
                                            ? "bg-gray-300 text-gray-500 line-through"
                                            : f.active
                                                ? "bg-pink-500 text-white animate-pulse scale-110"
                                                : "bg-pink-200"
                                        }`}
                                >
                                    {f.active && f.count !== null ? f.count : f.letter}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => (skipRef.current = true)}
                            className="cursor-pointer underline text-sm text-gray-500 hover:text-pink-500 text-center"
                        >
                            Skip Animation
                        </button>
                    </div>
                )}
                {/* RESULT */}
                {step === "result" &&
                    (() => {
                        const data =
                            FLAMES_MAP[(result ?? "PERFECT") as keyof typeof FLAMES_MAP];
                        const Icon = data.icon;

                        return (
                            <div className="flex-1 flex flex-col justify-center items-center space-y-6 animate-flamesFadeIn">
                                <div
                                    className={`w-full rounded-2xl p-6 text-white bg-gradient-to-br ${data.color} shadow-xl`}
                                >
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center animate-glow">
                                            <Icon className="text-4xl" />
                                        </div>

                                        <h2 className="text-2xl font-extrabold tracking-wide">
                                            {data.label}
                                        </h2>

                                        <div className="w-12 h-1 bg-white/60 rounded-full" />

                                        <p className="text-sm text-white/90 text-center max-w-xs">
                                            {data.description}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={reset}
                                    className="cursor-pointer px-6 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-100 transition"
                                >
                                    Play Again
                                </button>
                            </div>
                        );
                    })()}
            </div>
        </div>
    );
}
